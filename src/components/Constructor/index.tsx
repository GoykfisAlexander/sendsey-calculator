import { Calculator } from "../Calculator";
import "./index.scss";
const components = ["display", "operators", "digits", "equals"];
export const Constructor = () => {
  return (
    <section className="Constructor">
      {components.map((component, i) => (
        <Calculator
          key={component + i}
          index={i}
          component={component}
          flagConstructor={true}
        />
      ))}
    </section>
  );
};
