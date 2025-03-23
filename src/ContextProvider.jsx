import { createContext, useState, useEffect, useRef } from "react";

export const Context = createContext({
  theme: "light",
  handleTheme: () => {},
  dialog: () => {},
  projectState: [],
  handleAddAppointment: () => {},
  handleCheckboxAppointment: () => {},
  handleDeleteAppointment: () => {},
  appointmentCompleted: [],
  appointmentUncompleted: [],
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

  function handleAddAppointment(name, date, time, timestamp) {
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
            timestamp,
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

  const appointmentCompleted = projectState.items.filter((app) => {
    return app.check;
  });
  const appointmentUncompleted = projectState.items.filter((app) => {
    return !app.check;
  });

  // !! const filter provvisorio per debug, da sostituire con state
  const filter = "all";
  function sorter() {
    const sortAppCompl = appointmentCompleted.sort((a, b) => {
      return a.timestamp - b.timestamp;
    });
    const sortAppUncompl = appointmentUncompleted.sort((a, b) => {
      return a.timestamp - b.timestamp;
    });

    switch (filter) {
      case "completed":
        return sortAppCompl;

      case "uncompleted":
        return sortAppUncompl;

      default:
        return [...sortAppUncompl, ...sortAppCompl];
    }
  }
  console.log(sorter());

  const contValue = {
    theme,
    handleTheme,
    dialog,
    projectState,
    handleAddAppointment,
    handleCheckboxAppointment,
    handleDeleteAppointment,
    appointmentCompleted,
    appointmentUncompleted,
  };
  return <Context.Provider value={contValue}>{children}</Context.Provider>;
}
