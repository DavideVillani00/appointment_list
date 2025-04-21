import iconUsersLight from "../../assets/icons/toggleIcons/icon-users-light-48.png";
import iconUsersDark from "../../assets/icons/toggleIcons/icon-users-dark-48.png";
import iconMoon from "../../assets/icons/toggleIcons/icon-moon-48.png";
import iconSun from "../../assets/icons/toggleIcons/icon-sun-48.png";
import iconLanguageLight from "../../assets/icons/toggleIcons/icon-language-light-48.png";
import iconLanguageDark from "../../assets/icons/toggleIcons/icon-language-dark-48.png";
import iconLogoutLight from "../../assets/icons/toggleIcons/icon-logout-light-48.png";
import iconLogoutDark from "../../assets/icons/toggleIcons/icon-logout-dark-48.png";
import iconHomeLight from "../../assets/icons/toggleIcons/icon-home-light-27.png";
import iconHomeDark from "../../assets/icons/toggleIcons/icon-home-dark-27.png";

import { useContext, useEffect, useState, useRef } from "react";
import { Context } from "../../ContextProvider";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import i18next from "i18next";

export default function ModalMenuBurger({ isOpen }) {
  const { theme, handleTheme } = useContext(Context).globalThemeState;
  const { userState, actualPage } = useContext(Context).globalProjectState;
  // const [handleLanguage, setHandleLanguage] = useState(null);
  const languageRef = useRef(i18next.language);

  const { handleLogout } = useAuth();

  function handleChangeLanguage() {
    // setHandleLanguage((prev) => (prev === "en" ? "it" : "en"));
    if (languageRef.current === "en") {
      languageRef.current = "it";
    } else if (languageRef.current === "it") {
      languageRef.current = "en";
    }

    i18next.changeLanguage(languageRef.current);
  }

  return (
    <div
      className={`cardModalStyle flex flex-col justify-center items-center p-2 rounded-md gap-2 w-60 absolute top-11 right-[-88px] md:right-[32px] md:rounded-tr-none z-20 origin-top md:origin-top-right ${
        isOpen ? "scale-100" : "scale-0"
      } transition-transform duration-150`}
    >
      {userState && userState.role === "Admin" && (
        <>
          <Link
            to={actualPage === "home" ? "/admin" : "/"}
            className="bg-bg dark:bg-bgDark hover:bg-bg2 dark:hover:bg-bg2Dark w-full p-4 rounded-lg flex justify-center  "
          >
            <img
              src={
                theme === "dark"
                  ? actualPage === "home"
                    ? iconUsersDark
                    : iconHomeDark
                  : actualPage === "home"
                  ? iconUsersLight
                  : iconHomeLight
              }
              alt="users icon"
              className="w-12 "
            />
          </Link>
          <span className="w-full h-0.5 bg-divider dark:bg-dividerDark"></span>
        </>
      )}
      <div
        onClick={handleTheme}
        className="bg-bg dark:bg-bgDark hover:bg-bg2 dark:hover:bg-bg2Dark w-full p-4 rounded-lg flex justify-center cursor-pointer"
      >
        <img
          src={theme === "dark" ? iconMoon : iconSun}
          alt="switch color icon"
          className={`${
            theme === "dark" ? "rotate-0 w-12" : "rotate-180 w-[50px]"
          } transition-transform duration-200  `}
        />
      </div>
      <span className="w-full h-0.5 bg-divider dark:bg-dividerDark"></span>
      <div
        onClick={handleChangeLanguage}
        className="bg-bg dark:bg-bgDark hover:bg-bg2 dark:hover:bg-bg2Dark w-full p-4 rounded-lg  flex justify-center items-center gap-2 cursor-pointer"
      >
        <span className="text-lg">{languageRef.current.toUpperCase()}</span>
        <img
          src={theme === "dark" ? iconLanguageDark : iconLanguageLight}
          alt="change language icon"
          className={`w-12  ${
            languageRef.current === "en" ? "rotate-360 " : "rotate-0 "
          } transition-transform duration-200`}
        />
      </div>
      {userState && (
        <>
          <span className="w-full h-0.5 bg-divider dark:bg-dividerDark"></span>
          <div
            onClick={handleLogout}
            className="bg-bg dark:bg-bgDark hover:bg-bg2 dark:hover:bg-bg2Dark w-full p-4 rounded-lg flex justify-center cursor-pointer"
          >
            <img
              src={theme === "dark" ? iconLogoutDark : iconLogoutLight}
              alt="logout icon"
              className="w-12 "
            />
          </div>
        </>
      )}
    </div>
  );
}
