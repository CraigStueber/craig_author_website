import re
import uuid
from pathlib import Path

import httpx
from fastapi import HTTPException, UploadFile, status

from app.config.settings import settings


BUCKET_NAME = "blog-images"

ALLOWED_CONTENT_TYPES = {
    "image/jpeg": ".jpg",
    "image/png": ".png",
    "image/webp": ".webp",
}

MAX_FILE_SIZE = 8 * 1024 * 1024


def clean_filename(filename: str) -> str:
    stem = Path(filename).stem.lower()

    stem = re.sub(
        r"[^a-z0-9]+",
        "-",
        stem,
    )

    stem = stem.strip("-")

    return stem or "image"


async def upload_blog_image(
    file: UploadFile,
) -> str:
    if file.content_type not in ALLOWED_CONTENT_TYPES:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Blog images must be JPG, PNG, or WebP.",
        )

    contents = await file.read()

    if len(contents) > MAX_FILE_SIZE:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Image must be smaller than 8 MB.",
        )

    extension = ALLOWED_CONTENT_TYPES[
        file.content_type
    ]

    stem = clean_filename(
        file.filename or "image"
    )

    filename = (
        f"{stem}-"
        f"{uuid.uuid4().hex[:12]}"
        f"{extension}"
    )

    supabase_url = (
        settings.supabase_url
        .rstrip("/")
    )

    storage_url = (
        f"{supabase_url}"
        f"/storage/v1/object/"
        f"{BUCKET_NAME}/{filename}"
    )

    key = (
        settings
        .supabase_service_role_key
        .strip()
    )

    headers = {
        "apikey": key,
        "Content-Type": file.content_type,
        "x-upsert": "false",
    }

    # Legacy service_role keys are JWTs and can
    # also be supplied as Bearer tokens.
    #
    # New sb_secret_ keys must NOT be used as
    # Bearer JWTs.
    if not key.startswith("sb_secret_"):
        headers["Authorization"] = (
            f"Bearer {key}"
        )

    async with httpx.AsyncClient(
        timeout=30.0
    ) as client:
        response = await client.post(
            storage_url,
            headers=headers,
            content=contents,
        )

    if not response.is_success:
        print(
            "Supabase Storage upload failed:",
            response.status_code,
            response.text,
        )

        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail=(
                "Unable to upload blog image. "
                f"Storage returned {response.status_code}."
            ),
        )

    public_url = (
        f"{supabase_url}"
        f"/storage/v1/object/public/"
        f"{BUCKET_NAME}/{filename}"
    )

    return public_url