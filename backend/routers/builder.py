"""
builder.py

Contains all routes, route logic and helper methods for anything
related to the script builder
"""

from fastapi import APIRouter
from jinja2 import Environment, FileSystemLoader
from sqlmodel import select

from ..db import SessionDep
from ..models.Program import Program
from ..models.Script import ScriptRequest

router = APIRouter(prefix="/api/v1/builder", tags=["builder"])

def get_programs_by_name(
    session: SessionDep,
    program_names: list[str],
) -> list[Program]:
    """
    Gets the full rows of specified programs from the database

    Args:
        session: the database session
        program_names: the list of programs being queried for
        in the database

    Returns:
        A list of program rows
    """
    statement = select(Program).where(Program.name.in_(program_names))
    return session.exec(statement).all()

def build_install_map(
    programs: list[Program],
    os_name: str,
) -> dict[str, list[str]]:
    """
    Creates a map/dict where the key is the name of the program,
    and the value is its install command based on the selected
    operating system

    Args:
        programs: a list of program names
        os_name: the operating system name

    Returns:
        A dict containing kv pairs of name and install command
    """
    install_map: dict[str, list[str]] = {}

    for program in programs:
        cmd = program.install_command.get(os_name)
        if not cmd:
            continue

        install_map[program.name] = [cmd]

    return install_map

def generate_install_script(
    selected_programs: list[str],
    os_name: str,
    session: SessionDep,
) -> str:
    """
    Generates an install script based on the user's selected programs and
    operating system using a Jinja template

    Args:
        selected_programs: a list of user-selected programs
        os_name: the operating system name
        session: the database session

    Returns:
        A string containing the rendered Jinja template
    """
    programs = get_programs_by_name(session, selected_programs)
    installs = build_install_map(programs, os_name)

    env = Environment(
        loader=FileSystemLoader("templates"),
        autoescape=False,
    )
    template = env.get_template("install.sh.j2")

    return template.render(
        programs=installs.keys(),
        installs=installs,
        os=os_name,
    )

@router.get("/programs")
async def get_all_programs(session: SessionDep):
    """
    A route for querying all programs currently in the database

    Args:
        session: the database session
    
    Returns:
        An array of programs
    """

    programs = session.exec(select(Program.name)).all()
    return programs


@router.post("/generate-script")
def generate_script(
    build: ScriptRequest,
    session: SessionDep
):
    """
    A route for generating an install script

    Args:
        build: a pydantic model that contains all information required
        for building a script
        session: the database session
    
    Returns:
        The generated script
    """

    script = generate_install_script(
        selected_programs=build.programs,
        os_name=build.os,
        session=session,
    )
    print(script)
    return {"script": script}
