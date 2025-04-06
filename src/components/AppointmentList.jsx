import iconLoading from "../assets/icons/beautyIcons/icon-loading-48.png";

import AppointmentCard from "./AppointmentCard.jsx";
import { useContext } from "react";
import { Context } from "../ContextProvider.jsx";
import useSorterList from "../hooks/useSorterList.js";
import DialogDelete from "./DialogDelete.jsx";

export default function AppointmentList() {
  const { theme } = useContext(Context).globalThemeState;
  const { isLoading, sorteredList } = useSorterList();

  return (
    <>
      <DialogDelete />
      <ul className="  m-2 p-5 rounded-md   flex flex-col items-center bg-bg2 dark:bg-bg2Dark border-none ">
        {isLoading ? (
          <img
            src={iconLoading}
            alt="loading ring"
            className="animate-spin w-[50px]"
          />
        ) : sorteredList.length === 0 ? (
          <p>There isn't appointment</p>
        ) : (
          sorteredList.map((app) => {
            return <AppointmentCard key={app.id} {...app} />;
          })
        )}
      </ul>
    </>
  );
}
