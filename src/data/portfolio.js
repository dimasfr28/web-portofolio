// Content for the portfolio, taken from the Main.dc.html design.
// Asset paths are relative to /public.
const A = '/assets';
export const asset = (path) => encodeURI(`${A}/${path}`);

const photos = (dir, files) => files.map((f) => ({ type: 'photo', src: asset(`${dir}/${f}`) }));
const video = (dir, file) => ({ type: 'video', src: asset(`${dir}/${file}`) });
const pdf = (dir, file) => ({ type: 'pdf', src: asset(`${dir}/${file}`) });

export const portrait = asset('profile/portrait.png');
export const cvHref = encodeURI('/doc_rag/CV Dimas.pdf');
export const githubHref = 'https://github.com/dimasfr28';
export const linkedinHref = 'https://linkedin.com/in/dimasfrsyh';
export const instagramHref = 'https://www.instagram.com/dimasfrmnsyahh/';

export const experiences = [
  {
    key: 'sevima', num: '01', date: 'AUG 26 – NOV 26', kind: 'INTERNSHIP & COLAB REASEARCH', latest: true,
    role: 'AI Software Engineer', org: 'SEVIMA: PT Sentra Vidya Utama',
    logo: asset('experience/sevima/sevima.jpeg'), initials: 'SV',
    bullets: [
      'Researched an AI-based accreditation reporting system in collaboration with PENS',
      'Built automated document extraction for accreditation guidelines and supporting documents',
      'Implemented RAG and LLMs to draft evidence-based Self-Evaluation Report (LED) narratives',
    ],
    tags: ['RAG', 'LLM', 'Document Extraction'],
    media: photos('experience/sevima', ['1.jpeg', '2.jpeg', '3.jpeg', '4.jpeg']),
  },
  {
    key: 'bulog', num: '02', date: 'DEC 25 – PRESENT', kind: 'INTERNSHIP',
    role: 'Data Scientist Intern', org: 'Perum BULOG, East Java Regional Office',
    logo: asset('experience/bulog/bulog.png'), initials: 'BL',
    bullets: [
      'Built a predictive modeling application for production and demand',
      'Developed the data warehouse pipeline that feeds the application platform',
    ],
    tags: ['Predictive Modeling', 'Data Warehouse'],
    media: photos('experience/bulog', ['1.jpeg', '2.jpeg', '3.jpeg', '4.jpeg', '5.jpeg']),
  },
  {
    key: 'earn', num: '03', date: 'AUG 25 – PRESENT', kind: 'RESEARCH',
    role: 'Research Member', org: 'EARN: Environmental AI Research Network',
    logo: asset('experience/earn/pens.png'), initials: 'EA',
    bullets: [
      'Ran community service programs on environmental awareness and sustainability',
      'Conducted IT and AI-based research to tackle environmental problems',
    ],
    tags: ['Environmental AI', 'Community Service'],
    media: photos('experience/earn', ['1.jpeg', '2.png']),
  },
  {
    key: 'ersowGm', num: '04', date: 'AUG 24 – PRESENT', kind: 'RESEARCH TEAM',
    role: 'AI Engineer & General Manager', org: 'ERSOW: EEPIS Robot Soccer on Wheeled',
    logo: asset('experience/ersow-ai/ersow.png'), initials: 'ER',
    bullets: [
      'Coordinated cross-division teams to reach KRSBI-B research targets',
      'Built autonomous robot navigation with potential fields to avoid dynamic obstacles',
      "Developed a ball trajectory prediction model to set the robot's defensive position",
    ],
    tags: ['Path Planning', 'Machine Learning', 'Team Lead'],
    media: photos('experience/ersow-ai', ['1.jpeg', '2.jpeg', '3.jpeg']),
  },
  {
    key: 'edust', num: '05', date: 'AUG 25 – DEC 25', kind: 'COMMUNITY',
    role: 'Mentor', org: 'EDUST: EEPIS Data Enthusiast',
    logo: asset('experience/edust/edust.jpeg'), initials: 'ED',
    bullets: [
      'Shared learning material and led hands-on sessions with the EDUST community',
      'Taught data engineering topics, especially SQL operations for data science',
    ],
    tags: ['SQL', 'Data Engineering'],
    media: photos('experience/edust', ['1.png', '2.png', '3.png']),
  },
  {
    key: 'ersowCv', num: '06', date: 'DEC 23 – JUL 24', kind: 'RESEARCH TEAM',
    role: 'Computer Vision Developer', org: 'ERSOW: EEPIS Robot Soccer on Wheeled',
    logo: asset('experience/ersow-cv/ersow.png'), initials: 'ER',
    bullets: [
      'Built a robot localization system based on field images',
      'Developed obstacle detection algorithms for teammates and opponents',
      'Trained deep learning detection models with YOLOv8 and TensorFlow',
    ],
    tags: ['YOLOv8', 'TensorFlow', 'Localization'],
    media: photos('experience/ersow-cv', ['1.jpeg', '2.jpeg', '3.jpeg']),
  },
  {
    key: 'arrahman', num: '07', date: 'MAR 23 – NOV 23', kind: 'REMOTE',
    role: 'Website Developer', org: 'Arrahman Invitation',
    logo: asset('experience/arrahman/arrahman.jpg'), initials: 'AR',
    bullets: ['Built a digital invitation platform with customizable templates using HTML, CSS, JavaScript, MySQL and WordPress'],
    tags: ['WordPress', 'JavaScript', 'MySQL'],
    media: photos('experience/arrahman', ['1.png', '2.jpeg']),
  },
  {
    key: 'dmc', num: '08', date: 'JAN 22 – JUN 22', kind: 'INTERNSHIP',
    role: 'Website Developer Intern', org: 'PT Duta Media Cipta',
    logo: asset('experience/dmc/dmc.png'), initials: 'DMC',
    bullets: [
      'Built a WordPress-based e-commerce application with online transaction features',
      'Developed a management website with PHP, JavaScript and MySQL',
    ],
    tags: ['PHP', 'WordPress', 'MySQL'],
    media: photos('experience/dmc', ['1.jpeg']),
  },
  {
    key: 'elite', num: '09', date: 'SEP 21 – AUG 23', kind: 'R&D',
    role: 'Research & Development Division', org: 'ELITE: Electronic Innovation Center',
    logo: asset('experience/elite/elite.jpeg'), initials: 'EL',
    bullets: [
      'Developed an autonomous robotic boat using ultrasonic sensors for maze navigation',
      'Built IoT-based livestock monitoring prototypes to support foot-and-mouth disease prevention',
      'Developed a remote water meter monitoring system to detect potential leaks',
    ],
    tags: ['IoT', 'Robotics', 'Ultrasonic Sensors'],
    media: photos('experience/elite', ['1.jpeg', '2.jpeg', '3.jpeg', '4.jpeg']),
  },
];

