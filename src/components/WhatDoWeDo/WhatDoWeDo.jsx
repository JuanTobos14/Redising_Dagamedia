import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import './WhatDoWeDo.css';

function WhatDoWeDo() {
  const { t } = useLanguage();

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Max tilt angle in degrees
    const maxTilt = 18;
    const rotateY = ((x - centerX) / centerX) * maxTilt;
    const rotateX = -((y - centerY) / centerY) * maxTilt;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.04, 1.04, 1.04)`;
    
    const shine = card.querySelector('.card-shine');
    if (shine) {
      const shineX = (x / rect.width) * 100;
      const shineY = (y / rect.height) * 100;
      shine.style.background = `radial-gradient(circle at ${shineX}% ${shineY}%, rgba(255, 255, 255, 0.16) 0%, rgba(255, 255, 255, 0) 65%)`;
    }
  };

  const handleMouseLeave = (e) => {
    const card = e.currentTarget;
    card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    const shine = card.querySelector('.card-shine');
    if (shine) {
      shine.style.background = 'transparent';
    }
  };

  return (
    <section className="what-we-do reveal-on-scroll" id="servicios">
      <div className="what-we-do-title-wrap">
        <h2 className="what-we-do-title">{t('services_title')}</h2>
      </div>

      {/* Fila 1: Imagen Izquierda, Texto Derecha */}
      <div className="service-row">
        <div 
          className="service-image tilt-card"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <div className="card-shine" />
          <img 
            src="https://dagamedia.com/wp-content/uploads/2021/02/animacion-2d.jpg" 
            alt="Animación 2D Dagamedia" 
          />
        </div>
        <div className="service-info">
          <h3>{t('services_2d_title')}</h3>
          <p>{t('services_2d_desc')}</p>
        </div>
      </div>

      {/* Fila 2: Texto Izquierda, Imagen Derecha (usamos la clase 'reverse') */}
      <div className="service-row reverse">
        <div 
          className="service-image tilt-card"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <div className="card-shine" />
          <img 
            src="https://dagamedia.com/wp-content/uploads/2021/02/animacion-3d.jpg" 
            alt="Animación 3D Dagamedia" 
          />
        </div>
        <div className="service-info">
          <h3>{t('services_3d_title')}</h3>
          <p>{t('services_3d_desc')}</p>
        </div>
      </div>
    </section>
  );
}

export default WhatDoWeDo;