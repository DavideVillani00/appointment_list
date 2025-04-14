import iconFilterLight from "../assets/icons/beautyIcons/icon-filter-light-27.png";
import iconFilterDark from "../assets/icons/beautyIcons/icon-filter-dark-27.png";
import iconSearchLight from "../assets/icons/beautyIcons/icon-search-light-27.png";
import iconSearchDark from "../assets/icons/beautyIcons/icon-search-dark-27.png";
import userIconLight from "../assets/icons/beautyIcons/icon-user-light-27.png";
import userIconDark from "../assets/icons/beautyIcons/icon-user-dark-27.png";
import addIcon from "../assets/icons/beautyIcons/icon-add-27.png";
import calendarIconLight from "../assets/icons/beautyIcons/icon-calendar-light-27.png";
import calendarIconDark from "../assets/icons/beautyIcons/icon-calendar-dark-27.png";

import { useContext, useState, useEffect } from "react";
import { Context } from "../ContextProvider.jsx";
import Input from "./elements/Input.jsx";
import useDialogNew from "../hooks/useDialogNew.js";
import Select from "./elements/Select.jsx";
import DateSelector from "./elements/DateSelector.jsx";
import Button from "./elements/Button.jsx";
import useSorter from "../hooks/useSorter.js";
import OptionUsersName from "./lists/OptionUsersName.jsx";

export default function TopMain() {
  const { search, handleChangeFilters } = useContext(Context);
  const { usersList, userState } = useContext(Context).globalProjectState;
  const [appointmentsList, setAppointmentsList] = useState([]);

  const { theme } = useContext(Context).globalThemeState;
  const { handleOpenDialog, handleChangeInput, inputState } = useDialogNew();
  const { appointmentCompleted, appointmentSortered, appointmentUncompleted } =
    useSorter().sort(appointmentsList);

  async function getAllProjects() {
    try {
      const response = await fetch("http://localhost:3000/api/appointments", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      if (response.ok) setAppointmentsList(data);
    } catch (err) {
      console.error("Error in fetch:", err);
    }
  }
  useEffect(() => {
    getAllProjects();
  }, []);

  return (
    <>
      <div className="mt-3 p-3 flex flex-col gap-4  items-center justify-center">
        <Button
          className="w-full addBtn p-[18px] rounded-lg md:flex-3/5"
          img={addIcon}
          onClick={() => handleOpenDialog()}
          alt="add icon"
        >
          ADD
        </Button>
        <div className="md:flex-2/5 w-full flex gap-2 justify-center items-center ">
          <Input
            classContainer=" w-full py-0.5 "
            img={theme === "dark" ? iconSearchDark : iconSearchLight}
            alt="search glass icon"
            classImg="top-4 left-3"
            classInput="px-5 "
            type="text"
            placeholder="Search"
            value={search}
            onHandleChange={handleChangeFilters}
            name="searchTitle"
          />
          <DateSelector
            onChangeInput={handleChangeInput}
            name="inputDate"
            type="date"
            value={inputState.inputDate.value}
            err={inputState.inputDate.err}
            onHandleChange={handleChangeFilters}
          >
            <img
              src={theme === "dark" ? calendarIconDark : calendarIconLight}
              alt="calendar Icon"
            />
          </DateSelector>
        </div>
        {userState.role === "admin" && (
          <Select
            img={theme === "dark" ? userIconDark : userIconLight}
            def="All"
            className="rounded-lg text-lg py-[18px] w-full"
            onHandleChange={handleChangeFilters}
            name="userName"
            alt="user icon"
          >
            <OptionUsersName users={usersList} allOption={true} />
          </Select>
        )}
      </div>
      <div className="mt-1 p-3 flex flex-col gap-5 md:flex-row md:justify-center items-center">
        <div className="flex justify-center gap-4 text-text2 dark:text-text2Dark">
          <p>Total: {appointmentSortered.length}</p>
          <span className=" w-[2px] h-auto  bg-divider dark:bg-dividerDark "></span>
          <p>Completed: {appointmentCompleted.length}</p>
          <span className=" w-[2px] h-auto  bg-divider dark:bg-dividerDark "></span>
          <p>Uncompleted: {appointmentUncompleted.length}</p>
        </div>

        <Select
          img={theme === "dark" ? iconFilterDark : iconFilterLight}
          alt="filter icon"
          className="w-60 py-3 rounded-2xl "
          def="All"
          name="check"
          onHandleChange={handleChangeFilters}
        >
          <option>All</option>
          <option>Completed</option>
          <option>Uncompleted</option>
        </Select>

        <hr />
      </div>
    </>
  );
}
