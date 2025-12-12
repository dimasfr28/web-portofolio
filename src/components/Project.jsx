import { useState, useEffect } from 'react';
import './Project.css';
import SectionTitle from './SectionTitle';

const Project = () => {
  const [filter, setFilter] = useState('all');
  const [currentImageIndex, setCurrentImageIndex] = useState({});
  const [slideDirection, setSlideDirection] = useState({});

  const projects = [
    {
      id: 1,
      title: 'NeuroTraffic',
      category: 'ai',
      description: 'A real-time traffic analysis system using Deep Learning and Computer Vision to detect, count, and predict traffic density on Jl. Tunjungan, Surabaya.',
      folder: 'neurotrafic',
      images: [
        '/assets/project/neurotrafic/screencapture-localhost-8001-2025-12-03-06_59_10.png',
        '/assets/project/neurotrafic/screencapture-localhost-8001-analysis-2025-12-04-15_27_12.png',
        '/assets/project/neurotrafic/screencapture-localhost-8001-prediction-2025-12-04-15_26_21.png'
      ],
      technologies: ['YOLOv8', 'Deep Neural Network', 'Vehicle Tracking', 'OCR Tesseract'],
      githubLink: 'https://github.com/dimasfr28/trafic-tunjungan-detection-analysis-app/'
    },
    {
      id: 2,
      title: 'Socnganalis',
      category: 'ai',
      description: 'An all-in-one analytics platform that combines Twitter/X scraping, AI sentiment analysis, machine learning clustering, and interactive visualization to help you understand social media performance in depth.',
      folder: 'socnganalis',
      images: [
        '/assets/project/socnganalis/1.png',
        '/assets/project/socnganalis/2.png',
        '/assets/project/socnganalis/3.png',
        '/assets/project/socnganalis/4.png',
        '/assets/project/socnganalis/5.png',
        '/assets/project/socnganalis/6.png',
        '/assets/project/socnganalis/7.png'
      ],
      technologies: ['LinearSVM', 'TF-IDF', 'DBSCAN Clustering', 'Chart.js', 'Docker'],
      githubLink: 'https://github.com/dimasfr28/socnganalis'
    },
    {
      id: 3,
      title: 'Tunarasa',
      category: 'ai',
      description: 'An inclusive platform that translates sign language and helps access public services using AI. This system combines Computer Vision, LLM, and RAG to provide more adaptive interactions for people with hearing disabilities.',
      folder: 'tunarasa',
      images: [
        '/assets/project/tunarasa/tunarasa.png',
        '/assets/project/tunarasa/Orange & Blue Digital Marketer Logo (5).png',
        '/assets/project/tunarasa/Orange & Blue Digital Marketer Logo (6).png'
      ],
      technologies: ['Computer Vision', 'LLM', 'RAG', 'AI Translation'],
      githubLink: 'https://github.com/ArielSulton/tunarasa'
    },
    {
      id: 4,
      title: 'I-CLIC',
      category: 'ai',
      description: 'A health consultation system that combines LLM and Machine Learning models for rapid symptom diagnosis. The backend is built with FastAPI and PostgreSQL to manage data, authentication, and consultation history.',
      folder: 'iclic',
      images: [
        '/assets/project/iclic/image (8).png',
        '/assets/project/iclic/Orange & Blue Digital Marketer Logo (5).png',
        '/assets/project/iclic/Orange & Blue Digital Marketer Logo (6).png',
        '/assets/project/iclic/Orange & Blue Digital Marketer Logo.png'
      ],
      technologies: ['LLM', 'Machine Learning', 'FastAPI', 'PostgreSQL'],
      githubLink: 'https://github.com/AfifH07/I-CLIC'
    },
    {
      id: 5,
      title: 'Big Data Pipeline Simulation',
      category: 'data',
      description: 'A big data pipeline simulation involving data extraction, transformation, and loading (ETL) processes for product transactions. This pipeline retrieves product information from external APIs, processes and stores it in PostgreSQL, moves data to HDFS, performs analysis using Spark, then transfers data to Hive and HBase for further processing and visualization.',
      folder: 'big-data',
      images: [
        '/assets/project/big-data/Screenshot from 2025-12-07 08-39-13.png',
        '/assets/project/big-data/Screenshot from 2025-12-07 08-41-41.png',
        '/assets/project/big-data/Screenshot from 2025-12-07 08-42-05.png',
        '/assets/project/big-data/Screenshot from 2025-12-07 08-42-24.png'
      ],
      technologies: ['ETL', 'PostgreSQL', 'HDFS', 'Spark', 'Hive', 'HBase'],
      githubLink: null
    },
    {
      id: 6,
      title: 'SIMOCI',
      category: 'iot',
      description: 'A health monitoring system that leverages IoT, Machine Learning, and YOLO for object detection and remote patient monitoring. This application enables medical data analysis and online consultations with healthcare professionals.',
      folder: 'simoci',
      images: [
        '/assets/project/simoci/Orange & Blue Digital Marketer Logo (5).png',
        '/assets/project/simoci/Orange & Blue Digital Marketer Logo (6).png'
      ],
      technologies: ['IoT', 'Machine Learning', 'YOLO', 'Remote Monitoring'],
      githubLink: 'https://github.com/dimasfr28/simoci-monev2'
    },
    {
      id: 7,
      title: 'ELITE Management System',
      category: 'web',
      description: 'A digitalization system for robotics organization administration to manage members, finances, and inventory. This platform provides admin verification features, item borrowing, and automatic reports in PDF format.',
      folder: 'elite',
      images: [
        '/assets/project/elite/image (2).png',
        '/assets/project/elite/image (3).png',
        '/assets/project/elite/image (4).png',
        '/assets/project/elite/image (5).png',
        '/assets/project/elite/image (6).png',
        '/assets/project/elite/image (7).png'
      ],
      technologies: ['Admin Management', 'Inventory System', 'PDF Reports', 'Web Application'],
      githubLink: 'https://github.com/dimasfr28/elite-website'
    },
    {
      id: 8,
      title: 'WEMOS Water Monitoring',
      category: 'iot',
      description: 'An IoT system that monitors water usage and quality in real-time. This system also controls water flow via the web and displays all data in a visual dashboard.',
      folder: 'wemos',
      images: [
        '/assets/project/wemos/1.png',
        '/assets/project/wemos/2.png'
      ],
      technologies: ['IoT', 'Real-time Monitoring', 'Web Control', 'Dashboard'],
      githubLink: 'https://github.com/dimasfr28/wemos-website'
    }
  ];

  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'ai', label: 'AI & ML' },
    { id: 'iot', label: 'IoT' },
    { id: 'web', label: 'Web Apps' },
    { id: 'data', label: 'Data Engineering' }
  ];

  const filteredProjects = filter === 'all'
    ? projects
    : projects.filter(project => project.category === filter);

  // Initialize image indices for all projects
  useEffect(() => {
    const initialIndices = {};
    projects.forEach(project => {
      initialIndices[project.id] = 0;
    });
    setCurrentImageIndex(initialIndices);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Auto-scroll carousel every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setSlideDirection(prev => {
        const newDirections = { ...prev };
        projects.forEach(project => {
          if (project.images.length > 1) {
            newDirections[project.id] = 'right';
          }
        });
        return newDirections;
      });

      setCurrentImageIndex(prev => {
        const newIndices = { ...prev };
        projects.forEach(project => {
          if (project.images.length > 1) {
            newIndices[project.id] = ((prev[project.id] || 0) + 1) % project.images.length;
          }
        });
        return newIndices;
      });
    }, 4000); // Change image every 4 seconds

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Handle next image
  const nextImage = (projectId, imageCount) => {
    setSlideDirection(prev => ({
      ...prev,
      [projectId]: 'right'
    }));
    setCurrentImageIndex(prev => ({
      ...prev,
      [projectId]: (prev[projectId] + 1) % imageCount
    }));
  };

  // Handle previous image
  const prevImage = (projectId, imageCount) => {
    setSlideDirection(prev => ({
      ...prev,
      [projectId]: 'left'
    }));
    setCurrentImageIndex(prev => ({
      ...prev,
      [projectId]: prev[projectId] === 0 ? imageCount - 1 : prev[projectId] - 1
    }));
  };

  return (
    <section id="project" className="project">
      <div className="project-container">
        <SectionTitle>FEATURED PROJECTS</SectionTitle>

        <div className="project-filters">
          {categories.map(category => (
            <button
              key={category.id}
              className={`filter-btn ${filter === category.id ? 'active' : ''}`}
              onClick={() => setFilter(category.id)}
            >
              {category.label}
            </button>
          ))}
        </div>

        <div className="projects-grid">
          {filteredProjects.map(project => {
            const images = project.images;
            const currentIndex = currentImageIndex[project.id] || 0;
            const hasMultipleImages = images.length > 1;
            const direction = slideDirection[project.id] || 'right';

            return (
              <div key={project.id} className="project-card">
                <div className="project-image-wrapper">
                  <div className="project-image">
                    <img
                      key={`${project.id}-${currentIndex}`}
                      src={images[currentIndex]}
                      alt={`${project.title} - ${currentIndex + 1}`}
                      className={`slide-${direction}-enter`}
                      onError={(e) => {
                        e.target.src = `/assets/project/${project.folder}/${project.folder}.png`;
                      }}
                    />
                  </div>

                  {hasMultipleImages && (
                    <>
                      <button
                        className="carousel-btn prev-btn"
                        onClick={() => prevImage(project.id, images.length)}
                        aria-label="Previous image"
                      >
                        <svg viewBox="0 0 24 24" fill="currentColor">
                          <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
                        </svg>
                      </button>
                      <button
                        className="carousel-btn next-btn"
                        onClick={() => nextImage(project.id, images.length)}
                        aria-label="Next image"
                      >
                        <svg viewBox="0 0 24 24" fill="currentColor">
                          <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
                        </svg>
                      </button>

                      <div className="carousel-indicators">
                        {images.map((_, idx) => (
                          <span
                            key={idx}
                            className={`indicator ${idx === currentIndex ? 'active' : ''}`}
                            onClick={() => {
                              setSlideDirection(prev => ({
                                ...prev,
                                [project.id]: idx > currentIndex ? 'right' : 'left'
                              }));
                              setCurrentImageIndex(prev => ({...prev, [project.id]: idx}));
                            }}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>

                <div className="project-content">
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-description">{project.description}</p>
                  <div className="project-technologies">
                    {project.technologies.map((tech, index) => (
                      <span key={index} className="tech-tag">{tech}</span>
                    ))}
                  </div>

                  {project.githubLink && (
                    <div className="project-actions">
                      <a
                        href={project.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="github-btn"
                      >
                        <svg viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
                        </svg>
                        View on GitHub
                      </a>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Project;
