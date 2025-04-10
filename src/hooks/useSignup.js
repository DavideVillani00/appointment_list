import { useState } from "react";
import { useNavigate } from "react-router-dom";

let ERROR_MESSAGES = [];
let COMPLETED = null;
export default function useSignup() {
  const navigate = useNavigate();
  const [inputState, setInputState] = useState({
    UserName: { value: "", err: false },
    Email: { value: "", err: false },
    Password: { value: "", err: false },
    Name: { value: "", err: false },
    Surname: { value: "", err: false },
    Gender: { value: "", err: false },
    Company: { value: "", err: false },
  });

  function handleReset() {
    ERROR_MESSAGES = [];
    setInputState({
      UserName: { value: "", err: false },
      Email: { value: "", err: false },
      Password: { value: "", err: false },
      Name: { value: "", err: false },
      Surname: { value: "", err: false },
      Gender: { value: "", err: false },
      Company: { value: "", err: false },
    });
  }

  function handleChange(e) {
    const { name, value } = e.target ? e.target : e;

    setInputState((preState) => {
      return {
        ...preState,
        [name]: { value, err: false },
      };
    });
  }

  function handleChangeErr(name) {
    setInputState((preState) => {
      return {
        ...preState,
        [name]: { ...preState[name], err: true },
      };
    });
  }
  function handleSubmit() {
    ERROR_MESSAGES = [];
    const { UserName, Email, Password, Name, Surname, Gender, Company } =
      inputState;
    const userName = UserName.value.trim();
    const email = Email.value.trim();
    const password = Password.value.trim();
    const name = Name.value.trim();
    const surname = Surname.value.trim();
    const gender = Gender.value;
    const company = Company.value.trim();

    const regexMail = /^[\w.-_]+@[\w.-_]+\.[a-zA-Z]{2,}$/;
    const emailValidation = regexMail.test(email);
    const passwordValidation =
      password.length >= 12 &&
      /[A-Z]+/.test(password) &&
      /[a-z]+/.test(password) &&
      /[\d]+/.test(password) &&
      /[\W_]+/.test(password);

    let error = false;

    if (!userName) {
      handleChangeErr("UserName");
      error = true;
    }
    if (!name) {
      handleChangeErr("Name");
      error = true;
    }
    if (!surname) {
      handleChangeErr("Surname");
      error = true;
    }
    if (!gender) {
      handleChangeErr("Gender");
      error = true;
    }
    if (!company) {
      handleChangeErr("Company");
      error = true;
    }
    if (error) ERROR_MESSAGES.push("Enter all fields");

    if (!emailValidation) {
      handleChangeErr("Email");
      error = true;
      ERROR_MESSAGES.push("Incorrect email format");
    }
    if (!passwordValidation) {
      handleChangeErr("Password");
      error = true;
      ERROR_MESSAGES.push(
        "Password must contain uppercase, lowercase, numbers, special characters and must be at least 12 characters long"
      );
    }
    if (error) {
      return;
    }
    console.log("controllo nel db se l'utente e mail esistono");
    const id = Math.random() * 1000;
    const role = "user";
    const user = {
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
    handleLogin(user);
  }

  async function handleLogin(user) {
    const result = await fetch("http://localhost:3000/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });
    const data = await result.json();

    if (result.ok) {
      handleReset();
      COMPLETED = true;
      document.documentElement.classList.add("overflow-hidden");

      setTimeout(() => {
        COMPLETED = null;
        document.documentElement.classList.remove("overflow-hidden");
        navigate("/login");
      }, 1000);
    } else {
      handleChangeErr(data.err);
      ERROR_MESSAGES.push(data.msg);
    }
  }
  return { inputState, handleSubmit, handleChange, ERROR_MESSAGES, COMPLETED };
}
