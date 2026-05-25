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
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3971.2847522502677!2d-73.3419956!3d5.5732819!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e6a7c762797ec35%3A0x4dd06b9858acbe6c!2sDagamedia!5e0!3m2!1ses-419!2sco!4v1716300000000!5m2!1ses-419!2sco"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Dagamedia Office Map"
        ></iframe>
      </div>
    </div>
  );
}

