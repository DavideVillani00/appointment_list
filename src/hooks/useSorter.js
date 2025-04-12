import { useContext, useState, useEffect } from "react";
import { Context } from "../ContextProvider.jsx";

// let sorteredList = [];
let appointmentSortered = [];

export default function useSorter() {
  const { appointmentState } = useContext(Context).globalProjectState;

  // const [isLoading, setIsLoading] = useState(false);

  // useEffect(() => {
  //   setIsLoading(true);

  //   const time = setTimeout(() => {
  //     setIsLoading(false);
  //   }, 500);
  //   return () => clearTimeout(time);
  // }, [appointmentState]);

  const appointmentCompleted = appointmentState
    .filter((app) => {
      return app.check;
    })
    .sort((a, b) => {
      return a.timestamp - b.timestamp;
    });

  const appointmentUncompleted = appointmentState
    .filter((app) => {
      return !app.check;
    })
    .sort((a, b) => {
      return a.timestamp - b.timestamp;
    });

  appointmentSortered = [...appointmentUncompleted, ...appointmentCompleted];

  return {
    appointmentCompleted,
    appointmentUncompleted,

    appointmentSortered,
  };
}
