import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Item } from '../../models/item';
import { VoteState } from './voteTypes';
import { RootState } from '../../store';

const initialState: VoteState = {
  selectedItem: null,
  countdown: Date.now()
}

export const castVote = createAsyncThunk('vote', async (_, { getState }) => {
  const state = getState() as RootState; // Cast the state to RootState type
  const channelId = state.twitch.channelId; // Access the channelId from the state
  const userId = state.twitch.userId; // Example: Access userId from user state
  const selectedItem = state.vote.selectedItem;
  
  const apiURL = process.env.REACT_APP_SERVER_URI
  // if (Date.now() >= countdown) {
  if (true) {
    console.log("valid send")
    try {
      const response = await fetch(apiURL + `vote/`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({
        "channel_id": channelId,
        "twitch_id": userId,
        "item_id": selectedItem?.id 
        })
      })
      if (!response.ok) {
        throw new Error('Failed to fetch votes');
      }
      const data = await response.json();
      return data;
    } catch(err) {
      console.log("Failed to send")
    }
  } else {
    console.log("invalid send")
    throw new Error('Countdown not over')
  }
});

const voteSlice = createSlice({
  name: 'vote',
  initialState,
  reducers: {
    select(state, action: PayloadAction<Item>) {
      state.selectedItem = action.payload ;
    },
    clearSelection(state) {
      state.selectedItem = null
    },
    setCountdown(state, action: PayloadAction<number>) {
      state.countdown = action.payload ;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(castVote.fulfilled, (state, action: PayloadAction<any>) => {
        state.selectedItem = null; // Optionally clear the selected item
        state.countdown = Date.now() + 30 * 1000; // Reset the countdown or update it as needed
      })
  },
});

export const { select, clearSelection, setCountdown } = voteSlice.actions;
export default voteSlice.reducer;