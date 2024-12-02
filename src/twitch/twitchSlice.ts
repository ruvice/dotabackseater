import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TwitchState } from './twitchTypes';
import { StreamerConfig } from '../models/streamerConfig';

const defaultStreamerConfig: StreamerConfig = {
  vote_threshold: "10"
}

const initialState: TwitchState = {
    userId: '',
    clientId: '',
    token: '',
    channelId: '',
    streamerConfig: defaultStreamerConfig
}

const twitchSlice = createSlice({
  name: 'twitch',
  initialState,
  reducers: {
    updateUserId(state, action: PayloadAction<string>) {
      state.userId = action.payload;
    },
    updateClientId(state, action: PayloadAction<string>) {
      state.clientId = action.payload;
    },
    updateToken(state, action: PayloadAction<string>) {
      state.token = action.payload;
    },
    updateChannelId(state, action: PayloadAction<string>) {
      state.channelId = action.payload;
    },
    updateStreamerConfig(state, action: PayloadAction<StreamerConfig>) {
      state.streamerConfig = action.payload;
    },
  },
});

export const { updateUserId, updateClientId, updateToken, updateChannelId, updateStreamerConfig } = twitchSlice.actions;
export default twitchSlice.reducer;