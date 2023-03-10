import "./index.scss";
import "../Calculator/index.scss";
import { ReactComponent as Img } from "../../images/image.svg";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { Calculator } from "../Calculator";
import { useDrop } from "react-dnd";
import { add } from "../../app/DragAndDropSlice";
import { ReactComponent as Vector } from "../../images/vector.svg";

export const Runtime = () => {
  const constructorCalculator = useAppSelector(
    ({ dragAndDrop }) => dragAndDrop.constructorCalculator
  );
  const isOverChildren = useAppSelector(
    ({ dragAndDrop }) => dragAndDrop.isOverChildren
  );
  const dispatch = useAppDispatch();
  const [{ isOver, item }, drop] = useDrop(() => ({
    accept: "div",
    drop: (item: { component: string }) => {
      dispatch(add(item.component));
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      item: monitor.getItem(),
    }),
  }));
  const conditions = [
    item?.component === "display",
    isOver,
    constructorCalculator.length,
  ];
  return (
    <section
      ref={(element) => !isOverChildren && drop(element)}
      className={`Runtime  ${
        constructorCalculator.length
          ? constructorCalculator.length === 4
            ? "space"
            : ""
          : `Runtime_default ${isOver ? "sky" : ""}`
      }`}
    >
      {conditions.every((e) => e) && <Vector height="12px" />}
      {constructorCalculator.length ? (
        constructorCalculator.map((component, i) => (
          <Calculator
            key={component}
            index={i}
            component={component}
            flagConstructor={false}
          />
        ))
      ) : (
        <div className="Runtime__content">
          <Img className="image" />
          <div>Перетащите сюда</div>
          <span>
            любой элемент <br /> из левой панели
          </span>
        </div>
      )}
      {conditions.every((e, i) => (i ? e : !e)) && <Vector height="12px" />}
    </section>
  );
};
