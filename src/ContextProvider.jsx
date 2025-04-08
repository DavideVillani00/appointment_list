import { createContext, useState, useRef } from "react";
import useProjectState from "./hooks/globalState/useProjectState.js";
import useThemeState from "./hooks/globalState/useThemeState.js";

export const Context = createContext({
  globalProjectState: () => {},
  globalThemeState: () => {},
  info: () => {},

  dialog: () => {},
  dialogDelete: () => {},

  search: () => {},
  handleChangeSearch: () => {},
});

export default function ContextProvider({ children }) {
  const globalProjectState = useProjectState();
  const globalThemeState = useThemeState();
  // !for debug
  const [info, setInfo] = useState({ admin: false, login: true });

  const dialog = useRef();
  const dialogDelete = useRef();
  const [search, setSearch] = useState("");

  function handleChangeSearch(e) {
    setSearch(e.target.value);
  }

  const contValue = {
    globalProjectState,
    globalThemeState,
    info,

    dialog,
    dialogDelete,

    search,
    handleChangeSearch,
  };
  return <Context.Provider value={contValue}>{children}</Context.Provider>;
}
