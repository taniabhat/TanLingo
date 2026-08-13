"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { useApp } from "@/lib/context";

export default function RegisterPage() {
  const router = useRouter();
  const { register, isAuthenticated, loading } = useApp();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (!loading && isAuthenticated) {
    router.replace("/courses");
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setSubmitting(true);
    try {
      const message = await register(username, email, password);
      setSuccess(message);
      setTimeout(() => router.push("/courses"), 1500);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-duo-gray-bg dark:bg-duo-dark-bg px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white dark:bg-duo-dark-card rounded-2xl border-2 border-duo-gray-light dark:border-duo-dark-border p-8 shadow-lg"
      >
        <div className="text-center mb-8">
          <div className="text-5xl mb-2">🦉</div>
          <h1 className="text-2xl font-extrabold text-duo-green">Create account</h1>
          <p className="text-gray-500 dark:text-gray-400 font-bold text-sm mt-1">
            Join millions learning 10+ languages for free.
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
              minLength={3}
              className="w-full px-4 py-3 rounded-xl border-2 border-duo-gray-light dark:border-duo-dark-border bg-white dark:bg-duo-dark-bg font-bold focus:border-duo-blue outline-none"
              placeholder="Choose a username"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-500 dark:text-gray-400 mb-1 uppercase tracking-wide">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-xl border-2 border-duo-gray-light dark:border-duo-dark-border bg-white dark:bg-duo-dark-bg font-bold focus:border-duo-blue outline-none"
              placeholder="you@example.com"
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
              placeholder="At least 6 characters"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-500 dark:text-gray-400 mb-1 uppercase tracking-wide">
              Confirm Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              minLength={6}
              className="w-full px-4 py-3 rounded-xl border-2 border-duo-gray-light dark:border-duo-dark-border bg-white dark:bg-duo-dark-bg font-bold focus:border-duo-blue outline-none"
              placeholder="Repeat your password"
            />
          </div>

          <div className="bg-duo-blue/10 border border-duo-blue/30 rounded-xl p-3 text-xs text-duo-blue font-bold flex items-center gap-2">
            <span className="text-base">📧</span>
            <span>A welcome email will be dispatched to your inbox upon registration!</span>
          </div>

          {error && (
            <p className="text-duo-red font-bold text-sm text-center bg-duo-red/10 py-2 rounded-xl">{error}</p>
          )}
          {success && (
            <p className="text-duo-green font-bold text-sm text-center bg-duo-green/10 py-2 rounded-xl">{success}</p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-4 bg-duo-green text-white font-extrabold text-lg rounded-2xl shadow-[0_4px_0_0_#46a302] hover:brightness-105 active:shadow-none active:translate-y-1 transition-all uppercase disabled:opacity-60"
          >
            {submitting ? "Creating account..." : "Create Account"}
          </button>
        </form>

        <p className="text-center mt-6 text-sm font-bold text-gray-500 dark:text-gray-400">
          Already have an account?{" "}
          <Link href="/login" className="text-duo-blue hover:underline">
            Log in
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
