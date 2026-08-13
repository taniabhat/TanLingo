"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { api } from "@/lib/api";
import type { AchievementOut } from "@/lib/types";
import { useApp } from "@/lib/context";
import TopBar from "@/components/TopBar";
import { cn } from "@/lib/utils";

export default function ProfilePage() {
  const router = useRouter();
  const { user, toggleDarkMode, darkMode, logout } = useApp();
  const [achievements, setAchievements] = useState<AchievementOut[]>([]);

  useEffect(() => {
    api.getAchievements().then(setAchievements).catch(console.error);
  }, []);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-6xl animate-bounce">🦉</div>
      </div>
    );
  }

  const unlocked = achievements.filter((a) => a.unlocked);
  const locked = achievements.filter((a) => !a.unlocked);

  return (
    <div className="min-h-screen">
      <TopBar />
      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Profile header */}
        <div className="duo-card p-8 text-center mb-8">
          <div
            className="w-24 h-24 rounded-full mx-auto mb-4 flex items-center justify-center text-4xl font-extrabold text-white border-4 border-white shadow-lg"
            style={{ backgroundColor: user.avatar_color }}
          >
            {user.username[0].toUpperCase()}
          </div>
          <h1 className="text-3xl font-extrabold mb-1">{user.username}</h1>
          <p className="text-gray-400 font-bold">{user.email}</p>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { icon: "⚡", label: "Total XP", value: user.xp, color: "text-duo-yellow" },
            { icon: "🔥", label: "Streak", value: `${user.streak} days`, color: "text-duo-orange" },
            { icon: "❤️", label: "Hearts", value: user.hearts, color: "text-duo-red" },
            { icon: "💎", label: "Gems", value: user.gems, color: "text-duo-blue" },
          ].map((stat) => (
            <div key={stat.label} className="duo-card p-4 text-center">
              <div className="text-2xl mb-1">{stat.icon}</div>
              <div className={cn("font-extrabold text-xl", stat.color)}>{stat.value}</div>
              <div className="text-xs text-gray-400 font-bold uppercase">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Daily goal */}
        <div className="duo-card p-6 mb-8">
          <h2 className="font-extrabold text-lg mb-4">Daily Goal</h2>
          <div className="flex items-center gap-4">
            <div className="flex-1 h-4 bg-duo-gray-light dark:bg-duo-dark-border rounded-full overflow-hidden">
              <div
                className="h-full bg-duo-green rounded-full transition-all"
                style={{ width: `${Math.min((user.daily_xp / user.daily_goal) * 100, 100)}%` }}
              />
            </div>
            <span className="font-extrabold text-duo-green">
              {user.daily_xp}/{user.daily_goal} XP
            </span>
          </div>
        </div>

        {/* Settings */}
        <div className="duo-card p-6 mb-8">
          <h2 className="font-extrabold text-lg mb-4">Settings</h2>
          <button
            onClick={toggleDarkMode}
            className="w-full flex items-center justify-between p-4 rounded-2xl hover:bg-gray-50 dark:hover:bg-duo-dark-bg transition-colors mb-2"
          >
            <span className="font-bold flex items-center gap-3">
              <span className="text-xl">{darkMode ? "☀️" : "🌙"}</span>
              Dark Mode
            </span>
            <div
              className={cn(
                "w-12 h-7 rounded-full transition-colors relative",
                darkMode ? "bg-duo-green" : "bg-duo-gray-light"
              )}
            >
              <div
                className={cn(
                  "absolute top-0.5 w-6 h-6 rounded-full bg-white shadow transition-transform",
                  darkMode ? "translate-x-5" : "translate-x-0.5"
                )}
              />
            </div>
          </button>
          <button
            onClick={() => {
              logout();
              router.push("/login");
            }}
            className="w-full flex items-center justify-between p-4 rounded-2xl bg-duo-red/10 text-duo-red hover:bg-duo-red/20 font-bold transition-colors"
          >
            <span className="flex items-center gap-3">
              <span className="text-xl">🚪</span>
              Log Out of Account
            </span>
            <span className="text-lg">→</span>
          </button>
        </div>

        {/* Achievements */}
        <div className="mb-8">
          <h2 className="font-extrabold text-xl mb-4">
            Achievements ({unlocked.length}/{achievements.length})
          </h2>

          {unlocked.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              {unlocked.map((ach, i) => (
                <motion.div
                  key={ach.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                  className="duo-card p-4 flex items-center gap-4 border-duo-yellow bg-duo-yellow/5"
                >
                  <span className="text-4xl">{ach.icon}</span>
                  <div>
                    <p className="font-extrabold">{ach.name}</p>
                    <p className="text-sm text-gray-400 font-bold">{ach.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {locked.length > 0 && (
            <>
              <h3 className="font-bold text-gray-400 mb-3 uppercase text-sm">Locked</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {locked.map((ach) => (
                  <div key={ach.id} className="duo-card p-4 flex items-center gap-4 opacity-50">
                    <span className="text-4xl grayscale">🔒</span>
                    <div>
                      <p className="font-extrabold">{ach.name}</p>
                      <p className="text-sm text-gray-400 font-bold">{ach.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
