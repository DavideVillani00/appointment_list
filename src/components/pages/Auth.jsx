import { useContext, useEffect, useState } from "react";
import { Context } from "../../ContextProvider";
import { useNavigate } from "react-router-dom";
import iconLoading from "../../assets/icons/beautyIcons/icon-loading-48.png";

export default function Auth({ children }) {
  const { setAlertState } = useContext(Context);
  const { setUserState, userState, usersList } =
    useContext(Context).globalProjectState;
  const navigate = useNavigate();
  // const [pageLoading, setPageLoading] = useState(true);
  const { pageLoading, setPageLoading } =
    useContext(Context).globalProjectState;

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      handleToken(token);
    } else {
      loginRedirect();
    }
  }, []);

  async function handleToken(token) {
    try {
      const response = await fetch("http://localhost:3000/auth", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (response.ok) {
        setUserState(data);
        setPageLoading(false);
      } else {
        loginRedirect();
      }
    } catch (err) {
      console.error("Error fetch:", err);
      loginRedirect();
    }
  }
  function loginRedirect() {
    setAlertState(true);
    document.documentElement.classList.add("overflow-hidden");

    setTimeout(() => {
      setAlertState(false);
      document.documentElement.classList.remove("overflow-hidden");
      navigate("/login");
      setPageLoading(false);
    }, 1000);
  }
  if (pageLoading || !userState || !usersList) {
    return (
      <div className="w-full h-full absolute top-0 left-0 flex  justify-center items-center">
        <img
          src={iconLoading}
          alt="loading ring"
          className="animate-spin w-28"
        />
      </div>
    );
  }
  return <>{children}</>;
}
