import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import Home from './pages/Home/Home';
import AboutUs from './components/AboutUs/AboutUs';
import WhatDoWeDo from './components/WhatDoWeDo/WhatDoWeDo';
import OurFilms from './components/Ourfilms/OurFilms';
import { ContactLayout } from './components/Contact';
import Footer from './components/Footer/Footer';
import ParticlesBackground from './components/ParticlesBackground/ParticlesBackground';
import LiveReactions from './components/LiveReactions/LiveReactions';
import headerLogo from './assets/Logo-DAGAMEDIA-Encabezado.png';
import { useLanguage } from './context/LanguageContext';
import CustomCursor from './components/CustomCursor/CustomCursor';
import FloatingAssets from './components/FloatingAssets/FloatingAssets';
import './App.css';

// Subcomponent to render characters individually for link-specific animations
const NavLink = ({ label, target, active, animating, onClick }) => {
  return (
    <a 
      href={`#${target}`} 
      className={`nav-link-item ${active ? 'active' : ''} ${animating ? 'animating' : ''} anim-${target}`}
      onClick={(e) => onClick(e, target)}
    >
      {label.split('').map((char, index) => (
        <span 
          key={index} 
          className="nav-char" 
          style={{ animationDelay: `${index * 0.03}s` }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </a>
  );
};

export default function App() {
  const { language, toggleLanguage, t } = useLanguage();
  const [socket, setSocket] = useState(null);
  const [connected, setConnected] = useState(false);
  const [activeUsers, setActiveUsers] = useState([]);
  const [currentSection, setCurrentSection] = useState('inicio');
  const [animatingLink, setAnimatingLink] = useState(null);
  const [contactFormType, setContactFormType] = useState('standard');
  const [sectionCounts, setSectionCounts] = useState({ 
    inicio: 0, 
    nosotros: 0,
    servicios: 0,
    peliculas: 0,
    contacto: 0 
  });

  // 1. Initialize socket connection
  useEffect(() => {
    const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    const wsUrl = import.meta.env.VITE_WS_URL || (isLocal ? 'http://localhost:4000' : window.location.origin.replace(/^http/, 'ws'));
    
    console.log(`Connecting to WebSocket server: ${wsUrl}`);
    const newSocket = io(wsUrl, {
      transports: ['websocket', 'polling']
    });

    setSocket(newSocket);

    newSocket.on('connect', () => {
      console.log('Connected to WebSocket server:', newSocket.id);
      setConnected(true);
    });

    newSocket.on('disconnect', () => {
      console.log('Disconnected from WebSocket server');
      setConnected(false);
      setActiveUsers([]);
    });

    newSocket.on('init_users', (usersList) => {
      setActiveUsers(usersList);
    });

    newSocket.on('user_connected', (userId) => {
      setActiveUsers((prev) => {
        if (!prev.includes(userId)) return [...prev, userId];
        return prev;
      });
    });

    newSocket.on('user_disconnected', (userId) => {
      setActiveUsers((prev) => prev.filter((id) => id !== userId));
    });

    newSocket.on('section_counts_update', (counts) => {
      setSectionCounts(counts);
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  // 2. Setup IntersectionObserver for scroll tracking and re-triggerable entrance animations (Squash and Stretch)
  useEffect(() => {
    const sections = document.querySelectorAll('.reveal-on-scroll');
    
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -20% 0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          
          const sectionId = entry.target.getAttribute('id');
          if (sectionId) {
            setCurrentSection(sectionId);
          }
        } else {
          // Re-trigger entrance animation when scrolling back
          entry.target.classList.remove('visible');
        }
      });
    }, observerOptions);

    sections.forEach((sec) => observer.observe(sec));

    return () => {
      sections.forEach((sec) => observer.unobserve(sec));
    };
  }, []);

  // 3. Emit current section to server when section or socket connection state changes
  useEffect(() => {
    if (socket && connected && currentSection) {
      socket.emit('enter_section', currentSection);
    }
  }, [socket, connected, currentSection]);

  // Smooth scroll handler triggering click-animations
  const handleNavClick = (e, sectionId) => {
    e.preventDefault();

    // Trigger letters click animation
    setAnimatingLink(sectionId);
    setTimeout(() => {
      setAnimatingLink(null);
    }, 650);

    const target = document.getElementById(sectionId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Filter out the current user's socket ID so they do not see their own particle floating alone
  const usersToShow = activeUsers.filter(id => id !== (socket ? socket.id : ''));

  return (
    <div className="app-wrapper">
      {/* Premium custom interactive mouse cursor */}
      <CustomCursor />

      {/* Floating 3D scroll parallax background assets */}
      <FloatingAssets />

      {/* Dynamic particles background representing OTHER connected users */}
      <ParticlesBackground activeUsers={usersToShow} />

      {/* Sticky Header Navbar aligned with the original header design */}
      <header className="main-navbar">
        <div className="navbar-logo-area">
          <img 
            src={headerLogo} 
            alt="DAGAMEDIA" 
            className="navbar-logo-img"
            onClick={(e) => handleNavClick(e, 'inicio')}
          />
          
          {/* Social media links next to logo as seen in original page */}
          <div className="navbar-socials">
            <a href="https://www.facebook.com/DAGAAmediaStudios" target="_blank" rel="noopener noreferrer" className="navbar-social-icon" aria-label="Facebook">
              <svg viewBox="0 0 24 24"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z"/></svg>
            </a>
            <a href="https://www.instagram.com/dagamedia_animation/" target="_blank" rel="noopener noreferrer" className="navbar-social-icon" aria-label="Instagram">
              <svg viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
            </a>
            <a href="https://www.youtube.com/@dagamedia5910" target="_blank" rel="noopener noreferrer" className="navbar-social-icon" aria-label="YouTube">
              <svg viewBox="0 0 24 24"><path d="M23.498 6.163a3.003 3.003 0 00-2.11-2.11C19.518 3.545 12 3.545 12 3.545s-7.518 0-9.388.508a3.003 3.003 0 00-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 002.11 2.11c1.87.508 9.388.508 9.388.508s7.518 0 9.388-.508a3.003 3.003 0 002.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
            </a>
          </div>
        </div>

        {/* Reordered navbar: Home, Our films, What do we do?, About us, Contact */}
        <nav className="navbar-links">
          <NavLink 
            label={t('nav_inicio')} 
            target="inicio" 
            active={currentSection === 'inicio'} 
            animating={animatingLink === 'inicio'}
            onClick={handleNavClick} 
          />
          <NavLink 
            label={t('nav_peliculas')} 
            target="peliculas" 
            active={currentSection === 'peliculas'} 
            animating={animatingLink === 'peliculas'}
            onClick={handleNavClick} 
          />
          <NavLink 
            label={t('nav_servicios')} 
            target="servicios" 
            active={currentSection === 'servicios'} 
            animating={animatingLink === 'servicios'}
            onClick={handleNavClick} 
          />
          <NavLink 
            label={t('nav_nosotros')} 
            target="nosotros" 
            active={currentSection === 'nosotros'} 
            animating={animatingLink === 'nosotros'}
            onClick={handleNavClick} 
          />
          <NavLink 
            label={t('nav_contacto')} 
            target="contacto" 
            active={currentSection === 'contacto'} 
            animating={animatingLink === 'contacto'}
            onClick={handleNavClick} 
          />
        </nav>

        {/* iOS-style Sliding Language Switch with 3D Coin Flip Flag */}
        <div className="navbar-controls-group">
          <div 
            className={`navbar-lang-switch lang-${language}`}
            onClick={() => toggleLanguage(language === 'es' ? 'en' : 'es')}
            title={language === 'es' ? "Cambiar a Inglés" : "Switch to Spanish"}
          >
            <span className={`switch-label label-es ${language === 'es' ? 'active' : ''}`}>ES</span>
            <span className={`switch-label label-en ${language === 'en' ? 'active' : ''}`}>EN</span>
            
            <div className="switch-thumb">
              <div className="flag-coin">
                {/* Spanish flag on the front side */}
                <div className="flag-face flag-face-es">
                  <svg viewBox="0 0 100 100" width="100%" height="100%">
                    <clipPath id="circle-clip-es-thumb">
                      <circle cx="50" cy="50" r="50"/>
                    </clipPath>
                    <g clipPath="url(#circle-clip-es-thumb)">
                      <rect width="100" height="100" fill="#c60b1e"/>
                      <rect width="100" height="50" y="25" fill="#ffc400"/>
                      <circle cx="35" cy="50" r="6" fill="#c60b1e" opacity="0.8"/>
                    </g>
                  </svg>
                </div>
                {/* UK flag on the back side */}
                <div className="flag-face flag-face-en">
                  <svg viewBox="0 0 100 100" width="100%" height="100%">
                    <clipPath id="circle-clip-en-thumb">
                      <circle cx="50" cy="50" r="50"/>
                    </clipPath>
                    <g clipPath="url(#circle-clip-en-thumb)">
                      <rect width="100" height="100" fill="#00247d"/>
                      <path d="M0,0 L100,100 M100,0 L0,100" stroke="#fff" strokeWidth="12"/>
                      <path d="M0,0 L100,100 M100,0 L0,100" stroke="#cf142b" strokeWidth="6"/>
                      <path d="M50,0 L50,100 M0,50 L100,50" stroke="#fff" strokeWidth="20"/>
                      <path d="M50,0 L50,100 M0,50 L100,50" stroke="#cf142b" strokeWidth="12"/>
                    </g>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="onepage-section">
        <Home />
      </section>

      {/* Películas Section */}
      <section className="onepage-section">
        <OurFilms setContactFormType={setContactFormType} />
      </section>

      {/* Servicios Section */}
      <section className="onepage-section">
        <WhatDoWeDo />
      </section>

      {/* Nosotros Section */}
      <section className="onepage-section">
        <AboutUs />
      </section>

      {/* Contact Section */}
      <section className="onepage-section reveal-on-scroll" id="contacto">
        <div style={{ zIndex: 10, position: 'relative', width: '100%' }}>
          <ContactLayout activeForm={contactFormType} onChangeActiveForm={setContactFormType} />
        </div>
      </section>

      {/* Floating Reactions overlay */}
      <LiveReactions 
        socket={socket} 
        currentSection={currentSection} 
        sectionCounts={sectionCounts}
        activeUsersCount={activeUsers.length}
      />

      {/* Global Footer component rendered at the bottom of the page */}
      <Footer />
    </div>
  );
}
