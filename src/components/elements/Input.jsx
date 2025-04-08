import useFocusElement from "../../hooks/useFocusElement.js";
export default function Input({
  classInput = "",
  classContainer = "",
  classImg = "",
  img = null,
  alt,
  err = false,
  refInput,
  refFocus,
  ...props
}) {
  const { isFocus, handleBlur, handleFocus } = useFocusElement();

  return (
    <div
      ref={refFocus}
      onClick={handleFocus}
      onBlur={handleBlur}
      className={`relative  rounded-lg input ${
        err
          ? "dark:border-deleteDark border-delete"
          : "border-border dark:border-borderDark"
      } ${isFocus ? "outline-1" : "outline-0"}  ${classContainer}`}
    >
      {img && (
        <img
          src={img}
          alt={alt}
          className={`absolute top-4 left-4 ${classImg}`}
        />
      )}
      <input
        ref={refInput}
        type="text"
        {...props}
        className={`w-full rounded-lg p-4  text-lg outline-0  ${
          img ? "pl-15" : ""
        } ${classInput}`}
      />
    </div>
  );
}
