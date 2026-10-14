import React, { useState } from 'react';
import { css } from '../utils/css';
import { Svg } from './ui';

const links = [
  ['#about', 'ABOUT'],
  ['#experiences', 'EXPERIENCES'],
  ['#projects', 'PROJECTS'],
  ['#achievements', 'AWARDS'],
];

const Nav = ({ onContact }) => {
  const [open, setOpen] = useState(false);
  const dropLink = 'padding: 16px 0; border-bottom: 1px solid #2C3A5C';
  return (
    <header className="nav" style={css('position: sticky; top: 0; z-index: 50; height: 72px; margin-bottom: -72px; flex-shrink: 0; padding: 0 var(--pad); display: flex; align-items: center; justify-content: space-between; background: rgba(20, 33, 61, 0.84); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); border-bottom: 1px solid #2C3A5C')}>
      <a href="#top" aria-label="Back to top" style={css('display: flex; align-items: center')}>
        <img src="/assets/branding/navbar-logo-sm.png" alt="DF logo" style={css('display: block; height: 35px; width: auto')} />
      </a>
      <nav className="nav-links" aria-label="Sections" style={css('display: flex; align-items: center; gap: clamp(20px, 2.1vw, 40px); font-size: 13px; font-weight: 600; letter-spacing: 0.16em')}>
        {links.map(([href, label]) => <a key={href} href={href}>{label}</a>)}
        <a className="cta" href="#contact" onClick={onContact} style={css('padding: 12px 20px; border: 1px solid #F4F1EC; border-radius: 999px; transition: all .2s')}>CONTACT</a>
      </nav>
      <button type="button" className="nav-burger" aria-label="Menu" aria-expanded={open} onClick={() => setOpen(!open)} style={css('width: 44px; height: 44px; border-radius: 50%; border: 1px solid rgba(244, 241, 236, 0.5); background: transparent; color: #F4F1EC')}>
        {open ? (
          <Svg size={20}><path d="M6 6l12 12" /><path d="M18 6L6 18" /></Svg>
        ) : (
          <Svg size={20}><path d="M4 7h16" /><path d="M4 12h16" /><path d="M4 17h16" /></Svg>
        )}
      </button>
      {open && (
        <nav className="nav-drop" aria-label="Sections" style={css('position: absolute; top: 72px; left: 0; right: 0; background: #14213D; border-bottom: 1px solid #2C3A5C; padding: 4px var(--pad) 20px; display: flex; flex-direction: column; font-size: 15px; font-weight: 600; letter-spacing: 0.16em')}>
          {links.map(([href, label]) => <a key={href} href={href} onClick={() => setOpen(false)} style={css(dropLink)}>{label}</a>)}
          <a href="#contact" onClick={(e) => { setOpen(false); onContact(e); }} style={css('margin-top: 16px; align-self: flex-start; padding: 12px 20px; border: 1px solid #F4F1EC; border-radius: 999px')}>CONTACT</a>
        </nav>
      )}
    </header>
  );
};

export default Nav;
