import { useRef } from "react";
import Input from "../Input.jsx";
import Select from "../Select.jsx";

export default function Label({ children, value, def, ...props }) {
  const inputFocus = useRef();
  const divFocus = useRef();

  function handleFocus() {
    inputFocus.current.focus();
    divFocus.current.click();
  }

  return (
    <div className="w-full">
      <label onClick={handleFocus} className="text-lg">
        {value}
      </label>
      {children ? (
        <Select def={def} placeholder={def} className="p-4 rounded-lg ">
          {children}
        </Select>
      ) : (
        <Input refInput={inputFocus} refFocus={divFocus} {...props} />
      )}
    </div>
  );
}
