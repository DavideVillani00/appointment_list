import iconFilterLight from "../assets/icons/beautyIcons/icon-filter-light-27.png";
import iconFilterDark from "../assets/icons/beautyIcons/icon-filter-dark-27.png";
import iconSearchLight from "../assets/icons/beautyIcons/icon-search-light-27.png";
import iconSearchDark from "../assets/icons/beautyIcons/icon-search-dark-27.png";
import userIconLight from "../assets/icons/beautyIcons/icon-user-light-27.png";
import userIconDark from "../assets/icons/beautyIcons/icon-user-dark-27.png";
import addIcon from "../assets/icons/beautyIcons/icon-add-27.png";
import calendarIconLight from "../assets/icons/beautyIcons/icon-calendar-light-27.png";
import calendarIconDark from "../assets/icons/beautyIcons/icon-calendar-dark-27.png";

import { useContext, useEffect } from "react";
import { Context } from "../ContextProvider.jsx";
import Input from "./elements/Input.jsx";
import Select from "./elements/Select.jsx";
import DateSelector from "./elements/DateSelector.jsx";
import Button from "./elements/Button.jsx";
import useSorter from "../hooks/useSorter.js";
import OptionUsersName from "./lists/OptionUsersName.jsx";
import useModalAppointment from "../hooks/modal/useModalAppointment.js";
import { useTranslation } from "react-i18next";

export default function TopMain() {
  const { usersList, userState, appointmentsList } =
    useContext(Context).globalProjectState;
  const { t } = useTranslation();
  const { theme } = useContext(Context).globalThemeState;
  const { handleChangeFilterHome, homeFilter } =
    useContext(Context).globalHomePage;
  const { handleOpenModalAppointment, getAllAppointment } =
    useModalAppointment();

  const appointments =
    userState.role === "Admin"
      ? appointmentsList
      : appointmentsList.filter((app) => app.userName === userState.userName);

  const { appointmentCompleted, appointmentSortered, appointmentUncompleted } =
    useSorter().sort(appointments);

  useEffect(() => {
    getAllAppointment();
  }, []);

  return (
    <>
      <div className="mt-3 p-3 flex flex-col gap-4  items-center justify-center">
        <Button
          className="w-full addBtn p-[18px] rounded-lg md:flex-3/5"
          img={addIcon}
          onClick={() => handleOpenModalAppointment()}
          alt="add icon"
        >
          {t("Add").toUpperCase()}
        </Button>
        <div className="md:flex-2/5 w-full flex gap-2 justify-center items-center ">
          <Input
            classContainer=" w-full py-0.5 "
            img={theme === "dark" ? iconSearchDark : iconSearchLight}
            alt="search glass icon"
            classImg="top-4 left-3"
            classInput="px-5 "
            type="text"
            placeholder={t("Search")}
            value={homeFilter.title}
            onHandleChange={handleChangeFilterHome}
            name="title"
          />
          <DateSelector
            onChangeInput={handleChangeFilterHome}
            name="date"
            type="date"
            value={homeFilter.date}
            // err={inputHomeState.date.err}
            onHandleChange={handleChangeFilterHome}
          >
            <img
              src={theme === "dark" ? calendarIconDark : calendarIconLight}
              alt="calendar Icon"
            />
          </DateSelector>
        </div>
        {userState.role === "Admin" && (
          <Select
            img={theme === "dark" ? userIconDark : userIconLight}
            def={t("All")}
            className="rounded-lg text-lg py-[18px] w-full"
            onHandleChange={handleChangeFilterHome}
            name="userName"
            alt="user icon"
          >
            <OptionUsersName users={usersList} allOption={true} />
          </Select>
        )}
      </div>
      <div className="mt-1 p-3 flex flex-col gap-5 md:flex-row md:justify-center items-center">
        <div className="flex justify-center gap-4 text-text2 dark:text-text2Dark">
          <p>
            {t("Total")} :{" "}
            <span className="font-bold">{appointmentSortered.length}</span>
          </p>
          <span className=" w-[2px] h-auto  bg-divider dark:bg-dividerDark "></span>
          <p>
            {t("Completed :")}{" "}
            <span className="font-bold">{appointmentCompleted.length}</span>
          </p>
          <span className=" w-[2px] h-auto  bg-divider dark:bg-dividerDark "></span>
          <p>
            {t("Uncompleted :")}{" "}
            <span className="font-bold">{appointmentUncompleted.length}</span>
          </p>
        </div>

        <Select
          img={theme === "dark" ? iconFilterDark : iconFilterLight}
          alt="filter icon"
          className="w-60 py-3 rounded-2xl "
          def={t("All")}
          name="check"
          onHandleChange={handleChangeFilterHome}
        >
          <option>{t("All")}</option>
          <option>{t("Completed")}</option>
          <option>{t("Uncompleted")}</option>
        </Select>

        <hr />
      </div>
    </>
  );
}
