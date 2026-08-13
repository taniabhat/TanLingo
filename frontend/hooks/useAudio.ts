"use client";

import { useCallback } from "react";
import { speakText, stopSpeech } from "@/lib/tts";
import { playClickSound } from "@/lib/sound";
import { playSuccessSound, playErrorSound } from "@/lib/utils";

export function useAudio() {
  const speak = useCallback((text: string, locale = "es-ES") => {
    speakText(text, locale);
  }, []);

  const stop = useCallback(() => {
    stopSpeech();
  }, []);

  const playPop = useCallback(() => {
    playClickSound();
  }, []);

  const playSuccess = useCallback(() => {
    playSuccessSound();
  }, []);

  const playError = useCallback(() => {
    playErrorSound();
  }, []);

  return {
    speak,
    stop,
    playPop,
    playSuccess,
    playError,
  };
}
