import "./index.scss";
import { del, isOverChildren, swap } from "../../app/DragAndDropSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { calculate, reset } from "../../app/CalculateSlice";
import { useEffect } from "react";
import { useDrag, useDrop } from "react-dnd";
import { ReactComponent as Vector } from "../../images/vector.svg";

interface IProps {
  component: string;
  flagConstructor: boolean;
  index: number;
}

export const Calculator = ({ component, flagConstructor, index }: IProps) => {
  const dispatch = useAppDispatch();
  const result = useAppSelector(({ calculate }) => calculate.result);
  const runtimeActive = useAppSelector(
    ({ runtimeActive }) => runtimeActive.value
  );
  const constructorCalculator = useAppSelector(
    ({ dragAndDrop }) => dragAndDrop.constructorCalculator
  );
  const moveComponent = useAppSelector(
    ({ dragAndDrop }) => dragAndDrop.moveComponent
  );

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "div",
    item: { component },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "div",
    drop: (item: { component: string }) => {
      dispatch(swap({ drag: item.component, drop: component }));
    },
    collect: (monitor) => ({ isOver: monitor.isOver() }),
  }));
  useEffect(() => {
    dispatch(isOverChildren(isOver));
  }, [isOver, dispatch]);
  useEffect(() => {
    !runtimeActive && dispatch(reset());
  }, [runtimeActive, dispatch]);
  const componentParts: { [key in string]: string[] } = {
    display: [result],
    operators: ["/", "x", "-", "+"],
    digits: ["7", "8", "9", "4", "5", "6", "1", "2", "3", "0", ","],
    equals: ["="],
  };
  const clickHandler = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!runtimeActive) return;
    dispatch(calculate(e.currentTarget.className.split(/[_ ]/)));
  };
  const dblClickHandel = () => {
    if (runtimeActive || flagConstructor) return;
    dispatch(del(component));
  };
  const cursors = () => {
    let cursor = "grab";
    switch (true) {
      case runtimeActive:
        cursor = "default";
        break;
      case (component === "display" && !flagConstructor) ||
        (flagConstructor && moveComponent[component]):
        cursor = "no-drop";
        break;
      case isDragging:
        cursor = "move";
    }
    return cursor;
  };
  const styles = {
    opacity: `${
      (flagConstructor && moveComponent[component]) || isDragging ? "0.5" : "1"
    }`,
    marginTop: `${
      [
        !flagConstructor,
        !index,
        !constructorCalculator.includes("display"),
      ].every((e) => e)
        ? "28%"
        : ""
    }`,
    cursor: `${cursors()}`,
  };
  return (
    <>
      {isOver && <Vector height="12px" />}
      <div
        ref={(element) => {
          (component === "display" && !flagConstructor) ||
            (flagConstructor && moveComponent[component]) ||
            drag(element);
          !flagConstructor && component !== "display" && drop(element);
        }}
        style={styles}
        className={component}
        onDoubleClick={dblClickHandel}
      >
        {componentParts[component].map((e) => (
          <div
            key={e}
            style={
              component === "display"
                ? e === "Не определено"
                  ? { fontSize: "0.24em" }
                  : { fontSize: `0.${38 - e.length}em` }
                : {}
            }
            onClick={clickHandler}
            className={`${component}_${e} ${
              runtimeActive ? `${component}_hover` : ""
            }`}
          >
            {e}
          </div>
        ))}
      </div>
    </>
  );
};
