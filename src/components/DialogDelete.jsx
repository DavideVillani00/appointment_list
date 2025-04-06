import { useContext } from "react";
import { createPortal } from "react-dom";
import { Context } from "../ContextProvider.jsx";
import useDialogDelete from "../hooks/useDialogDelete.js";
import iconDelete from "../assets/icons/toggleIcons/icon-delete-25.png";
import Button from "./elements/Button.jsx";

export default function DialogDelete() {
  const { handleDeleteAppointment } = useContext(Context).globalProjectState;
  const { dialogDelete, handleCloseDialogDelete } = useDialogDelete();
  const modalRoot = document.getElementById("modal");
  if (!modalRoot) return null;
  return createPortal(
    <dialog
      ref={dialogDelete}
      onClose={handleCloseDialogDelete}
      className=" p-5 md:p-10 rounded-2xl place-self-center w-10/12 md:w-3xl md:items-center backdrop:backdrop-blur-xs border-2 cardModalStyle"
    >
      <div className="flex flex-col gap-10 place-self-center">
        <h1 className="text-2xl text-center font-bold leading-12">
          Are you sure you want to delete the appointment?
        </h1>
        <div className="flex flex-col gap-3 md:flex-row justify-center ">
          <Button
            className=" flex-2/3 primaryBtn w-full p-4 rounded-md"
            onClick={handleCloseDialogDelete}
          >
            NO
          </Button>
          <Button
            img={iconDelete}
            alt="delete icon"
            className="flex-1/3 deleteBtn w-full p-4 rounded-md"
            onClick={() => {
              handleDeleteAppointment();
              handleCloseDialogDelete();
            }}
          >
            DELETE
          </Button>
        </div>
      </div>
    </dialog>,
    modalRoot
  );
}
