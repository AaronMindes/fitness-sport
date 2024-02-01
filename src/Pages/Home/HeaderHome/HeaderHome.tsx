import React, { useEffect, useState } from 'react'
import './HeaderHomeStyle.scss'

const HeaderHome = () => {

    const [exeCounter, setExeCounter] = useState("");

    useEffect(() => {
        initCounter();
    })

    const initCounter = () => {
        const isExist = localStorage.getItem('exeCounter');
        console.log(isExist);
        if (isExist == null) {
            localStorage.setItem('exeCounter', JSON.stringify(0));
        }
        setExeCounter(isExist);
    }

    return (
        <div className='header-home-container'>
            <div className='content'>
                <p>Surpass Your Limits, Embrace Your Passion.</p>
                <p>Score Your Victory: Welcome to ToGo+.</p>
                <div className='button-info'><div>{Math.ceil((Number(exeCounter) - 1) / 2)} exercices in this week</div></div>
            </div>
        </div>
    )
}

export default HeaderHome