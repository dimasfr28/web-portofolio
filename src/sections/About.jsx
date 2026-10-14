import React from 'react';
import { css } from '../utils/css';
import { achievements, projects } from '../data/portfolio';
import { pad as padZero } from './ui';

const About = () => {
  const certs = achievements.filter((a) => a.group === 'certs').length;
  const wins = achievements.length - certs;

  // Counts follow src/data/portfolio.js
  const stats = [
    {
      value: wins,
      label: 'ACHIEVEMENTS',
      style: 'color: #14213D',
    },
    {
      value: certs,
      label: 'CERTIFICATIONS',
      style: 'color: transparent; -webkit-text-stroke: 1.5px #14213D',
    },
    {
      value: projects.length,
      label: 'PROJECTS',
      style: 'color: #E8622A',
    },
  ];

  return (
    <section
      id="about"
      className="about"
      style={css(`
        flex-shrink: 0;
        scroll-margin-top: 72px;
        padding: clamp(32px, 2.2vw, 42px) var(--pad);
        background: #F4EEE3;
        color: #121214;
        display: grid;
        grid-template-columns: repeat(12, minmax(0, 1fr));
        column-gap: 24px;
        row-gap: 28px;
        align-items: center;
      `)}
    >
      {/* LEFT SIDE — STATISTICS */}
      <div
        className="about-stats"
        style={css(`
          display: flex;
          flex-direction: column;
          gap: 14px;
        `)}
      >
        {/* SECTION LABEL */}
        <span
          style={css(`
            font-size: 12px;
            font-weight: 600;
            letter-spacing: 0.32em;
            color: #5F594F;
          `)}
        >
          <span style={css('color: #C94F1C')}>
            (01)
          </span>{' '}
          ABOUT ME
        </span>

        {/* STATS CONTAINER */}
        <div
          style={css(`
            display: flex;
            align-items: flex-end;
          `)}
        >
          {stats.map((st, i) => {
            const padding =
              i === 0
                ? 'padding-right: clamp(14px, 2.1vw, 40px)'
                : i === stats.length - 1
                ? 'padding-left: clamp(14px, 2.1vw, 40px)'
                : 'padding: 0 clamp(14px, 2.1vw, 40px)';

            return (
              <div
                key={st.label}
                style={css(`
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                  justify-content: center;
                  gap: 4px;
                  ${padding};
                  ${
                    i < stats.length - 1
                      ? 'border-right: 1px solid #DDD3C2'
                      : ''
                  }
                `)}
              >
                {/* NUMBER */}
                <span
                  className="stat-n"
                  style={css(`
                    ${st.style};
                    display: block;
                    text-align: center;
                    margin: 0;
                  `)}
                >
                  {padZero(st.value)}
                </span>

                {/* LABEL */}
                <span
                  className="stat-l"
                  style={css(`
                    display: block;
                    width: 100%;
                    text-align: center;
                    margin: 0;
                  `)}
                >
                  {st.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* RIGHT SIDE — DESCRIPTION */}
      <p
        className="about-p"
        style={css(`
          margin: 0;
          font-size: clamp(19px, 1.5625vw, 30px);
          line-height: 1.4;
          font-weight: 400;
          letter-spacing: -0.025em;
          color: #121214;
          text-align: justify;
          text-align-last: left;
        `)}
      >
        Applied Data Science undergraduate at{' '}
        <span style={css('font-weight: 700')}>
          Electronic Engineering Polytechnic Institute of Surabaya
        </span>
        , specializing in{' '}
        <span style={css('font-weight: 800; color: #14213D')}>
          AI & Software Engineering.
        </span>{' '}
        <span style={css('color: #5F594F')}>
          Experienced in software development, AI applications, and national research commercialization,
          with{' '}
        </span>
        <span style={css('font-weight: 700; color: #E8622A')}>
          national and international competition achievements.
        </span>
      </p>

    </section>
  );
};

export default About;