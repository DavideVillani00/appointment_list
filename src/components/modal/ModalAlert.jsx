export default function ModalAlert({ children, className = "" }) {
  return (
    <div
      className={`flex justify-center items-start fixed w-full h-full backdrop-blur-xs z-10 ${className}`}
    >
      <div className=" cardModalStyle flex flex-col justify-center items-center text-center p-5 rounded-md w-2/3  border-4">
        <h1 className="text-3xl">{children}</h1>
      </div>
    </div>
  );
}
