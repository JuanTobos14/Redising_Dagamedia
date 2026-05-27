import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import VideoCube from '../VideoCube/VideoCube';
import { useLanguage } from '../../context/LanguageContext';
import './OurFilms.css';

const SHORT_FILMS = [
  {
    src:   'https://dagamedia.com/wp-content/uploads/2021/05/Tundama-grito-batalla.jpg',
    alt:   'Tundama – Grito de batalla',
    label: 'Tundama',
  },
  {
    src:   'https://dagamedia.com/wp-content/uploads/2021/05/Osito_video.jpg',
    alt:   'Oso – Cortometraje animación',
    label: 'Oso',
  },
  {
    src:   'https://dagamedia.com/wp-content/uploads/2021/05/cerditos.jpg',
    alt:   'Cerdos – Comercial animación 3D',
    label: 'Cerdos',
  },
  {
    src:   'https://dagamedia.com/wp-content/uploads/2021/05/Vena_Boyaca.jpg',
    alt:   'Vena Boyacá – Campaña',
    label: 'Vena Boyacá',
  },
  {
    src:   'https://dagamedia.com/wp-content/uploads/2021/04/Portafolio_nena_bici.jpg',
    alt:   'Niña en bici – Animación',
    label: 'Personaje',
  },
  {
    src:   'https://dagamedia.com/wp-content/uploads/2021/05/queso-Paipa.jpg',
    alt:   'Queso Paipa – Comercial',
    label: 'Queso Paipa',
  },
];

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

  const carouselItems = [...SHORT_FILMS, ...SHORT_FILMS];

  return (
    <section className="films-section reveal-on-scroll" id="peliculas">
      {/* Label de la Sección */}
      <h2 className="section-label">{t('films_title')}</h2>

      {/* Fila de subtítulos */}
      <div className="films-subtitle-row">
        <h3 className="films-subtitle-left">{t('films_subtitle')}</h3>
        <p className="films-subtitle-right">
          {t('films_desc_1').split('short films')[0]}
          <span className="text-orange">short films</span>
          {t('films_desc_1').split('short films')[1] || ' están por estrenarse, mientras otros siguen en proceso.'}
        </p>
      </div>

      {/* Carrusel Infinito */}
      <div className="shortfilms-carousel-wrapper">
        <div className="shortfilms-carousel-track">
          {carouselItems.map((film, idx) => (
            <div key={idx} className="shortfilm-card-block">
              <img
                src={film.src}
                alt={film.alt}
                className="shortfilm-img"
                loading="lazy"
              />
              <div className="shortfilm-label">{film.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Banner Tundama (Layout Corregido) ─────────────────────────── */}
      <div className="tundama-banner">
        {/* Imagen lateral izquierda — Poster Oficial */}
        <div className="tundama-side-img">
          <img
            src="https://dagamedia.com/wp-content/uploads/2021/04/POSTER-Oficial-DagaM_Redes.jpg"
            alt="Poster oficial Tundama"
          />
        </div>

        {/* Bloque Central */}
        <div className="tundama-center">
          <img
            src="https://dagamedia.com/wp-content/uploads/2021/04/Logo-Tundama.png"
            alt="Logo Tundama"
            className="tundama-logo"
          />
          
          <p className="tundama-premiere">{t('films_tundama_header')}</p>

          {/* Imagen Oficial de los Premios (Laureles Reales del Sitio) */}
          <div className="tundama-laurels-container">
            <img
              src="https://dagamedia.com/wp-content/uploads/2021/04/Premios_Laurel.png"
              alt="Premios Tundama Oficial"
              className="tundama-laurels-img"
            />
          </div>

          <p className="tundama-desc">{t('films_tundama_desc_1')}</p>
        </div>

        {/* Imagen lateral derecha — Boceto de Producción */}
        <div className="tundama-side-img">
          <img
            src="https://dagamedia.com/wp-content/uploads/2021/04/Tundama_Boceto.jpg"
            alt="Boceto de producción Tundama"
          />
        </div>
      </div>

      {/* Sección del Tráiler */}
      <div className="trailer-section">
        <h3 className="trailer-title">{t('films_trailer_title') || 'Te presentamos el tráiler oficial.'}</h3>
        <div className="trailer-video-box" onClick={() => setPlayTrailer(true)}>
          <img
            src="https://img.youtube.com/vi/110eJJP_QVs/maxresdefault.jpg"
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

      {/* CTAs */}
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

      {/* Cubo 3D Interactivo */}
      <div className="films-cube-section">
        <VideoCube />
      </div>

      {/* Lightbox del trailer */}
      {playTrailer && createPortal(
        <div className="cube-lightbox-modal" onClick={() => setPlayTrailer(false)}>
          <button className="cube-lightbox-close" onClick={() => setPlayTrailer(false)} aria-label="Close">✕</button>
          <div className="cube-lightbox-content" onClick={(e) => e.stopPropagation()}>
            <div className="cube-lightbox-video-wrapper">
              <iframe
                src="https://www.youtube.com/embed/110eJJP_QVs?autoplay=1"
                title="Tundama Trailer"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </div>
        </div>,
        document.body
      )}
    </section>
  );
}

export default OurFilms;