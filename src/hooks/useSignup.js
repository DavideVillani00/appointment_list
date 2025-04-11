import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../ContextProvider";

let ERROR_MESSAGES = [];

export default function useSignup(alertState, setAlertState) {
  const navigate = useNavigate();
  // const { setAlertState, alertState } = useContext(Context);
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
  function handleSubmitSignup() {
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
    handleSignup(user);
  }

  function handleSubmitLogin() {
    let error = false;
    ERROR_MESSAGES = [];
    const userName = inputState.UserName.value.trim();
    const password = inputState.Password.value.trim();

    if (!userName) {
      handleChangeErr("UserName");
      error = true;
    }
    if (!password) {
      handleChangeErr("Password");
      error = true;
    }

    if (error) {
      ERROR_MESSAGES.push("Enter all fields");
      return;
    }
    const user = { userName, password };
    handleLogin(user);
  }

  async function handleSignup(user) {
    const response = await fetch("http://localhost:3000/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });
    const data = await response.json();

    if (response.ok) {
      handleReset();
      setAlertState(true);
      document.documentElement.classList.add("overflow-hidden");

      setTimeout(() => {
        setAlertState(false);
        document.documentElement.classList.remove("overflow-hidden");
        navigate("/login");
      }, 1000);
      return;
    } else {
      handleChangeErr(data.err);
      ERROR_MESSAGES.push(data.msg);
      return;
    }
  }

  async function handleLogin(user) {
    const response = await fetch("http://localhost:3000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });
    const data = await response.json();

    if (response.ok) {
      localStorage.setItem("token", data.token);
      handleReset();
      setAlertState(true);
      document.documentElement.classList.add("overflow-hidden");

      setTimeout(() => {
        setAlertState(false);
        document.documentElement.classList.remove("overflow-hidden");
        navigate("/");
      }, 1000);
    } else {
      handleChangeErr(data.err);
      ERROR_MESSAGES.push(data.msg);
    }
  }
  return {
    inputState,
    handleSubmitSignup,
    handleSubmitLogin,
    handleChange,
    ERROR_MESSAGES,
  };
}
