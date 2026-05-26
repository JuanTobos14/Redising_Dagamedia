import { useState } from "react";

import "./WhatDoWeDo.css";

// Sección What We Do
const WhatDoWeDo = () => {

  // Estado de sección activa
  const [currentSection, setCurrentSection] =
    useState("2d");

  return (
    <section className="whatwedo">

      {/* Encabezado */}
      <div className="whatwedo-header">

        <span className="whatwedo-tag">
          WHAT DO WE DO?
        </span>

        <h2 className="whatwedo-title">
          2D & 3D Animation
        </h2>

        <p className="whatwedo-description">
          We create animated stories with cinematic quality,
          combining creativity, visual development and
          audiovisual production.
        </p>

      </div>

      {/* Tabs */}
      <div className="whatwedo-tabs">

        {/* Tab 2D */}
        <button
          type="button"
          className={`whatwedo-tab ${
            currentSection === "2d"
              ? "active"
              : ""
          }`}
          onClick={() =>
            setCurrentSection("2d")
          }
        >

          {currentSection === "2d" && (
            <span className="tab-bullet">
              ●
            </span>
          )}

          {currentSection === "3d" && (
            <span className="tab-arrow">
              ◀
            </span>
          )}

          2D Animation

        </button>

        {/* Tab 3D */}
        <button
          type="button"
          className={`whatwedo-tab ${
            currentSection === "3d"
              ? "active"
              : ""
          }`}
          onClick={() =>
            setCurrentSection("3d")
          }
        >

          3D Animation

          {currentSection === "3d" && (
            <span className="tab-bullet">
              ●
            </span>
          )}

          {currentSection === "2d" && (
            <span className="tab-arrow">
              ▶
            </span>
          )}

        </button>

      </div>

      {/* Contenido */}
      <div className="whatwedo-content-wrapper">

        {/* Sección 2D */}
        {currentSection === "2d" && (

          <div className="whatwedo-card fade-in">

            {/* Imagen GIF */}
            <div className="whatwedo-image">

              <img
                src="/images/Boceto-Businessman_1.gif"
                alt="2D Animation"
              />

            </div>

            {/* Contenido */}
            <div className="whatwedo-content">

              <h3>2D Animation</h3>

              <p>
                Traditional and digital animation with expressive
                characters, cinematic storytelling and creative
                visual development.
              </p>

              {/* Tags */}
              <div className="whatwedo-tags">

                <span className="service-tag">
                  Storytelling
                </span>

                <span className="service-tag">
                  Character Design
                </span>

                <span className="service-tag">
                  Frame by Frame
                </span>

              </div>

            </div>

          </div>

        )}

        {/* Sección 3D */}
        {currentSection === "3d" && (

          <a
            className="whatwedo-card video-card fade-in"
            href="https://youtu.be/RQFsIshO7gE?si=xZtoaMVTrB8YFCdp"
            target="_blank"
            rel="noopener noreferrer"
          >

            {/* Thumbnail */}
            <div className="whatwedo-image">

              <img
                src="/images/3d-animacion-home_optimizada.jpg"
                alt="3D Animation"
              />

              {/* Overlay oscuro */}
              <div className="video-overlay"></div>

              {/* Botón play */}
              <div className="play-button">
                ▶
              </div>

            </div>

            {/* Contenido */}
            <div className="whatwedo-content">

              <h3>3D Animation</h3>

              <p>
                High-end cinematic production, 3D environments,
                rendering and immersive animated storytelling.
              </p>

              {/* Tags */}
              <div className="whatwedo-tags">

                <span className="service-tag">
                  Rendering
                </span>

                <span className="service-tag">
                  VFX
                </span>

                <span className="service-tag">
                  Cinematic
                </span>

              </div>

            </div>

          </a>

        )}

      </div>

      {/* Paginación */}
      <div className="whatwedo-pagination">

        <button
          type="button"
          className={`pagination-dot ${
            currentSection === "2d"
              ? "active"
              : ""
          }`}
          onClick={() =>
            setCurrentSection("2d")
          }
        />

        <button
          type="button"
          className={`pagination-dot ${
            currentSection === "3d"
              ? "active"
              : ""
          }`}
          onClick={() =>
            setCurrentSection("3d")
          }
        />

      </div>

    </section>
  );
};

export default WhatDoWeDo;