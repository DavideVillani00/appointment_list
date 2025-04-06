import Input from "./elements/Input.jsx";
import iconFilterLight from "../assets/icons/beautyIcons/icon-filter-light-25.png";
import iconFilterDark from "../assets/icons/beautyIcons/icon-filter-dark-25.png";
import iconSearchLight from "../assets/icons/beautyIcons/icon-search-light-25.png";
import iconSearchDark from "../assets/icons/beautyIcons/icon-search-dark-25.png";
import { useContext } from "react";
import { Context } from "../ContextProvider.jsx";
import useSorterList from "../hooks/useSorterList.js";
import useDialogNew from "../hooks/useDialogNew.js";
import Select from "./elements/Select.jsx";

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
          classInput="text-xl font-bold addBtn"
          onClick={handleOpenDialog}
        />
        <Input
          classContainer="md:flex-1/3  "
          img={theme === "dark" ? iconSearchDark : iconSearchLight}
          alt="search glass icon"
          classImg="top-4 left-3"
          classInput="px-5 input"
          type="text"
          placeholder="Search"
          value={search}
          onChange={handleChangeSearch}
        />
      </div>
      <div className="mt-1 p-3 flex flex-col gap-5 md:flex-row md:justify-center items-center">
        <div className="flex justify-center gap-4 text-text2 dark:text-text2Dark">
          <p>
            Total: {appointmentCompleted.length + appointmentUncompleted.length}
          </p>
          <p>Completed: {appointmentCompleted.length}</p>
          <p>Uncompleted: {appointmentUncompleted.length}</p>
        </div>

        <Select
          img={theme === "dark" ? iconFilterDark : iconFilterLight}
          onChange={handleChangeFilter}
          alt="filter icon"
          className="w-60 py-3 rounded-2xl "
          def={filterDefault}
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
