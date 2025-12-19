"""
Program.py

Contains pydantic/sqlmodel models for anything related
to the program table
"""

from typing import Dict

from sqlmodel import JSON, Column, Field, SQLModel


class Program(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    name: str = Field(index=True, unique=True, nullable=False)
    install_command: Dict[str, str] = Field(sa_column=Column(JSON))
