import Header from "../Header.jsx";
import TopAdminPage from "../TopAdminPage.jsx";
import UsersList from "../lists/UsersList.jsx";

export default function AdminPage() {
  return (
    <>
      <div id="modal"></div>
      <Header />
      <main>
        <TopAdminPage />
        <UsersList />
      </main>
    </>
  );
}
