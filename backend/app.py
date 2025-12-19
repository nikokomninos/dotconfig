"""
app.py

The main file for the backend

Much of the contents of this file were written with the help of
and directly pulled from the FastAPI docs:

https://fastapi.tiangolo.com/tutorial/
"""

from fastapi import APIRouter, FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .db import create_db_and_tables, populate_programs
from .routers import auth, builder

app = FastAPI()
router = APIRouter(prefix="/api/v1")
origins = [
    "http://localhost:3000",
    "dotconfig.vercel.app"
]

@router.get("/")
async def root():
    return "Hello World"

app.include_router(router)
app.include_router(auth.router)
app.include_router(builder.router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def on_startup():
    create_db_and_tables()
    populate_programs()
