import { createSlice, PayloadAction } from "@reduxjs/toolkit";
let digitA = 0;
let digitB = 0;
let operator = "";
let flagDisplay = false;
let flagOperator = false;
export interface CalculateState {
  result: string;
}

const initialState: CalculateState = {
  result: "0",
};

export const calculateSlice = createSlice({
  name: "calculate",
  initialState,
  reducers: {
    calculate: (state, action: PayloadAction<string[]>) => {
      const operators = (e: string) => {
        operator = e;
        flagDisplay = true;
        flagOperator = true;
      };
      const digits = (digit: string) => {
        if ([state.result, digit].every((e) => /,/.test(e))) return;
        state.result !== "0" || digit === ","
          ? (state.result += digit)
          : (state.result = digit);

        if (flagDisplay) {
          state.result = digit;
          flagDisplay = false;
        }
        state.result = state.result.slice(0, 18);
        if (!flagOperator) {
          digitA = +state.result.replace(",", ".");
        }
        digitB = +state.result.replace(",", ".");
      };
      const equals = () => {
        if (!operator) {
          return;
        }
        if (!digitB && operator === "/") {
          state.result = "Не определено";
          return;
        }
        let res = 0;
        flagDisplay = true;
        flagOperator = false;
        const a = 100000 * digitA;
        const b = 100000 * digitB;
        switch (operator) {
          case "/":
            res = a / b;
            break;
          case "x":
            res = a * b;
            break;
          case "-":
            res = a - b;
            break;
          case "+":
            res = a + b;
            break;
        }
        res /= operator === "x" ? 100000 ** 2 : operator === "/" ? 1 : 100000;
        if (res.toString().length > 18) {
          state.result = res.toExponential(10).replace(".", ",");
        } else {
          state.result = res.toString().replace(".", ",").slice(0, 18);
        }
        digitA = res;
      };
      switch (action.payload[0]) {
        case "operators":
          operators(action.payload[1]);
          break;
        case "digits":
          digits(action.payload[1]);
          break;
        case "equals":
          equals();
          break;
      }
    },
    reset: (state) => {
      digitA = 0;
      digitB = 0;
      operator = "";
      flagDisplay = false;
      flagOperator = false;
      state.result = "0";
    },
  },
});

export const { calculate, reset } = calculateSlice.actions;

export default calculateSlice.reducer;
