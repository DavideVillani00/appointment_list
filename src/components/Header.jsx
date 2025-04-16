import titleLight from "../assets/title.png";
import titleDark from "../assets/titleDark.png";

import { useContext } from "react";
import { Context } from "../ContextProvider.jsx";
import HeaderBurger from "./HeaderBurger.jsx";

export default function Header() {
  const { theme } = useContext(Context).globalThemeState;
  return (
    <header className="p-5 flex flex-col items-center md:flex-row md:justify-between gap-5 bg-bg2 dark:bg-bg2Dark mb-5">
      <img
        src={theme === "dark" ? titleDark : titleLight}
        alt="title Appointment List"
        className="w-full max-w-xl"
      />
      <HeaderBurger />
    </header>
  );
}
