import DialogDelete from "../modal/DialogDelete.jsx";
import CardUser from "../lists/CardUser.jsx";
import { useContext } from "react";
import { Context } from "../../ContextProvider.jsx";
export default function UsersList() {
  const { usersList } = useContext(Context).globalProjectState;
  const { isLoadingList, filteredUsersList } =
    useContext(Context).globalAdminPage;
  return (
    <>
      <DialogDelete />
      <ul className="m-2 p-5 rounded-md gap-5  flex flex-col items-center bg-bg2 dark:bg-bg2Dark border-none">
        {!isLoadingList &&
          (filteredUsersList.length === 0 ? (
            <li>Subscribers not found</li>
          ) : (
            filteredUsersList.map((u) => {
              return <CardUser key={u.id} user={u} />;
            })
          ))}
      </ul>
    </>
  );
}
