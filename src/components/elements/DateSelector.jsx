import { useRef } from "react";
import useDialogNew from "../../hooks/useDialogNew.js";

// !!! NON FUNZIONA L'INPUT TIME CON FIREFOX

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
      className="input w-full text-lg  relative p-[18px] rounded-lg  flex gap-4 items-center"
      onClick={handleOpenCalendar}
    >
      {children}
      <span
        className={`${
          value == FORMATTED_INPUT[type]
            ? "text-placeholder dark:text-placeholderDark"
            : "text-text1 dark:text-text1Dark"
        }`}
      >
        {value}
      </span>
      <input
        type={type}
        className="opacity-0 absolute top-0 left-0 w-full h-full hover:cursor-pointer "
        onChange={onChangeInput}
        {...props}
        ref={inputDate}
      />
    </div>
  );
}
