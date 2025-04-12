import { useContext, useEffect, useState } from "react";
import { Context } from "../ContextProvider";

export default function useHomePage() {
  const { filters } = useContext(Context);
  const { appointmentState, setAppointmentState } =
    useContext(Context).globalProjectState;
  //   const [appointmentState, setAppointmentState] = useState([]);
  //   const [filters, setFilters] = useState({
  //     searchTitle: null,
  //     date: null,
  //     userName: null,
  //     check: null,
  //   });
  const [isLoading, setIsLoading] = useState(false);

  async function handleAppointment() {
    setIsLoading(true);
    try {
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
    } catch (err) {
      console.error(err);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 200);
    }
  }

  useEffect(() => {
    handleAppointment();
  }, [filters]);
  return { isLoading };
}
