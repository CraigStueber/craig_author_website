from datetime import datetime, timezone

from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
    status,
)
from sqlalchemy import case, select
from sqlalchemy.ext.asyncio import AsyncSession

from app.auth.session import get_current_admin
from app.database.connection import get_db
from app.models.comment import Comment
from app.models.post import Post
from app.schemas.comment import (
    AdminCommentReplyRequest,
    AdminCommentResponse,
    AdminCommentStatusRequest,
)


router = APIRouter(
    prefix="/admin/comments",
    tags=["admin-comments"],
)


def build_comment_response(
    comment: Comment,
    post_title: str,
    post_slug: str,
) -> AdminCommentResponse:
    return AdminCommentResponse(
        id=comment.id,

        post_id=comment.post_id,
        post_title=post_title,
        post_slug=post_slug,

        parent_id=comment.parent_id,

        name=comment.name,
        email=comment.email,
        body=comment.body,

        status=comment.status,
        moderation_flags=comment.moderation_flags,

        is_author=comment.is_author,

        created_at=comment.created_at,
        approved_at=comment.approved_at,
    )


@router.get(
    "",
    response_model=list[AdminCommentResponse],
)
async def get_admin_comments(
    db: AsyncSession = Depends(get_db),
    admin: str = Depends(get_current_admin),
) -> list[AdminCommentResponse]:
    result = await db.execute(
        select(
            Comment,
            Post.title,
            Post.slug,
        )
        .join(
            Post,
            Post.id == Comment.post_id,
        )
        .order_by(
            case(
                (
                    Comment.status == "pending",
                    0,
                ),
                else_=1,
            ),
            Comment.created_at.desc(),
        )
    )

    rows = result.all()

    return [
        build_comment_response(
            comment,
            post_title,
            post_slug,
        )
        for (
            comment,
            post_title,
            post_slug,
        ) in rows
    ]


@router.patch(
    "/{comment_id}/status",
    response_model=AdminCommentResponse,
)
async def update_comment_status(
    comment_id: str,
    request: AdminCommentStatusRequest,
    db: AsyncSession = Depends(get_db),
    admin: str = Depends(get_current_admin),
) -> AdminCommentResponse:
    result = await db.execute(
        select(
            Comment,
            Post.title,
            Post.slug,
        )
        .join(
            Post,
            Post.id == Comment.post_id,
        )
        .where(
            Comment.id == comment_id
        )
    )

    row = result.one_or_none()

    if row is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Comment not found.",
        )

    comment, post_title, post_slug = row

    comment.status = request.status

    if request.status == "approved":
        comment.approved_at = (
            datetime.now(timezone.utc)
        )
    else:
        comment.approved_at = None

    await db.commit()
    await db.refresh(comment)

    return build_comment_response(
        comment,
        post_title,
        post_slug,
    )
@router.post(
    "/{comment_id}/reply",
    response_model=AdminCommentResponse,
    status_code=status.HTTP_201_CREATED,
)
async def reply_to_comment(
    comment_id: str,
    request: AdminCommentReplyRequest,
    db: AsyncSession = Depends(get_db),
    admin: str = Depends(get_current_admin),
) -> AdminCommentResponse:
    result = await db.execute(
        select(
            Comment,
            Post.title,
            Post.slug,
        )
        .join(
            Post,
            Post.id == Comment.post_id,
        )
        .where(
            Comment.id == comment_id
        )
    )

    row = result.one_or_none()

    if row is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Comment not found.",
        )

    parent_comment, post_title, post_slug = row

    if parent_comment.parent_id is not None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Replies can only be added to reader comments.",
        )

    if parent_comment.is_author:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot reply to an author reply.",
        )

    if parent_comment.status != "approved":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Approve the comment before replying.",
        )

    body = request.body.strip()

    if not body:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Reply is required.",
        )

    now = datetime.now(timezone.utc)

    reply = Comment(
        post_id=parent_comment.post_id,
        parent_id=parent_comment.id,

        name="Craig A. Stueber",
        email=None,
        body=body,

        status="approved",
        moderation_flags=[],
        is_author=True,

        approved_at=now,
    )

    db.add(reply)

    await db.commit()
    await db.refresh(reply)

    return build_comment_response(
        reply,
        post_title,
        post_slug,
    )