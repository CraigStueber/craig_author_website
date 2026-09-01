from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
    status,
)
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.database.connection import get_db
from app.models.comment import Comment
from app.models.post import Post
from app.schemas.comment import (
    CommentCreateRequest,
    CommentCreateResponse,
    PublicCommentResponse,
)
from app.services.turnstile_service import (
    TurnstileVerificationError,
    verify_turnstile,
)


router = APIRouter(
    prefix="/posts",
    tags=["comments"],
)


@router.post(
    "/{slug}/comments",
    response_model=CommentCreateResponse,
    status_code=status.HTTP_201_CREATED,
)
async def create_comment(
    slug: str,
    request: CommentCreateRequest,
    db: AsyncSession = Depends(get_db),
) -> CommentCreateResponse:
    try:
        turnstile_valid = await verify_turnstile(
            token=request.turnstile_token,
            expected_action="comment",
        )
    except TurnstileVerificationError as exc:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail=(
                "Unable to verify the security check. "
                "Please try again."
            ),
        ) from exc

    if not turnstile_valid:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=(
                "Security verification failed. "
                "Please try again."
            ),
        )

    post_result = await db.execute(
        select(Post).where(
            Post.slug == slug,
            Post.status == "published",
        )
    )

    post = post_result.scalar_one_or_none()

    if post is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Post not found.",
        )

    name = request.name.strip()
    body = request.body.strip()

    if not name:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Name is required.",
        )

    if not body:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Comment is required.",
        )

    comment = Comment(
        post_id=post.id,

        # Readers cannot create replies yet.
        parent_id=None,

        name=name,
        email=str(request.email).lower().strip(),
        body=body,

        # These values are always controlled
        # by the backend.
        status="pending",
        moderation_flags=[],
        is_author=False,
        approved_at=None,
    )

    db.add(comment)

    await db.commit()

    return CommentCreateResponse(
        message=(
            "Thanks for commenting. "
            "Your comment is awaiting approval."
        )
    )


@router.get(
    "/{slug}/comments",
    response_model=list[PublicCommentResponse],
)
async def get_comments(
    slug: str,
    db: AsyncSession = Depends(get_db),
) -> list[PublicCommentResponse]:
    post_result = await db.execute(
        select(Post).where(
            Post.slug == slug,
            Post.status == "published",
        )
    )

    post = post_result.scalar_one_or_none()

    if post is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Post not found.",
        )

    result = await db.execute(
        select(Comment)
        .where(
            Comment.post_id == post.id,
            Comment.status == "approved",
        )
        .order_by(
            Comment.created_at.asc()
        )
    )

    comments = result.scalars().all()

    return [
        PublicCommentResponse.model_validate(
            comment
        )
        for comment in comments
    ]