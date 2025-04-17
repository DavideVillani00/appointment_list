import AppointmentList from "../lists/AppointmentList.jsx";
import DialogNew from "../modal/DialogNew.jsx";
import Header from "../Header.jsx";
import TopMain from "../TopMain.jsx";
import DialogAlert from "../modal/DialogAlert.jsx";
import { useContext } from "react";
import { Context } from "../../ContextProvider.jsx";
import { useTranslation } from "react-i18next";

export default function HomePage() {
  const { t } = useTranslation();
  const { alertState, userState, usersList } =
    useContext(Context).globalProjectState;
  return (
    <>
      <DialogAlert className={`${alertState ? "visible" : "invisible"}`}>
        {t("You need to login").toUpperCase()}"
      </DialogAlert>
      <div id="modal"></div>

      <DialogNew />
      <Header />
      <h1 className="text-3xl font-extrabold text-center">
        {t("Homepage").toUpperCase()}
      </h1>
      <main>
        <TopMain />
        <AppointmentList />
      </main>
    </>
  );
}
