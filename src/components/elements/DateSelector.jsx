import { useRef, useState } from "react";
const formatDate = "YYYY-MM-DD";
export default function DateSelector({ children }) {
  const [valueInputDate, setValueInputDate] = useState(formatDate);

  //   ! da sistemare la logica per farlo inserire nei punti dell'applicazione
  const inputDate = useRef();
  function handleOpenCalendar() {
    inputDate.current.showPicker();
  }

  return (
    <div
      className={`relative p-4 rounded-lg shadow-md dark:shadow-secondaryBgDark/50 shadow-secondaryBgLight/50 bg-bgInputLight hover:shadow-[0_0_5px_black] dark:bg-bgInputDark dark:placeholder:text-textDark/75 dark:hover:shadow-[0_0_5px_white] flex gap-4 items-center ${
        valueInputDate === formatDate
          ? "text-textLight/60 dark:text-textDark/60"
          : ""
      }`}
      onClick={handleOpenCalendar}
    >
      {children}
      <span>{valueInputDate}</span>
      <input
        className="opacity-0 bg-amber-500 absolute top-0 left-0 w-full h-full hover:cursor-pointer"
        type="date"
        onChange={(e) => {
          setValueInputDate(e.target.value ? e.target.value : formatDate);
        }}
        ref={inputDate}
      />
    </div>
  );
}
