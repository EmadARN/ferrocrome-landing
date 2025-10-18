"use client";
import { useState, useEffect } from "react";

export default function SearchInput({
  value,
  onChange,
  placeholder = "جستجو...",
}) {
  const [input, setInput] = useState(value || "");

  useEffect(() => {
    const timer = setTimeout(() => onChange(input), 300); // debounce
    return () => clearTimeout(timer);
  }, [input, onChange]);

  return (
    <input
      type="text"
      value={input}
      onChange={(e) => setInput(e.target.value)}
      placeholder={placeholder}
      className="w-full max-w-[140px] md:max-w-[400px] px-4 py-2 rounded-md bg-white/10 backdrop-blur-md border border-white/20 placeholder-gray-400 text-white focus:outline-none focus:border-white/30 focus:bg-white/20 transition"
    />
  );
}
