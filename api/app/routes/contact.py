from fastapi import APIRouter, Depends, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.database.connection import get_db
from app.models.contact_message import ContactMessage
from app.schemas.contact import (
    ContactMessageRequest,
    ContactMessageResponse,
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
    contact_message = ContactMessage(
        name=request.name.strip(),
        email=request.email.lower().strip(),
        subject=request.subject.strip(),
        message=request.message.strip(),
    )

    db.add(contact_message)
    await db.commit()

    return ContactMessageResponse(
        message="Thanks for reaching out. Your message has been received."
    )