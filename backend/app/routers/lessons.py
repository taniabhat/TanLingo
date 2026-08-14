from datetime import datetime
from fastapi import APIRouter, Depends, HTTPException, BackgroundTasks
from sqlalchemy.orm import Session, joinedload

from ..database import get_db
from ..email_service import send_course_completion_email
from ..models import (
    User, Lesson, Exercise, UserProgress, UserLessonProgress,
    Skill, Achievement, UserAchievement, Unit,
)
from ..schemas import (
    LessonDetailOut, ExerciseOut, LessonSubmitRequest, LessonSubmitResponse,
    HeartDeductRequest, HeartDeductResponse, AchievementOut,
)
from .auth import get_current_user

router = APIRouter(prefix="/lessons", tags=["lessons"])


def _check_achievements(user: User, db: Session) -> list[AchievementOut]:
    achievements = db.query(Achievement).all()
    new_unlocks = []
    for ach in achievements:
        existing = (
            db.query(UserAchievement)
            .filter(
                UserAchievement.user_id == user.id,
                UserAchievement.achievement_id == ach.id,
            )
            .first()
        )
        if existing:
            continue
        unlocked = False
        if ach.requirement_type == "xp" and user.xp >= ach.requirement_value:
            unlocked = True
        elif ach.requirement_type == "streak" and user.streak >= ach.requirement_value:
            unlocked = True
        elif ach.requirement_type == "crowns":
            total_crowns = sum(p.crown_level for p in user.progress)
            if total_crowns >= ach.requirement_value:
                unlocked = True
        elif ach.requirement_type == "lessons":
            completed = (
                db.query(UserLessonProgress)
                .filter(
                    UserLessonProgress.user_id == user.id,
                    UserLessonProgress.completed == True,
                )
                .count()
            )
            if completed >= ach.requirement_value:
                unlocked = True

        if unlocked:
            ua = UserAchievement(user_id=user.id, achievement_id=ach.id)
            db.add(ua)
            new_unlocks.append(
                AchievementOut(
                    id=ach.id,
                    name=ach.name,
                    description=ach.description,
                    icon=ach.icon,
                    requirement_type=ach.requirement_type,
                    requirement_value=ach.requirement_value,
                    unlocked=True,
                    unlocked_at=datetime.utcnow(),
                )
            )
    return new_unlocks


def _unlock_next_skill(user_id: int, skill: Skill, db: Session):
    from sqlalchemy.orm import joinedload
    unit = db.query(Skill).options(joinedload(Skill.unit).joinedload(Unit.skills)).filter(Skill.id == skill.id).first()
    if not unit or not unit.unit:
        return
    unit_skills = sorted(unit.unit.skills, key=lambda s: s.order_index)
    idx = next((i for i, s in enumerate(unit_skills) if s.id == skill.id), -1)
    if idx >= 0 and idx + 1 < len(unit_skills):
        next_skill = unit_skills[idx + 1]
        np = (
            db.query(UserProgress)
            .filter(UserProgress.user_id == user_id, UserProgress.skill_id == next_skill.id)
            .first()
        )
        if np:
            np.is_locked = False


