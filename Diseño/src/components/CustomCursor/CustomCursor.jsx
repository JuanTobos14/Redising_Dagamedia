import React, { useEffect, useState, useRef } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import './CustomCursor.css';

export default function CustomCursor() {
  const { language } = useLanguage();
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  const [cursorText, setCursorText] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Position coordinates
  const mouseRef = useRef({ x: 0, y: 0 });
  const ringPosRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Hide default cursor on desktop
    document.body.classList.add('custom-cursor-active');
    
    const handleMouseMove = (e) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeaveWindow = () => setIsVisible(false);
    const handleMouseEnterWindow = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeaveWindow);
    document.addEventListener('mouseenter', handleMouseEnterWindow);

    // Loop for smooth ring interpolation (lerp)
    let animId;
    const updatePosition = () => {
      // Direct DOM update of dot for 60fps responsiveness
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseRef.current.x}px, ${mouseRef.current.y}px, 0)`;
      }

      // Smooth interpolation for ring
      const ease = 0.12; // Easing factor
      ringPosRef.current.x += (mouseRef.current.x - ringPosRef.current.x) * ease;
      ringPosRef.current.y += (mouseRef.current.y - ringPosRef.current.y) * ease;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPosRef.current.x}px, ${ringPosRef.current.y}px, 0)`;
      }

      animId = requestAnimationFrame(updatePosition);
    };
    animId = requestAnimationFrame(updatePosition);

    // Dynamic Hover Listeners (checking target attributes)
    const handleMouseOver = (e) => {
      const target = e.target.closest('[data-cursor], a, button, .video-poster-wrapper, .cube-viewport');
      if (target) {
        setIsHovered(true);
        
        // Custom interactive text based on target
        if (target.closest('.cube-viewport')) {
          setCursorText(language === 'es' ? 'GIRAR' : 'DRAG');
        } else if (target.closest('.video-poster-wrapper')) {
          setCursorText(language === 'es' ? 'VER' : 'PLAY');
        } else if (target.getAttribute('data-cursor')) {
          const customText = target.getAttribute('data-cursor');
          setCursorText(customText);
        } else {
          setCursorText(''); // Normal links/buttons just scale the ring without text
        }
      } else {
        setIsHovered(false);
        setCursorText('');
      }
    };

    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      document.body.classList.remove('custom-cursor-active');
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeaveWindow);
      document.removeEventListener('mouseenter', handleMouseEnterWindow);
      window.removeEventListener('mouseover', handleMouseOver);
      cancelAnimationFrame(animId);
    };
  }, [language, isVisible]);

  if (!isVisible) return null;

  return (
    <div className={`custom-cursor-wrapper ${isHovered ? 'hovered' : ''} ${isClicking ? 'clicking' : ''} ${cursorText ? 'has-text' : ''}`}>
      {/* Small center dot */}
      <div className="cursor-dot" ref={dotRef} />
      {/* Outer ring */}
      <div className="cursor-ring" ref={ringRef}>
        {cursorText && (
          <span className="cursor-text">
            {cursorText}
          </span>
        )}
      </div>
    </div>
  );
}
