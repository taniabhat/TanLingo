from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session, joinedload

from ..database import get_db
from ..enrollment import initialize_course_progress, set_active_course
from ..models import Course, Unit, Skill, UserProgress, UserLessonProgress, User, UserCourse
from ..schemas import CourseOut, CourseSummary, SkillOut, UnitOut, LessonOut, EnrollResponse
from .auth import get_current_user

router = APIRouter(prefix="/courses", tags=["courses"])


def _build_skill(skill: Skill, user: User, db: Session) -> SkillOut:
    progress = (
        db.query(UserProgress)
        .filter(UserProgress.user_id == user.id, UserProgress.skill_id == skill.id)
        .first()
    )
    crown = progress.crown_level if progress else 0
    is_locked = progress.is_locked if progress else False
    is_legendary = progress.is_legendary if progress else False
    completed = progress.completed if progress else False

    lessons_out = []
    any_lesson_completed = False
    for lesson in sorted(skill.lessons, key=lambda l: l.order_index):
        lp = (
            db.query(UserLessonProgress)
            .filter(
                UserLessonProgress.user_id == user.id,
                UserLessonProgress.lesson_id == lesson.id,
            )
            .first()
        )
        is_lp_comp = lp.completed if lp else False
        if is_lp_comp:
            any_lesson_completed = True
        lessons_out.append(
            LessonOut(
                id=lesson.id,
                title=lesson.title,
                order_index=lesson.order_index,
                is_legendary=lesson.is_legendary,
                completed=is_lp_comp,
                exercise_count=len(lesson.exercises),
            )
        )

    if not completed and (any_lesson_completed or (progress and (progress.crown_level >= 1 or progress.xp_earned > 0))):
        completed = True

    return SkillOut(
        id=skill.id,
        title=skill.title,
        icon=skill.icon,
        order_index=skill.order_index,
        xp_reward=skill.xp_reward,
        crown_level=crown,
        is_locked=is_locked,
        is_legendary=is_legendary,
        completed=completed,
        lessons=lessons_out,
    )


def _course_summary(course: Course, user: User | None, db: Session) -> CourseSummary:
    enrolled = False
    is_active = False
    if user:
        enrolled = (
            db.query(UserCourse)
            .filter(UserCourse.user_id == user.id, UserCourse.course_id == course.id)
            .first()
            is not None
        )
        is_active = user.active_course_id == course.id
    return CourseSummary(
        id=course.id,
        name=course.name,
        source_language=course.source_language,
        target_language=course.target_language,
        flag_emoji=course.flag_emoji,
        tts_locale=getattr(course, "tts_locale", None) or "es-ES",
        learners_count=getattr(course, "learners_count", None) or "10M learners",
        description=course.description,
        enrolled=enrolled,
        is_active=is_active,
    )


@router.get("/", response_model=list[CourseSummary])
def list_courses(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    courses = db.query(Course).order_by(Course.id).all()
    return [_course_summary(c, current_user, db) for c in courses]


@router.post("/{course_id}/enroll", response_model=EnrollResponse)
def enroll_in_course(
    course_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    course = db.query(Course).filter(Course.id == course_id).first()
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")

    existing = (
        db.query(UserCourse)
        .filter(UserCourse.user_id == current_user.id, UserCourse.course_id == course_id)
        .first()
    )
    if not existing:
        db.add(UserCourse(user_id=current_user.id, course_id=course_id))

    set_active_course(current_user, course_id, db)
    db.commit()
    db.refresh(current_user)

    return EnrollResponse(
        course_id=course_id,
        message=f"Enrolled in {course.name}!",
        active_course_id=current_user.active_course_id,
    )


@router.get("/{course_id}", response_model=CourseOut)
def get_course(
    course_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    course = (
        db.query(Course)
        .options(
            joinedload(Course.units)
            .joinedload(Unit.skills)
            .joinedload(Skill.lessons)
        )
        .filter(Course.id == course_id)
        .first()
    )
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")

    enrolled = (
        db.query(UserCourse)
        .filter(UserCourse.user_id == current_user.id, UserCourse.course_id == course_id)
        .first()
    )
    if not enrolled:
        raise HTTPException(status_code=403, detail="Not enrolled in this course. Enroll first.")

    units_out = []
    for unit in sorted(course.units, key=lambda u: u.order_index):
        skills_out = [
            _build_skill(skill, current_user, db)
            for skill in sorted(unit.skills, key=lambda s: s.order_index)
        ]
        units_out.append(
            UnitOut(
                id=unit.id,
                title=unit.title,
                description=unit.description,
                order_index=unit.order_index,
                color=unit.color,
                skills=skills_out,
            )
        )

    summary = _course_summary(course, current_user, db)
    return CourseOut(
        id=course.id,
        name=course.name,
        source_language=course.source_language,
        target_language=course.target_language,
        flag_emoji=course.flag_emoji,
        tts_locale=summary.tts_locale,
        description=course.description,
        units=units_out,
        enrolled=summary.enrolled,
        is_active=summary.is_active,
    )
