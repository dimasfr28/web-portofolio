import React, { useState } from 'react';
import { css } from '../utils/css';
import { ArrowRight, ArrowUpRight, CloseIcon, ImageIcon, Modal, Svg, pad } from './ui';
import ContactPanel from './ContactPanel';
import {
  achievements, achievementRows, certCards, firstOfTab, groupHeadings, groupLabels,
} from '../data/portfolio';

const count = (g) => achievements.filter((a) => a.group === g).length;

const pillTab = (on) => css(
  'flex-shrink:0;white-space:nowrap;font-size:14px;font-weight:600;padding:0 18px;height:40px;border:none;border-radius:999px;' +
  (on ? 'background:#121214;color:#F4EEE3;' : 'background:transparent;color:#121214;')
);

const num = (n) => <span style={css("font-family: 'Oswald', sans-serif; font-weight: 400; margin-left: 6px")}>{pad(n)}</span>;

const CertImage = ({ src }) => {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return (
      <>
        <ImageIcon size={34} sw={1.6} />
        <span style={css('font-size: 12px; font-weight: 600; letter-spacing: 0.2em')}>CERTIFICATE IMAGE NOT FOUND</span>
      </>
    );
  }
  return <img src={src} alt="" onError={() => setFailed(true)} style={css('width: 100%; height: 100%; object-fit: contain')} />;
};

