import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import runtimeActiveReducer from "./RuntimeActiveSlice";
import dragAndDropReducer from "./DragAndDropSlice";
import calculateReducer from "./CalculateSlice";

export const store = configureStore({
  reducer: {
    runtimeActive: runtimeActiveReducer,
    dragAndDrop: dragAndDropReducer,
    calculate: calculateReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
