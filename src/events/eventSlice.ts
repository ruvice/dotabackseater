// eventSlice.ts
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { EventState, FetchExtensionHeroVoteStatusResult, FetchExtensionItemVoteStatusResult } from './eventTypes';
import { AppDispatch, RootState } from '../store';
import { setHasActiveVoteSession, setHasVoted } from '../components/vote/voteSlice';
import { HeroVoteMap } from '../models/models';

const initialState: EventState = {
  lastChatVotedItemID: "",
  currentCount: 0,
  heroVoteMap: undefined,
  hasVoted: false
}


export const getExtensionItemVoteStatus = createAsyncThunk('getExtensionItemVoteStatus', async (_, { getState, rejectWithValue }) => {
    const state = getState() as RootState; // Cast the state to RootState type
    const channelId = state.twitch.channelId; // Access the channelId from the state
    const apiURL =
    process.env.NODE_ENV === 'production'
        ? process.env.REACT_APP_SERVER_URI
        : process.env.REACT_APP_API_DEV;
    const response = await fetch(apiURL + 'vote/' + channelId);
    if (!response.ok) { 
        rejectWithValue({ activeSession: false })
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const res = await response.json();
    const result: FetchExtensionItemVoteStatusResult = {
        currentCount: res['current_count'],
        lastChatVotedItemID: res['item_id']
    }
    
    return result
});

export const getExtensionHeroVoteStatus = createAsyncThunk('getExtensionHeroVoteStatus', async (_, { getState, dispatch, rejectWithValue }) => {
    const state = getState() as RootState; // Cast the state to RootState type
    const channelId = state.twitch.channelId; // Access the channelId from the state
    const twitchId = state.twitch.userId;
    const apiURL =
    process.env.NODE_ENV === 'production'
        ? process.env.REACT_APP_SERVER_URI
        : process.env.REACT_APP_API_DEV;
    const response = await fetch(apiURL + 'vote/hero/status', {
        method: "GET",
        headers: {
            "Channel-Id": channelId,
            "Twitch-Id": twitchId
        }
    });
    if (!response.ok) { 
        dispatch(setHasActiveVoteSession(false))
        rejectWithValue(response.status)
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const result: FetchExtensionHeroVoteStatusResult = await response.json();
    dispatch(setHasActiveVoteSession(true))
    dispatch(setHasVoted(result.has_voted))
    console.log("ANDREW", result, result.hero_vote_map, result.has_voted)
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
    updateHeroVoteMap(state, action: PayloadAction<HeroVoteMap>) {
        state.heroVoteMap = action.payload
    },
    clearState(state) {
        state = initialState
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getExtensionItemVoteStatus.fulfilled, (state, action: PayloadAction<FetchExtensionItemVoteStatusResult>) => {
        state.lastChatVotedItemID = action.payload.lastChatVotedItemID;
        state.currentCount = action.payload.currentCount;
      })
      .addCase(getExtensionHeroVoteStatus.fulfilled, (state, action: PayloadAction<FetchExtensionHeroVoteStatusResult>) => {
        state.heroVoteMap = action.payload.hero_vote_map
      })
      .addCase(getExtensionHeroVoteStatus.rejected, (state, action: PayloadAction<any>) => {
        state.heroVoteMap = undefined
      })
  },
});

export const { updateVotesRequired, updateLastChatVotedItem, clearState, updateHeroVoteMap } = eventSlice.actions;
export default eventSlice.reducer;