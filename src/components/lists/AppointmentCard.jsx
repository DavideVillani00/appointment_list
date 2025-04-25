import iconCompleteLight from "../../assets/icons/toggleIcons/icon-check-light-27.png";
import iconCompleteDark from "../../assets/icons/toggleIcons/icon-check-dark-27.png";
import iconUncompleted from "../../assets/icons/toggleIcons/icon-uncheck-27.png";
import writeIconLight from "../../assets/icons/beautyIcons/icon-write-light-27.png";
import writeIconDark from "../../assets/icons/beautyIcons/icon-write-dark-27.png";

import { useContext } from "react";
import { Context } from "../../ContextProvider.jsx";

import ButtonCardSection from "../elements/composite_elements/ButtonCardSection.jsx";
import useHandleToggleButton from "../../hooks/useHandleToggleButton.js";
import useModalAppointment from "../../hooks/modal/useModalAppointment.js";
import { useTranslation } from "react-i18next";

export default function AppointmentCard({
  appointmentId,
  title,
  date,
  time,
  done,
  userName,
}) {
  const { handleToggleCheckButton } = useHandleToggleButton();
  const { handleOpenModalAppointment } = useModalAppointment();
  const { theme } = useContext(Context).globalThemeState;
  const { userState } = useContext(Context).globalProjectState;
  const { t } = useTranslation();

  return (
    <li
      className={`w-full my-5 rounded-md flex flex-col relative cardModalStyle `}
    >
      <img
        src={theme === "dark" ? writeIconDark : writeIconLight}
        onClick={() => handleOpenModalAppointment(appointmentId)}
        alt="edit icon"
        className={`absolute p-3 md:px-5 top-0 right-0 bg-uncomplete/10 cursor-pointer  ${
          userState.role === "Admin" ? "" : "rounded-bl-md"
        } rounded-tr-md`}
      />
      {userState.role === "Admin" && (
        <div className=" bg-uncomplete/10 px-3 py-3.5 rounded-t-md md:px-5">
          <span>@{userName}</span>
        </div>
      )}
      <div className="px-1 py-2 md:p-5 flex flex-col gap-4 md:flex-row-reverse md:justify-end ">
        <div className={`p-3  flex-3/4 ${done ? "opacity-40" : "opacity-100"}`}>
          <p className="text-xl font-bold mb-3 text-placeholder dark:text-placeholderDark">
            {date} {time.slice(0, 5)}
          </p>
          <p className="text-lg">{title}</p>
        </div>
        <ButtonCardSection
          id={appointmentId}
          page="home"
          img={
            done
              ? theme === "dark"
                ? iconCompleteDark
                : iconCompleteLight
              : iconUncompleted
          }
          alt="checkbox icon"
          value={
            done ? t("Completed").toUpperCase() : t("Uncompleted").toUpperCase()
          }
          onClickBtn={() => {
            handleToggleCheckButton(appointmentId);
          }}
          className="min-w-48"
        />
      </div>
    </li>
  );
}
