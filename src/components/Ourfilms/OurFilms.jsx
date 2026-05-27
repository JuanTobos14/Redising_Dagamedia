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

    return () => {
      document.body.style.overflow = '';
    };
  }, [playTrailer]);

  const handleScrollToContact = (formType) => {
    if (setContactFormType) setContactFormType(formType);

    const el = document.getElementById('contacto');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const carouselItems = [...SHORT_FILMS, ...SHORT_FILMS];

  return (
    <section className="films-section reveal-on-scroll" id="peliculas">
<<<<<<< HEAD
      {/* Label de la Sección */}
      <h2 className="section-label">{t('films_title')}</h2>

      {/* Fila de subtítulos */}
=======
      <h2 className="section-label">
        {t('films_title')}
      </h2>

>>>>>>> 6d752d5a49f86f7e9e7d2ce15688c1b66251642b
      <div className="films-subtitle-row">
        <h3 className="films-subtitle-left subtitle-main">
          {t('films_subtitle')}
        </h3>

        <p className="films-subtitle-right text-normal">
          {t('films_desc_1').split('short films')[0]}
          <span className="text-orange">short films</span>
          {t('films_desc_1').split('short films')[1] || ' están por estrenarse, mientras otros siguen en proceso.'}
        </p>
      </div>

<<<<<<< HEAD
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
=======
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

>>>>>>> 6d752d5a49f86f7e9e7d2ce15688c1b66251642b
      <div className="tundama-banner">
        {/* Imagen lateral izquierda — Poster Oficial */}
        <div className="tundama-side-img">
          <img
<<<<<<< HEAD
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
=======
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
>>>>>>> 6d752d5a49f86f7e9e7d2ce15688c1b66251642b
          </div>

          <p className="tundama-desc text-normal">
            {t('films_tundama_desc_1')}
          </p>
        </div>

<<<<<<< HEAD
        {/* Imagen lateral derecha — Boceto de Producción */}
        <div className="tundama-side-img">
          <img
            src="https://dagamedia.com/wp-content/uploads/2021/04/Tundama_Boceto.jpg"
            alt="Boceto de producción Tundama"
=======
        <div className="tundama-side-img">
          <img
            src="https://dagamedia.com/wp-content/uploads/2021/02/animacion-3d.jpg"
            alt="Tundama Scene"
>>>>>>> 6d752d5a49f86f7e9e7d2ce15688c1b66251642b
          />
        </div>
      </div>

<<<<<<< HEAD
      {/* Sección del Tráiler */}
      <div className="trailer-section">
        <h3 className="trailer-title">{t('films_trailer_title') || 'Te presentamos el tráiler oficial.'}</h3>
        <div className="trailer-video-box" onClick={() => setPlayTrailer(true)}>
          <img
            src="https://img.youtube.com/vi/110eJJP_QVs/maxresdefault.jpg"
=======
      <div className="trailer-section">
        <h3 className="trailer-title subtitle-main text-yellow">
          {t('films_trailer_title') || 'We present to you the official trailer.'}
        </h3>

        <div className="trailer-video-box" onClick={() => setPlayTrailer(true)}>
          <img
            src="https://img.youtube.com/vi/SUbnWx93k8c/maxresdefault.jpg"
>>>>>>> 6d752d5a49f86f7e9e7d2ce15688c1b66251642b
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

<<<<<<< HEAD
      {/* CTAs */}
=======
>>>>>>> 6d752d5a49f86f7e9e7d2ce15688c1b66251642b
      <div className="films-actions">
        <button
          type="button"
          className="films-cta-btn btn-primary"
          onClick={() => handleScrollToContact('standard')}
        >
          {t('btn_contact')}
        </button>
<<<<<<< HEAD
=======

>>>>>>> 6d752d5a49f86f7e9e7d2ce15688c1b66251642b
        <button
          type="button"
          className="films-cta-btn btn-secondary"
          onClick={() => handleScrollToContact('work')}
        >
          {t('btn_work_with_us')}
        </button>
      </div>

<<<<<<< HEAD
      {/* Cubo 3D Interactivo */}
=======
>>>>>>> 6d752d5a49f86f7e9e7d2ce15688c1b66251642b
      <div className="films-cube-section">
        <VideoCube />
      </div>

<<<<<<< HEAD
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
=======
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
>>>>>>> 6d752d5a49f86f7e9e7d2ce15688c1b66251642b
            </div>
          </div>,
          document.body
        )}
    </section>
  );
}

export default OurFilms;