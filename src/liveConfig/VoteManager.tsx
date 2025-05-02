import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState, startHeroVote, stopHeroVote } from '../store/index';
import "./VoteManager.css"
// Define the type of the data being fetched
function VoteManager() {
    const [duration, setDuration] = useState<number>(0);
    const dispatch = useDispatch<AppDispatch>()
    const hasActiveSession = useSelector((state: RootState) => state.vote.hasActiveHeroVoteSession)
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDuration(parseInt(e.target.value))
    }
    const handleClick = () => {
        if (hasActiveSession) {
            dispatch(stopHeroVote())
        } else {
            dispatch(startHeroVote(duration))
        }
    }

  return (
    <div className="vote-manager-container">
        <p className="text-dota-text-white">Enter desired vote duration</p>
        <input className="vote-duration-input" type="number" min="10" max="120" step="1" id="voteDuration" name="voteDuration" placeholder="Between 10 - 120s" value={duration} onChange={handleChange}></input>
        <button className={
            `${hasActiveSession ? "bg-dota-selection-red" : "bg-dota-selection-green"}
            vote-duration-button`
        } type="button" id="submitButton" onClick={handleClick}><p className='text-dota-text-white'>{hasActiveSession ? 'Stop' : 'Start'}</p></button>
    </div>
  );
}

export default VoteManager;
