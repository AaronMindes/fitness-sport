import React, { useEffect, useState } from 'react'
import './PresetStyle.scss'

const Preset = ({ preset }) => {

  const [timeExercies, setTimeExercies] = useState('');

  // name: string;
  // force: string;
  // level: string;
  // mechanic: string;
  // equipment: string;
  // primaryMuscles: string[];
  // secondaryMuscles: string[];
  // instructions: string[];
  // category: string;
  // images: string[];
  // id: string;
  // isSelected?: boolean;
  // pauseTime?: number;
  // presetName: string;
  // seriesNumber: number;
  // timePerSet: number;

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
    console.log(preset.exercices)
  }, [])

  return (
    <div className='preset-container'>
      <div className='title'>{preset.presetTitle}</div>
      <div className='exercices-number'><strong>Exercices</strong>{preset.exercices.length}</div>
      <div className='muscles'><strong>Muscles</strong><div className='muscles-name'>{preset.exercices.map((exercice,index) => {
        return <span key={index}>{exercice.primaryMuscles}</span>;
      })}</div></div>
      {/* <div className='exercices-number'>Exercices Number<div>{preset.exercices.length}</div></div> */}
      <div className='time'><div>{timeExercies}</div></div>
    </div>
  )
}

export default Preset