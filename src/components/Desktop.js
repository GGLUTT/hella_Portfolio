import React, { useState, useEffect } from 'react';
import './Desktop.css';
import Window from './Window';
import Dock from './Dock';
import Folder from './Folder';
import ProfileCard from './ProfileCard';

// Імпорт зображень
import bankImg from '../img/workflow/bank.png';
import bikeImg from '../img/workflow/bike.png';
import wineStore from '../img/workflow/2.png';
import nikeImg from '../img/workflow/nike.png';
import olxImg from '../img/workflow/olx.png';
import phoneImg from '../img/workflow/phone2.png';
import tgBotImg from '../img/workflow/tg-bot.png';
import hellaPhoto from '../img/user_photo/hella.jpg';

// Додайте імпорти на початок файлу
import emailIcon from '../img/icons/email.png';
import githubIcon from '../img/icons/github.png';
import linkedinIcon from '../img/icons/lindedin.png';
import telegramIcon from '../img/icons/telegram.png';

// Імпорт PDF файлу
import resumePDF from '../img/resume/Resume.pdf';

const Desktop = () => {
  const [openWindows, setOpenWindows] = useState([]);
  const [windowPositions, setWindowPositions] = useState({});
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);

  // Анімація завантаження
  useEffect(() => {
    setTimeout(() => setIsLoaded(true), 500);
  }, []);

  // Відстеження позиції миші для паралакс ефекту
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const desktopItems = [
    { 
      id: 'projects', 
      type: 'folder', 
      name: 'Projects', 
      x: 80, 
      y: 80, 
      color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      items: ['React', 'Vue', 'Node'],
      icon: '🚀'
    },
    { 
      id: 'resume', 
      type: 'file', 
      name: 'Resume.pdf', 
      x: 80, 
      y: 250, 
      icon: '📄',
      color: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
    },
    { 
      id: 'skills', 
      type: 'folder', 
      name: 'Skills', 
      x: 80, 
      y: 420, 
      color: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      items: ['JS', 'CSS', 'HTML'],
      icon: '⚡'
    },
    { 
      id: 'contacts', 
      type: 'file', 
      name: 'Contacts.txt', 
      x: 280, 
      y: 250, 
      icon: '📞',
      color: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'
    },
    { 
      id: 'portfolio', 
      type: 'folder', 
      name: 'Portfolio', 
      x: 280, 
      y: 80, 
      color: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
      items: ['Design', 'Code', 'Art'],
      icon: '🎨'
    },
    {
      id: 'achievements',
      type: 'folder',
      name: 'Achievements',
      x: 280,
      y: 420,
      color: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
      items: ['Awards', 'Certificates'],
      icon: '🏆'
    }
  ];

  const projectsContent = [
    { 
      name: 'Banking App', 
      image: bankImg, 
      description: 'Mobile banking app with modern UI/UX and secure transactions',
      url: 'https://gglutt.github.io/bank_system_GTA5/',
      tech: ['React', 'Node.js', 'MongoDB'],
      status: 'Completed'
    },
    { 
      name: 'Bike Rental', 
      image: bikeImg, 
      description: 'Innovative bike rental platform with GPS tracking',
      url: 'https://gglutt.github.io/landing-Page/',
      tech: ['Vue.js', 'Express', 'PostgreSQL'],
      status: 'In Development'
    },
    { 
      name: 'Nike Store', 
      image: nikeImg, 
      description: 'Modern e-commerce store for sportswear with AR try-on',
      url: 'https://gglutt.github.io/Nike_Landing1/',
      tech: ['React', 'Redux', 'Stripe'],
      status: 'Completed'
    },
    { 
      name: 'Wine Store', 
      image: wineStore, 
      description: 'Elegant platform for premium wine sales',
      url: 'https://gglutt.github.io/Nike_Landing1/',
      tech: ['Next.js', 'Prisma', 'Tailwind'],
      status: 'Completed'
    },
    { 
      name: 'Phone App', 
      image: phoneImg, 
      description: 'Smartphone catalog with detailed specifications and comparison',
      url: 'https://gglutt.github.io/phones-catalog/',
      tech: ['React', 'TypeScript', 'SCSS'],
      status: 'Completed'
    },
    { 
      name: 'Telegram Bot', 
      image: tgBotImg, 
      description: 'Smart automated Telegram bot with AI features',
      url: 'https://github.com/GGLUTT/Telega-AutoBot',
      tech: ['Python', 'Telegram API', 'AI'],
      status: 'Active'
    }
  ];

  const skillsContent = [
    { 
      category: 'Frontend', 
      skills: ['React', 'SCSS', 'JavaScript', 'TypeScript', 'CSS3', 'HTML5', 'Redux'],
      icon: '🎨',
      level: 95
    },
    { 
      category: 'Backend', 
      skills: ['Node.js', 'MySQL', 'PostgreSQL', 'NaviCut'],
      icon: '⚙️',
      level: 85
    },
    { 
      category: 'Tools', 
      skills: ['Git', 'NPM', 'Webpack', 'Figma', 'Photoshop', 'BEM'],
      icon: '🛠️',
      level: 90
    },

  ];

  const openWindow = (item) => {
    if (!openWindows.find(w => w.id === item.id)) {
      const newWindow = {
        id: item.id,
        title: item.name,
        type: item.type,
        content: getWindowContent(item)
      };
      setOpenWindows([...openWindows, newWindow]);
      setWindowPositions({
        ...windowPositions,
        [item.id]: { 
          x: 300 + Math.random() * 100, 
          y: 100 + Math.random() * 100 
        }
      });
    }
  };

  const closeWindow = (windowId) => {
    setOpenWindows(openWindows.filter(w => w.id !== windowId));
  };

  const goToDemo = (url) => {
    window.open(url, '_blank');
  };
  
  const getWindowContent = (item) => {
    switch (item.id) {
      case 'projects':
        return (
          <div className="projects-grid">
            {projectsContent.map((project, index) => (
              <div key={index} className="project-card modern-card">
                <div className="project-image-container">
                  <img 
                    src={project.image} 
                    alt={project.name} 
                    className="project-image"
                  />
                  <div className="project-status">{project.status}</div>
                </div>
                <div className="project-info">
                  <h3>{project.name}</h3>
                  <p>{project.description}</p>
                  <div className="tech-stack">
                    {project.tech.map((tech, techIndex) => (
                      <span key={techIndex} className="tech-tag">{tech}</span>
                    ))}
                  </div>
                  <button 
                    className="demo-btn modern-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      goToDemo(project.url);
                    }}
                  >
                    <span>View Demo</span>
                    <i className="arrow">→</i>
                  </button>
                </div>
              </div>
            ))}
          </div>
        );
      case 'skills':
        return (
          <div className="skills-container modern-skills">
            {skillsContent.map((category, index) => (
              <div key={index} className="skill-category modern-category">
                <div className="category-header">
                  <span className="category-icon">{category.icon}</span>
                  <h3>{category.category}</h3>
                  <div className="skill-level">
                    <div className="level-bar">
                      <div 
                        className="level-fill" 
                        style={{ width: `${category.level}%` }}
                      ></div>
                    </div>
                    <span className="level-text">{category.level}%</span>
                  </div>
                </div>
                <div className="skills-list">
                  {category.skills.map((skill, skillIndex) => (
                    <span key={skillIndex} className="skill-tag modern-skill-tag">
                      <span className="corner-bottom"></span>
                      <span className="animated-bg"></span>
                      <span className="skill-text">{skill}</span>
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        );
      case 'resume':
        return (
          <div className="resume-content">
            <h2>My Resume</h2>
            <div className="resume-section">
              <h3>Work Experience</h3>
              <p>Frontend Developer - 3+ years of experience</p>
              <p>Creating modern web applications and interfaces</p>
            </div>
            <div className="resume-section">
              <h3>Education</h3>
              <p>Computer Science</p>
            </div>
            <button className="download-btn" onClick={handleDownloadResume}>
              Download PDF
            </button>
          </div>
        );
      case 'contacts':
        return (
          <div className="contacts-content">
            <h2>Contact Information</h2>
            <div className="contact-item">
              <span><img src={emailIcon} alt="Email" style={{width: '20px', height: '20px', marginRight: '8px', verticalAlign: 'middle'}} />Email:</span>
              <span>newgglutt@gmail.com</span>
            </div>
            <div className="contact-item">
              <span>📱 Phone:</span>
              <span>+380 98 014 88 07</span>
            </div>
            <div className="contact-item">
              <span><img src={linkedinIcon} alt="LinkedIn" style={{width: '20px', height: '20px', marginRight: '8px', verticalAlign: 'middle'}} />LinkedIn:</span>
              <span>https://www.linkedin.com/in/evgenii-lutiy-460797364/?locale=en_US&trk=opento_sprofile_topcard</span>
            </div>
            <div className="contact-item">
              <span><img src={githubIcon} alt="GitHub" style={{width: '20px', height: '20px', marginRight: '8px', verticalAlign: 'middle'}} />GitHub:</span>
              <span>https://github.com/GGLUTT</span>
            </div>
          </div>
        );
      default:
        return <div className="loading-content">Content loading...</div>;
    }
  };

  const handleContactClick = () => {
    const contactItem = desktopItems.find(item => item.id === 'contacts');
    if (contactItem) {
      openWindow(contactItem);
    }
  };

  // Функція для завантаження PDF
  const handleDownloadResume = () => {
    const link = document.createElement('a');
    link.href = resumePDF;
    link.download = 'Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div 
      className={`desktop ${isLoaded ? 'loaded' : ''}`}
      style={{
        background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(102, 126, 234, 0.1) 0%, transparent 50%)`
      }}
    >
      {/* Animated Background Elements */}
      <div className="bg-elements">
        <div className="floating-element element-1"></div>
        <div className="floating-element element-2"></div>
        <div className="floating-element element-3"></div>
      </div>

      {/* Profile Card */}
      <div className="profile-card-container" style={{
        position: 'fixed',
        top: '150px',
        right: '50px',
        zIndex: 1000
      }}>
        <ProfileCard
          avatarUrl={hellaPhoto}
          name="Hella"
          title="Frontend Developer"
          handle="GGLUTT"
          status="Available for work"
          contactText="Contact"
          onContactClick={handleContactClick}
          showUserInfo={true}
          enableTilt={true}
        />
      </div>

      {/* Desktop Icons */}
      {desktopItems.map((item, index) => (
        <div
          key={item.id}
          className={`desktop-item modern-item ${isLoaded ? 'item-loaded' : ''}`}
          style={{ 
            left: item.x, 
            top: item.y,
            animationDelay: `${index * 0.1}s`
          }}
        >
          {item.type === 'folder' ? (
            <Folder
              color={item.color}
              size={0.9}
              items={item.items}
              name={item.name}
              onClick={() => openWindow(item)}
              className="modern-folder"
            />
          ) : (
            <div 
              className="file-icon modern-file"
              onDoubleClick={() => openWindow(item)}
              style={{ background: item.color }}
            >
              <div className="icon">{item.icon}</div>
              <span className="item-name">{item.name}</span>
            </div>
          )}
        </div>
      ))}

      {/* Open Windows */}
      {openWindows.map(window => (
        <Window
          key={window.id}
          window={window}
          position={windowPositions[window.id]}
          onClose={() => closeWindow(window.id)}
          onMove={(newPosition) => setWindowPositions({
            ...windowPositions,
            [window.id]: newPosition
          })}
          className="modern-window"
        >
          {window.content}
        </Window>
      ))}

      {/* Dock */}
      <Dock className="modern-dock" />
    </div>
  );
};

export default Desktop;