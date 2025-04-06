import iconFilterLight from "../assets/icons/beautyIcons/icon-filter-light-27.png";
import iconFilterDark from "../assets/icons/beautyIcons/icon-filter-dark-27.png";
import iconSearchLight from "../assets/icons/beautyIcons/icon-search-light-27.png";
import iconSearchDark from "../assets/icons/beautyIcons/icon-search-dark-27.png";
import addIcon from "../assets/icons/beautyIcons/icon-add-27.png";

import { useContext } from "react";
import { Context } from "../ContextProvider.jsx";
import Input from "./elements/Input.jsx";
import useSorterList from "../hooks/useSorterList.js";
import useDialogNew from "../hooks/useDialogNew.js";
import Select from "./elements/Select.jsx";
import Button from "./elements/Button.jsx";

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
      <div className="mt-3 p-3 flex flex-col gap-4 md:flex-row items-center">
        <Button
          className="w-full addBtn p-[18px] rounded-lg md:flex-2/3"
          img={addIcon}
          onClick={handleOpenDialog}
          alt="add icon"
        >
          ADD
        </Button>

        <Input
          classContainer="md:flex-1/3 w-full "
          img={theme === "dark" ? iconSearchDark : iconSearchLight}
          alt="search glass icon"
          classImg="top-4 left-3"
          classInput="px-5 input "
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
