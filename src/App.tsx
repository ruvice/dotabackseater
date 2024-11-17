import { useEffect, useState, useMemo } from 'react';
import ItemList from './components/vote/ItemList'
import VoteSection from './components/vote/votesection/VoteSection';
import Search from './components/search/Search';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from './store';
import { updateChannelId, updateClientId, updateToken, updateUserId } from './twitch/twitchSlice';

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
    })
  }, [])

  return (
    <div className="bg-dota-dark-tile-background max-h-[496px] h-[496px] w-[318px] max-w-[318px] p-3 overflow-hidden">
        <Search />
        <ItemList />
        <VoteSection />
    </div>
  );
}

export default App;
