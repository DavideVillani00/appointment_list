import { useContext, useEffect } from "react";

import Header from "../Header.jsx";
import Button from "../elements/Button.jsx";
import Label from "../elements/composite_elements/Label.jsx";
import { Context } from "../../ContextProvider.jsx";
import ErrorList from "../lists/ErrorList.jsx";
import DialogAlert from "../modal/DialogAlert.jsx";
import { Link } from "react-router-dom";

export default function SignupPage() {
  const {
    handleSubmitSignup,
    ERROR_MESSAGES,
    handleReset,
    inputState,
    handleChange,
  } = useContext(Context).globalSignupState;
  const { alertState } = useContext(Context);

  useEffect(() => {
    handleReset();
  }, []);
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
          onChange={handleChange}
          name="userName"
          err={inputState.userName.err}
        />
        <Label
          placeholder="Enter your email"
          label="Email"
          onChange={handleChange}
          name="email"
          err={inputState.email.err}
        />
        <Label
          placeholder="Enter your password"
          label="Password"
          onChange={handleChange}
          name="password"
          type="password"
          err={inputState.password.err}
        />
        <div className="flex flex-col w-full md:flex-row  gap-5">
          <Label
            placeholder="Enter your name"
            label="Name"
            onChange={handleChange}
            name="name"
            err={inputState.name.err}
          />
          <Label
            placeholder="Enter your surname"
            label="Surname"
            onChange={handleChange}
            name="surname"
            err={inputState.surname.err}
          />
        </div>
        <div className="flex flex-col w-full md:flex-row  gap-5">
          <Label
            placeholder="Enter your gender"
            label="Gender"
            def="Enter your gender"
            onChange={handleChange}
            name="gender"
            err={inputState.gender.err}
          >
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </Label>
          <Label
            placeholder="Enter your company"
            label="Company"
            onChange={handleChange}
            name="company"
            err={inputState.company.err}
          />
        </div>
        <ErrorList iterator={ERROR_MESSAGES} />

        <Button
          className="addBtn w-full p-4 rounded-lg"
          onClick={handleSubmitSignup}
        >
          SIGNUP
        </Button>
        <Link to="/login" className="text-text2 dark:text-text2Dark text-sm">
          Already registered?{" "}
          <span className="text-icon dark:text-iconDark">Log in</span>
        </Link>
      </main>
    </>
  );
}
