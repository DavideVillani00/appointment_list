import iconLoading from "../../assets/icons/beautyIcons/icon-loading-48.png";

import AppointmentCard from "./AppointmentCard.jsx";
// import useSorterList from "../../hooks/useSorterList.js";
import DialogDelete from "../modal/DialogDelete.jsx";
import useSorter from "../../hooks/useSorter.js";
import useHomePage from "../../hooks/useHomePage.js";

export default function AppointmentList() {
  // const { isLoading, sorteredList } = useSorterList();
  const { appointmentSortered } = useSorter();
  const { isLoading } = useHomePage();
  console.log(appointmentSortered);

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
        ) : appointmentSortered.length === 0 ? (
          <p>There isn't appointment</p>
        ) : (
          appointmentSortered.map((app) => {
            return <AppointmentCard key={app.id} {...app} />;
          })
        )}
      </ul>
    </>
  );
}
