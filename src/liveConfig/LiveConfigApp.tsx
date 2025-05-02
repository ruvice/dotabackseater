import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateChannelId, updateClientId, updateToken, updateUserId, updateStreamerConfig, getHeroes, 
    AppDispatch, RootState, getExtensionHeroVoteStatus, getExtensionItemVoteStatus, getItems } from '../store/index';
import { StreamerConfig } from '../models/streamerConfig';
import ToastManager from '../components/toast/ToastManager';
import VoteManager from './VoteManager';
import HeroVoteLiveResultView from './HeroVoteLiveResultView';
import App from '../App';
import './LiveConfigApp.css'
// Define the type of the data being fetched
function LiveConfigApp() {
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
                    // dispatch({ type: 'events/startListening', payload: { channelID: auth.channelId } });
                    dispatch({ type: 'events/startWebSocket', payload: { channelID: auth.channelId } });
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
      dispatch({ type: 'events/stopWebSocket' });
    };
  }, [dispatch])

  return (
    <>
        <div className="bg-dota-panel-background grid-layout">
            <div className='header'>
                <h1 className="text-dota-text-white text-lg font-bold header text-center">Manage Hero Vote Sessions</h1>
            </div>
            <div className='left'><VoteManager /></div>
            <div className='right'><HeroVoteLiveResultView /></div>
        </div>
    </>
  );
}

export default LiveConfigApp;
