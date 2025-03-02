import { useEffect } from 'react';
import VoteSection from './components/vote/votesection/VoteSection';
import Tooltip from './components/tooltip/Tooltip';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from './store';
import { updateChannelId, updateClientId, updateToken, updateUserId, updateStreamerConfig } from './twitch/twitchSlice';
import { StreamerConfig } from './models/streamerConfig';
import { getItems } from './components/vote/item/itemSlice';
import Panel from './components/panel/Panel';
import { getExtensionHeroVoteStatus, getExtensionItemVoteStatus } from './events/eventSlice';
import VoteSelectionSection from './components/voteSelectionSection/VoteSelectionSection';
import Header from './components/panel/Header';
import { getHeroes } from './components/vote/hero/heroSlice';
import Reordering from './Reordering';

// Define the type of the data being fetched
function App() {
    // Initial setup
    const dispatch = useDispatch<AppDispatch>()
  
    const selectedMode = useSelector((state: RootState) => state.app.mode);
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
                    const response = await fetch(apiURL + "config/" + auth.channelId,
                        {
                            method: "GET",
                            headers: {
                                "Channel-Id": auth.channelId
                        }
                    });
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
            dispatch(getHeroes())
            dispatch(getExtensionItemVoteStatus())
            dispatch(getExtensionHeroVoteStatus())
    })
    return () => {
      dispatch({ type: 'events/stopListening' });
    };
  }, [dispatch])

  return (
    // <Reordering />
    <div className="bg-dota-dark-tile-background max-h-[496px] h-[496px] w-[318px] max-w-[318px] p-3 overflow-hidden relative">
        <Header />
        <Panel />
        {/* { selectedMode === AppMode.Hero ? <>HeroSection</> : <ItemSection />} */}
        <VoteSelectionSection />
        <VoteSection />
        <Tooltip />
    </div>
  );
}

export default App;
