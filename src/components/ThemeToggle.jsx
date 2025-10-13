"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

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
  const isDark = current === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label="Toggle theme"
      className="cursor-pointer flex items-center justify-center w-10 h-10 rounded-full  
                 transition-all duration-300 hover:scale-105 hover:bg-[var(--color-hover-bg)]"
      style={{
        backgroundColor: "var(--color-toggle-bg)",
        color: "var(--color-navlink-text)",
      }}
    >
      {isDark ? (
        <Sun size={18} className="text-[var(--color-icon-text)] " />
      ) : (
        <Moon size={18} className="text-[var(--color-icon-text)]  " />
      )}
    </button>
  );
}
