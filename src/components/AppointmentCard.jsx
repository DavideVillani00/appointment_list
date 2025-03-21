import iconDelete from "../assets/icon-delete-25.png";
import iconComplete from "../assets/icon-complete-25.png";
import iconUncompletedLight from "../assets/icon-uncompleted-light-25.png";
import iconUncompletedDark from "../assets/icon-uncompleted-dark-25.png";
export default function AppointmentCard() {
  return (
    <li className="bg-bgCardLight dark:bg-bgCardDark rounded-md p-4 my-5 flex flex-col gap-4 md:flex-row-reverse md:justify-end">
      <div className="border-bgInputLight dark:border-bgInputDark border-b-[2px] p-3 md:border-0 md:border-l-[2px]  md:flex-5/6 ">
        <p className="text-lg font-bold mb-3 text-textLight/50 dark:text-textDark/50">
          2000-12-1 10:22
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolores,
          fuga!
        </p>
      </div>

      <div className=" flex justify-evenly md:flex-col md:justify-between  md:flex-1/6">
        <div className="flex gap-2 justify-end items-center">
          <img src={iconUncompletedLight} className="w-[27px]" />
          <span className=" font-bold">UNCOMPLETED</span>
        </div>
        <span className="md:my-5 w-[2px] h-auto md:w-auto md:h-[2px] bg-bgInputLight dark:bg-bgInputDark "></span>
        <div className="flex gap-2 justify-end items-center">
          <img src={iconDelete} className="w-[27px]" />
          <span className="text-[#D40000] font-bold">DELETE</span>
        </div>
      </div>
    </li>
  );
}
