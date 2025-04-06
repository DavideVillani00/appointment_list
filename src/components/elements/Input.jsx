export default function Input({
  classInput = "",
  classContainer = "",
  classImg = "",
  img = null,
  alt,
  ...props
}) {
  return (
    <div className={`relative  rounded-lg   ${classContainer}`}>
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
        className={`w-full rounded-lg p-4 pl-13 text-lg   ${
          img ?? "pr-13"
        } ${classInput}`}
      />
    </div>
  );
}
