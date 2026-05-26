import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import './AboutUs.css';

function AboutUs() {
  const { t } = useLanguage();

  return (
    <section className="about-container reveal-on-scroll" id="nosotros">
      <div className="about-header">
        <h2>{t('about_title')}</h2>
      </div>

      <div className="about-main-content">
        <div className="about-image-large">
          <img 
            src="https://dagamedia.com/wp-content/uploads/2021/02/tundama-poster.jpg" 
            alt="Daga Media Project Poster" 
          />
        </div>
        <div className="about-text">
          <p>{t('about_desc_1')}</p>
          <p>{t('about_desc_2')}</p>
        </div>
      </div>

      {/* Las 3 imágenes con información */}
      <div className="about-grid">
        <div className="grid-item">
          <img 
            src="https://dagamedia.com/wp-content/uploads/2021/02/servicios-animacion.jpg" 
            alt="Servicios de Animación Dagamedia" 
          />
          <div className="grid-info-box">
            <h4>{t('about_team_title')}</h4>
            <p>{t('about_team_desc')}</p>
          </div>
        </div>
        
        <div className="grid-item">
          <img 
            src="https://dagamedia.com/wp-content/uploads/2021/02/servicios-produccion.jpg" 
            alt="Servicios de Producción Dagamedia" 
          />
          <div className="grid-info-box">
            <h4>{t('about_directing_title')}</h4>
            <p>{t('about_directing_desc')}</p>
          </div>
        </div>
        
        <div className="grid-item">
          <img 
            src="https://dagamedia.com/wp-content/uploads/2021/02/servicios-post.jpg" 
            alt="Servicios de Post-producción Dagamedia" 
          />
          <div className="grid-info-box">
            <h4>{t('about_company_title')}</h4>
            <p>{t('about_company_desc')}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutUs;