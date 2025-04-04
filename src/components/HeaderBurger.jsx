import iconBurgerMenuLight from "../assets/icons/toggleIcons/icon-menu-burger-light-64.png";
import iconBurgerMenuDark from "../assets/icons/toggleIcons/icon-menu-burger-dark-64.png";
import { useContext, useRef } from "react";
import { Context } from "../ContextProvider.jsx";
import DialogMenuBurger from "./DialogMenuBurger.jsx";

export default function HeaderBurger() {
  const dialogMenuBurger = useRef();
  function handleOpen() {
    dialogMenuBurger.current.showModal();
  }
  function handleClose() {
    dialogMenuBurger.current.close();
  }

  const { theme } = useContext(Context).globalThemeState;
  return (
    <>
      <img
        onClick={handleOpen}
        src={theme === "dark" ? iconBurgerMenuDark : iconBurgerMenuLight}
        alt="menu burger icon"
      />
      <DialogMenuBurger ref={dialogMenuBurger} onClose={handleClose} />
    </>
  );
}
