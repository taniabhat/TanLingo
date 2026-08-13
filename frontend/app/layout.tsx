import type { Metadata } from "next";
import "./globals.css";
import { AppProvider } from "@/lib/context";
import { ToastProvider } from "@/components/Toast";
import SoundProvider from "@/components/SoundProvider";
import MainContainer from "@/components/MainContainer";

export const metadata: Metadata = {
  title: "Duolingo Clone — Learn 10+ Languages",
  description: "Learn languages with fun, bite-sized lessons",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-duo-gray-bg dark:bg-duo-dark-bg min-h-screen text-gray-800 dark:text-white">
        <SoundProvider>
          <AppProvider>
            <ToastProvider>
              <MainContainer>{children}</MainContainer>
            </ToastProvider>
          </AppProvider>
        </SoundProvider>
      </body>
    </html>
  );
}
