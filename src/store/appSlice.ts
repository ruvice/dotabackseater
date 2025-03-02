import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export enum AppMode {
    Hero,
    Item
}

interface AppState {
    mode: AppMode
}

const initialState: AppState = {
  mode: AppMode.Hero
}

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    selectMode(state, action: PayloadAction<AppMode>) {
      state.mode = action.payload;
    },
  }
});

export const { selectMode } = appSlice.actions;
export default appSlice.reducer;