import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './Header.css';

function Header() {
  const { t, i18n } = useTranslation();

  const handleLanguageChange = (lang) => {
    i18n.changeLanguage(lang);
  };

  return (
    <header className="main-header">
      <div className="logo">{t('header.logo')}</div>
      <nav>
        <Link to="/">{t('header.nav.home')}</Link>
        <Link to="/our-films">{t('header.nav.ourFilms')}</Link>
        <Link to="/what-we-do">{t('header.nav.whatWeDo')}</Link>
        <Link to="/about-us">{t('header.nav.aboutUs')}</Link>
        <Link to="/contact">{t('header.nav.contact')}</Link>
      </nav>
      <div className="language-switcher">
        <button 
          onClick={() => handleLanguageChange('es')}
          className={i18n.language === 'es' ? 'active' : ''}
        >
          ES
        </button>
        <button 
          onClick={() => handleLanguageChange('en')}
          className={i18n.language === 'en' ? 'active' : ''}
        >
          EN
        </button>
      </div>
    </header>
  );
}
export default Header;