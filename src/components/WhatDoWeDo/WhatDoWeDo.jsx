import { useState } from "react";
import { useTranslation } from "react-i18next";
import "./WhatDoWeDo.css";

// Imágenes
import Boceto from "../../assets/Boceto-Businessman_1.gif";
import video_niños from "../../assets/3d-video-niños.jpg";
import video_bicicleta from "../../assets/3d-video-bicicleta.png";
import video_cerdos from "../../assets/3d-video-cerdos.png";
import video_oso from "../../assets/3d-video-oso.png";
import video_quesoPaipa from "../../assets/3d-video-quesoPaipa.png";
import video_venaBoyaca from "../../assets/3d-video-venaBoyaca.png";

// Sección What We Do
function WhatDoWeDo() {
  const { t } = useTranslation();

  // Estado de sección activa
  const [currentSection, setCurrentSection] = useState("2d");

  return (
    <section className="whatwedo">

      {/* Encabezado */}
      <div className="whatwedo-header">

        {/* Etiqueta superior */}
        <span className="whatwedo-tag">
          {t("whatWeDo.tag", "What do we do?")}
        </span>

        {/* Tabs de navegación */}
        <div className="whatwedo-tabs">

          {/* Tab 2D */}
          <button
            type="button"
            className={`whatwedo-tab ${currentSection === "2d" ? "active" : ""}`}
            onClick={() => setCurrentSection("2d")}
          >
            {currentSection === "2d" && <span className="tab-bullet">●</span>}
            {currentSection === "3d" && <span className="tab-arrow">◀</span>}
            {t("whatWeDo.animation2d.title", "2D Animation")}
          </button>

          {/* Tab 3D */}
          <button
            type="button"
            className={`whatwedo-tab ${currentSection === "3d" ? "active" : ""}`}
            onClick={() => setCurrentSection("3d")}
          >
            {t("whatWeDo.animation3d.title", "3D Animation")}
            {currentSection === "3d" && <span className="tab-bullet">●</span>}
            {currentSection === "2d" && <span className="tab-arrow">▶</span>}
          </button>

        </div>

        {/* Descripción según sección activa */}
        <p className="whatwedo-description">
          {currentSection === "2d"
            ? t("whatWeDo.animation2d.intro", "We are passionate about drawing and the wonderful expression that traditional 2D animation provides us.")
            : t("whatWeDo.animation3d.intro", "Our favorite technique is 3D animation, ideal for creating stories in short, medium, and feature-length formats.")}
        </p>

      </div>

      {/* Contenido */}
      <div className="whatwedo-content-wrapper">

        {/* Sección 2D */}
        {currentSection === "2d" && (
          <div className="whatwedo-card whatwedo-card--2d fade-in">

            {/* Imagen / GIF */}
            <div className="whatwedo-image">
              <img
                src={Boceto}
                alt="2D Animation" />
            </div>

            {/* Texto 2D */}
            <div className="whatwedo-text">
              <h3>{t("whatWeDo.animation2d.subtitle", "Drawing sequences is fun")}</h3>
              <p>
                {t(
                  "whatWeDo.animation2d.description",
                  "This technique allows us absolute freedom in creating sequences. Just as traditional animators work with pencil and paper, drawing frame by frame, we digitally recreate that process. It requires a lot of dedication, but the result is fantastic."
                )}
              </p>
            </div>

          </div>
        )}

        {/* Sección 3D */}
        {currentSection === "3d" && (
          <div className="whatwedo-card whatwedo-card--3d fade-in">

            {/* Texto 3D */}
            <div className="whatwedo-text">
              <h3>{t("whatWeDo.animation3d.subtitle", "Short animated films in 3D")}</h3>
              <p>
                {t(
                  "whatWeDo.animation3d.description",
                  "Our favorite technique is 3D animation. With it, we can tell your stories in short, medium, and feature-length pieces, ideal for promoting brands or ideas with a significant impact in commercials for TV and cinema, short films for screening in theaters and platforms, or feature films for theaters and the internet."
                )}
              </p>
            </div>

            <div className="whatwedo-grid">

              {/* Miniatura 1*/}
              <div className="video-thumb">
                <a href="https://youtu.be/RQFsIshO7gE?si=xZtoaMVTrB8YFCdp"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="video-thumb">
                    <img src={video_niños} alt="3D Film 1" />
                </a>
              </div>

              {/* Miniatura 2*/}
              <div className="video-thumb">
                <a href="https://youtu.be/4HZfzn7s_Pw?si=_74i0H6k_pYDnF2E" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="video-thumb">
                    <img src={video_bicicleta} alt="3D Film 2" />
                </a>
              </div>

              {/* Miniatura 3*/}
              <div className="video-thumb">
                <a href="https://youtu.be/HVHsgO69FSA?si=UWlsN6Aa8GK9JzdA" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="video-thumb">
                    <img src={video_cerdos} alt="3D Film 3" />
                </a>
              </div>

              {/* Miniatura 4*/}
              <div className="video-thumb">
                <a href="https://www.youtube.com/watch?v=ohnGoV38SB4"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="video-thumb">
                    <img src={video_oso} alt="3D Film 4" />
                </a>
              </div>

              {/* Miniatura 5*/}
              <div className="video-thumb">
                <a href="" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="video-thumb">
                    <img src={video_quesoPaipa} alt="3D Film 5" />
                </a>
              </div>

              {/* Miniatura 6*/}
              <div className="video-thumb">
                <a href="" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="video-thumb">
                    <img src={video_venaBoyaca} alt="3D Film 6" />
                </a>
              </div>

            </div>

          </div>
        )}

      </div>

      {/* Paginación */}
      <div className="whatwedo-pagination">

        <button
          type="button"
          className={`pagination-dot ${currentSection === "2d" ? "active" : ""}`}
          onClick={() => setCurrentSection("2d")} />

        <button
          type="button"
          className={`pagination-dot ${currentSection === "3d" ? "active" : ""}`}
          onClick={() => setCurrentSection("3d")} />

      </div>

    </section>
  );
}

export default WhatDoWeDo;