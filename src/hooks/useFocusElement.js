import { useState } from "react";
export default function useFocusElement() {
  const [isFocus, setIsFocus] = useState(false);
  function handleFocus() {
    setIsFocus(true);
  }
  function handleBlur() {
    setIsFocus(false);
  }
  return {
    isFocus,
    handleFocus,
    handleBlur,
  };
}
