import iconCloseLight from "../../assets/icons/toggleIcons/icon-close-light-48.png";
import iconCloseDark from "../../assets/icons/toggleIcons/icon-close-dark-48.png";
import addIcon from "../../assets/icons/beautyIcons/icon-add-27.png";
import userIconLight from "../../assets/icons/beautyIcons/icon-user-light-27.png";
import userIconDark from "../../assets/icons/beautyIcons/icon-user-dark-27.png";
import { Context } from "../../ContextProvider.jsx";
import { useContext } from "react";

import Select from "../elements/Select.jsx";
import Input from "../elements/Input.jsx";
import Button from "../elements/Button.jsx";
import useDialogUser from "../../hooks/useDialogUser.js";
import ErrorList from "../lists/ErrorList.jsx";
import Label from "../elements/composite_elements/Label.jsx";

export default function DialogUser() {
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
          {isEdit ? "Edit user" : "New user"}
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
            placeholder="Enter a role"
            label="Role"
            def={inputAdminState.role.value || "Enter a role"}
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
            placeholder="Enter an user-name"
            value={inputAdminState.userName.value}
            onChange={handleChangeInput}
            err={inputAdminState.userName.err}
            label="UserName"
          />
        </div>

        <div className="flex flex-col w-full md:flex-row md:gap-5 gap-3">
          <Label
            type="text"
            name="email"
            placeholder="Enter an email"
            value={inputAdminState.email.value}
            onChange={handleChangeInput}
            err={inputAdminState.email.err}
            label="Email"
          />
          <Label
            type="password"
            name="password"
            placeholder="Enter a password"
            value={inputAdminState.password.value}
            onChange={handleChangeInput}
            err={inputAdminState.password.err}
            label="Password"
          />
        </div>
        <div className="flex flex-col w-full md:flex-row  gap-3 md:gap-5">
          <Label
            type="text"
            name="name"
            placeholder="Enter a name"
            value={inputAdminState.name.value}
            onChange={handleChangeInput}
            err={inputAdminState.name.err}
            label="Name"
          />
          <Label
            type="text"
            name="surname"
            placeholder="Enter an surname"
            value={inputAdminState.surname.value}
            onChange={handleChangeInput}
            err={inputAdminState.surname.err}
            label="Surname"
          />
        </div>
        <div className="flex flex-col w-full md:flex-row  gap-3 md:gap-5">
          <Label
            className="rounded-lg text-lg py-[17px]"
            name="gender"
            def={inputAdminState.gender.value || "Enter a gender"}
            placeholder="Enter a gender"
            value={inputAdminState.gender.value}
            err={inputAdminState.gender.err}
            onHandleChange={(name, value) => handleChangeSelect(name, value)}
            label="Gender"
          >
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </Label>
          <Label
            type="text"
            name="company"
            placeholder="Enter a company"
            value={inputAdminState.company.value}
            onChange={handleChangeInput}
            err={inputAdminState.company.err}
            label="Company"
          />
        </div>

        <ErrorList iterator={ERROR_MESSAGES_ADMIN} />
        <Button
          className="addBtn w-full p-4 rounded-lg"
          onClick={handleSendRequest}
          img={addIcon}
          alt="add icon"
        >
          {isEdit ? "EDIT" : "ADD"}
        </Button>
      </form>
    </dialog>
  );
}
