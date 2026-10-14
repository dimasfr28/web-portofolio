import React, { useState } from 'react';
import { css } from '../utils/css';
import { ArrowRight, ArrowUpRight, CloseIcon, MediaStage, Modal } from './ui';
import { projects, projectFilters } from '../data/portfolio';

const chipStyle = (on) => css(
  "font-family:'Archivo',sans-serif;font-size:14px;padding:12px 20px;min-height:44px;border-radius:999px;" +
  (on ? 'font-weight:600;border:1px solid #F4F1EC;background:#F4F1EC;color:#0D0D0F;' : 'font-weight:500;border:1px solid #3A3A40;background:transparent;color:#A1A1A8;')
);

// Renders **bold** segments of a string.
const bold = (text) => text.split('**').map((part, i) => (i % 2 ? <strong key={i} style={css('font-weight: 700; color: #F4F1EC')}>{part}</strong> : part));

const kv = (label, value) => (
  <div key={label} style={css('display: flex; flex-direction: column; gap: 4px')}>
    <span style={css('font-size: 11px; letter-spacing: 0.24em; color: #8A8A92')}>{label}</span>
    <span style={css('font-size: 15px; font-weight: 500')}>{value}</span>
  </div>
);

const Featured = ({ project, onOpen }) => {
  const media = project.media.find((m) => m.type === 'video' || m.type === 'photo');
  const facts = project.facts || [['CATEGORY', project.fullCat || project.cat], ['STACK', project.tech.join(' · ')]];
  return (
    <a className="feat" href="#projects" onClick={(e) => { e.preventDefault(); onOpen(project.num); }} style={css('margin-top: clamp(32px, 2.5vw, 48px); color: #F4F1EC')}>
      <div className="feat-media" style={css('position: relative; height: clamp(240px, 36vw, 520px); overflow: hidden; border-radius: 4px; background: #1B2233')}>
        <div className="fmedia" style={css('position: absolute; inset: 0; background: radial-gradient(ellipse 420px 320px at 50% 50%, #26365C 0%, #1B2233 100%)')}>
          {media && media.type === 'video' && (
            <video key={media.src} src={media.src} autoPlay muted loop playsInline preload="metadata" aria-label={`${project.title} demo`} style={css('width: 100%; height: 100%; object-fit: cover')} />
          )}
          {media && media.type === 'photo' && (
            <img key={media.src} src={media.src} alt={project.title} style={css('width: 100%; height: 100%; object-fit: cover')} />
          )}
        </div>
        <div style={css('position: absolute; left: 16px; top: 16px; display: flex; gap: 8px')}>
          {project.badge && <span style={css('background: #F4F1EC; color: #0D0D0F; font-size: 12px; font-weight: 700; padding: 8px 12px; border-radius: 2px; letter-spacing: 0.06em')}>{project.badge}</span>}
          <span style={css('background: #F26A2E; color: #0D0D0F; font-size: 12px; font-weight: 700; padding: 8px 12px; border-radius: 2px; letter-spacing: 0.06em')}>FEATURED</span>
        </div>
      </div>
      <div className="feat-text" style={css('display: flex; flex-direction: column; justify-content: space-between; gap: 28px; padding: 4px 0')}>
        <div style={css('display: flex; flex-direction: column; gap: 18px')}>
          <div style={css("font-family: 'Oswald', sans-serif; font-size: clamp(64px, 5.8vw, 112px); font-weight: 500; line-height: 0.85; color: transparent; -webkit-text-stroke: 1.5px #F26A2E")}>{project.num}</div>
          <h3 style={css('margin: 0; font-size: clamp(24px, 1.9vw, 36px); font-weight: 800; line-height: 1.08; letter-spacing: -0.02em; color: #F4F1EC')}>{project.title}</h3>
          <p style={css('margin: 0; font-size: 16px; line-height: 1.65; font-weight: 300; color: #A1A1A8')}>{project.desc}</p>
        </div>
        <div style={css('display: flex; flex-direction: column; gap: 26px')}>
          <div style={css('display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 16px 24px; border-top: 1px solid #26262A; padding-top: 20px')}>
            {facts.map(([label, value]) => kv(label, value))}
          </div>
          <span className="btn-out" style={css('align-self: flex-start; display: inline-flex; align-items: center; gap: 12px; border: 1px solid #F4F1EC; padding: 14px 22px; border-radius: 999px; font-size: 14px; font-weight: 600; color: #F4F1EC')}>View details <ArrowUpRight /></span>
        </div>
      </div>
    </a>
  );
};

