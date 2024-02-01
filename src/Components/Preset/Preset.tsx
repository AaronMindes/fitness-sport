import React, { useEffect, useState } from 'react'
import './PresetStyle.scss'

const Preset = ({ preset }) => {

  const [timeExercies, setTimeExercies] = useState('');

  function secondsToMinutesAndSeconds(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes > 0 ? `${minutes}m` : ""}${remainingSeconds}s`;
  }

  const calculPresetTime = () => {
    let counter = 0;
    preset.exercices.map((exercice) => {
      counter += exercice.timePerSet * exercice.seriesNumber + exercice.pauseTime;
    })
    setTimeExercies(secondsToMinutesAndSeconds(counter));
  }

  useEffect(() => {
    calculPresetTime();
  }, [])

  return (
    <div className='preset-container'>
      <div style={{display:"flex",flexDirection:"column",justifyContent:"space-between"}}>
      <div className='title'>{preset.presetTitle}</div>
      <div className='exercices-number'><strong>Exercices</strong>{preset.exercices.length}</div>
      <div className='muscles'><strong>Muscles</strong><div className='muscles-name'>{preset.exercices.map((exercice,index) => {
        return <span key={index}>{exercice.primaryMuscles}</span>;
      })}</div></div>
      {/* <div className='exercices-number'>Exercices Number<div>{preset.exercices.length}</div></div> */}
      </div>
      <div className='time'><div>{timeExercies}</div></div>
    </div>
  )
}

export default Preset