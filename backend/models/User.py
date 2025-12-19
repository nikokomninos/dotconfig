"""
User.py

Contains pydantic/sqlmodel models for anything related
to the user table

Much of contents of this file were written with the help
of the FastAPI docs:

https://fastapi.tiangolo.com/tutorial/sql-databases/
"""

from sqlmodel import Field, SQLModel


class UserBase(SQLModel):
    username: str

class User(UserBase, table=True):
    id: int | None = Field(default=None, primary_key=True)
    username: str = Field(index=True, unique=True, nullable=False)
    password_hash: str = Field(nullable=False)
    role: str = Field(default="user", nullable=False)

class UserCreate(UserBase):
    password: str

class UserLogin(UserCreate):
    pass
