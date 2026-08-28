import re
import unicodedata
from datetime import datetime, timezone

from fastapi import (
    APIRouter,
    Depends,
    File,
    HTTPException,
    UploadFile,
    status,
)
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.auth.session import get_current_admin
from app.database.connection import get_db
from app.models.post import Post
from app.schemas.post import (
    AdminPostCreateRequest,
    AdminPostDetailResponse,
    AdminPostSummaryResponse,
    BlogImageUploadResponse,
)
from app.services.blog_images import (
    upload_blog_image,
)


router = APIRouter(
    prefix="/admin/posts",
    tags=["admin-posts"],
)


def make_slug(value: str) -> str:
    normalized = unicodedata.normalize(
        "NFKD",
        value,
    )

    ascii_value = normalized.encode(
        "ascii",
        "ignore",
    ).decode("ascii")

    slug = re.sub(
        r"[^a-zA-Z0-9]+",
        "-",
        ascii_value,
    )

    return slug.strip("-").lower()


async def get_unique_slug(
    db: AsyncSession,
    requested_slug: str,
) -> str:
    base_slug = make_slug(requested_slug)

    if not base_slug:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Unable to create a valid slug.",
        )

    slug = base_slug
    suffix = 2

    while True:
        result = await db.execute(
            select(Post.id).where(
                Post.slug == slug
            )
        )

        if result.scalar_one_or_none() is None:
            return slug

        slug = f"{base_slug}-{suffix}"
        suffix += 1


@router.get(
    "",
    response_model=list[
        AdminPostSummaryResponse
    ],
)
async def get_admin_posts(
    db: AsyncSession = Depends(get_db),
    admin: str = Depends(
        get_current_admin
    ),
) -> list[AdminPostSummaryResponse]:
    result = await db.execute(
        select(Post).order_by(
            Post.updated_at.desc()
        )
    )

    posts = result.scalars().all()

    return [
        AdminPostSummaryResponse.model_validate(
            post
        )
        for post in posts
    ]


@router.post(
    "/image",
    response_model=BlogImageUploadResponse,
)
async def upload_admin_blog_image(
    file: UploadFile = File(...),
    admin: str = Depends(
        get_current_admin
    ),
) -> BlogImageUploadResponse:
    url = await upload_blog_image(file)

    return BlogImageUploadResponse(
        url=url
    )


@router.post(
    "",
    response_model=AdminPostDetailResponse,
    status_code=status.HTTP_201_CREATED,
)
async def create_admin_post(
    request: AdminPostCreateRequest,
    db: AsyncSession = Depends(get_db),
    admin: str = Depends(
        get_current_admin
    ),
) -> AdminPostDetailResponse:
    title = request.title.strip()

    slug = await get_unique_slug(
        db,
        request.slug or title,
    )

    excerpt = (
        request.excerpt.strip()
        if request.excerpt
        else None
    )

    hero_image_alt = (
        request.hero_image_alt.strip()
        if request.hero_image_alt
        else None
    )

    if request.status == "published":
        if not excerpt:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=(
                    "An excerpt is required "
                    "before publishing."
                ),
            )

        if not request.content.strip():
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=(
                    "Article content is required "
                    "before publishing."
                ),
            )

        if not request.hero_image_url:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=(
                    "A hero image is required "
                    "before publishing."
                ),
            )

        if not hero_image_alt:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=(
                    "Hero image alt text is required "
                    "before publishing."
                ),
            )

    now = datetime.now(timezone.utc)

    post = Post(
        title=title,
        slug=slug,
        excerpt=excerpt,
        content=request.content,
        status=request.status,
        hero_image_url=request.hero_image_url,
        hero_image_alt=hero_image_alt,
        tags=[
            tag.strip()
            for tag in request.tags
            if tag.strip()
        ],
        seo_title=(
            request.seo_title.strip()
            if request.seo_title
            else None
        ),
        seo_description=(
            request.seo_description.strip()
            if request.seo_description
            else None
        ),
        original_medium_url=(
            request.original_medium_url.strip()
            if request.original_medium_url
            else None
        ),
        original_published_at=(
            request.original_published_at
        ),
        published_at=(
            now
            if request.status == "published"
            else None
        ),
        updated_at=now,
    )

    db.add(post)

    await db.commit()
    await db.refresh(post)

    return AdminPostDetailResponse.model_validate(
        post
    )