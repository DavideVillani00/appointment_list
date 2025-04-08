import { createBrowserRouter } from "react-router-dom";
import AdminPage from "./components/pages/AdminPage.jsx";
import HomePage from "./components/pages/HomePage.jsx";
import LoginPage from "./components/pages/LoginPage.jsx";
import SignupPage from "./components/pages/SignupPage.jsx";

const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/signup", element: <SignupPage /> },
  { path: "/admin", element: <AdminPage /> },
]);

export default router;
