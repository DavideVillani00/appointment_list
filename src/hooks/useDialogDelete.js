import { useContext } from "react";
import { Context } from "../ContextProvider.jsx";

export default function useDialogDelete() {
  const { dialogDelete } = useContext(Context);
  const { actualPage } = useContext(Context).globalProjectState;
  const { appointmentIdSelected } = useContext(Context).globalHomePage;
  const { userIdSelected } = useContext(Context).globalAdminPage;

  function handleOpenDialogDelete(id) {
    if (actualPage === "home") {
      userIdSelected.current = null;
      appointmentIdSelected.current = id;
    } else if (actualPage === "admin") {
      userIdSelected.current = id;
      appointmentIdSelected.current = null;
    }
    document.documentElement.classList.add("overflow-hidden");
    dialogDelete.current.showModal();
  }

  function handleCloseDialogDelete() {
    document.documentElement.classList.remove("overflow-hidden");
    dialogDelete.current.close();
    appointmentIdSelected.current = null;
    appointmentIdSelected.current = null;
  }

  return {
    dialogDelete,
    handleCloseDialogDelete,
    handleOpenDialogDelete,
  };
}
