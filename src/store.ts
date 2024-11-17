import { configureStore } from '@reduxjs/toolkit';
import voteReducer from './components/vote/voteSlice';
const store = configureStore({
  reducer: {
    vote: voteReducer
  },
});

// Type definitions for the store and dispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;