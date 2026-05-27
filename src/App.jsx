import { useState, useEffect } from 'react';
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
import './App.modules.css';

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

  // 2. Setup IntersectionObserver for scroll tracking and re-triggerable entrance animations
  useEffect(() => {
    const sections = document.querySelectorAll('.reveal-on-scroll');
    
    const observerOptions = {
      root: null,
      rootMargin: '-5% 0px -5% 0px',
      threshold: 0.02
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Permanently mark as visible once intersected to prevent black spaces
          entry.target.classList.add('visible');
          // Add animating class to run squash and stretch
          entry.target.classList.add('animating');
          
          const sectionId = entry.target.getAttribute('id');
          if (sectionId) {
            setCurrentSection(sectionId);
          }
        } else {
          // Remove animating on exit so it is ready to re-trigger when scrolled back in
          entry.target.classList.remove('animating');
        }
      });
    }, observerOptions);

    sections.forEach((sec) => observer.observe(sec));

    return () => {
      sections.forEach((sec) => observer.unobserve(sec));
    };
  }, []);

  // 3. Emit current section to server
  useEffect(() => {
    if (socket && connected && currentSection) {
      socket.emit('enter_section', currentSection);
    }
  }, [socket, connected, currentSection]);

  // Smooth scroll handler
  const handleNavClick = (e, sectionId) => {
    e.preventDefault();

    setAnimatingLink(sectionId);
    setTimeout(() => {
      setAnimatingLink(null);
    }, 650);

    const target = document.getElementById(sectionId);
    if (target) {
      // Re-trigger the squash and stretch animation on click
      target.classList.remove('animating');
      // Trigger reflow to restart CSS animation
      void target.offsetWidth;
      target.classList.add('visible');
      target.classList.add('animating');

      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const usersToShow = activeUsers.filter(id => id !== (socket ? socket.id : ''));

  return (
    <div className="app-wrapper">
      {/* Premium custom interactive mouse cursor */}
      <CustomCursor />

      {/* Floating 3D scroll parallax background assets */}
      <FloatingAssets />

      {/* Dynamic particles background */}
      <ParticlesBackground activeUsers={usersToShow} />

      {/* Header: Centered Logo on top */}
      <header className="main-header">
        <div className="header-logo-row">
          <img 
            src={headerLogo} 
            alt="DAGAMEDIA" 
            className="header-logo-img"
            onClick={(e) => handleNavClick(e, 'inicio')}
          />
        </div>

        {/* Navigation bar below logo */}
        <nav className="header-nav-bar">
          <div className="nav-links-group">
            <NavLink 
              label={t('nav_inicio')} 
              target="inicio" 
              active={currentSection === 'inicio'} 
              animating={animatingLink === 'inicio'}
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
              label={t('nav_peliculas')} 
              target="peliculas" 
              active={currentSection === 'peliculas'} 
              animating={animatingLink === 'peliculas'}
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
          </div>

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
        </nav>
      </header>

      {/* Hero Section */}
      <section className="page-section">
        <Home />
      </section>

      {/* Servicios Section */}
      <section className="page-section">
        <WhatDoWeDo />
      </section>

      {/* Películas Section */}
      <section className="page-section">
        <OurFilms setContactFormType={setContactFormType} />
      </section>

      {/* Nosotros Section */}
      <section className="page-section">
        <AboutUs />
      </section>

      {/* Contact Section */}
      <section className="page-section reveal-on-scroll" id="contacto">
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

      {/* Global Footer */}
      <Footer />
    </div>
  );
}
