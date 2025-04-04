import { useState } from "react";

export default function useThemeState() {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
  );

  function handleTheme() {
    setTimeout(() => {
      if (theme === "light") {
        setTheme("dark");
        localStorage.setItem("theme", "dark");
        document.documentElement.classList.add("dark");
      } else {
        setTheme("light");
        localStorage.setItem("theme", "light");
        document.documentElement.classList.remove("dark");
      }
    }, 300);
  }

  return { theme, handleTheme };
}
