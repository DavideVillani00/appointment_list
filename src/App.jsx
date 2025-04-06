import AppointmentList from "./components/AppointmentList.jsx";
import DialogNew from "./components/DialogNew.jsx";
import Header from "./components/Header.jsx";
import TopMain from "./components/TopMain.jsx";
import useAsideEffect from "./hooks/useAsideEffect.js";

function App() {
  useAsideEffect();
  return (
    <>
      <div id="modal"></div>
      <DialogNew />
      <Header />
      <main className="p-2 md:p-4 lg:p-6">
        <TopMain />
        <AppointmentList></AppointmentList>
      </main>
    </>
  );
}

export default App;
