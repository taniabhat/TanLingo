"use client";

import { useEffect, useState, useRef } from "react";
import type { ExerciseOut } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useAudio } from "@/hooks/useAudio";

interface ExerciseProps {
  exercise: ExerciseOut;
  onAnswer: (answer: string, correct: boolean) => void;
  disabled: boolean;
  feedback: "none" | "correct" | "wrong";
  ttsLocale?: string;
}

const ACCENT_MAP: Record<string, string[]> = {
  "es-ES": ["á", "é", "í", "ó", "ú", "ñ", "¿", "¡"],
  "fr-FR": ["é", "è", "ê", "à", "ç", "ù", "î", "ô"],
  "de-DE": ["ä", "ö", "ü", "ß"],
  "it-IT": ["à", "è", "é", "ì", "ò", "ù"],
  "pt-BR": ["ã", "õ", "á", "é", "í", "ó", "ú", "ç"],
};

const DEFAULT_ACCENTS = ["á", "é", "í", "ó", "ú", "ñ", "ç", "à", "è", "ä", "ö", "ü", "ß"];

function AccentBar({ locale = "es-ES", onInsert }: { locale?: string; onInsert: (char: string) => void }) {
  const accents = ACCENT_MAP[locale] || DEFAULT_ACCENTS;

  return (
    <div className="flex flex-wrap gap-1.5 mb-4">
      {accents.map((char) => (
        <button
          key={char}
          type="button"
          onClick={() => onInsert(char)}
          className="px-3 py-1.5 bg-gray-100 dark:bg-duo-dark-card border border-gray-300 dark:border-gray-700 rounded-xl font-bold text-base hover:bg-duo-blue/10 hover:border-duo-blue active:scale-95 transition-all cursor-pointer"
        >
          {char}
        </button>
      ))}
    </div>
  );
}

function getQuotedText(text: string): string | null {
  const match = text.match(/'([^']+)'/);
  return match ? match[1] : null;
}

export function getExerciseInfo(exercise: ExerciseOut, ttsLocale: string = "es-ES") {
  const quoted = getQuotedText(exercise.prompt);

  let badge = "EXERCISE";
  let title = exercise.prompt;
  let spokenText = exercise.audio_text || quoted || exercise.prompt;
  let spokenLocale = ttsLocale;

  if (exercise.type === "translate") {
    if (exercise.prompt.toLowerCase().includes("translate to english")) {
      badge = "WRITE THIS IN ENGLISH";
      title = "Write this in English";
      spokenLocale = ttsLocale;
    } else {
      const langMatch = exercise.prompt.match(/translate to ([^:]+):/i);
      const targetLang = langMatch ? langMatch[1].trim() : "Target Language";
      badge = `WRITE THIS IN ${targetLang.toUpperCase()}`;
      title = `Write this in ${targetLang}`;
      spokenLocale = "en-US";
    }
    if (quoted) spokenText = quoted;
  } else if (exercise.type === "multiple_choice") {
    badge = "SELECT THE CORRECT ANSWER";
    if (
      exercise.prompt.toLowerCase().includes("english translation") ||
      exercise.prompt.toLowerCase().includes("english meaning")
    ) {
      title = "Select the correct English translation";
      spokenLocale = ttsLocale;
    } else if (exercise.prompt.toLowerCase().includes("translation for:")) {
      const langMatch = exercise.prompt.match(/select the correct (.+) translation/i);
      const targetLang = langMatch ? langMatch[1].trim() : "";
      title = targetLang ? `Select the correct ${targetLang} translation` : "Select the correct answer";
      spokenLocale = "en-US";
    } else {
      title = "Select the correct answer";
      spokenLocale = ttsLocale;
    }
    if (quoted) spokenText = quoted;
  } else if (exercise.type === "type_answer") {
    badge = "TYPE IN ENGLISH";
    title = "Type the English meaning";
    spokenLocale = ttsLocale;
    if (quoted) spokenText = quoted;
  } else if (exercise.type === "fill_blank") {
    badge = "FILL IN THE BLANK";
    title = "Fill in the blank in English";
    spokenLocale = ttsLocale;
    if (quoted) spokenText = quoted;
    else if (exercise.audio_text) spokenText = exercise.audio_text;
  } else if (exercise.type === "match_pairs") {
    badge = "MATCH THE PAIRS";
    title = exercise.prompt;
    spokenLocale = ttsLocale;
  }

  return { badge, title, spokenText, spokenLocale };
}

