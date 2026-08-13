export interface UserStats {
  id: number;
  username: string;
  email: string;
  xp: number;
  streak: number;
  hearts: number;
  gems: number;
  daily_goal: number;
  daily_xp: number;
  dark_mode: boolean;
  avatar_color: string;
  active_course_id?: number | null;
  last_activity_date?: string;
}

export interface CourseSummary {
  id: number;
  name: string;
  source_language: string;
  target_language: string;
  flag_emoji: string;
  tts_locale: string;
  learners_count?: string;
  description: string;
  enrolled: boolean;
  is_active: boolean;
}

export interface EnrollResponse {
  course_id: number;
  message: string;
  active_course_id: number;
}

export interface RegisterResponse {
  access_token: string;
  token_type: string;
  user_id: number;
  message: string;
  email_sent: boolean;
}

export interface LessonOut {
  id: number;
  title: string;
  order_index: number;
  is_legendary: boolean;
  completed: boolean;
  exercise_count: number;
}

export interface SkillOut {
  id: number;
  title: string;
  icon: string;
  order_index: number;
  xp_reward: number;
  crown_level: number;
  is_locked: boolean;
  is_legendary: boolean;
  completed: boolean;
  lessons: LessonOut[];
}

export interface UnitOut {
  id: number;
  title: string;
  description: string;
  order_index: number;
  color: string;
  skills: SkillOut[];
}

export interface CourseOut {
  id: number;
  name: string;
  source_language: string;
  target_language: string;
  flag_emoji: string;
  tts_locale: string;
  learners_count?: string;
  description: string;
  units: UnitOut[];
  enrolled?: boolean;
  is_active?: boolean;
}

export interface ExerciseOut {
  id: number;
  type: string;
  order_index: number;
  prompt: string;
  correct_answer: string;
  options?: string[] | null;
  pairs?: { left: string; right: string }[] | null;
  audio_text?: string | null;
  hint?: string | null;
}

export interface LessonDetailOut {
  id: number;
  title: string;
  skill_id: number;
  skill_title: string;
  is_legendary: boolean;
  tts_locale?: string;
  exercises: ExerciseOut[];
  user_hearts: number;
  user_xp: number;
}

export interface AchievementOut {
  id: number;
  name: string;
  description: string;
  icon: string;
  requirement_type: string;
  requirement_value: number;
  unlocked: boolean;
  unlocked_at?: string | null;
}

export interface LeaderboardEntry {
  rank: number;
  user_id: number;
  username: string;
  xp: number;
  avatar_color: string;
  is_current_user: boolean;
}

export interface LeaderboardOut {
  entries: LeaderboardEntry[];
  current_user_rank: number;
  league_name: string;
}

export interface LessonSubmitResponse {
  success: boolean;
  score: number;
  total: number;
  xp_earned: number;
  hearts_remaining: number;
  crown_level: number;
  streak: number;
  daily_xp: number;
  daily_goal: number;
  new_achievements: AchievementOut[];
  message: string;
  failed: boolean;
  unit_completed?: boolean;
  gems_reward?: number;
}

export type ExerciseType =
  | "multiple_choice"
  | "translate"
  | "match_pairs"
  | "fill_blank"
  | "type_answer";
