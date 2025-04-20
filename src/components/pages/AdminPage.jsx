import { useContext } from "react";
import Header from "../Header.jsx";
import TopAdminPage from "../TopAdminPage.jsx";
import UsersList from "../lists/UsersList.jsx";
import { Context } from "../../ContextProvider.jsx";
import ModalUser from "../modal/ModalUser.jsx";
import { useTranslation } from "react-i18next";
import ModalAlert from "../modal/ModalAlert.jsx";

export default function AdminPage() {
  const { userState, alertState } = useContext(Context).globalProjectState;
  const { t } = useTranslation();

  if (userState.role !== "Admin") return null;

  return (
    <>
      <div id="modal"></div>
      <ModalAlert className={`${alertState ? "visible" : "invisible"}`}>
        {t("You need to login").toUpperCase()}
      </ModalAlert>
      <ModalUser />
      <Header />
      <h1 className="text-3xl font-extrabold text-center">
        {t("Subscribers").toUpperCase()}
      </h1>
      <main>
        <TopAdminPage />
        <UsersList />
      </main>
    </>
  );
}