function ExerciseHeader({ exercise, ttsLocale = "es-ES" }: { exercise: ExerciseOut; ttsLocale?: string }) {
  const { speak } = useAudio();
  const { badge, title, spokenText, spokenLocale } = getExerciseInfo(exercise, ttsLocale);

  useEffect(() => {
    if (spokenText) {
      const timer = setTimeout(() => {
        speak(spokenText, spokenLocale);
      }, 250);
      return () => clearTimeout(timer);
    }
  }, [exercise.id, spokenText, spokenLocale, speak]);

  const handlePlayAudio = () => {
    if (spokenText) {
      speak(spokenText, spokenLocale);
    }
  };

  return (
    <div className="mb-8">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-xs font-black px-2.5 py-1 rounded-full bg-duo-purple/20 text-duo-purple uppercase tracking-widest flex items-center gap-1">
          <span>✨</span> {badge}
        </span>
      </div>

      <h2 className="text-2xl sm:text-3xl font-black text-gray-800 dark:text-white mb-6">
        {title}
      </h2>

      {/* Character Mascot + Speech Bubble */}
      <div className="flex items-center gap-4 my-4">
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-duo-yellow/20 border-2 border-duo-yellow flex items-center justify-center text-4xl sm:text-5xl shrink-0 shadow-sm">
          👵
        </div>

        <div
          onClick={handlePlayAudio}
          className="relative bg-white dark:bg-duo-dark-card border-2 border-gray-200 dark:border-duo-dark-border hover:border-duo-blue dark:hover:border-duo-blue rounded-2xl p-4 shadow-sm flex items-center gap-3 cursor-pointer transition-all group"
          title="Click to hear pronunciation"
        >
          <div className="absolute -left-2 top-6 w-3.5 h-3.5 bg-white dark:bg-duo-dark-card border-b-2 border-l-2 border-gray-200 dark:border-duo-dark-border group-hover:border-duo-blue rotate-45" />

          <div className="w-10 h-10 rounded-xl bg-duo-blue text-white flex items-center justify-center text-lg shadow-sm group-hover:scale-105 transition-transform shrink-0">
            🔊
          </div>

          <span className="font-extrabold text-xl sm:text-2xl text-gray-800 dark:text-white border-b-2 border-dotted border-duo-blue pb-0.5">
            {spokenText}
          </span>
        </div>
      </div>
    </div>
  );
}

