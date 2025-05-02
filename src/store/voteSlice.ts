import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Hero, Item, ToastEvent, ToastType } from '../models/models';
import { RootState } from './store';
import { triggerToast } from './toastSlice';

export interface VoteState {
    selectedItem: Item | null
    selectedHero: Hero | null
    countdown: number
    hasActiveHeroVoteSession: boolean
    hasVoted: boolean
}

const initialState: VoteState = {
  selectedItem: null,
  selectedHero: null,
  countdown: Date.now(),
  hasActiveHeroVoteSession: false,
  hasVoted: false
}

export const castItemVote = createAsyncThunk('voteItem', async (_, { getState, rejectWithValue }) => {
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
                    'Channel-Id': channelId
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

export const castHeroVote = createAsyncThunk('voteHero', async (_, { getState, dispatch, rejectWithValue }) => {
    const state = getState() as RootState; // Cast the state to RootState type
    const channelId = state.twitch.channelId; // Access the channelId from the state
    const userId = state.twitch.userId; // Example: Access userId from user state
    const countdown = state.vote.countdown;
    const selectedHero = state.vote.selectedHero;

    const apiURL =
    process.env.NODE_ENV === 'production'
        ? process.env.REACT_APP_SERVER_URI
        : process.env.REACT_APP_API_DEV;
    try {
        const response = await fetch(apiURL + `vote/hero/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Channel-Id': channelId
            },
            body: JSON.stringify({
                "channel_id": channelId,
                "twitch_id": userId,
                "hero_id": selectedHero?.id 
            })
        })
        if (response.status === 429) {
            const retryAfter = Number(response.headers.get('Retry-After'))
            return rejectWithValue({ retryAfter: retryAfter })
        }
        if (!response.ok) {
            const errorData = await response.json();
            const toastEvent: ToastEvent = {
                message: errorData["error_message"],
                id: Date.now(),
                type: ToastType.Error
            }
            dispatch(triggerToast(toastEvent));
            throw new Error('Failed to fetch votes');
        }
    } catch(err) {
        throw new Error('Failed to send')
    }
});


export const startHeroVote = createAsyncThunk('startHeroVote', async (voteDuration: number, { getState, dispatch, rejectWithValue }) => {
    const state = getState() as RootState; // Cast the state to RootState type
    const channelId = state.twitch.channelId; // Access the channelId from the state

    const apiURL =
    process.env.NODE_ENV === 'production'
        ? process.env.REACT_APP_SERVER_URI
        : process.env.REACT_APP_API_DEV;
    console.log(voteDuration)
    try {
        const response = await fetch(apiURL + "vote/hero/start", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Channel-Id': channelId
            },
            body: JSON.stringify({
                'duration': voteDuration
            })
        })
        if (!response.ok) {
            throw new Error('Failed to start voting session');
        }
    } catch(err) {
        throw new Error('Failed to send')
    }
});

export const stopHeroVote = createAsyncThunk('stopHeroVote', async (_, { getState, dispatch, rejectWithValue }) => {
    const state = getState() as RootState; // Cast the state to RootState type
    const channelId = state.twitch.channelId; // Access the channelId from the state

    const apiURL =
    process.env.NODE_ENV === 'production'
        ? process.env.REACT_APP_SERVER_URI
        : process.env.REACT_APP_API_DEV;
    try {
        const response = await fetch(apiURL + "vote/hero/stop", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Channel-Id': channelId
            }
        })
        if (!response.ok) {
            throw new Error('Failed to stop voting session');
        }
    } catch(err) {
        throw new Error('Failed to send')
    }
});

const voteSlice = createSlice({
  name: 'vote',
  initialState,
  reducers: {
    select(state, action: PayloadAction<Item | Hero>) {
        if (action.payload.type === "item") {
            state.selectedItem = action.payload;
        } else {
            state.selectedHero = action.payload;
        }
    },
    setCountdown(state, action: PayloadAction<number>) {
      state.countdown = action.payload ;
    },
    setHasActiveVoteSession: (state, action: PayloadAction<boolean>) => {
        state.hasActiveHeroVoteSession = action.payload;
    },
    setHasVoted: (state, action: PayloadAction<boolean>) => {
        state.hasVoted = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(castItemVote.fulfilled, (state, action: PayloadAction<any>) => {
        state.selectedItem = null; // Optionally clear the selected item
        state.countdown = Date.now() + 15 * 1000; // Reset the countdown or update it as needed
      })
      .addCase(castItemVote.rejected, (state, action: PayloadAction<any>) => {
        const payload = action.payload
        if (payload !== undefined) {
          const retryAfter = payload.retryAfter
          state.countdown = Date.now() + retryAfter * 1000; // Reset the countdown or update it as needed
        }
      })
      .addCase(castHeroVote.fulfilled, (state, action: PayloadAction<any>) => {
        state.selectedHero = null; // Optionally clear the selected item
        // state.hasVoted = true
      })
  },
});

export const { select, setCountdown, setHasActiveVoteSession, setHasVoted } = voteSlice.actions;
export default voteSlice.reducer;