"""Initialize user progress when enrolling in a course."""
from sqlalchemy.orm import Session, joinedload

from .models import Course, UserProgress, User, Unit, Skill


def initialize_course_progress(user_id: int, course_id: int, db: Session) -> None:
    """Create UserProgress rows for all skills in a course. First skill unlocked."""
    course = (
        db.query(Course)
        .options(joinedload(Course.units).joinedload(Unit.skills))
        .filter(Course.id == course_id)
        .first()
    )
    if not course:
        return

    all_skills = []
    for unit in sorted(course.units, key=lambda u: u.order_index):
        for skill in sorted(unit.skills, key=lambda s: s.order_index):
            all_skills.append(skill)

    for i, skill in enumerate(all_skills):
        existing = (
            db.query(UserProgress)
            .filter(UserProgress.user_id == user_id, UserProgress.skill_id == skill.id)
            .first()
        )
        if existing:
            continue
        db.add(
            UserProgress(
                user_id=user_id,
                skill_id=skill.id,
                crown_level=0,
                completed=False,
                xp_earned=0,
                is_locked=False,
                is_legendary=False,
            )
        )


def set_active_course(user: User, course_id: int, db: Session) -> None:
    user.active_course_id = course_id
    initialize_course_progress(user.id, course_id, db)
