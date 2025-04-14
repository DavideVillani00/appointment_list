import iconCompleteLight from "../../assets/icons/toggleIcons/icon-check-light-27.png";
import iconCompleteDark from "../../assets/icons/toggleIcons/icon-check-dark-27.png";
import iconUncompleted from "../../assets/icons/toggleIcons/icon-uncheck-27.png";
import writeIconLight from "../../assets/icons/beautyIcons/icon-write-light-27.png";
import writeIconDark from "../../assets/icons/beautyIcons/icon-write-dark-27.png";

import { useContext } from "react";
import { Context } from "../../ContextProvider.jsx";

// import useDialogDelete from "../../hooks/useDialogDelete.js";
import ButtonCardSection from "../elements/composite_elements/ButtonCardSection.jsx";
import useDialogNew from "../../hooks/useDialogNew.js";
export default function AppointmentCard({
  id,
  title,
  date,
  time,
  check,
  userName,
}) {
  const { info } = useContext(Context);
  const { handleOpenDialog, getAppointmentByid } = useDialogNew();
  const { theme } = useContext(Context).globalThemeState;
  const { handleCheckboxAppointment, userState } =
    useContext(Context).globalProjectState;

  return (
    <li
      className={`w-full my-5 rounded-md flex flex-col relative cardModalStyle ${
        check ? "opacity-70" : "opacity-100"
      }`}
    >
      <img
        src={theme === "dark" ? writeIconDark : writeIconLight}
        onClick={() => handleOpenDialog(id)}
        alt="edit icon"
        className={`absolute p-3 md:px-5 top-0 right-0 bg-uncomplete/10 ${
          info.admin ? "" : "rounded-bl-md"
        } rounded-tr-md`}
      />
      {userState.role === "admin" && (
        <div className=" bg-uncomplete/10 px-3 py-3.5 rounded-t-md md:px-5">
          <span>@{userName}</span>
        </div>
      )}
      <div className="p-3 md:p-5 flex flex-col gap-4 md:flex-row-reverse md:justify-end ">
        <div className=" p-3  flex-3/4 ">
          <p className="text-lg font-bold mb-3 text-placeholder dark:text-placeholderDark">
            {date} {time}
          </p>
          <p>{title}</p>
        </div>
        <ButtonCardSection
          id={id}
          img={
            check
              ? theme === "dark"
                ? iconCompleteDark
                : iconCompleteLight
              : iconUncompleted
          }
          alt="checkbox icon"
          value={check ? "COMPLETED" : "UNCOMPLETED"}
          onClickBtn={() => {
            getAppointmentByid(id, check);
          }}
          className="min-w-48"
        />
      </div>
    </li>
  );
}
