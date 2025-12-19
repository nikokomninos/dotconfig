# dotconfig

My CSC 350 Final Project.

dotconfig is a prototype system configuration script generator. It is inspired by projects like Chris Titus's Windows Utility and LARBS.
The purpose is to provide a user with an easy way to quickly generate a script to save them time with setting up a fresh system. They can select any
programs, preferences and settings and it'll automatically generate a script to do so that can be ran and will have your system set up in no time
at all. Tools like this exist, but they are all split up and target one operating system. My goal was to prototype an idea for a web-app that hosts
solutions for all operating systems, and eventually could become a community hub for sharing configurations and configuration files.

It can be found at https://dotconfig.vercel.app/

Authentication is a bit finnicky on the frotnend deployment, so it is best to run the app locally:

Frontend:

1. `cd` into `frontend` and install all dependencies `npm install`
2. Run the frontend with `npm run dev`
3. Visit `http://localhost:3000`

Backend:

1. `cd` into `backend`
2. Create a venv and install all dependencies with `pip install -r requirements.txt`
3. Run the backend with `fastapi dev app.py`

I have included a backup video showcasing all features in case there is trouble with both the production and developments environments


## Tech Stack And Purpose

- NextJS + TailWindCSS: On the frontend, I used NextJS + TailWindCSS because it is what I am most familiar with, and fits an application like this well.
- FastAPI + Jinja2: On the backend, I opted for FastAPI since I knew I would be using Jinja templates for generating the setup scripts
- Pydantic / SQLModel: For form validation I used Pydantic and SQLModel (which is a wrapper for both SQLAlchemy and Pydantic, created by the person
        who made FastAPI)
- PostgreSQL: For my database, I used Postgres since there were many easy hosting solutions, and SQLModel made it easy to work with Postgres
