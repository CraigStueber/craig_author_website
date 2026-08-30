import uuid
from datetime import datetime
from typing import Literal

from pydantic import (
    BaseModel,
    ConfigDict,
    EmailStr,
    Field,
)


class CommentCreateRequest(BaseModel):
    name: str = Field(
        min_length=1,
        max_length=120,
    )

    email: EmailStr

    body: str = Field(
        min_length=1,
        max_length=5000,
    )


class CommentCreateResponse(BaseModel):
    message: str


class PublicCommentResponse(BaseModel):
    model_config = ConfigDict(
        from_attributes=True
    )

    id: uuid.UUID

    name: str
    body: str

    parent_id: uuid.UUID | None
    is_author: bool

    created_at: datetime


class AdminCommentResponse(BaseModel):
    id: uuid.UUID

    post_id: uuid.UUID
    post_title: str
    post_slug: str

    parent_id: uuid.UUID | None

    name: str
    email: str | None
    body: str

    status: str
    moderation_flags: list[str]

    is_author: bool

    created_at: datetime
    approved_at: datetime | None


class AdminCommentStatusRequest(BaseModel):
    status: Literal[
        "pending",
        "approved",
        "rejected",
        "spam",
    ]

class AdminCommentReplyRequest(BaseModel):
    body: str = Field(
        min_length=1,
        max_length=5000,
    )