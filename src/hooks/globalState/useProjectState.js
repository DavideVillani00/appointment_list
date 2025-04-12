import { useState, useEffect } from "react";

export default function useProjectState() {
  const [appointmentState, setAppointmentState] = useState([]);

  // const [projectState, setProjectState] = useState(
  //   /* localStorage.getItem("project")
  //     ? JSON.parse(localStorage.getItem("project"))
  //     : */ {
  //     filterState: "all",
  //     uniqueid: 0,
  //     items: [],
  //   }
  // );
  const [selectedId, setSelectedId] = useState(null);
  const [firefox, setFirefox] = useState(null);
  useEffect(() => {
    const uaBool = navigator.userAgent.toLowerCase().includes("firefox");
    setFirefox(uaBool);
  }, []);

  // function handleAddAppointment(name, date, time, timestamp) {
  //   setProjectState((preState) => {
  //     return {
  //       ...preState,
  //       uniqueid: ++preState.uniqueid,
  //       items: [
  //         ...preState.items,
  //         {
  //           id: preState.uniqueid,
  //           name,
  //           date,
  //           time,
  //           check: false,
  //           timestamp,
  //         },
  //       ],
  //     };
  //   });
  // }

  // function handleCheckboxAppointment(id) {
  //   const updatedItems = projectState.items.map((app) => {
  //     return app.id == id ? { ...app, check: !app.check } : app;
  //   });
  //   setProjectState((preState) => {
  //     return { ...preState, items: updatedItems };
  //   });
  // }

  // function handleDeleteAppointment() {
  //   const updatedItems = projectState.items.filter((app) => {
  //     return app.id != selectedId;
  //   });
  //   setProjectState((preState) => {
  //     return {
  //       ...preState,
  //       items: updatedItems,
  //     };
  //   });
  // }

  // function handleChangeFilter(e) {
  //   const filterState = e.target.value.toLowerCase();
  //   setProjectState((preState) => {
  //     return { ...preState, filterState };
  //   });
  // }

  return {
    // projectState,
    // handleAddAppointment,
    // handleCheckboxAppointment,
    // handleDeleteAppointment,
    // handleChangeFilter,
    // setSelectedId,
    firefox,
    appointmentState,
    setAppointmentState,
  };
}
