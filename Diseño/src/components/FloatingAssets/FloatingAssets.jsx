import React, { useEffect, useState } from 'react';
import './FloatingAssets.css';

export default function FloatingAssets() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Parallax offsets (scroll position * factor)
  const offset1 = scrollY * 0.12;
  const offset2 = (scrollY - 800) * 0.15;
  const offset3 = (scrollY - 1600) * 0.1;
  const offset4 = (scrollY - 2400) * 0.18;

  return (
    <div className="floating-assets-container">
      {/* Asset 1: Golden 3D Star (Home Section, Right) */}
      <div 
        className="floating-asset asset-star"
        style={{ transform: `translate3d(0, ${offset1}px, 0) rotate(${scrollY * 0.05}deg)` }}
      >
        <svg viewBox="0 0 100 100" width="80" height="80">
          <defs>
            <radialGradient id="starGrad" cx="30%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#fff" />
              <stop offset="50%" stopColor="#ffc502" />
              <stop offset="100%" stopColor="#ff6b00" />
            </radialGradient>
            <filter id="glowStar" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="8" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>
          <path 
            d="M50,5 C50,35 65,50 95,50 C65,50 50,65 50,95 C50,65 35,50 5,50 C35,50 50,35 5,5" 
            fill="url(#starGrad)" 
            filter="url(#glowStar)"
          />
        </svg>
      </div>

      {/* Asset 2: 3D Film Reel (Películas Section, Left) */}
      <div 
        className="floating-asset asset-reel"
        style={{ transform: `translate3d(0, ${offset2}px, 0) rotate(${scrollY * -0.04}deg)` }}
      >
        <svg viewBox="0 0 120 120" width="100" height="100">
          <defs>
            <linearGradient id="reelGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2c2c2c" />
              <stop offset="50%" stopColor="#1e1e1e" />
              <stop offset="100%" stopColor="#0a0a0a" />
            </linearGradient>
            <linearGradient id="orangeBorder" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ff9f43" />
              <stop offset="100%" stopColor="#ff6b00" />
            </linearGradient>
          </defs>
          {/* Main wheel */}
          <circle cx="60" cy="60" r="50" fill="url(#reelGrad)" stroke="url(#orangeBorder)" strokeWidth="4" />
          <circle cx="60" cy="60" r="42" fill="none" stroke="#222" strokeWidth="2" strokeDasharray="6 3" />
          
          {/* Inner cutout circles */}
          <circle cx="60" cy="32" r="10" fill="#121212" />
          <circle cx="60" cy="88" r="10" fill="#121212" />
          <circle cx="32" cy="60" r="10" fill="#121212" />
          <circle cx="88" cy="60" r="10" fill="#121212" />
          
          {/* Central spindle */}
          <circle cx="60" cy="60" r="12" fill="url(#orangeBorder)" />
          <rect x="57" y="52" width="6" height="16" rx="2" fill="#fff" transform="rotate(45 60 60)" />
        </svg>
      </div>

      {/* Asset 3: 3D Play Prism (Servicios Section, Right) */}
      <div 
        className="floating-asset asset-play"
        style={{ transform: `translate3d(0, ${offset3}px, 0) rotate(${scrollY * 0.03}deg)` }}
      >
        <svg viewBox="0 0 100 100" width="90" height="90">
          <defs>
            <linearGradient id="prismGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffb900" />
              <stop offset="50%" stopColor="#ff6b00" />
              <stop offset="100%" stopColor="#d35400" />
            </linearGradient>
            <filter id="shadowPlay">
              <feDropShadow dx="3" dy="10" stdDeviation="5" floodOpacity="0.4"/>
            </filter>
          </defs>
          {/* Tilted 3D triangle face */}
          <polygon points="25,15 85,50 25,85" fill="url(#prismGrad)" filter="url(#shadowPlay)" />
          {/* 3D bevel edge overlay */}
          <polygon points="25,15 85,50 85,55 25,90" fill="rgba(0,0,0,0.15)" />
          <polygon points="25,15 28,12 85,50 82,53" fill="rgba(255,255,255,0.25)" />
        </svg>
      </div>

      {/* Asset 4: 3D Diamond / Crystal (Nosotros Section, Left) */}
      <div 
        className="floating-asset asset-diamond"
        style={{ transform: `translate3d(0, ${offset4}px, 0) rotate(${scrollY * -0.06}deg)` }}
      >
        <svg viewBox="0 0 100 100" width="80" height="80">
          <defs>
            <linearGradient id="diamGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ff7675" />
              <stop offset="100%" stopColor="#d63031" />
            </linearGradient>
            <linearGradient id="diamFacet" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.4)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0)" />
            </linearGradient>
          </defs>
          {/* Top half */}
          <polygon points="50,10 85,45 15,45" fill="url(#diamGrad)" />
          <polygon points="50,10 85,45 50,45" fill="url(#diamFacet)" />
          
          {/* Bottom half */}
          <polygon points="15,45 85,45 50,90" fill="url(#diamGrad)" />
          <polygon points="50,45 85,45 50,90" fill="url(#diamFacet)" />
          
          {/* Bevel separation lines */}
          <path d="M50,10 L50,90 M15,45 L85,45" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
        </svg>
      </div>
    </div>
  );
}
