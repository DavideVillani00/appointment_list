import { useRef } from "react";
export default function useDialogDelete() {
  const dialogDelete = useRef();

  function handleOpenDialogDelete() {
    document.documentElement.classList.add("overflow-hidden");
    dialogDelete.current.showModal();
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
