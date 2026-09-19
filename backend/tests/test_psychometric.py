from app.models.employee import Employee
from app.models.psychometric_assessment import AssessmentStatus


def test_hr_can_send_assessment_link(client, hr_headers, db):
    # Priya Sharma does not have a seeded completed assessment
    priya = db.query(Employee).filter(Employee.employee_code == "EMP-1004").first()
    assert priya is not None

    response = client.post(
        f"/api/v1/psychometrics/{priya.id}/send-link",
        headers=hr_headers,
    )
    assert response.status_code == 200
    data = response.json()
    assert data["employee_name"] == "Priya Patel"
    assert data["status"] == AssessmentStatus.PENDING.value
    assert len(data["assessment_token"]) > 10
    assert "/assessment/" in data["share_url"]


def test_employee_cannot_send_assessment_link(client, employee_headers, db):
    priya = db.query(Employee).filter(Employee.employee_code == "EMP-1004").first()
    assert priya is not None

    response = client.post(
        f"/api/v1/psychometrics/{priya.id}/send-link",
        headers=employee_headers,
    )
    assert response.status_code == 403


def test_submit_assessment_scores_correctly(client, hr_headers, db):
    # 1. Send assessment to Priya
    priya = db.query(Employee).filter(Employee.employee_code == "EMP-1004").first()
    send_resp = client.post(
        f"/api/v1/psychometrics/{priya.id}/send-link",
        headers=hr_headers,
    )
    assert send_resp.status_code == 200
    token = send_resp.json()["assessment_token"]

    # 2. Get questions via public token endpoint
    q_resp = client.get(f"/api/v1/psychometrics/assessment/{token}")
    assert q_resp.status_code == 200
    questions = q_resp.json()["questions"]
    assert len(questions) == 6

    # 3. Submit answers (choose option matching Leadership: q1_lead, q2_lead, q3_lead, q4_lead, q5_lead, q6_lead)
    answers = ["q1_lead", "q2_lead", "q3_lead", "q4_lead", "q5_lead", "q6_lead"]
    sub_resp = client.post(
        f"/api/v1/psychometrics/assessment/{token}/submit",
        json={"answers": answers},
    )
    assert sub_resp.status_code == 200
    sub_data = sub_resp.json()
    assert sub_data["status"] == AssessmentStatus.COMPLETED.value
    assert sub_data["completed_at"] is not None
    assert len(sub_data["trait_summary"]) > 10

    # Verify score: 6 out of 6 for LEADERSHIP = 100.0%
    scores = {ts["trait"]: ts["score"] for ts in sub_data["trait_scores"]}
    assert scores["LEADERSHIP"] == 100.0
    assert scores["ADAPTABILITY"] == 0.0


def test_submit_gamified_assessment_with_custom_trait_scores(client, hr_headers, db):
    # Send link to Liam Tanaka
    liam = db.query(Employee).filter(Employee.employee_code == "EMP-1003").first()
    assert liam is not None

    send_resp = client.post(
        f"/api/v1/psychometrics/{liam.id}/send-link",
        headers=hr_headers,
    )
    assert send_resp.status_code == 200
    token = send_resp.json()["assessment_token"]

    custom_scores = {
        "LEADERSHIP": 88.0,
        "ADAPTABILITY": 92.0,
        "ANALYTICAL_THINKING": 85.0,
        "COLLABORATION": 90.0,
    }
    custom_summary = "High entrepreneurial orientation with strong creative leadership and high adaptability."

    sub_resp = client.post(
        f"/api/v1/psychometrics/assessment/{token}/submit",
        json={
            "answers": ["mission_1:c1", "mission_2:g2", "mission_3:w1"],
            "trait_scores": custom_scores,
            "trait_summary": custom_summary,
        },
    )
    assert sub_resp.status_code == 200
    sub_data = sub_resp.json()
    assert sub_data["status"] == AssessmentStatus.COMPLETED.value
    assert sub_data["trait_summary"] == custom_summary

    saved_scores = {ts["trait"]: ts["score"] for ts in sub_data["trait_scores"]}
    assert saved_scores["LEADERSHIP"] == 88.0
    assert saved_scores["ADAPTABILITY"] == 92.0
    assert saved_scores["ANALYTICAL_THINKING"] == 85.0
    assert saved_scores["COLLABORATION"] == 90.0


def test_employee_can_view_own_trait_scores(client, employee_headers, db):
    marcus = db.query(Employee).filter(Employee.employee_code == "EMP-1001").first()
    assert marcus is not None

    response = client.get(
        f"/api/v1/psychometrics/{marcus.id}",
        headers=employee_headers,
    )
    assert response.status_code == 200
    data = response.json()
    assert data["employee_id"] == marcus.id
    assert data["has_assessment"] is True
    assert data["status"] == AssessmentStatus.COMPLETED.value
    assert len(data["radar_data"]) == 4
    traits = [r["trait"] for r in data["radar_data"]]
    assert "Leadership" in traits
    assert "Collaboration" in traits


def test_employee_cannot_view_others_trait_scores(client, employee_headers, db):
    # Marcus Vance tries to view Elena Rostova's private trait profile
    elena = db.query(Employee).filter(Employee.employee_code == "EMP-1002").first()
    assert elena is not None

    response = client.get(
        f"/api/v1/psychometrics/{elena.id}",
        headers=employee_headers,
    )
    assert response.status_code == 403
