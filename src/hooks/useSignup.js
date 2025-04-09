import { useState } from "react";

export default function useSignup() {
  const [inputState, setInputState] = useState({
    UserName: { value: "", err: false },
    Email: { value: "", err: false },
    Password: { value: "", err: false },
    Name: { value: "", err: false },
    Surname: { value: "", err: false },
    Gender: { value: "", err: false },
    Company: { value: "", err: false },
  });
  function handleChange(e) {
    console.log(e);
    const { name, value } = e.target ? e.target : e;
    console.log(name, value);

    setInputState((preState) => {
      return {
        ...preState,
        [name]: { value, err: false },
      };
    });
  }

  function handleChangeErr(name) {
    console.log(name);
    setInputState((preState) => {
      return {
        ...preState,
        [name]: { ...preState[name], err: true },
      };
    });
  }
  function handleSubmit() {
    const { UserName, Email, Password, Name, Surname, Gender, Company } =
      inputState;
    const username = inputState.UserName.value.trim();
    const email = inputState.Email.value.trim();
    const password = inputState.Password.value.trim();
    const name = inputState.Name.value.trim();
    const surname = inputState.Surname.value.trim();
    const gender = inputState.Gender.value;
    const company = inputState.Company.value.trim();

    const regexMail = /^[\w.-_]+@[\w.-_]+\.[a-zA-Z]{2,}$/;
    const emailValidation = regexMail.test(email);
    const passwordValidation =
      password.length >= 12 &&
      /[A-Z]+/.test(password) &&
      /[a-z]+/.test(password) &&
      /[\d]+/.test(password) &&
      /[\W_]+/.test(password);

    let error = false;
    if (!username) {
      handleChangeErr("UserName");
      error = true;
    }
    if (!emailValidation) {
      handleChangeErr("Email");
      error = true;
    }
    if (!passwordValidation) {
      console.log("err");
      handleChangeErr("Password");
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
    if (error) {
      return;
    }
    console.log("controllo nel db se l'utente e mail esistono");
  }
  return { inputState, handleSubmit, handleChange };
}
