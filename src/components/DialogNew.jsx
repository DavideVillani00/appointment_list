import Input from "./Input.jsx";

export default function DialogNew() {
  return (
    <dialog
      open
      className="w-full h-full bg-black/10 text-textLight dark:text-textDark backdrop-blur-xs"
    >
      <div className="bg-bgCardLight dark:bg-bgCardDark w-5/6 p-4 rounded-md fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl">New</h1>
          <Input type="button" value="X" />
        </div>
        <hr className="my-7" />
        <div className="flex flex-col gap-2 ">
          <Input type="text" placeholder="Inserisci un nome" />
          <Input type="date" />
          <Input type="time" />
        </div>
        <div className="justify-self-end mt-2">
          <Input type="button" value="Add +" />
        </div>
      </div>
    </dialog>
  );
}
