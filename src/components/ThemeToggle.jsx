"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeToggleSwitch() {
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const current = theme === "system" ? systemTheme : theme;
    document.documentElement.classList.toggle("dark", current === "dark");
    document.documentElement.classList.toggle("light", current === "light");
  }, [theme, systemTheme]);

  if (!mounted) return null;

  const current = theme === "system" ? systemTheme : theme;

  return (
    <div
      className="flex rounded-lg overflow-hidden border border-[var(--color-border)]"
      style={{
        backgroundColor: "var(--color-toggle-bg)",
      }}
    >
      <button
        onClick={() => setTheme("light")}
        className={`px-4 py-2 text-sm font-medium w-full cursor-pointer transition-all 
          ${
            current === "light"
              ? "bg-[var(--color-btn-bg)] text-[var(--color-btn-text)]"
              : "text-[var(--color-navlink-text)] hover:bg-[var(--color-hover-bg)]"
          }`}
      >
        روشن
      </button>
      <button
        onClick={() => setTheme("dark")}
        className={`px-4 py-2 text-sm font-medium w-full cursor-pointer transition-all 
          ${
            current === "dark"
              ? "bg-[var(--color-btn-bg)] text-[var(--color-btn-text)]"
              : "text-[var(--color-navlink-text)] hover:bg-[var(--color-hover-bg)]"
          }`}
      >
        تاریک
      </button>
    </div>
  );
}
