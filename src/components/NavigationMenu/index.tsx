import "./index.scss";
import { ReactComponent as Eye } from "../../images/eye.svg";
import { ReactComponent as Brackets } from "../../images/brackets.svg";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { runtimeActivate } from "../../app/RuntimeActiveSlice";

export const NavigationMenu = () => {
  const dispatch = useAppDispatch();
  const runtimeActive = useAppSelector(
    ({ runtimeActive }) => runtimeActive.value
  );
  const constructorCalculator = useAppSelector(
    ({ dragAndDrop }) => dragAndDrop.constructorCalculator
  );
  return (
    <nav className="nav">
      <button
        onClick={() =>
          constructorCalculator.length === 4 && dispatch(runtimeActivate(true))
        }
        className={`btn-Runtime ${runtimeActive ? "active" : ""}`}
      >
        <Eye
          className={`img ${constructorCalculator.length === 4 ? "eye" : ""}`}
        />
        Runtime
      </button>
      <button
        onClick={() => dispatch(runtimeActivate(false))}
        className={`btn-Constructor ${runtimeActive ? "" : "active"}`}
      >
        <Brackets className="img" />
        Constructor
      </button>
    </nav>
  );
};
