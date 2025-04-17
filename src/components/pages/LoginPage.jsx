import { Link } from "react-router-dom";
import Header from "../Header.jsx";
import Button from "../elements/Button.jsx";
import Label from "../elements/composite_elements/Label.jsx";
import { useContext } from "react";
import { Context } from "../../ContextProvider.jsx";
import ErrorList from "../lists/ErrorList.jsx";
import DialogAlert from "../modal/DialogAlert.jsx";
import useLogin from "../../hooks/useLogin.js";
import { useTranslation } from "react-i18next";

export default function LoginPage() {
  const { t } = useTranslation();
  const { alertState } = useContext(Context).globalProjectState;
  const { resetInputLoginSignupPage, inputLoginSignupPage, handleChangeInput } =
    useContext(Context).globalLoginSignupPage;

  const { handleSendLoginRequest, ERROR_MESSAGES_LOGIN, handleResetErrorList } =
    useLogin();

  return (
    <>
      <DialogAlert className={`${alertState ? "visible" : "invisible"}`}>
        {t("Logged in").toUpperCase()}
      </DialogAlert>
      <Header />
      <main className="flex flex-col justify-center items-center gap-7">
        <h1 className="text-3xl font-extrabold ">{t("Login").toUpperCase()}</h1>
        <Label
          placeholder={t("Enter your username")}
          label={t("Username")}
          onChange={handleChangeInput}
          name="userName"
          err={inputLoginSignupPage.userName.err}
        />
        <Label
          placeholder={t("Enter your password")}
          label={t("Password")}
          onChange={handleChangeInput}
          name="password"
          type="password"
          err={inputLoginSignupPage.password.err}
        />
        <ErrorList iterator={ERROR_MESSAGES_LOGIN} />
        <Button
          className="addBtn w-full p-4 rounded-lg "
          onClick={handleSendLoginRequest}
        >
          {t("Login").toUpperCase()}
        </Button>
        <Link
          to="/signup"
          className="text-text2 dark:text-text2Dark text-sm "
          onClick={() => {
            handleResetErrorList();
            resetInputLoginSignupPage();
          }}
        >
          {t("Not registered yet?")}{" "}
          <span className="text-icon dark:text-iconDark ">{t("Sign up")}</span>
        </Link>
      </main>
    </>
  );
}
