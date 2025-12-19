"""
auth.py

Contains all routes, route logic and helper methods for anything
related to user authentication

Much of the contents of this file were written with the help of
and directly pulled from the FastAPI docs:

https://fastapi.tiangolo.com/tutorial/security/oauth2-jwt/

Modifications were made since the docs use SQLite as the example
database, and I used Postgres. The original contents also
returned the JWT token to the frontend as JSON. I replaced this
approach with storing the JWT in an HTTP-Only cookie that is attached
to all future Request bodies once the user is authenticated. I took
this approach in another project I had worked on for
CSC482 Senior Seminar, and decided to adopt it here as well.
"""

import os
from datetime import datetime, timedelta, timezone
from typing import Annotated

import jwt
from dotenv import load_dotenv
from fastapi import APIRouter, Depends, HTTPException, Request, Response, status
from fastapi.responses import RedirectResponse
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from jwt.exceptions import ExpiredSignatureError, InvalidTokenError
from pwdlib import PasswordHash

from ..db import SessionDep
from ..models.User import User, UserCreate

load_dotenv()

secret_key = os.getenv("SECRET_KEY")
hash_algorithm = os.getenv("HASH_ALGORITHM")
expiration_mins = os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES")
frontend_url = os.getenv("FRONTEND_URL")

pwd_hash = PasswordHash.recommended()

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


def hash_password(password: str) -> str:
    """
    Hashes a password

    Args:
        password: a plain-text password
    
    Returns:
        The hashed password
    """
    return pwd_hash.hash(password)


def verify_password(plain_password: str, hashed_password: str) -> bool:
    """
    Verifies a plain-text password against a hashed password

    Args:
        plain_password: a plain-text password
        hashed_password: a hashed password
    
    Returns:
        True if equal, False otherwise
    """
    return pwd_hash.verify(plain_password, hashed_password)


def get_user(username: str, session: SessionDep):
    """
    Gets a user from the database

    Args:
        username: the user's username
        session: the database session
    
    Returns:
        A User object if the user exists in the database,
        None otherwise
    """
    db_user = session.query(User).filter(User.username == username).first()
    return db_user


def authenticate_user(username: str, password: str, session: SessionDep):
    """
    Authenticates the user by first getting the user
    from the database, and then verifying the passwords

    Args:
        username: the user's username
        password: the user's plain-text password
        session: the database session
    
    Returns:
        A User object if all checks pass, False otherwise
    """
    user = get_user(username, session)
    if not user:
        return False
    if not verify_password(password, user.password_hash):
        return False
    return user


def create_access_token(data: dict, expires_delta: timedelta | None = None) -> str:
    """
    Creates a JWT token for user authentication

    Args:
        data: token "sub" argument, where the value is the user's username
        expires_delta: a time delta for token expiration
    
    Returns:
        The encoded JWT
    """
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, secret_key, algorithm=hash_algorithm)
    return encoded_jwt

def get_current_user(
    request: Request,
    session: SessionDep,
) -> User:
    """
    Gets the current user based on the JWT stored in the client-side cookie
    Used to check current auth status

    Args:
        request: the HTTP Request
        session: the database session
    
    Returns:
        The user if all checks pass, 401 code otherwise
    """
    token = request.cookies.get("access_token")

    # Perform various checks for things like token expiration,
    # invalid token, etc.

    if not token:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)

    try:
        payload = jwt.decode(token, secret_key, algorithms=[hash_algorithm])
    except ExpiredSignatureError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)
    except InvalidTokenError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)

    username = payload.get("sub")
    if not username:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)

    user = get_user(username, session)
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)

    return user


router = APIRouter(prefix="/api/v1/auth", tags=["auth"])


@router.post("/register")
async def register(user: UserCreate, session: SessionDep) -> dict:
    """
    A route for registering a user

    Args:
        user: A pydantic model containing the information needed to
        register a user
        session: the database session
    
    Returns:
        Response body containing message
    """
    password_hash = hash_password(user.password)
    new_user = User(username=user.username, password_hash=password_hash)
    session.add(new_user)
    session.commit()
    session.refresh(new_user)
    return {"message": "User successfully created"}


@router.post("/login")
async def login(
    form_data: Annotated[OAuth2PasswordRequestForm, Depends()],
    session: SessionDep,
    response: Response,
):
    """
    A route for logging a user in

    Args:
        form_data: The information needed to login, in the structure of
        an OAuth2PasswordRequestForm "password flow"
        session: the database session
        response: the HTTP response
    
    Returns:
        Response containing a body with a message and a cookie containing a JWT
    """

    user = authenticate_user(form_data.username, form_data.password, session)

    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
        )

    access_token = create_access_token(
        data={"sub": user.username},
        expires_delta=timedelta(minutes=int(expiration_mins)),
    )

    response.set_cookie(
        key="access_token",
        value=access_token,
        httponly=True,
        secure=True,
        samesite="none",
        max_age=expiration_mins * 60,
        path="/",
    )

    return {"message": "Login successful"}

@router.post("/logout")
def logout(response: Response):
    """
    A route for logging a user out

    Args:
        response: the HTTP response
    
    Returns:
        Response no longer containing the auth cookie
    """

    # Handled the redirect on the backend so that the navbar
    # could stay rendered server-side
    #response = RedirectResponse(url=frontend_url)
    response.delete_cookie("access_token", path="/")
    return {"message" : "Logged out successfully"}

@router.get("/status")
def auth_status(user: Annotated[User, Depends(get_current_user)]):
    """
    A route for checking the auth status of the user

    Args:
        user: the current user (if any)

    Returns:
        True if there is an authenticated user, False otherwise
    """

    return {"authenticated": True}
