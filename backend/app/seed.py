"""Seed database with courses, exercises, users, and achievements."""
import bcrypt
from sqlalchemy.orm import Session
from sqlalchemy import text

from .course_data import LANGUAGE_COURSES, build_course_units
from .enrollment import initialize_course_progress
from .models import (
    User, Course, Unit, Skill, Lesson, Exercise,
    UserProgress, UserLessonProgress, Achievement, UserCourse,
)


def _ex(lesson_id, order_index, type_, prompt, correct, options=None, pairs=None, audio=None, hint=None):
    return Exercise(
        lesson_id=lesson_id,
        order_index=order_index,
        type=type_,
        prompt=prompt,
        correct_answer=correct,
        options=options,
        pairs=pairs,
        audio_text=audio or (correct.split("|")[0] if correct else None),
        hint=hint,
    )


def _seed_course(db: Session, lang_data: dict) -> Course | None:
    existing = db.query(Course).filter(Course.name == lang_data["name"]).first()
    if existing:
        existing.learners_count = lang_data.get("learners_count", "10M learners")
        existing.flag_emoji = lang_data["flag_emoji"]
        existing.tts_locale = lang_data["tts_locale"]

        # Clean existing units and child objects to re-populate fresh unit content
        unit_ids = [u.id for u in existing.units]
        if unit_ids:
            skill_ids = [s.id for s in db.query(Skill).filter(Skill.unit_id.in_(unit_ids)).all()]
            if skill_ids:
                lesson_ids = [l.id for l in db.query(Lesson).filter(Lesson.skill_id.in_(skill_ids)).all()]
                if lesson_ids:
                    db.query(Exercise).filter(Exercise.lesson_id.in_(lesson_ids)).delete(synchronize_session=False)
                    db.query(UserLessonProgress).filter(UserLessonProgress.lesson_id.in_(lesson_ids)).delete(synchronize_session=False)
                    db.query(Lesson).filter(Lesson.id.in_(lesson_ids)).delete(synchronize_session=False)
                db.query(UserProgress).filter(UserProgress.skill_id.in_(skill_ids)).delete(synchronize_session=False)
                db.query(Skill).filter(Skill.id.in_(skill_ids)).delete(synchronize_session=False)
            db.query(Unit).filter(Unit.id.in_(unit_ids)).delete(synchronize_session=False)
        db.flush()
        course = existing
    else:
        course = Course(
            name=lang_data["name"],
            source_language="English",
            target_language=lang_data["target_language"],
            flag_emoji=lang_data["flag_emoji"],
            tts_locale=lang_data["tts_locale"],
            learners_count=lang_data.get("learners_count", "10M learners"),
            description=lang_data["description"],
        )
        db.add(course)
        db.flush()

    units_data = build_course_units(lang_data["name"], lang_data["units"])

    for u_idx, (unit_title, unit_desc, color, skills_data) in enumerate(units_data):
        unit = Unit(
            course_id=course.id,
            title=unit_title,
            description=unit_desc,
            order_index=u_idx,
            color=color,
        )
        db.add(unit)
        db.flush()

        for s_idx, (skill_title, icon, lessons_data) in enumerate(skills_data):
            skill = Skill(
                unit_id=unit.id,
                title=skill_title,
                icon=icon,
                order_index=s_idx,
                xp_reward=10 + s_idx * 5,
            )
            db.add(skill)
            db.flush()

            for l_idx, (lesson_title, exercises_data) in enumerate(lessons_data):
                lesson = Lesson(
                    skill_id=skill.id,
                    title=lesson_title,
                    order_index=l_idx,
                    is_legendary=False,
                )
                db.add(lesson)
                db.flush()

                for e_idx, ex_data in enumerate(exercises_data):
                    type_ = ex_data[0]
                    prompt = ex_data[1]
                    correct = ex_data[2]
                    options = ex_data[3] if len(ex_data) > 3 else None
                    pairs = None
                    audio = None
                    if type_ == "match_pairs":
                        pairs = ex_data[4] if len(ex_data) > 4 else None
                    elif type_ == "multiple_choice":
                        audio = ex_data[4] if len(ex_data) > 4 else None

                    db.add(_ex(lesson.id, e_idx, type_, prompt, correct, options, pairs, audio))

            legendary = Lesson(
                skill_id=skill.id,
                title=f"{skill_title} — Legendary",
                order_index=len(lessons_data),
                is_legendary=True,
            )
            db.add(legendary)
            db.flush()
            first_correct = exercises_data[0][2] if exercises_data else "hello"
            first_options = exercises_data[0][3] if exercises_data and len(exercises_data[0]) > 3 else ["hello", "goodbye"]
            legendary_exercises = [
                ("type_answer", f"Legendary: Type the hardest word from {skill_title}", first_correct, None),
                ("multiple_choice", f"Legendary challenge for {skill_title}", first_options[0] if first_options else first_correct, first_options),
                ("translate", f"Legendary translate for {skill_title}", first_correct, first_options),
            ]
            for e_idx, ex_data in enumerate(legendary_exercises):
                type_, prompt, correct, options = ex_data
                db.add(_ex(legendary.id, e_idx, type_, prompt, correct, options))

    return course


