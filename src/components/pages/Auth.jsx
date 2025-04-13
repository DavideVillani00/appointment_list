import { useContext, useEffect } from "react";
import { Context } from "../../ContextProvider";
import { useNavigate } from "react-router-dom";

export default function Auth({ children }) {
  const { setAlertState } = useContext(Context);
  const { setUserState } = useContext(Context).globalProjectState;
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      handleToken(token);
      return;
    } else {
      setAlertState(true);
      document.documentElement.classList.add("overflow-hidden");

      setTimeout(() => {
        setAlertState(false);
        document.documentElement.classList.remove("overflow-hidden");
        navigate("/login");
      }, 1000);
      return;
    }
  }, []);

  async function handleToken(token) {
    const response = await fetch("http://localhost:3000/auth", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    console.log(data, "data from auth");
    if (response.ok) setUserState(data);
  }

  return <>{children}</>;
}
