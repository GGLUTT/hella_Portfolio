import React, { useState, useEffect } from 'react';
import './App.css';
import Desktop from './components/Desktop';
import Experience from './components/Experience';
import ProfileCard from './components/ProfileCard';
// import Aurora from './components/Aurora';
import Dither from './custom-bcg';
import Loader from './components/Loader';
import AudioPlayer from './components/AudioPlayer';
import ThemeToggle from './components/ThemeToggle';
import hellaPhoto from './img/user_photo/hella.jpg';
import Footer from './components/Footer';

function App() {
  const [loading, setLoading] = useState(true);
  const [loaderFading, setLoaderFading] = useState(false);
  const [contentVisible, setContentVisible] = useState(false);

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      // Start loader fade animation
      setLoaderFading(true);
      
      // 1 second after loader starts fading
      setTimeout(() => {
        // Completely hide loader
        setLoading(false);
        // Start content appearance animation
        setContentVisible(true);
      }, 1000);
    }, 3000); // Show loader for 3 seconds

    return () => clearTimeout(timer);
  }, []);

  const handleContactClick = () => {
    // Contact logic
    window.open('mailto:your-email@example.com', '_blank');
  };

  return (
    <div className="App">
      {/* Global background layer for entire page */}
      <div className="global-background-layer">
        <Dither 
          waveSpeed={0.05}
          waveFrequency={3}
          waveAmplitude={0.3}
          waveColor={[0.5, 0.5, 0.5]}
          colorNum={4}
          pixelSize={2}
          enableMouseInteraction={true}
          mouseRadius={1}
        />
      </div>
      
      <ThemeToggle />
      <AudioPlayer />
      
      {loading && (
        <div className={`loader-wrapper ${loaderFading ? 'fade-out' : ''}`}>
          <Loader />
        </div>
      )}
      
      <div className={`main-content ${contentVisible ? 'fade-in' : ''}`}>
        <div className="content-overlay">
          <Desktop />
        </div>
      </div>
      
      <div className={`experience-wrapper ${contentVisible ? 'fade-in' : ''}`}>
        <Experience />
      </div>
      <Footer />
    </div>
  );
}

export default App;