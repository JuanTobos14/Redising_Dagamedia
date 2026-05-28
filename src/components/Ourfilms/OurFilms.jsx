import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import LightboxPortal from './LightboxPortal';
import { TRAILER, TUNDAMA_ASSETS } from '../../data/ourFilmsData';
import styles from './OurFilms.module.css';

const CONTACT_SECTION_ID = 'contacto';
const CAROUSEL_SPEED = 58;

const SHORTFILM_ITEMS = [
  {
    id: 'oso',
    label: 'Oso',
    videoId: 'ohnGoV38SB4',
    alt: 'Oso - Dagamedia',
  },
  {
    id: 'loteria-boyaca',
    label: 'Lotería de Boyacá',
    videoId: 'ro02De3I21c',
    alt: 'Lotería de Boyacá - Dagamedia',
  },
  {
    id: 'boyaca-es-para-vivirla',
    label: 'Boyacá es para vivirla',
    videoId: 'NRC4f_Z29RY',
    alt: 'Boyacá es para vivirla - Dagamedia',
  },
];

/*
  Son 3 videos reales repetidos 2 veces = 6 tarjetas visibles.
  Esa repetición da la ilusión de carrusel infinito.
*/
const CAROUSEL_LOOP_ITEMS = [
  ...SHORTFILM_ITEMS,
  ...SHORTFILM_ITEMS,
];

function getYoutubePoster(videoId) {
  return `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`;
}

