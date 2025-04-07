import useFocusElement from "../../hooks/useFocusElement.js";
export default function Input({
  classInput = "",
  classContainer = "",
  classImg = "",
  img = null,
  alt,
  err = false,
  ...props
}) {
  const { isFocus, handleBlur, handleFocus } = useFocusElement();

  return (
    <div
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
          className={`absolute top-4 left-3 ${classImg}`}
        />
      )}
      <input
        type="text"
        {...props}
        className={`w-full rounded-lg p-4 pl-13 text-lg outline-0  ${
          img ?? "pr-13"
        } ${classInput}`}
      />
    </div>
  );
}
