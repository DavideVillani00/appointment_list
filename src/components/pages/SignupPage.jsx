import { useContext } from "react";

import Header from "../Header.jsx";
import Button from "../elements/Button.jsx";
import Label from "../elements/composite_elements/Label.jsx";
import { Context } from "../../ContextProvider.jsx";
export default function SignupPage() {
  const { handleSubmit } = useContext(Context).globalSignupState;
  return (
    <>
      <Header />
      <h1 className="text-3xl font-extrabold text-center">SIGNUP</h1>
      <main className="flex flex-col justify-center items-center gap-7 md:gap-5">
        <Label placeholder="Enter your user-name" value="UserName" />
        <Label placeholder="Enter your email" value="Email" />
        <Label placeholder="Enter your password" value="Password" />
        <div className="flex flex-col w-full md:flex-row md: gap-5">
          <Label placeholder="Enter your name" value="Name" />
          <Label placeholder="Enter your surname" value="Surname" />
        </div>
        <div className="flex flex-col w-full md:flex-row md: gap-5">
          <Label
            placeholder="Enter your gender"
            value="Gender"
            def="Enter your gender"
          >
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </Label>
          <Label placeholder="Enter your company" value="Company" />
        </div>

        <ul className="text-center text-delete dark:text-deleteDark font-bold">
          {/* <li>Enter all fields</li> */}
        </ul>
        <Button className="addBtn w-full p-4 rounded-lg" onClick={handleSubmit}>
          SIGNUP
        </Button>
        <span className="text-text2 dark:text-text2Dark text-sm">
          Already registered?{" "}
          <span className="text-icon dark:text-iconDark">Log in</span>
        </span>
      </main>
    </>
  );
}