const Achievements = ({ contactMode, setContactMode }) => {
  const [tab, setTab] = useState('awards');
  const [panel, setPanel] = useState(false);
  const [sel, setSel] = useState('compfest');

  const openItem = (id) => (e) => { e.preventDefault(); setSel(id); setPanel(true); };
  const selIdx = Math.max(0, achievements.findIndex((a) => a.id === sel));
  const item = achievements[selIdx];
  const step = (d) => setSel(achievements[(selIdx + d + achievements.length) % achievements.length].id);

  const arrow = <span className="aarrow" style={css('display: flex')}><ArrowRight size={20} /></span>;
  const yearStyle = "font-family: 'Oswald', sans-serif; font-size: 15px; letter-spacing: 0.1em; color: #5F594F";

  return (
    <section id="achievements" style={css('position: relative; flex-shrink: 0; scroll-margin-top: 72px; background: #F4EEE3; color: #121214; display: flex; flex-direction: column')}>
      <div className="ach-grid">
        <div className="ach-left">
          <div style={css('display: flex; flex-wrap: wrap; gap: 12px; justify-content: space-between; align-items: center; border-bottom: 1px solid #DDD3C2; padding-bottom: 20px')}>
            <span style={css('font-size: 13px; letter-spacing: 0.42em; color: #5F594F; font-weight: 500')}><span style={css('color: #C94F1C')}>(04)</span> RECOGNITION</span>
            <span style={css("font-family: 'Oswald', sans-serif; font-size: 14px; letter-spacing: 0.2em; color: #5F594F")}><span style={css('font-size: 22px; color: #121214; letter-spacing: 0.04em')}>{pad(count('awards') + count('grants'))}</span> / ACHIEVEMENTS · <span style={css('font-size: 22px; color: #121214; letter-spacing: 0.04em')}>{pad(count('certs'))}</span> / CERTS</span>
          </div>

          <div style={css('position: relative; margin-top: clamp(56px, 3.75vw, 72px); font-size: clamp(40px, 5.625vw, 108px); height: 1.037em')}>
            <div style={css("position: absolute; left: -0.037em; top: -0.537em; font-family: 'Caveat Brush', cursive; font-size: 1.111em; line-height: 1; color: #E8622A; transform: rotate(-7deg); z-index: 2")}>Proud</div>
            <h2 style={css('margin: 0; position: absolute; left: 0; bottom: 0; font-size: 1em; font-weight: 900; letter-spacing: -0.055em; line-height: 0.82; color: #121214')}>ACHIEVEMENTS</h2>
          </div>

          <div style={css('margin-top: 36px; display: flex; flex-wrap: wrap; gap: 12px; justify-content: space-between; align-items: center')}>
            <div className="tablist" role="tablist" aria-label="Achievement type">
              <button role="tab" aria-selected={tab === 'awards'} onClick={() => setTab('awards')} style={pillTab(tab === 'awards')}>Awards {num(count('awards'))}</button>
              <button role="tab" aria-selected={tab === 'grants'} onClick={() => setTab('grants')} style={pillTab(tab === 'grants')}>Grants &amp; IP {num(count('grants'))}</button>
              <button role="tab" aria-selected={tab === 'certs'} onClick={() => setTab('certs')} style={pillTab(tab === 'certs')}>Certifications {num(count('certs'))}</button>
            </div>
            <span className="hide-sm" style={css('font-size: 14px; color: #5F594F')}>Newest first</span>
          </div>

          {tab !== 'certs' && (
            <div style={css('margin-top: 24px; display: flex; flex-direction: column; border-bottom: 1px solid #121214')}>
              {achievementRows[tab].map((r, i) => (
                <a key={r.id} className="arow" href="#achievements" onClick={openItem(r.id)} style={css(`border-top: 1px solid ${i === 0 ? '#121214' : '#DDD3C2'}`)}>
                  <span className="ayear" style={css(yearStyle)}>{r.year}</span>
                  <span className="arank" style={css(`font-family: 'Oswald', sans-serif; font-size: ${r.size}px; font-weight: 500; line-height: 1; color: #121214; transition: color .25s`)}>{r.rank}</span>
                  <span style={css('display: flex; flex-direction: column; gap: 6px; min-width: 0')}><span className="atitle" style={css('font-size: 21px; font-weight: 700; letter-spacing: -0.01em')}>{r.title}</span><span style={css('font-size: 14px; color: #5F594F')}>{r.sub}</span></span>
                  {r.pill ? (
                    <span className="apill" style={css('font-size: 12px; font-weight: 600; letter-spacing: 0.12em; padding: 7px 12px; border: 1px solid #121214; border-radius: 999px; white-space: nowrap')}>{r.pill}</span>
                  ) : (
                    <span className="apill"></span>
                  )}
                  {arrow}
                </a>
              ))}
            </div>
          )}

          {tab === 'certs' && (
            <div className="cgrid" style={css('margin-top: 24px')}>
              {certCards.map((c) => (
                <a key={c.id} className="ccard" href="#achievements" onClick={openItem(c.id)} style={css('display: flex; flex-direction: column; justify-content: space-between; gap: 24px; padding: 24px 28px; border: 1px solid #121214; border-radius: 4px; min-height: 150px')}>
                  <span style={css("display: flex; justify-content: space-between; font-family: 'Oswald', sans-serif; font-size: 15px; letter-spacing: 0.1em; color: #5F594F")}><span>{c.n}</span><span>{c.date}</span></span>
                  <span style={css('display: flex; flex-direction: column; gap: 6px')}><span style={css('font-size: clamp(20px, 1.25vw, 24px); font-weight: 800; letter-spacing: -0.02em')}>{c.title}</span><span style={css('font-size: 14px; color: #5F594F')}>{c.sub}</span></span>
                </a>
              ))}
            </div>
          )}

          <a href="#achievements" onClick={openItem(firstOfTab[tab])} style={css('margin-top: 24px; align-self: flex-start; display: inline-flex; align-items: center; gap: 12px; font-size: 16px; font-weight: 600; border-bottom: 1px solid #121214; padding: 12px 0 8px')}>See all achievements &amp; certificates <ArrowUpRight /></a>
        </div>

        <div className="ach-right">
          <div style={css('display: flex; flex-direction: column; gap: 6px')}>
            <span style={css('font-size: 13px; letter-spacing: 0.42em; color: #5F594F; font-weight: 500')}><span style={css('color: #C94F1C')}>(05)</span> SAY HELLO</span>
            <span style={css('font-size: clamp(24px, 1.5625vw, 30px); font-weight: 800; letter-spacing: -0.03em; line-height: 1.1')}>Ask anything, or leave a message.</span>
          </div>
          <ContactPanel mode={contactMode} setMode={setContactMode} />
        </div>
      </div>

      {panel && (
        <Modal onClose={() => setPanel(false)} overlay="rgba(18, 18, 20, 0.66)">
          <div className="ach-panel" role="dialog" aria-modal="true" aria-labelledby="ach-panel-title" onClick={(e) => e.stopPropagation()}>
            <div style={css('flex-shrink: 0; display: flex; justify-content: space-between; align-items: center; gap: 16px; padding: clamp(16px, 1.35vw, 26px) clamp(16px, 1.7vw, 32px) clamp(16px, 1.25vw, 24px) clamp(18px, 1.9vw, 36px); border-bottom: 1px solid #121214')}>
              <div style={css('display: flex; flex-direction: column; gap: 8px; min-width: 0')}>
                <span style={css('font-size: 12px; font-weight: 600; letter-spacing: 0.32em; color: #5F594F')}><span style={css('color: #C94F1C')}>(04)</span> RECOGNITION · {achievements.length} ITEMS</span>
                <h3 id="ach-panel-title" style={css('margin: 0; font-size: clamp(22px, 1.8vw, 34px); font-weight: 900; letter-spacing: -0.04em; line-height: 1.05')}>All achievements &amp; certificates</h3>
              </div>
              <button type="button" aria-label="Close" onClick={() => setPanel(false)} style={css('width: 48px; height: 48px; flex-shrink: 0; border-radius: 50%; border: 1px solid #121214; background: #FFFFFF; color: #121214; display: flex; align-items: center; justify-content: center')}><CloseIcon size={18} /></button>
            </div>
            <div className="ach-body">
              <div className="ach-list">
                {groupHeadings.map((g) => (
                  <React.Fragment key={g.key}>
                    <div style={css("padding: 22px 24px 10px; font-family: 'Oswald', sans-serif; font-size: 13px; letter-spacing: 0.2em; color: #5F594F")}>{g.label} · {pad(count(g.key))}</div>
                    {achievements.filter((a) => a.group === g.key).map((a) => {
                      const on = a.id === item.id;
                      return (
                        <button key={a.id} type="button" aria-pressed={on} onClick={() => setSel(a.id)}
                          style={css("display:grid;grid-template-columns:76px minmax(0,1fr) 16px;align-items:center;column-gap:14px;width:100%;text-align:left;padding:14px 24px;border:none;border-top:1px solid #DDD3C2;font-family:'Archivo',sans-serif;color:#121214;cursor:pointer;" + (on ? 'background:#E6DBC8;' : 'background:transparent;'))}>
                          <span style={css("font-family: 'Oswald', sans-serif; font-size: 13px; letter-spacing: 0.08em; color: #5F594F")}>{a.date}</span>
                          <span style={css('display: flex; flex-direction: column; gap: 3px; min-width: 0')}><span style={css('font-size:15px;font-weight:700;line-height:1.3;' + (on ? 'color:#9E3D12;' : 'color:#121214;'))}>{a.title}</span><span style={css('font-size: 13px; color: #5F594F')}>{a.badge.charAt(0) + a.badge.slice(1).toLowerCase()} · {a.org}</span></span>
                          <Svg><path d="M9 6l6 6-6 6" /></Svg>
                        </button>
                      );
                    })}
                  </React.Fragment>
                ))}
              </div>
              <div className="ach-detail">
                <div className="ach-img" style={css('flex-shrink: 0; border-radius: 12px; border: 1px dashed #8A8378; background: #EDE5D6; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 12px; color: #5F594F; overflow: hidden')}>
                  <CertImage key={item.id} src={item.image} />
                </div>
                <div style={css('display: flex; align-items: center; gap: 10px; flex-wrap: wrap')}>
                  <span style={css('font-size: 12px; font-weight: 700; letter-spacing: 0.12em; padding: 7px 12px; border-radius: 999px; background: #121214; color: #F4EEE3')}>{item.badge}</span>
                  <span style={css('font-size: 12px; font-weight: 600; letter-spacing: 0.12em; padding: 7px 12px; border: 1px solid #121214; border-radius: 999px')}>{groupLabels[item.group].toUpperCase()}</span>
                  <span style={css(yearStyle)}>{item.date}</span>
                </div>
                <div style={css('display: flex; flex-direction: column; gap: 8px')}>
                  <span style={css('font-size: clamp(24px, 1.7vw, 32px); font-weight: 900; letter-spacing: -0.03em; line-height: 1.08')}>{item.title}</span>
                  <span style={css('font-size: 16px; color: #5F594F')}>{item.org}</span>
                </div>
                <p style={css('margin: 0; font-size: 17px; line-height: 1.6; color: #121214')}>{item.note}</p>
                <div style={css('margin-top: auto; padding-top: 20px; border-top: 1px solid #DDD3C2; display: flex; justify-content: space-between; align-items: center; gap: 12px')}>
                  <button type="button" onClick={() => step(-1)} style={css('height: 44px; padding: 0 18px; border-radius: 999px; border: 1px solid #121214; background: #FFFFFF; color: #121214; font-size: 14px; font-weight: 600; display: flex; align-items: center; gap: 8px')}><Svg><path d="M19 12H5" /><path d="M11 6l-6 6 6 6" /></Svg>Previous</button>
                  <span style={css("font-family: 'Oswald', sans-serif; font-size: 15px; letter-spacing: 0.12em; color: #5F594F")}>{pad(selIdx + 1)} / {pad(achievements.length)}</span>
                  <button type="button" onClick={() => step(1)} style={css('height: 44px; padding: 0 18px; border-radius: 999px; border: none; background: #121214; color: #F4EEE3; font-size: 14px; font-weight: 600; display: flex; align-items: center; gap: 8px')}>Next<ArrowRight /></button>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </section>
  );
};

export default Achievements;
