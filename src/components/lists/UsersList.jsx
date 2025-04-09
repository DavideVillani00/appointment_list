import DialogDelete from "../modal/DialogDelete.jsx";
import CardUser from "../lists/CardUser.jsx";
export default function UsersList() {
  return (
    <>
      <DialogDelete />
      <ul className="m-2 p-5 rounded-md gap-5  flex flex-col items-center bg-bg2 dark:bg-bg2Dark border-none">
        <CardUser />
        <CardUser />
        <CardUser />
        <CardUser />
      </ul>
    </>
  );
}
