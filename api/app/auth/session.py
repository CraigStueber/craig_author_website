import secrets

from fastapi import HTTPException, Request, status
from itsdangerous import (
    BadSignature,
    SignatureExpired,
    URLSafeTimedSerializer,
)

from app.config.settings import settings


SESSION_COOKIE_NAME = "admin_session"
SESSION_MAX_AGE = 60 * 60 * 24 * 7


serializer = URLSafeTimedSerializer(
    settings.session_secret,
    salt="craig-admin-session",
)


def create_session_token(username: str) -> str:
    return serializer.dumps(
        {
            "username": username,
        }
    )


def verify_session_token(token: str) -> str:
    try:
        data = serializer.loads(
            token,
            max_age=SESSION_MAX_AGE,
        )
    except (BadSignature, SignatureExpired):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Not authenticated.",
        )

    username = data.get("username")

    if not isinstance(username, str):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Not authenticated.",
        )

    if not secrets.compare_digest(
        username,
        settings.admin_username,
    ):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Not authenticated.",
        )

    return username


def get_current_admin(request: Request) -> str:
    token = request.cookies.get(
        SESSION_COOKIE_NAME
    )

    if not token:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Not authenticated.",
        )

    return verify_session_token(token)