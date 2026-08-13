"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useApp } from "@/lib/context";
import { api } from "@/lib/api";
import type { CourseSummary } from "@/lib/types";
import FlagIcon from "@/components/FlagIcon";

export default function TopBar() {
  const { user } = useApp();
  const [activeCourse, setActiveCourse] = useState<CourseSummary | null>(null);

  useEffect(() => {
    if (user?.active_course_id) {
      api
        .listCourses()
        .then((list) => {
          const active = list.find((c) => c.is_active || c.id === user.active_course_id);
          if (active) setActiveCourse(active);
        })
        .catch(() => {});
    }
  }, [user?.active_course_id]);

  if (!user) return null;

  const dailyProgress = Math.min((user.daily_xp / user.daily_goal) * 100, 100);

  return (
    <header className="sticky top-0 z-30 bg-white dark:bg-duo-dark-card border-b-2 border-duo-gray-light dark:border-duo-dark-border">
      <div className="max-w-3xl mx-auto px-4 py-2.5 flex items-center justify-between gap-2">
        {/* Active Language Flag + Name Selector (Matching Screenshot 1 top right) */}
        <Link
          href="/courses"
          className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl bg-gray-50 dark:bg-duo-dark-bg border border-gray-200 dark:border-duo-dark-border hover:border-duo-blue transition-all cursor-pointer shrink-0"
          title="Switch Language"
        >
          <FlagIcon
            name={activeCourse?.name}
            emoji={activeCourse?.flag_emoji}
            className="w-6 h-4"
          />
          <span className="font-black text-xs sm:text-sm text-gray-800 dark:text-white tracking-wide">
            {activeCourse?.name || "Language"}
          </span>
        </Link>

        {/* Stats Section */}
        <div className="flex items-center gap-3 sm:gap-5">
          {/* Streak */}
          <div className="flex items-center gap-1" title="Day streak">
            <span className="text-xl sm:text-2xl">🔥</span>
            <span className="font-extrabold text-duo-orange text-sm sm:text-base">{user.streak}</span>
          </div>

          {/* Gems */}
          <div className="flex items-center gap-1" title="Gems">
            <span className="text-xl sm:text-2xl">💎</span>
            <span className="font-extrabold text-duo-blue text-sm sm:text-base">{user.gems}</span>
          </div>

          {/* Hearts */}
          <div className="flex items-center gap-1" title="Hearts">
            <span className="text-xl sm:text-2xl">❤️</span>
            <span className="font-extrabold text-duo-red text-sm sm:text-base">{user.hearts}</span>
          </div>

          {/* XP */}
          <div className="flex items-center gap-1" title="Total XP">
            <span className="text-xl sm:text-2xl">⚡</span>
            <span className="font-extrabold text-duo-yellow text-sm sm:text-base">{user.xp}</span>
          </div>
        </div>
      </div>
    </header>
  );
}
