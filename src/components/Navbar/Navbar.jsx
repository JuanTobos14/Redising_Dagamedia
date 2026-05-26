import { useTranslation } from 'react-i18next';
import styles from "./Navbar.module.css";
import logo from "../../assets/Logo-DAGAMEDIA-Encabezado.png";

function Navbar() {
  // Hook para acceder a las traducciones y cambiar idioma
  const { t, i18n } = useTranslation();

  // Función para cambiar entre idiomas
  const handleLanguageChange = (lang) => {
    i18n.changeLanguage(lang);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarLogo}>
        <img src={logo} alt="Dagamedia" />
      </div>

      <div className={styles.navbarLinks}>
        {/* Navegación con traducciones */}
        <a className={styles.liquidNavButton} href="#home">
          <span>{t('header.nav.home')}</span>
        </a>

        <a className={styles.liquidNavButton} href="#what-do-we-do">
          <span>{t('header.nav.whatWeDo')}</span>
        </a>

        <a className={styles.liquidNavButton} href="#our-films">
          <span>{t('header.nav.ourFilms')}</span>
        </a>

        <a className={styles.liquidNavButton} href="#about-us">
          <span>{t('header.nav.aboutUs')}</span>
        </a>

        <a className={styles.liquidNavButton} href="#contact">
          <span>{t('header.nav.contact')}</span>
        </a>
      </div>

      {/* Selector de idioma actualizado con funcionalidad */}
      <div className={styles.language}>
        <button 
          onClick={() => handleLanguageChange('es')}
          className={i18n.language === 'es' ? styles.active : ''}
        >
          ES
        </button>
        <span>◎</span>
        <button 
          onClick={() => handleLanguageChange('en')}
          className={i18n.language === 'en' ? styles.active : ''}
        >
          EN
        </button>
      </div>
    </nav>
  );
}

export default Navbar;