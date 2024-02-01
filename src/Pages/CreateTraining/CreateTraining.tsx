import React, { useEffect, useState } from 'react';
import Navbar from '../../Components/NavBar/Navbar';
import { data } from '../../Services/Data';
import CardList from '../../Components/Card/List/CardList';
import HeaderCreateTraining from './Header/HeaderCreateTraining';
import './CreateTrainingStyle.scss';
import ICard from '../../Components/Card/Interface/CardInterface';
import SelectedCards from '../../Components/Card/SelectedCard/SelectedCards';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleUp } from '@fortawesome/free-solid-svg-icons';
import TrainingConfig from '../../Components/Card/TrainingConfig/TrainingConfig';
import { NavLink, useNavigate } from 'react-router-dom';
import IPreset from '../../Components/Preset/Interface/PresetInterface';

export const CreateTraining = () => {
    const listCards = data;
    const [selectedFilters, setSelectedFilters] = useState({
        force: [],
        level: [],
        mechanic: [],
        equipment: [],
        category: [],
    });
    const [showGoToTop, setShowGoToTop] = useState(false);
    const [nextStep, setNextStep] = useState(false);
    const [selectedCards, setSelectedCards] = useState<ICard[]>([]);
    const [newFilter, setNewFilter] = useState<ICard[]>([]);
    const [validatePresets, setValidatePresets] = useState<IPreset[]>([]);
    const [presetTitle, setPresetTitle] = useState<string>("");
    const navigate = useNavigate();


    const handleSelectedFiltersChange = (newFilters) => {
        setSelectedFilters(newFilters);
    };

    const handleSelectedCardsChange = (newCards: ICard[]) => {
        setSelectedCards(newCards);
    };

    const addNewPreset = (newPreset: IPreset[]) => {
        setValidatePresets(newPreset);
    };
    const addPresetTitle = (presetTitle: string) => {
        setPresetTitle(presetTitle);
    };

    const handleRemoveCardsChange = (cardToRemove: ICard) => {
        let temp = selectedCards.filter((c) => c.id !== cardToRemove.id);
        setNewFilter(temp);
    }

    const getFilteredData = () => {
        return listCards.filter((item) =>
            Object.entries(selectedFilters).every(([key, values]) =>
                values.length === 0 || values.includes(item[key])
            )
        );
    }

    const validateExercie = () => {
        if(presetTitle != ""){
            const newPreset = { presetTitle: presetTitle, exercices: validatePresets };
            let storedObjectArray = JSON.parse(localStorage.getItem('myPresets')) || [];
            storedObjectArray.push(newPreset);
            localStorage.setItem('myPresets', JSON.stringify(storedObjectArray));
            navigate("/");
        }else{
            alert("give a title");
        }
    }


    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY || document.documentElement.scrollTop;
            setShowGoToTop(scrollPosition > 200);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <div className={`create-training-container `}>
            <Navbar />

            <ul className='steps'>
                {nextStep ? <li onClick={() => setNextStep(false)}>Prev</li> : null}
                <li className='next' onClick={() => selectedCards.length === 0 ? alert("You need to choice at least one exercice") : setNextStep(true)}>
                    {nextStep ? <div onClick={() => validateExercie()}>Validate</div> : <div>Next</div>}
                </li>
            </ul>
            <div className={`step1 ${nextStep ? 'hidden' : ''}`}>
                {showGoToTop && (
                    <div className='go-to-the-top' onClick={scrollToTop}>
                        <FontAwesomeIcon icon={faAngleUp} />
                    </div>
                )}
                <HeaderCreateTraining onSelectedFiltersChange={handleSelectedFiltersChange} />
                {selectedCards.length > 0 && (
                    <div className='selected-card' style={{ bottom: window.screenY }}>
                        <SelectedCards card={selectedCards} onRemoveCardChange={handleRemoveCardsChange} />
                    </div>
                )}
                <CardList cards={getFilteredData()} onSelectedCardsChange={handleSelectedCardsChange} newFilter={newFilter} nextStep={nextStep} />
            </div>
            <div className={`step2 ${nextStep ? '' : 'hidden'}`}>
                {selectedCards.length > 0 && (
                    <div className='selected-card' style={{ bottom: window.screenY }}>
                        <TrainingConfig initialSelectedCards={selectedCards} myPreset={addNewPreset} myPresetName={addPresetTitle} />
                    </div>
                )}
            </div>
        </div>
    );
};
