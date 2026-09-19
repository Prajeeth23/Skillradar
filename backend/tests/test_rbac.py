from app.models.employee import Employee


def test_admin_can_access_admin_routes(client, admin_headers):
    response = client.get("/api/v1/admin/users", headers=admin_headers)
    assert response.status_code == 200
    assert len(response.json()) > 0


def test_employee_cannot_access_admin_routes(client, employee_headers):
    response = client.get("/api/v1/admin/users", headers=employee_headers)
    assert response.status_code == 403


def test_hr_cannot_access_admin_routes(client, hr_headers):
    response = client.get("/api/v1/admin/users", headers=hr_headers)
    assert response.status_code == 403


def test_employee_cannot_access_hr_endpoints(client, employee_headers):
    response = client.get("/api/v1/hr/employees", headers=employee_headers)
    assert response.status_code == 403


def test_hr_can_access_hr_endpoints(client, hr_headers):
    response = client.get("/api/v1/hr/employees", headers=hr_headers)
    assert response.status_code == 200
    assert len(response.json()) >= 10


def test_employee_can_view_own_profile(client, employee_headers):
    response = client.get("/api/v1/employees/me", headers=employee_headers)
    assert response.status_code == 200
    data = response.json()
    assert data["name"] == "Marcus Vance"
    assert data["current_job_title"] == "Backend Developer"
    assert len(data["projects"]) >= 3


def test_employee_cannot_view_other_employee_dossier(client, employee_headers, db):
    # Find Elena Rostova's employee ID
    elena = db.query(Employee).filter(Employee.employee_code == "EMP-1002").first()
    assert elena is not None

    # Marcus Vance tries to fetch Elena's dossier through HR route
    response = client.get(f"/api/v1/hr/employees/{elena.id}", headers=employee_headers)
    assert response.status_code == 403
