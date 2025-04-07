import iconArrowDownLight from "../../assets/icons/beautyIcons/icon-arrow-down-light-27.png";
import iconArrowDownDark from "../../assets/icons/beautyIcons/icon-arrow-down-dark-27.png";

import { useContext, useState } from "react";
import { Context } from "../../ContextProvider";
import useFocusElement from "../../hooks/useFocusElement";

export default function Select({
  children,
  img = null,
  alt,
  def,
  className,
  err = null,
  ...props
}) {
  const [selectValue, setSelectvalue] = useState(def);
  const { theme } = useContext(Context).globalThemeState;
  const { isFocus, handleBlur, handleFocus } = useFocusElement();

  function handleChange(e) {
    setSelectvalue(e.target.value);
  }

  return (
    <div
      onClick={handleFocus}
      onBlur={handleBlur}
      className={` border-2   relative px-3   flex gap-3 input ${
        err
          ? "dark:border-deleteDark border-delete"
          : "border-border dark:border-borderDark"
      } ${isFocus ? "outline-1" : "outline-0"}  items-center  ${className}`}
      {...props}
    >
      {img && <img src={img} alt={alt} />}
      <span>{selectValue}</span>
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
