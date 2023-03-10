import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface RuntimeActiveState {
  value: boolean;
}

const initialState: RuntimeActiveState = {
  value: false,
};

export const runtimeActiveSlice = createSlice({
  name: "runtimeActive",
  initialState,
  reducers: {
    runtimeActivate: (state, action: PayloadAction<boolean>) => {
      state.value = action.payload;
    },
  },
});

export const { runtimeActivate } = runtimeActiveSlice.actions;

export default runtimeActiveSlice.reducer;