// Newest first. The first project of the current filter is the featured card shown above the grid.
// Optional `badge` and `facts` customise the featured card; otherwise it shows the category and stack.
// Numbers follow the array order.
const rawProjects = [
  {
    title: 'Ball Trajectory and Arrival Time Prediction for Autonomous Robot Goalkeeper',
    cat: 'ROBOTICS · AI', fullCat: 'ROBOTICS · ARTIFICIAL INTELLIGENCE · RESEARCH', keys: ['ai', 'robotic'],
    href: 'https://ieeexplore.ieee.org/document/11702559', linkLabel: 'Read the paper on IEEE Xplore',
    badge: 'IEEE XPLORE',
    facts: [['CATEGORY', 'Robotics, AI'], ['RESULT', 'MAE 2.8 cm · 35 ms'], ['TEAM', 'EEPIS Robot Soccer'], ['SENSORS', 'Omni camera, RealSense D455']],
    desc: 'Regression models predict where and when the ball arrives, so the ERSOW goalkeeper blocks shots in real time. Accepted at the 2026 International Electronics Symposium (IES).',
    tech: ['C++ · mlpack', 'Computer Vision', 'PID Control'],
    detailTech: ['C++', 'mlpack', 'Machine Learning', 'Computer Vision', 'OpenCV', 'Intel RealSense', 'PID Control'],
    points: [
      'Developed an end-to-end machine learning system using **C++ and mlpack** to predict ball trajectories, interception coordinates, and arrival times for the ERSOW autonomous goalkeeper.',
      'Integrated omnidirectional and Intel RealSense D455 cameras for real-time ball detection, localization, and distance estimation.',
      'Implemented data preprocessing, outlier removal, and motion feature extraction to improve trajectory prediction reliability.',
      'Developed and evaluated regression-based machine learning models, achieving **2.8 cm MAE and 0.62% MAPE** in ball trajectory prediction.',
      'Integrated machine learning predictions with robot motion control using PID controllers and inverse kinematics for autonomous shot blocking.',
      'Achieved **35 ms average computation time** and successfully blocked all 10 tested shots at **3–7 m/s** ball speeds.',
      'Research paper accepted at the **2026 International Electronics Symposium (IES)**.',
    ],
    media: [video('project/ball-trajectory', '1.mp4'), pdf('project/ball-trajectory', '2.pdf')],
  },
  {
    title: 'WoMAI', fullTitle: 'WoMAI: Wearable Operational Machine Agentic AI',
    cat: 'AI · IOT', fullCat: 'ARTIFICIAL INTELLIGENCE · SOFTWARE ENGINEERING · IoT', keys: ['ai', 'iot'], href: githubHref,
    desc: 'AI-powered predictive maintenance for industrial milling machines: ESP32 sensors, XGBoost early warnings, SHAP explanations and a LangGraph Corrective RAG agent.',
    tech: ['LangGraph', 'SHAP', 'ESP32'],
    detailTech: ['Python', 'Scikit-learn', 'SHAP', 'LLM', 'RAG', 'LangGraph', 'Gemini API', 'ChromaDB', 'FastAPI', 'Next.js', 'ESP32', 'Docker', 'Agentic AI'],
    points: [
      'Developed an end-to-end **AI-powered predictive maintenance platform** integrating IoT sensors, machine learning, and Agentic AI to monitor industrial milling machines.',
      'Built an ESP32-based IoT monitoring system using temperature and rotational speed sensors, transmitting machine operating data to a FastAPI backend for analysis.',
      'Implemented **XGBoost-based machine failure classification and a 10-minute prediction horizon**, providing early warnings of potential failures through Telegram notifications.',
      'Integrated **SHAP explainability** to identify contributing factors behind machine failure predictions, helping engineers interpret model outputs.',
      'Developed an automated document extraction pipeline using **MinerU and vector embeddings**, transforming machine manuals and technical documents into a searchable ChromaDB knowledge base.',
      'Built an **Agentic AI system using LangGraph, LLMs, and Corrective RAG** to perform root-cause analysis, retrieve maintenance procedures, and generate context-based repair recommendations.',
      'Implemented a **what-if simulation feature** that allows engineers to adjust machine parameters and evaluate potential changes in failure risk without modifying actual sensor data.',
      'Developed a web-based **Machine Copilot and interactive dashboard** using Next.js, integrating AI diagnostics, machine monitoring, maintenance history, and technical document retrieval.',
      'Automated the generation of **PDF maintenance reports**, including failure predictions, SHAP explanations, recommended actions, relevant SOPs, and estimated replacement-part costs.',
    ],
    media: [
      video('project/womai', 'womai.mp4'),
      { type: 'youtube', id: '1piYF13MON0', src: 'https://www.youtube.com/watch?v=1piYF13MON0' },
      pdf('project/womai', 'DRAFT PROPOSAL TEAM DOAIBU PENS - AIC COMPFEST 2026_removed.pdf'),
    ],
  },
  {
    title: 'Finite State Machine for Autonomous Soccer Robot Intelligence',
    cat: 'ROBOTICS · AI', fullCat: 'ROBOTICS · AUTONOMOUS SYSTEMS · ARTIFICIAL INTELLIGENCE', keys: ['ai', 'robotic'], href: '#',
    desc: 'FSM-based decision-making that coordinates ERSOW soccer robot behaviors: ball approach, dribbling, passing, kick-off and defensive positioning.',
    tech: ['Finite State Machine', 'C++ · ROS', 'Computer Vision'],
    detailTech: ['Finite State Machine', 'C++', 'ROS', 'Computer Vision', 'Autonomous Decision-Making', 'Robot Behavior Control'],
    points: [
      'Developed a **Finite State Machine (FSM)-based decision-making system** to coordinate autonomous soccer robot behaviors for the ERSOW robotic soccer team.',
      'Designed a **state-based control architecture** to organize robot actions, behavioral transitions, and execution of soccer-related tasks.',
      'Integrated **robot positioning and ball interaction behaviors** to support autonomous movement, ball approach, and gameplay execution.',
      'Implemented behavioral logic for **ball handling, dribbling, passing, and kick-off sequences**, enabling structured transitions between robot actions.',
      'Incorporated **defensive positioning and interception strategies** to support responses to changing ball positions and gameplay situations.',
      'Integrated **computer vision information** into robot behavior decisions, supporting ball localization and environmental awareness.',
      'Designed **obstacle avoidance behaviors** to help robots navigate around other robots and objects on the playing field.',
      'Supported **multi-robot coordination** through organized offensive and defensive behaviors, including positioning and passing.',
      'Conducted **physical robot demonstrations** to observe autonomous positioning, kick-off, passing, dribbling, and shooting behaviors on a robotic soccer field.',
      'Developed the behavior-control approach within the **ERSOW autonomous soccer robot platform**, supporting research and development for robotic soccer competitions.',
    ],
    media: [video('project/fsm', '1.mp4'), pdf('project/fsm', '2.pdf')],
  },
  {
    title: 'NeuroTraffic', fullTitle: 'NeuroTraffic: AI-Powered Traffic Analysis System',
    cat: 'AI / ML', keys: ['ai'], href: 'https://github.com/dimasfr28/trafic-tunjungan-detection-analysis-app',
    desc: "Semi-real-time traffic monitoring from Surabaya's SITS CCTV: YOLOv8 detection, tracking, density clustering and a DNN congestion classifier.",
    tech: ['YOLOv8', 'Deep Neural Network', 'FastAPI'],
    detailTech: ['Python', 'YOLOv8', 'PyTorch', 'Deep Neural Network', 'Computer Vision', 'Appium', 'FastAPI', 'Docker', 'Chart.js'],
    points: [
      "Developed a semi-real-time traffic monitoring system using CCTV footage from Surabaya's Intelligent Transport System (SITS).",
      'Automated CCTV video collection using Python and Appium, integrating vehicle detection, tracking, and counting for cars, motorcycles, and heavy vehicles.',
      'Implemented YOLOv8s for vehicle detection, achieving **86% mAP@0.5**, and applied clustering to categorize traffic density into low, medium, and high levels.',
      'Developed a Deep Neural Network (DNN) achieving **96.43% classification accuracy** for traffic congestion analysis.',
      'Built an interactive web dashboard featuring traffic visualization, historical analytics, peak-hour identification, and video-based traffic prediction.',
    ],
    media: photos('project/neurotrafic', ['1.png', '2.png', '3.png']),
  },
  {
    title: 'SOCNGANALIS', fullTitle: 'SOCNGANALIS: AI-Powered Social Media Analytics Platform',
    cat: 'AI / NLP', fullCat: 'ARTIFICIAL INTELLIGENCE · NLP · SOFTWARE ENGINEERING', keys: ['ai'], href: 'https://github.com/dimasfr28/socnganalis',
    desc: 'AI-powered social media analytics: Twitter/X scraping, LinearSVM sentiment, DBSCAN engagement clustering, topic and emotion analysis in a Django dashboard.',
    tech: ['LinearSVM', 'TF-IDF', 'DBSCAN'],
    detailTech: ['Python', 'LinearSVM', 'TF-IDF', 'Scikit-learn', 'DBSCAN', 'PCA', 'NLP', 'FastAPI', 'Django', 'PostgreSQL', 'Chart.js', 'Docker'],
    points: [
      'Developed an end-to-end **AI-powered social media analytics platform** integrating Twitter/X data collection, sentiment analysis, topic extraction, emotion classification, and interactive visualizations.',
      'Implemented a **Twitter/X scraping pipeline using tweet-harvest** to collect user replies and engagement data, supporting automated data collection and preprocessing.',
      'Integrated a **LinearSVM machine learning model with TF-IDF vectorization** to classify Indonesian social media comments into positive, negative, and neutral sentiments.',
      'Applied **DBSCAN clustering and PCA visualization** to identify peak engagement hours, analyze user activity patterns, and recommend optimal posting schedules.',
      'Implemented **NLP-based topic extraction and content pillar analysis** to identify trending discussions, frequently used keywords, and hashtag patterns.',
      'Developed an **emotion analysis module** to categorize user responses into joy, sadness, anger, fear, and surprise, providing deeper insights beyond sentiment classification.',
      'Built a **social media analytics dashboard using Django and Chart.js**, displaying engagement metrics, sentiment distributions, activity trends, topic analysis, and content performance.',
      'Developed **RESTful analytics APIs using FastAPI**, integrating machine learning inference, data processing, and PostgreSQL database management.',
      'Implemented a **multi-dataset management system** supporting dataset uploads, switching, deletion, and independent analysis without overwriting existing data.',
      'Containerized the application using **Docker Compose**, integrating Django, FastAPI, and PostgreSQL for reproducible deployment.',
    ],
    media: photos('project/socnganalis', ['1.png', '2.png', '3.png', '4.png', '5.png', '6.png', '7.png']),
  },
  {
    title: 'Tunarasa', fullTitle: 'Tunarasa: AI-Powered Inclusive Communication Platform',
    cat: 'AI / CV', fullCat: 'ARTIFICIAL INTELLIGENCE · COMPUTER VISION · SOFTWARE ENGINEERING', keys: ['ai'], href: 'https://github.com/ArielSulton/tunarasa',
    desc: 'Inclusive communication platform: real-time SIBI sign language recognition, LLM text correction and a RAG chatbot for public service providers.',
    tech: ['MediaPipe', 'LLM', 'RAG'],
    detailTech: ['Python', 'TensorFlow.js', 'MediaPipe', 'Computer Vision', 'LLaMA', 'LangChain', 'RAG', 'Pinecone', 'K-Means', 'Scikit-learn', 'Next.js', 'FastAPI', 'Supabase', 'Docker', 'Grafana', 'Prometheus', 'DeepEval'],
    points: [
      'Developed an **AI-powered inclusive communication platform** integrating computer vision, speech recognition, and LLMs to facilitate communication between people with hearing or speech disabilities and public service providers.',
      'Implemented **real-time Indonesian Sign Language (SIBI) recognition** using TensorFlow.js and MediaPipe, extracting hand landmarks and classifying finger gestures into text.',
      'Integrated an **LLM-based text correction system** to refine sign language recognition outputs, improving translation accuracy from **78% to approximately 97–98%** in reported evaluations.',
      'Developed a **Retrieval-Augmented Generation (RAG) chatbot** using LangChain, LLaMA, and Pinecone to retrieve institution-specific information from uploaded public service documents.',
      'Built an **automated document processing pipeline** for extracting, segmenting, embedding, and indexing institutional service guidelines into a searchable vector database.',
      'Implemented a **content-based recommendation system** using multilingual text embeddings and K-Means clustering to identify frequently asked questions and recommend relevant topics to users.',
      'Integrated **speech-to-text functionality** to support two-way communication between users and public service administrators.',
      'Developed an **interactive web application using Next.js and Supabase**, supporting user conversations, administrator responses, role-based access control, and institutional knowledge management.',
      'Implemented an **LLM-powered conversation summarization feature** that generates PDF conversation notes accessible through QR codes.',
      'Integrated **human-in-the-loop response validation**, allowing administrators to review, correct, or directly respond to questions handled by the AI chatbot.',
      'Built an **AI observability and monitoring dashboard** using Grafana, Prometheus, and DeepEval to track API performance, system health, LLM response quality, and recommendation clustering metrics.',
      'Containerized application components using **Docker** to support deployment and integration across system services.',
    ],
    media: [video('project/tunarasa', '1.mp4'), pdf('project/tunarasa', '2.pdf'), ...photos('project/tunarasa', ['3.jpeg', '4.jpeg'])],
  },
  {
    title: 'I-CLIC', fullTitle: 'I-CLIC: Intelligent Clinic Care',
    cat: 'AI / ML', fullCat: 'ARTIFICIAL INTELLIGENCE · MACHINE LEARNING · SOFTWARE ENGINEERING', keys: ['ai'], href: 'https://github.com/AfifH07/I-CLIC',
    desc: 'AI healthcare consultation: an LLM extracts symptoms, a Random Forest screens respiratory diseases, served through FastAPI and Django.',
    tech: ['LLM', 'Random Forest', 'FastAPI'],
    detailTech: ['Python', 'Random Forest', 'Scikit-learn', 'PyCaret', 'Optuna', 'LLM', 'NLP', 'FastAPI', 'Django', 'PostgreSQL', 'Docker'],
    points: [
      'Developed an **AI-powered healthcare consultation platform** integrating LLMs, machine learning, and NLP to provide preliminary respiratory disease screening through conversational interactions.',
      'Built an **LLM-based symptom extraction pipeline** to transform natural language consultations into structured features for machine learning predictions.',
      'Developed a **Random Forest classification model** to identify potential respiratory conditions, including bronchitis, influenza, common cold, and pneumonia.',
      'Implemented a complete **machine learning pipeline**, including exploratory data analysis, feature engineering, categorical encoding, Min-Max normalization, and Chi-Square feature selection.',
      'Applied **SMOTE-Tomek resampling** to address class imbalance and improve classification performance on underrepresented respiratory disease categories.',
      'Conducted **model comparison and hyperparameter optimization** using PyCaret and Optuna, achieving **100% accuracy on the reported test dataset** with the optimized Random Forest model.',
      'Developed a **FastAPI-based inference backend** integrating LLM symptom extraction, machine learning predictions, and chatbot consultation endpoints.',
      'Implemented **automated web scraping and article recommendations** to provide educational health content relevant to predicted respiratory conditions.',
      'Built a **Django-based web application** with user authentication, interactive AI chatbot consultations, symptom history, prediction results, and recommended health articles.',
      'Designed a **PostgreSQL relational database** to manage user profiles, symptoms, disease predictions, conversation history, and authentication data.',
      'Containerized the application using **Docker Compose**, orchestrating Django, FastAPI, and PostgreSQL services for consistent deployment environments.',
    ],
    media: [...photos('project/iclic', ['1.png', '2.png', '3.png', '4.png']), pdf('project/iclic', '5.pdf')],
  },
  {
    title: 'Autonomous Soccer Robot Localization Using Omnidirectional Cam', fullTitle: 'Autonomous Soccer Robot Localization Using Omnidirectional Cam',
    cat: 'ROBOTICS · CV', fullCat: 'ROBOTICS · COMPUTER VISION · AUTONOMOUS SYSTEMS', keys: ['ai', 'robotic'], href: '#',
    desc: 'Vision-based localization for the ERSOW soccer robot: omnidirectional camera, HSV field segmentation and radial search lines instead of wheel odometry.',
    tech: ['C++ · OpenCV', 'ROS', 'HSV Segmentation'],
    detailTech: ['C++', 'OpenCV', 'ROS', 'Computer Vision', 'Omnidirectional Camera', 'HSV Color Segmentation', 'Image Processing', 'Radial Search Line', 'Regression'],
    points: [
      'Contributed to the development of a **vision-based robot localization system** for the ERSOW autonomous soccer robot, designed to estimate robot positioning using visual field landmarks.',
      'Utilized a **360-degree omnidirectional camera** to capture the surrounding soccer field, enabling field detection and boundary identification from multiple directions.',
      'Implemented an **image processing pipeline using OpenCV**, including Region of Interest (ROI) cropping, RGB-to-HSV conversion, color thresholding, and contour detection.',
      'Applied **HSV color segmentation** to distinguish the green playing field from surrounding areas and identify black field boundaries as localization references.',
      'Implemented **morphological operations**, including erosion and dilation, to reduce image noise, improve field segmentation, and refine detected boundaries.',
      'Utilized **Convex Hull and contour processing** to identify field regions and distinguish boundary structures from surrounding visual information.',
      "Designed a **Radial Search Line algorithm** operating at 0°, 90°, 180°, and 270° to identify field boundary positions relative to the robot's camera center.",
      'Designed a **distance estimation approach using regression-based pixel-to-centimeter conversion** to support the calculation of robot coordinates relative to detected field boundaries.',
      'Investigated **vision-based localization as an alternative to wheel odometry**, addressing positional drift caused by wheel slippage and rotary encoder inaccuracies.',
      'Evaluated **field detection performance under different lighting conditions**, achieving approximately **20 FPS in dim lighting, 29 FPS in normal lighting, and 33 FPS in bright lighting**.',
      'Tested **field boundary detection ranges**, reaching up to **260 cm in dim conditions, 340 cm in normal conditions, and 380 cm in bright conditions**.',
      'Developed the vision-processing approach for the **ERSOW autonomous soccer robot**, supporting research toward more reliable robot positioning in competitive robotic soccer environments.',
    ],
    media: [video('project/localization', 'demo.mp4')],
  },
  {
    title: 'Big Data Pipeline Simulation', cat: 'DATA', keys: ['data'], href: '#',
    desc: 'ETL from an external API through PostgreSQL and HDFS, analysed in Spark, then served via Hive and HBase.',
    tech: ['Spark', 'HDFS', 'Hive · HBase'],
    detailTech: ['ETL', 'PostgreSQL', 'HDFS', 'Spark', 'Hive', 'HBase'],
    points: [
      'Simulates an ETL pipeline for product transaction data',
      'Pulls data from an external API, then processes and stores it in PostgreSQL',
      'Moves the data into HDFS for distributed storage',
      'Analyses the data with Apache Spark',
      'Loads results into Hive and HBase for processing and visualization',
    ],
    media: photos('project/big-data', ['1.png', '2.png', '3.png', '4.png']),
  },
  {
    title: 'SIMOCI', fullTitle: 'SIMOCI: AI-Powered Remote Patient Health Monitoring System',
    cat: 'AI · IOT', fullCat: 'ARTIFICIAL INTELLIGENCE · COMPUTER VISION · INTERNET OF THINGS', keys: ['ai', 'iot'], href: 'https://github.com/dimasfr28/simoci-monev2',
    desc: 'AI-powered remote patient monitoring prototype: ESP32 medical sensors, YOLOv8 height estimation, ML screening, Flutter app and online consultation.',
    tech: ['YOLOv8', 'ESP32', 'Flutter'],
    detailTech: ['Python', 'YOLOv8', 'Computer Vision', 'OpenCV', 'Supervised Learning', 'ESP32', 'Arduino', 'Firebase Realtime Database', 'Flutter', 'Dart', 'PyQt', 'IoT'],
    points: [
      'Developed an **IoT-based telemedicine prototype** integrating medical sensors, computer vision, machine learning, and mobile applications to support remote patient health monitoring.',
      'Integrated **ESP32 microcontrollers and medical sensors** to collect patient health measurements, including blood pressure, heart rate, body temperature, body weight, and environmental temperature.',
      'Implemented **YOLOv8-based computer vision** for automated body height estimation, converting detected pixel measurements into centimeters using linear regression.',
      'Developed a **Python-based hardware interface using PyQt and OpenCV** to manage medical sensors, camera operations, and patient health measurements.',
      'Built a **real-time data communication pipeline** connecting medical sensors, ESP32, a mini PC, and Firebase Realtime Database for synchronized health monitoring.',
      'Integrated **supervised machine learning** to analyze patient health measurements and generate preliminary disease predictions supporting medical consultations.',
      'Developed a **Flutter-based mobile application** that allows healthcare professionals to remotely monitor patient conditions and access measurement results.',
      'Implemented **two-way online consultation features** to facilitate communication between patients and medical professionals after preliminary health assessments.',
      'Designed a **self-service health examination workflow** that enables patients to collect multiple health measurements through an integrated medical monitoring device.',
      'Conducted **sensor accuracy evaluations** against reference medical devices, reporting average measurement differences of **2 mmHg systolic, 3 mmHg diastolic, 2 kg body weight, and 0.3°C temperature**.',
      'Evaluated **real-time data transmission performance**, achieving an average communication time of approximately **0.706 seconds** during prototype testing.',
      'Developed and tested the prototype as part of the **2024 Student Creativity Program (PKM-KC)**, including prototype evaluations with healthcare personnel.',
    ],
    media: [video('project/simoci', '1.mp4'), ...photos('project/simoci', ['2.png', '3.png'])],
  },
  {
    title: 'ELITE Management System', fullTitle: 'ELITE Management System: Robotics Organization Management Platform',
    cat: 'WEB', fullCat: 'SOFTWARE ENGINEERING · FULL-STACK WEB DEVELOPMENT', keys: ['web'], href: 'https://github.com/dimasfr28/elite-website',
    desc: 'Management platform for the ELITE robotics organization: five-role access control, inventory lending, finance tracking and automatic PDF reports.',
    tech: ['PHP · MySQL', 'Bootstrap 5', 'mPDF'],
    detailTech: ['PHP', 'MySQL', 'JavaScript', 'jQuery', 'Bootstrap 5', 'HTML/CSS', 'mPDF', 'FPDI', 'CKEditor'],
    points: [
      'Developed a **full-stack web-based management system** to digitalize administrative workflows for the Electronic Innovation Center (ELITE), a robotics organization at SMKN 2 Surabaya.',
      'Implemented **role-based access control (RBAC)** with five user roles: Administrator, Inventory Manager, Treasurer, Member, and Alumni, each with dedicated dashboards and permissions.',
      'Built a **member registration and verification system** with account approval workflows, profile management, class administration, and role-based authentication.',
      'Developed an **inventory management module** supporting equipment categorization, stock monitoring, item management, and inventory availability tracking.',
      'Implemented a **multi-item equipment lending system** with shopping-cart functionality, borrowing requests, administrator approvals, return tracking, and borrowing history.',
      'Built a **financial management system** to record member contributions, organizational income, expenses, transaction categories, and automatically calculated cash balances.',
      'Implemented **automated PDF report generation using mPDF and FPDI**, producing monthly and comprehensive financial and inventory reports.',
      'Designed and integrated a **MySQL relational database** to manage user accounts, inventory records, borrowing transactions, financial activities, and organizational information.',
      'Developed an **administrative content management module** for publishing organizational announcements, achievements, and member-related information.',
      'Implemented **session-based authentication and password hashing**, supporting role-specific access and account management.',
      'Built a **responsive web interface using Bootstrap 5, JavaScript, and jQuery**, including dedicated dashboards, interactive forms, and administrative notifications.',
    ],
    media: photos('project/elite', ['1.png', '2.png', '3.png', '4.png', '5.png', '6.png']),
  },
  {
    title: 'WEMOS Water Monitoring', fullTitle: 'WEMOS: IoT-Based Water Monitoring & Control System',
    cat: 'IOT', fullCat: 'INTERNET OF THINGS · EMBEDDED SYSTEMS · SOFTWARE ENGINEERING', keys: ['iot'], href: 'https://github.com/dimasfr28/wemos-website',
    desc: 'IoT water monitoring and control: ESP8266 with flow and turbidity sensors, remote valve control, live dashboard and automatic billing estimates.',
    tech: ['ESP8266', 'PHP · MySQL', 'Chart.js'],
    detailTech: ['WEMOS D1 Mini (ESP8266)', 'IoT', 'PHP', 'MySQL', 'JavaScript', 'AJAX', 'jQuery', 'Bootstrap 5', 'Chart.js', 'Water Flow Sensor', 'Turbidity Sensor', 'Solenoid Valve'],
    points: [
      'Developed an **IoT-based water monitoring and control platform** integrating ESP8266 microcontrollers, environmental sensors, and a web application for monitoring water consumption and quality.',
      'Integrated a **WEMOS D1 Mini (ESP8266)** with water flow and turbidity sensors to collect water usage measurements and monitor water clarity.',
      'Implemented a **remote water flow control system** using a relay-controlled solenoid valve, allowing users to open or close water supply through a web dashboard.',
      'Developed a **PHP-based backend** to process sensor readings, manage valve control commands, calculate water consumption, and retrieve monitoring data.',
      'Designed a **MySQL relational database** to store water flow measurements, turbidity readings, valve status, timestamps, and user information.',
      'Built a **real-time monitoring dashboard** displaying daily water consumption, water quality status, valve conditions, and water usage statistics.',
      'Implemented **interactive data visualizations using Chart.js**, enabling users to analyze daily water usage patterns and monthly consumption trends.',
      'Developed an **automated water billing calculation system** that estimates daily and monthly water costs based on measured consumption and predefined tariffs.',
      'Integrated **AJAX-based asynchronous data retrieval** to update dashboard information without requiring full-page reloads.',
      'Implemented **water quality monitoring** using turbidity sensor measurements to categorize water conditions as clear or turbid.',
      'Built a **responsive web interface using Bootstrap 5 and JavaScript**, providing water monitoring, valve controls, billing information, and user authentication.',
    ],
    media: photos('project/wemos', ['1.png', '2.jpeg']),
  },
];

