from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession

from app.database.connection import get_db
from app.models.post import Post
from app.schemas.post import (
    PostDetailResponse,
    PostSummaryResponse,
)


router = APIRouter(
    prefix="/posts",
    tags=["posts"],
)


@router.get(
    "",
    response_model=list[PostSummaryResponse],
)
async def get_posts(
    db: AsyncSession = Depends(get_db),
) -> list[PostSummaryResponse]:
    result = await db.execute(
        select(Post)
        .where(Post.status == "published")
        .order_by(
            func.coalesce(
                Post.published_at,
                Post.created_at,
            ).desc()
        )
    )

    posts = result.scalars().all()

    return [
        PostSummaryResponse.model_validate(post)
        for post in posts
    ]


@router.get(
    "/{slug}",
    response_model=PostDetailResponse,
)
async def get_post(
    slug: str,
    db: AsyncSession = Depends(get_db),
) -> PostDetailResponse:
    result = await db.execute(
        select(Post).where(
            Post.slug == slug,
            Post.status == "published",
        )
    )

    post = result.scalar_one_or_none()

    if post is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Post not found.",
        )

    return PostDetailResponse.model_validate(post)

