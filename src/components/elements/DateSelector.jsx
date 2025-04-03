import { useRef, useState } from "react";
import useDialogNew from "../../hooks/useDialogNew.js";

export default function DateSelector({
  children,
  onChangeInput,
  className = "",
  value,
  type,
  ...props
}) {
  const { FORMATTED_INPUT } = useDialogNew();
  const inputDate = useRef();
  function handleOpenCalendar() {
    inputDate.current.showPicker();
  }

  return (
    <div
      className={`w-full text-lg  relative p-[18px] rounded-lg shadow-md dark:shadow-secondaryBgDark/50 shadow-secondaryBgLight/50 bg-bgInputLight dark:bg-bgInputDark  flex gap-4 items-center 
         ${
           value === FORMATTED_INPUT[type]
             ? "text-textLight/60 dark:text-textDark/60"
             : ""
         }

        
      `}
      onClick={handleOpenCalendar}
    >
      {children}
      <span>{value}</span>
      <input
        type={type}
        className="opacity-0 absolute top-0 left-0 w-full h-full hover:cursor-pointer "
        onChange={onChangeInput}
        {...props}
        ref={inputDate}
      />

      <div
        className={`absolute top-0 left-0 w-full h-full rounded-lg hover:shadow-[0_0_5px_black] dark:hover:shadow-[0_0_5px_white] ${className}`}
      ></div>
    </div>
  );
}
