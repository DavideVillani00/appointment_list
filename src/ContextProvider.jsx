import { createContext, useState, useEffect, useRef } from "react";

export const Context = createContext({
  theme: "light",
  handleTheme: () => {},
  dialog: () => {},
  projectState: [],
  handleAddAppointment: () => {},
  handleCheckboxAppointment: () => {},
  handleDeleteAppointment: () => {},
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

  useEffect(() => {
    localStorage.setItem("project", JSON.stringify(projectState));
  }, [projectState]);

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
    setProjectState((preState) => {
      return {
        uniqueid: ++preState.uniqueid,
        items: [
          ...preState.items,
          {
            id: preState.uniqueid,
            name,
            date,
            time,
            check: false,
          },
        ],
      };
    });
  }

  function handleCheckboxAppointment(id) {
    const updatedItems = projectState.items.map((app) => {
      return app.id == id ? { ...app, check: !app.check } : app;
    });
    setProjectState((preState) => {
      return { ...preState, items: updatedItems };
    });
  }

  function handleDeleteAppointment(id) {
    const updatedItems = projectState.items.filter((app) => {
      return app.id != id;
    });
    setProjectState((preState) => {
      return { ...preState, items: updatedItems };
    });
  }

  const contValue = {
    theme,
    handleTheme,
    dialog,
    projectState,
    handleAddAppointment,
    handleCheckboxAppointment,
    handleDeleteAppointment,
  };
  return <Context.Provider value={contValue}>{children}</Context.Provider>;
}