@router.get("/{lesson_id}", response_model=LessonDetailOut)
def get_lesson(
    lesson_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    lesson = (
        db.query(Lesson)
        .options(
            joinedload(Lesson.exercises),
            joinedload(Lesson.skill).joinedload(Skill.unit).joinedload(Unit.course),
        )
        .filter(Lesson.id == lesson_id)
        .first()
    )
    if not lesson:
        raise HTTPException(status_code=404, detail="Lesson not found")

    progress = (
        db.query(UserProgress)
        .filter(
            UserProgress.user_id == current_user.id,
            UserProgress.skill_id == lesson.skill_id,
        )
        .first()
    )
    if progress and progress.is_locked and not lesson.is_legendary:
        raise HTTPException(status_code=403, detail="Skill is locked")

    tts_loc = "es-ES"
    if lesson.skill and lesson.skill.unit and lesson.skill.unit.course:
        tts_loc = lesson.skill.unit.course.tts_locale or "es-ES"

    exercises = sorted(lesson.exercises, key=lambda e: e.order_index)
    return LessonDetailOut(
        id=lesson.id,
        title=lesson.title,
        skill_id=lesson.skill_id,
        skill_title=lesson.skill.title,
        is_legendary=lesson.is_legendary,
        tts_locale=tts_loc,
        exercises=[ExerciseOut.model_validate(e) for e in exercises],
        user_hearts=current_user.hearts,
        user_xp=current_user.xp,
    )


@router.post("/deduct-heart", response_model=HeartDeductResponse)
def deduct_heart(
    req: HeartDeductRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    if current_user.hearts > 0:
        current_user.hearts -= 1
        db.commit()
        db.refresh(current_user)
    return HeartDeductResponse(
        hearts=current_user.hearts,
        out_of_hearts=current_user.hearts <= 0,
    )


@router.post("/{lesson_id}/submit", response_model=LessonSubmitResponse)
def submit_lesson(
    lesson_id: int,
    submission: LessonSubmitRequest,
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    lesson = (
        db.query(Lesson)
        .options(joinedload(Lesson.exercises), joinedload(Lesson.skill).joinedload(Skill.unit).joinedload(Unit.course))
        .filter(Lesson.id == lesson_id)
        .first()
    )
    if not lesson:
        raise HTTPException(status_code=404, detail="Lesson not found")

    skill = lesson.skill
    exercise_map = {e.id: e for e in lesson.exercises}
    score = 0
    total = len(lesson.exercises)

    for ans in submission.answers:
        exercise = exercise_map.get(ans.exercise_id)
        if not exercise:
            continue
        correct = ans.answer.strip().lower() == exercise.correct_answer.strip().lower()
        if exercise.type == "match_pairs":
            correct = ans.answer.strip() == exercise.correct_answer.strip()
        if correct:
            score += 1

    failed = score < total or current_user.hearts <= 0
    xp_earned = 0
    crown_level = 0

    if not failed:
        base_xp = skill.xp_reward * (2 if lesson.is_legendary else 1)
        xp_earned = base_xp + score * 2
        current_user.xp += xp_earned
        current_user.daily_xp += xp_earned

        progress = (
            db.query(UserProgress)
            .filter(
                UserProgress.user_id == current_user.id,
                UserProgress.skill_id == skill.id,
            )
            .first()
        )
        if not progress:
            progress = UserProgress(
                user_id=current_user.id,
                skill_id=skill.id,
                crown_level=0,
                is_locked=False,
            )
            db.add(progress)
        if progress:
            if lesson.is_legendary:
                progress.is_legendary = True
                progress.crown_level = max(progress.crown_level, 6)
            else:
                progress.crown_level = min(progress.crown_level + 1, 5)
                if progress.crown_level >= 1:
                    progress.completed = progress.crown_level >= 5
            progress.xp_earned += xp_earned
            crown_level = progress.crown_level
            if progress.crown_level >= 1:
                _unlock_next_skill(current_user.id, skill, db)

        lp = (
            db.query(UserLessonProgress)
            .filter(
                UserLessonProgress.user_id == current_user.id,
                UserLessonProgress.lesson_id == lesson_id,
            )
            .first()
        )
        if not lp:
            lp = UserLessonProgress(user_id=current_user.id, lesson_id=lesson_id)
            db.add(lp)
        lp.completed = True
        lp.score = score

        unit_completed = False
        gems_reward = 0
        if skill and skill.unit:
            unit_skills = skill.unit.skills
            all_completed = True
            for s in unit_skills:
                sp = (
                    db.query(UserProgress)
                    .filter(UserProgress.user_id == current_user.id, UserProgress.skill_id == s.id)
                    .first()
                )
                if not sp or (sp.crown_level == 0 and not sp.completed):
                    all_completed = False
                    break
            if all_completed:
                unit_completed = True
                gems_reward = 100
                current_user.gems += 100
                course_name = skill.unit.course.name if skill.unit.course else "Language Course"
                background_tasks.add_task(
                    send_course_completion_email,
                    current_user.email,
                    current_user.username,
                    course_name,
                )

    db.commit()
    db.refresh(current_user)

    new_achievements = _check_achievements(current_user, db)
    if new_achievements:
        db.commit()

    return LessonSubmitResponse(
        success=not failed,
        score=score,
        total=total,
        xp_earned=xp_earned,
        hearts_remaining=current_user.hearts,
        crown_level=crown_level,
        streak=current_user.streak,
        daily_xp=current_user.daily_xp,
        daily_goal=current_user.daily_goal,
        new_achievements=new_achievements,
        message="Lesson complete!" if not failed else "Lesson failed. Try again!",
        failed=failed,
        unit_completed=unit_completed,
        gems_reward=gems_reward,
    )
