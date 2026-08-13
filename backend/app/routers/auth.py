from datetime import date, timedelta, datetime, timezone
from fastapi import APIRouter, Depends, HTTPException, Header, BackgroundTasks
from sqlalchemy.orm import Session
import bcrypt
from jose import jwt, JWTError

from ..config import get_settings
from ..database import get_db
from ..email_service import send_registration_email
from ..models import User, UserCourse
from ..schemas import UserLogin, UserRegister, TokenResponse, UserStats, RegisterResponse

router = APIRouter(prefix="/auth", tags=["auth"])


def verify_password(plain: str, hashed: str) -> bool:
    return bcrypt.checkpw(plain.encode(), hashed.encode())


def hash_password(plain: str) -> str:
    return bcrypt.hashpw(plain.encode(), bcrypt.gensalt()).decode()


def create_token(user_id: int) -> str:
    settings = get_settings()
    expire = datetime.now(timezone.utc) + timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    return jwt.encode(
        {"sub": str(user_id), "exp": expire},
        settings.SECRET_KEY,
        algorithm=settings.ALGORITHM,
    )


def get_current_user(
    authorization: str = Header(default=""),
    db: Session = Depends(get_db),
) -> User:
    settings = get_settings()
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Not authenticated")

    token = authorization.split(" ", 1)[1]

    if token == "demo" and settings.ALLOW_DEMO_TOKEN:
        user = db.query(User).filter(User.username == "demo").first()
        if user:
            _update_streak(user, db)
            return user

    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
        user_id = int(payload.get("sub"))
    except (JWTError, ValueError, TypeError):
        raise HTTPException(status_code=401, detail="Invalid or expired token")

    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    _update_streak(user, db)
    return user


def _update_streak(user: User, db: Session):
    today = date.today()
    if user.last_activity_date == today:
        return
    if user.last_activity_date == today - timedelta(days=1):
        user.streak += 1
    elif user.last_activity_date is not None:
        user.streak = 1
    else:
        user.streak = 1
    user.last_activity_date = today
    user.daily_xp = 0
    db.commit()


@router.post("/register", response_model=RegisterResponse, status_code=201)
def register(
    data: UserRegister,
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db),
):
    if db.query(User).filter(User.username == data.username).first():
        raise HTTPException(status_code=400, detail="Username already taken")
    if db.query(User).filter(User.email == data.email).first():
        raise HTTPException(status_code=400, detail="Email already registered")

    user = User(
        username=data.username,
        email=data.email,
        password_hash=hash_password(data.password),
        xp=0,
        streak=0,
        hearts=5,
        gems=500,
        avatar_color="#58cc02",
    )
    db.add(user)
    db.commit()
    db.refresh(user)

    background_tasks.add_task(send_registration_email, user.email, user.username)

    token = create_token(user.id)
    return RegisterResponse(
        access_token=token,
        user_id=user.id,
        message="Account created successfully! Check your email for a welcome message.",
        email_sent=bool(get_settings().SMTP_HOST),
    )


@router.post("/login", response_model=TokenResponse)
def login(credentials: UserLogin, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.username == credentials.username).first()
    if not user or not verify_password(credentials.password, user.password_hash):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    token = create_token(user.id)
    return TokenResponse(access_token=token, user_id=user.id)


@router.get("/me", response_model=UserStats)
def get_me(current_user: User = Depends(get_current_user)):
    return current_user
