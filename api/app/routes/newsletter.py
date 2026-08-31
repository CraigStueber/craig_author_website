import uuid
from datetime import datetime, timezone
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.responses import RedirectResponse
from sqlalchemy import select

from sqlalchemy.ext.asyncio import AsyncSession

from app.config.settings import settings
from app.database.connection import get_db
from app.models.newsletter_subscriber import NewsletterSubscriber
from app.schemas.newsletter import (
    NewsletterSubscribeRequest,
    NewsletterSubscribeResponse,
)
from app.services.email_service import (
    EmailServiceError,
    send_newsletter_confirmation_email,
)


router = APIRouter(
    prefix="/newsletter",
    tags=["newsletter"],
)


async def send_confirmation_email(
    subscriber: NewsletterSubscriber,
) -> None:
    if subscriber.confirmation_token is None:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Subscriber confirmation token is missing.",
        )

    confirmation_url = (
        f"{settings.api_url}/newsletter/confirm"
        f"?token={subscriber.confirmation_token}"
    )

    try:
        await send_newsletter_confirmation_email(
            to=subscriber.email,
            confirmation_url=confirmation_url,
        )
    except EmailServiceError as exc:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail=(
                "Your signup was saved, but we could not send "
                "the confirmation email. Please try again."
            ),
        ) from exc


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
            await send_confirmation_email(
                existing_subscriber
            )

            return NewsletterSubscribeResponse(
                message=(
                    "You're already signed up. "
                    "We sent you another confirmation email."
                )
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
    await db.refresh(subscriber)

    await send_confirmation_email(
        subscriber
    )

    return NewsletterSubscribeResponse(
        message=(
            "Thanks for signing up. "
            "Please check your email to confirm your subscription."
        )
    )
@router.get("/confirm")
async def confirm_subscription(
    token: uuid.UUID,
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(
        select(NewsletterSubscriber).where(
            NewsletterSubscriber.confirmation_token == token
        )
    )

    subscriber = result.scalar_one_or_none()

    if subscriber is None:
        return RedirectResponse(
            url=(
                f"{settings.site_url}/newsletter/confirm"
                "?status=invalid"
            ),
            status_code=status.HTTP_303_SEE_OTHER,
        )

    if subscriber.status != "pending":
        return RedirectResponse(
            url=(
                f"{settings.site_url}/newsletter/confirm"
                "?status=invalid"
            ),
            status_code=status.HTTP_303_SEE_OTHER,
        )

    subscriber.status = "active"
    subscriber.confirmed_at = datetime.now(timezone.utc)
    subscriber.confirmation_token = None
    subscriber.unsubscribed_at = None

    await db.commit()

    return RedirectResponse(
        url=(
            f"{settings.site_url}/newsletter/confirm"
            "?status=success"
        ),
        status_code=status.HTTP_303_SEE_OTHER,
    )