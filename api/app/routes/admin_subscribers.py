from fastapi import APIRouter, Depends
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.auth.session import get_current_admin
from app.database.connection import get_db
from app.models.newsletter_subscriber import NewsletterSubscriber
from app.schemas.newsletter import AdminSubscriberResponse


router = APIRouter(
    prefix="/admin/subscribers",
    tags=["admin-subscribers"],
)


@router.get(
    "",
    response_model=list[AdminSubscriberResponse],
)
async def get_admin_subscribers(
    db: AsyncSession = Depends(get_db),
    admin: str = Depends(get_current_admin),
) -> list[AdminSubscriberResponse]:
    result = await db.execute(
        select(NewsletterSubscriber).order_by(
            NewsletterSubscriber.created_at.desc()
        )
    )

    subscribers = result.scalars().all()

    return [
        AdminSubscriberResponse.model_validate(
            subscriber
        )
        for subscriber in subscribers
    ]