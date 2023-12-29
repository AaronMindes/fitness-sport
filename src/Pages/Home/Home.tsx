import React from 'react'
import Navbar from '../../Components/NavBar/Navbar'
import HeaderHome from './HeaderHome/HeaderHome'
import BodyHome from './BodyHome/BodyHome'
import './HomeStyle.scss'

function Home() {
  return (
    <div className='home-container'>
        <Navbar/>
        <HeaderHome/>
        <BodyHome/>
    </div>
  )
}

export default Home