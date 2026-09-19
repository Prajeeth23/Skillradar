import secrets
from typing import List, Optional
from pydantic import field_validator
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    APP_NAME: str = "SkillRadar"
    APP_ENV: str = "development"
    DEBUG: bool = True
    API_V1_PREFIX: str = "/api/v1"

    # Database
    DATABASE_URL: str = "sqlite:///./skillradar.db"

    # Security & Auth
    # In production, JWT_SECRET MUST be provided via environment variable.
    # In development/test, if omitted, a cryptographically secure key is generated dynamically.
    JWT_SECRET: str = ""
    JWT_ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30

    # API Documentation flag (disabled in production by default)
    DOCS_ENABLED: Optional[bool] = None

    # Groq AI
    GROQ_API_KEY: str = ""
    GROQ_MODEL: str = "llama-3.3-70b-versatile"
    GROQ_TIMEOUT_SECONDS: int = 20

    # CORS
    ALLOWED_ORIGINS: List[str] = [
        "http://localhost:3000",
        "http://localhost:5173",
        "http://localhost:8000",
        "http://127.0.0.1:5173",
        "http://127.0.0.1:3000",
    ]

    @field_validator("JWT_SECRET", mode="before")
    @classmethod
    def validate_jwt_secret(cls, v: Optional[str], info) -> str:
        # If explicitly passed or loaded from env
        if v and v.strip() and v != "skillradar-super-secret-jwt-key-hackathon-2026-beyond-titles":
            return v.strip()
        # In production, strictly reject missing/default JWT secrets
        # We check APP_ENV from environment if present
        import os
        env = os.getenv("APP_ENV", "development").lower()
        if env in ("production", "prod"):
            raise ValueError("CRITICAL SECURITY ERROR: JWT_SECRET must be explicitly provided in production environments.")
        # Generate a cryptographically secure 256-bit key for local development
        return secrets.token_urlsafe(32)

    @property
    def is_production(self) -> bool:
        return self.APP_ENV.lower() in ("production", "prod")

    @property
    def show_docs(self) -> bool:
        if self.DOCS_ENABLED is not None:
            return self.DOCS_ENABLED
        return not self.is_production

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=True,
        extra="ignore",
    )


settings = Settings()

