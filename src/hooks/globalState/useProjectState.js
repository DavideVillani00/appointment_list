import { useState, useEffect, useContext } from "react";
import { Context } from "../../ContextProvider.jsx";
import useSorter from "../useSorter";
import { useNavigate } from "react-router-dom";
export default function useProjectState() {
  // const [appointmentState, setAppointmentState] = useState([]);
  const [userState, setUserState] = useState(null);
  const [usersList, setUsersList] = useState(null);
  // const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [pageLoading, setPageLoading] = useState(true);

  const { setAlertState } = useContext(Context);
  const navigate = useNavigate();
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

  function handleLogOut() {
    setUserState(null);
    setUsersList(null);
    localStorage.removeItem("token");
    setAlertState(true);
    document.documentElement.classList.add("overflow-hidden");

    setTimeout(() => {
      setAlertState(false);
      document.documentElement.classList.remove("overflow-hidden");
      navigate("/login");
      setPageLoading(false);
    }, 1000);
  }

  return {
    firefox,
    // appointmentState,
    // setAppointmentState,
    userState,
    setUserState,
    usersList,
    handleLogOut,
    uploadUsers,

    pageLoading,
    setPageLoading,

    // selectedAppointment,
    // setSelectedAppointment,
  };
}
