from app.models.employee import Employee
from app.models.notification import Notification


def test_divergence_engine_analysis(client, employee_headers, db):
    marcus = db.query(Employee).filter(Employee.employee_code == "EMP-1001").first()
    assert marcus is not None

    response = client.post(
        f"/api/v1/skills/divergence/analyze/{marcus.id}",
        headers=employee_headers,
    )
    assert response.status_code == 200
    data = response.json()

    assert data["employee_id"] == marcus.id
    assert data["current_job_title"] == "Backend Developer"
    assert data["analyzed_projects_count"] >= 3

    # Explicit skills should contain Python
    explicit_names = [s["name"] for s in data["explicit_skills"]]
    assert "Python" in explicit_names

    # Hidden or transferable skills should contain UX Collaboration or Mentorship
    hidden_names = [s["name"] for s in data["hidden_skills"]]
    transferable_names = [s["name"] for s in data["transferable_skills"]]
    combined_divergent = hidden_names + transferable_names

    assert "UX Collaboration" in combined_divergent or "Technical Mentorship" in combined_divergent

    # Check evidence existence
    for s in data["hidden_skills"] + data["transferable_skills"]:
        assert len(s["evidence"]) > 5
        assert s["confidence"] > 0.5


def test_hr_receives_notification_on_hidden_skill(client, hr_headers, employee_headers, db):
    # Fetch notifications for HR
    response = client.get("/api/v1/notifications", headers=hr_headers)
    assert response.status_code == 200
    notifs = response.json()
    assert len(notifs) > 0

    types = [n["type"] for n in notifs]
    assert "HIDDEN_SKILL" in types or "TALENT_ALERT" in types
