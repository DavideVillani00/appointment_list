import { useContext, useRef } from "react";
import useFocusElement from "../../hooks/useFocusElement.js";
import { Context } from "../../ContextProvider.jsx";
import { useTranslation } from "react-i18next";

export default function DateSelector({
  children,
  onChangeInput,
  className = "",
  value,
  type,
  err = null,
  onHandleChange = null,
  ...props
}) {
  const { FORMATTED_INPUT } = useContext(Context).globalHomePage;
  const { firefox } = useContext(Context).globalProjectState;
  const { isFocus, handleBlur, handleFocus } = useFocusElement();
  const { t } = useTranslation();

  const inputDate = useRef();

  function handleOpenCalendar() {
    if (!(type === "time" && firefox)) {
      inputDate.current.showPicker();
    }

    inputDate.current.focus();
    handleFocus();
  }

  return (
    <div
      className={`input w-full text-lg  relative py-[18px] px-4 rounded-lg  flex gap-3 items-center ${
        err
          ? "dark:border-deleteDark border-delete"
          : "border-border dark:border-borderDark"
      } ${isFocus ? "outline-1" : "outline-0"}`}
      onClick={handleOpenCalendar}
    >
      {children}

      {type === "time" && firefox ? (
        <input
          type={type}
          className={` focus:outline-none ${
            value == FORMATTED_INPUT[type]
              ? "text-placeholder dark:text-placeholderDark"
              : "text-text1 dark:text-text1Dark"
          }`}
          onChange={onChangeInput}
          {...props}
          ref={inputDate}
          onBlur={handleBlur}
          value={value}
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
            {value === FORMATTED_INPUT[type] ? t(FORMATTED_INPUT[type]) : value}
          </span>
          <input
            type={type}
            className="opacity-0 absolute top-0 left-0 w-full h-full hover:cursor-pointer  "
            onChange={(e) => {
              onChangeInput(e);
              if (onHandleChange) {
                onHandleChange(type, e.target.value);
              }
            }}
            {...props}
            ref={inputDate}
            onBlur={handleBlur}
          />
        </>
      )}
    </div>
  );
}
