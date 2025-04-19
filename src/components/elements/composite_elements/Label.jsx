import { useRef } from "react";
import Input from "../Input.jsx";
import Select from "../Select.jsx";

export default function Label({ children, label, def, ...props }) {
  const inputFocus = useRef();
  const divFocus = useRef();

  function handleFocus() {
    inputFocus.current.focus();
    divFocus.current.click();
  }

  return (
    <div className="w-full relative">
      <label className="text-lg text-text1 dark:text-text1Dark">{label}</label>
      {children ? (
        <Select
          def={def}
          placeholder={def}
          className="p-4 rounded-lg text-lg "
          {...props}
        >
          {children}
        </Select>
      ) : (
        <Input refInput={inputFocus} refFocus={divFocus} {...props} />
      )}
      <div
        className={`absolute w-full h-full top-0 left-0 opacity-0 ${
          children ? "cursor-pointer" : "cursor-text"
        }`}
        onClick={handleFocus}
      ></div>
    </div>
  );
}
