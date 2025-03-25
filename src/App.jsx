import AppointmentList from "./components/AppointmentList.jsx";
import DialogNew from "./components/DialogNew.jsx";
import Header from "./components/Header.jsx";
import TopMain from "./components/TopMain.jsx";
import useAsideEffect from "./hooks/useAsideEffect.js";

function App() {
  useAsideEffect();
  return (
    <>
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
