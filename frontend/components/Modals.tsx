"use client";

import { motion } from "framer-motion";
import Modal from "./Modal";

interface LessonCompleteModalProps {
  open: boolean;
  xpEarned: number;
  crownLevel: number;
  streak: number;
  unitCompleted?: boolean;
  gemsReward?: number;
  onContinue: () => void;
}

export function LessonCompleteModal({
  open,
  xpEarned,
  crownLevel,
  streak,
  unitCompleted = false,
  gemsReward = 0,
  onContinue,
}: LessonCompleteModalProps) {
  return (
    <Modal open={open} onClose={onContinue}>
      <div className="duo-card p-8 text-center bounce-in">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", delay: 0.2 }}
          className="text-7xl mb-4"
        >
          {unitCompleted ? "🏆" : "🎉"}
        </motion.div>
        <h2 className="text-3xl font-extrabold text-duo-green mb-2">
          {unitCompleted ? "Unit Completed!" : "Lesson Complete!"}
        </h2>
        {unitCompleted && (
          <div className="my-3 py-2 px-4 bg-duo-yellow/20 border-2 border-duo-yellow rounded-2xl text-duo-yellow font-black text-lg animate-bounce inline-block">
            💎 +{gemsReward || 100} Gems Awarded!
          </div>
        )}
        <p className="text-gray-500 dark:text-gray-400 font-bold mb-6">Great job! Keep up the streak!</p>
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="duo-card p-4">
            <div className="text-2xl mb-1">⚡</div>
            <div className="font-extrabold text-duo-yellow">{xpEarned}</div>
            <div className="text-xs text-gray-400 font-bold uppercase">XP</div>
          </div>
          <div className="duo-card p-4">
            <div className="text-2xl mb-1">👑</div>
            <div className="font-extrabold text-duo-orange">{crownLevel}</div>
            <div className="text-xs text-gray-400 font-bold uppercase">Crowns</div>
          </div>
          <div className="duo-card p-4">
            <div className="text-2xl mb-1">🔥</div>
            <div className="font-extrabold text-duo-orange">{streak}</div>
            <div className="text-xs text-gray-400 font-bold uppercase">Streak</div>
          </div>
        </div>
        <button onClick={onContinue} className="duo-btn-green w-full py-4 text-lg">
          Continue
        </button>
      </div>
    </Modal>
  );
}

interface OutOfHeartsModalProps {
  open: boolean;
  gems: number;
  onRefill: () => void;
  onQuit: () => void;
}

export function OutOfHeartsModal({ open, gems, onRefill, onQuit }: OutOfHeartsModalProps) {
  return (
    <Modal open={open} onClose={onQuit}>
      <div className="duo-card p-8 text-center">
        <div className="text-7xl mb-4">💔</div>
        <h2 className="text-2xl font-extrabold text-duo-red mb-2">Out of Hearts!</h2>
        <p className="text-gray-500 dark:text-gray-400 font-bold mb-6">
          You ran out of hearts. Refill to keep learning or quit the lesson.
        </p>
        <div className="space-y-3">
          <button onClick={onRefill} className="duo-btn-blue w-full py-4 text-lg flex items-center justify-center gap-2">
            <span>💎</span> Refill Hearts (250 gems)
          </button>
          <p className="text-sm text-gray-400 font-bold">You have {gems} gems</p>
          <button onClick={onQuit} className="duo-btn-outline w-full py-4 text-lg">
            Quit Lesson
          </button>
        </div>
      </div>
    </Modal>
  );
}

interface PauseModalProps {
  open: boolean;
  onResume: () => void;
  onQuit: () => void;
}

export function PauseModal({ open, onResume, onQuit }: PauseModalProps) {
  return (
    <Modal open={open} onClose={onResume}>
      <div className="duo-card p-8 text-center">
        <div className="text-6xl mb-4">⏸️</div>
        <h2 className="text-2xl font-extrabold mb-6">Lesson Paused</h2>
        <div className="space-y-3">
          <button onClick={onResume} className="duo-btn-green w-full py-4 text-lg">
            Resume
          </button>
          <button onClick={onQuit} className="duo-btn-outline w-full py-4 text-lg text-duo-red">
            Quit Lesson
          </button>
        </div>
      </div>
    </Modal>
  );
}
