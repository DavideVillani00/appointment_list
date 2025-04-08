import useAsideEffect from "./hooks/useAsideEffect.js";
import { RouterProvider } from "react-router-dom";
import router from "./router.jsx";

function App() {
  useAsideEffect();
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
