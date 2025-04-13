import { createContext, useState, useRef } from "react";
import useProjectState from "./hooks/globalState/useProjectState.js";
import useThemeState from "./hooks/globalState/useThemeState.js";
import useSignup from "./hooks/useSignup.js";
// import useGlobalValue from "./hooks/globalState/useGlobalValue.js";

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
});

export default function ContextProvider({ children }) {
  const [alertState, setAlertState] = useState(false);
  const globalProjectState = useProjectState();
  const globalThemeState = useThemeState();

  const globalSignupState = useSignup(alertState, setAlertState);

  // !for debug
  const [info, setInfo] = useState({ admin: true, login: true }); // ! canncel

  const dialog = useRef();
  const dialogDelete = useRef();

  const [filters, setFilters] = useState({
    searchTitle: null,
    date: null,
    userName: null,
    check: null,
  });

  function handleChangeFilters(name, value) {
    if (value === "Completed") value = true;
    if (value === "Uncompleted") value = false;

    setFilters((preState) => {
      console.log("name", name, "value", value);

      return {
        ...preState,
        [name]: value,
      };
    });
    console.log("filters", filters);
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
  };
  return <Context.Provider value={contValue}>{children}</Context.Provider>;
}
