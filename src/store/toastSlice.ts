import  { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ToastEvent } from "../models/models";

export interface ToastState {
    toastEvent: ToastEvent | null
}

const initialState: ToastState = {
  toastEvent: null,
}

const toastSlice = createSlice({
    name: "toast",
    initialState: initialState,
    reducers: {
      triggerToast: (state, action: PayloadAction<ToastEvent>) => {
        state.toastEvent = action.payload;
      },
    },
});

export const { triggerToast } = toastSlice.actions;
export default toastSlice.reducer;