import AppointmentList from "../lists/AppointmentList.jsx";
import ModalAppointment from "../modal/ModalAppointment.jsx";
import Header from "../Header.jsx";
import TopMain from "../TopMain.jsx";
import ModalAlert from "../modal/ModalAlert.jsx";
import { useContext } from "react";
import { Context } from "../../ContextProvider.jsx";
import { useTranslation } from "react-i18next";

export default function HomePage() {
  const { t } = useTranslation();
  const { alertState, userState, usersList } =
    useContext(Context).globalProjectState;
  return (
    <>
      <ModalAlert className={`${alertState ? "visible" : "invisible"}`}>
        {t("You need to login").toUpperCase()}
      </ModalAlert>
      <div id="modal"></div>

      <ModalAppointment />
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
