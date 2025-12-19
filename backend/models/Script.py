"""
Script.py

Contains pydantic/sqlmodel models for anything related
to the script builder
"""

from pydantic import BaseModel


class ScriptRequest(BaseModel):
    programs: list[str]
    os: str
