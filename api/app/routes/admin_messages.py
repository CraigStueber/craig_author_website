import uuid

from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
    status,
)
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.auth.session import get_current_admin
from app.database.connection import get_db
from app.models.contact_message import ContactMessage
from app.schemas.contact import AdminContactMessageResponse


router = APIRouter(
    prefix="/admin/messages",
    tags=["admin-messages"],
)


@router.get(
    "",
    response_model=list[AdminContactMessageResponse],
)
async def get_admin_messages(
    db: AsyncSession = Depends(get_db),
    admin: str = Depends(get_current_admin),
) -> list[AdminContactMessageResponse]:
    result = await db.execute(
        select(ContactMessage).order_by(
            ContactMessage.created_at.desc()
        )
    )

    messages = result.scalars().all()

    return [
        AdminContactMessageResponse.model_validate(
            message
        )
        for message in messages
    ]


@router.delete(
    "/{message_id}",
    status_code=status.HTTP_204_NO_CONTENT,
)
async def delete_admin_message(
    message_id: uuid.UUID,
    db: AsyncSession = Depends(get_db),
    admin: str = Depends(get_current_admin),
) -> None:
    result = await db.execute(
        select(ContactMessage).where(
            ContactMessage.id == message_id
        )
    )

    message = result.scalar_one_or_none()

    if message is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Message not found.",
        )

    await db.delete(message)
    await db.commit()