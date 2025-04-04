import iconUsersLight from "../assets/icons/toggleIcons/icon-users-light-25.png";
import iconUsersDark from "../assets/icons/toggleIcons/icon-users-dark-25.png";
import iconMoon from "../assets/icons/toggleIcons/icon-moon-48.png";
import iconSun from "../assets/icons/toggleIcons/icon-sun-48.png";
import iconLanguageLight from "../assets/icons/toggleIcons/icon-language-light-25.png";
import iconLanguageDark from "../assets/icons/toggleIcons/icon-language-dark-25.png";
import iconLogout from "../assets/icons/toggleIcons/icon-logout-25.png";
import { useContext } from "react";
import { Context } from "../ContextProvider";

export default function DialogMenuBurger({ isOpen }) {
  const { theme, handleTheme } = useContext(Context).globalThemeState;
  const { admin } = useContext(Context);

  return (
    <div
      className={`flex flex-col justify-center items-center bg-bgInputLight dark:bg-bgInputDark p-5 rounded-md gap-4 w-60 absolute top-16 right-[-88px] @min-[600px]:right-[32px]  z-10 border-2 origin-top @min-[600px]:origin-top-right ${
        isOpen ? "scale-100" : "scale-0"
      } transition-transform duration-150`}
    >
      {admin && (
        <>
          <img
            src={theme === "dark" ? iconUsersDark : iconUsersLight}
            alt="users icon"
            className="w-12"
          />
          <span className="w-full h-0.5 bg-black dark:bg-white"></span>
        </>
      )}

      <div
        className="bg-bgCardLight dark:bg-bgCardDark w-[104px] rounded-4xl  p-[2px] shadow-md shadow-bgCardDark/30 dark:shadow-bgCardLight/30 hover:drop-shadow-[0_0_5px_white] cursor-pointer"
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
      <span className="w-full h-0.5 bg-black dark:bg-white"></span>
      <img
        src={theme === "dark" ? iconLanguageDark : iconLanguageLight}
        alt="change language icon"
        className="w-12"
      />
      <span className="w-full h-0.5 bg-black dark:bg-white"></span>
      <img src={iconLogout} alt="logout icon" className="w-12" />
    </div>
  );
}
