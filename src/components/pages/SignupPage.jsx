import { useContext } from "react";

import Header from "../Header.jsx";
import Button from "../elements/Button.jsx";
import Label from "../elements/composite_elements/Label.jsx";
import DialogAlert from "../modal/DialogAlert.jsx";
import ErrorList from "../lists/ErrorList.jsx";
import useSignup from "../../hooks/useSignup.js";
import { Context } from "../../ContextProvider.jsx";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function SignupPage() {
  const { t } = useTranslation();
  const { alertState } = useContext(Context).globalProjectState;
  const {
    inputLoginSignupPage,
    resetInputLoginSignupPage,
    handleChangeInput,
    handleChangeSelect,
  } = useContext(Context).globalLoginSignupPage;
  const {
    handleSendSignupRequest,
    ERROR_MESSAGES_SIGNUP,
    handleResetErrorList,
  } = useSignup();

  return (
    <>
      <DialogAlert className={`${alertState ? "visible" : "invisible"}`}>
        {t("Registration successful").toUpperCase()}
      </DialogAlert>
      <Header />

      <h1 className="text-3xl font-extrabold text-center">
        {t("Sign up").toUpperCase()}
      </h1>
      <main className="flex flex-col justify-center items-center gap-7 md:gap-5">
        <Label
          placeholder={t("Enter your username")}
          label={t("Username")}
          onChange={handleChangeInput}
          name="userName"
          err={inputLoginSignupPage.userName.err}
        />
        <Label
          placeholder={t("Enter your email")}
          label={t("Email")}
          onChange={handleChangeInput}
          name="email"
          err={inputLoginSignupPage.email.err}
        />
        <Label
          placeholder={t("Enter your password")}
          label={t("Password")}
          onChange={handleChangeInput}
          name="password"
          type="password"
          err={inputLoginSignupPage.password.err}
        />
        <div className="flex flex-col w-full md:flex-row  gap-5">
          <Label
            placeholder={t("Enter your name")}
            label={t("Name")}
            onChange={handleChangeInput}
            name="name"
            err={inputLoginSignupPage.name.err}
          />
          <Label
            placeholder={t("Enter your surname")}
            label={t("Surname")}
            onChange={handleChangeInput}
            name="surname"
            err={inputLoginSignupPage.surname.err}
          />
        </div>
        <div className="flex flex-col w-full md:flex-row  gap-5">
          <Label
            placeholder={t("Enter your gender")}
            label={t("Gender")}
            def={t("Enter your gender")}
            onHandleChange={(name, value) => {
              handleChangeSelect(name, value);
            }}
            name="gender"
            err={inputLoginSignupPage.gender.err}
          >
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </Label>
          <Label
            placeholder={t("Enter your company")}
            label={t("Company")}
            onChange={handleChangeInput}
            name="company"
            err={inputLoginSignupPage.company.err}
          />
        </div>
        <ErrorList iterator={ERROR_MESSAGES_SIGNUP} />

        <Button
          className="addBtn w-full p-4 rounded-lg"
          onClick={handleSendSignupRequest}
        >
          {t("Sign up").toUpperCase()}
        </Button>
        <Link
          to="/login"
          className="text-text2 dark:text-text2Dark text-sm"
          onClick={() => {
            handleResetErrorList();
            resetInputLoginSignupPage();
          }}
        >
          {t("Already have an account?")}{" "}
          <span className="text-icon dark:text-iconDark">{t("Login")}</span>
        </Link>
      </main>
    </>
  );
}
