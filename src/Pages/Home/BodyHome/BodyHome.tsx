import React, { useEffect, useState } from 'react'
import Preset from '../../../Components/Preset/Preset';
import './BodyHomeStyle.scss'
import { NavLink } from 'react-router-dom';

const BodyHome = () => {

  const [preset, setPreset] = useState(null);

  useEffect(() => {
    const localPreset = localStorage.getItem('myPresets');
    if (localPreset) setPreset(JSON.parse(localPreset));
  }, [])

  const removePreset = (index) => {
    const newStorage = preset.filter((p, i) => i !== index);
    setPreset(newStorage);
    localStorage.setItem('myPresets', JSON.stringify(newStorage));
  }

  return (
    <div className='body-home-container'>
      {preset === null && (
        <div className='your-preset'>You dont have any preset</div>
      )}
      {preset && (
        <div>
          <div className='your-preset'>Presets:</div>
          <div className="presets-container">
            {preset.map((p, index) => (
              <div key={index} className='container-preset-and-button'>
                <NavLink key={index} to={`/runExercices/${index}`}>
                  <Preset preset={p}></Preset>
                </NavLink>
                <div className="remove-preset" onClick={() => removePreset(index)}>Remove</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default BodyHome