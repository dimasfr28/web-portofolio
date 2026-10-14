import React from 'react';
import { css } from '../utils/css';
import { githubHref, linkedinHref, instagramHref } from '../data/portfolio';

const Footer = ({ onContact }) => {
  const link = css('color: #F4EEE3');
  return (
    <footer className="foot" style={css('background: #121214; color: #F4EEE3')}>
      <a href="#top" aria-label="Back to top" style={css('display: flex; align-items: center; margin: -10px 0')}>
        <img src="/assets/branding/navbar-logo-sm.png" alt="DF logo" style={css('display: block; height: 56px; width: auto')} />
      </a>
      <nav aria-label="Social" style={css('display: flex; flex-wrap: wrap; gap: 16px 32px; font-size: 14px; font-weight: 500')}>
        <a className="flink" href={linkedinHref} target="_blank" rel="noopener noreferrer" style={link}>LinkedIn</a>
        <a className="flink" href={instagramHref} target="_blank" rel="noopener noreferrer" style={link}>Instagram</a>
        <a className="flink" href="#contact" onClick={onContact} style={link}>Email</a>
        <a className="flink" href={githubHref} target="_blank" rel="noopener noreferrer" style={link}>GitHub</a>
      </nav>
      <span style={css('display: flex; flex-wrap: wrap; gap: 12px 32px; font-size: 13px; color: #B9B2A6')}><span>© 2026 Dimas Firmansyah</span><a className="flink" href="#top" style={link}>Back to top ↑</a></span>
    </footer>
  );
};

export default Footer;
