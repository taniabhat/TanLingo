"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import type { SkillOut, UnitOut } from "@/lib/types";
import GuidebookModal from "@/components/GuidebookModal";

// Horizontal offset positions for serpentine S-curve path
const X_OFFSETS = [0, 35, 55, 35, 0, -35, -55, -35];

function UnitHeaderBanner({
  unitIndex,
  unitTitle,
  unitColor = "#58cc02",
  progressPercent = 0,
  onOpenGuidebook,
}: {
  unitIndex: number;
  unitTitle: string;
  unitColor?: string;
  progressPercent?: number;
  onOpenGuidebook?: () => void;
}) {
  const roundedPercent = Math.round(progressPercent);

  return (
    <div
      className="w-full max-w-md mx-auto p-4 sm:p-5 rounded-2xl text-white shadow-md mb-8 flex flex-col gap-3 transition-transform hover:scale-[1.01]"
      style={{ backgroundColor: unitColor }}
    >
      <div className="flex items-center justify-between gap-2">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-white/90 mb-1">
            <span>←</span>
            <span>SECTION 1, UNIT {unitIndex + 1}</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black leading-tight drop-shadow-sm">
            {unitTitle}
          </h2>
        </div>

        <button
          onClick={onOpenGuidebook}
          className="px-3.5 py-2 bg-white/20 hover:bg-white/30 border border-white/40 text-white font-black text-xs rounded-xl flex items-center gap-2 uppercase tracking-wide cursor-pointer transition-all shadow-sm shrink-0 active:scale-95"
        >
          <span className="text-sm">📖</span>
          <span>GUIDEBOOK</span>
        </button>
      </div>

      {/* Independent Linear Unit Progress Bar */}
      <div className="w-full bg-black/20 rounded-full h-3 overflow-hidden p-0.5 relative">
        <div
          className="bg-white h-full rounded-full transition-all duration-700 shadow-sm"
          style={{ width: `${Math.min(Math.max(roundedPercent, 0), 100)}%` }}
        />
      </div>
      <div className="flex justify-between items-center text-[11px] font-extrabold text-white/90 uppercase tracking-wider">
        <span>Unit Progress</span>
        <span>{roundedPercent}% Complete</span>
      </div>
    </div>
  );
}

