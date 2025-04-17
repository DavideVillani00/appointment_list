import iconDelete from "../../assets/icons/toggleIcons/icon-delete-27.png";

import { useContext } from "react";
import { createPortal } from "react-dom";
import { Context } from "../../ContextProvider.jsx";
import useDialogDelete from "../../hooks/useDialogDelete.js";
import Button from "../elements/Button.jsx";
import useHandleToggleButton from "../../hooks/useHandleToggleButton.js";
import { useTranslation } from "react-i18next";

export default function DialogDelete() {
  const { actualPage } = useContext(Context).globalProjectState;
  const { handleDelete } = useHandleToggleButton();
  const { dialogDelete, handleCloseDialogDelete } = useDialogDelete();
  const { t } = useTranslation();

  const modalRoot = document.getElementById("modal");
  if (!modalRoot) return null;
  return createPortal(
    <dialog
      ref={dialogDelete}
      onClose={handleCloseDialogDelete}
      className=" p-5 md:p-10 rounded-2xl place-self-center w-10/12 md:w-3xl md:items-center backdrop:backdrop-blur-xs border-4 cardModalStyle"
    >
      <div className="flex flex-col gap-10 place-self-center">
        <h1 className="text-2xl text-center font-bold leading-12 text-text1 dark:text-text1Dark">
          {actualPage === "home"
            ? t("Are you sure you want to delete this appointment?")
            : t("Are you sure you want to delete this user?")}
          ?
        </h1>
        <div className="flex flex-col gap-3 md:flex-row justify-center ">
          <Button
            className=" flex-2/3 primaryBtn w-full p-4 rounded-md"
            onClick={handleCloseDialogDelete}
          >
            {t("No").toUpperCase()}
          </Button>
          <Button
            img={iconDelete}
            alt="delete icon"
            className="flex-1/3 deleteBtn w-full p-4 rounded-md"
            onClick={() => {
              handleDelete();
              handleCloseDialogDelete();
            }}
          >
            {t("Delete").toUpperCase()}
          </Button>
        </div>
      </div>
    </dialog>,
    modalRoot
  );
}
