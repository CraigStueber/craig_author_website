from pydantic import BaseModel, EmailStr, Field


class ContactMessageRequest(BaseModel):
    name: str = Field(min_length=2, max_length=120)
    email: EmailStr
    subject: str = Field(min_length=2, max_length=120)
    message: str = Field(min_length=10, max_length=5000)


class ContactMessageResponse(BaseModel):
    message: str