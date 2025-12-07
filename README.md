# Portfolio Website - Dimas Firmansyah

A modern, responsive portfolio website showcasing my work as an AI Engineer, Data Scientist, and Software Developer. Built with React and featuring an AI-powered chatbot assistant.

![Portfolio Website](https://img.shields.io/badge/React-18.2.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![Status](https://img.shields.io/badge/status-active-success)

## 🌟 Features

### Core Features
- **Responsive Design** - Fully optimized for desktop, tablet, and mobile devices
- **Modern UI/UX** - Clean, professional design with smooth animations
- **Dark Theme** - Eye-friendly dark color scheme with purple accents
- **Smooth Scrolling** - Seamless navigation between sections

### Interactive Components
- **AI Chatbot Assistant** - RAG-powered chatbot using Groq API for intelligent conversations
- **Dynamic Navigation** - Active section highlighting with hamburger menu for mobile
- **Contact Form** - Integrated with EmailJS for direct email communication
- **Project Showcase** - Interactive project cards with live demos and GitHub links
- **Skills Visualization** - Categorized skill display with progress indicators
- **Timeline Experience** - Animated professional experience timeline

### Technical Features
- **Email Integration** - EmailJS for contact form submissions
- **AI-Powered Chat** - Groq SDK integration for conversational AI
- **Vector Database** - Pinecone integration for RAG capabilities
- **PDF Support** - PDF.js for document handling
- **Markdown Support** - React Markdown for content rendering

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- EmailJS account (for contact form)
- Groq API key (for AI chatbot)
- Pinecone account (optional, for enhanced RAG)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd template
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the root directory:
   ```env
   # Groq API (Required for AI Chatbot)
   REACT_APP_GROQ_API_KEY=your_groq_api_key_here

   # Pinecone API (Optional for enhanced RAG)
   REACT_APP_PINECONE_API_KEY=your_pinecone_api_key_here

   # EmailJS Configuration (Required for Contact Form)
   REACT_APP_EMAILJS_SERVICE_ID=your_service_id
   REACT_APP_EMAILJS_TEMPLATE_ID=your_template_id
   REACT_APP_EMAILJS_PUBLIC_KEY=your_public_key
   ```

4. **Start the development server**
   ```bash
   npm start
   ```

   The application will open at [http://localhost:3000](http://localhost:3000)

## 🔧 Configuration

### EmailJS Setup

1. Create an account at [EmailJS](https://www.emailjs.com/)
2. Create a new email service
3. Create an email template with these variables:
   - `{{name}}` - Sender's name
   - `{{email}}` - Sender's email
   - `{{message}}` - Message content
   - `{{time}}` - Timestamp

4. Copy your Service ID, Template ID, and Public Key to `.env`

For detailed setup instructions, see [EMAILJS_TEMPLATE_SETUP.md](EMAILJS_TEMPLATE_SETUP.md)

### Groq API Setup

1. Sign up at [Groq Console](https://console.groq.com/)
2. Generate an API key
3. Add the key to your `.env` file

### Customization

#### Update Personal Information

Edit the following files:
- `src/components/Hero.jsx` - Name, title, subtitle
- `src/components/About.jsx` - About me content
- `src/components/Experience.jsx` - Work experience
- `src/components/Skills.jsx` - Technical skills
- `src/components/Project.jsx` - Portfolio projects
- `src/components/Achievement.jsx` - Achievements and certifications

#### Update Social Links

Edit `src/components/Header.jsx`:
```javascript
// Line 81-95
<a href="https://www.linkedin.com/in/your-profile">LinkedIn</a>
<a href="https://github.com/your-username">GitHub</a>
<a href="https://www.instagram.com/your-profile">Instagram</a>
```

#### Change Colors

Edit `src/App.css` and component CSS files:
```css
/* Primary purple color */
#7c3aed

/* Secondary purple */
#a78bfa

/* Dark background */
#000000, #1a1a1a
```

## 📁 Project Structure

```
template/
├── public/
│   ├── assets/
│   │   ├── home/          # Hero section images
│   │   ├── experience/    # Company logos
│   │   ├── projects/      # Project screenshots
│   │   └── achievements/  # Certificates and awards
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Header.jsx          # Navigation header
│   │   ├── Hero.jsx            # Landing section
│   │   ├── About.jsx           # About me section
│   │   ├── Experience.jsx      # Work experience timeline
│   │   ├── Skills.jsx          # Technical skills
│   │   ├── Project.jsx         # Portfolio projects
│   │   ├── Achievement.jsx     # Achievements
│   │   ├── AskMe.jsx           # AI Chatbot section
│   │   ├── CTABox.jsx          # Call-to-action
│   │   ├── Contact.jsx         # Contact form
│   │   └── SectionTitle.jsx    # Reusable title component
│   ├── App.jsx             # Main application
│   ├── App.css             # Global styles
│   └── index.js            # Entry point
├── .env                    # Environment variables
├── package.json            # Dependencies
└── README.md              # This file
```

## 🎨 Sections Overview

### 1. Hero Section
- Dynamic typing animation for job titles
- Professional photo with tech stack icons
- Call-to-action button to contact section

### 2. About Section
- Personal introduction
- Background and expertise
- Professional summary

### 3. Professional Experience
- Interactive timeline layout
- Company logos and positions
- Achievements and responsibilities
- Animated scroll progress indicator

### 4. Skills Section
- Categorized by technology type
- Programming languages, frameworks, tools
- Data science and AI technologies

### 5. Projects
- Project cards with images
- Live demo and GitHub links
- Technology stack tags
- Project descriptions

### 6. Achievements
- Certifications and awards
- Competition results
- Professional recognitions

### 7. Ask Me Anything (AI Chatbot)
- Groq-powered conversational AI
- RAG (Retrieval Augmented Generation)
- Browser-based memory storage
- Markdown support for responses

### 8. Contact Section
- Email integration via EmailJS
- Form validation
- Success/error notifications
- Timestamp tracking

## 🛠️ Built With

### Core Technologies
- **React** - UI framework
- **JavaScript (ES6+)** - Programming language
- **CSS3** - Styling
- **HTML5** - Markup

### Libraries & APIs
- **@emailjs/browser** - Email service integration
- **groq-sdk** - AI chatbot functionality
- **@pinecone-database/pinecone** - Vector database
- **pdfjs-dist** - PDF handling
- **react-markdown** - Markdown rendering

### Development Tools
- **React Scripts** - Build tooling
- **Netlify CLI** - Deployment
- **Node Polyfill Webpack Plugin** - Browser compatibility

## 📱 Responsive Design

The website is fully responsive with breakpoints at:
- **Desktop**: > 1024px
- **Tablet**: 768px - 1024px
- **Mobile**: < 768px
- **Small Mobile**: < 480px

### Mobile Features
- Hamburger navigation menu
- Touch-optimized interactions
- Optimized images and layouts
- Hidden timeline graphics for clarity

## 🚢 Deployment

### Build for Production

```bash
npm run build
```

This creates an optimized production build in the `build/` folder.

### Deploy to Netlify

1. **Install Netlify CLI**
   ```bash
   npm install -g netlify-cli
   ```

2. **Build the project**
   ```bash
   npm run build
   ```

3. **Deploy**
   ```bash
   netlify deploy --prod
   ```

### Environment Variables on Netlify

Add these in your Netlify dashboard under Site Settings > Environment Variables:
- `REACT_APP_GROQ_API_KEY`
- `REACT_APP_PINECONE_API_KEY`
- `REACT_APP_EMAILJS_SERVICE_ID`
- `REACT_APP_EMAILJS_TEMPLATE_ID`
- `REACT_APP_EMAILJS_PUBLIC_KEY`

## 🧪 Testing

Run tests with:
```bash
npm test
```

## 📝 Scripts

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests
- `npm run eject` - Eject from Create React App (irreversible)

## 🔒 Security

- API keys are stored in environment variables
- EmailJS handles email transmission securely
- No sensitive data stored in browser
- CORS policies enforced

## 🐛 Known Issues

None at the moment. If you find any bugs, please report them.

## 📈 Performance Optimization

- Lazy loading for images
- Code splitting with React
- Optimized animations
- Minimal bundle size
- Browser caching strategies

## 🤝 Contributing

This is a personal portfolio project. Feel free to fork and customize for your own use.

## 📄 License

This project is licensed under the MIT License - feel free to use it as a template for your own portfolio.

## 👤 Author

**Dimas Firmansyah**
- LinkedIn: [dimasfrsyh](https://www.linkedin.com/in/dimasfrsyh)
- GitHub: [dimasfr28](https://github.com/dimasfr28/)
- Instagram: [dimasfrmnsyahh](https://www.instagram.com/dimasfrmnsyahh/)

## 🙏 Acknowledgments

- Groq for AI capabilities
- EmailJS for email service
- React community for excellent documentation
- All open-source contributors

## 📞 Support

For questions or support, please use the contact form on the website or reach out via social media.

---

**Built with ❤️ using React**
