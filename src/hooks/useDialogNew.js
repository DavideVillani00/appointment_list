import { useContext, useState } from "react";
import { Context } from "../ContextProvider.jsx";

const FORMATTED_INPUT = {
  date: "yyyy-mm-dd",
  time: "--:--",
};

export default function useDialogNew() {
  const [inputState, setInputState] = useState({
    inputName: { value: "", err: false },
    inputDate: { value: FORMATTED_INPUT.date, err: false },
    inputTime: { value: FORMATTED_INPUT.time, err: false },
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
      inputDate: { value: FORMATTED_INPUT.date, err: false },
      inputTime: { value: FORMATTED_INPUT.time, err: false },
    });
  }

  function handleChangeInput(e) {
    let { name, value } = e.target;
    value = value ? value : FORMATTED_INPUT[e.target.type];
    console.log(name);
    setInputState((preState) => {
      return {
        ...preState,
        [name]: { value, err: false },
      };
    });
  }

  function HandleChangeErr(name) {
    console.log(name);
    setInputState((preState) => {
      return {
        ...preState,
        [name]: { ...preState[name], err: true },
      };
    });
  }

  function handleAddButton() {
    const name = inputState.inputName.value.trim();
    const date =
      inputState.inputDate.value === FORMATTED_INPUT.date
        ? null
        : inputState.inputDate.value;
    const year = new Date(date).getFullYear();
    const time =
      inputState.inputTime.value === FORMATTED_INPUT.time
        ? null
        : inputState.inputTime.value;

    const actualDate = new Date().getTime();
    const impostedDate = new Date(`${date}T${time}`).getTime();

    console.log(date, time, actualDate, impostedDate, year);

    if (!name || !date || !time || impostedDate < actualDate || year > 2200) {
      if (!name) {
        HandleChangeErr("inputName");
      }
      if (!date || impostedDate < actualDate || year > 2200) {
        console.log("err");
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
    FORMATTED_INPUT,
  };
}
