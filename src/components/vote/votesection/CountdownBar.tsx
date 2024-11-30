import { useSelector } from 'react-redux';
import './CountdownBar.css'
import React from 'react';
import { RootState } from '../../../store';
import { useEffect, useState } from 'react';

const CountdownBar: React.FC = () => {
  const totalDuration = 15
  const countdown = useSelector((state: RootState) => state.vote.countdown);
  const [timeLeft, setTimeLeft] = useState(0)
  const [progressPercentage, setProgressPercentage] = useState(0.00)
  const [progressKey, setProgresKey] = useState(`progress-${countdown}`)
  useEffect(() => {
    setTimeLeft((countdown - Date.now())/1000)
    setProgressPercentage(((countdown - Date.now())/1000 / totalDuration) * 100);
    setProgresKey(`progress-${countdown}`)
  }, [countdown])
  return (
    <div>
      {timeLeft > 0 && (
        <div className='flex flex-col'>
          <div className="w-full h-[2px] rounded overflow-hidden">
            <div
              key={progressKey}
              className="shrink-progress-bar h-full bg-dota-loader-progression-color"
              style={{
                width: `${progressPercentage}%`,
                animationDuration: `${timeLeft}s`,
              }}
            ></div>
          </div>
          <p key={progressKey} className="text-xs text-dota-text-white self-end disappear-message" style={{animationDuration: `${timeLeft}s`}}>
            Voting available every 15 sec
          </p>
        </div>
      )}
    </div>
  );
};

export default CountdownBar;
