from app.models.role import InternalRole


def test_skill_gap_analysis(client, employee_headers, db):
    role = db.query(InternalRole).filter(InternalRole.title == "Product Engineer (Fintech)").first()
    assert role is not None

    response = client.post(
        "/api/v1/skill-gaps/analyze",
        json={"target_role_id": role.id},
        headers=employee_headers,
    )
    assert response.status_code == 200
    data = response.json()
    assert data["target_role_title"] == "Product Engineer (Fintech)"
    assert data["readiness_score"] > 0
    assert len(data["skill_gaps"]) > 0


def test_career_assistant_chat(client, employee_headers):
    response = client.post(
        "/api/v1/career/chat",
        json={"message": "What hidden skills have been discovered in my profile?"},
        headers=employee_headers,
    )
    assert response.status_code == 200
    data = response.json()
    assert len(data["response"]) > 20
    assert len(data["suggested_actions"]) > 0
