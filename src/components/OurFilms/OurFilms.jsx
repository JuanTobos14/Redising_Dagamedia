import { useTranslation } from 'react-i18next';
import "./OurFilms.css";

// Imágenes Galería Superior
import viejaImg from "../../assets/Vieja.png";
import osoImg from "../../assets/Oso.png";
import hombreSiCamisaImg from "../../assets/Hombre si camisa.png";

// Imágenes Sección Tundama
import dibujoLapizImg from "../../assets/Dibujo-lapiz.jpg";
import tundamaInfoImg from "../../assets/Tundama.png";
import premiosHonorImg from "../../assets/Premios de honor.png";
import tundamaPosterImg from "../../assets/Tundama-Poster.jpg";

// Imagen Tráiler
import trailerPreviewImg from "../../assets/Hombre alza una vara.png";

function OurFilms() {
  const { t } = useTranslation();

  return (
    <section className="our-films">
      <h2 className="our-films-label">
        {t('films.title')}
      </h2>

      <div className="our-films-header">
        <h3>
          {t('films.headerTitleLine1')}
          <br />
          {t('films.headerTitleLine2')}
        </h3>

        <p>
          {t('films.headerDescription1')}{" "}
          <span>{t('films.shortFilms')}</span>{" "}
          {t('films.headerDescription2')}
        </p>
      </div>

      {/* Galería Superior */}
      <div className="our-films-gallery">
        <div className="gallery-item">
          <img
            src={viejaImg}
            alt={t('films.alt.oldWoman')}
            loading="lazy"
          />
        </div>

        <div className="gallery-item">
          <img
            src={osoImg}
            alt={t('films.alt.bear')}
            loading="lazy"
          />
        </div>

        <div className="gallery-item">
          <img
            src={hombreSiCamisaImg}
            alt={t('films.alt.warrior')}
            loading="lazy"
          />
        </div>
      </div>

      {/* Sección Tundama */}
      <div className="tundama-grid-container">
        <div className="tundama-card-boceto">
          <img
            src={dibujoLapizImg}
            alt={t('films.alt.sketch')}
            loading="lazy"
          />
        </div>

        <div className="tundama-card-info">
          <img
            src={tundamaInfoImg}
            className="tundama-logo-main"
            alt={t('films.alt.tundamaLogo')}
            loading="lazy"
          />

          <p className="tundama-text-top">
            {t('films.tundamaTopText')}
          </p>

          <img
            src={premiosHonorImg}
            className="tundama-premios"
            alt={t('films.alt.awards')}
            loading="lazy"
          />

          <p className="tundama-text-bottom">
            {t('films.tundamaBottomText')}
          </p>
        </div>

        <div className="tundama-card-poster">
          <img
            src={tundamaPosterImg}
            alt={t('films.alt.poster')}
            loading="lazy"
          />
        </div>
      </div>

      {/* Tráiler */}
      <div className="trailer-section">
        <h3 className="trailer-title">
          {t('films.trailerTitle')}
        </h3>

        <div className="trailer-video">
          <img
            src={trailerPreviewImg}
            alt={t('films.alt.trailerScene')}
            loading="lazy"
          />

          <button
            type="button"
            className="trailer-play"
            aria-label={t('films.playTrailer')}
          >
            <svg
              viewBox="0 0 24 24"
              className="play-svg-icon"
              aria-hidden="true"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </button>
        </div>

        <p className="trailer-description">
          {t('films.trailerDescription')}
        </p>
      </div>
    </section>
  );
}

export default OurFilms;