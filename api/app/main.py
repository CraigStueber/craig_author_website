from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes.contact import router as contact_router
from app.routes.health import router as health_router
from app.routes.newsletter import router as newsletter_router
from app.routes.posts import router as posts_router
from app.routes.comments import router as comments_router
from app.routes.admin_comments import (
    router as admin_comments_router,
)

from app.routes.admin_auth import router as admin_auth_router
from app.routes.admin_posts import router as admin_posts_router

app = FastAPI(
    title="Craig A. Stueber Author Website API",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health_router)
app.include_router(newsletter_router)
app.include_router(contact_router)
app.include_router(posts_router)
app.include_router(comments_router)

app.include_router(admin_comments_router)
app.include_router(admin_auth_router)
app.include_router(admin_posts_router)