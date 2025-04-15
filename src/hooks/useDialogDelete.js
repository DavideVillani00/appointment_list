import { useContext, useRef, useState } from "react";

import { Context } from "../ContextProvider.jsx";
export default function useDialogDelete() {
  const { dialogDelete } = useContext(Context);
  const { selectId } = useContext(Context);

  function handleOpenDialogDelete(id) {
    console.log(id);
    selectId.current = id;
    console.log(selectId);
    document.documentElement.classList.add("overflow-hidden");
    dialogDelete.current.showModal();
  }

  function handleCloseDialogDelete() {
    console.log(selectId);
    document.documentElement.classList.remove("overflow-hidden");
    dialogDelete.current.close();
    selectId.current = null;
  }

  return {
    dialogDelete,
    handleCloseDialogDelete,
    handleOpenDialogDelete,
  };
}
