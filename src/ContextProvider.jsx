import { createContext, useState, useRef } from "react";
import useProjectState from "./hooks/globalState/useProjectState.js";
import useThemeState from "./hooks/globalState/useThemeState.js";
import useSignup from "./hooks/useSignup.js";

export const Context = createContext({
  globalProjectState: () => {},
  globalThemeState: () => {},
  globalSignupState: () => {},
  info: () => {},

  dialog: () => {},
  dialogDelete: () => {},

  search: () => {},
  handleChangeSearch: () => {},
});

export default function ContextProvider({ children }) {
  const globalProjectState = useProjectState();
  const globalThemeState = useThemeState();

  const globalSignupState = useSignup();
  // !for debug
  const [info, setInfo] = useState({ admin: true, login: true });

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

    info,

    dialog,
    dialogDelete,

    search,
    handleChangeSearch,
  };
  return <Context.Provider value={contValue}>{children}</Context.Provider>;
}
