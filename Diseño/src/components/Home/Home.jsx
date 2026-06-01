import { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import HomeVideoLightbox from './HomeVideoLightbox';
import { HOME_VIDEO } from '../../data/homeData';
import styles from './Home.module.css';

function TitleWithHighlight({ text, highlight }) {
  if (!text.includes(highlight)) {
    return text;
  }

  const [before, after] = text.split(highlight);

  return (
    <>
      {before}
      <span className="text-yellow">{highlight}</span>
      {after}
    </>
  );
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="white" width="50" height="50" aria-hidden="true">
      <polygon points="8,5 20,12 8,19" />
    </svg>
  );
}

function HeroText() {
  const { t } = useLanguage();

  const title = t('home_creativity');
  const highlightWord = t('home_creativity');

  return (
    <div className={styles['hero-text-block']}>
      <h1 className={`${styles['hero-main-title']} title-main`}>
        <TitleWithHighlight text={title} highlight={highlightWord} />
      </h1>

      <p className={`${styles['hero-subtitle']} text-normal`}>
        {t('home_look_productions')}
      </p>
    </div>
  );
}

function HeroVideoButton({ onPlay }) {
  return (
    <div className={styles['hero-video-wrapper']}>
      <button
        type="button"
        className={styles['hero-video-box']}
        onClick={onPlay}
        aria-label="Reproducir video principal de Dagamedia"
        data-cursor="PLAY"
      >
        <img
          src={HOME_VIDEO.poster}
          alt={HOME_VIDEO.posterAlt}
          className={styles['hero-video-poster']}
          loading="eager"
        />

        <span className="play-btn-circle">
          <PlayIcon />
        </span>
      </button>
    </div>
  );
}

export default function Home() {
  const [videoOpen, setVideoOpen] = useState(false);

  return (
    <section className={`${styles['home-container']} reveal-on-scroll`} id="inicio">
      <HeroText />

      <HeroVideoButton onPlay={() => setVideoOpen(true)} />

      {videoOpen && <HomeVideoLightbox onClose={() => setVideoOpen(false)} />}
    </section>
  );
}
