import { Middleware } from '@reduxjs/toolkit';
import { clearHeroVoteMap, updateHeroVoteMap, updateLastChatVotedItem, updateVotesRequired } from '../store/eventSlice';
import { setHasActiveVoteSession, setHasVoted } from '../store/voteSlice';

let socket: WebSocket | null = null;

export const websocketMiddleware: Middleware = (store) => (next) => (action: any) => {
  switch (action.type) {
    case 'events/startWebSocket': {
      if (!socket) {
        console.log('[WS] Starting WebSocket connection...');

        const apiURL =
          process.env.NODE_ENV === 'production'
            ? process.env.REACT_APP_WS_URI
            : process.env.REACT_APP_WS_DEV;

        const channelID = action.payload.channelID;
        const socketURL = apiURL + `ws/${channelID}`;

        socket = new WebSocket(socketURL);

        socket.onopen = () => {
          console.log('[WS] Connected');
        };

        socket.onmessage = (event) => {
          try {
            const message = JSON.parse(event.data);
            const { event: eventType, data } = message;

            switch (eventType) {
              case 'votedHero':
                store.dispatch(updateHeroVoteMap(JSON.parse(data)));
                break;

              case 'votedItem':
                store.dispatch(updateLastChatVotedItem(data));
                break;

              case 'voteUpdate':
                store.dispatch(updateVotesRequired(data));
                break;

              case 'voteSession':
                if (data === 'started') {
                  store.dispatch(setHasActiveVoteSession(true));
                  store.dispatch(setHasVoted(false));
                  store.dispatch(clearHeroVoteMap());
                } else {
                  store.dispatch(setHasActiveVoteSession(false));
                  store.dispatch(setHasVoted(false));
                }
                break;

              default:
                console.warn('[WS] Unknown event:', eventType);
                break;
            }
          } catch (err) {
            console.error('[WS] Failed to parse message:', event.data);
          }
        };

        socket.onerror = (err) => {
          console.error('[WS] Error:', err);
        };

        socket.onclose = () => {
          console.log('[WS] Disconnected');
          socket = null;
          scheduleReconnect(channelID);
        };

        let reconnectTimer: NodeJS.Timeout | null = null;

        const scheduleReconnect = (channelID: string) => {
        if (reconnectTimer) return;
            reconnectTimer = setTimeout(() => {
                reconnectTimer = null;
                store.dispatch({ type: 'events/startWebSocket', payload: { channelID } });
            }, 3000);
        };
      }
      break;
    }

    case 'events/stopWebSocket': {
      if (socket) {
        console.log('[WS] Closing WebSocket...');
        socket.close();
        socket = null;
      }
      break;
    }

    default:
      break;
  }

  return next(action);
};
