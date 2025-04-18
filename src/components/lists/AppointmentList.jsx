import iconLoading from "../../assets/icons/beautyIcons/icon-loading-48.png";

import AppointmentCard from "./AppointmentCard.jsx";
import DialogDelete from "../modal/DialogDelete.jsx";
import useSorter from "../../hooks/useSorter.js";
import { useContext } from "react";
import { Context } from "../../ContextProvider.jsx";
import { useTranslation } from "react-i18next";
export default function AppointmentList() {
  const { t } = useTranslation();
  const { userState } = useContext(Context).globalProjectState;
  const { filteredAppointmentList, isLoadingList } =
    useContext(Context).globalHomePage;
  const { sort } = useSorter();

  const appointments =
    userState.role === "Admin"
      ? sort(filteredAppointmentList).appointmentSortered
      : sort(
          filteredAppointmentList.filter(
            (app) => app.userName === userState.userName
          )
        ).appointmentSortered;

  return (
    <>
      <DialogDelete />
      <ul className="  m-2 p-5 rounded-md   flex flex-col items-center bg-bg2 dark:bg-bg2Dark border-none ">
        {isLoadingList ? (
          <img
            src={iconLoading}
            alt="loading ring"
            className="animate-spin w-[50px]"
          />
        ) : appointments.length === 0 ? (
          <p>{t("There isn't any appointments")}</p>
        ) : (
          appointments.map((app) => {
            return <AppointmentCard key={app.id} {...app} />;
          })
        )}
      </ul>
    </>
  );
}
