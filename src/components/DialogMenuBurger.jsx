import iconUsersLight from "../assets/icons/toggleIcons/icon-users-light-25.png";
import iconUsersDark from "../assets/icons/toggleIcons/icon-users-dark-25.png";
import iconMoon from "../assets/icons/toggleIcons/icon-moon-48.png";
import iconSun from "../assets/icons/toggleIcons/icon-sun-48.png";
import iconLanguageLight from "../assets/icons/toggleIcons/icon-language-light-25.png";
import iconLanguageDark from "../assets/icons/toggleIcons/icon-language-dark-25.png";
import iconLogout from "../assets/icons/toggleIcons/icon-logout-25.png";
import { useContext } from "react";
import { Context } from "../ContextProvider";

export default function DialogMenuBurger({ ref, onClose }) {
  const { theme, handleTheme } = useContext(Context).globalThemeState;
  const { admin } = useContext(Context);
  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onBlur={onClose}
      className="backdrop:bg-transparent"
    >
      {admin && (
        <img
          src={theme === "dark" ? iconUsersDark : iconUsersLight}
          alt="users icon"
        />
      )}
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
      <img
        src={theme === "dark" ? iconLanguageDark : iconLanguageLight}
        alt="change language icon"
      />
      <img src={iconLogout} alt="logout icon" />
    </dialog>
  );
}
