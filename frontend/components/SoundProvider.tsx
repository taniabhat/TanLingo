"use client";

import { useEffect } from "react";
import { attachGlobalClickSound } from "@/lib/sound";

export default function SoundProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const cleanup = attachGlobalClickSound();
    return () => {
      if (cleanup) cleanup();
    };
  }, []);

  return <>{children}</>;
}
