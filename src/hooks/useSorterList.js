// import { useContext, useState, useEffect } from "react";
// import { Context } from "../ContextProvider.jsx";

// let sorteredList = [];

// export default function useSorterList() {
//   const { projectState } = useContext(Context).globalProjectState;
//   const { search } = useContext(Context);
//   const [isLoading, setIsLoading] = useState(false);

//   useEffect(() => {
//     setIsLoading(true);

//     sorteredList = search.trim()
//       ? sorter().filter(
//           (app) =>
//             app.name
//               .toLocaleLowerCase()
//               .includes(search.trim().toLocaleLowerCase()) ||
//             app.date.includes(search.trim())
//         )
//       : sorter();

//     const time = setTimeout(() => {
//       setIsLoading(false);
//     }, 500);
//     return () => clearTimeout(time);
//   }, [search, projectState]);

//   const appointmentCompleted = projectState.items
//     .filter((app) => {
//       return app.check;
//     })
//     .sort((a, b) => {
//       return a.timestamp - b.timestamp;
//     });

//   const appointmentUncompleted = projectState.items
//     .filter((app) => {
//       return !app.check;
//     })
//     .sort((a, b) => {
//       return a.timestamp - b.timestamp;
//     });

//   function sorter() {
//     switch (projectState.filterState) {
//       case "completed":
//         return appointmentCompleted;

//       case "uncompleted":
//         return appointmentUncompleted;

//       default:
//         return [...appointmentUncompleted, ...appointmentCompleted];
//     }
//   }
//   return {
//     appointmentCompleted,
//     appointmentUncompleted,
//     isLoading,
//     sorteredList,
//   };
// }
