import { useContext } from "react";
import { Context } from "../../ContextProvider";
import { useTranslation } from "react-i18next";

export default function OptionUsersName({ users, allOption = false }) {
  const { userState } = useContext(Context).globalProjectState;
  const { t } = useTranslation();

  if (!userState || !users) return null;

  const all = { userName: t("All"), userId: "All" };

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
    return <option key={u.userId}>{u.userName}</option>;
  });
}
