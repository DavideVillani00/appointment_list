import Input from "./Input.jsx";
import iconClose from "../assets/icon-close-25.png";

export default function DialogNew() {
  return (
    <dialog
      open
      className="w-full h-full bg-black/10 text-textLight dark:text-textDark backdrop-blur-xs z-10"
    >
      <div className="bg-bgCardLight dark:bg-bgCardDark w-5/6 p-4 md:p-8 rounded-2xl fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="flex justify-between items-center px-4">
          <h1 className="text-3xl font-bold">NEW</h1>
          <img src={iconClose} className="w-10" />
        </div>
        <hr className="my-7" />
        <div className="flex flex-col gap-4 md:p-4">
          <Input type="text" placeholder="Inserisci un nome" />
          <div className="flex flex-col gap-4 md:flex-row">
            <Input type="date" className="md:flex-1/2" />
            <Input type="time" className="md:flex-1/2" />
          </div>
          <Input type="button" value="Add +" />
        </div>
        <div className="justify-self-end mt-2"></div>
      </div>
    </dialog>
  );
}
