import iconFilterLight from "../assets/icons/beautyIcons/icon-filter-light-27.png";
import iconFilterDark from "../assets/icons/beautyIcons/icon-filter-dark-27.png";
import userIconLight from "../assets/icons/beautyIcons/icon-user-light-27.png";
import userIconDark from "../assets/icons/beautyIcons/icon-user-dark-27.png";
import addIcon from "../assets/icons/beautyIcons/icon-add-27.png";

import { useContext } from "react";
import { Context } from "../ContextProvider.jsx";
import Input from "./elements/Input.jsx";
import Select from "./elements/Select.jsx";
import Button from "./elements/Button.jsx";
import OptionUsersName from "./lists/OptionUsersName.jsx";
import useDialogUser from "../hooks/useDialogUser.js";

export default function TopAdminPage() {
  const { theme } = useContext(Context).globalThemeState;
  const { usersList } = useContext(Context).globalProjectState;
  const { handleChangeFilterAdmin } = useContext(Context).globalAdminPage;
  const { handleOpenModalUser } = useDialogUser();
  return (
    <>
      <div className="mt-3 p-3 flex flex-col gap-4 md:flex-row items-center justify-center">
        <Button
          className="w-full addBtn p-[18px] rounded-lg md:flex-3/5"
          img={addIcon}
          onClick={() => handleOpenModalUser()}
          alt="add icon"
        >
          ADD
        </Button>
        <div className="md:flex-2/5 w-full flex gap-2 justify-center items-center ">
          <Select
            img={theme === "dark" ? userIconDark : userIconLight}
            def="All"
            className="rounded-lg text-lg py-[18px] w-full"
            onHandleChange={handleChangeFilterAdmin}
            name="userName"
            alt="user icon"
          >
            <OptionUsersName users={usersList} allOption={true} />
          </Select>
        </div>
      </div>
      <div className="mt-1 p-3 flex flex-col gap-5 md:flex-row md:justify-center items-center">
        <div className="flex justify-center gap-4 text-text2 dark:text-text2Dark">
          <p>Total subscribers: {usersList.length}</p>
        </div>

        <Select
          img={theme === "dark" ? iconFilterDark : iconFilterLight}
          alt="filter icon"
          className="w-60 py-3 rounded-2xl "
          def="All"
          name="role"
          onHandleChange={handleChangeFilterAdmin}
        >
          <option>All</option>
          <option>Admin</option>
          <option>User</option>
        </Select>
        <hr />
      </div>
    </>
  );
}
