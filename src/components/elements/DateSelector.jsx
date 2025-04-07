import { useContext, useRef, useState } from "react";
import useDialogNew from "../../hooks/useDialogNew.js";
import { Context } from "../../ContextProvider.jsx";

// !!! NON FUNZIONA L'INPUT TIME CON FIREFOX
let focus = false;

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
  const { firefox } = useContext(Context).globalProjectState;
  const [isFocus, setIsFocus] = useState(false);

  function handleOpenCalendar() {
    if (!(type === "time" && firefox)) {
      inputDate.current.showPicker();
    }

    inputDate.current.focus();
    setIsFocus(true);
  }

  return (
    <div
      className={`input w-full text-lg  relative p-[18px] rounded-lg  flex gap-4 items-center outline-focus dark:outline-focusDark ${
        isFocus ? "outline-1" : "outline-0"
      }`}
      onClick={handleOpenCalendar}
    >
      {children}

      {type === "time" && firefox ? (
        <input
          type={type}
          className="focus:outline-none"
          onChange={onChangeInput}
          {...props}
          ref={inputDate}
          onBlur={() => setIsFocus(false)}
        />
      ) : (
        <>
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
            className="opacity-0 absolute top-0 left-0 w-full h-full hover:cursor-pointer  "
            onChange={onChangeInput}
            {...props}
            ref={inputDate}
            onBlur={() => setIsFocus(false)}
          />
        </>
      )}
    </div>
  );
}
