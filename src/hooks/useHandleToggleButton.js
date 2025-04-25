import { useContext } from "react";
import { Context } from "../ContextProvider";
import useModalAppointment from "./modal/useModalAppointment";
import useAuth from "./useAuth";

export default function useHandleToggleButton() {
  const { actualPage } = useContext(Context).globalProjectState;
  const { appointmentIdSelected, handleChangeFilterHome } =
    useContext(Context).globalHomePage;
  const { userIdSelected, handleChangeFilterAdmin } =
    useContext(Context).globalAdminPage;
  const { getAllAppointment } = useModalAppointment();
  const { downloadUsersList } = useAuth();

  async function handleToggleCheckButton(id) {
    try {
      const response = await fetch(
        `http://localhost:3000/api/appointments/edit/${id}`,
        { method: "PUT", headers: { "Content-Type": "application/json" } }
      );
      const data = await response.json();
      if (!response.ok) {
        return console.error("Error fetching appointments:", data.msg);
      }
      handleChangeFilterHome();
      getAllAppointment();
    } catch (err) {
      console.error("Error in fetch:", err);
    }
  }

  async function handleDelete() {
    let url;
    if (actualPage === "home") {
      url = `http://localhost:3000/api/appointments/delete/${appointmentIdSelected.current}`;
    } else if (actualPage === "admin") {
      url = `http://localhost:3000/api/users/delete/${userIdSelected.current}`;
    }
    try {
      const response = await fetch(url, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      if (!response.ok) {
        return console.error("Error fetching appointments:", data.msg);
      }
      handleChangeFilterAdmin(null, null);
      handleChangeFilterHome(null, null);
      getAllAppointment();
      downloadUsersList();
    } catch (err) {
      console.error("Error in fetch:", err);
    }
  }
  return { handleDelete, handleToggleCheckButton };
}
