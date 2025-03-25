import Input from "./Input.jsx";
import iconClose from "../assets/icon-close-25.png";
import { useContext, useRef } from "react";
import { Context } from "../ContextProvider.jsx";
import useDialogNew from "../hooks/useDialogNew.js";

export default function DialogNew() {
  const { dialog } = useContext(Context);
  const inputName = useRef();
  const inputDate = useRef();
  const inputTime = useRef();
  const { handleAddButton, handleCloseModal, handleDeleteErr } = useDialogNew(
    inputName,
    inputDate,
    inputTime
  );

  return (
    <dialog
      ref={dialog}
      className="w-full h-full max-w-none max-h-none bg-black/10 text-textLight dark:text-textDark backdrop-blur-xs z-10 "
    >
      <div className="bg-bgCardLight dark:bg-bgCardDark w-5/6 p-4 md:p-8 rounded-2xl fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="flex justify-between items-center px-4">
          <h1 className="text-3xl font-bold">NEW</h1>
          <img
            src={iconClose}
            className="w-10 hover:drop-shadow-[0_0_5px_red] "
            onClick={handleCloseModal}
          />
        </div>
        <hr className="my-7" />
        <form className="flex flex-col gap-4 md:p-4">
          <Input
            type="text"
            placeholder="Inserisci un nome"
            ref={inputName}
            onClick={handleDeleteErr}
          />
          <div className="flex flex-col gap-4 md:flex-row">
            <Input
              type="date"
              className="md:flex-1/2"
              ref={inputDate}
              onClick={handleDeleteErr}
            />
            <Input
              type="time"
              className="md:flex-1/2 appearance-none"
              ref={inputTime}
              onClick={handleDeleteErr}
            />
          </div>
          <Input type="button" value="Add +" onClick={handleAddButton} />
        </form>
      </div>
    </dialog>
  );
}
