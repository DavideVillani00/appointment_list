import AppointmentCard from "./AppointmentCard.jsx";
import { useContext, useEffect, useState } from "react";
import { Context } from "../ContextProvider.jsx";
import useSorterList from "../hooks/useSorterList.js";

export default function AppointmentList() {
  const { search } = useContext(Context);
  const { sorter } = useSorterList();
  const { projectState } = useContext(Context).globalProjectState;

  const [sorteredList, setSorteredList] = useState(sorter());

  useEffect(() => {
    if (search.trim() !== "") {
      setSorteredList(
        sorter().filter((app) => {
          return (
            app.name.includes(search.trim()) || app.date.includes(search.trim())
          );
        })
      );
    } else {
      setSorteredList(sorter());
    }
  }, [search, projectState]);

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
