import iconFilterLight from "../assets/icons/beautyIcons/icon-filter-light-27.png";
import iconFilterDark from "../assets/icons/beautyIcons/icon-filter-dark-27.png";
import userIconLight from "../assets/icons/beautyIcons/icon-user-light-27.png";
import userIconDark from "../assets/icons/beautyIcons/icon-user-dark-27.png";
import addIcon from "../assets/icons/beautyIcons/icon-add-27.png";

import { useContext } from "react";
import { Context } from "../ContextProvider.jsx";
import Select from "./elements/Select.jsx";
import Button from "./elements/Button.jsx";
import OptionUsersName from "./lists/OptionUsersName.jsx";
import useModalUser from "../hooks/modal/useModalUser.js";
import { useTranslation } from "react-i18next";

export default function TopAdminPage() {
  const { t } = useTranslation();
  const { theme } = useContext(Context).globalThemeState;
  const { usersList } = useContext(Context).globalProjectState;
  const { handleChangeFilterAdmin, adminFilter } =
    useContext(Context).globalAdminPage;
  const { handleOpenModalUser } = useModalUser();
  return (
    <>
      <div className="mt-3 p-3 flex flex-col gap-4 md:flex-row items-center justify-center">
        <Button
          className="w-full addBtn p-[18px] rounded-lg md:flex-3/5"
          img={addIcon}
          onClick={() => handleOpenModalUser()}
          alt="add icon"
        >
          {t("Add").toUpperCase()}
        </Button>
        <div className="md:flex-2/5 w-full flex gap-2 justify-center items-center ">
          <Select
            img={theme === "dark" ? userIconDark : userIconLight}
            def={t(adminFilter.userName) || t("All")}
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
          <p>
            {t("Total")} : <span className="font-bold">{usersList.length}</span>
          </p>
          <p>
            {t("Admins")} :{" "}
            <span className="font-bold">
              {usersList.filter((u) => u.role === "Admin").length}
            </span>
          </p>
          <p>
            {t("Users")} :{" "}
            <span className="font-bold">
              {usersList.filter((u) => u.role === "User").length}
            </span>
          </p>
        </div>

        <Select
          img={theme === "dark" ? iconFilterDark : iconFilterLight}
          alt="filter icon"
          className="w-60 py-3 rounded-2xl "
          def={(adminFilter.role && t(`${adminFilter.role}s`)) || t("All")}
          name="role"
          onHandleChange={handleChangeFilterAdmin}
        >
          <option>{t("All")}</option>
          <option>{t("Admins")}</option>
          <option>{t("Users")}</option>
        </Select>
        <hr />
      </div>
    </>
  );
}
