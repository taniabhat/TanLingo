"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";

export default function SplashPage() {
  const router = useRouter();

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-between bg-black text-white relative overflow-hidden">
      {/* Background Video — Full-screen & Responsive */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden bg-black">
        <video
          src="/splash.mp4"
          autoPlay
          loop
          playsInline
          muted
          className="w-full h-full object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/30" />
      </div>

      {/* Top Header Navigation (Clean branding without sound/pause controls) */}
      <div className="w-full max-w-5xl px-6 py-6 flex justify-between items-center z-20">
        <div className="flex items-center gap-2">
          <span className="text-3xl sm:text-4xl">🦉</span>
          <span className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white drop-shadow">
            duolingo
          </span>
        </div>
      </div>

      {/* Main Hero Area */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center z-20 px-4 my-auto py-12 max-w-2xl"
      >
        <h1 className="text-4xl sm:text-6xl font-extrabold text-white mb-4 tracking-tight drop-shadow-lg leading-tight">
          Learn languages for free. Forever.
        </h1>
        <p className="text-lg sm:text-2xl text-white/90 font-bold mb-8 drop-shadow">
          The free, fun, and effective way to learn 10+ languages!
        </p>

        <div className="space-y-4 w-full max-w-md mx-auto">
          <button
            onClick={() => router.push("/register")}
            className="w-full py-4 bg-duo-green text-white font-extrabold text-lg sm:text-xl rounded-2xl shadow-[0_4px_0_0_#46a302] hover:brightness-105 active:shadow-none active:translate-y-1 transition-all uppercase tracking-wide cursor-pointer"
          >
            Get Started
          </button>
          <Link
            href="/login"
            className="block w-full py-4 bg-white/20 backdrop-blur-md text-white font-extrabold text-lg sm:text-xl rounded-2xl border-2 border-white/40 text-center uppercase tracking-wide hover:bg-white/30 transition-colors"
          >
            I Already Have an Account
          </Link>
        </div>
      </motion.div>

      {/* Bottom Stats Banner */}
      <div className="w-full z-20 pb-8 pt-4 px-4 border-t border-white/10 bg-black/40 backdrop-blur-md">
        <div className="max-w-xl mx-auto flex items-center justify-center gap-6 sm:gap-12">
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-extrabold text-white">10+</div>
            <div className="text-white/70 font-bold text-xs sm:text-sm">Languages</div>
          </div>
          <div className="w-px h-8 bg-white/30" />
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-extrabold text-white">Free</div>
            <div className="text-white/70 font-bold text-xs sm:text-sm">Forever</div>
          </div>
          <div className="w-px h-8 bg-white/30" />
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-extrabold text-white">Fun</div>
            <div className="text-white/70 font-bold text-xs sm:text-sm">& Effective</div>
          </div>
        </div>
      </div>
    </div>
  );
}
