import { createBrowserRouter, Route, Routes } from "react-router-dom";
import AdminPage from "./components/pages/AdminPage.jsx";
import HomePage from "./components/pages/HomePage.jsx";
import LoginPage from "./components/pages/LoginPage.jsx";
import SignupPage from "./components/pages/SignupPage.jsx";
import Auth from "./components/pages/Auth.jsx";

export default function RoutesApp() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Auth>
            <HomePage />
          </Auth>
        }
      />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route
        path="/admin"
        element={
          <Auth>
            <AdminPage />
          </Auth>
        }
      />
    </Routes>
  );
}
