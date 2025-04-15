import { createContext, useState, useRef } from "react";
import useProjectState from "./hooks/globalState/useProjectState.js";
import useThemeState from "./hooks/globalState/useThemeState.js";
import useSignup from "./hooks/useSignup.js";
// import useGlobalValue from "./hooks/globalState/useGlobalValue.js";
const FORMATTED_INPUT = {
  date: "yyyy-mm-dd",
  time: "--:--",
  text: "",
};

export const Context = createContext({
  globalProjectState: () => {},
  globalThemeState: () => {},
  globalSignupState: () => {},
  info: () => {},

  // globalValue: () => {},
  alertState: false,
  setAlertState: () => {},

  dialog: () => {},
  dialogDelete: () => {},

  search: () => {},
  handleChangeSearch: () => {},

  isEdit: false,
  setIsEdit: () => {},
  inputState: {},
  setInputState: () => {},

  selectedId: null,
});

export default function ContextProvider({ children }) {
  const [alertState, setAlertState] = useState(false);
  const globalProjectState = useProjectState();
  const globalThemeState = useThemeState();

  const globalSignupState = useSignup(alertState, setAlertState);

  // const { userState } = globalProjectState;
  // !for debug
  const [info, setInfo] = useState({ admin: true, login: true }); // ! canncel

  const selectId = useRef(null);

  const [isEdit, setIsEdit] = useState(false);
  const [inputState, setInputState] = useState({
    id: null,
    userName: null,
    inputName: {
      value: FORMATTED_INPUT.text,
      err: false,
    },
    inputDate: {
      value: FORMATTED_INPUT.date,
      err: false,
    },
    inputTime: {
      value: FORMATTED_INPUT.time,
      err: false,
    },
  });

  const dialog = useRef();
  const dialogDelete = useRef();

  const [filters, setFilters] = useState({
    searchTitle: null,
    date: null,
    userName: null,
    check: null,
  });

  function handleChangeFilters(name = null, value = null) {
    if (!name && !value) {
      return setFilters((preState) => {
        return { ...preState };
      });
    }
    if (value === "Completed") value = true;
    if (value === "Uncompleted") value = false;

    setFilters((preState) => {
      return {
        ...preState,
        [name]: value,
      };
    });
  }

  const contValue = {
    globalProjectState,
    globalThemeState,

    globalSignupState,

    alertState,
    setAlertState,

    info,

    dialog,
    dialogDelete,

    filters,
    handleChangeFilters,

    inputState,
    setInputState,
    isEdit,
    setIsEdit,

    selectId,
  };
  return <Context.Provider value={contValue}>{children}</Context.Provider>;
}
