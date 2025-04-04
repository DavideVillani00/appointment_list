import Input from "./elements/Input.jsx";
import iconClose from "../assets/icons/toggleIcons/icon-close-25.png";
import DateSelector from "./elements/DateSelector.jsx";

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

export default function DialogNew() {
  const { dialog, admin } = useContext(Context);

  const { handleAddButton, handleCloseModal, inputState, handleChangeInput } =
    useDialogNew();

  const { theme } = useContext(Context).globalThemeState;

  return (
    <dialog
      onClose={handleCloseModal}
      ref={dialog}
      className=" text-textLight dark:text-textDark backdrop:backdrop-blur-xs bg-bgCardLight dark:bg-bgCardDark w-8/9 p-6 md:p-8 rounded-2xl fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 inset-shadow-[-3px_-3px_10px] dark:inset-shadow-secondaryBgDark inset-shadow-secondaryBgLight"
    >
      <div className="flex justify-between items-center ">
        <h1 className="text-3xl font-bold">New appointment</h1>
        <img
          src={iconClose}
          className="w-10 hover:drop-shadow-[0_0_5px_red] cursor-pointer"
          onClick={handleCloseModal}
          alt="X icon for close"
        />
      </div>
      <hr className="mt-5 mb-7" />
      <form className="flex flex-col gap-4 md:p-4 ">
        {admin && (
          <Select img={writeIconLight}>
            <option>pino</option>
            <option>gino</option>
            <option>lino</option>
            <option>tino</option>
            <option selected>admin</option>
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
          classInput={`border-2
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
            className={` border-2 ${
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

        <Input
          type="button"
          value="Add +"
          classInput="pr-13 text-xl font-bold inset-shadow-[0px_0px_15px] inset-shadow-green-600 text-green-600/90"
          onClick={handleAddButton}
        />
      </form>
    </dialog>
  );
}
