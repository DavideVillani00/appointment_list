import iconDelete from "../assets/icons/toggleIcons/icon-delete-25.png";
import iconComplete from "../assets/icons/toggleIcons/icon-complete-25.png";
import iconUncompletedLight from "../assets/icons/toggleIcons/icon-uncompleted-light-25.png";
import iconUncompletedDark from "../assets/icons/toggleIcons/icon-uncompleted-dark-25.png";
import { useContext } from "react";
import { Context } from "../ContextProvider.jsx";

import useDialogDelete from "../hooks/useDialogDelete.js";
import Button from "./elements/Button.jsx";
export default function AppointmentCard({ id, name, date, time, check }) {
  const { theme } = useContext(Context).globalThemeState;
  const { handleCheckboxAppointment } = useContext(Context).globalProjectState;
  const { handleOpenDialogDelete } = useDialogDelete();

  return (
    <li
      className={`w-full  rounded-md p-4 my-5 flex flex-col gap-4 md:flex-row-reverse md:justify-end  cardModalStyle ${
        check ? "opacity-70" : "opacity-100"
      }`}
    >
      <div className="border-divider dark:border-dividerDark border-b-[2px] p-3 md:border-0 md:border-l-[2px] flex-3/4 ">
        <p className="text-lg font-bold mb-3 text-placeholder dark:text-placeholderDark">
          {date} {time}
        </p>
        <p>{name}</p>
      </div>

      <div className=" flex justify-evenly md:flex-col md:justify-between flex-1/4 min-w-48">
        <Button
          img={check ? iconComplete : iconUncompletedDark}
          alt="checkbox icon"
          className="primaryBtn rounded-xl p-3 "
          onClick={() => handleCheckboxAppointment(id)}
        >
          {check ? "COMPLETED" : "UNCOMPLETED"}
        </Button>

        <span className="md:my-4 w-[2px] h-auto md:w-auto md:h-[2px] bg-divider dark:bg-dividerDark "></span>

        <Button
          img={iconDelete}
          alt="delete icon"
          className="deleteBtn rounded-xl p-3"
          onClick={() => handleOpenDialogDelete(id)}
        >
          DELETE
        </Button>
      </div>
    </li>
  );
}
