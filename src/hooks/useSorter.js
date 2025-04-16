export default function useSorter() {
  function sort(list = []) {
    const appointmentCompleted = list
      .filter((app) => {
        return app.check;
      })
      .sort((a, b) => {
        return (
          new Date(`${a.date}T${a.time}`).getTime() -
          new Date(`${b.date}T${b.time}`).getTime()
        );
      });

    const appointmentUncompleted = list
      .filter((app) => {
        return !app.check;
      })
      .sort((a, b) => {
        return (
          new Date(`${a.date}T${a.time}`).getTime() -
          new Date(`${b.date}T${b.time}`).getTime()
        );
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
