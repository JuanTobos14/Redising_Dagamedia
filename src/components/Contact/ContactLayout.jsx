import React, { useState } from 'react';
import StandardForm from './StandardForm';
import WorkWithUsForm from './WorkWithUsForm';
import './Contact.css';

export default function ContactLayout({ activeForm = 'standard' }) {
  const [currentForm, setCurrentForm] = useState(activeForm);

  return (
    <div className="contact-container">
      {/* Header Tabs Toggle */}
      <header className="contact-tabs">
        <button 
          type="button" 
          className={`contact-tab ${currentForm === 'standard' ? 'active' : ''}`}
          onClick={() => setCurrentForm('standard')}
        >
          {currentForm === 'standard' && <span className="tab-bullet">● </span>}
          {currentForm === 'work' && <span className="tab-arrow">◀ </span>}
          Contact
        </button>
        
        <button 
          type="button" 
          className={`contact-tab ${currentForm === 'work' ? 'active' : ''}`}
          onClick={() => setCurrentForm('work')}
        >
          Work whit us
          {currentForm === 'work' && <span className="tab-bullet"> ●</span>}
          {currentForm === 'standard' && <span className="tab-arrow"> ▶</span>}
        </button>
      </header>

      {/* Subtitle */}
      <p className="contact-subtitle">
        {currentForm === 'work' 
          ? "Join us!" 
          : "If you have a question or wish to contact us"
        }
      </p>

      {/* Form Content */}
      <main className="contact-content">
        {currentForm === 'work' ? (
          <WorkWithUsForm />
        ) : (
          <StandardForm />
        )}
      </main>

      {/* Dot Pagination Selector */}
      <div className="contact-pagination">
        <span 
          className={`pagination-dot ${currentForm === 'standard' ? 'active' : ''}`}
          onClick={() => setCurrentForm('standard')}
          title="Contact Form"
        />
        <span 
          className={`pagination-dot ${currentForm === 'work' ? 'active' : ''}`}
          onClick={() => setCurrentForm('work')}
          title="Work with us Form"
        />
      </div>

      {/* Google Map Section */}
      <div className="contact-map-container">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3971.2847522502677!2d-73.35246752538183!3d5.541334833890253!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e6a7c385fb9893d%3A0x6b4efd559868bfad!2sLos%20Muiscas%2C%20Tunja%2C%20Boyaca%2C%20Colombia!5e0!3m2!1sen!2sco!4v1716300000000!5m2!1sen!2sco"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Dagamedia Office Map"
        ></iframe>
      </div>

      {/* Footer Section */}
      <footer className="contact-footer">
        <div className="footer-left">
          <div className="social-links">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Facebook">
              <svg viewBox="0 0 24 24">
                <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z"/>
              </svg>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Instagram">
              <svg viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
              </svg>
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="YouTube">
              <svg viewBox="0 0 24 24">
                <path d="M23.498 6.163a3.003 3.003 0 00-2.11-2.11C19.518 3.545 12 3.545 12 3.545s-7.518 0-9.388.508a3.003 3.003 0 00-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 002.11 2.11c1.87.508 9.388.508 9.388.508s7.518 0 9.388-.508a3.003 3.003 0 002.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="LinkedIn">
              <svg viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>
          </div>
          <div className="phone-info">
            <span className="phone-label">Móvil</span>
            <span className="phone-numbers">+57 3112225433 / +57 3112225455</span>
          </div>
        </div>

        <div className="footer-center">
          Copyright © 2026 Dagamedia
        </div>

        <div className="footer-right">
          <div className="footer-logo">
            {/* Custom stylized play-loop SVG logo */}
            <svg className="logo-icon-svg" viewBox="0 0 32 32">
              <path fill="#FF6B00" d="M16 2C8.268 2 2 8.268 2 16s6.268 14 14 14 14-6.268 14-14S23.732 2 16 2zm0 24c-5.523 0-10-4.477-10-10S10.477 6 16 6s10 4.477 10 10-4.477 10-10 10z"/>
              <path fill="#FFC502" d="M13 11l8 5-8 5V11z"/>
            </svg>
            <div className="logo-text-wrapper">
              <span className="logo-main-text">dagamedia</span>
              <span className="logo-sub-text">AUDIOVISUALES S.A.S.</span>
            </div>
          </div>
          <div className="footer-address">
            Calle 68 6-66 Tunja – Boyacá – Colombia
          </div>
        </div>
      </footer>
    </div>
  );
}

