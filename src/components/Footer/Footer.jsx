import { useTranslation } from 'react-i18next';
import './Footer.css';

function Footer() {
  // Hook para acceder a las traducciones
  const { t } = useTranslation();

  return (
    <footer className="main-footer">
      {/* Texto de copyright traducido */}
      <p>{t('footer.copyright')}</p>
      {/* Links de redes sociales traducidos */}
      <div className="social-links">
        <span>{t('footer.social.facebook')}</span> | <span>{t('footer.social.twitter')}</span> | <span>{t('footer.social.instagram')}</span> | <span>{t('footer.social.youtube')}</span>
      </div>
    </footer>
  );
}
export default Footer;