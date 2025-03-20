export default function AppointmentCard() {
  return (
    <li className="bg-amber-200 rounded-md p-2 my-5 flex flex-col gap-2 ">
      <div className="border-b-[1px] p-3">
        <p>2000-12-1 10:22</p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolores,
          fuga!
        </p>
      </div>

      <div className=" flex  justify-evenly ">
        <p className="">uncompleted</p>
        <span className="w-[1px] h-auto bg-amber-950"></span>
        <p className="">delete</p>
      </div>
    </li>
  );
}
