import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        
        {/* COLUMNA IZQUIERDA: Redes y Móvil */}
        <div className="footer-left">
          <div className="social-media-icons">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="social-btn facebook">f</a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="social-btn instagram">📷</a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer" className="social-btn youtube">▶</a>
            <a href="https://x.com" target="_blank" rel="noreferrer" className="social-btn x-twitter">X</a>
          </div>
          <div className="phone-info">
            <span className="phone-label">Móvil</span>
            <span className="phone-numbers">+57 3112225433 / +57 3112225455</span>
          </div>
        </div>

        {/* COLUMNA CENTRAL: Copyright */}
        <div className="footer-center">
          <p>Copyright © 2026 Dagamedia</p>
        </div>

        {/* COLUMNA DERECHA: Logo temporal y Dirección */}
        <div className="footer-right">
          <div className="logo-brand">
            {/* Usamos un texto o un placeholder para que no falle por si falta la imagen */}
            <span style={{ color: '#FF6B00', fontWeight: 'bold', fontSize: '1.5rem' }}>dagamedia</span>
          </div>
          <p className="address-text">Calle 68 6-66 Tunja – Boyacá – Colombia</p>
        </div>

      </div>
    </footer>
  );
}

export default Footer;