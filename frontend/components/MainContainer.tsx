"use client";

import { usePathname } from "next/navigation";
import Sidebar from "@/components/Sidebar";

export default function MainContainer({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideSidebar =
    pathname === "/" ||
    pathname === "/login" ||
    pathname === "/register" ||
    pathname === "/courses" ||
    pathname.startsWith("/lesson");

  return (
    <div className="flex min-h-screen w-full overflow-x-hidden">
      {!hideSidebar && <Sidebar />}
      <main className={`flex-1 w-full min-h-screen ${!hideSidebar ? "md:ml-[256px] pb-20 md:pb-0" : ""}`}>
        {children}
      </main>
    </div>
  );
}
