import iconCloseLight from "../../assets/icons/toggleIcons/icon-close-light-48.png";
import iconCloseDark from "../../assets/icons/toggleIcons/icon-close-dark-48.png";
import userIconLight from "../../assets/icons/beautyIcons/icon-user-light-27.png";
import userIconDark from "../../assets/icons/beautyIcons/icon-user-dark-27.png";
import writeIconLight from "../../assets/icons/beautyIcons/icon-write-light-27.png";
import writeIconDark from "../../assets/icons/beautyIcons/icon-write-dark-27.png";
import calendarIconLight from "../../assets/icons/beautyIcons/icon-calendar-light-27.png";
import calendarIconDark from "../../assets/icons/beautyIcons/icon-calendar-dark-27.png";
import clockIconLight from "../../assets/icons/beautyIcons/icon-clock-light-27.png";
import clockIconDark from "../../assets/icons/beautyIcons/icon-clock-dark-27.png";
import addIcon from "../../assets/icons/beautyIcons/icon-add-27.png";
import editIcon from "../../assets/icons/beautyIcons/icon-edit-27.png";

import { useContext } from "react";
import { Context } from "../../ContextProvider.jsx";
import Input from "../elements/Input.jsx";
import DateSelector from "../elements/DateSelector.jsx";
import Select from "../elements/Select.jsx";
import Button from "../elements/Button.jsx";
import OptionUsersName from "../lists/OptionUsersName.jsx";
import useModalAppointment from "../../hooks/modal/useModalAppointment.js";
import ErrorList from "../lists/ErrorList.jsx";
import { useTranslation } from "react-i18next";

export default function DialogNew() {
  const { t } = useTranslation();
  const { dialogAppointment, isEdit, inputHomeState } =
    useContext(Context).globalHomePage;
  const { usersList, userState } = useContext(Context).globalProjectState;
  const { theme } = useContext(Context).globalThemeState;
  const {
    handleCloseModalAppointment,
    handleChangeInput,
    handleChangeSelect,
    handleSendRequest,
    ERROR_MESSAGES_HOME,
  } = useModalAppointment();

  const defSelect = inputHomeState.userName.value || userState.userName;

  return (
    <dialog
      onClose={handleCloseModalAppointment}
      ref={dialogAppointment}
      className="  backdrop:backdrop-blur-xs  w-8/9 p-6 md:p-8 rounded-2xl fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-lg border-4 cardModalStyle text-text1"
    >
      <div className="flex justify-between items-center ">
        <h1 className="text-3xl font-bold text-text1 dark:text-text1Dark">
          {isEdit ? t("Edit appointment") : t("New appointment")}
        </h1>
        <img
          src={theme === "dark" ? iconCloseDark : iconCloseLight}
          className="cursor-pointer "
          onClick={handleCloseModalAppointment}
          alt="X icon for close"
        />
      </div>

      <form className="flex flex-col gap-4 md:p-4 ">
        <span className="bg-divider dark:bg-dividerDark w-full h-0.5 my-5"></span>
        {userState.role === "Admin" && (
          <Select
            img={theme === "dark" ? userIconDark : userIconLight}
            alt="user icon"
            def={defSelect}
            className="rounded-lg text-lg py-[18px]"
            name="userName"
            onHandleChange={(name, value) => {
              handleChangeSelect(name, value);
            }}
          >
            <OptionUsersName users={usersList} />
          </Select>
        )}
        <Input
          img={theme === "dark" ? writeIconDark : writeIconLight}
          alt="hand with pencil icon"
          type="text"
          name="title"
          placeholder={t("Write an appointment")}
          value={inputHomeState.title.value}
          onChange={handleChangeInput}
          err={inputHomeState.title.err}
        />

        <div className="flex flex-col gap-4 md:flex-row ">
          <DateSelector
            // onHandleChange={handleChangeInput}
            onChangeInput={handleChangeInput}
            name="date"
            type="date"
            value={inputHomeState.date.value}
            err={inputHomeState.date.err}
          >
            <img
              src={theme === "dark" ? calendarIconDark : calendarIconLight}
              alt="calendar Icon"
            />
          </DateSelector>
          <DateSelector
            // onHandleChange={handleChangeInput}
            onChangeInput={handleChangeInput}
            name="time"
            type="time"
            value={inputHomeState.time.value}
            err={inputHomeState.time.err}
          >
            <img
              src={theme === "dark" ? clockIconDark : clockIconLight}
              alt="calendar Icon"
            />
          </DateSelector>
        </div>
        <ErrorList iterator={ERROR_MESSAGES_HOME} />

        <Button
          className="addBtn w-full p-4 rounded-lg"
          onClick={handleSendRequest}
          img={isEdit ? editIcon : addIcon}
          alt="add icon"
        >
          {isEdit ? t("Edit").toUpperCase() : t("Add").toUpperCase()}
        </Button>
      </form>
    </dialog>
  );
}
