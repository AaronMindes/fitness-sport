import React, { useState } from 'react'
import ICard from './Interface/CardInterface'
import './CardStyle.scss'

const Card = ({ card, width }: { card: ICard; width?: number }) => {

  const isSelected = card.isSelected || false;
  const [isHovered, setIsHovered] = useState(false);
  const [isHoveredInfo, setIsHoveredInfo] = useState(false);
  const [toggleInfo, setToggleInfo] = useState(false);

  const handleMouseEnter = width ? undefined : () => setIsHovered(true);
  const handleMouseLeave = width ? undefined : () => setIsHovered(false);
  const handleMouseEnterToggleInfo = width ? undefined : () => setToggleInfo(true);
  const handleMouseLeaveToggleInfo = width ? undefined : () => setToggleInfo(false);
  const handleMouseEnterInfoDescription = width ? undefined : () => setIsHoveredInfo(true);
  const handleMouseLeaveInfoDescription = width ? undefined : () => setIsHoveredInfo(false);

  const containerStyle = {
    minWidth: width || "",
    maxWidth: width || "",
    fontSize: width ? "10px" : "",
    cursor: width ? "default" : "pointer"
  }

  const imageStyle = {
    height: width ? width * 0.7 : "",
    cursor: width ? "default" : "pointer"
  }


  return (
    <div className={`card-container ${isSelected ? 'selected' : ''}`} style={containerStyle} onMouseEnter={handleMouseEnterToggleInfo} onMouseLeave={handleMouseLeaveToggleInfo}>
      {!width && (
        <div className='description-container'>
          {
            toggleInfo && !isSelected && (
              <div className='info-description' onMouseEnter={handleMouseEnterInfoDescription} onMouseLeave={handleMouseLeaveInfoDescription}>!</div>
            )
          }
          {isHoveredInfo && (
            <div className='description-container' onMouseEnter={handleMouseEnterInfoDescription} onMouseLeave={handleMouseLeaveInfoDescription}>{card.instructions}</div>
          )}
        </div>
      )}
      <img style={imageStyle} src={require(`../../Images/exercises/${card.id}/${isHovered ? '1' : '0'}.jpg`)} alt="exercice-image" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} />
      <div className='content'>
        <div className='card-title'>{card.name}</div>
        <div className='info-body-part'>
          <div className='info-text'>Body part:</div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {card.primaryMuscles.map((muscle, index) => (
              <div style={{ textAlign: 'end' }} key={index}>{muscle}</div>
            ))}
          </div>
        </div>

        <div className='info'><div className='info-text'>Equipement: </div>{card.mechanic ?? '-'}</div>
        <div className='info'><div className='info-text'>Level: </div>{card.level}</div>
        <div className='info'>
          <div className='info-text'>Force: </div>
          {card.force}
        </div>
      </div>
    </div>
  );
};

export default Card;
