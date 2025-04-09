import iconFilterLight from "../assets/icons/beautyIcons/icon-filter-light-27.png";
import iconFilterDark from "../assets/icons/beautyIcons/icon-filter-dark-27.png";
import iconSearchLight from "../assets/icons/beautyIcons/icon-search-light-27.png";
import iconSearchDark from "../assets/icons/beautyIcons/icon-search-dark-27.png";
import addIcon from "../assets/icons/beautyIcons/icon-add-27.png";

import { useContext } from "react";
import { Context } from "../ContextProvider.jsx";
import Input from "./elements/Input.jsx";
import Select from "./elements/Select.jsx";
import Button from "./elements/Button.jsx";

export default function TopAdminPage() {
  const { theme } = useContext(Context).globalThemeState;
  return (
    <>
      <div className="mt-3 p-3 flex flex-col gap-4  items-center justify-center">
        <Button
          className="w-full addBtn p-[18px] rounded-lg md:flex-3/5"
          img={addIcon}
          //   onClick={handleOpenDialog}
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
            placeholder="Search for Username or id"
            // value={search}
            // onChange={handleChangeSearch}
          />
        </div>
      </div>
      <div className="mt-1 p-3 flex flex-col gap-5 md:flex-row md:justify-center items-center">
        <div className="flex justify-center gap-4 text-text2 dark:text-text2Dark">
          <p>Total subscribers: {5}</p>
        </div>

        <Select
          img={theme === "dark" ? iconFilterDark : iconFilterLight}
          //   onChange={handleChangeFilter}
          alt="filter icon"
          className="w-60 py-3 rounded-2xl "
          def="All"
        >
          <option>All</option>
          <option>Admin</option>
          <option>Users</option>
        </Select>

        <hr />
      </div>
    </>
  );
}
