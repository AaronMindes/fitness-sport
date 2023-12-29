import React, { useEffect, useState } from 'react'
import Preset from '../../../Components/Preset/Preset';
import './BodyHomeStyle.scss'
import { NavLink } from 'react-router-dom';

const BodyHome = () => {

  const [preset, setPreset] = useState(null);

  useEffect(() => {
    const localPreset = localStorage.getItem('myPresets');
    console.log(localPreset);
    if (localPreset) setPreset(JSON.parse(localPreset));
  }, [])

  return (
    <div className='body-home-container'>
      {preset === null && (
        <div className='your-preset'>You dont have any preset</div>
      )}
      {preset && (
        <div>
          <div className='your-preset'>Presets:</div>
          <div className="presets-container">
            {preset.map((p,index) => (
              // <NavLink to={`/runExercices/${index}`}>
              <NavLink key={index} to={`/runExercices/${index}`}>
                <Preset preset={p}></Preset>
              </NavLink>
              // </NavLink>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default BodyHome