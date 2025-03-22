import { createContext, useState, useEffect } from "react";
export const Context = createContext({
  theme: "light",
  handleTheme: () => {},
});

export default function ContextProvider({ children }) {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    if (localStorage.getItem("theme")) {
      setTheme(localStorage.getItem("theme"));
    }
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    }
  }, []);

  function handleTheme() {
    if (theme === "light") {
      setTheme("dark");
      localStorage.setItem("theme", "dark");
      document.documentElement.classList.add("dark");
    } else {
      setTheme("light");
      localStorage.setItem("theme", "light");
      document.documentElement.classList.remove("dark");
    }
  }
  const contValue = {
    theme,
    handleTheme,
  };
  return <Context.Provider value={contValue}>{children}</Context.Provider>;
}
