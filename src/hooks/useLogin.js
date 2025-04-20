import { useContext } from "react";
import { Context } from "../ContextProvider";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import useAuth from "./useAuth.js";

let ERROR_MESSAGES_LOGIN = [];
export default function useLogin() {
  const { t } = useTranslation();
  const { navigateRedirector } = useAuth();
  const navigate = useNavigate();
  const { inputLoginSignupPage, resetInputLoginSignupPage, handleChangeErr } =
    useContext(Context).globalLoginSignupPage;

  function handleResetErrorList() {
    ERROR_MESSAGES_LOGIN = [];
  }

  function handleSendLoginRequest() {
    handleResetErrorList();
    const userName = inputLoginSignupPage.userName.value;
    const password = inputLoginSignupPage.password.value;

    let err = false;

    if (!userName) {
      handleChangeErr("userName");
      err = true;
    }
    if (!password) {
      handleChangeErr("password");
      err = true;
    }

    if (err) {
      ERROR_MESSAGES_LOGIN.push(t("Enter all fields"));
      return;
    }
    const user = { userName, password };
    handlePushLoginUser(user);
  }

  async function handlePushLoginUser(user) {
    try {
      const response = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });
      const data = await response.json();

      if (!response.ok) {
        handleChangeErr(data.err);
        ERROR_MESSAGES_LOGIN.push(data.msg);
        return console.error("Error in fetching user:", data.msg);
      }

      localStorage.setItem("token", data.token);
      resetInputLoginSignupPage();
      navigateRedirector("/");
    } catch (err) {
      return console.error("Error in fetch:", err);
    }
  }

  return { handleSendLoginRequest, ERROR_MESSAGES_LOGIN, handleResetErrorList };
}
