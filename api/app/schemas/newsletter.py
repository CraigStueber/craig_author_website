import uuid
from datetime import datetime

from pydantic import BaseModel, EmailStr, ConfigDict


class NewsletterSubscribeRequest(BaseModel):
    email: EmailStr


class NewsletterSubscribeResponse(BaseModel):
    message: str


class AdminSubscriberResponse(BaseModel):
    model_config = ConfigDict(
        from_attributes=True
    )

    id: uuid.UUID
    email: str
    status: str
    source: str | None

    created_at: datetime
    confirmed_at: datetime | None
    unsubscribed_at: datetime | None
class AdminContactMessageResponse(BaseModel):
    model_config = ConfigDict(
        from_attributes=True
    )

    id: uuid.UUID

    name: str
    email: str
    subject: str
    message: str

    created_at: datetime