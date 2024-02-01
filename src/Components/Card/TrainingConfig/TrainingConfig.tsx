import React, { useEffect, useState } from 'react';
import './TrainingConfigStyle.scss';
import Card from '../Card';
import ConfigCard from './ConfigCard/ConfigCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleLeft, faArrowAltCircleRight } from '@fortawesome/free-solid-svg-icons';
import ICard from '../Interface/CardInterface';

const TrainingConfig = ({ initialSelectedCards, myPreset, myPresetName }) => {

    const [selectedCards, setSelectedCards] = useState(initialSelectedCards);
    const [inputValue, setInputValue] = useState('');
    const [pauseTime, setPauseTime] = useState(0);



    useEffect(() => {
        // setSelectedCards(initialSelectedCards.map(card => ({ ...card, pauseTime: 0 })));
        setSelectedCards(initialSelectedCards.map(card => ({ ...card, pauseTime: 0, seriesNumber: 1, timePerSet: 15 })));
    }, [initialSelectedCards]);
    useEffect(() => {
        myPreset(selectedCards);
    }, [initialSelectedCards, pauseTime, selectedCards]);
    useEffect(() => {
        myPresetName(inputValue);
    }, [inputValue]);

    const switchCards = (card: ICard, action: string) => {
        const index1 = selectedCards.findIndex(c => c.id === card.id);

        if (action === 'right' && index1 < selectedCards.length - 1) {
            const updatedCards = [...selectedCards];
            const temp = updatedCards[index1];
            updatedCards[index1] = updatedCards[index1 + 1];
            updatedCards[index1 + 1] = temp;
            setSelectedCards(updatedCards);
        }

        if (action === 'left') {
            const updatedCards = [...selectedCards];
            const temp = updatedCards[index1];
            updatedCards[index1] = updatedCards[index1 + 1];
            updatedCards[index1 + 1] = temp;
            setSelectedCards(updatedCards);
        }
    };

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    }

    const handleCardConfigChange = (cardId, seriesNumber, timePerSet) => {
        // Find the card in selectedCards and update its configuration
        const updatedCards = selectedCards.map(card =>
            card.id === cardId ? { ...card, seriesNumber, timePerSet } : card
        );
        setSelectedCards(updatedCards);
    };

    const changeTime = (cardIndex, num) => {
        const updatedCards = [...selectedCards];
        const card = updatedCards[cardIndex];

        if (card.pauseTime + num < 0) {
            card.pauseTime = 5;
        } else if (card.pauseTime + num >= 120) {
            card.pauseTime = 120;
        } else {
            card.pauseTime += num;
        }

        setSelectedCards(updatedCards);
    }

    const inputStyle: React.CSSProperties = {
        width: `${inputValue.length * 9}px`
    }

    return (
        <div className='training-config-container'>
            <div className='training-info'>
                <h2>The Button time in the card configure the time of the exerice</h2>
                <h2>The Button set in the card configure how time you will do this exerice</h2>
                <h2>The Button on the side of the card configure the pause time between two exercice</h2>
            </div>

            <div className='training-name'>
                <h1>Training name</h1>
                <input
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    style={inputStyle}
                />
            </div>

            <div className="container-selected-card">

                {selectedCards.map((card, index) => (
                    <div className="container" key={index}>
                        <div className="content">
                            <h1>{index + 1}</h1>
                            <div className='card-config'>
                                <div className='training-config-card'>
                                    <Card card={card} width={150} />
                                </div>
                                <ConfigCard
                                    cardId={card.id}
                                    onChangeConfig={(cardId, seriesNumber, timePerSet) => handleCardConfigChange(cardId, seriesNumber, timePerSet)}
                                />
                            </div>
                        </div>
                            {(selectedCards[index].seriesNumber > 1 || index !== selectedCards.length - 1) && (
                        <div className="arrow-container">
                            {index !== selectedCards.length - 1 && (
                                <div className="arrow" onClick={() => switchCards(card, "left")}>
                                    <FontAwesomeIcon icon={faArrowAltCircleLeft} size='3x' color='#034078' />
                                </div>
                            )}

                            <div className='time'>
                                <div className='time-content'>
                                    <span>
                                        {card.pauseTime > 60 ? `${Math.floor(card.pauseTime / 60)}m ${card.pauseTime % 60}s` : `${card.pauseTime}s`}
                                    </span>
                                    <div className='buttons'>
                                        <div className='button-div' onClick={() => changeTime(index, 5)}>+</div>
                                        <div className='button-div' onClick={() => changeTime(index, -5)}>-</div>
                                    </div>
                                </div>
                            </div>
                            {index !== selectedCards.length - 1 && (
                                
                                <div className="arrow" onClick={() => switchCards(card, "right")}>
                                    <FontAwesomeIcon icon={faArrowAltCircleRight} size='3x' color='#034078' />
                                </div>
                            )}
                        </div>
                                    )}
                        {/* {index !== selectedCards.length - 1 && (
                            <div className="arrow-container">
                                <div className="arrow" onClick={() => switchCards(card, "left")}>
                                    <FontAwesomeIcon icon={faArrowAltCircleLeft} size='3x' color='#034078' />
                                </div>
                                <div className='time'>

                                    <div className='time-content'>
                                        <span>
                                            {card.pauseTime > 60 ? `${Math.floor(card.pauseTime / 60)}m ${card.pauseTime % 60}s` : `${card.pauseTime}s`}
                                        </span>
                                        <div className='buttons'>
                                            <div className='button-div' onClick={() => changeTime(index, 5)}>+</div>
                                            <div className='button-div' onClick={() => changeTime(index, -5)}>-</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="arrow" onClick={() => switchCards(card, "right")}>
                                    <FontAwesomeIcon icon={faArrowAltCircleRight} size='3x' color='#034078' />
                                </div>
                            </div>
                        )} */}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TrainingConfig;
