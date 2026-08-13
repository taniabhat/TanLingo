"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import TopBar from "@/components/TopBar";
import { useApp } from "@/lib/context";

export default function QuestsFeedPage() {
  const { user } = useApp();
  const [activeTab, setActiveTab] = useState<"quests" | "feed" | "badges">("quests");

  return (
    <div className="min-h-screen bg-duo-gray-bg dark:bg-duo-dark-bg pb-24">
      <TopBar />

      {/* Header Tabs matching main_feed2.png */}
      <div className="bg-purple-600 dark:bg-purple-950 text-white shadow-md">
        <div className="max-w-md mx-auto flex text-center font-extrabold text-sm sm:text-base">
          <button
            onClick={() => setActiveTab("quests")}
            className={`flex-1 py-4 border-b-4 transition-colors uppercase tracking-wider ${
              activeTab === "quests" ? "border-white text-white" : "border-transparent text-white/60 hover:text-white"
            }`}
          >
            Quests
          </button>
          <button
            onClick={() => setActiveTab("feed")}
            className={`flex-1 py-4 border-b-4 transition-colors uppercase tracking-wider ${
              activeTab === "feed" ? "border-white text-white" : "border-transparent text-white/60 hover:text-white"
            }`}
          >
            Feed
          </button>
          <button
            onClick={() => setActiveTab("badges")}
            className={`flex-1 py-4 border-b-4 transition-colors uppercase tracking-wider ${
              activeTab === "badges" ? "border-white text-white" : "border-transparent text-white/60 hover:text-white"
            }`}
          >
            Badges
          </button>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-6">
        {activeTab === "quests" && (
          <div className="space-y-6">
            {/* Purple Banner matching main_feed2.png */}
            <div className="bg-purple-600 rounded-3xl p-6 text-white shadow-lg relative overflow-hidden flex items-center justify-between">
              <div className="max-w-[220px]">
                <h1 className="text-2xl font-black mb-2">Welcome!</h1>
                <p className="text-sm font-bold text-white/90 leading-snug">
                  Complete quests to earn rewards! Quests refresh every day.
                </p>
              </div>
              <div className="text-6xl animate-bounce">🎁</div>
            </div>

            {/* Daily Quest Section */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-lg font-black tracking-tight">Daily Quest</h2>
                <span className="text-xs font-black text-duo-orange uppercase bg-duo-orange/10 px-3 py-1 rounded-full border border-duo-orange/30">
                  ⏱️ 8 Hours Left
                </span>
              </div>

              <div className="duo-card p-5 space-y-4">
                <div className="flex items-center gap-4">
                  <div className="text-3xl">⚡</div>
                  <div className="flex-1">
                    <h3 className="font-extrabold text-base mb-1">Earn 20 XP</h3>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-4 bg-gray-100 dark:bg-duo-dark-border rounded-full overflow-hidden">
                        <div
                          className="h-full bg-duo-yellow rounded-full transition-all"
                          style={{ width: `${Math.min(((user?.daily_xp || 0) / 20) * 100, 100)}%` }}
                        />
                      </div>
                      <span className="font-black text-xs text-duo-yellow">
                        {user?.daily_xp || 0}/20
                      </span>
                    </div>
                  </div>
                  <div className="text-2xl">📦</div>
                </div>
              </div>
            </div>

            {/* Upcoming Quests */}
            <div>
              <h2 className="text-lg font-black tracking-tight mb-3">Upcoming Quests</h2>
              <div className="duo-card p-5 space-y-4 opacity-75">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-duo-dark-border flex items-center justify-center font-black text-gray-400">
                    ?
                  </div>
                  <div className="flex-1">
                    <p className="font-extrabold text-sm text-gray-400">Revealed in 2 days</p>
                    <div className="w-full h-3 bg-gray-100 dark:bg-duo-dark-border rounded-full mt-2" />
                  </div>
                  <div className="text-xl grayscale opacity-50">📦</div>
                </div>

                <div className="w-full h-px bg-gray-100 dark:bg-duo-dark-border" />

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-duo-dark-border flex items-center justify-center font-black text-gray-400">
                    ?
                  </div>
                  <div className="flex-1">
                    <p className="font-extrabold text-sm text-gray-400">Revealed in 4 days</p>
                    <div className="w-full h-3 bg-gray-100 dark:bg-duo-dark-border rounded-full mt-2" />
                  </div>
                  <div className="text-xl grayscale opacity-50">📦</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "feed" && (
          <div className="space-y-6">
            {/* Friends Card matching main_feed1.png */}
            <div className="bg-duo-blue rounded-3xl p-6 text-white shadow-lg space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-black">Celebrate achievements with friends!</h2>
                </div>
                <div className="text-5xl">👋</div>
              </div>
              <button className="w-full py-3 bg-white text-duo-blue font-extrabold text-sm rounded-2xl shadow-md uppercase hover:bg-gray-50 transition-colors">
                ADD FRIENDS
              </button>
            </div>

            {/* Streak Card matching main_feed1.png */}
            <div className="duo-card overflow-hidden">
              <div className="bg-duo-orange p-6 text-white flex items-center justify-between">
                <div className="text-6xl animate-bounce">🔥</div>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((d) => (
                    <div
                      key={d}
                      className="w-8 h-8 rounded-full bg-white text-duo-orange font-black flex items-center justify-center text-xs shadow"
                    >
                      ✓
                    </div>
                  ))}
                </div>
              </div>
              <div className="p-6 space-y-4">
                <span className="text-xs font-bold text-gray-400">1 min ago</span>
                <h3 className="font-black text-lg text-gray-800 dark:text-white">
                  Complete a lesson every day to maintain your streak!
                </h3>
                <Link
                  href="/learn"
                  className="block w-full py-3 bg-duo-blue text-white font-extrabold text-center rounded-2xl shadow-[0_4px_0_0_#1899d6] uppercase hover:brightness-105 transition-all"
                >
                  START A LESSON
                </Link>
              </div>
            </div>
          </div>
        )}

        {activeTab === "badges" && (
          <div className="space-y-4">
            <h2 className="text-xl font-black">Monthly Badges</h2>
            <div className="duo-card p-6 text-center space-y-3">
              <div className="text-6xl">🏆</div>
              <h3 className="font-extrabold text-lg">August Challenger</h3>
              <p className="text-sm font-bold text-gray-400">
                Complete 10 quests this month to unlock your exclusive badge!
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
