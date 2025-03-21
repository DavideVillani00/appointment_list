import iconMoon from "../assets/icon-moon-48.png";
import iconSun from "../assets/icon-sun-48.png";
export default function Header({ handleTheme }) {
  return (
    <header className="p-4 bg-secondaryBgLight dark:bg-secondaryBgDark h-24 flex justify-between items-center">
      <h1 className="text-3xl font-bold">APPOINTMENT LIST</h1>
      <img
        src={iconSun}
        onClick={handleTheme}
        className="dark:hidden hover:drop-shadow-[0_0_5px_black] w-[60px]"
      />
      <img
        src={iconMoon}
        onClick={handleTheme}
        className="hidden dark:inline-block hover:drop-shadow-[0_0_5px_white]  w-[60px]"
      />
    </header>
  );
}