function MultipleChoice({ exercise, onAnswer, disabled, feedback, ttsLocale }: ExerciseProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const { speak, playPop } = useAudio();

  const handleSelect = (option: string) => {
    if (disabled) return;
    playPop();
    const isEnglishOption = /^[a-zA-Z0-9\s.,!?'"]+$/.test(option);
    speak(option, isEnglishOption ? "en-US" : ttsLocale);
    setSelected(option);
  };

  const handleCheck = () => {
    if (!selected || disabled) return;
    const correct = selected === exercise.correct_answer;
    onAnswer(selected, correct);
  };

  return (
    <div>
      <ExerciseHeader exercise={exercise} ttsLocale={ttsLocale} />
      <div className="grid gap-3.5 mb-8">
        {exercise.options?.map((option) => {
          const isSelected = selected === option;
          return (
            <button
              key={option}
              onClick={() => handleSelect(option)}
              disabled={disabled}
              className={cn(
                "w-full duo-card p-4 sm:p-5 text-left font-extrabold text-lg sm:text-xl transition-all flex items-center justify-between cursor-pointer border-2 shadow-[0_4px_0_0_#e5e5e5] dark:shadow-[0_4px_0_0_#242e33] active:translate-y-1 active:shadow-none",
                isSelected && feedback === "none" && "border-duo-blue bg-duo-blue/10 text-duo-blue shadow-[0_4px_0_0_#1cb0f6]",
                isSelected && feedback === "correct" && "border-duo-green bg-duo-green/10 text-duo-green shadow-[0_4px_0_0_#46a302]",
                isSelected && feedback === "wrong" && "border-duo-red bg-duo-red/10 text-duo-red shake shadow-[0_4px_0_0_#ea2b2b]",
                feedback !== "none" && option === exercise.correct_answer && "border-duo-green bg-duo-green/10 text-duo-green"
              )}
            >
              <span>{option}</span>
              <span className="text-xl opacity-60 hover:opacity-100 transition-opacity">🔊</span>
            </button>
          );
        })}
      </div>

      {!disabled && selected && feedback === "none" && (
        <button
          onClick={handleCheck}
          className="w-full py-4 bg-duo-green text-white font-black text-lg rounded-2xl shadow-[0_5px_0_0_#46a302] hover:brightness-105 active:shadow-none active:translate-y-1 transition-all uppercase tracking-wide cursor-pointer"
        >
          CHECK
        </button>
      )}
    </div>
  );
}

function TranslateExercise({ exercise, onAnswer, disabled, feedback, ttsLocale }: ExerciseProps) {
  const words = exercise.options || [];
  const [selected, setSelected] = useState<string[]>([]);
  const [bank, setBank] = useState<string[]>(() => [...words].sort(() => Math.random() - 0.5));
  const { speak, playPop } = useAudio();

  const addWord = (word: string, idx: number) => {
    if (disabled) return;
    playPop();
    const isEnglishWord = /^[a-zA-Z0-9\s.,!?'"]+$/.test(word);
    speak(word, isEnglishWord ? "en-US" : ttsLocale);
    setSelected([...selected, word]);
    setBank(bank.filter((_, i) => i !== idx));
  };

  const removeWord = (idx: number) => {
    if (disabled) return;
    playPop();
    const word = selected[idx];
    setSelected(selected.filter((_, i) => i !== idx));
    setBank([...bank, word]);
  };

  const handleCheck = () => {
    const answer = selected.join(" ");
    onAnswer(answer, answer.toLowerCase() === exercise.correct_answer.toLowerCase());
  };

  return (
    <div>
      <ExerciseHeader exercise={exercise} ttsLocale={ttsLocale} />

      {/* Selected Words Answer Slot */}
      <div
        className={cn(
          "min-h-[72px] border-2 border-dashed border-gray-300 dark:border-duo-dark-border rounded-2xl p-4 mb-6 flex flex-wrap gap-2.5 items-center transition-colors bg-white/40 dark:bg-duo-dark-card/40",
          feedback === "correct" && "border-duo-green bg-duo-green/10",
          feedback === "wrong" && "border-duo-red bg-duo-red/10 shake"
        )}
      >
        {selected.length === 0 && (
          <span className="text-sm font-bold text-gray-400 italic">Tap words below to form translation...</span>
        )}
        {selected.map((word, i) => (
          <button
            key={`${word}-${i}`}
            onClick={() => removeWord(i)}
            disabled={disabled}
            className="px-4 py-2.5 bg-white dark:bg-duo-dark-card border-2 border-gray-200 dark:border-duo-dark-border rounded-xl font-extrabold text-base sm:text-lg shadow-[0_3px_0_0_#e5e5e5] dark:shadow-[0_3px_0_0_#242e33] hover:border-duo-blue active:translate-y-0.5 active:shadow-none transition-all cursor-pointer"
          >
            {word}
          </button>
        ))}
      </div>

      {/* Word Bank Chips */}
      <div className="flex flex-wrap gap-2.5 mb-8">
        {bank.map((word, i) => (
          <button
            key={`bank-${word}-${i}`}
            onClick={() => addWord(word, i)}
            disabled={disabled}
            className="px-4 py-2.5 bg-gray-100 dark:bg-duo-dark-card border-2 border-gray-200 dark:border-duo-dark-border rounded-xl font-extrabold text-base sm:text-lg shadow-[0_3px_0_0_#e5e5e5] dark:shadow-[0_3px_0_0_#242e33] hover:border-duo-blue hover:bg-white active:translate-y-0.5 active:shadow-none transition-all cursor-pointer"
          >
            {word}
          </button>
        ))}
      </div>

      {!disabled && selected.length > 0 && feedback === "none" && (
        <button
          onClick={handleCheck}
          className="w-full py-4 bg-duo-green text-white font-black text-lg rounded-2xl shadow-[0_5px_0_0_#46a302] hover:brightness-105 active:shadow-none active:translate-y-1 transition-all uppercase tracking-wide cursor-pointer"
        >
          CHECK
        </button>
      )}
    </div>
  );
}

function TypeAnswer({ exercise, onAnswer, disabled, feedback, ttsLocale }: ExerciseProps) {
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const { playPop } = useAudio();

  const handleInsertAccent = (char: string) => {
    playPop();
    setValue((prev) => prev + char);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleSubmit = () => {
    if (!value.trim() || disabled) return;
    playPop();
    onAnswer(value.trim(), value.trim().toLowerCase() === exercise.correct_answer.toLowerCase());
  };

  return (
    <div>
      <ExerciseHeader exercise={exercise} ttsLocale={ttsLocale} />

      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={disabled}
        onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
        className={cn(
          "duo-input mb-4 p-4 rounded-2xl border-2 text-lg font-bold w-full",
          feedback === "correct" && "border-duo-green bg-duo-green/10",
          feedback === "wrong" && "border-duo-red bg-duo-red/10 shake"
        )}
        placeholder="Type the English meaning..."
        autoFocus
      />

      {/* Accent Mark Helper Buttons */}
      <AccentBar locale={ttsLocale} onInsert={handleInsertAccent} />

      {!disabled && value.trim() && feedback === "none" && (
        <button
          onClick={handleSubmit}
          className="w-full py-4 bg-duo-green text-white font-black text-lg rounded-2xl shadow-[0_5px_0_0_#46a302] hover:brightness-105 active:shadow-none active:translate-y-1 transition-all uppercase tracking-wide cursor-pointer mt-4"
        >
          CHECK
        </button>
      )}
    </div>
  );
}

function FillBlank({ exercise, onAnswer, disabled, feedback, ttsLocale }: ExerciseProps) {
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const { playPop } = useAudio();

  const handleInsertAccent = (char: string) => {
    playPop();
    setValue((prev) => prev + char);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleSubmit = () => {
    if (!value.trim() || disabled) return;
    playPop();
    onAnswer(value.trim(), value.trim().toLowerCase() === exercise.correct_answer.toLowerCase());
  };

  return (
    <div>
      <ExerciseHeader exercise={exercise} ttsLocale={ttsLocale} />

      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={disabled}
        onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
        className={cn(
          "duo-input mb-4 p-4 rounded-2xl border-2 text-lg font-bold max-w-sm w-full",
          feedback === "correct" && "border-duo-green bg-duo-green/10",
          feedback === "wrong" && "border-duo-red bg-duo-red/10 shake"
        )}
        placeholder="Type missing English word..."
        autoFocus
      />

      {/* Accent Mark Helper Buttons */}
      <AccentBar locale={ttsLocale} onInsert={handleInsertAccent} />

      {!disabled && value.trim() && feedback === "none" && (
        <button
          onClick={handleSubmit}
          className="w-full py-4 bg-duo-green text-white font-black text-lg rounded-2xl shadow-[0_5px_0_0_#46a302] hover:brightness-105 active:shadow-none active:translate-y-1 transition-all uppercase tracking-wide cursor-pointer mt-4"
        >
          CHECK
        </button>
      )}
    </div>
  );
}

function MatchPairs({ exercise, onAnswer, disabled, feedback, ttsLocale }: ExerciseProps) {
  const pairs = exercise.pairs || [];
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const [matched, setMatched] = useState<Set<string>>(new Set());
  const [wrongPair, setWrongPair] = useState<string | null>(null);
  const [userMatches, setUserMatches] = useState<Record<string, string>>({});
  const { speak, playPop } = useAudio();

  const leftItems = pairs.map((p) => p.left);
  const [rightItems] = useState(() => [...pairs.map((p) => p.right)].sort(() => Math.random() - 0.5));

  const handleLeft = (item: string) => {
    if (disabled || matched.has(item)) return;
    playPop();
    speak(item, ttsLocale);
    setSelectedLeft(item);
    setWrongPair(null);
  };

  const handleRight = (item: string) => {
    if (disabled || !selectedLeft) return;
    playPop();
    speak(item, "en-US");
    const pair = pairs.find((p) => p.left === selectedLeft);
    if (pair && pair.right === item) {
      const newMatched = new Set(matched);
      newMatched.add(selectedLeft);
      setMatched(newMatched);
      setUserMatches({ ...userMatches, [selectedLeft]: item });
      setSelectedLeft(null);

      if (newMatched.size === pairs.length) {
        const answerStr = pairs.map((p) => `${p.left}:${p.right}`).join("|");
        onAnswer(answerStr, true);
      }
    } else {
      setWrongPair(selectedLeft);
      setTimeout(() => {
        setWrongPair(null);
        setSelectedLeft(null);
      }, 600);
    }
  };

  return (
    <div>
      <ExerciseHeader exercise={exercise} ttsLocale={ttsLocale} />
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-3">
          {leftItems.map((item) => (
            <button
              key={item}
              onClick={() => handleLeft(item)}
              disabled={disabled || matched.has(item)}
              className={cn(
                "w-full duo-card p-4 font-extrabold text-left transition-all border-2 shadow-[0_4px_0_0_#e5e5e5] dark:shadow-[0_4px_0_0_#242e33] active:translate-y-1 active:shadow-none",
                selectedLeft === item && "border-duo-blue bg-duo-blue/10 text-duo-blue shadow-[0_4px_0_0_#1cb0f6]",
                matched.has(item) && "border-duo-green bg-duo-green/10 text-duo-green opacity-60 shadow-none scale-95",
                wrongPair === item && "border-duo-red bg-duo-red/10 text-duo-red shake"
              )}
            >
              {item}
            </button>
          ))}
        </div>
        <div className="space-y-3">
          {rightItems.map((item) => (
            <button
              key={item}
              onClick={() => handleRight(item)}
              disabled={disabled || Object.values(userMatches).includes(item)}
              className={cn(
                "w-full duo-card p-4 font-extrabold text-left transition-all border-2 shadow-[0_4px_0_0_#e5e5e5] dark:shadow-[0_4px_0_0_#242e33] hover:border-duo-blue active:translate-y-1 active:shadow-none",
                Object.values(userMatches).includes(item) && "border-duo-green bg-duo-green/10 text-duo-green opacity-60 shadow-none scale-95"
              )}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ExerciseRenderer(props: ExerciseProps) {
  switch (props.exercise.type) {
    case "multiple_choice":
      return <MultipleChoice key={props.exercise.id} {...props} />;
    case "translate":
      return <TranslateExercise key={props.exercise.id} {...props} />;
    case "type_answer":
      return <TypeAnswer key={props.exercise.id} {...props} />;
    case "fill_blank":
      return <FillBlank key={props.exercise.id} {...props} />;
    case "match_pairs":
      return <MatchPairs key={props.exercise.id} {...props} />;
    default:
      return <MultipleChoice key={props.exercise.id} {...props} />;
  }
}
