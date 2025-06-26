import React, { useState, useEffect } from 'react';
import './ThemeToggle.css';

const ThemeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Перевіряємо збережену тему або використовуємо системну
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme === 'dark';
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    // Застосовуємо тему до документа
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
    
    // Зберігаємо вибір користувача
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    
    // Додаємо клас для CSS змінних
    if (isDarkMode) {
      document.body.classList.add('dark-theme');
      document.body.classList.remove('light-theme');
    } else {
      document.body.classList.add('light-theme');
      document.body.classList.remove('dark-theme');
    }
  }, [isDarkMode]);

  const handleToggle = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className="theme-toggle-container">
      <label htmlFor="theme-switch" className="switch" title={isDarkMode ? 'Перемкнути на світлу тему' : 'Перемкнути на темну тему'}>
        <input 
          id="theme-switch" 
          type="checkbox" 
          checked={isDarkMode}
          onChange={handleToggle}
        />
        <span className="slider"></span>
        <span className="decoration"></span>
      </label>
    </div>
  );
};

export default ThemeToggle;