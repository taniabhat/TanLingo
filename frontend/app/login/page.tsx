"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { useApp } from "@/lib/context";

export default function LoginPage() {
  const router = useRouter();
  const { login, isAuthenticated, loading } = useApp();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (!loading && isAuthenticated) {
    router.replace("/courses");
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await login(username, password);
      router.push("/courses");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-duo-gray-bg dark:bg-duo-dark-bg px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white dark:bg-duo-dark-card rounded-2xl border-2 border-duo-gray-light dark:border-duo-dark-border p-8 shadow-lg"
      >
        <div className="text-center mb-8">
          <div className="text-5xl mb-2">🦉</div>
          <h1 className="text-2xl font-extrabold text-duo-green">Log in</h1>
          <p className="text-gray-500 dark:text-gray-400 font-bold text-sm mt-1">
            Welcome back! Continue your learning streak.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-gray-500 dark:text-gray-400 mb-1 uppercase tracking-wide">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-xl border-2 border-duo-gray-light dark:border-duo-dark-border bg-white dark:bg-duo-dark-bg font-bold focus:border-duo-blue outline-none"
              placeholder="Enter your username"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-500 dark:text-gray-400 mb-1 uppercase tracking-wide">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="w-full px-4 py-3 rounded-xl border-2 border-duo-gray-light dark:border-duo-dark-border bg-white dark:bg-duo-dark-bg font-bold focus:border-duo-blue outline-none"
              placeholder="Enter your password"
            />
          </div>

          {error && (
            <p className="text-duo-red font-bold text-sm text-center bg-duo-red/10 py-2 rounded-xl">{error}</p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-4 bg-duo-green text-white font-extrabold text-lg rounded-2xl shadow-[0_4px_0_0_#46a302] hover:brightness-105 active:shadow-none active:translate-y-1 transition-all uppercase disabled:opacity-60"
          >
            {submitting ? "Logging in..." : "Log In"}
          </button>
        </form>

        <p className="text-center mt-6 text-sm font-bold text-gray-500 dark:text-gray-400">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-duo-blue hover:underline">
            Sign up
          </Link>
        </p>

        <p className="text-center mt-3 text-xs text-gray-400">
          Demo: username <span className="font-bold">demo</span> / password <span className="font-bold">password123</span>
        </p>
      </motion.div>
    </div>
  );
}
