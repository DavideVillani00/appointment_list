import AppointmentList from "./components/AppointmentList.jsx";
import DialogNew from "./components/DialogNew.jsx";
import Header from "./components/Header.jsx";
import TopMain from "./components/TopMain.jsx";

function App() {
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

export default App;
