"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Switch } from "antd";

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div>
      <Switch
        onClick={() => {
          theme == "light" ? setTheme("dark") : setTheme("light");
        }}
      />
    </div>
  );
}
