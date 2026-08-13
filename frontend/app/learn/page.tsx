"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { api } from "@/lib/api";
import { useApp } from "@/lib/context";
import type { CourseOut } from "@/lib/types";
import TopBar from "@/components/TopBar";
import SkillTree from "@/components/SkillTree";
import FlagIcon from "@/components/FlagIcon";

export default function LearnPage() {
  const router = useRouter();
  const { user, loading, isAuthenticated } = useApp();
  const [course, setCourse] = useState<CourseOut | null>(null);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.replace("/login");
      return;
    }
    if (!loading && isAuthenticated && !user?.active_course_id) {
      router.replace("/courses");
    }
  }, [loading, isAuthenticated, user?.active_course_id, router]);

  useEffect(() => {
    if (!user?.active_course_id) return;
    api
      .getCourse(user.active_course_id)
      .then(setCourse)
      .catch(() => router.replace("/courses"))
      .finally(() => setFetching(false));
  }, [user?.active_course_id, user?.xp, router]);

  if (loading || fetching || !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-6xl animate-bounce">🦉</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <TopBar />
      <div className="max-w-lg mx-auto">
        {/* Course Header Box with Flag Icon */}
        <div className="px-4 py-6 flex items-center gap-4">
          <div className="w-16 h-12 rounded-2xl bg-gray-100 dark:bg-duo-dark-card flex items-center justify-center border-2 border-gray-200 dark:border-duo-dark-border overflow-hidden shrink-0 shadow-sm">
            <FlagIcon name={course?.name} emoji={course?.flag_emoji} className="w-12 h-8" />
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-black text-gray-800 dark:text-white flex items-center gap-2">
              <span>{course?.name || "Language"}</span>
            </h1>
            <p className="text-sm font-bold text-gray-400">
              {course?.source_language} → {course?.target_language}
            </p>
          </div>
          <Link
            href="/courses"
            className="text-xs font-black text-duo-blue hover:underline uppercase tracking-wide bg-duo-blue/10 px-3 py-1.5 rounded-xl border border-duo-blue/30"
          >
            Change
          </Link>
        </div>

        {course && (
          <SkillTree
            units={course.units}
            ttsLocale={course.tts_locale}
            courseName={course.name}
            flagEmoji={course.flag_emoji}
          />
        )}
      </div>
    </div>
  );
}
