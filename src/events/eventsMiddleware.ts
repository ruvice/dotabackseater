// middleware/sseMiddleware.ts
import { Middleware } from '@reduxjs/toolkit';
import { clearHeroVoteMap, updateHeroVoteMap, updateLastChatVotedItem, updateVotesRequired } from './eventSlice';
import { setHasActiveVoteSession, setHasVoted } from '../components/vote/voteSlice';

let eventSource: EventSource | null = null;

export const sseMiddleware: Middleware = (store) => (next) => (action: any) => {
  switch (action.type) {
    case 'events/startListening': {
      if (!eventSource) {
        console.log('Starting SSE connection...');
        const apiURL =
          process.env.NODE_ENV === 'production'
            ? process.env.REACT_APP_SERVER_URI
            : process.env.REACT_APP_API_DEV;
        eventSource = new EventSource(apiURL + 'sse/' + action.payload.channelID);
        
        eventSource.addEventListener('voteUpdate', (event) => {
          store.dispatch(updateVotesRequired(event.data)); // Dispatch the event to the store
        });
        
        eventSource.addEventListener('votedItem', (event) => {
          store.dispatch(updateLastChatVotedItem(event.data)); // Dispatch the event to the store
        });

        eventSource.addEventListener('votedHero', (event) => {
            store.dispatch(updateHeroVoteMap(JSON.parse(event.data)))
        })

        eventSource.addEventListener('voteSession', (event) => {
            if (event.data === "started") {
                store.dispatch(setHasActiveVoteSession(true))
                store.dispatch(setHasVoted(false))
                store.dispatch(clearHeroVoteMap())
            } else {
                store.dispatch(setHasActiveVoteSession(false))
                store.dispatch(setHasVoted(false))
            }
        })
      }
      break;
    }

    case 'events/stopListening': {
      if (eventSource) {
        console.log('Stopping SSE connection...');
        eventSource.close();
        eventSource = null;
      }
      break;
    }

    default:
      break;
  }

  return next(action);
};
