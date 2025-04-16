import { useContext, useEffect, useRef, useState } from "react";

const FORMATTED_INPUT = {
  date: "yyyy-mm-dd",
  time: "--:--",
};
const INPUT_STATE_DEFAULT = {
  id: { value: null, err: false },
  title: { value: "", err: false },
  userName: { value: "", err: false },
  date: { value: FORMATTED_INPUT.date, err: false },
  time: { value: FORMATTED_INPUT.time, err: false },
  oldDateTimeStamp: null,
};

export default function useHomePage() {
  const [isEdit, setIsEdit] = useState(false);
  const dialogAppointment = useRef(null);
  const appointmentIdSelected = useRef(null);

  const [inputHomeState, setInputHomeState] = useState(INPUT_STATE_DEFAULT);
  const [homeFilter, setHomeFilter] = useState({
    title: "",
    date: FORMATTED_INPUT.date,
    userName: null,
    check: null,
  });

  const [filteredAppointmentList, setFilteredAppointmentList] = useState(null);
  const [isLoadingList, setIsLoadingList] = useState(true);

  function resetInputHomeState() {
    setInputHomeState(INPUT_STATE_DEFAULT);
    appointmentIdSelected.current = null;
    setIsEdit(false);
  }

  function handleChangeFilterHome(name, value) {
    value = value === "All" ? null : value;
    value = value === "Completed" ? true : value;
    value = value === "Uncompleted" ? false : value;
    value = name === "date" && value === "" ? FORMATTED_INPUT.date : value;
    setHomeFilter((preState) => {
      return {
        ...preState,
        [name]: value,
      };
    });
  }

  async function uploadAppointmentFiltered() {
    try {
      const obj = {
        title: homeFilter.title === "" ? null : homeFilter.title,
        date: homeFilter.date === FORMATTED_INPUT.date ? null : homeFilter.date,
        userName: homeFilter.userName,
        check: homeFilter.check,
      };
      setIsLoadingList(true);
      const response = await fetch(
        "http://localhost:3000/api/appointments/search",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(obj),
        }
      );
      const data = await response.json();
      if (!response.ok) {
        console.error("Error fetching appointments:", data.msg);
        return setFilteredAppointmentList(data.arr);
      }

      return setFilteredAppointmentList(data);
    } catch (err) {
      console.error("Error in fetch:", err);
    } finally {
      setTimeout(() => {
        setIsLoadingList(false);
      }, 200);
    }
  }

  useEffect(() => {
    uploadAppointmentFiltered();
  }, [homeFilter]);
  return {
    isEdit,
    setIsEdit,
    dialogAppointment,
    appointmentIdSelected,
    inputHomeState,
    setInputHomeState,
    INPUT_STATE_DEFAULT,
    resetInputHomeState,
    handleChangeFilterHome,
    isLoadingList,
    filteredAppointmentList,
    FORMATTED_INPUT,
    homeFilter,
  };
}