const Projects = () => {
  const [filter, setFilter] = useState('all');
  const [openNum, setOpenNum] = useState(null);
  const [photo, setPhoto] = useState(0);

  // Newest first: the first project of the current filter is featured, the rest go in the grid.
  const filtered = projects.filter((p) => filter === 'all' || p.keys.includes(filter));
  const [featured, ...list] = filtered;
  const shown = filtered.length;
  const cur = projects.find((p) => p.num === openNum);
  const open = (num) => { setOpenNum(num); setPhoto(0); };
  const section = 'font-size: 11px; letter-spacing: 0.24em; color: #8A8A92';

  return (
    <section id="projects" style={css('position: relative; flex-shrink: 0; scroll-margin-top: 72px; padding: clamp(56px, 4.167vw, 80px) var(--pad); background: #0D0D0F; display: flex; flex-direction: column')}>
      <div style={css('display: flex; flex-wrap: wrap; gap: 12px; justify-content: space-between; align-items: center; border-bottom: 1px solid #26262A; padding-bottom: 20px')}>
        <div style={css('font-size: 13px; letter-spacing: 0.42em; color: #A1A1A8; font-weight: 500')}><span style={css('color: #F26A2E')}>(03)</span> SELECTED WORKS</div>
        <div style={css("display: flex; align-items: baseline; gap: 10px; font-family: 'Oswald', sans-serif; color: #A1A1A8; font-size: 14px; letter-spacing: 0.2em")}>
          <span style={css('color: #F4F1EC; font-size: 22px; letter-spacing: 0.04em')}>{projects.length}</span>
          <span>/ PROJECTS</span>
        </div>
      </div>

      <div style={css('position: relative; margin-top: clamp(48px, 2.9vw, 56px); font-size: clamp(46px, 15.1vw, 290px); height: 0.862em')}>
        <div style={css("position: absolute; left: -0.02em; top: -0.186em; font-family: 'Caveat Brush', cursive; font-size: 0.552em; line-height: 1; color: #F26A2E; transform: rotate(-8deg); z-index: 2")}>The</div>
        <h2 style={css('margin: 0; position: absolute; left: 0; bottom: 0; font-size: 1em; font-weight: 900; letter-spacing: -0.055em; line-height: 0.8; color: #F4F1EC')}>PROJECTS</h2>
      </div>

      <div className="pintro" style={css('margin-top: 40px')}>
        <p style={css('margin: 0; max-width: 640px; font-size: 17px; line-height: 1.65; font-weight: 300; color: #A1A1A8')}>Things I have built across AI, data and software. Each one started from a real problem, from robot soccer research to production internships.</p>
        <div className="chips" role="group" aria-label="Filter projects">
          {projectFilters.map((f) => (
            <button key={f.key} className="chip" aria-pressed={filter === f.key} onClick={() => setFilter(f.key)} style={chipStyle(filter === f.key)}>{f.label}</button>
          ))}
        </div>
      </div>

      {featured && <Featured project={featured} onOpen={open} />}

      <div className="pgrid" style={css('margin-top: clamp(32px, 2.5vw, 48px)')}>
        {list.map((p) => (
          <a key={p.num} className="pcard" href="#projects" onClick={(e) => { e.preventDefault(); open(p.num); }} style={css('min-height: 231px; display: flex; flex-direction: column; gap: 12px; padding: 26px 28px 28px; border: 1px solid #26262A; border-radius: 4px')}>
            <span style={css('display: flex; justify-content: space-between; align-items: center')}>
              <span style={css('display: flex; align-items: center; gap: 14px')}>
                <span className="pnum" style={css("font-family: 'Oswald', sans-serif; font-size: 16px; letter-spacing: 0.08em; color: #8A8A92; transition: color .25s")}>{p.num}</span>
                <span style={css('font-size: 11px; font-weight: 600; letter-spacing: 0.16em; color: #A1A1A8')}>{p.cat}</span>
              </span>
              <span className="parrow" style={css('width: 38px; height: 38px; border-radius: 50%; border: 1px solid #3A3A40; display: flex; align-items: center; justify-content: center; color: #F4F1EC')}><ArrowRight /></span>
            </span>
            <span className="ptitle" style={css('font-size: clamp(21px, 1.25vw, 24px); font-weight: 800; letter-spacing: -0.02em; line-height: 1.15; transition: color .25s')}>{p.title}</span>
            <span style={css('font-size: 15px; line-height: 1.6; font-weight: 300; color: #A1A1A8; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden')}>{p.desc}</span>
            <span style={css('margin-top: auto; padding-top: 6px; display: flex; flex-wrap: wrap; gap: 6px')}>
              {p.tech.map((t) => <span key={t} style={css('font-size: 12px; padding: 5px 10px; background: #1C1C21; border-radius: 4px; color: #D5D5DA')}>{t}</span>)}
            </span>
          </a>
        ))}
      </div>

      <div style={css('margin-top: 32px; display: flex; justify-content: space-between; align-items: center')}>
        <span style={css('font-size: 14px; color: #8A8A92')}>Showing {shown} of {projects.length} projects</span>
      </div>

      {cur && (
        <Modal onClose={() => setOpenNum(null)} overlay="rgba(8, 8, 10, 0.78)">
          <div className="pm-panel" role="dialog" aria-modal="true" aria-labelledby="pm-title" onClick={(e) => e.stopPropagation()}>
            <div className="pm-gal">
              <MediaStage items={cur.media} index={photo} setIndex={setPhoto} noun="item" />
            </div>
            <div className="pm-info">
              <div style={css('display: flex; justify-content: space-between; align-items: center; gap: 16px')}>
                <span style={css('display: flex; align-items: center; gap: 14px')}>
                  <span style={css("font-family: 'Oswald', sans-serif; font-size: 16px; letter-spacing: 0.08em; color: #F26A2E")}>{cur.num}</span>
                  <span style={css('font-size: 11px; font-weight: 600; letter-spacing: 0.16em; color: #A1A1A8')}>{cur.fullCat || cur.cat}</span>
                </span>
                <button type="button" aria-label="Close" onClick={() => setOpenNum(null)} style={css('width: 44px; height: 44px; flex-shrink: 0; border-radius: 50%; border: 1px solid #3A3A40; background: transparent; color: #F4F1EC; display: flex; align-items: center; justify-content: center')}><CloseIcon size={18} /></button>
              </div>
              <h3 id="pm-title" style={css('margin: 0; font-size: clamp(24px, 1.8vw, 34px); font-weight: 800; letter-spacing: -0.02em; line-height: 1.1; color: #F4F1EC')}>{cur.fullTitle || cur.title}</h3>
              <div style={css('display: flex; flex-direction: column; gap: 10px')}>
                <span style={css(section)}>TECH STACK</span>
                <div style={css('display: flex; flex-wrap: wrap; gap: 6px')}>
                  {(cur.detailTech || cur.tech).map((t) => <span key={t} style={css('font-size: 13px; padding: 6px 12px; background: #1C1C21; border: 1px solid #2A2A30; border-radius: 4px; color: #D5D5DA')}>{t}</span>)}
                </div>
              </div>
              <div style={css('display: flex; flex-direction: column; gap: 12px')}>
                <span style={css(section)}>WHAT IT DOES</span>
                <ul style={css('margin: 0; padding: 0 0 0 18px; display: flex; flex-direction: column; gap: 10px; font-size: 16px; line-height: 1.55; font-weight: 300; color: #D5D5DA')}>
                  {cur.points.map((t) => <li key={t}>{bold(t)}</li>)}
                </ul>
              </div>
              <div style={css('margin-top: auto; padding-top: 22px; border-top: 1px solid #26262A; display: flex; flex-wrap: wrap; align-items: center; gap: 16px')}>
                {cur.href !== '#' ? (
                  <a className="pmore" href={cur.href} target="_blank" rel="noopener noreferrer" style={css('display: inline-flex; align-items: center; gap: 12px; min-height: 48px; padding: 14px 24px; border-radius: 999px; background: #F26A2E; color: #0D0D0F; font-size: 15px; font-weight: 700')}>{cur.linkLabel || 'See more on GitHub'} <ArrowUpRight /></a>
                ) : (
                  <span style={css('font-size: 14px; color: #A1A1A8')}>The repository for this project is not public.</span>
                )}
              </div>
            </div>
          </div>
        </Modal>
      )}
    </section>
  );
};

export default Projects;
