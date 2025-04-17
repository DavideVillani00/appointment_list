import iconCloseLight from "../../assets/icons/toggleIcons/icon-close-light-48.png";
import iconCloseDark from "../../assets/icons/toggleIcons/icon-close-dark-48.png";
import addIcon from "../../assets/icons/beautyIcons/icon-add-27.png";
import editIcon from "../../assets/icons/beautyIcons/icon-edit-27.png";
import { Context } from "../../ContextProvider.jsx";
import { useContext } from "react";

import Button from "../elements/Button.jsx";
import useDialogUser from "../../hooks/useDialogUser.js";
import ErrorList from "../lists/ErrorList.jsx";
import Label from "../elements/composite_elements/Label.jsx";
import { useTranslation } from "react-i18next";

export default function DialogUser() {
  const { t } = useTranslation();
  const { theme } = useContext(Context).globalThemeState;
  const { dialogUser, isEdit, inputAdminState } =
    useContext(Context).globalAdminPage;

  const {
    handleCloseModalUser,
    handleChangeInput,
    handleChangeSelect,
    handleSendRequest,
    ERROR_MESSAGES_ADMIN,
  } = useDialogUser();

  return (
    <dialog
      ref={dialogUser}
      className="  backdrop:backdrop-blur-xs  w-8/9 p-5 md:p-8 rounded-2xl fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-lg border-4 cardModalStyle text-text1"
    >
      <div className="flex justify-between items-center ">
        <h1 className="text-3xl font-bold text-text1 dark:text-text1Dark">
          {isEdit ? t("Edit user") : t("New user")}
        </h1>
        <img
          src={theme === "dark" ? iconCloseDark : iconCloseLight}
          className="cursor-pointer "
          onClick={handleCloseModalUser}
          alt="X icon for close"
        />
      </div>

      <form className="flex flex-col gap-3 md:p-4 ">
        <span className="bg-divider dark:bg-dividerDark w-full h-0.5 my-2"></span>
        <div className="flex flex-col w-full md:flex-row  gap-3 md:gap-5">
          <Label
            placeholder={t("Enter a role")}
            label={t("Role")}
            def={inputAdminState.role.value || t("Enter a role")}
            name="role"
            value={inputAdminState.role.value}
            err={inputAdminState.role.err}
            onHandleChange={(name, value) => handleChangeSelect(name, value)}
          >
            <option>Admin</option>
            <option>User</option>
          </Label>
          <Label
            type="text"
            name="userName"
            placeholder={t("Enter an username")}
            value={inputAdminState.userName.value}
            onChange={handleChangeInput}
            err={inputAdminState.userName.err}
            label={t("Username")}
          />
        </div>

        <div className="flex flex-col w-full md:flex-row md:gap-5 gap-3">
          <Label
            type="text"
            name="email"
            placeholder={t("Enter an email")}
            value={inputAdminState.email.value}
            onChange={handleChangeInput}
            err={inputAdminState.email.err}
            label={t("Email")}
          />
          <Label
            type="password"
            name="password"
            placeholder={t("Enter a password")}
            value={inputAdminState.password.value}
            onChange={handleChangeInput}
            err={inputAdminState.password.err}
            label={t("Password")}
          />
        </div>
        <div className="flex flex-col w-full md:flex-row  gap-3 md:gap-5">
          <Label
            type="text"
            name="name"
            placeholder={t("Enter a first name")}
            value={inputAdminState.name.value}
            onChange={handleChangeInput}
            err={inputAdminState.name.err}
            label={t("First name")}
          />
          <Label
            type="text"
            name="surname"
            placeholder={t("Enter a last name")}
            value={inputAdminState.surname.value}
            onChange={handleChangeInput}
            err={inputAdminState.surname.err}
            label={t("Last name")}
          />
        </div>
        <div className="flex flex-col w-full md:flex-row  gap-3 md:gap-5">
          <Label
            className="rounded-lg text-lg py-[17px]"
            name="gender"
            def={t(inputAdminState.gender.value) || t("Enter a gender")}
            placeholder={t("Enter a gender")}
            value={inputAdminState.gender.value}
            err={inputAdminState.gender.err}
            onHandleChange={(name, value) => handleChangeSelect(name, value)}
            label={t("Gender")}
          >
            <option>{t("Male")}</option>
            <option>{t("Female")}</option>
            <option>{t("Other")}</option>
          </Label>
          <Label
            type="text"
            name="company"
            placeholder={t("Enter a company")}
            value={inputAdminState.company.value}
            onChange={handleChangeInput}
            err={inputAdminState.company.err}
            label={t("Company")}
          />
        </div>

        <ErrorList iterator={ERROR_MESSAGES_ADMIN} />
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
