import { useContext, useState } from "react";
import { Context } from "../ContextProvider.jsx";

export default function useDialogNew() {
  const [inputState, setInputState] = useState({
    inputName: { value: "", err: false },
    inputDate: { value: "", err: false },
    inputTime: { value: "", err: false },
  });
  const { dialog } = useContext(Context);
  const { handleAddAppointment } = useContext(Context).globalProjectState;

  function handleOpenDialog() {
    dialog.current.showModal();
    document.documentElement.classList.add("overflow-hidden");
  }

  function handleCloseModal() {
    dialog.current.close();
    document.documentElement.classList.remove("overflow-hidden");
    setInputState({
      inputName: { value: "", err: false },
      inputDate: { value: "", err: false },
      inputTime: { value: "", err: false },
    });
  }

  function handleChangeInput(e) {
    const { name, value } = e.target;
    setInputState((preState) => {
      return {
        ...preState,
        [name]: { value, err: false },
      };
    });
  }

  function HandleChangeErr(name) {
    setInputState((preState) => {
      return {
        ...preState,
        [name]: { ...preState[name], err: true },
      };
    });
  }

  function handleAddButton() {
    const name = inputState.inputName.value.trim();
    const date = inputState.inputDate.value;
    const time = inputState.inputTime.value;
    const actualDate = new Date().getTime();
    const impostedDate = new Date(`${date}T${time}`).getTime();

    console.log(date, time, actualDate, impostedDate);

    if (!name || !date || !time || impostedDate < actualDate) {
      if (!name) {
        HandleChangeErr("inputName");
      }
      if (!date || impostedDate < actualDate) {
        HandleChangeErr("inputDate");
      }
      if (!time || impostedDate < actualDate) {
        HandleChangeErr("inputTime");
      }
      return;
    }
    handleAddAppointment(name, date, time, impostedDate);
    handleCloseModal();
  }

  function handleDeleteErr(el) {
    el.target.classList.remove("border-red-700");
  }

  return {
    handleOpenDialog,
    handleCloseModal,
    handleAddButton,
    handleDeleteErr,
    handleChangeInput,
    inputState,
  };
}
