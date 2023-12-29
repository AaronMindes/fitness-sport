import React, { useEffect, useState } from 'react';
import './HeaderTrainingStyle.scss';

function HeaderTraining() {
    const [isTitleVisible, setIsTitleVisible] = useState(false);

    useEffect(() => {
        // Set a flag to indicate that the component has mounted
        setIsTitleVisible(true);
    }, []);

    return (
        <div className={`headerTraining-container ${isTitleVisible ? 'visible' : ''}`}>
            <h1>Craft your personalized workout routine</h1>
        </div>
    );
}

export default HeaderTraining;
