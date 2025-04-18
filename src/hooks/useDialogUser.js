import { useContext } from "react";
import { Context } from "../ContextProvider";
import useAuth from "./useAuth";
import { useTranslation } from "react-i18next";

let ERROR_MESSAGES_ADMIN = [];
export default function useDialogUser() {
  const {
    dialogUser,
    setIsEdit,
    resetInputAdminState,
    setInputAdminState,
    inputAdminState,
    userIdSelected,
    isEdit,
  } = useContext(Context).globalAdminPage;
  const { downloadUsersList } = useAuth();
  const { t } = useTranslation();

  function handleOpenModalUser(id = null) {
    if (id) {
      userIdSelected.current = id;
      handleUploadUserInfo();
      setIsEdit(true);
    }
    dialogUser.current.showModal();
    document.documentElement.classList.add("overflow-hidden");
  }
  function handleCloseModalUser() {
    ERROR_MESSAGES_ADMIN = [];
    downloadUsersList();
    resetInputAdminState();
    dialogUser.current.close();
    document.documentElement.classList.remove("overflow-hidden");
  }

  function handleChangeInput(e) {
    const { name, value } = e.target;
    setInputAdminState((preState) => {
      return {
        ...preState,
        [name]: { value, err: false },
      };
    });
  }

  function handleChangeSelect(name, value) {
    setInputAdminState((preState) => {
      return { ...preState, [name]: { value, err: false } };
    });
  }

  function handleChangeErr(name) {
    setInputAdminState((preState) => {
      return {
        ...preState,
        [name]: { ...preState[name], err: true },
      };
    });
  }

  function handleSendRequest() {
    ERROR_MESSAGES_ADMIN = [];
    const role = inputAdminState.role.value;
    const userName = inputAdminState.userName.value.trim();
    const email = inputAdminState.email.value.trim();
    const password = inputAdminState.password.value.trim();
    const name = inputAdminState.name.value.trim();
    const surname = inputAdminState.surname.value.trim();
    const company = inputAdminState.company.value.trim();
    const gender = inputAdminState.gender.value;

    let err = false;

    const regexMail = /^[\w.-_]+@[\w.-_]+\.[a-zA-Z]{2,}$/;
    const emailValidation = regexMail.test(email);

    const passwordValidation =
      password.length >= 12 &&
      /[A-Z]+/.test(password) &&
      /[a-z]+/.test(password) &&
      /[\d]+/.test(password) &&
      /[\W_]+/.test(password);

    if (!role) {
      handleChangeErr("role");
      err = true;
    }
    if (!userName) {
      handleChangeErr("userName");
      err = true;
    }
    if (!email) {
      handleChangeErr("email");
      err = true;
    }
    if (!password) {
      handleChangeErr("password");
      err = true;
    }
    if (!name) {
      handleChangeErr("name");
      err = true;
    }
    if (!surname) {
      handleChangeErr("surname");
      err = true;
    }
    if (!company) {
      handleChangeErr("company");
      err = true;
    }
    if (!gender) {
      handleChangeErr("gender");
      err = true;
    }
    if (err) ERROR_MESSAGES_ADMIN.push(t("Enter all fields"));

    if (!emailValidation) {
      handleChangeErr("email");
      err = true;
      ERROR_MESSAGES_ADMIN.push(t("Incorrect email format"));
    }
    if (!passwordValidation) {
      handleChangeErr("password");
      err = true;
      ERROR_MESSAGES_ADMIN.push(
        t(
          "Password must contain uppercase, lowercase, numbers, special characters and must be at least 12 characters long"
        )
      );
    }

    if (err) return;
    handlePushUser();
  }

  async function handleUploadUserInfo() {
    try {
      const response = await fetch(
        `http://localhost:3000/api/users/search/${userIdSelected.current}`,
        { method: "GET", headers: { "Content-Type": "application/json" } }
      );
      const data = await response.json();
      if (!response.ok) {
        return console.error("Error in fetching user:", data.msg);
      }
      const {
        id,
        role,
        userName,
        email,
        password,
        name,
        surname,
        gender,
        company,
      } = data;
      setInputAdminState({
        id: { value: id, err: false },
        role: { value: role, err: false },
        userName: { value: userName, err: false },
        email: { value: email, err: false },
        password: { value: password, err: false },
        name: { value: name, err: false },
        surname: { value: surname, err: false },
        company: { value: company, err: false },
        gender: { value: gender, err: false },
      });
    } catch (err) {
      console.error("Error in fetch", err);
    }
  }

  async function handlePushUser() {
    try {
      const obj = {
        id: inputAdminState.id.value,
        role: inputAdminState.role.value,
        userName: inputAdminState.userName.value,
        email: inputAdminState.email.value,
        password: inputAdminState.password.value,
        name: inputAdminState.name.value,
        surname: inputAdminState.surname.value,
        company: inputAdminState.company.value,
        gender: inputAdminState.gender.value,
      };
      const url = isEdit
        ? "http://localhost:3000/api/users/edit"
        : "http://localhost:3000/api/users/add";
      const method = isEdit ? "PUT" : "POST";
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(obj),
      });
      const data = await response.json();
      if (!response.ok) {
        handleChangeErr(data.err);
        if (data.err === "userName") {
          ERROR_MESSAGES_ADMIN.push(t("Username is already taken"));
        } else if (data.err === "email") {
          ERROR_MESSAGES_ADMIN.push(t("Email is already taken"));
        }
        return console.error("Error in fetching add/edit user:", data.msg);
      }

      handleCloseModalUser();
    } catch (err) {
      return console.error("Error in fetch:", err);
    }
  }

  return {
    handleCloseModalUser,
    handleOpenModalUser,
    handleChangeInput,
    handleChangeSelect,
    handleSendRequest,
    ERROR_MESSAGES_ADMIN,
  };
}
