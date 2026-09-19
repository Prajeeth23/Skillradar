def test_health_check(client):
    response = client.get("/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "healthy"


def test_login_success(client):
    response = client.post(
        "/api/v1/auth/login",
        json={"email": "marcus.vance@acme.com", "password": "employee123"},
    )
    assert response.status_code == 200
    data = response.json()
    assert "access_token" in data
    assert data["token_type"] == "bearer"
    assert data["user"]["role"] == "EMPLOYEE"
    assert data["user"]["email"] == "marcus.vance@acme.com"


def test_login_invalid_password(client):
    response = client.post(
        "/api/v1/auth/login",
        json={"email": "marcus.vance@acme.com", "password": "wrongpassword"},
    )
    assert response.status_code == 401
    assert "Incorrect email or password" in response.json()["message"]


def test_auth_me_endpoint(client, employee_headers):
    response = client.get("/api/v1/auth/me", headers=employee_headers)
    assert response.status_code == 200
    data = response.json()
    assert data["name"] == "Marcus Vance"
    assert data["role"] == "EMPLOYEE"
    assert data["employee_id"] is not None
