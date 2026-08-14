import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import inspect, text

from .database import engine, Base, SessionLocal
from .routers import auth, courses, lessons, user
from .seed import seed_database

app = FastAPI(title="TanLingo API", version="1.0.0")

frontend_url = os.getenv("FRONTEND_URL", "*")

origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]
if frontend_url != "*":
    origins.append(frontend_url)

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins if frontend_url != "*" else ["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(courses.router)
app.include_router(lessons.router)
app.include_router(user.router)


def _migrate_schema():
    """Add new columns/tables for existing SQLite databases."""
    Base.metadata.create_all(bind=engine)
    inspector = inspect(engine)
    if "courses" in inspector.get_table_names():
        course_cols = {c["name"] for c in inspector.get_columns("courses")}
        if "tts_locale" not in course_cols:
            with engine.begin() as conn:
                conn.execute(text("ALTER TABLE courses ADD COLUMN tts_locale VARCHAR(20) DEFAULT 'es-ES'"))
        if "learners_count" not in course_cols:
            with engine.begin() as conn:
                conn.execute(text("ALTER TABLE courses ADD COLUMN learners_count VARCHAR(50) DEFAULT '10M learners'"))
    if "users" in inspector.get_table_names():
        user_cols = {c["name"] for c in inspector.get_columns("users")}
        if "active_course_id" not in user_cols:
            with engine.begin() as conn:
                conn.execute(text("ALTER TABLE users ADD COLUMN active_course_id INTEGER REFERENCES courses(id)"))


@app.on_event("startup")
def startup():
    _migrate_schema()
    db = SessionLocal()
    try:
        seed_database(db)
    finally:
        db.close()


@app.get("/")
def root():
    return {"message": "TanLingo API", "docs": "/docs"}
