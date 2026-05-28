import { useEffect, useState } from 'react';
import headerLogo from '../../assets/Logo-DAGAMEDIA-Encabezado.png';
import { useLanguage } from '../../context/LanguageContext';
import styles from './Header.module.css';

const NAV_ITEMS = [
  {
    labelKey: 'nav_inicio',
    target: 'inicio',
  },
  {
    labelKey: 'nav_servicios',
    target: 'servicios',
  },
  {
    labelKey: 'nav_peliculas',
    target: 'peliculas',
  },
  {
    labelKey: 'nav_nosotros',
    target: 'nosotros',
  },
  {
    labelKey: 'nav_contacto',
    target: 'contacto',
  },
];

function NavLink({ label, target, active, animating, onClick }) {
  return (
    <a
      href={`#${target}`}
      className={`${styles['nav-link-item']} ${active ? styles.active : ''} ${
        animating ? styles.animating : ''
      }`}
      onClick={(event) => onClick(event, target)}
    >
      {label.split('').map((char, index) => (
        <span
          key={`${target}-${char}-${index}`}
          className={styles['nav-char']}
          style={{ animationDelay: `${index * 0.03}s` }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </a>
  );
}

function LanguageSwitch() {
  const { language, toggleLanguage } = useLanguage();

  const nextLanguage = language === 'es' ? 'en' : 'es';
  const title = language === 'es' ? 'Cambiar a Inglés' : 'Switch to Spanish';

  return (
    <button
      type="button"
      className={`${styles['navbar-lang-switch']} ${styles[`lang-${language}`]}`}
      onClick={() => toggleLanguage(nextLanguage)}
      title={title}
      aria-label={title}
    >
      <span
        className={`${styles['switch-label']} ${styles['label-es']} ${
          language === 'es' ? styles.active : ''
        }`}
      >
        ES
      </span>

      <span
        className={`${styles['switch-label']} ${styles['label-en']} ${
          language === 'en' ? styles.active : ''
        }`}
      >
        EN
      </span>

      <span className={styles['switch-thumb']} aria-hidden="true">
        <span className={styles['flag-coin']}>
          <span className={`${styles['flag-face']} ${styles['flag-face-es']}`}>
            <svg viewBox="0 0 100 100" width="100%" height="100%">
              <clipPath id="circle-clip-es-thumb">
                <circle cx="50" cy="50" r="50" />
              </clipPath>

              <g clipPath="url(#circle-clip-es-thumb)">
                <rect width="100" height="100" fill="#c60b1e" />
                <rect width="100" height="50" y="25" fill="#ffc400" />
              </g>
            </svg>
          </span>

          <span className={`${styles['flag-face']} ${styles['flag-face-en']}`}>
            <svg viewBox="0 0 100 100" width="100%" height="100%">
              <clipPath id="circle-clip-en-thumb">
                <circle cx="50" cy="50" r="50" />
              </clipPath>

              <g clipPath="url(#circle-clip-en-thumb)">
                <rect width="100" height="100" fill="#00247d" />
                <path
                  d="M0,0 L100,100 M100,0 L0,100"
                  stroke="#fff"
                  strokeWidth="12"
                />
                <path
                  d="M0,0 L100,100 M100,0 L0,100"
                  stroke="#cf142b"
                  strokeWidth="6"
                />
                <path
                  d="M50,0 L50,100 M0,50 L100,50"
                  stroke="#fff"
                  strokeWidth="20"
                />
                <path
                  d="M50,0 L50,100 M0,50 L100,50"
                  stroke="#cf142b"
                  strokeWidth="12"
                />
              </g>
            </svg>
          </span>
        </span>
      </span>
    </button>
  );
}

export default function Header({
  currentSection,
  animatingLink,
  scrollDirection = 'down',
  onNavClick,
}) {
  const { t } = useLanguage();
  const [isLogoHidden, setIsLogoHidden] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsLogoHidden(window.scrollY > 32);
    };

    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleMobileNavClick = (event, target) => {
    setMobileMenuOpen(false);
    onNavClick(event, target);
  };

  return (
    <header
      className={`${styles['site-header']} ${
        isLogoHidden ? styles['is-logo-hidden'] : ''
      } ${mobileMenuOpen ? styles['menu-open'] : ''}`}
    >
      <div className={styles['header-logo-row']}>
        <img
          src={headerLogo}
          alt="DAGAMEDIA"
          className={styles['header-logo-img']}
          onClick={(event) => handleMobileNavClick(event, 'inicio')}
        />
        <button
          className={`${styles['hamburger-btn']} ${
            mobileMenuOpen ? styles['hamburger-open'] : ''
          }`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={mobileMenuOpen}
          type="button"
        >
          <span className={styles['hamburger-line']} />
          <span className={styles['hamburger-line']} />
          <span className={styles['hamburger-line']} />
        </button>
      </div>

      <nav
        className={`${styles['header-nav-bar']} ${
          scrollDirection === 'up'
            ? styles['direction-up']
            : styles['direction-down']
        } ${mobileMenuOpen ? styles['nav-open'] : ''}`}
        aria-label="Navegación principal"
      >
        <div className={styles['nav-links-group']}>
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.target}
              label={t(item.labelKey)}
              target={item.target}
              active={currentSection === item.target}
              animating={animatingLink === item.target}
              onClick={handleMobileNavClick}
            />
          ))}
        </div>

        <div className={styles['navbar-controls-group']}>
          <LanguageSwitch />
        </div>
      </nav>
    </header>
  );
}