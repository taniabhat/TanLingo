"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useApp } from "@/lib/context";
import FlagIcon from "@/components/FlagIcon";

const navItems = [
  { href: "/learn", label: "Learn", icon: "🏠" },
  { href: "/courses", label: "Courses", icon: "🌍" },
  { href: "/quests", label: "Quests", icon: "📦" },
  { href: "/leaderboard", label: "Leaderboard", icon: "🏆" },
  { href: "/profile", label: "Profile", icon: "👤" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { toggleDarkMode, darkMode, logout, user } = useApp();

  if (pathname === "/" || pathname.startsWith("/lesson")) return null;

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden md:flex fixed left-0 top-0 h-full w-64 flex-col border-r-2 border-duo-gray-light dark:border-duo-dark-border bg-white dark:bg-duo-dark-card z-40">
        <div className="p-6">
          <Link href="/learn" className="flex items-center gap-2">
            <span className="text-3xl">🦉</span>
            <span className="text-2xl font-extrabold text-duo-green tracking-tight">tanLingo</span>
          </Link>
        </div>
        <nav className="flex-1 px-4 space-y-1">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-2xl font-bold text-lg transition-colors",
                  active
                    ? "bg-duo-blue/10 text-duo-blue border-2 border-duo-blue"
                    : "text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-duo-dark-bg"
                )}
              >
                <span className="text-xl">{item.icon}</span>
                {item.label}
              </Link>
            );
          })}
        </nav>

        {user && (
          <div className="px-6 py-3 border-t border-duo-gray-light dark:border-duo-dark-border">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Active Learner</p>
            <p className="font-extrabold text-sm truncate text-duo-green">{user.username}</p>
          </div>
        )}

        <div className="p-4 border-t-2 border-duo-gray-light dark:border-duo-dark-border space-y-2">
          <button
            onClick={toggleDarkMode}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-2xl font-bold text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-duo-dark-bg transition-colors"
          >
            <span className="text-xl">{darkMode ? "☀️" : "🌙"}</span>
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>
          {user && (
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-2.5 rounded-2xl font-bold text-duo-red hover:bg-duo-red/10 transition-colors"
            >
              <span className="text-xl">🚪</span>
              Log Out
            </button>
          )}
        </div>
      </aside>

      {/* Mobile bottom nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-duo-dark-card border-t-2 border-duo-gray-light dark:border-duo-dark-border z-40 flex">
        {navItems.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex-1 flex flex-col items-center py-2 font-bold text-xs",
                active ? "text-duo-blue" : "text-gray-400"
              )}
            >
              <span className="text-2xl">{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>
    </>
  );
}
