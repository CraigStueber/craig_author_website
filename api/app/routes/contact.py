from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
    status,
)
from sqlalchemy.ext.asyncio import AsyncSession

from app.database.connection import get_db
from app.models.contact_message import ContactMessage
from app.schemas.contact import (
    ContactMessageRequest,
    ContactMessageResponse,
)
from app.services.turnstile_service import (
    TurnstileVerificationError,
    verify_turnstile,
)


router = APIRouter(
    prefix="/contact",
    tags=["contact"],
)


@router.post(
    "",
    response_model=ContactMessageResponse,
    status_code=status.HTTP_201_CREATED,
)
async def send_contact_message(
    request: ContactMessageRequest,
    db: AsyncSession = Depends(get_db),
) -> ContactMessageResponse:
    try:
        turnstile_valid = await verify_turnstile(
            token=request.turnstile_token,
            expected_action="contact",
        )
    except TurnstileVerificationError as exc:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail=(
                "Unable to verify the security check. "
                "Please try again."
            ),
        ) from exc

    if not turnstile_valid:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=(
                "Security verification failed. "
                "Please try again."
            ),
        )

    contact_message = ContactMessage(
        name=request.name.strip(),
        email=request.email.lower().strip(),
        subject=request.subject.strip(),
        message=request.message.strip(),
    )

    db.add(contact_message)

    await db.commit()

    return ContactMessageResponse(
        message=(
            "Thanks for reaching out. "
            "Your message has been received."
        )
    )