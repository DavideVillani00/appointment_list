import AppointmentCard from "./AppointmentCard.jsx";
import { useContext } from "react";
import { Context } from "../ContextProvider.jsx";
import useSorterList from "../hooks/useSorterList.js";

import iconLoadingDark from "../assets/icons/beautyIcons/icon-loading-dark-50.png";
import iconLoadingLight from "../assets/icons/beautyIcons/icon-loading-light-50.png";

export default function AppointmentList() {
  const { theme } = useContext(Context).globalThemeState;
  const { isLoading, sorteredList } = useSorterList();

  return (
    <ul className="bg-bgInputLight dark:bg-bgInputDark m-2 p-5 rounded-md  inset-shadow-[-3px_-3px_10px] dark:inset-shadow-secondaryBgDark/20 inset-shadow-secondaryBgLight/40">
      {isLoading ? (
        <img
          src={theme === "light" ? iconLoadingLight : iconLoadingDark}
          alt="loading ring"
          className="animate-spin justify-self-center"
        />
      ) : sorteredList.length === 0 ? (
        <p className="justify-self-center">there isn't appointment</p>
      ) : (
        sorteredList.map((app) => {
          return <AppointmentCard key={app.id} {...app} />;
        })
      )}
    </ul>
  );
}
