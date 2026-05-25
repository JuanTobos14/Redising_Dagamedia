import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './OurFilms.css';

function OurFilms() {
  const { t } = useTranslation();

  const films = [
    {
      id: 1,
      title: 'Tundama',
      poster: 'https://dagamedia.com/wp-content/uploads/2021/02/tundama-poster.jpg',
      label: t('films.labels.premiere')
    },
    {
      id: 2,
      title: 'Film 2',
      poster: 'https://dagamedia.com/wp-content/uploads/2021/02/tundama-poster.jpg',
      label: t('films.labels.popular')
    },
    {
      id: 3,
      title: 'Film 3',
      poster: 'https://dagamedia.com/wp-content/uploads/2021/02/tundama-poster.jpg',
      label: t('films.labels.classic')
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(1);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? films.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === films.length - 1 ? 0 : prev + 1));
  };

  const getPrevIndex = () => (currentIndex === 0 ? films.length - 1 : currentIndex - 1);
  const getNextIndex = () => (currentIndex === films.length - 1 ? 0 : currentIndex + 1);

  return (
    <section className="films-container">
      <h2 className="films-title">{t('films.title')}</h2>

      <div className="slider-wrapper">
        <button className="slider-arrow" onClick={handlePrev}>{"<"}</button>
        <div className="slider-content">
          <div className="film-mini">
            <img src={films[getPrevIndex()].poster} alt={films[getPrevIndex()].title} />
          </div>
          <div className="film-featured">
            <img src={films[currentIndex].poster} alt={films[currentIndex].title} />
            <div className="film-overlay">{films[currentIndex].label}</div>
          </div>
          <div className="film-mini">
            <img src={films[getNextIndex()].poster} alt={films[getNextIndex()].title} />
          </div>
        </div>
        <button className="slider-arrow" onClick={handleNext}>{">"}</button>
      </div>

      <div className="tundama-header">
        <h3>{films[currentIndex].title}</h3>
      </div>
      
      <div className="tundama-grid">
        <div className="grid-col poster">
          <img src={films[currentIndex].poster} alt={`${films[currentIndex].title} Poster`} />
        </div>

        <div className="grid-col info">
          <p>{t('films.tundama.description')}</p>
          <div className="video-placeholder">
            <span>{t('films.trailer')}</span>
          </div>
        </div>

        <div className="grid-col character">
          <img src="https://dagamedia.com/wp-content/uploads/2021/02/servicios-post.jpg" alt="Character Design" />
        </div>
      </div>
    </section>
  );
}

export default OurFilms;