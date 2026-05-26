import React, { useState, useEffect } from 'react';
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
      {/* Phrase/Title Section */}
      <div className="phrase-section">
        <h1 className="home-title">{t('home_title')}</h1>
        <h2 className="home-subtitle">{t('home_subtitle')}</h2>
        <p className="home-creativity-text">
          <strong>{t('home_creativity')}</strong> — {t('home_look_productions')}
        </p>
      </div>

      {/* Main Video Wrapper */}
      <div className="video-main-wrapper">
        <div className="video-player-box">
          <div className="video-poster-wrapper" onClick={() => setPlay(true)}>
            <div className="play-icon-center">
              <div className="triangle"></div>
            </div>
            <img 
              src="https://img.youtube.com/vi/SUbnWx93k8c/maxresdefault.jpg" 
              alt="Daga Media Video Preview" 
              className="video-poster"
            />
          </div>
        </div>
      </div>

      {/* Fullscreen Premium Lightbox Modal for trailer playback */}
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