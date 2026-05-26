import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import VideoCube from '../VideoCube/VideoCube';
import { useLanguage } from '../../context/LanguageContext';
import './OurFilms.css';

function OurFilms({ setContactFormType }) {
  const { t } = useLanguage();
  const [playTrailer, setPlayTrailer] = useState(false);

  useEffect(() => {
    if (playTrailer) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [playTrailer]);

  const handleScrollToContact = (formType) => {
    if (setContactFormType) setContactFormType(formType);
    const el = document.getElementById('contacto');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="films-section reveal-on-scroll" id="peliculas">
      {/* Section label */}
      <h2 className="section-label">{t('films_title')}</h2>

      {/* Subtitle row: bold left + description right */}
      <div className="films-subtitle-row">
        <h3 className="films-subtitle-left">{t('films_subtitle')}</h3>
        <p className="films-subtitle-right">
          {t('films_desc_1').split('short films')[0]}
          <span className="text-orange">short films</span>
          {t('films_desc_1').split('short films')[1] || ' are about to premiere, while others are still in progress. We present them to you.'}
        </p>
      </div>

      {/* 3 Film Cards Carousel (ShortFilms) */}
      <div className="shortfilms-carousel-wrapper">
        <div className="shortfilms-carousel-track">
          {/* Card 1: Campfire Scene */}
          <div className="shortfilm-card-block">
            {/* NOTA PARA COMPAÑEROS: Para cambiar la imagen del cortometraje (ej. Campfire Scene), descomenta la línea de abajo y añade la ruta: */}
            {/* <img src="RUTA_DE_LA_IMAGEN_CAMPFIRE" alt="Campfire Scene" className="shortfilm-img" /> */}
            <div className="shortfilm-placeholder">
              <span className="placeholder-icon">🔥</span>
              <span className="placeholder-title">Cortometraje 1</span>
              <span className="placeholder-subtitle">(Escena de la fogata)</span>
            </div>
          </div>

          {/* Card 2: Bear Scene */}
          <div className="shortfilm-card-block">
            {/* <img src="RUTA_DE_LA_IMAGEN_OSO" alt="Waterfall Bear Scene" className="shortfilm-img" /> */}
            <div className="shortfilm-placeholder">
              <span className="placeholder-icon">🐻</span>
              <span className="placeholder-title">Cortometraje 2</span>
              <span className="placeholder-subtitle">(Oso en la cascada)</span>
            </div>
          </div>

          {/* Card 3: Tundama Scene */}
          <div className="shortfilm-card-block">
            {/* <img src="RUTA_DE_LA_IMAGEN_TUNDAMA" alt="Tundama Character" className="shortfilm-img" /> */}
            <div className="shortfilm-placeholder">
              <span className="placeholder-icon">🏹</span>
              <span className="placeholder-title">Cortometraje 3</span>
              <span className="placeholder-subtitle">(Personaje Tundama)</span>
            </div>
          </div>

          {/* Duplicate cards for seamless infinite scroll */}
          <div className="shortfilm-card-block">
            <div className="shortfilm-placeholder">
              <span className="placeholder-icon">🔥</span>
              <span className="placeholder-title">Cortometraje 1</span>
              <span className="placeholder-subtitle">(Escena de la fogata)</span>
            </div>
          </div>
          <div className="shortfilm-card-block">
            <div className="shortfilm-placeholder">
              <span className="placeholder-icon">🐻</span>
              <span className="placeholder-title">Cortometraje 2</span>
              <span className="placeholder-subtitle">(Oso en la cascada)</span>
            </div>
          </div>
          <div className="shortfilm-card-block">
            <div className="shortfilm-placeholder">
              <span className="placeholder-icon">🏹</span>
              <span className="placeholder-title">Cortometraje 3</span>
              <span className="placeholder-subtitle">(Personaje Tundama)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tundama Banner Section */}
      <div className="tundama-banner">
        <div className="tundama-side-img">
          <img src="https://dagamedia.com/wp-content/uploads/2021/02/tundama-poster.jpg" alt="Tundama Scene" />
        </div>
        <div className="tundama-center">
          <img 
            src="https://dagamedia.com/wp-content/uploads/2021/02/logo-tundama.png" 
            alt="Logo Tundama" 
            className="tundama-logo"
          />
          <p className="tundama-premiere">{t('films_tundama_header')}</p>
          
          {/* Static Laurels / Awards block as designed in Figma */}
          <div className="tundama-laurels-block">
            <div className="laurels-static-row">
              <div className="laurel-static-item">
                <span className="laurel-static-icon">🏆</span>
                <span className="laurel-static-name">Oniros Film Awards</span>
              </div>
              <div className="laurel-static-item">
                <span className="laurel-static-icon">🎬</span>
                <span className="laurel-static-name">River Atreyee Festival</span>
              </div>
              <div className="laurel-static-item">
                <span className="laurel-static-icon">🌟</span>
                <span className="laurel-static-name">Cine en las Montañas</span>
              </div>
            </div>
          </div>

          <p className="tundama-desc">{t('films_tundama_desc_1')}</p>
        </div>
        <div className="tundama-side-img">
          <img src="https://dagamedia.com/wp-content/uploads/2021/02/animacion-3d.jpg" alt="Tundama Scene" />
        </div>
      </div>

      {/* Official Trailer Section */}
      <div className="trailer-section">
        <h3 className="trailer-title">{t('films_trailer_title') || 'We present to you the official trailer.'}</h3>
        <div className="trailer-video-box" onClick={() => setPlayTrailer(true)}>
          <img 
            src="https://img.youtube.com/vi/SUbnWx93k8c/maxresdefault.jpg" 
            alt="Tundama Trailer" 
            className="trailer-poster"
          />
          <div className="trailer-play-btn">
            <svg viewBox="0 0 24 24" fill="white" width="50" height="50">
              <polygon points="8,5 20,12 8,19" />
            </svg>
          </div>
        </div>
        <p className="trailer-synopsis">{t('films_tundama_desc_2')}</p>
      </div>

      {/* CTA Buttons */}
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

      {/* Interactive 3D Video Cube */}
      <div className="films-cube-section">
        <VideoCube />
      </div>

      {/* Trailer Lightbox */}
      {playTrailer && createPortal(
        <div className="cube-lightbox-modal" onClick={() => setPlayTrailer(false)}>
          <button className="cube-lightbox-close" onClick={() => setPlayTrailer(false)} aria-label="Close">✕</button>
          <div className="cube-lightbox-content" onClick={(e) => e.stopPropagation()}>
            <div className="cube-lightbox-video-wrapper">
              <iframe
                src="https://www.youtube.com/embed/SUbnWx93k8c?autoplay=1"
                title="Tundama Trailer"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>,
        document.body
      )}
    </section>
  );
}

export default OurFilms;