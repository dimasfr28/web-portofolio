import React, { useState, useEffect } from 'react';
import './Hero.css';

const Hero = () => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  
  const titles = ['AI ENGINEER', 'DATA SCIENTIST', 'DATA ENGINEER', 'SOFTWARE DEVELOPER'];
  
  useEffect(() => {
    const currentTitle = titles[currentIndex];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < currentTitle.length) {
          setDisplayText(currentTitle.slice(0, displayText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(displayText.slice(0, -1));
        } else {
          setIsDeleting(false);
          setCurrentIndex((prev) => (prev + 1) % titles.length);
        }
      }
    }, isDeleting ? 50 : 100);
    
    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentIndex]);

  return (
    <section id="hero" className="hero">
      <div className="hero-container" id="about">
        <div className="hero-content">
          <div className="hero-text">
            <p className="hero-intro">DIMAS FIRMANSYAH</p>
            <h1 className="hero-title">
              {displayText}
              <span className="cursor">|</span>
            </h1>
            <p className="hero-subtitle">
              5th Semester Applied Data Science Student Of Surabaya State Electronics Polytechnic
            </p>
            <button
              className="contact-button"
              onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
            >
              CONTACT ME
            </button>
          </div>

          <div className="hero-visual">
            <img src="/assets/home/thunder.png" alt="Thunder Effect" className="thunder-effect" />
            
            <div className="profile-image-wrapper">
              <img src="/assets/home/foto_profil.png" alt="Dimas Firmansyah" className="profile-image" />
            </div>

            <img src="/assets/home/python_3d.png" alt="Python" className="tech-icon python-icon" />
            <img src="/assets/home/nextjs_3d.png" alt="React" className="tech-icon react-icon" />
            <img src="/assets/home/opencv_3d.png" alt="Figma" className="tech-icon figma-icon" />
            <img src="/assets/home/docker_3d.png" alt="Docker" className="tech-icon docker-icon" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
