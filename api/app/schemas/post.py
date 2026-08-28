import uuid
from datetime import datetime

from pydantic import BaseModel, ConfigDict

from typing import Literal

from pydantic import BaseModel, ConfigDict, Field

class PostSummaryResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: uuid.UUID
    title: str
    slug: str
    excerpt: str | None

    hero_image_url: str | None
    hero_image_alt: str | None

    tags: list[str]

    published_at: datetime | None


class PostDetailResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: uuid.UUID

    title: str
    slug: str
    excerpt: str | None
    content: str

    hero_image_url: str | None
    hero_image_alt: str | None

    tags: list[str]

    seo_title: str | None
    seo_description: str | None

    original_medium_url: str | None
    original_published_at: datetime | None

    published_at: datetime | None
    created_at: datetime
    updated_at: datetime

class AdminPostSummaryResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: uuid.UUID

    title: str
    slug: str
    excerpt: str | None

    status: str

    hero_image_url: str | None
    hero_image_alt: str | None

    tags: list[str]

    published_at: datetime | None
    created_at: datetime
    updated_at: datetime


class AdminPostCreateRequest(BaseModel):
    title: str = Field(min_length=1, max_length=250)

    slug: str | None = Field(
        default=None,
        max_length=250,
    )

    excerpt: str | None = Field(
        default=None,
        max_length=1000,
    )

    content: str = ""

    status: Literal[
        "draft",
        "published",
    ] = "draft"

    hero_image_url: str | None = None
    hero_image_alt: str | None = None

    tags: list[str] = []

    seo_title: str | None = Field(
        default=None,
        max_length=250,
    )

    seo_description: str | None = Field(
        default=None,
        max_length=500,
    )

    original_medium_url: str | None = None
    original_published_at: datetime | None = None


class AdminPostDetailResponse(BaseModel):
    model_config = ConfigDict(
        from_attributes=True
    )

    id: uuid.UUID

    title: str
    slug: str
    excerpt: str | None
    content: str

    status: str

    hero_image_url: str | None
    hero_image_alt: str | None

    tags: list[str]

    seo_title: str | None
    seo_description: str | None

    original_medium_url: str | None
    original_published_at: datetime | None

    published_at: datetime | None
    created_at: datetime
    updated_at: datetime


class BlogImageUploadResponse(BaseModel):
    url: str