import React, { useEffect, useState } from 'react';
import { css } from '../utils/css';
import { ArrowDown, Svg } from './ui';
import { portrait, roles, linkedinHref, instagramHref } from '../data/portfolio';

const social = 'width: 46px; height: 46px; border-radius: 50%; border: 1px solid rgba(244, 241, 236, 0.4); display: flex; align-items: center; justify-content: center; color: #F4F1EC';

const Hero = ({ onContact }) => {
  const [role, setRole] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setRole((r) => (r + 1) % roles.length), 3200);
    return () => clearInterval(t);
  }, []);

  return (
    <section id="top" className="hero" style={css('position: relative; flex-shrink: 0; overflow: hidden; background: radial-gradient(ellipse 620px 520px at 50% 64%, #3B5BA5 0%, rgba(59, 91, 165, 0) 100%), #14213D')}>

      <div aria-hidden="true" className="h-first">DIMAS</div>
      <h1 className="h-last"><span style={css('position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0)')}>Dimas </span>FIRMANSYAH</h1>
      <img className="h-photo" src={portrait} alt="Portrait of Dimas Firmansyah" />
      <div className="h-role"><span key={role} className="rword">{roles[role]}</span></div>
      <div className="h-fade"></div>

      <span className="h-side" style={css('left: 64px; transform: translateY(-50%) rotate(180deg)')}>APPLIED DATA SCIENCE · PENS</span>
      <span className="h-side" style={css('right: 64px; transform: translateY(-50%)')}>SCROLL TO EXPLORE</span>

      <div className="h-bl">
        <span style={css('font-size: clamp(17px, 1.05vw, 20px); font-weight: 400; letter-spacing: -0.01em; line-height: 1.35; color: #F4F1EC')}>Turning raw data into <span style={css('font-weight: 800')}>models that actually ship.</span></span>
        <a className="btn-out" href="#projects" style={css('align-self: flex-start; display: inline-flex; align-items: center; gap: 12px; border: 1px solid #F4F1EC; padding: 13px 22px; border-radius: 999px; font-size: 14px; font-weight: 600')}>View my projects <ArrowDown /></a>
      </div>

      <div className="h-br">
        <span style={css('font-size: 12px; font-weight: 600; letter-spacing: 0.32em; color: #A9B3C9')}>GET TO KNOW ME BETTER</span>
        <div style={css('display: flex; gap: 10px')}>
          <a className="soc" href={linkedinHref} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" style={css(social)}><Svg size={18}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></Svg></a>
          <a className="soc" href={instagramHref} target="_blank" rel="noopener noreferrer" aria-label="Instagram" style={css(social)}><Svg size={18}><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="0.6" /></Svg></a>
          <a className="soc" href="#contact" onClick={onContact} aria-label="Email" style={css(social)}><Svg size={18}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></Svg></a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
