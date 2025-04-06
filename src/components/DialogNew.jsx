import Input from "./elements/Input.jsx";
import iconClose from "../assets/icons/toggleIcons/icon-close-25.png";
import DateSelector from "./elements/DateSelector.jsx";

import userIconLight from "../assets/icons/beautyIcons/icon-user-light-25.png";
import userIconDark from "../assets/icons/beautyIcons/icon-user-dark-25.png";
import writeIconLight from "../assets/icons/beautyIcons/icon-write-light-25.png";
import writeIconDark from "../assets/icons/beautyIcons/icon-write-dark-25.png";
import calendarIconLight from "../assets/icons/beautyIcons/icon-calendar-light-25.png";
import calendarIconDark from "../assets/icons/beautyIcons/icon-calendar-dark-25.png";
import clockIconLight from "../assets/icons/beautyIcons/icon-clock-light-25.png";
import clockIconDark from "../assets/icons/beautyIcons/icon-clock-dark-25.png";

import { useContext } from "react";
import { Context } from "../ContextProvider.jsx";
import useDialogNew from "../hooks/useDialogNew.js";
import Select from "./elements/Select.jsx";
import Button from "./elements/Button.jsx";

// !! da sistemare
export default function DialogNew() {
  const { dialog, admin } = useContext(Context);

  const { handleAddButton, handleCloseModal, inputState, handleChangeInput } =
    useDialogNew();

  const { theme } = useContext(Context).globalThemeState;

  return (
    <dialog
      onClose={handleCloseModal}
      ref={dialog}
      className="  backdrop:backdrop-blur-xs  w-8/9 p-6 md:p-8 rounded-2xl fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-lg  cardModalStyle text-text1"
    >
      <div className="flex justify-between items-center ">
        <h1 className="text-3xl font-bold text-text1 dark:text-text1Dark">
          New appointment
        </h1>
        <img
          src={iconClose}
          className="w-10  cursor-pointer "
          onClick={handleCloseModal}
          alt="X icon for close"
        />
      </div>

      <form className="flex flex-col gap-4 md:p-4 ">
        <span className="bg-divider dark:bg-dividerDark w-full h-0.5 my-5"></span>
        {admin && (
          <Select
            img={theme === "dark" ? userIconDark : userIconLight}
            def="admin"
            className="rounded-lg text-lg py-[18px]"
          >
            <option>pino</option>
            <option>gino</option>
            <option>lino</option>
            <option>tino</option>
            <option>admin</option>
          </Select>
        )}
        <Input
          img={theme === "dark" ? writeIconDark : writeIconLight}
          alt="hand with pencil icon"
          type="text"
          name="inputName"
          placeholder="Write an appointment"
          value={inputState.inputName.value}
          onChange={handleChangeInput}
          classInput={`border-2 input
              ${
                inputState.inputName.err
                  ? "border-red-500"
                  : "border-transparent"
              }`}
        />
        <div className="flex flex-col gap-4 md:flex-row ">
          <DateSelector
            onChangeInput={handleChangeInput}
            name="inputDate"
            type="date"
            value={inputState.inputDate.value}
            className={` border-2 input ${
              inputState.inputDate.err ? "border-red-500" : "border-transparent"
            }`}
          >
            <img
              src={theme === "dark" ? calendarIconDark : calendarIconLight}
              alt="calendar Icon"
            />
          </DateSelector>
          <DateSelector
            onChangeInput={handleChangeInput}
            name="inputTime"
            type="time"
            className={`border-2 ${
              inputState.inputTime.err ? "border-red-500" : "border-transparent"
            }`}
            value={inputState.inputTime.value}
          >
            <img
              src={theme === "dark" ? clockIconDark : clockIconLight}
              alt="calendar Icon"
            />
          </DateSelector>
        </div>
        <ul className="text-center text-red-400 font-bold">
          {inputState.inputName.err && <li>Insert a valid appointment</li>}
          {(inputState.inputDate.err || inputState.inputTime.err) && (
            <li>Enter a date for a future appointment</li>
          )}
        </ul>

        <Button
          className="addBtn w-full p-4 rounded-lg"
          onClick={handleAddButton}
        >
          ADD
        </Button>
      </form>
    </dialog>
  );
}
