import React, { useState, useRef } from 'react';
import './Window.css';

const Window = ({ window, position, onClose, onMove, children }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isFullscreen, setIsFullscreen] = useState(false);
  const windowRef = useRef(null);
  const originalPosition = useRef(position);

  const handleMouseDown = (e) => {
    if (e.target.closest('.window-controls')) return;
    
    setIsDragging(true);
    const rect = windowRef.current.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  const handleMouseMove = (e) => {
    if (!isDragging || isFullscreen) return;
    
    const newPosition = {
      x: e.clientX - dragOffset.x,
      y: e.clientY - dragOffset.y
    };
    onMove(newPosition);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      // Зберігаємо поточну позицію перед переходом у повноекранний режим
      originalPosition.current = position;
      // Встановлюємо вікно на весь екран
      onMove({ x: 0, y: 0 });
    } else {
      // Повертаємо вікно до оригінальної позиції
      onMove(originalPosition.current);
    }
    setIsFullscreen(!isFullscreen);
  };

  React.useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div
      ref={windowRef}
      className={`window ${isFullscreen ? 'fullscreen' : ''}`}
      style={{
        left: position.x,
        top: position.y,
        zIndex: isDragging ? 1000 : (isFullscreen ? 2000 : 100),
        width: isFullscreen ? '100vw' : 'auto',
        height: isFullscreen ? '100vh' : 'auto',
        maxWidth: isFullscreen ? '100vw' : '80vw',
        maxHeight: isFullscreen ? '100vh' : '80vh'
      }}
      onMouseDown={handleMouseDown}
    >
      <div className="window-header">
        <div className="window-controls">
          <button className="control-btn close" onClick={onClose}>×</button>
          <button className="control-btn minimize">−</button>
          <button 
            className="control-btn maximize" 
            onClick={toggleFullscreen}
          >
            {isFullscreen ? '❐' : '□'}
          </button>
        </div>
        <div className="window-title">{window.title}</div>
      </div>
      <div className="window-content">
        {children}
      </div>
    </div>
  );
};

export default Window;