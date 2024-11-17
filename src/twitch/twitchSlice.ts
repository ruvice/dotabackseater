import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TwitchState } from './twitchTypes';

const initialState: TwitchState = {
    userId: '',
    clientId: '',
    token: '',
    channelId: ''
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
  },
});

export const { updateUserId, updateClientId, updateToken, updateChannelId } = twitchSlice.actions;
export default twitchSlice.reducer;