# Duolingo Clone

A full-stack Duolingo clone built with **Next.js** (frontend) and **FastAPI** (backend), featuring interactive language lessons, gamification, achievements, and a competitive leaderboard.

![Tech Stack](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)
![FastAPI](https://img.shields.io/badge/FastAPI-0.115-009688?style=flat-square&logo=fastapi)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-06B6D4?style=flat-square&logo=tailwindcss)

## Features

### Core
- **Learning Path** (`/learn`) — Zigzag skill tree with lock/unlock progression, crown rings, and unit sections
- **Lesson Player** (`/lesson/[id]`) — 5 exercise types: multiple choice, translate (word bank), match pairs, fill in the blank, type-the-answer
- **Gamification** — Streak counter, XP, hearts (max 5), gems, daily goal tracker
- **Profile** (`/profile`) — Stats, achievements, dark mode toggle
- **Leaderboard** (`/leaderboard`) — Competitive league table with seeded users

### Bonus
- **Audio** — Web Speech API text-to-speech for exercise prompts
- **Achievements** — Unlockable badges (Streak Master, XP Champion, etc.)
- **Legendary Challenge** — Harder test-out mode per skill with double XP
- **Dark Mode** — Full dark theme matching Duolingo's aesthetic
- **Responsive Design** — Mobile bottom nav + desktop sidebar

## Architecture

```
Duolingo/
├── backend/                 # FastAPI + SQLAlchemy + SQLite
│   ├── app/
│   │   ├── main.py          # App entry, CORS, startup seed
│   │   ├── database.py      # SQLAlchemy engine & session
│   │   ├── models.py        # ORM models
│   │   ├── schemas.py       # Pydantic request/response schemas
│   │   ├── seed.py          # Database seeder
│   │   └── routers/
│   │       ├── auth.py      # Login, JWT, current user
│   │       ├── courses.py   # Course & learning path
│   │       ├── lessons.py   # Lesson player & submission
│   │       └── user.py      # Profile, achievements, leaderboard
│   └── requirements.txt
├── frontend/                # Next.js 14 App Router
│   ├── app/
│   │   ├── page.tsx         # Splash screen
│   │   ├── learn/           # Skill tree
│   │   ├── lesson/[id]/     # Lesson player
│   │   ├── profile/         # User stats & achievements
│   │   └── leaderboard/     # League rankings
│   ├── components/          # UI components
│   └── lib/                 # API client, types, context
└── README.md
```

## Database Schema

```
┌──────────┐     ┌──────────┐     ┌──────────┐     ┌──────────┐     ┌───────────┐
│  Course  │──┐  │   Unit   │──┐  │  Skill   │──┐  │  Lesson  │──┐  │ Exercise  │
│          │  └─│          │  └─│          │  └─│          │  └─│           │
│ name     │    │ title    │    │ title    │    │ title    │    │ type      │
│ languages│    │ order    │    │ crowns   │    │ legendary│    │ prompt    │
└──────────┘    └──────────┘    └──────────┘    └──────────┘    │ answer    │
                                                                 └───────────┘

┌──────────┐     ┌──────────────┐     ┌─────────────────┐     ┌─────────────┐
│   User   │──┐  │ UserProgress │     │UserLessonProgress│     │ Achievement │
│          │  └─│ (per skill)  │     │  (per lesson)    │     │             │
│ xp       │    │ crown_level  │     │ completed/score  │     │ milestones  │
│ streak   │    │ is_locked    │     └─────────────────┘     └─────────────┘
│ hearts   │    └──────────────┘            │                        │
│ gems     │                                │                        │
└──────────┘                                │              ┌─────────────────┐
                                            │              │ UserAchievement │
                                            └──────────────│                 │
                                                           └─────────────────┘
```

## Setup & Run

### Prerequisites
- **Python 3.10+**
- **Node.js 18+**

### Backend

```bash
cd backend
python -m venv venv

# Windows
venv\Scripts\activate

# macOS/Linux
source venv/bin/activate

pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

The API starts at `http://localhost:8000`. Interactive docs at `http://localhost:8000/docs`.

On first startup, the database is automatically created and seeded with:
- Spanish course (3 units, 7 skills, 20+ lessons, 100+ exercises)
- Demo user (`demo` / `password123`) with initial progress
- 9 leaderboard users with varying XP
- 5 achievements

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Open `http://localhost:3000` in your browser.

### Environment Variables (optional)

| Variable | Default | Description |
|----------|---------|-------------|
| `NEXT_PUBLIC_API_URL` | `http://localhost:8000` | Backend API URL |

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/auth/me` | Current user stats |
| POST | `/auth/login` | Login with credentials |
| GET | `/courses/{id}` | Full course with skill tree |
| GET | `/lessons/{id}` | Lesson with exercises |
| POST | `/lessons/{id}/submit` | Submit lesson answers |
| POST | `/lessons/deduct-heart` | Deduct heart on wrong answer |
| GET | `/user/achievements` | User achievements |
| GET | `/user/leaderboard` | League rankings |
| PATCH | `/user/settings` | Update dark mode, daily goal |
| POST | `/user/refill-hearts` | Refill hearts with gems |

## Demo User

| Field | Value |
|-------|-------|
| Username | `demo` |
| Password | `password123` |
| XP | 350 |
| Streak | 5 |
| Hearts | 5 |
| Gems | 500 |

The app auto-logs in as the demo user. Three skills are unlocked with the first skill at crown level 2.

## Exercise Types

1. **Multiple Choice** — Select the correct translation
2. **Translate** — Tap word bank tiles to form a sentence
3. **Match Pairs** — Connect Spanish words to English meanings
4. **Fill in the Blank** — Complete the missing word
5. **Type the Answer** — Free-text input with validation

## License

Built for educational purposes. Duolingo is a trademark of Duolingo, Inc.
