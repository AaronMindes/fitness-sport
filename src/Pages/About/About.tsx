import React from 'react';
import Navbar from '../../Components/NavBar/Navbar';
import './AboutStyle.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faComputer, faGuitar } from '@fortawesome/free-solid-svg-icons';

function About() {

  const profilPicture = require('../../Images/aaronProfilPicChihrour.jpg');

  return (
    <div className='about-container'>
      <Navbar />
      <div className='info'>
        <div className='picture-profile-name'>
          <div className='name'>
            <div>Aaron</div>
            <div>Mindes</div>
          </div>
          <div className="picture">
            {/* Ajoutez ici l'image de profil */}
            {/* <img src={profilPicture} alt="Profile" /> */}
          </div>
        </div>
        <div className='social-network'>
          {/* Ajoutez ici vos liens vers les réseaux sociaux */}
          <div className='YT'>
            <div className='YT-options'>
              <FontAwesomeIcon icon={faYoutube} size='3x' color='#FF0000' />
            </div>
            <div className='YT-music'>
              <a href="https://www.youtube.com/@AaronMindes" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faGuitar} size='3x' color='#DEB887' /></a>
            </div>
            <div className='YT-programation'>
              <a href="https://www.youtube.com/@KodKodProgramming" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faComputer} size='3x' color='#A9A9A9' /></a>
            </div>
          </div>
          <a href="https://www.linkedin.com/in/aaron-mindes-49670617b/" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faLinkedin} size='3x' color='#0A66C2' /></a>
          <a href="https://github.com/AaronMindes" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faGithub} size='3x' color='#333' /></a>
        </div>
      </div>
      <div className='text-info-app'>
        <p>Greetings! My name is Aaron, I am 24, I find my true passion in the world of creation.
          From my earliest years, I have immersed myself in the art of music, embarking on a
          self-taught journey that has taken me through the realms of the programation learned it
          by-self  and at the Air Force and computer science studies. Today, I am proud to present
          an application born out of a simple desire that one day led me to rise with the intention
          of engaging in physical activity.
          <td></td>
          This application, now available online, is a product of my dedication to the
          well-being of all. It serves as a commitment to personal growth and the pursuit
          of a healthy lifestyle. I invite everyone to explore its features and provide
          feedback – if you happen to come across any glitches or issues, I am more than
          willing to address them with enthusiasm. Let's embark on this journey towards
          a healthier and happier life together!
        </p>
      </div>
    </div>
  )
}

export default About