def seed_database(db: Session):
    # ── Achievements (once) ───────────────────────────────────────────────
    if not db.query(Achievement).first():
        achievements = [
            Achievement(name="First Steps", description="Complete your first lesson", icon="👣", requirement_type="lessons", requirement_value=1),
            Achievement(name="Streak Master", description="Reach a 7-day streak", icon="🔥", requirement_type="streak", requirement_value=7),
            Achievement(name="XP Champion", description="Earn 500 XP", icon="⭐", requirement_type="xp", requirement_value=500),
            Achievement(name="Crown Collector", description="Earn 10 crowns", icon="👑", requirement_type="crowns", requirement_value=10),
            Achievement(name="Polyglot", description="Earn 2000 XP", icon="🌍", requirement_type="xp", requirement_value=2000),
        ]
        db.add_all(achievements)
        db.flush()

    # ── Demo + leaderboard users (once) ───────────────────────────────────
    if not db.query(User).first():
        users_data = [
            ("demo", "demo@duolingo.com", "#58cc02", 350, 5),
            ("MariaG", "maria@example.com", "#1cb0f6", 4200, 45),
            ("CarlosL", "carlos@example.com", "#ff9600", 3800, 32),
            ("AnaR", "ana@example.com", "#ce82ff", 2900, 28),
            ("LuisM", "luis@example.com", "#ff4b4b", 2100, 15),
            ("SofiaP", "sofia@example.com", "#ffc800", 1800, 12),
            ("DiegoH", "diego@example.com", "#58cc02", 1500, 20),
            ("ElenaV", "elena@example.com", "#1cb0f6", 1200, 8),
            ("PabloS", "pablo@example.com", "#ff9600", 900, 6),
            ("LuciaT", "lucia@example.com", "#ce82ff", 600, 4),
        ]
        users = []
        for username, email, color, xp, streak in users_data:
            u = User(
                username=username,
                email=email,
                password_hash=bcrypt.hashpw(b"password123", bcrypt.gensalt()).decode(),
                xp=xp,
                streak=streak,
                hearts=5,
                gems=500,
                avatar_color=color,
            )
            db.add(u)
            users.append(u)
        db.flush()

    # ── Courses (seed each language) ───────────────────────────────────
    valid_names = {lang["name"] for lang in LANGUAGE_COURSES}
    obsolete_courses = db.query(Course).filter(~Course.name.in_(valid_names)).all()
    for ob in obsolete_courses:
        db.delete(ob)
    db.flush()

    spanish_course = None
    for lang_data in LANGUAGE_COURSES:
        course = _seed_course(db, lang_data)
        if lang_data["name"] == "Spanish":
            spanish_course = course

    db.flush()

    # ── Demo user progress for Spanish ────────────────────────────────────
    demo_user = db.query(User).filter(User.username == "demo").first()
    if demo_user and spanish_course and not demo_user.active_course_id:
        demo_user.active_course_id = spanish_course.id
        db.add(UserCourse(user_id=demo_user.id, course_id=spanish_course.id))
        initialize_course_progress(demo_user.id, spanish_course.id, db)

        # Unlock first 3 skills with progress for demo
        from sqlalchemy.orm import joinedload
        course_with_skills = (
            db.query(Course)
            .options(joinedload(Course.units).joinedload(Unit.skills))
            .filter(Course.id == spanish_course.id)
            .first()
        )
        all_skills = []
        for unit in sorted(course_with_skills.units, key=lambda u: u.order_index):
            for skill in sorted(unit.skills, key=lambda s: s.order_index):
                all_skills.append(skill)

        for i, skill in enumerate(all_skills):
            progress = (
                db.query(UserProgress)
                .filter(UserProgress.user_id == demo_user.id, UserProgress.skill_id == skill.id)
                .first()
            )
            if not progress:
                continue
            progress.is_locked = False
            if i <= 2:
                progress.crown_level = 2 if i == 0 else 1
                progress.xp_earned = progress.crown_level * 10
            if i == 0 and skill.lessons:
                first_lesson = sorted(skill.lessons, key=lambda l: l.order_index)[0]
                existing_lp = (
                    db.query(UserLessonProgress)
                    .filter(
                        UserLessonProgress.user_id == demo_user.id,
                        UserLessonProgress.lesson_id == first_lesson.id,
                    )
                    .first()
                )
                if not existing_lp:
                    db.add(UserLessonProgress(
                        user_id=demo_user.id,
                        lesson_id=first_lesson.id,
                        completed=True,
                        score=5,
                    ))

    db.commit()
    course_count = db.query(Course).count()
    print(f"Database seeded successfully! ({course_count} languages)")
