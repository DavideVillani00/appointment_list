import Header from "../Header.jsx";
import Button from "../elements/Button.jsx";
import Label from "../elements/Label.jsx";

export default function LoginPage() {
  return (
    <>
      <Header />
      <main className="flex flex-col justify-center items-center gap-7">
        <h1 className="text-3xl font-extrabold ">LOGIN</h1>
        <Label placeholder="Enter your userName" value="UserName" />
        <Label placeholder="Enter your password" value="Password" />
        <ul className="text-center text-delete dark:text-deleteDark font-bold">
          {/* <li>Incorrect username or password </li> */}
        </ul>
        <Button className="addBtn w-full p-4 rounded-lg">LOGIN</Button>
        <span className="text-text2 dark:text-text2Dark text-sm">
          Not registered?{" "}
          <span className="text-icon dark:text-iconDark">Sign up</span>
        </span>
      </main>
    </>
  );
}
