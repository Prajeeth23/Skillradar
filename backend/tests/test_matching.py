from app.models.role import InternalRole


def test_role_matching_for_hr(client, hr_headers, db):
    role = db.query(InternalRole).filter(InternalRole.title == "Product Engineer (Fintech)").first()
    assert role is not None

    response = client.post(
        f"/api/v1/matching/roles/{role.id}",
        json={"min_score": 50.0, "limit": 10},
        headers=hr_headers,
    )
    assert response.status_code == 200
    data = response.json()
    assert data["role_id"] == role.id
    assert data["total_candidates_evaluated"] >= 10
    assert len(data["top_matches"]) > 0

    top_candidate = data["top_matches"][0]
    assert top_candidate["match_score"] >= 50.0
    assert len(top_candidate["matching_skills"]) > 0
    assert len(top_candidate["explanation"]) > 20
    # Explanation should explain why
    assert "matches" in top_candidate["explanation"] or "Product Engineer" in top_candidate["explanation"]


def test_employee_own_recommendations(client, employee_headers):
    response = client.get(
        "/api/v1/matching/me/recommendations?min_score=40",
        headers=employee_headers,
    )
    assert response.status_code == 200
    recs = response.json()
    assert len(recs) > 0
    titles = [r["role_title"] for r in recs]
    assert "Product Engineer (Fintech)" in titles
