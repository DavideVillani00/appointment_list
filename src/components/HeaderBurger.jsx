import iconBurgerMenuLight from "../assets/icons/toggleIcons/icon-menu-light-64.png";
import iconBurgerMenuDark from "../assets/icons/toggleIcons/icon-menu-dark-64.png";

import { useContext, useState } from "react";
import { Context } from "../ContextProvider.jsx";
import DialogMenuBurger from "./DialogMenuBurger.jsx";

export default function HeaderBurger() {
  const [isOpen, setIsOpen] = useState(false);

  function handleOpenModal() {
    setIsOpen(true);
  }
  function handleCloseModal() {
    setIsOpen(false);
  }

  const { theme } = useContext(Context).globalThemeState;
  return (
    <>
      {isOpen && (
        <div
          className="absolute  w-full h-full top-0 z-10"
          onClick={handleCloseModal}
        ></div>
      )}
      <div className="relative">
        <img
          onClick={handleOpenModal}
          src={theme === "dark" ? iconBurgerMenuDark : iconBurgerMenuLight}
          alt="menu burger icon"
          className={`${
            isOpen ? "rotate-90" : "rotate-0"
          } transition-transform duration-150`}
        />
        <DialogMenuBurger isOpen={isOpen} onCloseModal={handleCloseModal} />
      </div>
    </>
  );
}
