from pathlib import Path

from pydantic_settings import BaseSettings, SettingsConfigDict


API_DIR = Path(__file__).resolve().parents[2]


class Settings(BaseSettings):
    openai_api_key: str
    resend_api_key: str

    email_from: str
    admin_email: str

    site_url: str
    api_url: str

    database_url: str

    admin_username: str
    admin_password_hash: str
    session_secret: str

    supabase_url: str
    supabase_service_role_key: str

    environment: str = "development"
    turnstile_secret_key: str
    model_config = SettingsConfigDict(
        env_file=API_DIR / ".env",
        env_file_encoding="utf-8",
        extra="ignore",
    )


settings = Settings()