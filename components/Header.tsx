"use client";

import { useTheme } from "next-themes";
import { Sun, Moon, FileText } from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Header() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6 mx-auto">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <FileText className="h-5 w-5" />
          </div>
          <span>DocuOCR</span>
        </Link>
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="rounded-full p-2 hover:bg-accent transition-colors"
          aria-label="Toggle theme"
        >
          {mounted ? (
            theme === "dark" ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )
          ) : (
            <div className="h-5 w-5" /> // Placeholder to prevent layout shift
          )}
        </button>
      </div>
    </header>
  );
}
