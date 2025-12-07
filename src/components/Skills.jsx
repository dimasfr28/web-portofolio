import React, { useState } from 'react';
import './Skills.css';
import SectionTitle from './SectionTitle';

const Skills = () => {
  const [currentCenterIndex, setCurrentCenterIndex] = useState(1);

  const skillCategories = [
    {
      id: 1,
      title: 'Computer Vision',
      skills: ['OpenCV', 'YOLO', 'Thresholding Detection', 'C++', 'TensorFlow', 'TensorRT']
    },
    {
      id: 2,
      title: 'Statistics & Machine Learning',
      skills: ['R', 'Python', 'Pandas', 'Scikit-Learn', 'PyTorch', 'ML Flow', 'ML Ops', 'TensorFlow']

    },
    {
      id: 3,
      title: 'LLM & RAG',
      skills: ['LangChain', 'Groq API', 'Pinecone']
    },
    {
      id: 4,
      title: 'Robotics & IoT',
      skills: ['ROS', 'Kinematics', 'Sensors']
    },
    {
      id: 5,
      title: 'Backend',
      skills: ['FastAPI', 'Laravel', 'PostgreSQL', 'MySQL', 'MongoDB']
    },
    {
      id: 6,
      title: 'Frontend',
      skills: ['Next.js', 'React', 'HTML', 'CSS', 'Bootstrap', 'Tailwind']
    },
    {
      id: 7,
      title: 'DevOps',
      skills: ['Docker', 'Linux', 'Git', 'Prometheus']
    },
    {
      id: 8,
      title: 'Data Engineer',
      skills: ['Airflow', 'Hadoop', 'Scraping', 'ETL']
    }
  ];

  const getVisibleCards = () => {
    const cards = [];
    for (let i = -1; i <= 1; i++) {
      const index = currentCenterIndex + i;
      if (index >= 0 && index < skillCategories.length) {
        cards.push({
          ...skillCategories[index],
          position: i,
          actualIndex: index
        });
      }
    }
    return cards;
  };

  const handleCardClick = (index) => {
    setCurrentCenterIndex(index);
  };

  return (
    <section id="skills" className="skills">
      <div className="skills-container">
        <SectionTitle>TECHNICAL SKILLS</SectionTitle>

        <div className="skills-carousel">
          <div className="skills-grid">
            {getVisibleCards().map((category) => (
              <div
                key={category.id}
                className={`skill-category-card ${category.position === 0 ? 'center' : category.position === -1 ? 'left' : 'right'}`}
                onClick={() => handleCardClick(category.actualIndex)}
              >
                <h3 className="category-title">{category.title}</h3>
                <div className="skills-list">
                  {category.skills.map((skill, index) => (
                    <div key={index} className="skill-badge">
                      <svg className="skill-icon" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                      </svg>
                      <span>{skill}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="carousel-dots">
            {skillCategories.map((_, index) => (
              <button
                key={index}
                className={`dot ${currentCenterIndex === index ? 'active' : ''}`}
                onClick={() => setCurrentCenterIndex(index)}
                aria-label={`Go to skill ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
