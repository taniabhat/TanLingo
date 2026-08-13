"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { api } from "@/lib/api";
import { useApp } from "@/lib/context";
import type { CourseSummary } from "@/lib/types";
import FlagIcon from "@/components/FlagIcon";

export default function CoursesPage() {
  const router = useRouter();
  const { user, loading, isAuthenticated, refreshUser } = useApp();
  const [courses, setCourses] = useState<CourseSummary[]>([]);
  const [fetching, setFetching] = useState(true);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [enrolling, setEnrolling] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.replace("/login");
    }
  }, [loading, isAuthenticated, router]);

  useEffect(() => {
    if (!isAuthenticated) return;
    api
      .listCourses()
      .then((list) => {
        setCourses(list);
        const active = list.find((c) => c.is_active);
        if (active) setSelectedId(active.id);
        else if (list.length > 0) setSelectedId(list[0].id);
      })
      .catch((err) => setError(err instanceof Error ? err.message : "Failed to load courses"))
      .finally(() => setFetching(false));
  }, [isAuthenticated]);

  const handleContinue = async () => {
    if (!selectedId) return;
    setEnrolling(true);
    setError("");
    try {
      await api.enrollCourse(selectedId);
      await refreshUser();
      router.push("/learn");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to set language");
    } finally {
      setEnrolling(false);
    }
  };

  if (loading || !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-duo-dark-bg">
        <div className="text-6xl animate-bounce">🦉</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-duo-dark-bg text-gray-800 dark:text-white relative pb-32">
      {/* Top Header Bar with Progress Indicator */}
      <div className="w-full border-b border-gray-100 dark:border-duo-dark-border bg-white dark:bg-duo-dark-bg sticky top-0 z-30">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-6">
          <Link
            href="/learn"
            className="text-2xl text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors font-bold"
          >
            ←
          </Link>
          <div className="flex-1 h-3 bg-gray-100 dark:bg-duo-dark-card rounded-full overflow-hidden">
            <div className="h-full bg-duo-green w-1/4 rounded-full transition-all duration-300" />
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-4xl w-full mx-auto px-4 py-8 flex-1">
        {/* Duo Speech Bubble Header */}
        <div className="flex items-center gap-5 mb-10 max-w-2xl">
          <div className="text-6xl sm:text-7xl filter drop-shadow-md animate-bounce">🦉</div>
          <div className="relative bg-white dark:bg-duo-dark-card border-2 border-gray-200 dark:border-duo-dark-border rounded-2xl p-4 sm:p-5 shadow-sm flex-1">
            <div className="absolute -left-2.5 top-7 w-4 h-4 bg-white dark:bg-duo-dark-card border-b-2 border-l-2 border-gray-200 dark:border-duo-dark-border rotate-45" />
            <p className="font-extrabold text-xl sm:text-2xl text-gray-700 dark:text-white">
              What would you like to learn?
            </p>
          </div>
        </div>

        {error && (
          <p className="text-duo-red font-bold text-sm text-center bg-duo-red/10 py-2.5 rounded-xl mb-6 border border-duo-red/20">
            {error}
          </p>
        )}

        {fetching ? (
          <div className="flex justify-center py-16">
            <div className="text-5xl animate-bounce">🌍</div>
          </div>
        ) : (
          <div>
            {/* Side-by-Side 2-Column Grid Layout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {courses.map((course, i) => {
                const isSelected = selectedId === course.id;
                return (
                  <motion.button
                    key={course.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.03 }}
                    onClick={() => setSelectedId(course.id)}
                    className={`w-full p-4 sm:p-5 rounded-2xl border-2 font-extrabold text-left flex items-center gap-4 transition-all cursor-pointer relative ${
                      isSelected
                        ? "border-duo-blue bg-duo-blue/10 dark:bg-duo-blue/20 shadow-[0_5px_0_0_#1cb0f6] dark:shadow-[0_5px_0_0_#1899d6] translate-y-[-2px]"
                        : "border-gray-200 dark:border-duo-dark-border bg-white dark:bg-duo-dark-card shadow-[0_5px_0_0_#e5e5e5] dark:shadow-[0_5px_0_0_#242e33] hover:bg-gray-50 dark:hover:bg-duo-dark-card/90 active:translate-y-1 active:shadow-none"
                    }`}
                  >
                    {/* Flag Icon */}
                    <div className="w-14 h-11 rounded-xl bg-gray-100 dark:bg-duo-dark-bg flex items-center justify-center shadow-inner border border-gray-200/50 dark:border-duo-dark-border/50 shrink-0 overflow-hidden">
                      <FlagIcon name={course.name} emoji={course.flag_emoji} className="w-10 h-7" />
                    </div>

                    {/* Subject Details */}
                    <div className="flex-1 min-w-0">
                      <div className="text-lg sm:text-xl font-extrabold text-gray-800 dark:text-white truncate">
                        {course.name}
                      </div>
                      <div className="text-xs sm:text-sm font-extrabold text-gray-400 dark:text-gray-400 mt-0.5">
                        {course.learners_count || "10M learners"}
                      </div>
                    </div>

                    {/* Active Course Badge */}
                    {course.is_active && (
                      <span className="text-[10px] sm:text-xs px-2.5 py-1 rounded-lg bg-duo-green/20 text-duo-green font-black uppercase tracking-wider shrink-0">
                        Active
                      </span>
                    )}
                  </motion.button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Sticky Bottom Action Button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 sm:p-6 bg-white dark:bg-duo-dark-bg border-t-2 border-gray-100 dark:border-duo-dark-border z-30 flex justify-center shadow-lg">
        <div className="max-w-4xl w-full flex justify-end">
          <button
            onClick={handleContinue}
            disabled={!selectedId || enrolling}
            className="w-full sm:w-80 py-4 bg-duo-green text-white font-black text-lg rounded-2xl shadow-[0_5px_0_0_#46a302] hover:brightness-105 active:shadow-none active:translate-y-1 transition-all uppercase tracking-wide disabled:opacity-50 cursor-pointer"
          >
            {enrolling ? "Enrolling..." : "CONTINUE"}
          </button>
        </div>
      </div>
    </div>
  );
}
