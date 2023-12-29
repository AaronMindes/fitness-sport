import React from 'react'
import './NavStyle.scss';
import { NavLink } from 'react-router-dom';

function Navbar() {

    const logo = require('../../Images/logo.png');

    return (
        <nav className='nav-container'>
            <ul className='ul-list'>
                <li>
                    <img className='logo' src={logo} alt="Logo" />
                </li>
                <li>
                    <NavLink to="/" className={({ isActive }) => (isActive ? 'active' : 'nav-link')}>
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/training" className={({ isActive }) => (isActive ? 'active' : 'nav-link')}>
                        Training
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/about" className={({ isActive }) => (isActive ? 'active' : 'nav-link')}>
                        About
                    </NavLink>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar