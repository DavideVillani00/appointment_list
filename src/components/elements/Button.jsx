export default function Button({
  children,
  img = null,
  alt,
  className = "",
  ...props
}) {
  return (
    <div
      className={`flex gap-2 justify-center items-end cursor-pointer  w-fit self-end ${className}`}
      {...props}
    >
      {img && <img src={img} alt={alt} />}
      <span className="font-bold">{children}</span>
    </div>
  );
}
