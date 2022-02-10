
from typing import Optional

from pydantic import BaseModel


class LoginForm(BaseModel):
    username: str
    password: str


class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    username: Optional[str] = None


class User(BaseModel):
    username: str


class ShowUser(User):
    id: int
    
    class Config:
        orm_mode = True
