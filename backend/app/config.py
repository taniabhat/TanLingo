import os
from functools import lru_cache

from dotenv import load_dotenv

load_dotenv()


class Settings:
    SECRET_KEY: str = os.getenv("SECRET_KEY", "duolingo-clone-secret-key-change-in-production")
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "10080"))

    SMTP_HOST: str = os.getenv("SMTP_HOST", "")
    SMTP_PORT: int = int(os.getenv("SMTP_PORT", "587"))
    SMTP_USER: str = os.getenv("SMTP_USER", "")
    SMTP_PASSWORD: str = os.getenv("SMTP_PASSWORD", "")
    SMTP_FROM_EMAIL: str = os.getenv("SMTP_FROM_EMAIL", "noreply@duolingo-clone.local")
    SMTP_FROM_NAME: str = os.getenv("SMTP_FROM_NAME", "Duolingo Clone")
    SMTP_USE_TLS: bool = os.getenv("SMTP_USE_TLS", "true").lower() == "true"

    APP_URL: str = os.getenv("APP_URL", "http://localhost:3000")
    ALLOW_DEMO_TOKEN: bool = os.getenv("ALLOW_DEMO_TOKEN", "true").lower() == "true"


@lru_cache
def get_settings() -> Settings:
    return Settings()
