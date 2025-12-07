import React from 'react';
import './About.css';

const About = () => {
  const roles = [
    { id: 1, title: 'AI Engineering', dot: true },
    { id: 2, title: 'Data Science', dot: true },
    { id: 3, title: 'Data Engineering', dot: true },
    { id: 4, title: 'Software Development', dot: false }
  ];

  return (
    <section id="" className="about">
      <div className="about-container">
        <h2 className="about-title">ABOUT ME</h2>

        <p className="about-description">
          Applied Data Science Student At Surabaya State Electronics Polytechnic With Experience In Artificial Intelligence, Data
          Analysis, And Software Development. Skilled In Statistics, Data Visualization, Artificial Intelligence Modeling, And Web
          Development. Active In Various Projects And National Competitions.
        </p>

        <div className="about-roles">
          {roles.map((role) => (
            <React.Fragment key={role.id}>
              <span className="role-item">{role.title}</span>
              {role.dot && <span className="role-dot">•</span>}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
