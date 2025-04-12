import iconFilterLight from "../assets/icons/beautyIcons/icon-filter-light-27.png";
import iconFilterDark from "../assets/icons/beautyIcons/icon-filter-dark-27.png";
import iconSearchLight from "../assets/icons/beautyIcons/icon-search-light-27.png";
import iconSearchDark from "../assets/icons/beautyIcons/icon-search-dark-27.png";
import userIconLight from "../assets/icons/beautyIcons/icon-user-light-27.png";
import userIconDark from "../assets/icons/beautyIcons/icon-user-dark-27.png";
import addIcon from "../assets/icons/beautyIcons/icon-add-27.png";
import calendarIconLight from "../assets/icons/beautyIcons/icon-calendar-light-27.png";
import calendarIconDark from "../assets/icons/beautyIcons/icon-calendar-dark-27.png";

import { useContext } from "react";
import { Context } from "../ContextProvider.jsx";
import Input from "./elements/Input.jsx";
// import useSorterList from "../hooks/useSorterList.js";
import useDialogNew from "../hooks/useDialogNew.js";
import Select from "./elements/Select.jsx";
import DateSelector from "./elements/DateSelector.jsx";
import Button from "./elements/Button.jsx";
import useSorter from "../hooks/useSorter.js";

export default function TopMain() {
  const { search, handleChangeFilters, info } = useContext(Context);

  const { theme } = useContext(Context).globalThemeState;
  // const { appointmentCompleted, appointmentUncompleted } = useSorterList();
  const { appointmentCompleted, appointmentUncompleted } = useSorter();
  // const { handleChangeFilter, projectState } =
  //   useContext(Context).globalProjectState;
  const { handleOpenDialog, handleChangeInput, inputState } = useDialogNew();

  // let filterDefault = projectState.filterState.split("");
  // filterDefault[0] = filterDefault[0].toUpperCase();
  // filterDefault = filterDefault.join("");

  return (
    <>
      <div className="mt-3 p-3 flex flex-col gap-4  items-center justify-center">
        <Button
          className="w-full addBtn p-[18px] rounded-lg md:flex-3/5"
          img={addIcon}
          onClick={handleOpenDialog}
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
          >
            <img
              src={theme === "dark" ? calendarIconDark : calendarIconLight}
              alt="calendar Icon"
            />
          </DateSelector>
        </div>
        {info.admin && (
          <Select
            img={theme === "dark" ? userIconDark : userIconLight}
            def="admin"
            className="rounded-lg text-lg py-[18px] w-full"
          >
            {" "}
            {/* creare dinamicità */}
            <option>pino</option>
            <option>gino</option>
            <option>lino</option>
            <option>tino</option>
            <option>admin</option>
          </Select>
        )}
      </div>
      <div className="mt-1 p-3 flex flex-col gap-5 md:flex-row md:justify-center items-center">
        <div className="flex justify-center gap-4 text-text2 dark:text-text2Dark">
          <p>
            Total: {appointmentCompleted.length + appointmentUncompleted.length}
          </p>
          <span className=" w-[2px] h-auto  bg-divider dark:bg-dividerDark "></span>
          <p>Completed: {appointmentCompleted.length}</p>
          <span className=" w-[2px] h-auto  bg-divider dark:bg-dividerDark "></span>
          <p>Uncompleted: {appointmentUncompleted.length}</p>
        </div>

        <Select
          img={theme === "dark" ? iconFilterDark : iconFilterLight}
          // onChange={handleChangeFilter}
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
