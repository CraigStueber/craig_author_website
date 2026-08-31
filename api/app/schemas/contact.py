import uuid
from datetime import datetime

from pydantic import (
    BaseModel,
    ConfigDict,
    EmailStr,
    Field,
)


class ContactMessageRequest(BaseModel):
    name: str = Field(
        min_length=2,
        max_length=120,
    )

    email: EmailStr

    subject: str = Field(
        min_length=2,
        max_length=120,
    )

    message: str = Field(
        min_length=10,
        max_length=5000,
    )


class ContactMessageResponse(BaseModel):
    message: str


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