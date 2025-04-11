import { useState } from "react";

export default function useGlobalValue() {
  const [user, setUser] = useState(null);
  const [completedState, setCompletedState] = useState(null);

  function handleUser(value) {
    setUser(value);
  }

  function handleCompleted(value) {
    setCompletedState(value);
  }

  return { user, handleUser, completedState, handleCompleted };
}
