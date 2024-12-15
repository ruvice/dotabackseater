import { useEffect } from 'react';
import ItemList from './components/vote/item/ItemList'
import VoteSection from './components/vote/votesection/VoteSection';
import Search from './components/search/Search';
import Tooltip from './components/tooltip/Tooltip';
import { useDispatch } from 'react-redux';
import { AppDispatch } from './store';
import { updateChannelId, updateClientId, updateToken, updateUserId, updateStreamerConfig } from './twitch/twitchSlice';
import { StreamerConfig } from './models/streamerConfig';
import { getItems } from './components/vote/item/itemSlice';
import Panel from './components/panel/Panel';
import { getExtensionVoteStatus } from './events/eventSlice';

// Define the type of the data being fetched
function App() {
  // Initial setup
  const dispatch = useDispatch<AppDispatch>()
  useEffect(() => {
    window.Twitch.ext.onAuthorized(function(auth) {
      dispatch(updateUserId(auth.userId))
      dispatch(updateClientId(auth.clientId))
      dispatch(updateToken(auth.token))
      dispatch(updateChannelId(auth.channelId))
      const apiURL =
        process.env.NODE_ENV === 'production'
          ? process.env.REACT_APP_SERVER_URI
          : process.env.REACT_APP_API_DEV;
      const fetchData = async () => {
        try {
          const response = await fetch(apiURL + "config/" + auth.channelId);
          if (!response.ok) { 
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          const streamerConfig: StreamerConfig = await response.json();
          dispatch(updateStreamerConfig(streamerConfig))
          dispatch({ type: 'events/startListening', payload: { channelID: auth.channelId } });
        } catch (err: any) {
          console.log("Error fetching streamer config");
        }
      };
      fetchData();
      dispatch(getItems())
      dispatch(getExtensionVoteStatus())
    })
    return () => {
      dispatch({ type: 'events/stopListening' });
    };
  }, [dispatch])

  return (
    <div className="bg-dota-dark-tile-background max-h-[496px] h-[496px] w-[318px] max-w-[318px] p-3 overflow-hidden relative">
        <Panel />
        <Search />
        <ItemList />
        <VoteSection />
        <Tooltip />
    </div>
  );
}

export default App;
