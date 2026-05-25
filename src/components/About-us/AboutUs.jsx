import React from 'react';
import './AboutUs.css';

function AboutUs() {
  return (
    <section className="about-section">
      
      {/* 2. Encabezado principal centrado */}
      <div className="about-main-header">
        <h1>The <span className="highlight-orange">Daga</span>media Team</h1>
        <p className="about-lead-text">
          Our team is composed of an interdisciplinary group, including illustrators, modelers, animators, composers, and we have a fascinating stock of voices.
        </p>
      </div>

      {/* 3. El contenedor maestro con CSS Grid Asimétrico */}
      <div className="about-layout-grid">
        
        {/* Bloque: Directing Projects (Texto Izquierda) */}
        <div className="grid-area-text-left">
          <div className="text-block">
            <h2>Directing projects</h2>
            <p>
              Graphic designers passionate about animation and creative productions, Edison and Diego Yaya founded Dagamedia in 2009. Since then, they have been dedicated to telling their own stories through animation and creating productions for companies and institutions in need. They continue to shape their future in the world of animation as an animation film company.
            </p>
          </div>
        </div>

        {/* Bloque: Las 4 imágenes del Soldado (Abajo a la izquierda) */}
        <div className="grid-area-sketches">
          <div className="sketches-grid">
            <img src="https://via.placeholder.com/300" alt="Sketch 1" />
            <img src="https://via.placeholder.com/300" alt="Sketch 2" />
            <img src="https://via.placeholder.com/300" alt="Sketch 3" />
            <img src="https://via.placeholder.com/300" alt="Sketch 4" />
          </div>
        </div>

        {/* Bloque: Tarjetas de Personajes (Arriba a la derecha) */}
        <div className="grid-area-characters">
          <div className="character-cards-wrapper">
            <div className="character-card">
              <img src="https://via.placeholder.com/220x300" alt="Zoe Character" />
            </div>
            <div className="character-card">
              <img src="https://via.placeholder.com/220x300" alt="Poblador Character" />
            </div>
          </div>
        </div>

        {/* Bloque: We are a 3D-2D... (Abajo a la derecha) */}
        <div className="grid-area-text-right">
          <div className="text-block text-center">
            <h2>We are a 3D-2D animation company</h2>
            <p>
              We have dedicated several years of our creative activity to improve our processes and envision our future as an animation film production company. This includes the production of short films and feature films where we can bring our stories to life and share with audiences everything we have in mind.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}

export default AboutUs;