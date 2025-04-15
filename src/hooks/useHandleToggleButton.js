import { useContext } from "react";
import { Context } from "../ContextProvider";

export default function useHandleToggleButton() {
  const { handleChangeFilters } = useContext(Context);
  const { selectId } = useContext(Context);

  async function handleCheck(id) {
    try {
      const response = await fetch(
        `http://localhost:3000/api/appointments/edit/${id}`,
        { method: "PUT", headers: { "Content-Type": "application/json" } }
      );
      const data = await response.json();
      if (response.ok) {
        handleChangeFilters();
      }
    } catch (err) {
      return console.error("Error in fetch:", err);
    }
  }

  async function handleDelete() {
    const response = await fetch(
      `http://localhost:3000/api/appointments/delete/${selectId.current}`,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      }
    );
    const data = await response.json();
    if (response.ok) {
      handleChangeFilters();
    }
  }
  return { handleCheck, handleDelete };
}
