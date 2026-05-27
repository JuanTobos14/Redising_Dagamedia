import { useLanguage } from '../../context/LanguageContext';
import './AboutUs.css';

function AboutUs() {
  const { t } = useLanguage();

  return (
    <section className="about-section reveal-on-scroll" id="nosotros">
      {/* Section label */}
      <h2 className="section-label">{t('about_title')}</h2>

      {/* Team Title — "The Dagamedia Team" */}
      <h3 className="about-team-title">
        {t('about_team_title_pre') || 'The '}
        <span className="text-orange">{t('about_team_title_highlight') || 'Daga'}</span>
        {t('about_team_title_post') || 'media Team'}
      </h3>

      {/* Team description */}
      <p className="about-team-desc">{t('about_team_desc')}</p>

      {/* Directing Projects + Director Photos */}
      <div className="about-directors-row">
        <div className="about-directors-text">
          <h4 className="about-subsection-title">{t('about_directing_title')}</h4>
          <p className="about-subsection-text">{t('about_directing_desc')}</p>
        </div>
        <div className="about-directors-photos">
          <div className="director-photo">
            <img src="https://dagamedia.com/wp-content/uploads/2021/04/Reel_animacion_3D.jpg" alt="Reel animación 3D – Dagamedia" />
          </div>
          <div className="director-photo">
            <img src="https://dagamedia.com/wp-content/uploads/2021/05/3d-animacion-home_optimizada.jpg" alt="Animación 3D – Dagamedia" />
          </div>
        </div>
      </div>

      {/* Team Photos Grid 2x2 + Company Info */}
      <div className="about-bottom-row">
        <div className="about-photos-grid">
          <div className="team-photo">
            <img src="https://dagamedia.com/wp-content/uploads/2021/02/animacion-2d.jpg" alt="Animación 2D" />
          </div>
          <div className="team-photo">
            <img src="https://dagamedia.com/wp-content/uploads/2021/02/animacion-3d.jpg" alt="Animación 3D" />
          </div>
          <div className="team-photo">
            <img src="https://dagamedia.com/wp-content/uploads/2024/04/poblador-dos-724x1024.jpg" alt="Personaje 2D Dagamedia" />
          </div>
          <div className="team-photo">
            <img src="https://dagamedia.com/wp-content/uploads/2021/05/Reel.jpg" alt="Reel Dagamedia" />
          </div>
        </div>
        <div className="about-company-info">
          <h4 className="about-subsection-title">{t('about_company_title')}</h4>
          <p className="about-subsection-text">{t('about_company_desc')}</p>
        </div>
      </div>
    </section>
  );
}

export default AboutUs;