import React from 'react';
import VideoCube from '../VideoCube/VideoCube';
import { useLanguage } from '../../context/LanguageContext';
import './OurFilms.css';

function OurFilms({ setContactFormType }) {
  const { t } = useLanguage();

  const handleScrollToContact = (formType) => {
    if (setContactFormType) {
      setContactFormType(formType);
    }
    const contactSection = document.getElementById('contacto');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="films-container reveal-on-scroll" id="peliculas">
      <h2 className="films-title">{t('films_title')}</h2>
      
      <div className="films-grid-layout">
        {/* Left Column: Text description and Call To Actions */}
        <div className="films-text-column">
          <h3 className="films-subtitle">{t('films_subtitle')}</h3>
          <p className="films-paragraph">{t('films_desc_1')}</p>
          <p className="films-paragraph">{t('films_tundama_header')}</p>
          <p className="films-paragraph">{t('films_tundama_desc_1')}</p>
          <p className="films-paragraph films-highlight-desc">{t('films_tundama_desc_2')}</p>
          
          <div className="films-actions">
            <button 
              type="button" 
              className="films-cta-btn btn-primary"
              onClick={() => handleScrollToContact('standard')}
            >
              {t('btn_contact')}
            </button>
            <button 
              type="button" 
              className="films-cta-btn btn-secondary"
              onClick={() => handleScrollToContact('work')}
            >
              {t('btn_work_with_us')}
            </button>
          </div>
        </div>

        {/* Right Column: 3D Video Cube */}
        <div className="films-cube-column">
          <VideoCube />
        </div>
      </div>
    </section>
  );
}

export default OurFilms;