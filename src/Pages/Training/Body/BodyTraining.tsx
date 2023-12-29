import React from 'react'
import './BodyTrainingStyle.scss'
import { NavLink } from 'react-router-dom'

function BodyTraining() {
    return (
        <div className='bodyTraining-container'>
            <NavLink to="/training/createTraining" className='nav-link'>
                Create a new training
            </NavLink>
            <NavLink to="/training/createTraining" className='nav-link'>
                Create a innovative food-list
            </NavLink>  
        </div>
    )
}

export default BodyTraining