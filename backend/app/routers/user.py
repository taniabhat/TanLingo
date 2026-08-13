from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from ..database import get_db
from ..models import User, Achievement, UserAchievement
from ..schemas import UserStats, UserUpdate, HeartRefillResponse, AchievementOut, LeaderboardOut, LeaderboardEntry
from .auth import get_current_user

router = APIRouter(prefix="/user", tags=["user"])


@router.get("/stats", response_model=UserStats)
def get_stats(current_user: User = Depends(get_current_user)):
    return current_user


@router.patch("/settings", response_model=UserStats)
def update_settings(
    update: UserUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    if update.dark_mode is not None:
        current_user.dark_mode = update.dark_mode
    if update.daily_goal is not None:
        current_user.daily_goal = update.daily_goal
    db.commit()
    db.refresh(current_user)
    return current_user


@router.post("/refill-hearts", response_model=HeartRefillResponse)
def refill_hearts(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    cost = (5 - current_user.hearts) * 50
    if cost <= 0:
        return HeartRefillResponse(
            hearts=current_user.hearts,
            gems=current_user.gems,
            message="Hearts already full!",
        )
    if current_user.gems < cost:
        return HeartRefillResponse(
            hearts=current_user.hearts,
            gems=current_user.gems,
            message="Not enough gems!",
        )
    current_user.gems -= cost
    current_user.hearts = 5
    db.commit()
    db.refresh(current_user)
    return HeartRefillResponse(
        hearts=current_user.hearts,
        gems=current_user.gems,
        message="Hearts refilled!",
    )


@router.get("/achievements", response_model=list[AchievementOut])
def get_achievements(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    achievements = db.query(Achievement).all()
    user_ach_ids = {
        ua.achievement_id: ua.unlocked_at
        for ua in db.query(UserAchievement)
        .filter(UserAchievement.user_id == current_user.id)
        .all()
    }
    result = []
    for ach in achievements:
        unlocked_at = user_ach_ids.get(ach.id)
        result.append(
            AchievementOut(
                id=ach.id,
                name=ach.name,
                description=ach.description,
                icon=ach.icon,
                requirement_type=ach.requirement_type,
                requirement_value=ach.requirement_value,
                unlocked=ach.id in user_ach_ids,
                unlocked_at=unlocked_at,
            )
        )
    return result


@router.get("/leaderboard", response_model=LeaderboardOut)
def get_leaderboard(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    users = db.query(User).order_by(User.xp.desc()).limit(20).all()
    entries = []
    current_rank = 0
    for i, u in enumerate(users):
        rank = i + 1
        if u.id == current_user.id:
            current_rank = rank
        entries.append(
            LeaderboardEntry(
                rank=rank,
                user_id=u.id,
                username=u.username,
                xp=u.xp,
                avatar_color=u.avatar_color,
                is_current_user=u.id == current_user.id,
            )
        )

    if current_rank == 0:
        all_users = db.query(User).order_by(User.xp.desc()).all()
        for i, u in enumerate(all_users):
            if u.id == current_user.id:
                current_rank = i + 1
                break

    league = "Bronze League"
    if current_user.xp >= 5000:
        league = "Diamond League"
    elif current_user.xp >= 3000:
        league = "Gold League"
    elif current_user.xp >= 1500:
        league = "Silver League"

    return LeaderboardOut(
        entries=entries,
        current_user_rank=current_rank,
        league_name=league,
    )
