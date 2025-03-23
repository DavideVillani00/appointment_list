import AppointmentCard from "./AppointmentCard.jsx";
import { useContext } from "react";
import { Context } from "../ContextProvider.jsx";
export default function AppointmentList() {
  const { projectState } = useContext(Context);
  console.log(projectState);
  return (
    <ul className="bg-bgInputLight dark:bg-bgInputDark m-2 p-5 rounded-md ">
      {!projectState.items.length > 0 ? (
        <p>non ci sono cose</p>
      ) : (
        projectState.items.map(({ id, ...props }) => {
          return <AppointmentCard key={id} {...props} />;
        })
      )}
    </ul>
  );
}
