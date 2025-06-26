import React, { useState, useRef, useEffect } from 'react';
import './AudioPlayer.css';
import sound from '../sound/sound.mp3';
import sound1 from '../sound/sound1.mp3';
import sound2 from '../sound/sound2.mp3';
import sound3 from '../sound/sound3.mp3';
import sound4 from '../sound/sound4.mp3';

const AudioPlayer = () => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [isMuted, setIsMuted] = useState(false);
  const [previousVolume, setPreviousVolume] = useState(0.5);
  const [currentSoundFile, setCurrentSoundFile] = useState('');
  const [userInteracted, setUserInteracted] = useState(false);
  const [autoplayBlocked, setAutoplayBlocked] = useState(false);

  // Array of all audio files
  const soundFiles = [sound, sound1, sound2, sound3, sound4];

  // Function to select random audio file
  const getRandomSoundFile = () => {
    const randomIndex = Math.floor(Math.random() * soundFiles.length);
    return soundFiles[randomIndex];
  };

  // Handle first user interaction
  useEffect(() => {
    const handleFirstInteraction = () => {
      setUserInteracted(true);
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('keydown', handleFirstInteraction);
      document.removeEventListener('touchstart', handleFirstInteraction);
    };

    document.addEventListener('click', handleFirstInteraction);
    document.addEventListener('keydown', handleFirstInteraction);
    document.addEventListener('touchstart', handleFirstInteraction);

    return () => {
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('keydown', handleFirstInteraction);
      document.removeEventListener('touchstart', handleFirstInteraction);
    };
  }, []);

  // Initialize random audio file on component load
  useEffect(() => {
    const randomSoundFile = getRandomSoundFile();
    setCurrentSoundFile(randomSoundFile);
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = volume;
      audio.loop = true;
      // Додаємо preload для кращої продуктивності
      audio.preload = 'auto';
    }
  }, [volume]);

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (audio) {
      try {
        if (isPlaying) {
          audio.pause();
          setIsPlaying(false);
        } else {
          await audio.play();
          setIsPlaying(true);
          setAutoplayBlocked(false);
        }
      } catch (error) {
        console.log('Playback error:', error);
        setAutoplayBlocked(true);
        setIsPlaying(false);
      }
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
    if (newVolume > 0 && isMuted) {
      setIsMuted(false);
    }
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (audio) {
      if (isMuted) {
        setVolume(previousVolume);
        audio.volume = previousVolume;
        setIsMuted(false);
      } else {
        setPreviousVolume(volume);
        setVolume(0);
        audio.volume = 0;
        setIsMuted(true);
      }
    }
  };

  // Auto-start music after user interaction
  useEffect(() => {
    const audio = audioRef.current;
    if (audio && currentSoundFile && userInteracted && !autoplayBlocked) {
      const playAudio = async () => {
        try {
          audio.load();
          await audio.play();
          setIsPlaying(true);
          setAutoplayBlocked(false);
        } catch (error) {
          console.log('Autoplay blocked by browser');
          setAutoplayBlocked(true);
          setIsPlaying(false);
        }
      };
      playAudio();
    }
  }, [currentSoundFile, userInteracted]);

  // SVG icons
  const PlayIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M8 5v14l11-7z"/>
    </svg>
  );

  const PauseIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
    </svg>
  );

  const VolumeHighIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
    </svg>
  );

  const VolumeMediumIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/>
    </svg>
  );

  const VolumeLowIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M3 9v6h4l5 5V4L7 9H3z"/>
    </svg>
  );

  const VolumeMutedIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 = 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
    </svg>
  );

  const getVolumeIcon = () => {
    if (isMuted) return <VolumeMutedIcon />;
    if (volume > 0.6) return <VolumeHighIcon />;
    if (volume > 0.3) return <VolumeMediumIcon />;
    return <VolumeLowIcon />;
  };

  return (
    <div className="audio-player">
      <audio 
        ref={audioRef} 
        src={currentSoundFile}
        preload="auto"
      />
      
      {autoplayBlocked && (
        <div className="autoplay-notice">
          <small>Click to play music</small>
        </div>
      )}
      
      <div className="audio-controls">
        <button 
          className={`play-button ${isPlaying ? 'playing' : ''} ${autoplayBlocked ? 'blocked' : ''}`}
          onClick={togglePlay}
          title={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? <PauseIcon /> : <PlayIcon />}
        </button>
        
        <div className="volume-control">
          <button 
            className={`mute-button ${isMuted ? 'muted' : ''}`}
            onClick={toggleMute}
            title={isMuted ? 'Unmute' : 'Mute'}
          >
            {getVolumeIcon()}
          </button>
          
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
            className="volume-slider"
            title="Volume"
          />
          
          <span className="volume-display">
            {Math.round(volume * 100)}%
          </span>
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;