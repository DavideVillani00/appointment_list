import AppointmentList from "./components/AppointmentList.jsx";
import DialogNew from "./components/DialogNew.jsx";
import Header from "./components/Header.jsx";
import TopMain from "./components/TopMain.jsx";
import ContextProvider from "./ContextProvider.jsx";

function App() {
  return (
    <ContextProvider>
      <DialogNew />
      <Header />
      <main>
        <TopMain />
        <AppointmentList></AppointmentList>
      </main>
    </ContextProvider>
  );
}

export default App;
