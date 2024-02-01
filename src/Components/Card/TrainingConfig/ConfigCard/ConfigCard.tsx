import React, { useEffect, useState } from 'react';
import './ConfigCardStyle.scss';

const ConfigCard = ({ onChangeConfig, cardId }) => {
  const [seriesNumber, setSeriesNumber] = useState(1);
  const [timePerSet, setTimePerSet] = useState(15);

  const changeCounter = (num) => {
    if (seriesNumber + num < 1) setSeriesNumber(1);
    else setSeriesNumber(seriesNumber + num);
  }


  const changeTime = (num) => {
    if (timePerSet + num < 15) {
      setTimePerSet(15);
    } else if (timePerSet + num >= 120) {
      setTimePerSet(120);
    } else {
      setTimePerSet(timePerSet + num);
    }
  };

  useEffect(() => {
    // Call the parent component's function with the updated values
    onChangeConfig(cardId,
      seriesNumber,
      timePerSet
    );
  }, [seriesNumber, , timePerSet]);


  return (
    <div className='config-card-container'>
      <div className='time'>
        <span className='span-time'>Times per set</span>
        <div className='time-content'>
          <span>
            {timePerSet > 60 ? `${Math.floor(timePerSet / 60)}m ${timePerSet % 60}s` : `${timePerSet}s`}
          </span>
          <div className='buttons'>
            <div className='button-div' onClick={() => changeTime(15)}>+</div >
            <div className='button-div' onClick={() => changeTime(-15)}>-</div >
          </div>
        </div>
      </div>
      <div className='set'>
        <div className='button-div' onClick={() => changeCounter(-1)}>-</div >
        <span>{seriesNumber} set</span>
        <div className='button-div' onClick={() => changeCounter(1)}>+</div >
      </div>
    </div>
  );
};

export default ConfigCard;
