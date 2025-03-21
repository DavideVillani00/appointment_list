import { useEffect, useState } from "react";
import AppointmentList from "./components/AppointmentList.jsx";
import DialogNew from "./components/DialogNew.jsx";
import Header from "./components/Header.jsx";
import TopMain from "./components/TopMain.jsx";

function handleTheme() {
  let theme = localStorage.getItem("theme");

  if (theme === "light") {
    localStorage.setItem("theme", "dark");
    document.documentElement.classList.add("dark");
  } else {
    localStorage.setItem("theme", "light");
    document.documentElement.classList.remove("dark");
  }
}

function App() {
  useEffect(() => {
    if (!localStorage.getItem("theme")) {
      localStorage.setItem("theme", "light");
    }
    handleTheme();
  }, []);
  return (
    <>
      {/* <DialogNew /> */}
      <Header handleTheme={handleTheme} />
      <main>
        <TopMain />
        <AppointmentList></AppointmentList>
      </main>
    </>
  );
}

export default App;
