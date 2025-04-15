import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../ContextProvider";

let ERROR_MESSAGES = [];

export default function useSignup(alertState, setAlertState) {
  const navigate = useNavigate();
  const inputStateDefault = {
    userName: { value: "", err: false },
    email: { value: "", err: false },
    password: { value: "", err: false },
    name: { value: "", err: false },
    surname: { value: "", err: false },
    gender: { value: null, err: false },
    company: { value: "", err: false },
  };
  // const { setAlertState, alertState } = useContext(Context);
  const [inputState, setInputState] = useState(inputStateDefault);

  function handleReset() {
    ERROR_MESSAGES = [];
    setInputState(inputStateDefault);
  }

  // !!! da sistemare (guarda gli altri sheet)
  function handleChange(e) {
    const { name, value } = e.target ? e.target : e;

    setInputState((preState) => {
      return {
        ...preState,
        [name]: { value: value.trim(), err: false },
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

    const userName = inputState.userName.value;
    const email = inputState.email.value;
    const password = inputState.password.value;
    const name = inputState.name.value;
    const surname = inputState.surname.value;
    const gender = inputState.gender.value;
    const company = inputState.company.value;

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
      handleChangeErr("userName");
      error = true;
    }
    if (!name) {
      handleChangeErr("name");
      error = true;
    }
    if (!surname) {
      handleChangeErr("surname");
      error = true;
    }
    if (!gender) {
      handleChangeErr("gender");
      error = true;
    }
    if (!company) {
      handleChangeErr("company");
      error = true;
    }
    if (error) ERROR_MESSAGES.push("Enter all fields");

    if (!emailValidation) {
      handleChangeErr("email");
      error = true;
      ERROR_MESSAGES.push("Incorrect email format");
    }
    if (!passwordValidation) {
      handleChangeErr("password");
      error = true;
      ERROR_MESSAGES.push(
        "password must contain uppercase, lowercase, numbers, special characters and must be at least 12 characters long"
      );
    }
    if (error) {
      return;
    }
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
    const userName = inputState.userName.value.trim();
    const password = inputState.password.value.trim();

    if (!userName) {
      handleChangeErr("userName");
      error = true;
    }
    if (!password) {
      handleChangeErr("password");
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
    handleReset,
  };
}
