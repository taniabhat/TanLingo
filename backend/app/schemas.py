from datetime import datetime, date
from typing import Optional, List, Any
from pydantic import BaseModel, Field, EmailStr


# ── Auth ──────────────────────────────────────────────────────────────────
class UserLogin(BaseModel):
    username: str
    password: str


class UserRegister(BaseModel):
    username: str = Field(min_length=3, max_length=50)
    email: EmailStr
    password: str = Field(min_length=6, max_length=128)


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user_id: int


class RegisterResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user_id: int
    message: str
    email_sent: bool = False


# ── User ──────────────────────────────────────────────────────────────────
class UserStats(BaseModel):
    id: int
    username: str
    email: str
    xp: int
    streak: int
    hearts: int
    gems: int
    daily_goal: int
    daily_xp: int
    dark_mode: bool
    avatar_color: str
    active_course_id: Optional[int] = None
    last_activity_date: Optional[date] = None

    model_config = {"from_attributes": True}


class UserUpdate(BaseModel):
    dark_mode: Optional[bool] = None
    daily_goal: Optional[int] = None


class HeartRefillResponse(BaseModel):
    hearts: int
    gems: int
    message: str


# ── Achievements ──────────────────────────────────────────────────────────
class AchievementOut(BaseModel):
    id: int
    name: str
    description: str
    icon: str
    requirement_type: str
    requirement_value: int
    unlocked: bool = False
    unlocked_at: Optional[datetime] = None

    model_config = {"from_attributes": True}


# ── Courses / Learning Path ─────────────────────────────────────────────────
class ExerciseOut(BaseModel):
    id: int
    type: str
    order_index: int
    prompt: str
    correct_answer: str
    options: Optional[List[Any]] = None
    pairs: Optional[List[Any]] = None
    audio_text: Optional[str] = None
    hint: Optional[str] = None

    model_config = {"from_attributes": True}


class LessonOut(BaseModel):
    id: int
    title: str
    order_index: int
    is_legendary: bool
    completed: bool = False
    exercise_count: int = 0

    model_config = {"from_attributes": True}


class SkillOut(BaseModel):
    id: int
    title: str
    icon: str
    order_index: int
    xp_reward: int
    crown_level: int = 0
    is_locked: bool = True
    is_legendary: bool = False
    completed: bool = False
    lessons: List[LessonOut] = []

    model_config = {"from_attributes": True}


class UnitOut(BaseModel):
    id: int
    title: str
    description: str
    order_index: int
    color: str
    skills: List[SkillOut] = []

    model_config = {"from_attributes": True}


class CourseOut(BaseModel):
    id: int
    name: str
    source_language: str
    target_language: str
    flag_emoji: str
    tts_locale: str = "es-ES"
    learners_count: str = "10M learners"
    description: str
    units: List[UnitOut] = []
    enrolled: bool = False
    is_active: bool = False

    model_config = {"from_attributes": True}


class CourseSummary(BaseModel):
    id: int
    name: str
    source_language: str
    target_language: str
    flag_emoji: str
    tts_locale: str = "es-ES"
    learners_count: str = "10M learners"
    description: str
    enrolled: bool = False
    is_active: bool = False

    model_config = {"from_attributes": True}


class EnrollResponse(BaseModel):
    course_id: int
    message: str
    active_course_id: int


class LessonDetailOut(BaseModel):
    id: int
    title: str
    skill_id: int
    skill_title: str
    is_legendary: bool
    tts_locale: str = "es-ES"
    exercises: List[ExerciseOut]
    user_hearts: int
    user_xp: int

    model_config = {"from_attributes": True}


# ── Lesson Submit ───────────────────────────────────────────────────────────
class ExerciseAnswer(BaseModel):
    exercise_id: int
    answer: str


class LessonSubmitRequest(BaseModel):
    answers: List[ExerciseAnswer]
    time_spent_seconds: int = 0


class LessonSubmitResponse(BaseModel):
    success: bool
    score: int
    total: int
    xp_earned: int
    hearts_remaining: int
    crown_level: int
    streak: int
    daily_xp: int
    daily_goal: int
    new_achievements: List[AchievementOut] = []
    message: str
    failed: bool = False
    unit_completed: bool = False
    gems_reward: int = 0


class HeartDeductRequest(BaseModel):
    lesson_id: int


class HeartDeductResponse(BaseModel):
    hearts: int
    out_of_hearts: bool


# ── Leaderboard ─────────────────────────────────────────────────────────────
class LeaderboardEntry(BaseModel):
    rank: int
    user_id: int
    username: str
    xp: int
    avatar_color: str
    is_current_user: bool = False

    model_config = {"from_attributes": True}


class LeaderboardOut(BaseModel):
    entries: List[LeaderboardEntry]
    current_user_rank: int
    league_name: str = "Bronze League"
