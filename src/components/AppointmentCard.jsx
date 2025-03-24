import iconDelete from "../assets/icon-delete-25.png";
import iconComplete from "../assets/icon-complete-25.png";
import iconUncompletedLight from "../assets/icon-uncompleted-light-25.png";
import iconUncompletedDark from "../assets/icon-uncompleted-dark-25.png";
import { useContext } from "react";
import { Context } from "../ContextProvider.jsx";
export default function AppointmentCard({ id, name, date, time, check }) {
  const {
    theme,
    projectState,
    handleCheckboxAppointment,
    handleDeleteAppointment,
  } = useContext(Context);

  return (
    <li className="bg-bgCardLight dark:bg-bgCardDark rounded-md p-4 my-5 flex flex-col gap-4 md:flex-row-reverse md:justify-end">
      <div className="border-bgInputLight dark:border-bgInputDark border-b-[2px] p-3 md:border-0 md:border-l-[2px] flex-3/4 ">
        <p className="text-lg font-bold mb-3 text-textLight/50 dark:text-textDark/50">
          {date} {time}
        </p>
        <p>{name}</p>
      </div>

      <div className=" flex justify-evenly md:flex-col md:justify-between flex-1/4 ">
        <div
          className="flex gap-2 justify-end items-center"
          onClick={() => handleCheckboxAppointment(id)}
        >
          <img
            src={
              check
                ? iconComplete
                : theme === "dark"
                ? iconUncompletedDark
                : iconUncompletedLight
            }
            className="w-[27px]"
          />
          <span className=" font-bold">
            {check ? "COMPLETED" : "UNCOMPLETED"}
          </span>
        </div>
        <span className="md:my-5 w-[2px] h-auto md:w-auto md:h-[2px] bg-bgInputLight dark:bg-bgInputDark  "></span>
        <div
          className="flex gap-2 justify-end items-center"
          onClick={() => handleDeleteAppointment(id)}
        >
          <img src={iconDelete} className="w-[27px]" />
          <span className="text-[#D40000] font-bold">DELETE</span>
        </div>
      </div>
    </li>
  );
}
