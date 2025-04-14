import { useContext, useRef, useState } from "react";
import { Context } from "../ContextProvider.jsx";

const FORMATTED_INPUT = {
  date: "yyyy-mm-dd",
  time: "--:--",
  text: "",
};

// !!!c'è un problema con gli stati che si accavallano nel backend

export default function useDialogNew() {
  const { userState } = useContext(Context).globalProjectState;
  const { setInputState, inputState, isEdit, setIsEdit } = useContext(Context);
  const [oldDate, setOldDate] = useState(null);
  const { dialog } = useContext(Context);
  const { handleChangeFilters } = useContext(Context);

  function handleOpenDialog(appId = null) {
    if (appId) {
      getAppointmentByid(appId);
    }
    dialog.current.showModal();
    document.documentElement.classList.add("overflow-hidden");
  }

  async function getAppointmentByid(idRef, check = null) {
    setIsEdit(true);
    try {
      const response = await fetch(
        `http://localhost:3000/api/appointments/search?id=${idRef}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );
      const data = await response.json();
      if (response.ok) {
        if (typeof check === "boolean") {
          console.log(data);
          let checkEdit = data.check === true ? false : true;
          return handlePushAppointment({ id: data.id, check: checkEdit });
        }
        console.log("fallito");
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
        setOldDate(new Date(`${data.date}T${data.time}`).getTime());
      }
    } catch (err) {
      console.error("Error in fetch:", err);
    }
  }

  function handleCloseModal() {
    setIsEdit(false);
    setOldDate(null);
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
    console.log(first, second, third);
    let name;
    let value;
    if (second === null) {
      name = first.target.name;
      value = first.target.value;
    } else {
      name = first;
      value = second;
    }
    // let { name, value } = e.target;
    value = value ? value : FORMATTED_INPUT[first.target.type];

    if (third === "select-one") {
      console.log("ciao");
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
      if (!date || impostedDate < oldDate || year > 2200) {
        HandleChangeErr("inputDate");
        err = true;
        console.log("err date edit");
      }
      if (!time || impostedDate < oldDate) {
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
      userName: inputState.userName,
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
      console.log(url);
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(obj),
      });
      const data = await response.json();
      setIsEdit(false);
      handleChangeFilters();
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
