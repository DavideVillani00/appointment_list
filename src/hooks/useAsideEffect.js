import { useContext, useEffect } from "react";
import { Context } from "../ContextProvider.jsx";

export default function useAsideEffect() {
  const { projectState } = useContext(Context).globalProjectState;
  const { theme } = useContext(Context).globalThemeState;

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("project", JSON.stringify(projectState));
  }, [projectState]);

  return;
}
