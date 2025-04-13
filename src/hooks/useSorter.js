export default function useSorter() {
  function sort(list = []) {
    const appointmentCompleted = list
      .filter((app) => {
        return app.check;
      })
      .sort((a, b) => {
        return a.timestamp - b.timestamp;
      });

    const appointmentUncompleted = list
      .filter((app) => {
        return !app.check;
      })
      .sort((a, b) => {
        return a.timestamp - b.timestamp;
      });

    return {
      appointmentSortered: [...appointmentUncompleted, ...appointmentCompleted],
      appointmentCompleted,
      appointmentUncompleted,
    };
  }

  return {
    sort,
  };
}
