// eventSlice.ts
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { EventState, FetchExtensionVoteStatusResult } from './eventTypes';
import { RootState } from '../store';

const initialState: EventState = {
  lastChatVotedItemID: "",
  currentCount: 0
}

export const getExtensionVoteStatus = createAsyncThunk('getExtensionVoteStatus', async (_, { getState, rejectWithValue }) => {
  const state = getState() as RootState; // Cast the state to RootState type
  const channelId = state.twitch.channelId; // Access the channelId from the state
  const apiURL =
    process.env.NODE_ENV === 'production'
      ? process.env.REACT_APP_SERVER_URI
      : process.env.REACT_APP_API_DEV;
  const response = await fetch(apiURL + 'vote/' + channelId);
  if (!response.ok) { 
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  const res = await response.json();
  const result: FetchExtensionVoteStatusResult = {
    currentCount: res['current_count'],
    lastChatVotedItemID: res['item_id']
  }
  return result
});

const eventSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    updateVotesRequired(state, action: PayloadAction<string>) {
      const currentCount = Number(action.payload)
      state.currentCount = currentCount
    },
    updateLastChatVotedItem(state, action: PayloadAction<string>) {
      state.lastChatVotedItemID = action.payload
    },
    clearState(state) {
      state = initialState
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getExtensionVoteStatus.fulfilled, (state, action: PayloadAction<FetchExtensionVoteStatusResult>) => {
        state.lastChatVotedItemID = action.payload.lastChatVotedItemID;
        state.currentCount = action.payload.currentCount;
      })
  },
});

export const { updateVotesRequired, updateLastChatVotedItem, clearState } = eventSlice.actions;
export default eventSlice.reducer;
