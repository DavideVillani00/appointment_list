import { useContext, useEffect } from "react";
import { Context } from "../ContextProvider.jsx";

export default function useAsideEffect() {
  const { theme } = useContext(Context).globalThemeState;

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    }
  }, []);

  return;
}
