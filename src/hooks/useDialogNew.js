import { useContext } from "react";
import { Context } from "../ContextProvider.jsx";

export default function useDialogNew(inputName, inputDate, inputTime) {
  const { dialog } = useContext(Context);
  const { handleAddAppointment } = useContext(Context).globalProjectState;

  function handleOpenDialog() {
    dialog.current.showModal();
    document.documentElement.classList.add("overflow-hidden");
  }

  function handleCloseModal() {
    dialog.current.close();
    document.documentElement.classList.remove("overflow-hidden");
    inputName.current.classList.remove("border-2", "border-red-700");
    inputDate.current.classList.remove("border-2", "border-red-700");
    inputTime.current.classList.remove("border-2", "border-red-700");
    inputName.current.value = "";
    inputDate.current.value = "";
    inputTime.current.value = "";
  }

  function handleAddButton() {
    const name = inputName.current.value.trim();
    const date = inputDate.current.value;
    const time = inputTime.current.value;
    const actualDate = new Date().getTime();
    const impostedDate = new Date([date, time].join(" ")).getTime();

    if (!name) {
      inputName.current.classList.add("border-2", "border-red-700");
    }
    if (!date || impostedDate < actualDate) {
      inputDate.current.classList.add("border-2", "border-red-700");
    }
    if (!time || impostedDate < actualDate) {
      inputTime.current.classList.add("border-2", "border-red-700");
    }
    if (!name || !date || !time || impostedDate < actualDate) {
      return;
    }
    handleAddAppointment(name, date, time, impostedDate);
    handleCloseModal();
  }

  function handleDeleteErr(el) {
    el.target.classList.remove("border-2", "border-red-700");
  }

  return {
    handleOpenDialog,
    handleCloseModal,
    handleAddButton,
    handleDeleteErr,
  };
}
