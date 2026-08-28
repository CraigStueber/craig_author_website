from fastapi import APIRouter
from sqlalchemy import text

from app.database.connection import engine


router = APIRouter(prefix="/health", tags=["health"])


@router.get("")
async def health():
    return {
        "status": "ok",
        "service": "craig-author-api",
    }


@router.get("/database")
async def database_health():
    async with engine.connect() as connection:
        await connection.execute(text("SELECT 1"))

    return {
        "status": "ok",
        "database": "connected",
    }