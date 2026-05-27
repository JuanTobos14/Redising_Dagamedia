import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useLanguage } from '../../context/LanguageContext';
import './Home.css';

function Home() {
  const [play, setPlay] = useState(false);
  const { t, language } = useLanguage();

  // Disable background scrolling when video lightbox is open
  useEffect(() => {
    if (play) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [play]);

  const highlightWord = language === 'es' ? 'producciones' : 'productions';
  const subtitleParts = t('home_look_productions').split(highlightWord);

  return (
    <div className="home-container reveal-on-scroll" id="inicio">
      {/* Hero text */}
      <div className="hero-text-block">
        <h1 className="hero-main-title title-main">
          {t('home_creativity')}
        </h1>

        <p className="hero-subtitle text-normal">
          {subtitleParts[0]}
          <span className="text-yellow">{highlightWord}</span>
          {subtitleParts[1]}
        </p>
      </div>

      {/* Large video poster with play button */}
      <div className="hero-video-wrapper">
        <div className="hero-video-box" onClick={() => setPlay(true)}>
          <img
            src="https://i.ytimg.com/vi/SUbnWx93k8c/maxresdefault.jpg"
            alt="Daga Media Video Preview"
            className="hero-video-poster"
          />

          <div className="hero-play-btn">
            <svg viewBox="0 0 24 24" fill="white" width="50" height="50">
              <polygon points="8,5 20,12 8,19" />
            </svg>
          </div>
        </div>
      </div>

      {/* Fullscreen Premium Lightbox Modal */}
      {play &&
        createPortal(
          <div className="cube-lightbox-modal" onClick={() => setPlay(false)}>
            <button
              className="cube-lightbox-close"
              onClick={() => setPlay(false)}
              aria-label="Cerrar reproductor"
            >
              ✕
            </button>

            <div
              className="cube-lightbox-content"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="cube-lightbox-video-wrapper">
                <iframe
                  src="https://www.youtube-nocookie.com/embed/SUbnWx93k8c?autoplay=1&controls=0&modestbranding=1&rel=0&iv_load_policy=3"
                  title="Dagamedia Trailer"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}

export default Home;