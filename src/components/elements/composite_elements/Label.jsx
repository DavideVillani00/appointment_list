import { useContext, useRef } from "react";
import Input from "../Input.jsx";
import useSignup from "../../../hooks/useSignup.js";
import Select from "../Select.jsx";
import { Context } from "../../../ContextProvider.jsx";

export default function Label({ children, value, def, ...props }) {
  const inputFocus = useRef();
  const divFocus = useRef();
  const { handleChange, inputState } = useContext(Context).globalSignupState;

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
        <Select
          err={inputState[value].err}
          def={def}
          placeholder={def}
          className="p-4 rounded-lg "
          name={value}
          onHandleChange={handleChange}
        >
          {children}
        </Select>
      ) : (
        <Input
          refInput={inputFocus}
          refFocus={divFocus}
          onChange={handleChange}
          name={value}
          err={inputState[value].err}
          {...props}
        />
      )}
    </div>
  );
}
