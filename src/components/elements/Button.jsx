export default function Button({
  children,
  img = null,
  alt,
  className = "",
  ...props
}) {
  return (
    <div
      className={`flex gap-2 justify-center items-center cursor-pointer  min-w-1/3  self-end  md:mx-0 md:my-2 w-full  ${className}`}
      {...props}
    >
      {img && <img src={img} alt={alt} />}
      <span className="font-bold">{children}</span>
    </div>
  );
}
