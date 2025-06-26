import React, { useState, useEffect } from 'react';
import '../custom-scrollbar.css';

const CustomScrollbar = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      
      setScrollProgress(scrollPercent);
      setIsVisible(scrollTop > 100); // Показуємо скрол після 100px прокрутки
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollbarClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickPosition = (e.clientX - rect.left) / rect.width;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const targetScroll = clickPosition * docHeight;
    
    window.scrollTo({
      top: targetScroll,
      behavior: 'smooth'
    });
  };

  return (
    <>
      {/* Горизонтальний скрол індикатор */}
      <div 
        className={`custom-horizontal-scroll ${isVisible ? 'visible' : ''}`}
        style={{ '--scroll-progress': `${scrollProgress}%` }}
        onClick={handleScrollbarClick}
      />
      
      {/* Вертикальний скрол індикатор */}
      <div 
        className={`custom-vertical-scroll ${isVisible ? 'visible' : ''}`}
        style={{ '--scroll-progress': `${scrollProgress}%` }}
      />
    </>
  );
};

export default CustomScrollbar;