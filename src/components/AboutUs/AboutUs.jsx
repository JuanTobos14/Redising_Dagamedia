import { useTranslation } from 'react-i18next';
import './AboutUs.css';

function AboutUs() {
  const { t } = useTranslation();

  return (
    <section className="about-container">
      <div className="about-header">
        <h2>{t('about.title')}</h2>
      </div>

      <div className="about-main-content">
        <div className="about-image-large">
          <img src="https://dagamedia.com/wp-content/uploads/2021/02/tundama-poster.jpg" alt="Daga Media Project" />
        </div>
        <div className="about-text">
          <p>
            {t('about.description1')}
          </p>
          <p>
            {t('about.description2')}
          </p>
        </div>
      </div>

      <div className="about-grid">
        <div className="grid-item">
          <img src="https://dagamedia.com/wp-content/uploads/2021/02/servicios-animacion.jpg" alt={t('about.altAnimation')} />
        </div>
        <div className="grid-item">
          <img src="https://dagamedia.com/wp-content/uploads/2021/02/servicios-produccion.jpg" alt={t('about.altProduction')} />
        </div>
        <div className="grid-item">
          <img src="https://dagamedia.com/wp-content/uploads/2021/02/servicios-post.jpg" alt={t('about.altPostProduction')} />
        </div>
      </div>
    </section>
  );
}

export default AboutUs;