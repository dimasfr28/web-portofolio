import React, { useEffect, useRef, useState } from 'react';
import { css } from '../utils/css';

export const Svg = ({ size = 16, sw = 2, children }) => (
  <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">{children}</svg>
);

export const ArrowRight = (p) => <Svg {...p}><path d="M5 12h14" /><path d="M13 6l6 6-6 6" /></Svg>;
export const ArrowUpRight = (p) => <Svg {...p}><path d="M7 17L17 7" /><path d="M8 7h9v9" /></Svg>;
export const ArrowDown = (p) => <Svg {...p}><path d="M12 5v14" /><path d="M6 13l6 6 6-6" /></Svg>;
export const CloseIcon = (p) => <Svg {...p}><path d="M6 6l12 12" /><path d="M18 6L6 18" /></Svg>;
export const ChevLeft = (p) => <Svg {...p}><path d="M15 6l-6 6 6 6" /></Svg>;
export const ChevRight = (p) => <Svg {...p}><path d="M9 6l6 6-6 6" /></Svg>;
export const ImageIcon = ({ size = 44, sw = 1.5 }) => (
  <Svg size={size} sw={sw}><rect x="3" y="4" width="18" height="16" rx="2" /><circle cx="9" cy="10" r="2" /><path d="M21 16l-5-5-9 9" /></Svg>
);

export const pad = (n) => (n < 10 ? '0' : '') + n;

// Fixed overlay dialog: closes on backdrop click and Escape, and locks page scroll.
export const Modal = ({ onClose, overlay, children }) => {
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);
  return (
    <div className="modal-ov" onClick={onClose} style={css(`background: ${overlay}`)}>
      {children}
    </div>
  );
};

const navBtn = 'width: 44px; height: 44px; border-radius: 50%; border: 1px solid rgba(244, 241, 236, 0.5); background: rgba(13, 13, 15, 0.6); color: #F4F1EC; display: flex; align-items: center; justify-content: center; z-index: 2';


const zoomBtn = 'width: 38px; height: 38px; border-radius: 50%; border: 1px solid rgba(244, 241, 236, 0.5); background: rgba(13, 13, 15, 0.6); color: #F4F1EC; display: flex; align-items: center; justify-content: center';

// Image with zoom: click or scroll to zoom at the pointer, drag to pan, buttons for +/-/reset.
const ZoomImage = ({ src, alt }) => {
  const [z, setZ] = useState({ s: 1, x: 0, y: 0 });
  const box = useRef(null);
  const drag = useRef(null);
  const moved = useRef(false);

  const clamp = (s, x, y) => {
    const r = box.current.getBoundingClientRect();
    const mx = (r.width * (s - 1)) / 2;
    const my = (r.height * (s - 1)) / 2;
    return { s, x: Math.max(-mx, Math.min(mx, x)), y: Math.max(-my, Math.min(my, y)) };
  };

  // Zoom to scale `ns`, keeping the point under (clientX, clientY) fixed.
  const zoomAt = (ns, clientX, clientY) => {
    const next = Math.min(5, Math.max(1, ns));
    const r = box.current.getBoundingClientRect();
    const px = clientX - (r.left + r.width / 2);
    const py = clientY - (r.top + r.height / 2);
    setZ((p) => {
      if (next === 1) return { s: 1, x: 0, y: 0 };
      const k = next / p.s;
      return clamp(next, px - (px - p.x) * k, py - (py - p.y) * k);
    });
  };

  const center = () => {
    const r = box.current.getBoundingClientRect();
    return [r.left + r.width / 2, r.top + r.height / 2];
  };
  const step = (f) => (e) => { e.stopPropagation(); const [cx, cy] = center(); zoomAt(z.s * f, cx, cy); };

  const onPointerDown = (e) => {
    if (z.s <= 1) return;
    drag.current = { x: e.clientX, y: e.clientY, ox: z.x, oy: z.y };
    moved.current = false;
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e) => {
    const d = drag.current;
    if (!d) return;
    const dx = e.clientX - d.x;
    const dy = e.clientY - d.y;
    if (Math.abs(dx) + Math.abs(dy) > 4) moved.current = true;
    setZ((p) => clamp(p.s, d.ox + dx, d.oy + dy));
  };
  const onPointerUp = () => { drag.current = null; };
  const onClick = (e) => {
    if (moved.current) { moved.current = false; return; }
    zoomAt(z.s > 1 ? 1 : 2.5, e.clientX, e.clientY);
  };

  return (
    <div ref={box} onClick={onClick} onWheel={(e) => zoomAt(z.s * (e.deltaY < 0 ? 1.2 : 1 / 1.2), e.clientX, e.clientY)}
      onPointerDown={onPointerDown} onPointerMove={onPointerMove} onPointerUp={onPointerUp} onPointerCancel={onPointerUp}
      style={{ position: 'absolute', inset: 0, overflow: 'hidden', cursor: z.s > 1 ? (drag.current ? 'grabbing' : 'grab') : 'zoom-in', touchAction: z.s > 1 ? 'none' : 'auto' }}>
      <img src={src} alt={alt} draggable={false}
        style={{ width: '100%', height: '100%', objectFit: 'contain', userSelect: 'none', transformOrigin: 'center', transform: `translate(${z.x}px, ${z.y}px) scale(${z.s})`, transition: drag.current ? 'none' : 'transform .15s ease-out' }} />
      <div onClick={(e) => e.stopPropagation()} style={css('position: absolute; top: 12px; right: 12px; z-index: 2; display: flex; gap: 8px; cursor: default')}>
        <button type="button" className="pmnav" aria-label="Zoom out" onClick={step(1 / 1.5)} disabled={z.s <= 1} style={css(`${zoomBtn}; opacity: ${z.s <= 1 ? 0.45 : 1}`)}><Svg size={16}><path d="M5 12h14" /></Svg></button>
        <button type="button" className="pmnav" aria-label="Zoom in" onClick={step(1.5)} disabled={z.s >= 5} style={css(`${zoomBtn}; opacity: ${z.s >= 5 ? 0.45 : 1}`)}><Svg size={16}><path d="M12 5v14" /><path d="M5 12h14" /></Svg></button>
        <button type="button" className="pmnav" aria-label="Reset zoom" onClick={(e) => { e.stopPropagation(); setZ({ s: 1, x: 0, y: 0 }); }} disabled={z.s === 1} style={css(`${zoomBtn}; font-size: 11px; font-weight: 700; opacity: ${z.s === 1 ? 0.45 : 1}`)}>{Math.round(z.s * 100)}%</button>
      </div>
    </div>
  );
};

