import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useLanguage } from '../../context/LanguageContext';
import './Home.css';

function Home() {
  const [play, setPlay] = useState(false);
  const { t } = useLanguage();

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

  return (
    <div className="home-container reveal-on-scroll" id="inicio">
      {/* Hero text — "Creativity" big centered */}
      <div className="hero-text-block">
        <h1 className="hero-main-title">{t('home_creativity')}</h1>
        <p className="hero-subtitle">
          {t('home_look_productions').split('productions')[0]}
          <span className="text-yellow">productions</span>
        </p>
      </div>

      {/* Large video poster with play button */}
      <div className="hero-video-wrapper">
        <div className="hero-video-box" onClick={() => setPlay(true)}>
          <img 
            src="https://img.youtube.com/vi/SUbnWx93k8c/maxresdefault.jpg" 
            alt="Daga Media Video Preview" 
            className="hero-video-poster"
          />
          {/* Circular play button overlay */}
          <div className="hero-play-btn">
            <svg viewBox="0 0 24 24" fill="white" width="50" height="50">
              <polygon points="8,5 20,12 8,19" />
            </svg>
          </div>
        </div>
      </div>

      {/* Fullscreen Premium Lightbox Modal */}
      {play && createPortal(
        <div className="cube-lightbox-modal" onClick={() => setPlay(false)}>
          <button 
            className="cube-lightbox-close" 
            onClick={() => setPlay(false)}
            aria-label="Cerrar reproductor"
          >
            ✕
          </button>
          <div className="cube-lightbox-content" onClick={(e) => e.stopPropagation()}>
            <div className="cube-lightbox-video-wrapper">
              <iframe
                src="https://www.youtube.com/embed/SUbnWx93k8c?autoplay=1"
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