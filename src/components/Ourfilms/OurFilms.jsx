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

    return () => {
      document.body.style.overflow = '';
    };
  }, [playTrailer]);

  const handleScrollToContact = (formType) => {
    if (setContactFormType) setContactFormType(formType);

    const el = document.getElementById('contacto');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="films-section reveal-on-scroll" id="peliculas">
      <h2 className="section-label">
        {t('films_title')}
      </h2>

      <div className="films-subtitle-row">
        <h3 className="films-subtitle-left subtitle-main">
          {t('films_subtitle')}
        </h3>

        <p className="films-subtitle-right text-normal">
          {t('films_desc_1').split('short films')[0]}
          <span className="text-orange">short films</span>
          {t('films_desc_1').split('short films')[1] || ' are about to premiere, while others are still in progress. We present them to you.'}
        </p>
      </div>

      <div className="shortfilms-carousel-wrapper">
        <div className="shortfilms-carousel-track">
          <div className="shortfilm-card-block">
            <div className="shortfilm-placeholder">
              <span className="placeholder-icon">🔥</span>
              <span className="placeholder-title text-small">Cortometraje 1</span>
              <span className="placeholder-subtitle text-small">(Escena de la fogata)</span>
            </div>
          </div>

          <div className="shortfilm-card-block">
            <div className="shortfilm-placeholder">
              <span className="placeholder-icon">🐻</span>
              <span className="placeholder-title text-small">Cortometraje 2</span>
              <span className="placeholder-subtitle text-small">(Oso en la cascada)</span>
            </div>
          </div>

          <div className="shortfilm-card-block">
            <div className="shortfilm-placeholder">
              <span className="placeholder-icon">🏹</span>
              <span className="placeholder-title text-small">Cortometraje 3</span>
              <span className="placeholder-subtitle text-small">(Personaje Tundama)</span>
            </div>
          </div>

          <div className="shortfilm-card-block">
            <div className="shortfilm-placeholder">
              <span className="placeholder-icon">🔥</span>
              <span className="placeholder-title text-small">Cortometraje 1</span>
              <span className="placeholder-subtitle text-small">(Escena de la fogata)</span>
            </div>
          </div>

          <div className="shortfilm-card-block">
            <div className="shortfilm-placeholder">
              <span className="placeholder-icon">🐻</span>
              <span className="placeholder-title text-small">Cortometraje 2</span>
              <span className="placeholder-subtitle text-small">(Oso en la cascada)</span>
            </div>
          </div>

          <div className="shortfilm-card-block">
            <div className="shortfilm-placeholder">
              <span className="placeholder-icon">🏹</span>
              <span className="placeholder-title text-small">Cortometraje 3</span>
              <span className="placeholder-subtitle text-small">(Personaje Tundama)</span>
            </div>
          </div>
        </div>
      </div>

      <div className="tundama-banner">
        <div className="tundama-side-img">
          <img
            src="https://dagamedia.com/wp-content/uploads/2021/02/tundama-poster.jpg"
            alt="Tundama Scene"
          />
        </div>

        <div className="tundama-center">
          <img
            src="https://dagamedia.com/wp-content/uploads/2021/02/logo-tundama.png"
            alt="Logo Tundama"
            className="tundama-logo"
          />

          <p className="tundama-premiere text-normal">
            {t('films_tundama_header')}
          </p>

          <div className="tundama-laurels-block">
            <div className="laurels-static-row">
              <div className="laurel-static-item">
                <span className="laurel-static-icon">🏆</span>
                <span className="laurel-static-name text-small">Oniros Film Awards</span>
              </div>

              <div className="laurel-static-item">
                <span className="laurel-static-icon">🎬</span>
                <span className="laurel-static-name text-small">River Atreyee Festival</span>
              </div>

              <div className="laurel-static-item">
                <span className="laurel-static-icon">🌟</span>
                <span className="laurel-static-name text-small">Cine en las Montañas</span>
              </div>
            </div>
          </div>

          <p className="tundama-desc text-normal">
            {t('films_tundama_desc_1')}
          </p>
        </div>

        <div className="tundama-side-img">
          <img
            src="https://dagamedia.com/wp-content/uploads/2021/02/animacion-3d.jpg"
            alt="Tundama Scene"
          />
        </div>
      </div>

      <div className="trailer-section">
        <h3 className="trailer-title subtitle-main text-yellow">
          {t('films_trailer_title') || 'We present to you the official trailer.'}
        </h3>

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

        <p className="trailer-synopsis text-normal">
          {t('films_tundama_desc_2')}
        </p>
      </div>

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

      <div className="films-cube-section">
        <VideoCube />
      </div>

      {playTrailer &&
        createPortal(
          <div className="cube-lightbox-modal" onClick={() => setPlayTrailer(false)}>
            <button
              className="cube-lightbox-close"
              onClick={() => setPlayTrailer(false)}
              aria-label="Close"
            >
              ✕
            </button>

            <div
              className="cube-lightbox-content"
              onClick={(e) => e.stopPropagation()}
            >
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