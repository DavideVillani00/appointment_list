import AppointmentList from "../AppointmentList.jsx";
import DialogNew from "../DialogNew.jsx";
import Header from "../Header.jsx";
import TopMain from "../TopMain.jsx";
export default function HomePage() {
  return (
    <>
      <div id="modal"></div>
      <DialogNew />
      <Header />
      <main>
        <TopMain />
        <AppointmentList></AppointmentList>
      </main>
    </>
  );
}
