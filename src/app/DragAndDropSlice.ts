import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface DragAndDropState {
  constructorCalculator: string[];
  moveComponent: { [key in string]: boolean };
  isOverChildren: boolean;
}

const initialState: DragAndDropState = {
  constructorCalculator: [],
  moveComponent: {
    display: false,
    operators: false,
    digits: false,
    equals: false,
  },
  isOverChildren: false,
};

export const dragAndDropSlice = createSlice({
  name: "dragAndDrop",
  initialState,
  reducers: {
    add: (state, action: PayloadAction<string>) => {
      if (!state.moveComponent[action.payload]) {
        if (action.payload === "display") {
          state.constructorCalculator.unshift(action.payload);
        } else {
          state.constructorCalculator.push(action.payload);
        }
      }
      state.moveComponent[action.payload] = true;
    },
    swap: (state, action: PayloadAction<{ drag: string; drop: string }>) => {
      const idDrag = state.constructorCalculator.indexOf(action.payload.drag);
      const idDrop = state.constructorCalculator.indexOf(action.payload.drop);
      state.constructorCalculator.splice(idDrop, 0, action.payload.drag);
      state.constructorCalculator.splice(
        idDrag < idDrop ? idDrag : idDrag + 1,
        +(idDrag !== -1)
      );
    },
    del: (state, action: PayloadAction<string>) => {
      state.moveComponent[action.payload] = false;
      state.constructorCalculator.splice(
        state.constructorCalculator.indexOf(action.payload),
        1
      );
    },
    isOverChildren: (state, action: PayloadAction<boolean>) => {
      state.isOverChildren = action.payload;
    },
  },
});

export const { add, del, swap, isOverChildren } = dragAndDropSlice.actions;

export default dragAndDropSlice.reducer;
