export default function Input({
  classInput = "",
  classContainer = "",
  classImg = "",
  img = null,
  alt,
  ...props
}) {
  return (
    <div
      className={`relative  rounded-lg shadow-md dark:shadow-secondaryBgDark/50 shadow-secondaryBgLight/50  ${classContainer}`}
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
        className={`w-full rounded-lg p-4 pl-13 text-lg bg-bgInputLight placeholder:text-textLight/75 hover:shadow-[0_0_5px_black] dark:bg-bgInputDark dark:placeholder:text-textDark/75 dark:hover:shadow-[0_0_5px_white] ${
          img ?? "pr-13"
        } ${classInput}`}
      />
    </div>
  );
}
