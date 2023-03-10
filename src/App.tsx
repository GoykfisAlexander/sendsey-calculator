import "./App.scss";
import { useAppSelector } from "./app/hooks";
import { Runtime } from "./components/Runtime";
import { NavigationMenu } from "./components/NavigationMenu";
import { Constructor } from "./components/Constructor";

function App() {
  const runtimeActive = useAppSelector(
    ({ runtimeActive }) => runtimeActive.value
  );

  return (
    <section className="App">
      <NavigationMenu />
      {!runtimeActive && <Constructor />}
      <Runtime />
    </section>
  );
}

export default App;
