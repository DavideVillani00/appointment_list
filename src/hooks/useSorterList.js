import { useContext } from "react";
import { Context } from "../ContextProvider.jsx";

export default function useSorterList() {
  const { projectState } = useContext(Context).globalProjectState;

  const appointmentCompleted = projectState.items.filter((app) => {
    return app.check;
  });
  const appointmentUncompleted = projectState.items.filter((app) => {
    return !app.check;
  });

  function sorter() {
    const sortAppCompl = appointmentCompleted.sort((a, b) => {
      return a.timestamp - b.timestamp;
    });
    const sortAppUncompl = appointmentUncompleted.sort((a, b) => {
      return a.timestamp - b.timestamp;
    });

    switch (projectState.filterState) {
      case "completed":
        return sortAppCompl;

      case "uncompleted":
        return sortAppUncompl;

      default:
        return [...sortAppUncompl, ...sortAppCompl];
    }
  }
  return { appointmentCompleted, appointmentUncompleted, sorter };
}
