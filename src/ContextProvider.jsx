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
  const [search, setSearch] = useState("");

  function handleChangeSearch(e) {
    setSearch(e.target.value);
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

    search,
    handleChangeSearch,
  };
  return <Context.Provider value={contValue}>{children}</Context.Provider>;
}
