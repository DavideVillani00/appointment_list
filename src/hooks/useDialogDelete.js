import { useContext } from "react";

import { Context } from "../ContextProvider.jsx";
export default function useDialogDelete() {
  const { setSelectedId } = useContext(Context).globalProjectState;
  const { dialogDelete } = useContext(Context);

  function handleOpenDialogDelete(id) {
    console.log("dialog", dialogDelete.current);
    document.documentElement.classList.add("overflow-hidden");
    dialogDelete.current.showModal();
    setSelectedId(id);
  }

  function handleCloseDialogDelete() {
    document.documentElement.classList.remove("overflow-hidden");
    dialogDelete.current.close();
  }

  return {
    dialogDelete,
    handleCloseDialogDelete,
    handleOpenDialogDelete,
  };
}
