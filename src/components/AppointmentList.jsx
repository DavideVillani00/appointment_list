import AppointmentCard from "./AppointmentCard.jsx";
import { useContext } from "react";
import { Context } from "../ContextProvider.jsx";
export default function AppointmentList() {
  const { sorter } = useContext(Context);
  const sorteredList = sorter();

  return (
    <ul className="bg-bgInputLight dark:bg-bgInputDark m-2 p-5 rounded-md ">
      {!sorteredList.length > 0 ? (
        <p className="justify-self-center">there isn't appointment</p>
      ) : (
        sorteredList.map((app) => {
          return <AppointmentCard key={app.id} {...app} />;
        })
      )}
    </ul>
  );
}
