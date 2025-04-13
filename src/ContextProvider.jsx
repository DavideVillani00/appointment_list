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

  // const globalValue = useGlobalValue();

  // !for debug
  const [info, setInfo] = useState({ admin: true, login: true }); // ! canncel

  const dialog = useRef();
  const dialogDelete = useRef();
  // const [search, setSearch] = useState(""); //!cancellare

  const [filters, setFilters] = useState({
    searchTitle: null,
    date: null,
    userName: null,
    check: null,
  });

  // function handleChangeSearch(e, type) {
  function handleChangeFilters(name, value) {
    console.log(name, value);
    if (value === "Completed") value = true;
    if (value === "Uncompleted") value = false;
    console.log(value);

    // setSearch(e.target.value);
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

    // globalValue,
    alertState,
    setAlertState,

    info,

    dialog,
    dialogDelete,

    // search,
    filters,
    handleChangeFilters,
  };
  return <Context.Provider value={contValue}>{children}</Context.Provider>;
}
