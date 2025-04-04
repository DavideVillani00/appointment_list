import { useContext } from "react";
import { createPortal } from "react-dom";
import Input from "./elements/Input.jsx";
import { Context } from "../ContextProvider.jsx";
import useDialogDelete from "../hooks/useDialogDelete.js";
import iconDelete from "../assets/icons/toggleIcons/icon-delete-25.png";

export default function DialogDelete() {
  const { handleDeleteAppointment } = useContext(Context).globalProjectState;
  const { dialogDelete, handleCloseDialogDelete } = useDialogDelete();
  const modalRoot = document.getElementById("modal");
  if (!modalRoot) return null;
  return createPortal(
    <dialog
      ref={dialogDelete}
      onClose={handleCloseDialogDelete}
      className=" p-5 md:p-10 rounded-2xl place-self-center w-10/12 md:w-3xl md:items-center backdrop:backdrop-blur-xs  bg-bgCardLight dark:bg-bgCardDark shadow-[0_0_20px] shadow-red-700 inset-shadow-[-3px_-3px_20px] dark:inset-shadow-secondaryBgDark inset-shadow-secondaryBgLight text-textLight dark:text-textDark"
    >
      <div className="flex flex-col gap-10 place-self-center">
        <h1 className="text-2xl text-center font-bold leading-12">
          Are you sure you want to delete the appointment?
        </h1>
        <div className="flex flex-col gap-3 md:flex-row justify-center ">
          <Input
            type="button"
            value="No"
            onClick={handleCloseDialogDelete}
            classContainer="flex-2/3"
          />
          <Input
            type="button"
            value="DELETE"
            img={iconDelete}
            classImg="w-[27px]"
            alt="delete icon"
            classInput="text-[#D40000] font-bold bg-red-300/65 dark:bg-red-300/65 inset-shadow-[0px_0px_10px] inset-shadow-red-900 "
            classContainer="flex-1/3"
            onClick={() => {
              handleDeleteAppointment();
              handleCloseDialogDelete();
            }}
          />
        </div>
      </div>
    </dialog>,
    modalRoot
  );
}
