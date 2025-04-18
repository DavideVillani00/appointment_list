import { useContext } from "react";
import { Context } from "../ContextProvider";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

let ERROR_MESSAGES_SIGNUP = [];
export default function useSignup() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { inputLoginSignupPage, resetInputLoginSignupPage, handleChangeErr } =
    useContext(Context).globalLoginSignupPage;

  function handleResetErrorList() {
    ERROR_MESSAGES_SIGNUP = [];
  }
  function handleSendSignupRequest() {
    handleResetErrorList();
    const userName = inputLoginSignupPage.userName.value;
    const email = inputLoginSignupPage.email.value;
    const password = inputLoginSignupPage.password.value;
    const name = inputLoginSignupPage.name.value;
    const surname = inputLoginSignupPage.surname.value;
    const gender = inputLoginSignupPage.gender.value;
    const company = inputLoginSignupPage.company.value;

    const regexMail = /^[\w.-_]+@[\w.-_]+\.[a-zA-Z]{2,}$/;
    const emailValidation = regexMail.test(email);

    const passwordValidation =
      password.length >= 12 &&
      /[A-Z]+/.test(password) &&
      /[a-z]+/.test(password) &&
      /[\d]+/.test(password) &&
      /[\W_]+/.test(password);

    let err = false;
    if (!userName) {
      handleChangeErr("userName");
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
    if (!gender) {
      handleChangeErr("gender");
      err = true;
    }
    if (!company) {
      handleChangeErr("company");
      err = true;
    }
    if (err) ERROR_MESSAGES_SIGNUP.push(t("Enter all fields"));

    if (!emailValidation) {
      handleChangeErr("email");
      err = true;
      ERROR_MESSAGES_SIGNUP.push("Incorrect email format");
    }
    if (!passwordValidation) {
      handleChangeErr("password");
      err = true;
      ERROR_MESSAGES_SIGNUP.push(
        t(
          "password must contain uppercase, lowercase, numbers, special characters and must be at least 12 characters long"
        )
      );
    }
    if (err) {
      return;
    }
    const id = Math.random() * 1000;
    const role = "User";
    const newUser = {
      id,
      role,
      userName,
      email,
      password,
      name,
      surname,
      gender,
      company,
    };
    handlePushSignupUser(newUser);
  }

  async function handlePushSignupUser(newUser) {
    try {
      const response = await fetch("http://localhost:3000/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });
      const data = await response.json();

      if (!response.ok) {
        handleChangeErr(data.err);
        ERROR_MESSAGES_SIGNUP.push(data.msg);
        return console.error("Error in fetching user:", data.msg);
      }

      resetInputLoginSignupPage();
      //   setAlertState(true); //!!
      document.documentElement.classList.add("overflow-hidden");

      setTimeout(() => {
        // setAlertState(false); // !!
        document.documentElement.classList.remove("overflow-hidden");
        navigate("/login");
      }, 1000);
    } catch (err) {
      return console.error("Error in fetch:", err);
    }
  }
  return {
    handleSendSignupRequest,
    ERROR_MESSAGES_SIGNUP,
    handleResetErrorList,
  };
}
