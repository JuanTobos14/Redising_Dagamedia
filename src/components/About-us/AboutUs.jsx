import 'react';
import { useTranslation } from 'react-i18next';
import './AboutUs.css';

// Imágenes
import zoeImg from '../../assets/Zoe.png';
import poblaImg from '../../assets/PObla.png';
import dibujoImg from '../../assets/Dibujo.png';

function AboutUs() {
  const { t } = useTranslation();

  return (
    <section className="about-section">
      <h2 className="about-top-tag">
        {t('about.title')}
      </h2>

      {/* Encabezado principal */}
      <div className="about-main-header">
        <h1>
          {t('about.mainTitle1')}{' '}
          <span className="highlight-orange">
            {t('about.mainTitleHighlight')}
          </span>
          {t('about.mainTitle2')}
        </h1>

        <p className="about-lead-text">
          {t('about.leadText')}
        </p>
      </div>

      {/* Layout principal */}
      <div className="about-layout-grid">

        {/* Texto izquierdo */}
        <div className="grid-area-text-left">
          <div className="text-block">
            <h2>
              {t('about.directingProjectsTitle')}
            </h2>

            <p>
              {t('about.directingProjectsDescription')}
            </p>
          </div>
        </div>

        {/* Imagen dibujo */}
        <div className="grid-area-sketches">
          <div className="sketches-single-container">
            <img
              src={dibujoImg}
              alt={t('about.altSketches')}
              className="sketches-img"
              loading="lazy"
            />
          </div>
        </div>

        {/* Personajes */}
        <div className="grid-area-characters">
          <div className="character-cards-wrapper">

            <div className="character-card">
              <img
                src={zoeImg}
                alt={t('about.altZoe')}
                loading="lazy"
              />
            </div>

            <div className="character-card">
              <img
                src={poblaImg}
                alt={t('about.altPobla')}
                loading="lazy"
              />
            </div>

          </div>
        </div>

        {/* Texto derecho */}
        <div className="grid-area-text-right">
          <div className="text-block text-center">

            <h2>
              {t('about.animationCompanyTitle')}
            </h2>

            <p>
              {t('about.animationCompanyDescription')}
            </p>

          </div>
        </div>

      </div>
    </section>
  );
}

export default AboutUs;