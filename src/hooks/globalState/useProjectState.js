import { useState, useEffect } from "react";
export default function useProjectState() {
  const [firefox, setFirefox] = useState(null);
  const [pageLoading, setPageLoading] = useState(true);
  const [userState, setUserState] = useState(null);
  const [usersList, setUsersList] = useState(null);
  const [actualPage, setActualPage] = useState(null);
  const [alertState, setAlertState] = useState(false);
  const [appointmentsList, setAppointmentsList] = useState([]);

  useEffect(() => {
    const uaBool = navigator.userAgent.toLowerCase().includes("firefox");
    setFirefox(uaBool);
  }, []);

  return {
    firefox,

    pageLoading,
    setPageLoading,

    userState,
    setUserState,

    usersList,
    setUsersList,

    actualPage,
    setActualPage,

    alertState,
    setAlertState,

    appointmentsList,
    setAppointmentsList,
  };
}
