import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import StaticPool

from app.main import app
from app.db.base import Base
from app.db.session import get_db
from app.db.seed import seed_database
from app.core.security import create_access_token
from app.models.user import User, UserRole

# In-memory test SQLite DB
SQLALCHEMY_DATABASE_URL = "sqlite:///:memory:"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL,
    connect_args={"check_same_thread": False},
    poolclass=StaticPool,
)
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


@pytest.fixture(scope="session")
def db_engine():
    Base.metadata.create_all(bind=engine)
    db = TestingSessionLocal()
    seed_database(db)
    db.close()
    yield engine
    Base.metadata.drop_all(bind=engine)


@pytest.fixture
def db(db_engine):
    connection = engine.connect()
    transaction = connection.begin()
    db = TestingSessionLocal(bind=connection)

    yield db

    db.close()
    transaction.rollback()
    connection.close()


@pytest.fixture
def client(db):
    def override_get_db():
        yield db

    app.dependency_overrides[get_db] = override_get_db
    with TestClient(app) as test_client:
        yield test_client
    app.dependency_overrides.clear()


@pytest.fixture
def admin_headers(db):
    admin = db.query(User).filter(User.role == UserRole.PLATFORM_ADMIN).first()
    token = create_access_token(subject=admin.id, role=admin.role.value, organization_id=admin.organization_id)
    return {"Authorization": f"Bearer {token}"}


@pytest.fixture
def hr_headers(db):
    hr = db.query(User).filter(User.role == UserRole.HR).first()
    token = create_access_token(subject=hr.id, role=hr.role.value, organization_id=hr.organization_id)
    return {"Authorization": f"Bearer {token}"}


@pytest.fixture
def employee_headers(db):
    emp_user = db.query(User).filter(User.email == "marcus.vance@acme.com").first()
    token = create_access_token(subject=emp_user.id, role=emp_user.role.value, organization_id=emp_user.organization_id)
    return {"Authorization": f"Bearer {token}"}
