import { configureStore } from '@reduxjs/toolkit';
import voteReducer from './components/vote/voteSlice';
import searchReducer from './components/search/searchSlice'
import twitchReducer from './twitch/twitchSlice'
const store = configureStore({
  reducer: {
    vote: voteReducer,
    search: searchReducer,
    twitch: twitchReducer
  },
});

// Type definitions for the store and dispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;