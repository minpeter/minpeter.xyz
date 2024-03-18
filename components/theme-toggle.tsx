"use client";

import * as React from "react";
import { SunIcon } from "@radix-ui/react-icons";
import { FiMoon } from "react-icons/fi";

import { useTheme } from "next-themes";

export function ModeToggle() {
  const { setTheme, theme } = useTheme();

  return (
    <div
      className="relative w-6 h-6 cursor-pointer flex items-center justify-center"
      onClick={() => (theme === "dark" ? setTheme("light") : setTheme("dark"))}
    >
      <SunIcon className="absolute h-3 w-3 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <FiMoon className="absolute h-3 w-3 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </div>
  );
}
