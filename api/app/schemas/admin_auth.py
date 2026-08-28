from pydantic import BaseModel, Field


class AdminLoginRequest(BaseModel):
    username: str = Field(min_length=1, max_length=120)
    password: str = Field(min_length=1, max_length=500)


class AdminSessionResponse(BaseModel):
    authenticated: bool
    username: str


class AdminLogoutResponse(BaseModel):
    message: str