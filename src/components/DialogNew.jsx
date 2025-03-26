import Input from "./Input.jsx";
import iconClose from "../assets/icon-close-25.png";
import { useContext, useRef } from "react";
import { Context } from "../ContextProvider.jsx";
import useDialogNew from "../hooks/useDialogNew.js";

export default function DialogNew() {
  const { dialog } = useContext(Context);

  const { handleAddButton, handleCloseModal, inputState, handleChangeInput } =
    useDialogNew();

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
            className="w-10 hover:drop-shadow-[0_0_5px_red] cursor-pointer"
            onClick={handleCloseModal}
            alt="X icon for close"
          />
        </div>
        <hr className="my-7" />
        <form className="flex flex-col gap-4 md:p-4">
          <Input
            type="text"
            name="inputName"
            placeholder="Inserisci un nome"
            value={inputState.inputName.value}
            onChange={handleChangeInput}
            className={`border-2
              ${
                inputState.inputName.err
                  ? "border-red-500"
                  : "border-transparent"
              }`}
          />
          <div className="flex flex-col gap-4 md:flex-row">
            <Input
              name="inputDate"
              type="date"
              className={`md:flex-1/2 border-2 ${
                inputState.inputDate.err
                  ? "border-red-500"
                  : "border-transparent"
              }`}
              value={inputState.inputDate.value}
              onChange={handleChangeInput}
            />
            <Input
              type="time"
              name="inputTime"
              className={`md:flex-1/2 appearance-none border-2 ${
                inputState.inputTime.err
                  ? "border-red-500"
                  : "border-transparent"
              }`}
              value={inputState.inputTime.value}
              onChange={handleChangeInput}
            />
          </div>
          <Input type="button" value="Add +" onClick={handleAddButton} />
        </form>
      </div>
    </dialog>
  );
}
