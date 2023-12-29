import React from 'react';
import Card from '../Card';
import './SelectedCardsStyle.scss';
import ICard from '../Interface/CardInterface';

interface SelectedCardsProps {
    card: ICard[];
    onRemoveCardChange?: (card: ICard) => void;
}

const SelectedCards: React.FC<SelectedCardsProps> = ({ card, onRemoveCardChange }) => {
    const removeCard = (selectedCard: ICard) => {
        if (onRemoveCardChange) {
            onRemoveCardChange(selectedCard);
        }
    };

    return (
        <div className='selected-card-container'>
            {card?.map((selectedCard, index) => (
                <div className='content' key={index}>
                    <Card card={selectedCard} width={150} />
                    {onRemoveCardChange && (
                        <div className='remove-card' onClick={() => {removeCard(selectedCard)}}>
                            <div className='x'>X</div>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default SelectedCards;
