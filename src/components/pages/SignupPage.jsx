import { useContext } from "react";

import Header from "../Header.jsx";
import Button from "../elements/Button.jsx";
import Label from "../elements/composite_elements/Label.jsx";
import DialogAlert from "../modal/DialogAlert.jsx";
import ErrorList from "../lists/ErrorList.jsx";
import useSignup from "../../hooks/useSignup.js";
import { Context } from "../../ContextProvider.jsx";
import { Link } from "react-router-dom";

export default function SignupPage() {
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
        REGISTRATION SUCCESSFUL
      </DialogAlert>
      <Header />

      <h1 className="text-3xl font-extrabold text-center">SIGNUP</h1>
      <main className="flex flex-col justify-center items-center gap-7 md:gap-5">
        <Label
          placeholder="Enter your user-name"
          label="UserName"
          onChange={handleChangeInput}
          name="userName"
          err={inputLoginSignupPage.userName.err}
        />
        <Label
          placeholder="Enter your email"
          label="Email"
          onChange={handleChangeInput}
          name="email"
          err={inputLoginSignupPage.email.err}
        />
        <Label
          placeholder="Enter your password"
          label="Password"
          onChange={handleChangeInput}
          name="password"
          type="password"
          err={inputLoginSignupPage.password.err}
        />
        <div className="flex flex-col w-full md:flex-row  gap-5">
          <Label
            placeholder="Enter your name"
            label="Name"
            onChange={handleChangeInput}
            name="name"
            err={inputLoginSignupPage.name.err}
          />
          <Label
            placeholder="Enter your surname"
            label="Surname"
            onChange={handleChangeInput}
            name="surname"
            err={inputLoginSignupPage.surname.err}
          />
        </div>
        <div className="flex flex-col w-full md:flex-row  gap-5">
          <Label
            placeholder="Enter your gender"
            label="Gender"
            def="Enter your gender"
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
            placeholder="Enter your company"
            label="Company"
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
          SIGNUP
        </Button>
        <Link
          to="/login"
          className="text-text2 dark:text-text2Dark text-sm"
          onClick={() => {
            handleResetErrorList();
            resetInputLoginSignupPage();
          }}
        >
          Already registered?{" "}
          <span className="text-icon dark:text-iconDark">Log in</span>
        </Link>
      </main>
    </>
  );
}
