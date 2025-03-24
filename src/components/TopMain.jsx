import Input from "./Input.jsx";
import iconFilterLight from "../assets/icon-filter-light-25.png";
import iconFilterDark from "../assets/icon-filter-dark-25.png";
import iconSearchLight from "../assets/icon-search-light-25.png";
import iconSearchDark from "../assets/icon-search-dark-25.png";
import { useContext } from "react";
import { Context } from "../ContextProvider.jsx";

export default function TopMain() {
  const {
    theme,
    dialog,
    appointmentCompleted,
    appointmentUncompleted,
    handleChangeFilter,
    projectState,
    search,
    handleChangeSearch,
  } = useContext(Context);

  function handleOpenDialog() {
    dialog.current.showModal();
    document.documentElement.classList.add("overflow-hidden");
  }
  let filterDefault = projectState.filterState.split("");
  filterDefault[0] = filterDefault[0].toUpperCase();
  filterDefault = filterDefault.join("");

  return (
    <>
      <div className="mt-3 p-3 flex flex-col gap-2 md:flex-row ">
        <Input
          type="button"
          value="Add +"
          className="md:flex-2/3"
          onClick={handleOpenDialog}
        />
        <div className="md:flex-1/3 relative">
          <img
            src={theme === "dark" ? iconSearchDark : iconSearchLight}
            alt=""
            className="absolute top-4 left-3"
          />
          <Input
            type="text"
            placeholder="Search"
            className="w-full px-5 pl-13"
            value={search}
            onChange={handleChangeSearch}
          />
        </div>
      </div>
      <div className="mt-1 p-3 flex flex-col gap-4 md:flex-row md:justify-center items-center">
        <div className="flex justify-center gap-4 text-textLight/70 dark:text-textDark/70 ">
          <p>
            Total: {appointmentCompleted.length + appointmentUncompleted.length}
            ;
          </p>
          <p>Completed: {appointmentCompleted.length};</p>
          <p>Uncompleted: {appointmentUncompleted.length};</p>
        </div>
        <div className="self-center relative ">
          <img
            src={theme === "dark" ? iconFilterDark : iconFilterLight}
            className="mr-2 absolute top-2 left-4"
          ></img>
          <select
            className="bg-bgCardLight hover:shadow-[0_0_5px_black] dark:bg-bgCardDark p-2 pl-12 dark:hover:shadow-[0_0_5px_white] rounded-2xl"
            onChange={(e) => handleChangeFilter(e.target.value.toLowerCase())}
            defaultValue={filterDefault}
          >
            <option>All</option>
            <option>Completed</option>
            <option>Uncompleted</option>
          </select>
        </div>

        <hr />
      </div>
    </>
  );
}
