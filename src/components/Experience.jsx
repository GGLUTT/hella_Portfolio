import React, { useEffect, useRef, useState } from 'react';
import './Experience.css';

const Experience = () => {
  const [visibleItems, setVisibleItems] = useState(new Set());
  const [roadProgress, setRoadProgress] = useState(0);
  const timelineRef = useRef(null);
  const observerRef = useRef(null);

  const experiences = [
    {
      id: 1,
      position: "Frontend Developer",
      company: "WineStore",
      period: "Jun 2025 - Present",
      description: "Developed the site according to the layout, adding functionality and optimizing the mobile version.",
      achievements: [
        "Developed responsive website layout",
        "Added interactive functionality",
        "Optimized mobile version",
        "Improved user experience"
      ],
      technologies: ["JavaScript", "React", "TypeScript", "HTML", "CSS", "BEM", "SCSS"],
      color: "#667eea",
      icon: "🍷"
    },
    {
      id: 2,
      position: "Frontend Developer",
      company: "Player Menu for Game Server",
      period: "Apr 2025 - Present",
      description: "Designed and developed the player menu, added mini-games and functionality.",
      achievements: [
        "Designed interactive player menu",
        "Developed mini-games",
        "Added custom functionality",
        "Enhanced gaming experience"
      ],
      technologies: ["JavaScript", "HTML5", "CSS", "BEM"],
      color: "#764ba2",
      icon: "🎮"
    },
    {
      id: 3,
      position: "Full Stack Developer",
      company: "Telegram Bot (AUTO_BOT) for University",
      period: "2024 - 2025",
      description: "Worked with AutoRia API, added AI-generated photo functionality.",
      achievements: [
        "Integrated AutoRia API",
        "Implemented AI photo generation",
        "Developed Telegram bot functionality",
        "Enhanced automation features"
      ],
      technologies: ["C#", "API"],
      color: "#f093fb",
      icon: "🤖"
    },
    {
      id: 4,
      position: "UI/UX Designer",
      company: "3 Websites (Sneakers Studio, LuterStore, Pro Studio)",
      period: "2023 - 2024",
      description: "Designed websites and assets using Photoshop and Figma.",
      achievements: [
        "Designed 3 complete websites",
        "Created custom assets",
        "Developed design systems",
        "Enhanced visual identity"
      ],
      technologies: ["Figma", "Photoshop"],
      color: "#4facfe",
      icon: "🎨"
    },
    {
      id: 5,
      position: "Frontend Developer",
      company: "Bank System for RageMP Server",
      period: "2023",
      description: "Developed a full website for the bank system with diagrams and custom notifications.",
      achievements: [
        "Built complete bank system interface",
        "Implemented interactive diagrams",
        "Created custom notifications",
        "Developed responsive design"
      ],
      technologies: ["JavaScript", "HTML5", "CSS", "BEM"],
      color: "#00d4aa",
      icon: "🏦"
    }
  ];

  const stats = [
    { number: "2+", label: "Years Experience" },
    { number: "8+", label: "Projects Completed" },
    { number: "10+", label: "Technologies" },
    { number: "100%", label: "Client Satisfaction" }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const itemId = parseInt(entry.target.dataset.id);
            setVisibleItems(prev => new Set([...prev, itemId]));
            
            // Update road progress
            const itemIndex = experiences.findIndex(exp => exp.id === itemId);
            const progress = ((itemIndex + 1) / experiences.length) * 100;
            setRoadProgress(progress);
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: '-50px 0px'
      }
    );

    observerRef.current = observer;

    const items = document.querySelectorAll('.experience-item');
    items.forEach(item => observer.observe(item));

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [experiences.length]);

  useEffect(() => {
    // Create floating background elements
    const createFloatingElements = () => {
      const container = document.querySelector('.background-elements');
      if (!container) return;

      for (let i = 0; i < 20; i++) {
        const element = document.createElement('div');
        element.className = 'floating-element';
        element.style.setProperty('--random-size', `${Math.random() * 8 + 4}px`);
        element.style.setProperty('--random-x', `${Math.random() * 100}%`);
        element.style.setProperty('--random-y', `${Math.random() * 100}%`);
        element.style.setProperty('--random-duration', `${Math.random() * 10 + 8}s`);
        element.style.setProperty('--random-delay', `${Math.random() * 5}s`);
        container.appendChild(element);
      }
    };

    // Create interactive stars
    const createStars = () => {
      const container = document.querySelector('.interactive-stars');
      if (!container) return;

      for (let i = 0; i < 50; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.setProperty('--star-x', `${Math.random() * 100}%`);
        star.style.setProperty('--star-y', `${Math.random() * 100}%`);
        star.style.setProperty('--star-delay', `${Math.random() * 3}s`);
        container.appendChild(star);
      }
    };

    createFloatingElements();
    createStars();
  }, []);

  return (
    <section className="experience-section">
      <div className="background-elements"></div>
      <div className="interactive-stars"></div>
      
      <div className="experience-container">
        <h2 className="experience-title">
          <span className="title-word">My</span>
          <span className="title-word">Professional</span>
          <span className="title-word">Journey</span>
        </h2>

        <div className="experience-timeline" ref={timelineRef}>
          <div className="timeline-road">
            <div className="road-glow"></div>
            <div 
              className="road-progress" 
              style={{ height: `${roadProgress}%` }}
            ></div>
            <div className="road-particles"></div>
          </div>

          {experiences.map((experience, index) => (
            <div
              key={experience.id}
              className={`experience-item ${
                visibleItems.has(experience.id) ? 'visible' : ''
              }`}
              data-id={experience.id}
              style={{
                '--delay': `${index * 0.2}s`,
                '--color': experience.color
              }}
            >
              <div className="experience-marker">
                <div className="marker-glow"></div>
                <div className="marker-ring"></div>
                <div className="marker-pulse"></div>
                <span className="marker-icon">{experience.icon}</span>
              </div>

              <div className="experience-content">
                <div className="content-glow"></div>
                <div className="content-border"></div>
                
                <div className="experience-header">
                  <h3 className="experience-position">{experience.position}</h3>
                  <span className="experience-period">{experience.period}</span>
                </div>
                
                <h4 className="experience-company">{experience.company}</h4>
                
                <p className="experience-description">{experience.description}</p>
                
                <div className="experience-achievements">
                  <h5 className="achievements-title">Key Achievements</h5>
                  <ul className="achievements-list">
                    {experience.achievements.map((achievement, achIndex) => (
                      <li 
                        key={achIndex} 
                        className="achievement-item"
                        style={{ '--achievement-delay': `${achIndex * 0.1}s` }}
                      >
                        <span className="achievement-bullet">✨</span>
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="experience-technologies">
                  {experience.technologies.map((tech, techIndex) => (
                    <span 
                      key={techIndex} 
                      className="tech-tag"
                      style={{ '--tech-delay': `${techIndex * 0.1}s` }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="item-particles">
                  {[...Array(8)].map((_, i) => (
                    <div key={i} className={`particle particle-${i + 1}`}></div>
                  ))}
                </div>

                <div className="magic-effects">
                  <div className="magic-circle magic-circle-1"></div>
                  <div className="magic-circle magic-circle-2"></div>
                  <div className="magic-sparkle"></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="experience-stats">
          {stats.map((stat, index) => (
            <div key={index} className="stat-item">
              <div className="stat-number">{stat.number}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;