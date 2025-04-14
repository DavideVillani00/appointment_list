import { useState, useEffect, useContext } from "react";
import { Context } from "../../ContextProvider.jsx";
import useSorter from "../useSorter";
export default function useProjectState() {
  // const [appointmentState, setAppointmentState] = useState([]);
  const [userState, setUserState] = useState(null);
  const [usersList, setUsersList] = useState(null);
  // const [selectedAppointment, setSelectedAppointment] = useState(null);

  const [firefox, setFirefox] = useState(null);
  useEffect(() => {
    const uaBool = navigator.userAgent.toLowerCase().includes("firefox");
    setFirefox(uaBool);
    uploadUsers();
  }, []);

  async function uploadUsers() {
    try {
      const response = await fetch("http://localhost:3000/api/users", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      if (response.ok) {
        setUsersList(data);
      }
    } catch (err) {
      console.error("Error in fetch:", err);
    }
  }

  return {
    firefox,
    // appointmentState,
    // setAppointmentState,
    userState,
    setUserState,
    usersList,

    // selectedAppointment,
    // setSelectedAppointment,
  };
}
