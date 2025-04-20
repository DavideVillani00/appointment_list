import { useContext } from "react";
import { Context } from "../../ContextProvider.jsx";

export default function useModalDelete() {
  const { modalDelete } = useContext(Context);
  const { actualPage } = useContext(Context).globalProjectState;
  const { appointmentIdSelected } = useContext(Context).globalHomePage;
  const { userIdSelected } = useContext(Context).globalAdminPage;

  function handleOpenModalDelete(id) {
    if (actualPage === "home") {
      userIdSelected.current = null;
      appointmentIdSelected.current = id;
    } else if (actualPage === "admin") {
      userIdSelected.current = id;
      appointmentIdSelected.current = null;
    }
    document.documentElement.classList.add("overflow-hidden");
    modalDelete.current.showModal();
  }

  function handleCloseModalDelete() {
    document.documentElement.classList.remove("overflow-hidden");
    modalDelete.current.close();
    appointmentIdSelected.current = null;
    appointmentIdSelected.current = null;
  }

  return {
    modalDelete,
    handleCloseModalDelete,
    handleOpenModalDelete,
  };
}
