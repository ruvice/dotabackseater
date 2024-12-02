import { useEffect } from 'react';
import ItemList from './components/vote/ItemList'
import VoteSection from './components/vote/votesection/VoteSection';
import Search from './components/search/Search';
import Tooltip from './components/tooltip/Tooltip';
import { useDispatch } from 'react-redux';
import { AppDispatch } from './store';
import { updateChannelId, updateClientId, updateToken, updateUserId, updateStreamerConfig } from './twitch/twitchSlice';
import { StreamerConfig } from './models/streamerConfig';

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
      const apiURL = process.env.REACT_APP_SERVER_URI
      // const apiURL = "http://localhost:3000/"
      const fetchData = async () => {
        try {
          const response = await fetch(apiURL + "config/" + auth.channelId);
          if (!response.ok) { 
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          const streamerConfig: StreamerConfig = await response.json();
          dispatch(updateStreamerConfig(streamerConfig))
        } catch (err: any) {
          console.log("Error fetching streamer config");
        }
      };

      fetchData();
    })
  }, [dispatch])

  return (
    <div className="bg-dota-dark-tile-background max-h-[496px] h-[496px] w-[318px] max-w-[318px] p-3 overflow-hidden relative">
        <Search />
        <ItemList />
        <VoteSection />
        <Tooltip />
    </div>
  );
}

export default App;
