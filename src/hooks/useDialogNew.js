import { useContext, useRef, useState } from "react";
import { Context } from "../ContextProvider.jsx";

const FORMATTED_INPUT = {
  date: "yyyy-mm-dd",
  time: "--:--",
  text: "",
};

export default function useDialogNew() {
  const { userState } = useContext(Context).globalProjectState;
  const { setInputState, inputState, isEdit, setIsEdit } = useContext(Context);
  // const [oldDate, setOldDate] = useState(null);
  const oldDate = useRef();
  const { dialog } = useContext(Context);
  const { handleChangeFilters } = useContext(Context);

  function handleOpenDialog(appId = null) {
    if (appId) {
      getAppointmentByid(appId);
    }
    dialog.current.showModal();
    document.documentElement.classList.add("overflow-hidden");
  }

  async function getAppointmentByid(idRef) {
    setIsEdit(true);
    try {
      const response = await fetch(
        `http://localhost:3000/api/appointments/search/${idRef}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );
      const data = await response.json();
      if (response.ok) {
        setInputState({
          id: data.id,
          userName: data.userName,
          inputName: {
            value: data.title,
            err: false,
          },
          inputDate: {
            value: data.date,
            err: false,
          },
          inputTime: {
            value: data.time,
            err: false,
          },
        });
        oldDate.current = new Date(`${data.date}T${data.time}`).getTime();
        console.log(oldDate);
      }
    } catch (err) {
      console.error("Error in fetch:", err);
    }
  }

  function handleCloseModal() {
    setIsEdit(false);
    oldDate.current = null;
    setInputState({
      id: null,
      userName: userState.userName,
      inputName: { value: FORMATTED_INPUT.text, err: false },
      inputDate: { value: FORMATTED_INPUT.date, err: false },
      inputTime: { value: FORMATTED_INPUT.time, err: false },
    });
    dialog.current.close();
    document.documentElement.classList.remove("overflow-hidden");
  }

  function handleChangeInput(first, second = null, third = null) {
    let name;
    let value;
    if (second === null) {
      name = first.target.name;
      value = first.target.value;
      value = value ? value : FORMATTED_INPUT[first.target.type];
    } else {
      name = first;
      value = second;
      value = value ? value : FORMATTED_INPUT[first];
    }

    if (third === "select-one") {
      setInputState((preState) => {
        return { ...preState, userName: value };
      });
      return;
    }
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

    let err = false;
    if (!name) {
      HandleChangeErr("inputName");
      err = true;
      console.log("err name");
    }
    if (isEdit) {
      console.log(oldDate);
      if (!date || impostedDate < oldDate.current || year > 2200) {
        HandleChangeErr("inputDate");
        err = true;
        console.log("err date edit");
      }
      if (!time || impostedDate < oldDate.current) {
        HandleChangeErr("inputTime");
        err = true;
        console.log("err time edit");
      }
    } else {
      if (!date || impostedDate < actualDate || year > 2200) {
        HandleChangeErr("inputDate");
        err = true;
        console.log("err date");
      }
      if (!time || impostedDate < actualDate) {
        HandleChangeErr("inputTime");
        err = true;
        console.log("err time");
      }
    }

    if (err) return;

    handlePushAppointment({
      id: inputState.id,
      userName: inputState.userName || userState.userName,
      date: inputState.inputDate.value,
      time: inputState.inputTime.value,
      title: inputState.inputName.value.trim(),
    });
    handleCloseModal();
  }

  async function handlePushAppointment(obj) {
    console.log(obj);
    try {
      console.log("obj", isEdit);
      const url = isEdit
        ? "http://localhost:3000/api/appointments/edit"
        : "http://localhost:3000/api/appointments/add";
      const method = isEdit ? "PUT" : "POST";
      console.log(url);
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(obj),
      });
      const data = await response.json();
      if (response.ok) {
        setIsEdit(false);
        handleChangeFilters();
      }
    } catch (err) {
      console.error("Error in fetch:", err);
    }
  }

  return {
    handleOpenDialog,
    handleCloseModal,
    handleAddButton,
    handleChangeInput,
    inputState,
    FORMATTED_INPUT,
    getAppointmentByid,
  };
}
