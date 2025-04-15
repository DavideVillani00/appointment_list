import iconLoading from "../../assets/icons/beautyIcons/icon-loading-48.png";

import AppointmentCard from "./AppointmentCard.jsx";
import DialogDelete from "../modal/DialogDelete.jsx";
import useSorter from "../../hooks/useSorter.js";
import { useContext, useEffect, useState } from "react";
import { Context } from "../../ContextProvider.jsx";

export default function AppointmentList() {
  const { sort } = useSorter();
  const [appointmentsList, setAppointmentsList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { filters } = useContext(Context);

  async function uploadAppointment() {
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
      if (!response.ok) {
        console.error("Error fetching appointments:", data.msg);
        return setAppointmentsList(data.arr);
      }
      return setAppointmentsList(sort(data).appointmentSortered);
    } catch (err) {
      console.error("Error in fetch:", err);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 200);
    }
  }

  useEffect(() => {
    uploadAppointment();
  }, []);

  useEffect(() => {
    uploadAppointment();
  }, [filters]);

  return (
    <>
      <DialogDelete />
      <ul className="  m-2 p-5 rounded-md   flex flex-col items-center bg-bg2 dark:bg-bg2Dark border-none ">
        {isLoading ? (
          <img
            src={iconLoading}
            alt="loading ring"
            className="animate-spin w-[50px]"
          />
        ) : appointmentsList.length === 0 ? (
          <p>There isn't appointment</p>
        ) : (
          appointmentsList.map((app) => {
            return <AppointmentCard key={app.id} {...app} />;
          })
        )}
      </ul>
    </>
  );
}
