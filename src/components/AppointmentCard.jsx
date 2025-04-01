import iconDelete from "../assets/icons/icon-delete-25.png";
import iconComplete from "../assets/icons/icon-complete-25.png";
import iconUncompletedLight from "../assets/icons/icon-uncompleted-light-25.png";
import iconUncompletedDark from "../assets/icons/icon-uncompleted-dark-25.png";
import { useContext, useRef } from "react";
import { Context } from "../ContextProvider.jsx";
import DialogDelete from "./DialogDelete.jsx";
import useDialogDelete from "../hooks/useDialogDelete.js";
export default function AppointmentCard({ id, name, date, time, check }) {
  const { theme } = useContext(Context).globalThemeState;
  const { handleCheckboxAppointment } = useContext(Context).globalProjectState;

  const { dialogDelete, handleOpenDialogDelete, handleCloseDialogDelete } =
    useDialogDelete();

  return (
    <>
      <DialogDelete
        ref={dialogDelete}
        id={id}
        onclose={handleCloseDialogDelete}
      />
      <li
        className={`bg-bgCardLight dark:bg-bgCardDark rounded-md p-4 my-5 flex flex-col gap-4 md:flex-row-reverse md:justify-end shadow-md dark:shadow-secondaryBgDark shadow-secondaryBgLight ${
          check ? "opacity-70" : "opacity-100"
        }`}
      >
        <div className="border-bgInputLight dark:border-bgInputDark border-b-[2px] p-3 md:border-0 md:border-l-[2px] flex-3/4 ">
          <p className="text-lg font-bold mb-3 text-textLight/50 dark:text-textDark/50">
            {date} {time}
          </p>
          <p>{name}</p>
        </div>

        <div className=" flex justify-evenly md:flex-col md:justify-between flex-1/4 ">
          <div
            className="flex gap-2 justify-end items-center cursor-pointer hover:drop-shadow-[0_0_10px_green] "
            onClick={() => handleCheckboxAppointment(id)}
          >
            <img
              src={
                check
                  ? iconComplete
                  : theme === "dark"
                  ? iconUncompletedDark
                  : iconUncompletedLight
              }
              alt="checkbox icon"
              className="w-[27px]"
            />
            <span className=" font-bold">
              {check ? "COMPLETED" : "UNCOMPLETED"}
            </span>
          </div>
          <span className="md:my-4 w-[2px] h-auto md:w-auto md:h-[2px] bg-bgInputLight dark:bg-bgInputDark  "></span>
          <div
            className="flex gap-2 justify-end items-center cursor-pointer hover:shadow-[0_0_10px_red] p-3 rounded-xl bg-red-300/65 w-fit self-end inset-shadow-[0px_0px_10px] inset-shadow-red-900"
            onClick={handleOpenDialogDelete}
          >
            <img src={iconDelete} className="w-[27px]" alt="delete icon" />
            <span className="text-[#D40000] font-bold">DELETE</span>
          </div>
        </div>
      </li>
    </>
  );
}
