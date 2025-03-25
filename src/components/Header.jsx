import iconMoon from "../assets/icon-moon-48.png";
import iconSun from "../assets/icon-sun-48.png";
import { useContext } from "react";
import { Context } from "../ContextProvider.jsx";
export default function Header() {
  const { theme, handleTheme } = useContext(Context).globalThemeState;
  return (
    <header className="p-4 bg-secondaryBgLight dark:bg-secondaryBgDark h-24 flex justify-between items-center">
      <h1 className="text-3xl font-bold">APPOINTMENT LIST</h1>
      <img
        src={theme === "dark" ? iconMoon : iconSun}
        onClick={handleTheme}
        className="hover:drop-shadow-[0_0_5px_black] dark:hover:drop-shadow-[0_0_5px_white] w-[60px]"
      />
    </header>
  );
}
