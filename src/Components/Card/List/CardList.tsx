import React, { useState, useEffect } from 'react';
import Card from '../Card';
import './CardListStyle.scss';
import ICard from '../Interface/CardInterface';


const DISPLAY_BATCH_SIZE = 20;
const MAX_SELECTED_CARDS = 10;

const CardList = ({ cards, onSelectedCardsChange, newFilter, nextStep }) => {
  const [selectedCards, setSelectedCards] = useState<ICard[]>([]);
  const [displayedCards, setDisplayedCards] = useState(DISPLAY_BATCH_SIZE); // Initial number of displayed cards

  const toggleCardSelection = (card: ICard) => {
    if (selectedCards.some(c => c.id === card.id)) {
      // If the card is already selected, remove it
      setSelectedCards(prevSelectedCards =>
        prevSelectedCards.filter(c => c.id !== card.id)
      );
    } else {
      // If the card is not selected, add it
      if (selectedCards.length >= MAX_SELECTED_CARDS) {
        alert("You must to select less of 10 exercices")
      } else setSelectedCards(prevSelectedCards => [...prevSelectedCards, card]);
    }
  };

  // Update the cards array with the isSelected property
  const updatedCards = cards
    .slice(0, displayedCards)
    .map(card => ({
      ...card,
      isSelected: selectedCards.some(c => c.id === card.id),
    }));

  const handleScroll = () => {
    if (!nextStep) {
      const windowHeight =
        'innerHeight' in window
          ? window.innerHeight
          : document.documentElement.offsetHeight;
      const body = document.body;
      const html = document.documentElement;
      const docHeight =
        Math.max(
          body.scrollHeight,
          body.offsetHeight,
          html.clientHeight,
          html.scrollHeight,
          html.offsetHeight
        ) - 100;

      const windowBottom = windowHeight + window.pageYOffset;

      // Check if the user has scrolled to the bottom and there are more cards to load
      if (windowBottom >= docHeight && displayedCards < cards.length) {
        // Increment the number of displayed cards by 20 or less if it's the last batch
        setDisplayedCards(prevDisplayedCards =>
          Math.min(prevDisplayedCards + DISPLAY_BATCH_SIZE, cards.length)
        );
      }
    }
  };

  useEffect(() => {
    // Add a scroll event listener to detect when the user scrolls
    window.addEventListener('scroll', handleScroll);

    // Remove the event listener when the component is unmounted
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [displayedCards, cards.length, nextStep]);

  // Call the callback function with the updated list of selected cards
  useEffect(() => {
    onSelectedCardsChange(selectedCards);
  }, [selectedCards, onSelectedCardsChange]);

  useEffect(() => {
    setSelectedCards(newFilter);
  }, [newFilter]);

  return (
    <div className='card-list-container'>
      {updatedCards.map((card, index) => (
        <div className='content' key={index} onClick={() => toggleCardSelection(card)}>
          <Card card={card} />
        </div>
      ))}
    </div>
  );
};

export default CardList;
