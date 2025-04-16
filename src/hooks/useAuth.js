import { useContext, useEffect } from "react";
import { Context } from "../ContextProvider.jsx";
import { useLocation, useNavigate } from "react-router-dom";
export default function useAuth() {
  const {
    setUserState,
    setUsersList,
    setPageLoading,
    setAlertState,
    setActualPage,
  } = useContext(Context).globalProjectState;

  const location = useLocation();
  const navigate = useNavigate();

  const path = location.pathname;
  useEffect(() => {
    if (path === "/") setActualPage("home");
    if (path === "/admin") setActualPage("admin");
    if (path !== "/login" && path !== "/signup") {
      console.log(path);
      handleCheckIsLogged();
    }
  }, [location]);

  useEffect(() => {
    console.log("prova");
    if (path !== "/login" && path !== "/signup") handleCheckIsLogged();
  }, []);

  function handleCheckIsLogged() {
    const token = localStorage.getItem("token");
    if (token) {
      handleAuthenticateToken(token);
    } else {
      navigateRedirector("/login");
    }
  }

  function navigateRedirector(to) {
    setAlertState(true);
    document.documentElement.classList.add("overflow-hidden");

    setTimeout(() => {
      setAlertState(false);
      document.documentElement.classList.remove("overflow-hidden");
      navigate(to);
      setPageLoading(false);
    }, 1000);
  }

  async function handleAuthenticateToken(token) {
    try {
      const response = await fetch("http://localhost:3000/auth", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (!response.ok) {
        navigateRedirector("/login");
        return console.error("Error in fetching token:", data.msg);
      }

      setUserState(data);
      downloadUsersList();
      setPageLoading(false);
    } catch (err) {
      console.error("Error fetch:", err);
    }
  }

  function handleLogout() {
    setUserState(null);
    setUsersList(null);
    localStorage.removeItem("token");
    navigateRedirector("/login");
  }

  async function downloadUsersList() {
    try {
      const response = await fetch("http://localhost:3000/api/users", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      if (!response.ok) {
        return console.error("Error in fetching users:", data.msg);
      }
      setUsersList(data);
    } catch (err) {
      console.error("Error in fetch:", err);
    }
  }

  return {
    handleCheckIsLogged,
    navigateRedirector,
    downloadUsersList,
    handleLogout,
    handleCheckIsLogged,
  };
}