export const projects = rawProjects.map((p, i) => ({ ...p, num: String(i + 1).padStart(2, '0') }));

export const projectFilters = [
  { key: 'all', label: 'All' },
  { key: 'ai', label: 'AI / ML' },
  { key: 'robotic', label: 'Robotic' },
  { key: 'data', label: 'Data' },
  { key: 'web', label: 'Web' },
];

const cert = (file) => asset(`achievement/${file}`);

export const achievements = [
  { id: 'robocup2026', group: 'awards', badge: '7TH PLACE', date: '2026', title: 'RoboCup Middle Size League Qualifiers 2026', org: 'RoboCup Federation · South Korea',
    note: 'Seventh place in the RoboCup Middle Size League qualifiers 2026 in South Korea, organized by the RoboCup Federation.',
    image: cert('7th place in the RoboCup Middle Size League qualifiers 2026 – South Korea.png') },
  { id: 'ies2026', group: 'awards', badge: 'ACCEPTED PAPER', date: '2026', title: 'IES 2026: International Electronics Symposium', org: 'IEEE Indonesia Section',
    note: 'Paper accepted at the International Electronics Symposium (IES 2026) in the Robotics Technology and Control System category, organized by the IEEE Indonesia Section.',
    image: cert('IES Author.png') },
  { id: 'compfest', group: 'awards', badge: 'CHAMPION', date: 'SEP 2025', title: 'COMPFEST 17 · AI Innovation Challenge', org: 'Fasilkom Universitas Indonesia',
    note: 'First place in the AI Innovation Challenge at COMPFEST 17, the annual IT festival run by Fasilkom UI students, where teams build innovative, impactful and sustainable AI applications.',
    image: cert('Champion at COMFEST-17 - AI Innovation Challenge.png') },
  { id: 'compfestStudent', group: 'awards', badge: 'STUDENT AWARD', date: 'SEP 2025', title: 'COMPFEST 17 · AI Innovation Challenge', org: 'Fasilkom Universitas Indonesia',
    note: 'Student Award from the same COMPFEST 17 AI Innovation Challenge, received alongside the championship title.',
    image: cert('Student Award at COMFEST-17 - AI Innovation Challenge.png') },
  { id: 'kriNat', group: 'awards', badge: '1ST · NATIONAL', date: 'JUL 2024', title: 'KRI 2024 · KRSBI-B Wheeled Soccer', org: 'Kemdikbudristek · Team ERSOW, PENS',
    note: 'Represented PENS as Team ERSOW in the KRSBI-B wheeled soccer division of the Indonesian Robot Contest and won the national final.',
    image: cert('Winner at Kontes Robot Indonesia (KRI) - Kontes Robot Sepak Bola Indonesia Beroda (KRSBI-B) National Level.jpeg') },
  { id: 'kriReg', group: 'awards', badge: '2ND · REGIONAL II', date: 'JUL 2024', title: 'KRI 2024 · KRSBI-B Wheeled Soccer', org: 'Kemdikbudristek · Team ERSOW, PENS',
    note: 'Represented PENS as Team ERSOW in the KRSBI-B wheeled soccer division, finishing second at the Regional II stage.',
    image: cert('2nd Place Winner at Kontes Robot Indonesia (KRI) - Kontes Robot Sepak Bola Indonesia Beroda (KRSBI-B) Regional (II) Level.jpeg') },
  { id: 'soccerBot', group: 'awards', badge: '2ND · NATIONAL', date: 'FEB 2023', title: 'Soccer Bot · IARC 2023 × RRO 2023', org: 'Institut Teknologi Sepuluh Nopember',
    note: 'Second place at the national level in the Soccer Bot competition at IARC 2023 × RRO 2023, hosted by Institut Teknologi Sepuluh Nopember.',
    image: cert('2nd Place Winner – Soccer Bot (IARC 2023 x RRO 2023).jpeg') },
  { id: 'slcBest', group: 'awards', badge: 'BEST PRESENTATION', date: 'SEP 2022', title: 'Smart Living Competition · Mechatronics Day 2022', org: 'Swiss German University · Team ELITE',
    note: 'Best Presentation at the Smart Living Competition, Mechatronics Day 2022, won as Team ELITE.',
    image: cert('Best Presentation – Smart Living Competition (Mechatronics Day 2022).jpeg') },
  { id: 'slcFav', group: 'awards', badge: 'MOST FAVORITE TEAM', date: 'SEP 2022', title: 'Smart Living Competition · Mechatronics Day 2022', org: 'Swiss German University · Team ELITE',
    note: 'Voted Most Favorite Team at the Smart Living Competition, Mechatronics Day 2022, as Team ELITE.',
    image: cert('Most Favorite Team – Smart Living Competition (Mechatronics Day 2022).jpeg') },
  { id: 'slc5', group: 'awards', badge: '5TH PLACE', date: 'SEP 2022', title: 'Smart Living Competition · Mechatronics Day 2022', org: 'Swiss German University · Team ELITE',
    note: 'Fifth place overall at the Smart Living Competition, Mechatronics Day 2022, as Team ELITE.',
    image: cert('5th Place – Smart Living Competition (Mechatronics Day 2022).jpeg') },
  { id: 'pkm', group: 'grants', badge: 'FUNDED', date: 'NOV 2024', title: 'PKM-KC: PKM-Karsa Cipta', org: 'Kemdikbudristek',
    note: 'Team member in the PKM-Karsa Cipta category; the team proposal secured funding from Kemdikbudristek.',
    image: cert('Secured Funding for PKM-Karsa Cipta (PIMNAS 37 2024).png') },
  { id: 'pimnas', group: 'grants', badge: 'PARTICIPANT', date: 'OCT 2024', title: 'PIMNAS 37 · PKM-Karsa Cipta', org: 'Kemdikbudristek · Pusat Prestasi Nasional',
    note: 'Took part in the 37th National Student Science Week (PIMNAS 37) with the PKM-Karsa Cipta team.',
    image: cert('Participant in Pekan Ilmiah Mahasiswa Nasional (PIMNAS) to 37 In The Field PKM-Karsa Cipta.png') },
  { id: 'hki', group: 'grants', badge: 'COPYRIGHT (HKI)', date: 'AUG 2024', title: 'Post-Care Patient Monitoring Algorithm', org: 'Intellectual Property Rights · No. EC00202489256',
    note: 'Registered copyright for the algorithm program behind a post-care patient monitoring system built on computer vision and IoT.',
    image: cert('HKI - Program Algoritma Sistem Pemantauan Pasien Pasca Rawat Berbasis Computer Vision dan Internet of Thing.png') },
  { id: 'grafana', group: 'certs', badge: 'ADVANCED', date: 'NOV 2024', title: 'Grafana Advanced Skills Certification', org: 'PENS · ID EVD/11.2024/0034',
    note: 'Advanced-level skills certification in Grafana, issued by PENS. Credential ID EVD/11.2024/0034.',
    image: cert('Grafana Advanced Skills Certification – Data Exploration & Visualization.jpeg') },
  { id: 'powerbi', group: 'certs', badge: 'ADVANCED', date: 'NOV 2024', title: 'Power BI Advanced Skills Certification', org: 'PENS · ID EVD/11.2024/0034',
    note: 'Advanced-level skills certification in Power BI, issued by PENS. Credential ID EVD/11.2024/0034.',
    image: cert('Power BI Advanced Skills Certification – Data Exploration & Visualization.jpeg') },
  { id: 'tableau', group: 'certs', badge: 'ADVANCED', date: 'NOV 2024', title: 'Tableau Advanced Skills Certification', org: 'PENS · ID EVD/11.2024/0034',
    note: 'Advanced-level skills certification in Tableau, issued by PENS. Credential ID EVD/11.2024/0034.',
    image: cert('Tableau Advanced Skills Certification – Data Exploration & Visualization.jpeg') },
  { id: 'swe', group: 'certs', badge: 'COMPETENCY', date: 'MAY 2023', title: 'Certificate of Competency · Software Engineering', org: 'Kementerian Pendidikan dan Kebudayaan',
    note: 'Certificate of Competency in Software Engineering, with web development as the assessed skill.',
    image: cert('Certificate of Competency – Software Engineering.jpeg') },
];

