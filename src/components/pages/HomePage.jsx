import AppointmentList from "../lists/AppointmentList.jsx";
import DialogNew from "../modal/DialogNew.jsx";
import Header from "../Header.jsx";
import TopMain from "../TopMain.jsx";
export default function HomePage() {
  return (
    <>
      <div id="modal"></div>
      <DialogNew />
      <Header />
      <h1 className="text-3xl font-extrabold text-center">HOME PAGE</h1>
      <main>
        <TopMain />
        <AppointmentList></AppointmentList>
      </main>
    </>
  );
}
