import { useContext } from "react";
import Header from "../Header.jsx";
import TopAdminPage from "../TopAdminPage.jsx";
import UsersList from "../lists/UsersList.jsx";
import { Context } from "../../ContextProvider.jsx";
import DialogUser from "../modal/DialogUser.jsx";
import { useTranslation } from "react-i18next";

export default function AdminPage() {
  const { userState } = useContext(Context).globalProjectState;
  const { t } = useTranslation();

  if (userState.role !== "Admin") return null;

  return (
    <>
      <div id="modal"></div>
      <DialogUser></DialogUser>
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
