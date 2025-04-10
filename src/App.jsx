import useAsideEffect from "./hooks/useAsideEffect.js";
import RoutesApp from "./RoutesApp.jsx";

function App() {
  useAsideEffect();
  return (
    <>
      <RoutesApp />
    </>
  );
}

export default App;
