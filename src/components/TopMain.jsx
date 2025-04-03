import Input from "./elements/Input.jsx";
import iconFilterLight from "../assets/icons/beautyIcons/icon-filter-light-25.png";
import iconFilterDark from "../assets/icons/beautyIcons/icon-filter-dark-25.png";
import iconSearchLight from "../assets/icons/beautyIcons/icon-search-light-25.png";
import iconSearchDark from "../assets/icons/beautyIcons/icon-search-dark-25.png";
import { useContext } from "react";
import { Context } from "../ContextProvider.jsx";
import useSorterList from "../hooks/useSorterList.js";
import useDialogNew from "../hooks/useDialogNew.js";

export default function TopMain() {
  const { search, handleChangeSearch } = useContext(Context);

  const { theme } = useContext(Context).globalThemeState;
  const { appointmentCompleted, appointmentUncompleted } = useSorterList();
  const { handleChangeFilter, projectState } =
    useContext(Context).globalProjectState;
  const { handleOpenDialog } = useDialogNew();

  let filterDefault = projectState.filterState.split("");
  filterDefault[0] = filterDefault[0].toUpperCase();
  filterDefault = filterDefault.join("");

  return (
    <>
      <div className="mt-3 p-3 flex flex-col gap-4 md:flex-row ">
        <Input
          type="button"
          value="Add +"
          classContainer="md:flex-2/3"
          classInput="text-xl font-bold inset-shadow-[0px_0px_15px] inset-shadow-green-600 text-green-600/90"
          onClick={handleOpenDialog}
        />
        <Input
          classContainer="md:flex-1/3"
          img={theme === "dark" ? iconSearchDark : iconSearchLight}
          alt="search glass icon"
          classImg="top-4 left-3"
          classInput="px-5"
          type="text"
          placeholder="Search"
          value={search}
          onChange={handleChangeSearch}
        />
      </div>
      <div className="mt-1 p-3 flex flex-col gap-5 md:flex-row md:justify-center items-center">
        <div className="flex justify-center gap-4 text-textLight/70 dark:text-textDark/70 ">
          <p>
            Total: {appointmentCompleted.length + appointmentUncompleted.length}
          </p>
          <p>Completed: {appointmentCompleted.length}</p>
          <p>Uncompleted: {appointmentUncompleted.length}</p>
        </div>
        <div className="self-center relative shadow-md dark:shadow-secondaryBgDark shadow-secondaryBgLight rounded-2xl">
          <img
            src={theme === "dark" ? iconFilterDark : iconFilterLight}
            className="mr-2 absolute top-2 left-4"
            alt="filter icon"
          />
          <div className=" bg-bgCardLight hover:shadow-[0_0_5px_black] dark:bg-bgCardDark p-2 pl-12  dark:hover:shadow-[0_0_5px_white] rounded-2xl">
            <select
              className="bg-bgCardLight  dark:bg-bgCardDark outline-none pr-4"
              onChange={handleChangeFilter}
              defaultValue={filterDefault}
            >
              <option>All</option>
              <option>Completed</option>
              <option>Uncompleted</option>
            </select>
          </div>
        </div>

        <hr />
      </div>
    </>
  );
}
