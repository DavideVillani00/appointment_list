import { useState } from "react";

export default function useProjectState() {
  const [projectState, setProjectState] = useState(
    localStorage.getItem("project")
      ? JSON.parse(localStorage.getItem("project"))
      : {
          filterState: "all",
          uniqueid: 0,
          items: [],
        }
  );

  function handleAddAppointment(name, date, time, timestamp) {
    setProjectState((preState) => {
      return {
        ...preState,
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

  function handleChangeFilter(filterState) {
    setProjectState((preState) => {
      return { ...preState, filterState };
    });
  }

  return {
    projectState,
    handleAddAppointment,
    handleCheckboxAppointment,
    handleDeleteAppointment,
    handleChangeFilter,
  };
}
