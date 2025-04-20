import { useState } from "react";
import { useTranslation } from "react-i18next";
const INPUT_STATE_DEFAULT = {
  userName: { value: "", err: false },
  email: { value: "", err: false },
  password: { value: "", err: false },
  name: { value: "", err: false },
  surname: { value: "", err: false },
  gender: { value: null, err: false },
  company: { value: "", err: false },
};

export default function useLoginSignupPage() {
  const { t } = useTranslation();
  const [inputLoginSignupPage, setInputLoginSignupPage] =
    useState(INPUT_STATE_DEFAULT);

  function resetInputLoginSignupPage() {
    setInputLoginSignupPage(INPUT_STATE_DEFAULT);
  }

  function handleChangeInput(e) {
    const { name, value } = e.target;
    setInputLoginSignupPage((preState) => {
      return {
        ...preState,
        [name]: { value: value, err: false },
      };
    });
  }
  function handleChangeSelect(name, value) {
    value = value === t("Male") ? "Male" : value;
    value = value === t("Female") ? "Female" : value;
    value = value === t("Other") ? "Other" : value;
    setInputLoginSignupPage((preState) => {
      return { ...preState, [name]: { value, err: false } };
    });
  }

  function handleChangeErr(name) {
    setInputLoginSignupPage((preState) => {
      return {
        ...preState,
        [name]: { ...preState[name], err: true },
      };
    });
  }

  return {
    inputLoginSignupPage,
    resetInputLoginSignupPage,
    handleChangeErr,
    handleChangeInput,
    handleChangeSelect,
    // ERROR_MESSAGES_LOGIN_SIGNUP,
  };
}
