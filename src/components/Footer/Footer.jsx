import { useLanguage } from '../../context/LanguageContext';
import headerLogo from '../../assets/Logo-DAGAMEDIA-Encabezado.png';
import {
  FOOTER_COPYRIGHT,
  FOOTER_PHONE_NUMBERS,
  SOCIAL_LINKS,
} from '../../data/footerData';
import styles from './Footer.module.css';

function SocialIcon({ socialLink }) {
  return (
    <a
      href={socialLink.href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${styles['social-icon']} ${styles[socialLink.colorClass]}`}
      aria-label={socialLink.label}
      title={socialLink.label}
    >
      <svg viewBox={socialLink.viewBox} aria-hidden="true">
        <path d={socialLink.path} />
      </svg>
    </a>
  );
}

function SocialLinks() {
  return (
    <nav className={styles['social-links']} aria-label="Redes sociales">
      {SOCIAL_LINKS.map((socialLink) => (
        <SocialIcon key={socialLink.id} socialLink={socialLink} />
      ))}
    </nav>
  );
}

function PhoneInfo() {
  const { t } = useLanguage();

  return (
    <div className={styles['phone-info']}>
      <span className={`${styles['phone-label']} text-small`}>
        {t('footer_phone_label')}
      </span>

      <span className={`${styles['phone-numbers']} text-small`}>
        {FOOTER_PHONE_NUMBERS}
      </span>
    </div>
  );
}

function FooterLeft() {
  return (
    <div className={styles['footer-left']}>
      <SocialLinks />
      <PhoneInfo />
    </div>
  );
}

function FooterCenter() {
  return (
    <div className={`${styles['footer-center']} text-small text-gray`}>
      {FOOTER_COPYRIGHT}
    </div>
  );
}

function FooterRight() {
  const { t } = useLanguage();

  return (
    <div className={styles['footer-right']}>
      <div className={styles['footer-logo']}>
        <img
          src={headerLogo}
          alt="DAGAMEDIA"
          className={styles['footer-logo-img']}
          loading="lazy"
        />
      </div>

      <div className={`${styles['footer-address']} text-small`}>
        {t('footer_address')}
      </div>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className={styles['site-footer']}>
      <FooterLeft />
      <FooterCenter />
      <FooterRight />
    </footer>
  );
}
