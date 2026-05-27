import { useLanguage } from '../../context/LanguageContext';
import './AboutUs.css';

function AboutUs() {
  const { t } = useLanguage();

  return (
    <section className="about-section reveal-on-scroll" id="nosotros">
      <h2 className="section-label">
        {t('about_title')}
      </h2>

      <h3 className="about-team-title title-main">
        {t('about_team_title_pre') || 'The '}
        <span className="text-orange">
          {t('about_team_title_highlight') || 'Daga'}
        </span>
        {t('about_team_title_post') || 'media Team'}
      </h3>

      <p className="about-team-desc text-normal">
        {t('about_team_desc')}
      </p>

      <div className="about-directors-row">
        <div className="about-directors-text">
          <h4 className="about-subsection-title subtitle-main">
            {t('about_directing_title')}
          </h4>

          <p className="about-subsection-text text-normal">
            {t('about_directing_desc')}
          </p>
        </div>

        <div className="about-directors-photos">
          <div className="director-photo">
            <img
              src="https://dagamedia.com/wp-content/uploads/2021/02/servicios-produccion.jpg"
              alt="Director 1"
            />
          </div>

          <div className="director-photo">
            <img
              src="https://dagamedia.com/wp-content/uploads/2021/02/servicios-animacion.jpg"
              alt="Director 2"
            />
          </div>
        </div>
      </div>

      <div className="about-bottom-row">
        <div className="about-photos-grid">
          <div className="team-photo">
            <img
              src="https://dagamedia.com/wp-content/uploads/2021/02/animacion-2d.jpg"
              alt="Team 1"
            />
          </div>

          <div className="team-photo">
            <img
              src="https://dagamedia.com/wp-content/uploads/2021/02/animacion-3d.jpg"
              alt="Team 2"
            />
          </div>

          <div className="team-photo">
            <img
              src="https://dagamedia.com/wp-content/uploads/2021/02/tundama-poster.jpg"
              alt="Team 3"
            />
          </div>

          <div className="team-photo">
            <img
              src="https://dagamedia.com/wp-content/uploads/2021/02/servicios-post.jpg"
              alt="Team 4"
            />
          </div>
        </div>

        <div className="about-company-info">
          <h4 className="about-subsection-title subtitle-main">
            {t('about_company_title')}
          </h4>

          <p className="about-subsection-text text-normal">
            {t('about_company_desc')}
          </p>
        </div>
      </div>
    </section>
  );
}

export default AboutUs;