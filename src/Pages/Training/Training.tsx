import React from 'react'
import Navbar from '../../Components/NavBar/Navbar'
import HeaderTraining from './Header/HeaderTraining'
import BodyTraining from './Body/BodyTraining'
import './TrainingStyle.scss'

function Training() {
    return (
        <div className='training-container'>
            <Navbar />
            <div className='container'>
                <HeaderTraining />
                <BodyTraining />
            </div>
        </div>
    )
}

export default Training