import secrets

from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
    Response,
    status,
)
from pwdlib import PasswordHash

from app.auth.session import (
    SESSION_COOKIE_NAME,
    SESSION_MAX_AGE,
    create_session_token,
    get_current_admin,
)
from app.config.settings import settings
from app.schemas.admin_auth import (
    AdminLoginRequest,
    AdminLogoutResponse,
    AdminSessionResponse,
)


router = APIRouter(
    prefix="/admin/auth",
    tags=["admin-auth"],
)


password_hash = PasswordHash.recommended()


@router.post(
    "/login",
    response_model=AdminSessionResponse,
)
async def admin_login(
    request: AdminLoginRequest,
    response: Response,
) -> AdminSessionResponse:
    username_matches = secrets.compare_digest(
        request.username.strip(),
        settings.admin_username,
    )

    try:
        password_matches = password_hash.verify(
            request.password,
            settings.admin_password_hash,
        )
    except Exception:
        password_matches = False

    if not username_matches or not password_matches:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid username or password.",
        )

    token = create_session_token(
        settings.admin_username
    )

    response.set_cookie(
        key=SESSION_COOKIE_NAME,
        value=token,
        max_age=SESSION_MAX_AGE,
        httponly=True,
        secure=settings.environment == "production",
        samesite=(
            "none"
            if settings.environment == "production"
            else "lax"
        ),
        path="/",
    )

    return AdminSessionResponse(
        authenticated=True,
        username=settings.admin_username,
    )


@router.get(
    "/me",
    response_model=AdminSessionResponse,
)
async def admin_me(
    username: str = Depends(get_current_admin),
) -> AdminSessionResponse:
    return AdminSessionResponse(
        authenticated=True,
        username=username,
    )


@router.post(
    "/logout",
    response_model=AdminLogoutResponse,
)
async def admin_logout(
    response: Response,
) -> AdminLogoutResponse:
    response.delete_cookie(
        key=SESSION_COOKIE_NAME,
        path="/",
        secure=settings.environment == "production",
        httponly=True,
        samesite=(
            "none"
            if settings.environment == "production"
            else "lax"
        ),
    )

    return AdminLogoutResponse(
        message="Logged out successfully."
    )