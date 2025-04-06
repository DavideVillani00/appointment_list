import iconUsersLight from "../assets/icons/toggleIcons/icon-users-light-48.png";
import iconUsersDark from "../assets/icons/toggleIcons/icon-users-dark-48.png";
import iconMoon from "../assets/icons/toggleIcons/icon-moon-48.png";
import iconSun from "../assets/icons/toggleIcons/icon-sun-48.png";
import iconLanguageLight from "../assets/icons/toggleIcons/icon-language-light-48.png";
import iconLanguageDark from "../assets/icons/toggleIcons/icon-language-dark-48.png";
import iconLogoutLight from "../assets/icons/toggleIcons/icon-logout-light-48.png";
import iconLogoutDark from "../assets/icons/toggleIcons/icon-logout-dark-48.png";

import { useContext } from "react";
import { Context } from "../ContextProvider";

export default function DialogMenuBurger({ isOpen }) {
  const { theme, handleTheme } = useContext(Context).globalThemeState;
  const { admin } = useContext(Context);

  // !! da sistemare tutto
  return (
    <div
      className={`cardModalStyle flex flex-col justify-center items-center p-5 rounded-md gap-4 w-60 absolute top-11 right-[-88px] md:right-[32px] md:rounded-tr-none z-10 origin-top md:origin-top-right ${
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
          <span className="w-full h-0.5 bg-divider dark:bg-dividerDark"></span>
        </>
      )}
      <img
        onClick={handleTheme}
        src={theme === "dark" ? iconMoon : iconSun}
        alt="switch color icon"
        className={`${
          theme === "dark" ? "rotate-0 w-12" : "rotate-180 w-[50px]"
        } transition-transform duration-200`}
      />
      <span className="w-full h-0.5 bg-divider dark:bg-dividerDark"></span>
      <img
        src={theme === "dark" ? iconLanguageDark : iconLanguageLight}
        alt="change language icon"
        className="w-12"
      />
      <span className="w-full h-0.5 bg-divider dark:bg-dividerDark"></span>
      <img
        src={theme === "dark" ? iconLogoutDark : iconLogoutLight}
        alt="logout icon"
        className="w-12"
      />
    </div>
  );
}
