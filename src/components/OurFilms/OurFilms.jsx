import React from 'react';
import "./OurFilms.css";

// Importaciones de imágenes de la Galería Superior
import viejaImg from "../../assets/Vieja.png";
import osoImg from "../../assets/Oso.png";
import hombreSiCamisaImg from "../../assets/Hombre si camisa.png";

// Importaciones de imágenes de la Sección Tundama (Fila asimétrica)
import dibujoLapizImg from "../../assets/Dibujo-lapiz.jpg";
import tundamaInfoImg from "../../assets/Tundama.png";
import premiosHonorImg from "../../assets/Premios de honor.png";
import tundamaPosterImg from "../../assets/Tundama-Poster.jpg";

// Importación de imagen para el Tráiler
import trailerPreviewImg from "../../assets/Hombre alza una vara.png";

function OurFilms() {
  return (
    <section className="our-films">
      <h2 className="our-films-label">Our Films</h2>

      <div className="our-films-header">
        <h3>
          We invite you to <br />
          watch our selection.
        </h3>
        <p>
          Some of our <span>short films</span> are about to premiere, while
          others are still in progress. We present them to you.
        </p>
      </div>

      {/* Galería superior */}
      <div className="our-films-gallery">
        <div className="gallery-item">
          <img src={viejaImg} alt="Anciana junto al fuego" />
        </div>
        <div className="gallery-item">
          <img src={osoImg} alt="Oso en la cascada" />
        </div>
        <div className="gallery-item">
          <img src={hombreSiCamisaImg} alt="Guerrero de frente" />
        </div>
      </div>

      {/* Bloque Central Especial Tundama */}
      <div className="tundama-grid-container">
        <div className="tundama-card-boceto">
          <img src={dibujoLapizImg} alt="Boceto a lápiz Tundama" />
        </div>
        
        {/* Columna Central Organizada por Filas de Contenido */}
        <div className="tundama-card-info">
          <img src={tundamaInfoImg} className="tundama-logo-main" alt="Logo oficial Tundama" />
          
          <p className="tundama-text-top">
            We premiered in commercial movie theaters in Colombia in 2021 and in
            Spain in February 2022, soon to be available on digital platforms.
          </p>
          
          <img src={premiosHonorImg} className="tundama-premios" alt="Premios de honor Tundama" />
          
          <p className="tundama-text-bottom">
            Tundama is the first film that rescues the Muisca language from central
            Colombia, declared extinct since the 18th century.
          </p>
        </div>
        
        <div className="tundama-card-poster">
          <img src={tundamaPosterImg} alt="Póster oficial Tundama" />
        </div>
      </div>

      {/* Sección del Tráiler Oficial */}
      <div className="trailer-section">
        <h3 className="trailer-title">
          We present to you the official trailer.
        </h3>

        <div className="trailer-video">
          <img src={trailerPreviewImg} alt="Escena oficial del tráiler" />
          <button className="trailer-play" aria-label="Play trailer">
            <svg viewBox="0 0 24 24" className="play-svg-icon">
              <path d="M8 5v14l11-7z" />
            </svg>
          </button>
        </div>

        <p className="trailer-description">
          At the beginning of the 16th century, a brave chieftain confronts the
          devastating arrival of the Spanish to his territories. Two children
          searching for their kidnapped sister find themselves in the midst of
          this clash of cultures, triggering battles where feelings and acts of
          bravery, betrayal, love, and greed are uncovered.
        </p>
      </div>
    </section>
  );
}

export default OurFilms;