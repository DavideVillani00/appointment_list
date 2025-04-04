export default function Select({ children, img = null, alt }) {
  return (
    <div className=" w-full text-lg  relative px-3 py-[18px] rounded-lg  bg-bgInputLight dark:bg-bgInputDark  flex gap-3 items- hover:shadow-[0_0_5px_black] dark:hover:shadow-[0_0_5px_white]">
      <div
        className={`absolute top-0 left-0 w-full h-full rounded-lg shadow-md dark:shadow-secondaryBgDark/50 shadow-secondaryBgLight/50 `}
      ></div>
      {img && <img src={img} alt={alt} />}
      <select className="w-full outline-none z-10">{children}</select>
    </div>
  );
}
