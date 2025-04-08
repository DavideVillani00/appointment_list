import iconDelete from "../assets/icons/toggleIcons/icon-delete-27.png";
import iconCompleteLight from "../assets/icons/toggleIcons/icon-check-light-27.png";
import iconCompleteDark from "../assets/icons/toggleIcons/icon-check-dark-27.png";
import iconUncompleted from "../assets/icons/toggleIcons/icon-uncheck-27.png";

import { use, useContext } from "react";
import { Context } from "../ContextProvider.jsx";

import useDialogDelete from "../hooks/useDialogDelete.js";
import Button from "./elements/Button.jsx";
export default function AppointmentCard({ id, name, date, time, check }) {
  const { info } = useContext(Context);
  const { theme } = useContext(Context).globalThemeState;
  const { handleCheckboxAppointment } = useContext(Context).globalProjectState;
  const { handleOpenDialogDelete } = useDialogDelete();

  return (
    <li
      className={`w-full my-5 rounded-md flex flex-col  cardModalStyle ${
        check ? "opacity-70" : "opacity-100"
      }`}
    >
      {info.admin && (
        <div className="flex justify-between bg-uncomplete/10 p-3 rounded-t-md md:px-5">
          <span>@username</span>
          <span>edit</span>
        </div>
      )}
      <div className="p-3 md:p-5 flex flex-col gap-4 md:flex-row-reverse md:justify-end ">
        <div className="border-divider dark:border-dividerDark border-b-[2px] p-3 md:border-0 md:border-l-[2px] flex-3/4 ">
          <p className="text-lg font-bold mb-3 text-placeholder dark:text-placeholderDark">
            {date} {time}
          </p>
          <p>{name}</p>
        </div>

        <div className=" flex justify-evenly md:flex-col md:justify-between flex-1/4 min-w-48">
          <Button
            img={
              check
                ? theme === "dark"
                  ? iconCompleteDark
                  : iconCompleteLight
                : iconUncompleted
            }
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
            className="deleteBtn rounded-xl p-3 "
            onClick={() => handleOpenDialogDelete(id)}
          >
            DELETE
          </Button>
        </div>
      </div>
    </li>
  );
}
