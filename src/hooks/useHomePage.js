import { useEffect, useState } from "react";

export default function useHomePage() {
  //   const [appointmentState, setAppointmentState] = useState([]);
  const [filters, setFilters] = useState({
    searchTitle: null,
    date: null,
    userName: null,
    check: null,
  });

  async function handleAppointment() {
    const response = await fetch(
      "http://localhost:3000/api/appointments/search",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(filters),
      }
    );
    const data = await response.json();

    if (response.ok) setAppointmentState(data);
  }

  //   useEffect(() => {
  //     handleAppointment();
  //   }, [filters]);
  return { appointmentState, setFilters };
}
