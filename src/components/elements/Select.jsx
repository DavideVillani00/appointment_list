import { useState } from "react";
import iconArrowDown from "../../assets/icons/toggleIcons/icon-edit-dark-25.png";

// !! da sistemare
export default function Select({
  children,
  img = null,
  alt,
  def,
  className,
  ...props
}) {
  const [selectValue, setSelectvalue] = useState(def);
  const [isFocus, setIsFocus] = useState(false);

  function handleChange(e) {
    setSelectvalue(e.target.value);
  }

  function handleFocus() {
    setIsFocus(true);
  }
  function handleBlur() {
    setIsFocus(false);
  }
  return (
    <div
      onClick={handleFocus}
      onBlur={handleBlur}
      className={` border-2   relative px-3   flex gap-3 input ${
        isFocus ? "outline-1" : "outline-0"
      } outline-focus dark:outline-focusDark ${className}`}
      {...props}
    >
      {img && <img src={img} alt={alt} />}
      <span>{selectValue}</span>
      <img src={iconArrowDown} alt="arrow down" className="absolute right-5" />
      <select
        className="w-full outline-none z-10 input border-none absolute top-0 left-0 px-3 py-[18px] opacity-0"
        value={selectValue}
        onChange={handleChange}
      >
        {children}
      </select>
    </div>
  );
}
