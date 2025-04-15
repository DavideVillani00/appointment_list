import { useContext, useEffect, useRef, useState } from "react";
import { Context } from "../../ContextProvider";

export default function useAdminPage() {
  const inputStateDefault = {
    id: { value: null, err: false },
    role: { value: null, err: false },
    userName: { value: "", err: false },
    email: { value: "", err: false },
    password: { value: "", err: false },
    name: { value: "", err: false },
    surname: { value: "", err: false },
    company: { value: "", err: false },
    gender: { value: null, err: false },
  };

  const { uploadUsers } = useContext(Context).globalProjectState; //! da sistemare la posizione

  const [isEdit, setIsEdit] = useState(false);
  const dialogUser = useRef(null);
  const userIdSelected = useRef(null);

  const [inputAdminState, setInputAdminState] = useState(inputStateDefault);
  const [adminFilter, setAdminFilter] = useState({
    userName: null,
    role: null,
  });

  const [filteredUsersList, setFilteredUsersList] = useState(null);
  const [isLoadingList, setIsLoadingList] = useState(true);

  function resetInputAdminState() {
    setInputAdminState(inputStateDefault);
    userIdSelected.current = null;
    setIsEdit(false);
    setAdminFilter({
      userName: null,
      role: null,
    });
  }

  function handleChangeFilterAdmin(name, value) {
    value = value === "All" ? null : value;
    setAdminFilter((preState) => {
      return {
        ...preState,
        [name]: value,
      };
    });
  }

  async function uploadUsersFiltered() {
    try {
      setIsLoadingList(true);
      const response = await fetch("http://localhost:3000/api/users/search", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(adminFilter),
      });
      const data = await response.json();
      if (!response.ok) {
        console.error("Error in fetching users:", data.msg);
        return setFilteredUsersList(data.arr);
      }
      return setFilteredUsersList(data);
    } catch (err) {
      console.error("Error in fetch:", err);
    } finally {
      setTimeout(() => {
        setIsLoadingList(false);
      }, 200);
    }
  }

  useEffect(() => {
    uploadUsersFiltered();
  }, []);
  useEffect(() => {
    uploadUsersFiltered();
    // uploadUsers(); //! da sistemare la posizione
  }, [adminFilter]);

  return {
    isEdit,
    setIsEdit,
    dialogUser,
    userIdSelected,
    inputAdminState,
    setInputAdminState,
    inputStateDefault,
    resetInputAdminState,
    handleChangeFilterAdmin,
    isLoadingList,
    filteredUsersList,
  };
}
