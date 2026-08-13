"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { api } from "@/lib/api";
import type { LeaderboardOut } from "@/lib/types";
import TopBar from "@/components/TopBar";
import { cn } from "@/lib/utils";

export default function LeaderboardPage() {
  const [data, setData] = useState<LeaderboardOut | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getLeaderboard()
      .then(setData)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-6xl animate-bounce">🦉</div>
      </div>
    );
  }

  const leagueColors: Record<string, string> = {
    "Bronze League": "from-amber-700 to-amber-500",
    "Silver League": "from-gray-400 to-gray-300",
    "Gold League": "from-yellow-500 to-yellow-300",
    "Diamond League": "from-cyan-400 to-blue-400",
  };

  const gradient = leagueColors[data?.league_name || ""] || "from-duo-green to-duo-blue";

  return (
    <div className="min-h-screen">
      <TopBar />
      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* League header */}
        <div className={cn("rounded-2xl p-6 mb-8 text-center text-white bg-gradient-to-r", gradient)}>
          <div className="text-5xl mb-2">🏆</div>
          <h1 className="text-2xl font-extrabold">{data?.league_name}</h1>
          <p className="font-bold opacity-80 mt-1">
            Your rank: #{data?.current_user_rank}
          </p>
        </div>

        {/* Podium top 3 */}
        {data && data.entries.length >= 3 && (
          <div className="flex items-end justify-center gap-4 mb-8">
            {[1, 0, 2].map((idx) => {
              const entry = data.entries[idx];
              const heights = ["h-28", "h-36", "h-24"];
              const medals = ["🥈", "🥇", "🥉"];
              return (
                <motion.div
                  key={entry.user_id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.15 }}
                  className="flex flex-col items-center"
                >
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-white font-extrabold text-lg mb-2 border-2 border-white"
                    style={{ backgroundColor: entry.avatar_color }}
                  >
                    {entry.username[0]}
                  </div>
                  <span className="text-2xl mb-1">{medals[idx]}</span>
                  <p className="font-extrabold text-sm truncate max-w-[80px]">{entry.username}</p>
                  <p className="text-xs text-gray-400 font-bold">{entry.xp} XP</p>
                  <div className={cn("w-20 rounded-t-xl bg-duo-blue/20 mt-2", heights[idx])} />
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Full list */}
        <div className="space-y-2">
          {data?.entries.map((entry, i) => (
            <motion.div
              key={entry.user_id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className={cn(
                "duo-card p-4 flex items-center gap-4",
                entry.is_current_user && "border-duo-blue bg-duo-blue/5"
              )}
            >
              <span className="font-extrabold text-gray-400 w-8 text-center">{entry.rank}</span>
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-white font-extrabold"
                style={{ backgroundColor: entry.avatar_color }}
              >
                {entry.username[0]}
              </div>
              <div className="flex-1">
                <p className="font-extrabold">
                  {entry.username}
                  {entry.is_current_user && (
                    <span className="text-duo-blue text-sm ml-2">(You)</span>
                  )}
                </p>
              </div>
              <span className="font-extrabold text-duo-yellow">{entry.xp} XP</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
