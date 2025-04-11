import AppointmentList from "../lists/AppointmentList.jsx";
import DialogNew from "../modal/DialogNew.jsx";
import Header from "../Header.jsx";
import TopMain from "../TopMain.jsx";
import DialogAlert from "../modal/DialogAlert.jsx";
import { useContext } from "react";
import { Context } from "../../ContextProvider.jsx";

export default function HomePage() {
  const { alertState } = useContext(Context);

  return (
    <>
      <DialogAlert className={`${alertState ? "visible" : "invisible"}`}>
        YOU NEED TO LOGIN
      </DialogAlert>
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
