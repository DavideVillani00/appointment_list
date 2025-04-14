import iconArrowDownLight from "../../assets/icons/beautyIcons/icon-arrow-down-light-27.png";
import iconArrowDownDark from "../../assets/icons/beautyIcons/icon-arrow-down-dark-27.png";

import { useContext, useEffect, useState } from "react";
import { Context } from "../../ContextProvider";
import useFocusElement from "../../hooks/useFocusElement";

export default function Select({
  children,
  img = null,
  alt,
  def = null,
  className,
  err = null,
  placeholder = "",
  onHandleChange,
  name,
  ...props
}) {
  const { userState } = useContext(Context).globalProjectState;

  const [selectValue, setSelectvalue] = useState(def ? def : userState);
  const { theme } = useContext(Context).globalThemeState;
  const { isFocus, handleBlur, handleFocus } = useFocusElement();

  useEffect(() => {
    setSelectvalue(def);
  }, [def]);

  function handleChange(e) {
    console.log(e);
    const type = e.target.type;
    const value = e.target.value;
    setSelectvalue(value);
    onHandleChange(name, value, type); //!!!! onHandleChange({name, value})
  }

  return (
    <div
      onClick={handleFocus}
      onBlur={handleBlur}
      className={` border-2   relative px-4   flex gap-4 input ${
        err
          ? "dark:border-deleteDark border-delete"
          : "border-border dark:border-borderDark"
      } ${isFocus ? "outline-1" : "outline-0"}  items-center  ${className}`}
      {...props}
    >
      {img && <img src={img} alt={alt} />}
      <span
        className={
          def === placeholder && def === selectValue
            ? "text-placeholder dark:text-placeholderDark"
            : ""
        }
      >
        {selectValue}
      </span>
      <img
        src={theme === "dark" ? iconArrowDownDark : iconArrowDownLight}
        alt="arrow down"
        className="absolute right-5 w-5"
      />
      <select
        className="w-full outline-none z-10 input border-none absolute top-0 left-0 px-3 py-[18px] opacity-0 cursor-pointer"
        value={selectValue}
        onChange={handleChange}
      >
        {children}
      </select>
    </div>
  );
}
