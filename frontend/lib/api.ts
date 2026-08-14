const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";



class AuthError extends Error {

  constructor(message: string) {

    super(message);

    this.name = "AuthError";

  }

}



async function fetchAPI<T>(path: string, options?: RequestInit & { auth?: boolean }): Promise<T> {

  const auth = options?.auth !== false;

  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;



  const headers: Record<string, string> = {

    "Content-Type": "application/json",

    ...(options?.headers as Record<string, string>),

  };

  if (auth && token) {

    headers.Authorization = `Bearer ${token}`;

  }



  const res = await fetch(`${API_BASE}${path}`, {

    ...options,

    headers,

  });



  if (res.status === 401) {

    if (typeof window !== "undefined") {

      localStorage.removeItem("token");

      if (!window.location.pathname.match(/^\/(login|register|$)/)) {

        window.location.href = "/login";

      }

    }

    throw new AuthError("Not authenticated");

  }



  if (!res.ok) {

    const err = await res.json().catch(() => ({ detail: "Request failed" }));

    const detail = err.detail;

    const message = typeof detail === "string" ? detail : Array.isArray(detail) ? detail[0]?.msg || "Request failed" : "Request failed";

    throw new Error(message);

  }

  return res.json();

}



export const api = {

  getMe: () => fetchAPI<import("./types").UserStats>("/auth/me"),

  register: (username: string, email: string, password: string) =>

    fetchAPI<import("./types").RegisterResponse>("/auth/register", {

      method: "POST",

      auth: false,

      body: JSON.stringify({ username, email, password }),

    }),

  login: (username: string, password: string) =>

    fetchAPI<{ access_token: string; user_id: number }>("/auth/login", {

      method: "POST",

      auth: false,

      body: JSON.stringify({ username, password }),

    }),

  listCourses: () => fetchAPI<import("./types").CourseSummary[]>("/courses/"),

  enrollCourse: (courseId: number) =>

    fetchAPI<import("./types").EnrollResponse>(`/courses/${courseId}/enroll`, {

      method: "POST",

    }),

  getCourse: (id: number) => fetchAPI<import("./types").CourseOut>(`/courses/${id}`),

  getLesson: (id: number) => fetchAPI<import("./types").LessonDetailOut>(`/lessons/${id}`),

  deductHeart: (lessonId: number) =>

    fetchAPI<{ hearts: number; out_of_hearts: boolean }>("/lessons/deduct-heart", {

      method: "POST",

      body: JSON.stringify({ lesson_id: lessonId }),

    }),

  submitLesson: (lessonId: number, answers: { exercise_id: number; answer: string }[]) =>

    fetchAPI<import("./types").LessonSubmitResponse>(`/lessons/${lessonId}/submit`, {

      method: "POST",

      body: JSON.stringify({ answers, time_spent_seconds: 0 }),

    }),

  getAchievements: () => fetchAPI<import("./types").AchievementOut[]>("/user/achievements"),

  getLeaderboard: () => fetchAPI<import("./types").LeaderboardOut>("/user/leaderboard"),

  updateSettings: (data: { dark_mode?: boolean; daily_goal?: number }) =>

    fetchAPI<import("./types").UserStats>("/user/settings", {

      method: "PATCH",

      body: JSON.stringify(data),

    }),

  refillHearts: () =>

    fetchAPI<{ hearts: number; gems: number; message: string }>("/user/refill-hearts", {

      method: "POST",

    }),

};



export { AuthError };

