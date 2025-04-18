import { useContext, useEffect } from "react";
import { Context } from "../../ContextProvider";
import useAuth from "../useAuth";
import { useTranslation } from "react-i18next";

let ERROR_MESSAGES_HOME = [];
export default function useModalAppointment() {
  const { t } = useTranslation();
  const { userState, setAppointmentsList } =
    useContext(Context).globalProjectState;
  const {
    dialogAppointment,
    setIsEdit,
    resetInputHomeState,
    setInputHomeState,
    inputHomeState,
    appointmentIdSelected,
    isEdit,
    FORMATTED_INPUT,
    handleChangeFilterHome,
  } = useContext(Context).globalHomePage;
  const { downloadUsersList } = useAuth();

  function handleOpenModalAppointment(id = null) {
    if (id) {
      appointmentIdSelected.current = id;
      handleUploadAppointmentInfo();
      setIsEdit(true);
    }
    dialogAppointment.current.showModal();
    document.documentElement.classList.add("overflow-hidden");
  }

  function handleCloseModalAppointment() {
    ERROR_MESSAGES_HOME = [];
    resetInputHomeState();
    dialogAppointment.current.close();
    document.documentElement.classList.remove("overflow-hidden");
  }

  function handleChangeInput(e) {
    let { name, value } = e.target;
    value = name === "date" && value === "" ? FORMATTED_INPUT.date : value;
    setInputHomeState((preState) => {
      return {
        ...preState,
        [name]: { value, err: false },
      };
    });
  }

  function handleChangeSelect(name, value) {
    setInputHomeState((preState) => {
      return { ...preState, [name]: { value, err: false } };
    });
  }

  function handleChangeErr(name) {
    setInputHomeState((preState) => {
      return {
        ...preState,
        [name]: { ...preState[name], err: true },
      };
    });
  }

  function handleSendRequest() {
    ERROR_MESSAGES_HOME = [];
    const title = inputHomeState.title.value.trim();
    const userName =
      inputHomeState.userName.value.trim() || userState.userName.trim();
    const date =
      inputHomeState.date.value === FORMATTED_INPUT.date
        ? null
        : inputHomeState.date.value;
    const time =
      inputHomeState.time.value === FORMATTED_INPUT.time
        ? null
        : inputHomeState.time.value;
    const oldDateTimeStamp = inputHomeState.oldDateTimeStamp;
    const maxDateTimeStamp = 4891363200000;
    const actualDateTimeStamp = new Date().getTime();
    const dateSelectedTimeStamp = new Date(`${date}T${time}`).getTime();
    const dateValidation =
      (dateSelectedTimeStamp > actualDateTimeStamp ||
        dateSelectedTimeStamp >= oldDateTimeStamp) &&
      dateSelectedTimeStamp < maxDateTimeStamp;

    let err = false;

    if (!title) {
      handleChangeErr("title");
      err = true;
    }
    if (!userName) {
      handleChangeErr("userName");
      err = true;
    }
    if (!date) {
      handleChangeErr("date");

      err = true;
    }
    if (!time) {
      handleChangeErr("time");
      err = true;
    }
    if (err) ERROR_MESSAGES_HOME.push(t("Enter all fields"));

    if (!dateValidation) {
      handleChangeErr("date");
      handleChangeErr("time");
      err = true;
      ERROR_MESSAGES_HOME.push(t("You cannot select earlier dates"));
    }
    if (err) return;

    handlePushAppointment();
  }

  async function handleUploadAppointmentInfo() {
    try {
      const response = await fetch(
        `http://localhost:3000/api/appointments/search/${appointmentIdSelected.current}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );
      const data = await response.json();
      if (!response.ok) {
        return console.error("Error in fetching appointment:", data.msg);
      }
      const { id, title, userName, date, time } = data;
      setInputHomeState({
        id: { value: id, err: false },
        title: { value: title, err: false },
        userName: { value: userName, err: false },
        date: { value: date, err: false },
        time: { value: time, err: false },
        oldDateTimeStamp: new Date(`${date}T${time}`).getTime(),
      });
    } catch (err) {
      console.error("Error in fetch:", err);
    }
  }

  async function handlePushAppointment() {
    try {
      const obj = {
        id: inputHomeState.id.value,
        userName: inputHomeState.userName.value.trim() || userState.userName,
        title: inputHomeState.title.value.trim(),
        date: inputHomeState.date.value,
        time: inputHomeState.time.value,
      };
      const url = isEdit
        ? "http://localhost:3000/api/appointments/edit"
        : "http://localhost:3000/api/appointments/add";
      const method = isEdit ? "PUT" : "POST";
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(obj),
      });
      const data = await response.json();
      if (!response.ok) {
        handleChangeErr(data.err);
        return console.error(
          "Error in fetching add/edit appointment:",
          data.msg
        );
      }
      handleCloseModalAppointment();
      getAllAppointment();
      downloadUsersList();
      handleChangeFilterHome();
    } catch (err) {
      return console.error("Error in fetch:", err);
    }
  }

  async function getAllAppointment() {
    try {
      const response = await fetch("http://localhost:3000/api/appointments", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      if (response.ok) setAppointmentsList(data);
    } catch (err) {
      console.error("Error in fetch:", err);
    }
  }
  return {
    handleCloseModalAppointment,
    handleOpenModalAppointment,
    handleChangeInput,
    handleChangeSelect,
    handleSendRequest,
    ERROR_MESSAGES_HOME,
    getAllAppointment,
  };
}
