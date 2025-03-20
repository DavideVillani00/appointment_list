import Input from "./Input.jsx";

export default function TopMain() {
  return (
    <div className="mt-3 p-3 flex flex-col gap-2 ">
      <Input type="button" value="Add +" />
      <Input type="text" placeholder="cerca" />
      <div className="flex justify-center gap-4 text-stone-500">
        <p>Total: 10;</p>
        <p>Completed: 0;</p>
        <p>Uncompleted: 10;</p>
      </div>
      <div className="self-center">
        <span className="mr-2">&</span>
        <select>
          <option>All</option>
          <option>Completed</option>
          <option>Uncompleted</option>
        </select>
      </div>

      <hr />
    </div>
  );
}
