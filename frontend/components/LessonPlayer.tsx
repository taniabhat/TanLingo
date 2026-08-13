"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { api } from "@/lib/api";
import type { LessonDetailOut, ExerciseOut } from "@/lib/types";
import { useApp } from "@/lib/context";
import { playSuccessSound, playErrorSound, cn } from "@/lib/utils";
import ExerciseRenderer from "@/components/ExerciseRenderer";
import { LessonCompleteModal, OutOfHeartsModal, PauseModal } from "@/components/Modals";

export default function LessonPlayer({ lessonId }: { lessonId: number }) {
  const router = useRouter();
  const { refreshUser } = useApp();
  const [lesson, setLesson] = useState<LessonDetailOut | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<{ exercise_id: number; answer: string }[]>([]);
  const [feedback, setFeedback] = useState<"none" | "correct" | "wrong">("none");
  const [disabled, setDisabled] = useState(false);
  const [hearts, setHearts] = useState(5);
  const [showComplete, setShowComplete] = useState(false);
  const [showOutOfHearts, setShowOutOfHearts] = useState(false);
  const [showPause, setShowPause] = useState(false);
  const [submitResult, setSubmitResult] = useState<{
    xp: number;
    crown: number;
    streak: number;
    unitCompleted?: boolean;
    gemsReward?: number;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const { user } = useApp();

  useEffect(() => {
    api.getLesson(lessonId)
      .then((data) => {
        setLesson(data);
        setHearts(data.user_hearts);
      })
      .catch(() => router.push("/learn"))
      .finally(() => setLoading(false));
  }, [lessonId, router]);

  const currentExercise: ExerciseOut | undefined = lesson?.exercises[currentIndex];
  const progress = lesson ? ((currentIndex + (feedback !== "none" ? 1 : 0)) / lesson.exercises.length) * 100 : 0;

  const handleAnswer = useCallback(
    async (answer: string, correct: boolean) => {
      if (!currentExercise || disabled) return;
      setDisabled(true);
      setFeedback(correct ? "correct" : "wrong");

      const newAnswers = [...answers, { exercise_id: currentExercise.id, answer }];
      setAnswers(newAnswers);

      if (correct) {
        playSuccessSound();
      } else {
        playErrorSound();
        try {
          const result = await api.deductHeart(lessonId);
          setHearts(result.hearts);
          await refreshUser();
          if (result.out_of_hearts) {
            setTimeout(() => setShowOutOfHearts(true), 800);
            return;
          }
        } catch {
          /* continue */
        }
      }

      setTimeout(async () => {
        if (currentIndex + 1 >= (lesson?.exercises.length || 0)) {
          try {
            const result = await api.submitLesson(lessonId, newAnswers);
            setSubmitResult({
              xp: result.xp_earned,
              crown: result.crown_level,
              streak: result.streak,
              unitCompleted: result.unit_completed,
              gemsReward: result.gems_reward,
            });
            await refreshUser();
            if (result.failed) {
              router.push("/learn");
            } else {
              setShowComplete(true);
            }
          } catch {
            router.push("/learn");
          }
        } else {
          setCurrentIndex((i) => i + 1);
          setFeedback("none");
          setDisabled(false);
        }
      }, correct ? 1000 : 1500);
    },
    [currentExercise, disabled, answers, currentIndex, lesson, lessonId, refreshUser, router]
  );

  const handleRefill = async () => {
    try {
      const result = await api.refillHearts();
      if (result.hearts === 5) {
        setHearts(5);
        setShowOutOfHearts(false);
        setDisabled(false);
        setFeedback("none");
        await refreshUser();
      }
    } catch {
      /* not enough gems */
    }
  };

  if (loading || !lesson) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-6xl animate-bounce">🦉</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top bar */}
      <div className="sticky top-0 z-30 bg-white dark:bg-duo-dark-card border-b-2 border-duo-gray-light dark:border-duo-dark-border">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center gap-4">
          <button onClick={() => setShowPause(true)} className="text-gray-400 hover:text-gray-600 font-bold text-xl">
            ✕
          </button>
          <div className="flex-1 h-4 bg-duo-gray-light dark:bg-duo-dark-border rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-duo-green rounded-full"
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.4 }}
            />
          </div>
          <div className="flex items-center gap-1">
            <span className="text-lg">❤️</span>
            <span className="font-extrabold text-duo-red">{hearts}</span>
          </div>
        </div>
      </div>

      {/* Exercise area */}
      <div className="flex-1 max-w-2xl mx-auto w-full px-4 py-8">
        {lesson.is_legendary && (
          <div className="mb-4 px-4 py-2 bg-duo-yellow/20 border-2 border-duo-yellow rounded-2xl text-center font-extrabold text-duo-yellow">
            ⭐ Legendary Challenge — Double XP!
          </div>
        )}

        <AnimatePresence mode="wait">
          {currentExercise && (
            <motion.div
              key={currentExercise.id}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
            >
              <ExerciseRenderer
                exercise={currentExercise}
                onAnswer={handleAnswer}
                disabled={disabled}
                feedback={feedback}
                ttsLocale={lesson.tts_locale || "es-ES"}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Feedback bar */}
      <AnimatePresence>
        {feedback !== "none" && (
          <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            className={cn(
              "fixed bottom-0 left-0 right-0 p-5 sm:p-6 border-t-2 z-40 transition-colors shadow-2xl",
              feedback === "correct"
                ? "bg-[#d7ffb8] dark:bg-[#19381f] border-duo-green text-duo-green"
                : "bg-[#ffdfe0] dark:bg-[#3b191c] border-duo-red text-duo-red"
            )}
          >
            <div className="max-w-2xl mx-auto flex items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div
                  className={cn(
                    "w-12 h-12 rounded-full flex items-center justify-center text-2xl text-white font-black shrink-0 shadow-sm",
                    feedback === "correct" ? "bg-duo-green" : "bg-duo-red"
                  )}
                >
                  {feedback === "correct" ? "✓" : "✕"}
                </div>
                <div>
                  <p className="font-black text-xl sm:text-2xl tracking-tight">
                    {feedback === "correct" ? "Great job!" : "Correct solution:"}
                  </p>
                  {feedback === "wrong" && currentExercise && (
                    <p className="font-bold text-sm sm:text-base mt-0.5 opacity-90">
                      {currentExercise.correct_answer}
                    </p>
                  )}
                </div>
              </div>

              <button
                onClick={() => {
                  // Advance next exercise manually if needed
                }}
                className={cn(
                  "px-8 py-3.5 font-black text-base rounded-2xl uppercase tracking-wide cursor-pointer transition-all shadow-md active:translate-y-1 active:shadow-none shrink-0",
                  feedback === "correct"
                    ? "bg-duo-green text-white shadow-[0_4px_0_0_#46a302] hover:brightness-105"
                    : "bg-duo-red text-white shadow-[0_4px_0_0_#ea2b2b] hover:brightness-105"
                )}
              >
                CONTINUE
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <LessonCompleteModal
        open={showComplete}
        xpEarned={submitResult?.xp || 0}
        crownLevel={submitResult?.crown || 0}
        streak={submitResult?.streak || 0}
        unitCompleted={submitResult?.unitCompleted}
        gemsReward={submitResult?.gemsReward}
        onContinue={() => router.push("/learn")}
      />

      <OutOfHeartsModal
        open={showOutOfHearts}
        gems={user?.gems || 0}
        onRefill={handleRefill}
        onQuit={() => router.push("/learn")}
      />

      <PauseModal
        open={showPause}
        onResume={() => setShowPause(false)}
        onQuit={() => router.push("/learn")}
      />
    </div>
  );
}
