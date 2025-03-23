import Input from "./Input.jsx";
import iconClose from "../assets/icon-close-25.png";
import { useContext, useRef } from "react";
import { Context } from "../ContextProvider.jsx";

export default function DialogNew() {
  const { dialog, handleAddAppointment } = useContext(Context);
  const inputName = useRef();
  const inputDate = useRef();
  const inputTime = useRef();

  function handleCloseModal() {
    dialog.current.close();
    document.documentElement.classList.remove("overflow-hidden");
    inputName.current.classList.remove("border-2", "border-red-700");
    inputDate.current.classList.remove("border-2", "border-red-700");
    inputTime.current.classList.remove("border-2", "border-red-700");
    inputName.current.value = "";
    inputDate.current.value = "";
    inputTime.current.value = "";
  }

  function handleAddButton() {
    const name = inputName.current.value.trim();
    const date = inputDate.current.value;
    const time = inputTime.current.value;
    const actualDate = new Date().getTime();
    const impostedDate = new Date([date, time].join(" ")).getTime();

    if (!name) {
      inputName.current.classList.add("border-2", "border-red-700");
    }
    if (!date || impostedDate < actualDate) {
      inputDate.current.classList.add("border-2", "border-red-700");
    }
    if (!time || impostedDate < actualDate) {
      inputTime.current.classList.add("border-2", "border-red-700");
    }
    if (!name || !date || !time || impostedDate < actualDate) {
      return;
    }
    handleAddAppointment(name, date, time);
    handleCloseModal();
  }

  function handleDeleteErr(el) {
    el.target.classList.remove("border-2", "border-red-700");
  }

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
              className="md:flex-1/2"
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