const thumbStyle = (on) => ({
  flex: '1 0 56px', minWidth: 56, height: 'clamp(50px,4.6vw,68px)', borderRadius: 8,
  border: `2px solid ${on ? '#F26A2E' : '#2A2A30'}`, background: on ? '#26365C' : '#1B2233',
  color: on ? '#F4F1EC' : '#A9B3C9', fontFamily: "'Oswald',sans-serif", fontSize: 13, letterSpacing: '0.08em',
  cursor: 'pointer', overflow: 'hidden', padding: 0,
});

// Photo / video gallery: a stage with prev/next plus a thumbnail strip.
// Renders a fragment so it can sit directly inside `.pm-gal` or `.xp-body`.
export const MediaStage = ({ items, index, setIndex, noun = 'photo' }) => {
  const count = items.length;
  const i = Math.min(index, Math.max(count - 1, 0));
  const cur = items[i];
  const go = (d) => setIndex((i + d + count) % count);
  return (
    <>
      <div className="pm-stage">
        {cur ? (
          cur.type === 'youtube' ? (
            <iframe key={cur.src} src={`https://www.youtube-nocookie.com/embed/${cur.id}`} title={`Video ${i + 1} of ${count}`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen
              style={css('position: absolute; inset: 0; width: 100%; height: 100%; border: 0; background: #000000')} />
          ) : cur.type === 'pdf' ? (
            <iframe key={cur.src} src={`${cur.src}#navpanes=0`} title={`PDF ${i + 1} of ${count}`}
              style={css('position: absolute; inset: 0; width: 100%; height: 100%; border: 0; background: #FFFFFF')} />
          ) : cur.type === 'video' ? (
            <video key={cur.src} src={cur.src} controls playsInline preload="metadata"
              style={css('position: absolute; inset: 0; width: 100%; height: 100%; object-fit: contain; background: #0D0D0F')} />
          ) : (
            <ZoomImage key={cur.src} src={cur.src} alt={`${noun} ${i + 1} of ${count}`} />
          )
        ) : (
          <>
            <ImageIcon />
            <span style={css('font-size: 13px; font-weight: 600; letter-spacing: 0.2em; color: #D5DBE8')}>NO MEDIA YET</span>
          </>
        )}
        {count > 1 && (
          <>
            <button type="button" className="pmnav" aria-label={`Previous ${noun}`} onClick={() => go(-1)} style={css(`position: absolute; left: 12px; top: 50%; transform: translateY(-50%); ${navBtn}`)}><ChevLeft size={18} /></button>
            <button type="button" className="pmnav" aria-label={`Next ${noun}`} onClick={() => go(1)} style={css(`position: absolute; right: 12px; top: 50%; transform: translateY(-50%); ${navBtn}`)}><ChevRight size={18} /></button>
          </>
        )}
        {count > 0 && (
          <span style={css("position: absolute; right: 14px; bottom: 14px; z-index: 2; font-family: 'Oswald', sans-serif; font-size: 13px; letter-spacing: 0.12em; padding: 6px 12px; border-radius: 999px; background: rgba(13, 13, 15, 0.75); color: #F4F1EC")}>{pad(i + 1)} / {pad(count)}</span>
        )}
      </div>
      {count > 1 && (
        <div className="thumbs">
          {items.map((m, n) => (
            <button key={m.src} type="button" aria-label={`Show ${noun} ${n + 1} of ${count}`} aria-pressed={n === i} onClick={() => setIndex(n)} style={thumbStyle(n === i)}>
              {m.type === 'video' ? 'VIDEO' : m.type === 'youtube' ? 'YOUTUBE' : m.type === 'pdf' ? 'PDF' : pad(n + 1)}
            </button>
          ))}
        </div>
      )}
    </>
  );
};
