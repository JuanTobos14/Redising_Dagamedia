import { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';

import Home from './components/Home/Home';
import AboutUs from './components/AboutUs/AboutUs';
import WhatDoWeDo from './components/WhatDoWeDo/WhatDoWeDo';
import OurFilms from './components/Ourfilms/OurFilms';
import { ContactLayout } from './components/Contact';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import ParticlesBackground from './components/ParticlesBackground/ParticlesBackground';
import LiveReactions from './components/LiveReactions/LiveReactions';
import CustomCursor from './components/CustomCursor/CustomCursor';
import FloatingAssets from './components/FloatingAssets/FloatingAssets';

import styles from './App.module.css';

const SECTION_IDS = ['inicio', 'servicios', 'peliculas', 'nosotros', 'contacto'];

export default function App() {
  const [socket, setSocket] = useState(null);
  const [connected, setConnected] = useState(false);
  const [activeUsers, setActiveUsers] = useState([]);
  const [currentSection, setCurrentSection] = useState('inicio');
  const [animatingLink, setAnimatingLink] = useState(null);
  const [contactFormType, setContactFormType] = useState('standard');
  const [scrollDirection, setScrollDirection] = useState('down');

  const currentSectionRef = useRef('inicio');
  const animationTimeoutRef = useRef(null);
  const lastScrollYRef = useRef(0);

  const [sectionCounts, setSectionCounts] = useState({
    inicio: 0,
    nosotros: 0,
    servicios: 0,
    peliculas: 0,
    contacto: 0,
  });

  const triggerNavAnimation = (sectionId) => {
    if (animationTimeoutRef.current) {
      clearTimeout(animationTimeoutRef.current);
    }

    setAnimatingLink(sectionId);

    animationTimeoutRef.current = setTimeout(() => {
      setAnimatingLink(null);
    }, 650);
  };

  const updateActiveSection = (sectionId, shouldAnimate = false) => {
    if (!sectionId || currentSectionRef.current === sectionId) return;

    currentSectionRef.current = sectionId;
    setCurrentSection(sectionId);

    if (shouldAnimate) {
      triggerNavAnimation(sectionId);
    }
  };

  useEffect(() => {
    const isLocal =
      window.location.hostname === 'localhost' ||
      window.location.hostname === '127.0.0.1';

    const wsUrl =
      import.meta.env.VITE_WS_URL ||
      (isLocal
        ? 'http://localhost:4000'
        : window.location.origin.replace(/^http/, 'ws'));

    console.log(`Connecting to WebSocket server: ${wsUrl}`);

    const newSocket = io(wsUrl, {
      transports: ['websocket', 'polling'],
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
        if (!prev.includes(userId)) {
          return [...prev, userId];
        }

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

  /*
    Este observer solo revela/anima secciones visualmente.
    No cambia el botón activo de la navbar.
  */
  useEffect(() => {
    const sections = document.querySelectorAll('.reveal-on-scroll');

    const observerOptions = {
      root: null,
      rootMargin: '-5% 0px -5% 0px',
      threshold: 0.02,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          entry.target.classList.add('animating');
        } else {
          entry.target.classList.remove('animating');
        }
      });
    }, observerOptions);

    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  /*
    Controla qué botón de la navbar está activo.
    La animación automática está desactivada: solo cambia el resaltado.
  */
  useEffect(() => {
    let ticking = false;

    const getActiveSectionFromViewport = () => {
      const scrollTop = window.scrollY;

      if (scrollTop <= 120) {
        return 'inicio';
      }

      const header = document.querySelector('header');
      const headerHeight = header ? header.offsetHeight : 0;

      const referenceLine = Math.min(
        window.innerHeight * 0.38,
        headerHeight + 220
      );

      let activeSection = 'inicio';
      let closestDistance = Number.POSITIVE_INFINITY;

      SECTION_IDS.forEach((sectionId) => {
        const section = document.getElementById(sectionId);

        if (!section) return;

        const rect = section.getBoundingClientRect();

        const sectionContainsReference =
          rect.top <= referenceLine && rect.bottom >= referenceLine;

        if (sectionContainsReference) {
          activeSection = sectionId;
          closestDistance = 0;
          return;
        }

        const distance = Math.abs(rect.top - referenceLine);

        if (rect.top <= referenceLine && distance < closestDistance) {
          activeSection = sectionId;
          closestDistance = distance;
        }
      });

      return activeSection;
    };

    const updateSectionOnScroll = () => {
      const currentScrollY = window.scrollY;
      const direction = currentScrollY > lastScrollYRef.current ? 'down' : 'up';

      if (Math.abs(currentScrollY - lastScrollYRef.current) > 4) {
        setScrollDirection(direction);
        lastScrollYRef.current = currentScrollY;
      }

      const activeSection = getActiveSectionFromViewport();

      updateActiveSection(activeSection, false);

      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateSectionOnScroll);
        ticking = true;
      }
    };

    updateSectionOnScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', updateSectionOnScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateSectionOnScroll);

      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (socket && connected && currentSection) {
      socket.emit('enter_section', currentSection);
    }
  }, [socket, connected, currentSection]);

  const handleNavClick = (event, sectionId) => {
    event.preventDefault();

    updateActiveSection(sectionId, true);

    if (sectionId === 'inicio') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });

      return;
    }

    const target = document.getElementById(sectionId);

    if (target) {
      target.classList.remove('animating');

      void target.offsetWidth;

      target.classList.add('visible');
      target.classList.add('animating');

      const header = document.querySelector('header');
      const headerHeight = header ? header.offsetHeight : 0;
      const targetTop = target.getBoundingClientRect().top + window.scrollY;

      window.scrollTo({
        top: targetTop - headerHeight - 24,
        behavior: 'smooth',
      });
    }
  };

  const usersToShow = activeUsers.filter((id) => id !== socket?.id);

  return (
    <div className={styles.appWrapper}>
      <CustomCursor />

      <FloatingAssets />

      <ParticlesBackground activeUsers={usersToShow} />

      <Header
        currentSection={currentSection}
        animatingLink={animatingLink}
        scrollDirection={scrollDirection}
        onNavClick={handleNavClick}
      />

      <section className={styles.pageSection}>
        <Home />
      </section>

      <section className={styles.pageSection}>
        <WhatDoWeDo />
      </section>

      <section className={styles.pageSection}>
        <OurFilms setContactFormType={setContactFormType} />
      </section>

      <section className={styles.pageSection}>
        <AboutUs />
      </section>

      <section className={`${styles.pageSection} reveal-on-scroll`} id="contacto">
        <div className={styles.contactSectionWrapper}>
          <ContactLayout
            activeForm={contactFormType}
            onChangeActiveForm={setContactFormType}
          />
        </div>
      </section>

      <LiveReactions
        socket={socket}
        currentSection={currentSection}
        sectionCounts={sectionCounts}
        activeUsersCount={activeUsers.length}
      />

      <Footer />
    </div>
  );
}