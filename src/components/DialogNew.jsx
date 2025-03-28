import Input from "./Input.jsx";
import iconClose from "../assets/icons/icon-close-25.png";
import writeIconLight from "../assets/icons/beautyIcons/icon-write-light-25.png";
import writeIconDark from "../assets/icons/beautyIcons/icon-write-dark-25.png";
import calendarIconLight from "../assets/icons/beautyIcons/icon-calendar-light-25.png";
import calendarIconDark from "../assets/icons/beautyIcons/icon-calendar-dark-25.png";
import clockIconLight from "../assets/icons/beautyIcons/icon-clock-light-25.png";
import clockIconDark from "../assets/icons/beautyIcons/icon-clock-dark-25.png";

import { useContext } from "react";
import { Context } from "../ContextProvider.jsx";
import useDialogNew from "../hooks/useDialogNew.js";

export default function DialogNew() {
  const { dialog } = useContext(Context);

  const { handleAddButton, handleCloseModal, inputState, handleChangeInput } =
    useDialogNew();

  const { theme } = useContext(Context).globalThemeState;

  return (
    <dialog
      ref={dialog}
      className="w-full h-full max-w-none max-h-none bg-black/10 text-textLight dark:text-textDark backdrop-blur-xs z-10 "
    >
      <div className="bg-bgCardLight dark:bg-bgCardDark w-5/6 p-6 md:p-8 rounded-2xl fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 inset-shadow-[-3px_-3px_10px] dark:inset-shadow-secondaryBgDark inset-shadow-secondaryBgLight">
        <div className="flex justify-between items-center px-4">
          <h1 className="text-3xl font-bold">NEW</h1>
          <img
            src={iconClose}
            className="w-10 hover:drop-shadow-[0_0_5px_red] cursor-pointer"
            onClick={handleCloseModal}
            alt="X icon for close"
          />
        </div>
        <hr className="mt-5 mb-7" />
        <form className="flex flex-col gap-4 md:p-4">
          <Input
            img={theme === "dark" ? writeIconDark : writeIconLight}
            alt="hand with pencil icon"
            type="text"
            name="inputName"
            placeholder="Write an appointment"
            value={inputState.inputName.value}
            onChange={handleChangeInput}
            classInput={`border-2
              ${
                inputState.inputName.err
                  ? "border-red-500"
                  : "border-transparent"
              }`}
          />
          <div className="flex flex-col gap-4 md:flex-row">
            <Input
              img={theme === "dark" ? calendarIconDark : calendarIconLight}
              alt="calendar icon"
              name="inputDate"
              type="date"
              classInput={` border-2 ${
                inputState.inputDate.err
                  ? "border-red-500"
                  : "border-transparent"
              }`}
              classImg="top-5"
              classContainer="md:flex-1/2"
              value={inputState.inputDate.value}
              onChange={handleChangeInput}
            />
            <Input
              img={theme === "dark" ? clockIconDark : clockIconLight}
              alt="clock icon"
              type="time"
              name="inputTime"
              classContainer="md:flex-1/2"
              classImg="top-5"
              classInput={` appearance-none border-2 ${
                inputState.inputTime.err
                  ? "border-red-500"
                  : "border-transparent"
              }`}
              value={inputState.inputTime.value}
              onChange={handleChangeInput}
            />
          </div>
          <Input
            type="button"
            value="Add +"
            classInput="pr-13 text-xl font-bold"
            onClick={handleAddButton}
          />
        </form>
      </div>
    </dialog>
  );
}
