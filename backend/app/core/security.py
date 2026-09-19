import hashlib
import uuid
from datetime import datetime, timedelta, timezone
from typing import Any, Dict, Optional
import bcrypt
from jose import JWTError, jwt
from app.core.config import settings


def _prehash(password: str) -> bytes:
    """Pre-hash password with SHA-256 to eliminate bcrypt's 72-byte truncation attack vector."""
    return hashlib.sha256(password.encode("utf-8")).digest()


def get_password_hash(password: str) -> str:
    """Generate bcrypt hash using SHA-256 pre-hashed password."""
    pwd_bytes = _prehash(password)
    salt = bcrypt.gensalt()
    return bcrypt.hashpw(pwd_bytes, salt).decode("utf-8")


def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Verify plain password against bcrypt hash, supporting both SHA-256 pre-hashed and legacy truncated hashes."""
    try:
        hash_bytes = hashed_password.encode("utf-8")
        # 1. First check with SHA-256 pre-hash (current enterprise standard)
        if bcrypt.checkpw(_prehash(plain_password), hash_bytes):
            return True
        # 2. Fallback check with legacy 72-byte slice for backward-compatibility with existing seeded accounts
        legacy_bytes = plain_password.encode("utf-8")[:72]
        return bcrypt.checkpw(legacy_bytes, hash_bytes)
    except Exception:
        return False


def create_access_token(
    subject: str,
    role: str,
    organization_id: Optional[str] = None,
    expires_delta: Optional[timedelta] = None,
    extra_claims: Optional[Dict[str, Any]] = None,
) -> str:
    """Create signed JWT access token with subject, role, org_id, and unique jti."""
    now = datetime.now(timezone.utc)
    if expires_delta:
        expire = now + expires_delta
    else:
        expire = now + timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)

    to_encode: Dict[str, Any] = {
        "sub": str(subject),
        "role": role,
        "exp": expire,
        "iat": now,
        "jti": str(uuid.uuid4()),
    }
    if organization_id:
        to_encode["org_id"] = str(organization_id)
    if extra_claims:
        to_encode.update(extra_claims)

    encoded_jwt = jwt.encode(to_encode, settings.JWT_SECRET, algorithm=settings.JWT_ALGORITHM)
    return encoded_jwt


def decode_access_token(token: str) -> Optional[Dict[str, Any]]:
    """Decode and validate a JWT access token."""
    try:
        payload = jwt.decode(token, settings.JWT_SECRET, algorithms=[settings.JWT_ALGORITHM])
        return payload
    except JWTError:
        return None