function LevelPathwayNode({
  skill,
  index,
  unitColor,
  isStartNode = false,
}: {
  skill: SkillOut;
  index: number;
  unitColor: string;
  isStartNode?: boolean;
}) {
  const xOffset = X_OFFSETS[index % X_OFFSETS.length];
  const lesson = skill.lessons.find((l) => !l.completed && !l.is_legendary) || skill.lessons[0];

  // Calculate skill progress from regular lessons & crown levels
  const regularLessons = skill.lessons.filter((l) => !l.is_legendary);
  const completedRegular = regularLessons.filter((l) => l.completed).length;
  const totalRegular = regularLessons.length || 1;
  const progressPercent =
    skill.completed || skill.crown_level >= 1
      ? 100
      : (completedRegular / totalRegular) * 100;

  // Radial stroke offset calculation for C = 2 * pi * 44 = 276.46
  const circumference = 276.46;
  const dashOffset = circumference * (1 - Math.min(Math.max(progressPercent, 0), 100) / 100);

  const isComplete = progressPercent >= 100;

  return (
    <motion.div
      initial={{ scale: 0.85, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: (index % 5) * 0.05 }}
      className="relative flex flex-col items-center my-3.5 z-10"
      style={{ transform: `translateX(${xOffset}px)` }}
    >
      {/* Speech Bubble Tooltip over node */}
      {(isStartNode || isComplete) && (
        <div className="absolute -top-11 z-30 flex flex-col items-center animate-bounce">
          <div
            className={`border-2 font-black text-[11px] px-3.5 py-1 rounded-xl shadow-lg uppercase tracking-widest ${
              isComplete
                ? "bg-duo-green border-duo-green text-white"
                : "bg-[#111b21] dark:bg-duo-dark-card border-gray-700 text-duo-green"
            }`}
          >
            {isComplete ? "COMPLETE ✓" : "START"}
          </div>
          <div
            className={`w-2.5 h-2.5 border-r-2 border-b-2 rotate-45 -mt-1.5 ${
              isComplete
                ? "bg-duo-green border-duo-green"
                : "bg-[#111b21] dark:bg-duo-dark-card border-gray-700"
            }`}
          />
        </div>
      )}

      {/* Circle Node Container */}
      <div className="relative group flex flex-col items-center">
        <Link href={lesson ? `/lesson/${lesson.id}` : "#"} className="relative">
          {/* Radial Circular SVG Progress Ring */}
          <svg
            className="absolute -inset-2.5 w-[calc(100%+20px)] h-[calc(100%+20px)] pointer-events-none z-20 overflow-visible"
            viewBox="0 0 100 100"
          >
            {/* Background Dark Track Circle */}
            <circle
              cx="50"
              cy="50"
              r="44"
              fill="none"
              stroke="#202b30"
              strokeWidth="7"
            />
            {/* Synchronized Green Progress Stroke Arc */}
            {progressPercent > 0 && (
              <circle
                cx="50"
                cy="50"
                r="44"
                fill="none"
                stroke="#58cc02"
                strokeWidth="7"
                strokeLinecap="round"
                strokeDasharray="276.46"
                strokeDashoffset={dashOffset}
                className="transition-all duration-700 -rotate-90 origin-center"
              />
            )}
          </svg>

          {/* Node Button */}
          <div
            className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center text-3xl sm:text-4xl text-white font-extrabold transition-all group-hover:scale-105 active:translate-y-1 shadow-[0_6px_0_0_rgba(0,0,0,0.2)] ${
              isComplete
                ? "bg-duo-green border-4 border-[#3c8901] shadow-[0_6px_0_0_#3c8901]"
                : isStartNode
                ? "border-4 border-[#3c8901] shadow-[0_6px_0_0_#3c8901]"
                : "border-4 border-gray-300 dark:border-gray-700"
            }`}
            style={{ backgroundColor: isComplete ? "#58cc02" : unitColor }}
          >
            {isComplete ? "👑" : "⭐"}
          </div>
        </Link>

        <p className="text-center font-extrabold text-xs mt-2 text-gray-700 dark:text-gray-200 max-w-[120px] truncate">
          {skill.title}
        </p>
      </div>
    </motion.div>
  );
}

function UnitSectionCurvy({
  unit,
  unitIndex,
  onOpenGuidebook,
}: {
  unit: UnitOut;
  unitIndex: number;
  onOpenGuidebook: (num: number, title: string) => void;
}) {
  const headerColor = unit.color || "#58cc02";

  // Calculate unit progress from completed regular lessons & crowns
  const regularLessons = unit.skills.flatMap((s) => s.lessons.filter((l) => !l.is_legendary));
  const completedRegular = regularLessons.filter((l) => l.completed).length;
  const totalRegular = regularLessons.length || 1;

  let progressPercent = (completedRegular / totalRegular) * 100;
  if (progressPercent === 0) {
    const completedSkillsCount = unit.skills.filter((s) => s.completed || s.crown_level >= 1).length;
    if (completedSkillsCount > 0) {
      progressPercent = (completedSkillsCount / unit.skills.length) * 100;
    }
  }

  const isUnitComplete = progressPercent >= 100;

  return (
    <div className="mb-14 relative">
      {/* Top Banner Box with Linear Progress Bar */}
      <UnitHeaderBanner
        unitIndex={unitIndex}
        unitTitle={unit.description || unit.title}
        unitColor={headerColor}
        progressPercent={progressPercent}
        onOpenGuidebook={() => onOpenGuidebook(unitIndex + 1, unit.description || unit.title)}
      />

      {/* Serpentine Pathway Nodes with Circular SVG Progress Bars */}
      <div className="relative flex flex-col items-center max-w-md mx-auto py-2">
        {/* Duo Owl Mascot standing beside Unit 1 pathway */}
        {unitIndex === 0 && (
          <div className="absolute right-4 sm:right-10 top-24 z-20 flex flex-col items-center">
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
              className="text-6xl sm:text-7xl filter drop-shadow-lg"
            >
              🦉
            </motion.div>
            <div className="w-16 h-4 bg-black/20 rounded-full blur-[2px] mt-1" />
          </div>
        )}

        {unit.skills.map((skill, i) => (
          <div key={skill.id} className="relative flex flex-col items-center w-full">
            <LevelPathwayNode
              skill={skill}
              index={i}
              unitColor={headerColor}
              isStartNode={unitIndex === 0 && i === 0}
            />

            {/* Additional nodes: Treasure Chest */}
            {i === 0 && (
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className="my-3 z-10 flex flex-col items-center"
                style={{ transform: `translateX(${X_OFFSETS[(i + 1) % X_OFFSETS.length]}px)` }}
              >
                <div
                  className={`w-14 h-14 rounded-2xl border-2 flex items-center justify-center text-3xl transition-all hover:scale-110 cursor-pointer ${
                    isUnitComplete
                      ? "bg-duo-yellow/20 border-duo-yellow text-duo-yellow shadow-[0_4px_0_0_#e5a100]"
                      : "bg-duo-gray-light/60 dark:bg-duo-dark-card border-gray-400 dark:border-gray-600 shadow-[0_4px_0_0_#999] dark:shadow-[0_4px_0_0_#444]"
                  }`}
                >
                  🎁
                </div>
              </motion.div>
            )}

            {/* Additional nodes: Trophy at the end */}
            {i === unit.skills.length - 1 && (
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className="my-3 z-10 flex flex-col items-center"
                style={{ transform: `translateX(${X_OFFSETS[(i + 2) % X_OFFSETS.length]}px)` }}
              >
                <div
                  className={`w-14 h-14 rounded-2xl border-2 flex items-center justify-center text-3xl transition-all hover:scale-110 cursor-pointer ${
                    isUnitComplete
                      ? "bg-duo-yellow/20 border-duo-yellow shadow-[0_4px_0_0_#e5a100] ring-4 ring-duo-yellow/30"
                      : "bg-duo-gray-light/60 dark:bg-duo-dark-card border-gray-400 dark:border-gray-600 shadow-[0_4px_0_0_#999] dark:shadow-[0_4px_0_0_#444]"
                  }`}
                >
                  🏆
                </div>
              </motion.div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function SkillTree({
  units,
  ttsLocale = "es-ES",
  courseName = "Language",
  flagEmoji = "🌍",
}: {
  units: UnitOut[];
  ttsLocale?: string;
  courseName?: string;
  flagEmoji?: string;
}) {
  const [guidebookTarget, setGuidebookTarget] = useState<{ number: number; title: string } | null>(null);

  return (
    <div className="py-6 px-4 max-w-lg mx-auto">
      {/* Render Unit Sections with Curvy Pathway */}
      {units.map((unit, i) => (
        <UnitSectionCurvy
          key={unit.id}
          unit={unit}
          unitIndex={i}
          onOpenGuidebook={(num, title) => setGuidebookTarget({ number: num, title })}
        />
      ))}

      {/* Guidebook Overlay Modal */}
      {guidebookTarget && (
        <GuidebookModal
          isOpen={!!guidebookTarget}
          onClose={() => setGuidebookTarget(null)}
          unitNumber={guidebookTarget.number}
          unitTitle={guidebookTarget.title}
          courseName={courseName}
          ttsLocale={ttsLocale}
          flagEmoji={flagEmoji}
        />
      )}

      <div className="text-center py-8 bg-duo-gray-light/30 dark:bg-duo-dark-card/30 rounded-2xl border-2 border-dashed border-duo-gray-light dark:border-duo-dark-border">
        <span className="text-3xl block mb-2">🎉</span>
        <p className="text-gray-500 dark:text-gray-300 font-extrabold text-sm">
          You've explored all 5 units! Keep practicing!
        </p>
      </div>
    </div>
  );
}
