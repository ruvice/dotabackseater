import { configureStore } from '@reduxjs/toolkit';
import voteReducer from './voteSlice';
import searchReducer from './searchSlice'
import twitchReducer from './twitchSlice'
import itemReducer from './itemSlice'
import eventReducer from './eventSlice'
import appReducer from './appSlice'
import heroReducer from './heroSlice'
import toastReducer from './toastSlice'
import { sseMiddleware } from '../events/eventsMiddleware';
import { websocketMiddleware } from '../events/wsMiddleware';
const store = configureStore({
  reducer: {
    vote: voteReducer,
    search: searchReducer,
    twitch: twitchReducer,
    item: itemReducer,
    hero: heroReducer,
    event: eventReducer,
    app: appReducer,
    toast: toastReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(websocketMiddleware),
});

// Type definitions for the store and dispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;