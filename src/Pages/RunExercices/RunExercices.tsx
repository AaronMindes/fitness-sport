import React, { useEffect, useState } from 'react';
import './RunExercicesStyles.scss';
import { useNavigate, useParams } from 'react-router-dom';
import SelectedCards from '../../Components/Card/SelectedCard/SelectedCards';

const RunExercices = () => {
    const { id } = useParams();
    const [preset, setPreset] = useState(null);
    const [cards, setCards] = useState([]);
    const [start, setStart] = useState(false);
    const [countdown, setCountdown] = useState(false);
    const [countdownNumber, setCountdownNumber] = useState(3);
    const [counter, setCounter] = useState(0);
    const [time, setTime] = useState(0);
    const [isPauseTime, setIsPauseTime] = useState(false);
    const [timeExercice, setTimeExercies] = useState(0 || "");
    const navigate = useNavigate();
    let test = 0;

    useEffect(() => {
        const localPreset = localStorage.getItem('myPresets');
        if (localPreset) {
            const allPresets = JSON.parse(localPreset);
            setPreset(allPresets[id]);
            setCards(allPresets[id]?.exercices || []); // Default to an empty array if 'exercices' is not present
            calculPresetTime(allPresets[id]);
        }
    }, [id]);

    function secondsToMinutesAndSeconds(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes > 0 ? `${minutes}m` : ""}${remainingSeconds}s`;
    }

    const calculPresetTime = (presets) => {
        let counter = 0;
        presets.exercices.map((exercice) => {
            counter += exercice.timePerSet * exercice.seriesNumber + exercice.pauseTime;
        })
        test = counter;
        // setTimeExercies(secondsToMinutesAndSeconds(counter));
    }


    const startTraining = () => {
        setStart(true);
        setCountdown(true);

        const startInterval = setInterval(() => {
            setCountdownNumber((prevCountdownNumber) => {
                if (prevCountdownNumber === 1) {
                    clearInterval(startInterval);
                    setCountdown(false);
                    setTime(cards[counter]?.timePerSet || 0); // Default to 0 if 'timePerSet' is not present
                } else {
                    return prevCountdownNumber - 1;
                }
            });
        }, 1000);

        return () => clearInterval(startInterval);
    };

    useEffect(() => {
        if (start && !countdown) {
            const exercisesInterval = setInterval(() => {
                test--;
                setTimeExercies(secondsToMinutesAndSeconds(test));
                setTime((prevTime) => {
                    const nextTime = prevTime - 1;
                    let cardSeriesNumber = cards[counter].seriesNumber;
                    let tempIsPauseTime = isPauseTime;
                    if (nextTime === 0) {

                        if (!isPauseTime) {
                            setCards(cards =>
                                cards.map((card, index) =>
                                    index === counter
                                        ? { ...card, seriesNumber: card.seriesNumber - 1 }
                                        : card
                                )
                            )
                            cardSeriesNumber--;
                        }

                        if (cardSeriesNumber < 0) {
                            setIsPauseTime(false)
                        }
                        if (cardSeriesNumber === 0 && cards[counter].pauseTime > 0) {
                            setIsPauseTime(true);
                            setTime(cards[counter].pauseTime);
                            setCards(cards =>
                                cards.map((card, index) =>
                                    index === counter
                                        ? { ...card, seriesNumber: card.seriesNumber - 1 }
                                        : card
                                )
                            )
                            cardSeriesNumber--;
                            return counter;
                        }


                        setCounter((prevCounter) => {
                            console.log(cardSeriesNumber)
                            console.log(tempIsPauseTime)
                            const nextCounter = prevCounter + 1;
                            if (nextCounter === cards.length && cardSeriesNumber < 1) {
                                clearInterval(exercisesInterval);
                                setStart(false);
                                navigate('/');
                            } else if (cardSeriesNumber > 0) {
                                if (cards[counter].pauseTime > 0) { tempIsPauseTime = !tempIsPauseTime; setIsPauseTime((prevPauseTime) => { return !prevPauseTime }); }
                                if (cards[counter].pauseTime > 0 && tempIsPauseTime) {
                                    setTime(cards[counter].pauseTime);
                                    return counter;
                                } else {//set
                                    setTime(cards[counter].timePerSet);
                                    return counter;
                                }
                            } else {
                                setTime(cards[nextCounter]?.timePerSet);
                                return nextCounter;
                            }

                        })

                    } else {
                        return nextTime;
                    }
                });
            }, 1000);

            return () => clearInterval(exercisesInterval);
        }
    }, [start, countdown, time, counter, cards]);

    // tempObject.push({ name: preset.name, level: preset.level, equipment: preset.equipment, instructions: preset.instructions, category: preset.category, pauseTime: preset.pauseTime, seriesNumber: preset.seriesNumber, })
    return (
        <div className="run-exercises-container">
            {!start && (
                <div className='before-start'>
                    <div className='container-selected-cards'>
                        <SelectedCards card={cards} />
                    </div>

                    <div className='info-preset'>
                        <div className='container-info-preset'>
                            {cards.map((p, index) => (
                                <div className='info-display' key={index}>
                                    <div><strong>Exercice {index + 1}</strong></div>
                                    <div><strong>{p.name}</strong></div>
                                    <div><strong>Level </strong> {p.level}</div>
                                    <div><strong>Equipement </strong>{p.equipement}</div>
                                    <div><strong>Instruction: </strong>{p.instructions}</div>
                                    <div><strong>Category: </strong>{p.category}</div>
                                    <div><strong>PauseTime </strong>{p.pauseTime}</div>
                                    <div><strong>Series </strong>{p.seriesNumber}</div>
                                    <div><strong>PauseTime </strong>{p.pauseTime}</div>
                                    <div><strong>TimePerSet </strong> {p.timePerSet}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="start-button" onClick={() => startTraining()}>
                        START
                    </div>
                </div>
            )}
            {start && (
                <div className="start-container">
                    {timeExercice}
                    {countdown && <div className="countdown">{countdownNumber}</div>}
                    {!countdown && (
                        <div className='container'>
                            <div className="time">{time}</div>
                            {!isPauseTime && (
                                <div className="instructions">{cards[counter]?.instructions}</div>
                            )}
                            {!isPauseTime && (

                                < div className='images'>
                                    {cards[counter] && (
                                        <img src={require(`../../Images/exercises/${cards[counter].id}/${time % 2 === 0 ? '1' : '0'}.jpg`)} alt="" />
                                    )}
                                </div>
                            )}
                            {!isPauseTime && (
                                <div className="set">{cards[counter]?.seriesNumber} SET</div>
                            )}
                        </div>
                    )}
                </div>
            )
            }
        </div >
    );
};

export default RunExercices;
