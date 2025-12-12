import React, { useEffect, useRef, useState } from "react";
import "./Experience.css";
import SectionTitle from "./SectionTitle";

const Experience = () => {
  const [visibleItems, setVisibleItems] = useState([]);
  const [scrollProgress, setScrollProgress] = useState(0);
  const timelineRef = useRef(null);

  const experiences = [
    {
      id: 1,
      company: "Perum BULOG Kantor Wilayah Jawa Timur - Surabaya",
      logo: "/assets/experience/bulog.png",
      position: "Data Scientist Intern",
      period: "December 2025 – Present",
      achievements: ["Built predictive modeling applications for production and demand forecasting", "Developed comprehensive data warehouse pipelines for platform applications"],
    },
    {
      id: 2,
      company: "Environmental AI Research Network (EARN) - Surabaya",
      logo: "/assets/experience/pens.png",
      position: "Research Member",
      period: "August 2025 – Present",
      achievements: ["Engaged in community service initiatives focused on environmental awareness and sustainability", "Conducted research leveraging information technology and artificial intelligence to address environmental challenges"],
    },
    {
      id: 3,
      company: "EEPIS Robot Soccer On Wheeld (ERSOW) - Surabaya",
      logo: "/assets/experience/ersow.png",
      position: "AI Engineer & General Manager",
      period: "August 2024 – Present",
      achievements: [
        "Led cross-functional team coordination to achieve research targets for the Indonesian Wheeled Robot Soccer Competition (KRSBI-B)",
        "Engineered autonomous robot navigation using potential field methods for dynamic obstacle avoidance",
        "Developed predictive models for ball trajectory to optimize defensive robot positioning",
      ],
    },
    {
      id: 4,
      company: "EEPIS Data Enthusiast (EDUST) - Surabaya",
      logo: "/assets/experience/edust.jpeg",
      position: "Mentor",
      period: "August 2025 – December 2025",
      achievements: ["Shared knowledge and conducted hands-on sessions with EDUST community members", "Covered Data Engineering topics, specifically SQL operations in the context of Data Science"],
    },
    {
      id: 5,
      company: "EEPIS Robot Soccer On Wheeld (ERSOW) - Surabaya",
      logo: "/assets/experience/ersow.png",
      position: "Computer Vision Developer",
      period: "December 2023 – July 2024",
      achievements: [
        "Implemented robot localization system through soccer field image analysis",
        "Created obstacle detection algorithms to identify teammates and opponents for enhanced navigation",
        "Built deep learning detection models using YOLOv8 and TensorFlow frameworks",
      ],
    },
    {
      id: 6,
      company: "Electronic Innovation Center - Surabaya",
      logo: "/assets/experience/elite.jpeg",
      position: "Programmer",
      period: "August 2021 – November 2023",
      achievements: ["Designed and developed innovative IoT prototypes with microcontroller integration, connecting hardware to web-based and mobile applications"],
    },
    {
      id: 7,
      company: "Arrahman Invitation – Surabaya",
      logo: "/assets/experience/arrahman.jpg",
      position: "Website Developer (Remote)",
      period: "March 2023 – November 2023",
      achievements: ["Created a digital invitation platform using HTML, CSS, JavaScript, MySQL, and WordPress, enabling customizable wedding invitation templates for diverse clients"],
    },
    {
      id: 8,
      company: "PT. Duta Media Cipta – Surabaya",
      logo: "/assets/experience/dmc.png",
      position: "Website Developer Intern",
      period: "January 2022 – June 2022",
      achievements: [
        "Built WordPress-based e-commerce applications with comprehensive online transaction features",
        "Developed management websites using PHP frameworks integrated with JavaScript and MySQL for efficient operational workflows",
      ],
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = parseInt(entry.target.dataset.id);
            setVisibleItems((prev) => [...new Set([...prev, id])]);
          }
        });
      },
      { threshold: 0.2 }
    );

    const items = document.querySelectorAll(".timeline-item");
    items.forEach((item) => observer.observe(item));

    const handleScroll = () => {
      if (timelineRef.current) {
        const rect = timelineRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const timelineHeight = timelineRef.current.offsetHeight;

        if (rect.top < windowHeight && rect.bottom > 0) {
          const visibleEnd = Math.min(timelineHeight, windowHeight - rect.top + windowHeight);
          const progress = Math.min(100, (visibleEnd / timelineHeight) * 100);
          setScrollProgress(progress);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section id="experience" className="experience">
      <div className="experience-container">
        <SectionTitle>PROFESSIONAL EXPERIENCE</SectionTitle>

        <div className="timeline" ref={timelineRef}>
          <div className="timeline-progress" style={{ height: `${scrollProgress}%` }}></div>
          {experiences.map((exp, index) => (
            <div key={exp.id} data-id={exp.id} className={`timeline-item ${index % 2 === 0 ? "left" : "right"} ${visibleItems.includes(exp.id) ? "visible" : ""}`}>
              <div className="timeline-dot">
                <img src={exp.logo} alt={exp.company} className="company-logo" />
              </div>
              <div className="timeline-content">
                <div className="timeline-period">{exp.period}</div>
                <h3 className="timeline-position">{exp.position}</h3>
                <h4 className="timeline-company">{exp.company}</h4>
                <ul className="timeline-achievements">
                  {exp.achievements.map((achievement, idx) => (
                    <li key={idx}>{achievement}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
