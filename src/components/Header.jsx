import iconMoon from "../assets/icons/toggleIcons/icon-moon-48.png";
import iconSun from "../assets/icons/toggleIcons/icon-sun-48.png";
import title from "../assets/titleLogo.png";
import { useContext } from "react";
import { Context } from "../ContextProvider.jsx";
import HeaderBurger from "./HeaderBurger.jsx";
export default function Header() {
  const { theme, handleTheme } = useContext(Context).globalThemeState;
  return (
    <header className="p-2 bg-secondaryBgLight dark:bg-secondaryBgDark  flex flex-wrap justify-around items-center  inset-shadow-[-3px_-3px_20px] dark:inset-shadow-primaryBgDark/50 inset-shadow-primaryBgLight/50">
      <img
        src={title}
        alt="title Appointment List"
        className="w-lg lg:w-3xl "
      />
      <div
        className="bg-bgCardLight dark:bg-bgCardDark w-[104px] rounded-4xl m-4 p-[2px] shadow-md shadow-bgCardDark/30 dark:shadow-bgCardLight/30 hover:drop-shadow-[0_0_5px_white] cursor-pointer"
        onClick={handleTheme}
      >
        <img
          src={theme === "dark" ? iconMoon : iconSun}
          className={`
            w-[50px] ${
              theme === "dark" ? "translate-x-[52px]" : "translate-x-0"
            } transition-transform duration-300`}
          alt="switch color icon"
        />
      </div>
      <HeaderBurger />
    </header>
  );
}
