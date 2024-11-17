import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Item } from '../../models/item';
import { VoteState } from './voteTypes';

const initialState: VoteState = {
  selectedItem: null
}

const voteSlice = createSlice({
  name: 'vote',
  initialState,
  reducers: {
    select(state, action: PayloadAction<Item>) {
      state.selectedItem = action.payload ;
    },
  },
});

export const { select } = voteSlice.actions;
export default voteSlice.reducer;