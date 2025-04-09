import Header from "../Header.jsx";
import TopAdminPage from "../TopAdminPage.jsx";
import UsersList from "../lists/UsersList.jsx";

export default function AdminPage() {
  return (
    <>
      <div id="modal"></div>
      <Header />
      <h1 className="text-3xl font-extrabold text-center">SUBSCRIBERS</h1>
      <main>
        <TopAdminPage />
        <UsersList />
      </main>
    </>
  );
}
