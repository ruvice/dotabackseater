import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Item } from '../../models/item';
import { VoteState } from './voteTypes';
import { RootState } from '../../store';

const initialState: VoteState = {
  selectedItem: null,
  countdown: Date.now()
}

export const castVote = createAsyncThunk('vote', async (_, { getState, rejectWithValue }) => {
  const state = getState() as RootState; // Cast the state to RootState type
  const channelId = state.twitch.channelId; // Access the channelId from the state
  const userId = state.twitch.userId; // Example: Access userId from user state
  const countdown = state.vote.countdown;
  const selectedItem = state.vote.selectedItem;
  
  const apiURL =
    process.env.NODE_ENV === 'production'
      ? process.env.REACT_APP_SERVER_URI
      : process.env.REACT_APP_API_DEV;
  if (Date.now() >= countdown) {
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
      if (response.status === 429) {
        const retryAfter = Number(response.headers.get('Retry-After'))
        voteSlice.actions.setCountdown(Date.now()+retryAfter)
        return rejectWithValue({ retryAfter: retryAfter })
      }
      if (!response.ok) {
        throw new Error('Failed to fetch votes');
      }
    } catch(err) {
      throw new Error('Failed to send')
    }
  } else {
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
        state.countdown = Date.now() + 15 * 1000; // Reset the countdown or update it as needed
      })
      .addCase(castVote.rejected, (state, action: PayloadAction<any>) => {
        const payload = action.payload
        if (payload !== undefined) {
          const retryAfter = payload.retryAfter
          state.countdown = Date.now() + retryAfter * 1000; // Reset the countdown or update it as needed
        }
      })
  },
});

export const { select, clearSelection, setCountdown } = voteSlice.actions;
export default voteSlice.reducer;