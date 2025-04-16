import { useContext } from "react";
import { Context } from "../../ContextProvider";
import iconLoading from "../../assets/icons/beautyIcons/icon-loading-48.png";
import useAuth from "../../hooks/useAuth.js";

export default function Auth({ children }) {
  const { userState, usersList, pageLoading } =
    useContext(Context).globalProjectState;

  useAuth();
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
