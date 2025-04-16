import { createContext, useRef } from "react";
import useProjectState from "./hooks/globalState/useProjectState.js";
import useThemeState from "./hooks/globalState/useThemeState.js";

import useAdminPage from "./hooks/globalState/useAdminPage.js";
import useHomePage from "./hooks/globalState/useHomePage.js";
import useLoginSignupPage from "./hooks/globalState/useLoginSignupPage.js";

export const Context = createContext({
  globalProjectState: () => {}, //! da cancellare
  globalThemeState: () => {},

  globalAdminPage: () => {},
  globalHomePage: () => {},

  // alertState: false,
  // setAlertState: () => {},

  dialogDelete: () => {},
  actualPage: null,
});

export default function ContextProvider({ children }) {
  // const [alertState, setAlertState] = useState(false);
  const globalProjectState = useProjectState(); //!
  const globalThemeState = useThemeState();

  const globalAdminPage = useAdminPage();
  const globalHomePage = useHomePage();
  const globalLoginSignupPage = useLoginSignupPage();

  const dialogDelete = useRef();
  // const [actualPage, setActualPage] = useState(null);

  const contValue = {
    globalProjectState, //!
    globalThemeState,

    globalAdminPage,
    globalHomePage,
    globalLoginSignupPage,

    // alertState,
    // setAlertState,

    dialogDelete,
    // actualPage,
    // setActualPage,
  };
  return <Context.Provider value={contValue}>{children}</Context.Provider>;
}
