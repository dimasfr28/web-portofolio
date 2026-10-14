import React, { useState } from 'react';
import { css } from '../utils/css';
import { CloseIcon, MediaStage, Modal, Svg, pad } from './ui';
import { experiences } from '../data/portfolio';

const dot = 'width: 4px; height: 4px; border-radius: 50%; background: #45557A';
const tag = 'font-size: 12px; padding: 5px 10px; background: #22335A; border-radius: 4px; color: #D5DBE8';

const LogoNode = ({ exp, hot }) => {
  const [failed, setFailed] = useState(false);
  const base = exp.initials.length > 2 ? 'font-size: 11px' : '';
  return (
    <span className="xnode" role="img" aria-label={`${exp.org} logo`}
      style={css(`${base}; ${hot ? 'border-color: #F26A2E; box-shadow: 0 0 0 6px rgba(242, 106, 46, 0.22)' : ''}`)}>
      {failed ? exp.initials : (
        <img src={exp.logo} alt="" onError={() => setFailed(true)} style={css('width: 100%; height: 100%; object-fit: cover')} />
      )}
    </span>
  );
};

const Card = ({ exp, side, onOpen }) => (
  <article className={`xcard ${side}`}>
    <LogoNode exp={exp} hot={exp.latest} />
    <span className="xconn"></span>
    <span className="xnum" style={exp.latest ? css('-webkit-text-stroke-color: #F26A2E') : undefined}>{exp.num}</span>
    <div style={css('display: flex; flex-direction: column; gap: 12px; min-width: 0')}>
      <div style={css('display: flex; align-items: center; gap: 10px; flex-wrap: wrap')}>
        <span style={css("font-family: 'Oswald', sans-serif; font-size: 14px; letter-spacing: 0.1em; color: #A9B3C9")}>{exp.date}</span>
        <span style={css(dot)}></span>
        <span style={css('font-size: 11px; font-weight: 600; letter-spacing: 0.16em; color: #D5DBE8')}>{exp.kind}</span>
        {exp.latest && <span style={css('font-size: 11px; font-weight: 700; letter-spacing: 0.16em; color: #14213D; background: #F26A2E; padding: 5px 9px; border-radius: 999px')}>LATEST</span>}
        <button type="button" className="xphoto" onClick={() => onOpen(exp.key)} style={css('margin-left: auto; display: inline-flex; align-items: center; gap: 8px; height: 34px; padding: 0 14px; border-radius: 999px; border: 1px solid #45557A; background: transparent; color: #F4F1EC; font-size: 12px; font-weight: 600; letter-spacing: 0.04em')}>
          <Svg size={15}><path d="M4 8h3l2-3h6l2 3h3a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z" /><circle cx="12" cy="13.5" r="3.5" /></Svg>View photos
        </button>
      </div>
      <div style={css('display: flex; flex-direction: column; gap: 4px')}>
        <h3 className="xrole" style={css('margin: 0; font-size: clamp(21px, 1.3vw, 25px); font-weight: 800; letter-spacing: -0.02em; line-height: 1.15; color: #F4F1EC; transition: color .25s')}>{exp.role}</h3>
        <span style={css('font-size: 15px; font-weight: 500; color: #A9B3C9')}>{exp.org}</span>
      </div>
      <ul style={css('margin: 0; padding: 12px 0 0 18px; border-top: 1px solid #2C3A5C; display: flex; flex-direction: column; gap: 4px; font-size: 15px; line-height: 1.5; font-weight: 300; color: #D5DBE8')}>
        {exp.bullets.map((b) => <li key={b}>{b}</li>)}
      </ul>
      <div style={css('display: flex; flex-wrap: wrap; gap: 6px')}>
        {exp.tags.map((t) => <span key={t} style={css(tag)}>{t}</span>)}
      </div>
    </div>
  </article>
);

