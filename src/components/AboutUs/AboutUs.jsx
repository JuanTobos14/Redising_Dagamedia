import { useTranslation } from 'react-i18next';
import './AboutUs.css';

function AboutUs() {
  // Hook para acceder a las traducciones
  const { t } = useTranslation();

  return (
    <section className="about-container">
      <div className="about-header">
        {/* Título traducido */}
        <h2>{t('about.title')}</h2>
      </div>

      <div className="about-main-content">
        <div className="about-image-large">
          {/* Imagen principal de Tundama/Daga */}
          <img src="https://dagamedia.com/wp-content/uploads/2021/02/tundama-poster.jpg" alt="Daga Media Project" />
        </div>
        <div className="about-text">
          {/* Descripciones traducidas */}
          <p>
            {t('about.description1')}
          </p>
          <p>
            {t('about.description2')}
          </p>
        </div>
      </div>

      {/* Las 3 imágenes con alt text traducidos */}
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