function getYoutubePosterFallback(videoId) {
  return `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
}

function HighlightedDescription({ text }) {
  const { language } = useLanguage();
  const highlightText = language === 'es' ? 'cortometrajes' : 'short films';
  const parts = text.split(highlightText);

  if (parts.length === 1) {
    return <>{text}</>;
  }

  return (
    <>
      {parts[0]}
      <span className="text-orange">{highlightText}</span>
      {parts.slice(1).join(highlightText)}
    </>
  );
}

function FilmCard({ film, index, onSelect }) {
  const { language } = useLanguage();

  return (
    <button
      type="button"
      className={styles['shortfilm-card-block']}
      onClick={() => onSelect(film.videoId)}
      aria-label={`Ver ${film.label}`}
      data-cursor={language === 'es' ? 'VER' : 'PLAY'}
      data-carousel-item="true"
    >
      <img
        src={getYoutubePoster(film.videoId)}
        alt={film.alt}
        className={styles['shortfilm-img']}
        loading={index < 3 ? 'eager' : 'lazy'}
        draggable="false"
        onError={(event) => {
          event.currentTarget.src = getYoutubePosterFallback(film.videoId);
        }}
      />

      <span className={styles['shortfilm-label']}>
        {film.label}
      </span>
    </button>
  );
}

function ShortFilmsCarousel({ onSelectFilm }) {
  const trackRef = useRef(null);
  const animationFrameRef = useRef(null);
  const lastTimeRef = useRef(0);

  const cycleWidthRef = useRef(0);
  const offsetRef = useRef(0);

  const directionRef = useRef('forward');
  const isPausedRef = useRef(false);
  const isHoveringRef = useRef(false);
  const isDraggingRef = useRef(false);

  const startXRef = useRef(0);
  const startOffsetRef = useRef(0);
  const suppressClickRef = useRef(false);

  const [isDragging, setIsDragging] = useState(false);

  const normalizeOffset = () => {
    const cycleWidth = cycleWidthRef.current;

    if (!cycleWidth) return;

    while (offsetRef.current <= cycleWidth * -1) {
      offsetRef.current += cycleWidth;
    }

    while (offsetRef.current > 0) {
      offsetRef.current -= cycleWidth;
    }
  };

  const updateTransform = () => {
    if (!trackRef.current) return;

    trackRef.current.style.transform = `translate3d(${offsetRef.current}px, 0, 0)`;
  };

  const measureCarousel = () => {
    const track = trackRef.current;

    if (!track) return;

    const firstCard = track.querySelector('[data-carousel-item="true"]');

    if (!firstCard) return;

    const computedTrackStyle = window.getComputedStyle(track);
    const gap =
      parseFloat(computedTrackStyle.columnGap || computedTrackStyle.gap || '0') || 0;

    const cardWidth = firstCard.getBoundingClientRect().width;

    cycleWidthRef.current = (cardWidth + gap) * SHORTFILM_ITEMS.length;

    normalizeOffset();
    updateTransform();
  };

  useEffect(() => {
    measureCarousel();

    const handleResize = () => {
      measureCarousel();
    };

    window.addEventListener('resize', handleResize);

    const animate = (currentTime) => {
      if (!lastTimeRef.current) {
        lastTimeRef.current = currentTime;
      }

      const deltaTime = (currentTime - lastTimeRef.current) / 1000;
      lastTimeRef.current = currentTime;

      if (!isPausedRef.current && !isDraggingRef.current && cycleWidthRef.current) {
        const movementDirection = directionRef.current === 'forward' ? -1 : 1;

        offsetRef.current += movementDirection * CAROUSEL_SPEED * deltaTime;

        normalizeOffset();
        updateTransform();
      }

      animationFrameRef.current = window.requestAnimationFrame(animate);
    };

    animationFrameRef.current = window.requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', handleResize);

      if (animationFrameRef.current) {
        window.cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  const handlePointerDown = (event) => {
    if (event.pointerType === 'mouse' && event.button !== 0) return;

    isDraggingRef.current = true;
    isPausedRef.current = true;
    suppressClickRef.current = false;

    startXRef.current = event.clientX;
    startOffsetRef.current = offsetRef.current;

    setIsDragging(true);

    event.currentTarget.setPointerCapture?.(event.pointerId);
  };

  const handlePointerMove = (event) => {
    if (!isDraggingRef.current) return;

    const deltaX = event.clientX - startXRef.current;

    if (Math.abs(deltaX) > 6) {
      suppressClickRef.current = true;
    }

    if (Math.abs(deltaX) > 2) {
      directionRef.current = deltaX < 0 ? 'forward' : 'backward';
    }

    offsetRef.current = startOffsetRef.current + deltaX;

    normalizeOffset();
    updateTransform();
  };

  const handlePointerUp = (event) => {
    if (!isDraggingRef.current) return;

    isDraggingRef.current = false;
    isPausedRef.current = isHoveringRef.current;

    setIsDragging(false);

    event.currentTarget.releasePointerCapture?.(event.pointerId);

    window.setTimeout(() => {
      suppressClickRef.current = false;
    }, 160);
  };

  const handleMouseEnter = () => {
    isHoveringRef.current = true;
    isPausedRef.current = true;
  };

  const handleMouseLeave = () => {
    isHoveringRef.current = false;

    if (!isDraggingRef.current) {
      isPausedRef.current = false;
    }
  };

  const handleClickCapture = (event) => {
    if (!suppressClickRef.current) return;

    event.preventDefault();
    event.stopPropagation();
  };

  return (
    <div
      className={`${styles['shortfilms-carousel-wrapper']} ${
        isDragging ? styles['is-dragging'] : ''
      }`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onLostPointerCapture={handlePointerUp}
      onClickCapture={handleClickCapture}
      data-cursor="ARRASTRAR"
    >
      <div ref={trackRef} className={styles['shortfilms-carousel-track']}>
        {CAROUSEL_LOOP_ITEMS.map((film, index) => (
          <FilmCard
            key={`${film.id}-${index}`}
            film={film}
            index={index}
            onSelect={onSelectFilm}
          />
        ))}
      </div>
    </div>
  );
}

function TundamaSideImage({ image }) {
  return (
    <div className={`${styles['tundama-side-img']} img-card`}>
      <img src={image.src} alt={image.alt} loading="lazy" />
    </div>
  );
}

function TundamaBanner() {
  const { t } = useLanguage();

  return (
    <div className={styles['tundama-banner']}>
      <TundamaSideImage image={TUNDAMA_ASSETS.poster} />

      <div className={styles['tundama-center']}>
        <img
          src={TUNDAMA_ASSETS.logo.src}
          alt={TUNDAMA_ASSETS.logo.alt}
          className={styles['tundama-logo']}
          loading="lazy"
        />

        <p className={styles['tundama-premiere']}>
          {t('films_tundama_header')}
        </p>

        <div className={styles['tundama-laurels-container']}>
          <img
            src={TUNDAMA_ASSETS.laurels.src}
            alt={TUNDAMA_ASSETS.laurels.alt}
            className={styles['tundama-laurels-img']}
            loading="lazy"
          />
        </div>

        <p className={`${styles['tundama-desc']} text-normal`}>
          {t('films_tundama_desc_1')}
        </p>
      </div>

      <TundamaSideImage image={TUNDAMA_ASSETS.sketch} />
    </div>
  );
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="white" width="50" height="50" aria-hidden="true">
      <polygon points="8,5 20,12 8,19" />
    </svg>
  );
}

function TrailerSection({ onPlayTrailer }) {
  const { t, language } = useLanguage();

  return (
    <div className={styles['trailer-section']}>
      <h3 className={styles['trailer-title']}>
        {t('films_trailer_title')}
      </h3>

      <button
        type="button"
        className={styles['trailer-video-box']}
        onClick={onPlayTrailer}
        aria-label="Reproducir tráiler de Tundama"
        data-cursor={language === 'es' ? 'VER' : 'PLAY'}
      >
        <img
          src={TRAILER.poster}
          alt={TRAILER.posterAlt}
          className={styles['trailer-poster']}
          loading="lazy"
        />

        <span className="play-btn-circle">
          <PlayIcon />
        </span>
      </button>

      <p className={`${styles['trailer-synopsis']} text-normal`}>
        {t('films_tundama_desc_2')}
      </p>
    </div>
  );
}

export default function OurFilms() {
  const { t } = useLanguage();
  const [activeVideoId, setActiveVideoId] = useState(null);

  return (
    <section
      className={`${styles['films-section']} section-padded reveal-on-scroll`}
      id="peliculas"
    >
      <h2 className="section-label">
        {t('films_title')}
      </h2>

      <div className={styles['films-subtitle-row']}>
        <h3 className={`${styles['films-subtitle-left']} subtitle-main`}>
          {t('films_subtitle')}
        </h3>

        <p className={`${styles['films-subtitle-right']} text-normal`}>
          <HighlightedDescription text={t('films_desc_1')} />
        </p>
      </div>

      <ShortFilmsCarousel onSelectFilm={setActiveVideoId} />

      <TundamaBanner />

      <TrailerSection onPlayTrailer={() => setActiveVideoId(TRAILER.videoId)} />

      {activeVideoId && (
        <LightboxPortal
          videoId={activeVideoId}
          onClose={() => setActiveVideoId(null)}
        />
      )}
    </section>
  );
}