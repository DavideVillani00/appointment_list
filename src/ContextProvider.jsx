import { createContext, useState, useEffect, useRef } from "react";

export const Context = createContext({
  theme: "light",
  handleTheme: () => {},
  dialog: () => {},
  projectState: [],
  handleAddAppointment: () => {},
});

export default function ContextProvider({ children }) {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
  );
  const [projectState, setProjectState] = useState(
    localStorage.getItem("project")
      ? JSON.parse(localStorage.getItem("project"))
      : {
          uniqueid: 0,
          items: [],
        }
  );
  const dialog = useRef();

  useEffect(() => {
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

  function handleAddAppointment(name, date, time) {
    let id = projectState.uniqueid;
    setProjectState((preState) => {
      return {
        uniqueid: id++,
        items: [
          ...preState.items,
          {
            id,
            name,
            date,
            time,
            check: false,
          },
        ],
      };
    });
    localStorage.setItem("project", JSON.stringify(projectState));
  }

  function handleDeleteAppointment() {}

  function handleCheckboxAppointment() {}

  const contValue = {
    theme,
    handleTheme,
    dialog,
    projectState,
    handleAddAppointment,
  };
  return <Context.Provider value={contValue}>{children}</Context.Provider>;
}
