import { Link } from "react-router-dom";
import Header from "../Header.jsx";
import Button from "../elements/Button.jsx";
import Label from "../elements/composite_elements/Label.jsx";
import { useContext } from "react";
import { Context } from "../../ContextProvider.jsx";
import ErrorList from "../lists/ErrorList.jsx";
import DialogAlert from "../modal/DialogAlert.jsx";
import useLogin from "../../hooks/useLogin.js";

export default function LoginPage() {
  const { alertState } = useContext(Context).globalProjectState;
  const { resetInputLoginSignupPage, inputLoginSignupPage, handleChangeInput } =
    useContext(Context).globalLoginSignupPage;

  const { handleSendLoginRequest, ERROR_MESSAGES_LOGIN, handleResetErrorList } =
    useLogin();

  return (
    <>
      <DialogAlert className={`${alertState ? "visible" : "invisible"}`}>
        LOGGED IN
      </DialogAlert>
      <Header />
      <main className="flex flex-col justify-center items-center gap-7">
        <h1 className="text-3xl font-extrabold ">LOGIN</h1>
        <Label
          placeholder="Enter your user-name"
          label="UserName"
          onChange={handleChangeInput}
          name="userName"
          err={inputLoginSignupPage.userName.err}
        />
        <Label
          placeholder="Enter your password"
          label="Password"
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
          LOGIN
        </Button>
        <Link
          to="/signup"
          className="text-text2 dark:text-text2Dark text-sm "
          onClick={() => {
            handleResetErrorList();
            resetInputLoginSignupPage();
          }}
        >
          Not registered?{" "}
          <span className="text-icon dark:text-iconDark ">Sign up</span>
        </Link>
      </main>
    </>
  );
}
