import { useContext } from "react";
import Header from "../Header.jsx";
import TopAdminPage from "../TopAdminPage.jsx";
import UsersList from "../lists/UsersList.jsx";
import { Context } from "../../ContextProvider.jsx";
import DialogUser from "../modal/DialogUser.jsx";

export default function AdminPage() {
  const { userState } = useContext(Context).globalProjectState;

  if (userState.role !== "Admin") return null;

  return (
    <>
      <div id="modal"></div>
      <DialogUser></DialogUser>
      <Header />
      <h1 className="text-3xl font-extrabold text-center">SUBSCRIBERS</h1>
      <main>
        <TopAdminPage />
        <UsersList />
      </main>
    </>
  );
}