export const groupLabels = { awards: 'Award', grants: 'Grant & IP', certs: 'Certification' };
export const groupHeadings = [
  { key: 'awards', label: 'AWARDS' },
  { key: 'grants', label: 'GRANTS & IP' },
  { key: 'certs', label: 'CERTIFICATIONS' },
];
export const firstOfTab = { awards: 'compfest', grants: 'pkm', certs: 'grafana' };

// Rows shown in the Awards / Grants & IP tabs. `id` is the item the row opens in the panel.
export const achievementRows = {
  awards: [
    { id: 'robocup2026', year: '2026', rank: '7TH', size: 46, title: 'RoboCup Middle Size League Qualifiers 2026', sub: 'RoboCup Federation · South Korea', pill: 'QUALIFIERS' },
    { id: 'ies2026', year: '2026', rank: 'IES', size: 46, title: 'Accepted Paper · IES 2026', sub: 'IEEE Indonesia Section · Robotics Technology and Control System', pill: 'PAPER' },
    { id: 'compfest', year: '2025', rank: '1ST', size: 46, title: 'COMPFEST 17 · AI Innovation Challenge', sub: 'Fasilkom Universitas Indonesia', pill: '+ STUDENT AWARD' },
    { id: 'kriNat', year: '2024', rank: '1ST', size: 46, title: 'KRI 2024 · KRSBI-B Wheeled Soccer', sub: 'Kemdikbudristek · Team ERSOW, PENS', pill: 'NATIONAL' },
    { id: 'soccerBot', year: '2023', rank: '2ND', size: 46, title: 'Soccer Bot · IARC 2023 × RRO 2023', sub: 'Institut Teknologi Sepuluh Nopember', pill: 'NATIONAL' },
    { id: 'slc5', year: '2022', rank: '5TH', size: 46, title: 'Smart Living · Mechatronics Day 2022', sub: 'Swiss German University · Best Presentation, Most Favorite Team', pill: '+2 AWARDS' },
  ],
  grants: [
    { id: 'pkm', year: '2024', rank: 'PKM', size: 34, title: 'Funded, PKM-Karsa Cipta', sub: 'Kemdikbudristek', pill: 'GRANT' },
    { id: 'pimnas', year: '2024', rank: 'PIMNAS', size: 34, title: 'PIMNAS 37 Participant, PKM-Karsa Cipta', sub: 'Kemdikbudristek · Pusat Prestasi Nasional', pill: 'NATIONAL' },
    { id: 'hki', year: '2024', rank: 'HKI', size: 34, title: 'Post-Care Patient Monitoring Algorithm', sub: 'Computer Vision + IoT · No. EC00202489256', pill: 'COPYRIGHT' },
  ],
};

export const certCards = [
  { id: 'grafana', n: 'C / 01', date: 'NOV 2024', title: 'Grafana Advanced Skills', sub: 'PENS · ID EVD/11.2024/0034' },
  { id: 'powerbi', n: 'C / 02', date: 'NOV 2024', title: 'Power BI Advanced Skills', sub: 'PENS · ID EVD/11.2024/0034' },
  { id: 'tableau', n: 'C / 03', date: 'NOV 2024', title: 'Tableau Advanced Skills', sub: 'PENS · ID EVD/11.2024/0034' },
  { id: 'swe', n: 'C / 04', date: 'MAY 2023', title: 'Software Engineering Competency', sub: 'Kemendikbud · Web Development' },
];

export const roles = ['AI Engineer', 'Data Scientist', 'Web Developer'];

export const topics = ['Collaboration', 'Internship', 'Freelance', 'Just saying hi'];
