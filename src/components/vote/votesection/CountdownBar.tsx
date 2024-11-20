import { useSelector } from 'react-redux';
import './CountdownBar.css'
import React from 'react';
import { RootState } from '../../../store';

const CountdownBar: React.FC = () => {
  const totalDuration = 30
  const countdown = useSelector((state: RootState) => state.vote.countdown);
  const progressKey = `progress-${countdown}`;

  const timeLeft = (countdown - Date.now())/1000 + 5
  const progressPercentage = (timeLeft / totalDuration) * 100;
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
            Voting available every 30 sec
          </p>
        </div>
      )}
    </div>
  );
};

export default CountdownBar;