const Experience = () => {
  const [openKey, setOpenKey] = useState(null);
  const [photo, setPhoto] = useState(0);
  const open = (key) => { setOpenKey(key); setPhoto(0); };
  const cur = experiences.find((e) => e.key === openKey);

  return (
    <section id="experiences" style={css('position: relative; flex-shrink: 0; scroll-margin-top: 72px; padding: clamp(56px, 4.167vw, 80px) var(--pad); background: #14213D; display: flex; flex-direction: column')}>
      <div style={css('display: flex; flex-wrap: wrap; gap: 12px; justify-content: space-between; align-items: center; border-bottom: 1px solid #2C3A5C; padding-bottom: 20px')}>
        <div style={css('font-size: 13px; letter-spacing: 0.42em; color: #A9B3C9; font-weight: 500')}><span style={css('color: #F26A2E')}>(02)</span> CAREER PATH</div>
        <div style={css("display: flex; align-items: baseline; gap: 10px; font-family: 'Oswald', sans-serif; color: #A9B3C9; font-size: 14px; letter-spacing: 0.2em")}>
          <span style={css('color: #F4F1EC; font-size: 22px; letter-spacing: 0.04em')}>{pad(experiences.length)}</span>
          <span>/ ROLES</span>
        </div>
      </div>

      <div style={css('position: relative; margin-top: clamp(48px, 2.9vw, 56px); font-size: clamp(44px, 11.98vw, 230px); height: 1.087em')}>
        <div style={css("position: absolute; left: -0.026em; top: -0.235em; font-family: 'Caveat Brush', cursive; font-size: 0.696em; line-height: 1; color: #F26A2E; transform: rotate(-8deg); z-index: 2")}>My</div>
        <h2 style={css('margin: 0; position: absolute; left: 0; bottom: 0; font-size: 1em; font-weight: 900; letter-spacing: -0.055em; line-height: 0.8; color: #F4F1EC')}>EXPERIENCES</h2>
      </div>

      <div className="xgrid" style={css('margin-top: clamp(40px, 3.333vw, 64px)')}>
        <span className="xline"></span>
        <span className="xline-hot"></span>
        {experiences.map((exp, i) => <Card key={exp.key} exp={exp} side={i % 2 === 0 ? 'l' : 'r'} onOpen={open} />)}
      </div>

      {cur && (
        <Modal onClose={() => setOpenKey(null)} overlay="rgba(8, 12, 24, 0.78)">
          <div className="xp-panel" role="dialog" aria-modal="true" aria-labelledby="xp-title" onClick={(e) => e.stopPropagation()}>
            <div style={css('flex-shrink: 0; display: flex; justify-content: space-between; align-items: center; gap: 20px; padding: clamp(16px, 1.25vw, 24px) clamp(16px, 1.5vw, 28px); border-bottom: 1px solid #2C3A5C')}>
              <div style={css('display: flex; align-items: center; gap: 20px; min-width: 0')}>
                <span className="xp-num" style={css("font-family: 'Oswald', sans-serif; font-size: clamp(40px, 3.1vw, 60px); font-weight: 500; line-height: 0.85; color: transparent; -webkit-text-stroke: 1.5px #F26A2E")}>{cur.num}</span>
                <div style={css('display: flex; flex-direction: column; gap: 6px; min-width: 0')}>
                  <span style={css("font-family: 'Oswald', sans-serif; font-size: 13px; letter-spacing: 0.1em; color: #A9B3C9")}>{cur.date}</span>
                  <h3 id="xp-title" style={css('margin: 0; font-size: clamp(19px, 1.35vw, 26px); font-weight: 800; letter-spacing: -0.02em; line-height: 1.1; color: #F4F1EC')}>{cur.role}</h3>
                  <span style={css('font-size: 14px; color: #A9B3C9')}>{cur.org}</span>
                </div>
              </div>
              <button type="button" aria-label="Close" onClick={() => setOpenKey(null)} style={css('width: 44px; height: 44px; flex-shrink: 0; border-radius: 50%; border: 1px solid #45557A; background: transparent; color: #F4F1EC; display: flex; align-items: center; justify-content: center')}><CloseIcon size={18} /></button>
            </div>
            <div className="xp-body">
              <MediaStage items={cur.media} index={photo} setIndex={setPhoto} />
            </div>
          </div>
        </Modal>
      )}
    </section>
  );
};

export default Experience;
