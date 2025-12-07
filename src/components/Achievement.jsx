import React from 'react';
import './Achievement.css';
import SectionTitle from './SectionTitle';

const Achievement = () => {
  const achievements = [
    {
      id: 1,
      title: 'Champion at COMFEST-17 - AI Innovation Challenge',
      organization: 'Fakultas Ilmu Komputer - Universitas Indonesia',
      date: 'Sep 2025',
      description: 'An AI-based innovation competition is part of COMPFEST 17 (an annual IT festival held by Fasilkom UI students). AIC challenges participants to build innovative, impactful, and sustainable applications.',
      image: '/assets/achievement/Champion at COMFEST-17 - AI Innovation Challenge.png',
      icon: '🏆'
    },
    {
      id: 2,
      title: 'Student Award at COMFEST-17 - AI Innovation Challenge',
      organization: 'Fakultas Ilmu Komputer - Universitas Indonesia',
      date: 'Sep 2025',
      description: 'An AI-based innovation competition is part of COMPFEST 17 (an annual IT festival held by Fasilkom UI students). AIC challenges participants to build innovative, impactful, and sustainable applications.',
      image: '/assets/achievement/Student Award at COMFEST-17 - AI Innovation Challenge.png',
      icon: '🎓'
    },
    {
      id: 3,
      title: 'Secured Funding for PKM-Karsa Cipta (PIMNAS 37 2024)',
      organization: 'Kementerian Pendidikan, Kebudayaan, Riset, dan Teknologi',
      date: 'Nov 2024',
      description: 'This certificate is awarded to Dimas Firmansyah, as a Team Member, for successfully securing funding in the PKM-Karsa Cipta category at the Pekan Ilmiah Mahasiswa Nasional (PIMNAS) 37 in 2024.',
      image: '/assets/achievement/Secured Funding for PKM-Karsa Cipta (PIMNAS 37 2024).png',
      icon: '💰'
    },
    {
      id: 4,
      title: 'Participant in Pekan Ilmiah Mahasiswa Nasional (PIMNAS) to 37 In The Field PKM-Karsa Cipta',
      organization: 'Kementerian Pendidikan, Kebudayaan, Riset, dan Teknologi - Pusat Prestasi Nasional',
      date: 'Oct 2024',
      description: 'This certificate is awarded to Dimas Firmansyah for his participation in the PKM-Karsa Cipta category at the Pekan Ilmiah Mahasiswa Nasional (PIMNAS) ke-37 in 2024.',
      image: '/assets/achievement/Participant in Pekan Ilmiah Mahasiswa Nasional (PIMNAS) to 37 In The Field PKM-Karsa Cipta.png',
      icon: '📜'
    },
    {
      id: 5,
      title: '2nd Place Winner at Kontes Robot Indonesia (KRI) - Kontes Robot Sepak Bola Indonesia Beroda (KRSBI-B) Regional (II) Level',
      organization: 'Kementerian Pendidikan, Kebudayaan, Riset, dan Teknologi - Politeknik Elektronika Negeri Surabaya',
      date: 'Jul 2024',
      description: 'Representing Politeknik Elektronika Negeri Surabaya as part of Team ERSOW, achieved 2nd Place in the Wheeled Soccer Robot Division at the Indonesian Robot Contest (KRI) 2024 Region II.',
      image: '/assets/achievement/2nd Place Winner at Kontes Robot Indonesia (KRI) - Kontes Robot Sepak Bola Indonesia Beroda (KRSBI-B) Regional (II) Level.jpeg',
      icon: '🥈'
    },
    {
      id: 6,
      title: 'Winner at Kontes Robot Indonesia (KRI) - Kontes Robot Sepak Bola Indonesia Beroda (KRSBI-B) National Level',
      organization: 'Kementerian Pendidikan, Kebudayaan, Riset, dan Teknologi - Politeknik Elektronika Negeri Surabaya',
      date: 'Jul 2024',
      description: 'Continuing the success at the national stage, Team ERSOW claimed 1st Place in the Wheeled Soccer Robot Division at KRI 2024 National Level.',
      image: '/assets/achievement/Winner at Kontes Robot Indonesia (KRI) - Kontes Robot Sepak Bola Indonesia Beroda (KRSBI-B) National Level.jpeg',
      icon: '🥇'
    },
    {
      id: 7,
      title: '2nd Place Winner – Soccer Bot (IARC 2023 x RRO 2023)',
      organization: 'Institut Teknologi Sepuluh Nopember',
      date: 'Feb 2023',
      description: 'This certificate is awarded to Dimas Firmansyah for securing 2nd Place in the Soccer Bot competition at IARC 2023 x RRO 2023.',
      image: '/assets/achievement/2nd Place Winner – Soccer Bot (IARC 2023 x RRO 2023).jpeg',
      icon: '🤖'
    },
    {
      id: 8,
      title: 'Best Presentation – Smart Living Competition (Mechatronics Day 2022)',
      organization: 'Swiss German University',
      date: 'Sep 2022',
      description: 'Awarded to ELITE for delivering the Best Presentation at the Smart Living Competition during Mechatronics Day 2022.',
      image: '/assets/achievement/Best Presentation – Smart Living Competition (Mechatronics Day 2022).jpeg',
      icon: '🎤'
    },
    {
      id: 9,
      title: 'Most Favorite Team – Smart Living Competition (Mechatronics Day 2022)',
      organization: 'Swiss German University',
      date: 'Sep 2022',
      description: 'This certificate recognizes ELITE as the Most Favorite Team in the Smart Living Competition, held during Mechatronics Day 2022.',
      image: '/assets/achievement/Most Favorite Team – Smart Living Competition (Mechatronics Day 2022).jpeg',
      icon: '⭐'
    },
    {
      id: 10,
      title: '5th Place – Smart Living Competition (Mechatronics Day 2022)',
      organization: 'Swiss German University',
      date: 'Sep 2022',
      description: 'This certificate awards ELITE with 5th Place in the Smart Living Competition during Mechatronics Day 2022 at Swiss German University.',
      image: '/assets/achievement/5th Place – Smart Living Competition (Mechatronics Day 2022).jpeg',
      icon: '🏅'
    },
    {
      id: 11,
      title: 'HKI - Program Algoritma Sistem Pemantauan Pasien Pasca Rawat Berbasis Computer Vision dan Internet of Thing',
      organization: 'Intellectual Property Rights',
      date: 'Aug 2024',
      description: 'EC00202489256',
      image: '/assets/achievement/HKI - Program Algoritma Sistem Pemantauan Pasien Pasca Rawat Berbasis Computer Vision dan Internet of Thing.png',
      icon: '©️'
    },
    {
      id: 12,
      title: 'Grafana Advanced Skills Certification – Data Exploration & Visualization',
      organization: 'Politeknik Elektronika Negeri Surabaya',
      date: 'Nov 2024',
      description: 'ID Credential: EVD/11.2024/0034',
      image: '/assets/achievement/Grafana Advanced Skills Certification – Data Exploration & Visualization.jpeg',
      icon: '📊'
    },
    {
      id: 13,
      title: 'Power BI Advanced Skills Certification – Data Exploration & Visualization',
      organization: 'Politeknik Elektronika Negeri Surabaya',
      date: 'Nov 2024',
      description: 'ID Credential: EVD/11.2024/0034',
      image: '/assets/achievement/Power BI Advanced Skills Certification – Data Exploration & Visualization.jpeg',
      icon: '📈'
    },
    {
      id: 14,
      title: 'Tableau Advanced Skills Certification – Data Exploration & Visualization',
      organization: 'Politeknik Elektronika Negeri Surabaya',
      date: 'Nov 2024',
      description: 'ID Credential: EVD/11.2024/0034',
      image: '/assets/achievement/Tableau Advanced Skills Certification – Data Exploration & Visualization.jpeg',
      icon: '📉'
    },
    {
      id: 15,
      title: 'Certificate of Competency – Software Engineering',
      organization: 'Kementrian Pendidikan dan Kebudayaan',
      date: 'May 2023',
      description: 'Skills: Web Development',
      image: '/assets/achievement/Certificate of Competency – Software Engineering.jpeg',
      icon: '💻'
    }
  ];

  return (
    <section id="achievement" className="achievement">
      <div className="achievement-container">
        <SectionTitle>ACHIEVEMENTS & AWARDS</SectionTitle>

        <div className="achievements-grid">
          {achievements.map((achievement) => (
            <div key={achievement.id} className="achievement-card">
              <div className="achievement-icon-wrapper">
                <span className="achievement-emoji">{achievement.icon}</span>
              </div>
              <div className="achievement-image">
                <img
                  src={achievement.image}
                  alt={achievement.title}
                  onContextMenu={(e) => e.preventDefault()}
                  draggable="false"
                />
                <div className="achievement-watermark">Dimas Firmansyah</div>
              </div>
              <div className="achievement-content">
                <div className="achievement-date">{achievement.date}</div>
                <h3 className="achievement-title">{achievement.title}</h3>
                <h4 className="achievement-organization">{achievement.organization}</h4>
                <p className="achievement-description">{achievement.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Achievement;
