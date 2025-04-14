import { useContext } from "react";
import { Context } from "../../ContextProvider";

export default function OptionUsersName({ users, allOption = false }) {
  const { userState } = useContext(Context).globalProjectState;
  if (!userState || !users) return null;

  const all = { userName: "All", id: "All" };

  const userLogged = users.find((u) => {
    return u.userName === userState.userName;
  });
  const userNotLogged = users.filter((u) => {
    return u.userName !== userState.userName;
  });
  let userList;

  if (allOption) {
    userList = [all, userLogged, ...userNotLogged];
  } else {
    userList = [userLogged, ...userNotLogged];
  }

  return userList.map((u) => {
    return <option key={u.id}>{u.userName}</option>;
  });
}
