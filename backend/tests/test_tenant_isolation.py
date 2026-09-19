import uuid
import pytest
from app.core.security import (
    create_access_token,
    get_password_hash,
    verify_password,
)
from app.models.organization import Organization
from app.models.user import User, UserRole
from app.models.employee import Employee
from app.models.role import InternalRole


@pytest.fixture
def multi_tenant_setup(db):
    """Create a secondary tenant (Org Beta) with its own HR, Employee, and Role."""
    # Org Beta
    org_b = Organization(id=str(uuid.uuid4()), name="Beta Corp")
    db.add(org_b)
    db.flush()

    # HR User in Org Beta
    hr_b = User(
        id=str(uuid.uuid4()),
        organization_id=org_b.id,
        name="HR Beta User",
        email="hr@betacorp.test",
        password_hash=get_password_hash("password123"),
        role=UserRole.HR,
        is_active=True,
    )
    db.add(hr_b)

    # Employee in Org Beta
    emp_user_b = User(
        id=str(uuid.uuid4()),
        organization_id=org_b.id,
        name="Elena Beta",
        email="elena@betacorp.test",
        password_hash=get_password_hash("password123"),
        role=UserRole.EMPLOYEE,
        is_active=True,
    )
    db.add(emp_user_b)
    db.flush()

    employee_b = Employee(
        id=str(uuid.uuid4()),
        user_id=emp_user_b.id,
        employee_code="BETA-001",
        department="Engineering",
        current_job_title="Software Architect",
        years_of_experience=6,
        bio="Senior architect at Beta Corp",
    )
    db.add(employee_b)

    # Internal Role in Org Beta
    role_b = InternalRole(
        id=str(uuid.uuid4()),
        organization_id=org_b.id,
        title="Principal AI Engineer",
        department="AI Research",
        description="Lead AI research at Beta Corp",
        status="OPEN",
        created_by=hr_b.id,
    )
    db.add(role_b)
    db.commit()

    token_hr_b = create_access_token(
        subject=hr_b.id,
        role=hr_b.role.value,
        organization_id=org_b.id,
    )
    token_emp_b = create_access_token(
        subject=emp_user_b.id,
        role=emp_user_b.role.value,
        organization_id=org_b.id,
    )

    return {
        "org_b": org_b,
        "hr_b": hr_b,
        "employee_b": employee_b,
        "role_b": role_b,
        "hr_b_headers": {"Authorization": f"Bearer {token_hr_b}"},
        "emp_b_headers": {"Authorization": f"Bearer {token_emp_b}"},
    }


def test_cross_tenant_role_matching_forbidden(client, hr_headers, multi_tenant_setup):
    """Org A HR cannot run AI candidate matching against Org B's internal role."""
    role_b_id = multi_tenant_setup["role_b"].id

    # Org A HR attempts matching on Org B role
    response = client.post(f"/api/v1/matching/roles/{role_b_id}", headers=hr_headers)
    assert response.status_code == 403
    assert "Cross-organization" in response.json()["message"]


def test_cross_tenant_role_matches_retrieval_forbidden(client, hr_headers, multi_tenant_setup):
    """Org A HR cannot read candidate matches for Org B's internal role."""
    role_b_id = multi_tenant_setup["role_b"].id

    response = client.get(f"/api/v1/matching/roles/{role_b_id}/matches", headers=hr_headers)
    assert response.status_code == 403


def test_cross_tenant_role_details_forbidden(client, hr_headers, multi_tenant_setup):
    """Org A HR or Employee cannot view details of Org B's internal role."""
    role_b_id = multi_tenant_setup["role_b"].id

    response = client.get(f"/api/v1/roles/{role_b_id}", headers=hr_headers)
    assert response.status_code == 403


def test_cross_tenant_role_update_forbidden(client, hr_headers, multi_tenant_setup):
    """Org A HR cannot modify or patch Org B's internal role."""
    role_b_id = multi_tenant_setup["role_b"].id

    response = client.patch(
        f"/api/v1/roles/{role_b_id}",
        json={"title": "Hijacked Role"},
        headers=hr_headers,
    )
    assert response.status_code == 403


def test_cross_tenant_divergence_analysis_forbidden(client, hr_headers, multi_tenant_setup):
    """Org A HR cannot run divergence analysis on Org B's employee."""
    emp_b_id = multi_tenant_setup["employee_b"].id

    response = client.post(f"/api/v1/skills/divergence/analyze/{emp_b_id}", headers=hr_headers)
    assert response.status_code == 403


def test_cross_tenant_psychometrics_link_forbidden(client, hr_headers, multi_tenant_setup):
    """Org A HR cannot generate psychometric assessment links for Org B's employee."""
    emp_b_id = multi_tenant_setup["employee_b"].id

    response = client.post(f"/api/v1/psychometrics/{emp_b_id}/send-link", headers=hr_headers)
    assert response.status_code == 403


def test_cross_tenant_psychometrics_view_forbidden(client, hr_headers, multi_tenant_setup):
    """Org A HR cannot view psychometric trait scores of Org B's employee."""
    emp_b_id = multi_tenant_setup["employee_b"].id

    response = client.get(f"/api/v1/psychometrics/{emp_b_id}", headers=hr_headers)
    assert response.status_code == 403


def test_cross_tenant_skill_gap_analysis_forbidden(client, hr_headers, multi_tenant_setup):
    """Org A HR cannot run skill gap analysis between Org B employee and Org B role."""
    emp_b_id = multi_tenant_setup["employee_b"].id
    role_b_id = multi_tenant_setup["role_b"].id

    response = client.post(
        "/api/v1/skill-gaps/analyze",
        json={"employee_id": emp_b_id, "target_role_id": role_b_id},
        headers=hr_headers,
    )
    assert response.status_code == 403


def test_token_org_id_mismatch_rejected(client, db):
    """Token with an org_id that does not match user's DB organization is rejected with 403."""
    hr = db.query(User).filter(User.role == UserRole.HR).first()
    # Issue a token with a forged / mismatched org_id
    fake_token = create_access_token(
        subject=hr.id,
        role=hr.role.value,
        organization_id=str(uuid.uuid4()),
    )
    response = client.get("/api/v1/hr/employees", headers={"Authorization": f"Bearer {fake_token}"})
    assert response.status_code == 403
    assert "Organization mismatch" in response.json()["message"]


def test_sha256_prehashed_bcrypt_prevents_72_byte_truncation():
    """Passwords exceeding 72 bytes should not collide if their prefixes are identical."""
    prefix = "SuperSecurePassword123!" * 3  # > 72 chars
    pwd1 = prefix + "_SuffixA"
    pwd2 = prefix + "_SuffixB"

    # With SHA-256 pre-hashing, hashes differ and do NOT cross-validate
    hash1 = get_password_hash(pwd1)
    assert verify_password(pwd1, hash1) is True
    assert verify_password(pwd2, hash1) is False


def test_legacy_bcrypt_hash_backward_compatibility():
    """Verify that older legacy bcrypt hashes (without SHA-256 pre-hash) still verify properly."""
    import bcrypt

    legacy_pwd = "legacy_demo_password"
    salt = bcrypt.gensalt()
    legacy_hash = bcrypt.hashpw(legacy_pwd.encode("utf-8")[:72], salt).decode("utf-8")

    # verify_password should successfully verify the legacy hash
    assert verify_password(legacy_pwd, legacy_hash) is True
    assert verify_password("wrong_password", legacy_hash) is False
