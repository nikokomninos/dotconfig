"""
db.py

Contains anything related to setting the database up upon
app boot

Much of the contents of this file were written with the help of
and directly pulled from the FastAPI docs:

https://fastapi.tiangolo.com/tutorial/sql-databases/
"""

import json
import os
from typing import Annotated

from dotenv import load_dotenv
from fastapi import Depends
from sqlmodel import Session, SQLModel, create_engine, select

from .models.Program import Program

load_dotenv()

uri = os.getenv("POSTGRES_URI")

engine = create_engine(uri, echo=True, pool_pre_ping=True, connect_args={"sslmode": "require"})

def create_db_and_tables():
    """
    Creates all db tables if they do not exist
    """
    SQLModel.metadata.create_all(engine)

def read_programs():
    """
    Reads a pre-defined list of programs stored in
    programs.json in the root of the project
    """
    with open("programs.json", "r") as fp:
        return json.load(fp)

def populate_programs():
    """
    Populates the program table in the database
    with the contents of programs.json
    """
    programs = read_programs()
    with Session(engine) as session:
        for prog in programs:
            existing = session.exec(select(Program).where(Program.name == prog["name"])).first()
            if not existing:
                db_prog = Program(name=prog["name"], install_command=prog["install_command"])
                session.add(db_prog)
        session.commit()

def get_session():
    """
    Sets up the database session
    """
    with Session(engine) as session:
        yield session

SessionDep = Annotated[Session, Depends(get_session)]
