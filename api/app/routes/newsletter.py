from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.database.connection import get_db
from app.models.newsletter_subscriber import NewsletterSubscriber
from app.schemas.newsletter import (
    NewsletterSubscribeRequest,
    NewsletterSubscribeResponse,
)


router = APIRouter(
    prefix="/newsletter",
    tags=["newsletter"],
)


@router.post(
    "/subscribe",
    response_model=NewsletterSubscribeResponse,
    status_code=status.HTTP_201_CREATED,
)
async def subscribe(
    request: NewsletterSubscribeRequest,
    db: AsyncSession = Depends(get_db),
) -> NewsletterSubscribeResponse:
    email = request.email.lower().strip()

    result = await db.execute(
        select(NewsletterSubscriber).where(
            NewsletterSubscriber.email == email
        )
    )

    existing_subscriber = result.scalar_one_or_none()

    if existing_subscriber:
        if existing_subscriber.status == "active":
            return NewsletterSubscribeResponse(
                message="You are already subscribed."
            )

        if existing_subscriber.status == "pending":
            return NewsletterSubscribeResponse(
                message="You're already signed up. Please check your email for the confirmation message."
            )

        if existing_subscriber.status == "unsubscribed":
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail=(
                    "This email was previously unsubscribed. "
                    "Resubscription will be available soon."
                ),
            )

    subscriber = NewsletterSubscriber(
        email=email,
        source="website",
    )

    db.add(subscriber)

    await db.commit()

    return NewsletterSubscribeResponse(
        message="Thanks for signing up. Please check your email to confirm your subscription."
    )