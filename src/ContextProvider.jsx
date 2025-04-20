import { createContext, useRef } from "react";
import useProjectState from "./hooks/globalState/useProjectState.js";
import useThemeState from "./hooks/globalState/useThemeState.js";

import useAdminPage from "./hooks/globalState/useAdminPage.js";
import useHomePage from "./hooks/globalState/useHomePage.js";
import useLoginSignupPage from "./hooks/globalState/useLoginSignupPage.js";

export const Context = createContext({
  globalProjectState: () => {},
  globalThemeState: () => {},

  globalAdminPage: () => {},
  globalHomePage: () => {},

  modalDelete: () => {},
  actualPage: null,
});

export default function ContextProvider({ children }) {
  const globalProjectState = useProjectState();
  const globalThemeState = useThemeState();

  const globalAdminPage = useAdminPage();
  const globalHomePage = useHomePage();
  const globalLoginSignupPage = useLoginSignupPage();

  const modalDelete = useRef();

  const contValue = {
    globalProjectState,
    globalThemeState,

    globalAdminPage,
    globalHomePage,
    globalLoginSignupPage,

    modalDelete,
  };
  return <Context.Provider value={contValue}>{children}</Context.Provider>;
}
