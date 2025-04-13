import { Link } from "react-router-dom";
import Header from "../Header.jsx";
import Button from "../elements/Button.jsx";
import Label from "../elements/composite_elements/Label.jsx";
import { useEffect, useContext } from "react";
import { Context } from "../../ContextProvider.jsx";
import ErrorList from "../lists/ErrorList.jsx";
import DialogAlert from "../modal/DialogAlert.jsx";

export default function LoginPage() {
  const { ERROR_MESSAGES, handleSubmitLogin } =
    useContext(Context).globalSignupState;
  const { alertState } = useContext(Context);
  const { handleReset } = useContext(Context).globalSignupState;

  useEffect(() => {
    handleReset();
  }, []);
  return (
    <>
      <DialogAlert className={`${alertState ? "visible" : "invisible"}`}>
        LOGGED IN
      </DialogAlert>
      <Header />
      <main className="flex flex-col justify-center items-center gap-7">
        <h1 className="text-3xl font-extrabold ">LOGIN</h1>
        <Label placeholder="Enter your userName" value="UserName" />
        <Label placeholder="Enter your password" value="Password" />
        <ErrorList iterator={ERROR_MESSAGES} />
        <Button
          className="addBtn w-full p-4 rounded-lg "
          onClick={handleSubmitLogin}
        >
          LOGIN
        </Button>
        <Link to="/signup" className="text-text2 dark:text-text2Dark text-sm ">
          Not registered?{" "}
          <span className="text-icon dark:text-iconDark ">Sign up</span>
        </Link>
      </main>
    </>
  );
}
