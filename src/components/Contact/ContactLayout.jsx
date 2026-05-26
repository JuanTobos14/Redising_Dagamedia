import  { useState } from 'react';
import { useTranslation } from 'react-i18next';

import StandardForm from './StandardForm';
import WorkWithUsForm from './WorkWithUsForm';

import './Contact.css';

export default function ContactLayout({
  activeForm = 'standard'
}) {
  const { t } = useTranslation();

  const [currentForm, setCurrentForm] = useState(activeForm);

  return (
    <div className="contact-container">

      {/* Tabs */}
      <header className="contact-tabs">

        <button
          type="button"
          className={`contact-tab ${
            currentForm === 'standard' ? 'active' : ''
          }`}
          onClick={() => setCurrentForm('standard')}
        >
          {currentForm === 'standard' && (
            <span className="tab-bullet">● </span>
          )}

          {currentForm === 'work' && (
            <span className="tab-arrow">◀ </span>
          )}

          {t('contact.tabs.contact')}
        </button>

        <button
          type="button"
          className={`contact-tab ${
            currentForm === 'work' ? 'active' : ''
          }`}
          onClick={() => setCurrentForm('work')}
        >
          {t('contact.tabs.workWithUs')}

          {currentForm === 'work' && (
            <span className="tab-bullet"> ●</span>
          )}

          {currentForm === 'standard' && (
            <span className="tab-arrow"> ▶</span>
          )}
        </button>

      </header>

      {/* Subtitle */}
      <p className="contact-subtitle">
        {currentForm === 'work'
          ? t('contact.subtitle.work')
          : t('contact.subtitle.standard')}
      </p>

      {/* Form Content */}
      <main className="contact-content">
        {currentForm === 'work' ? (
          <WorkWithUsForm />
        ) : (
          <StandardForm />
        )}
      </main>

      {/* Pagination */}
      <div className="contact-pagination">

        <button
          type="button"
          className={`pagination-dot ${
            currentForm === 'standard' ? 'active' : ''
          }`}
          onClick={() => setCurrentForm('standard')}
          aria-label={t('contact.pagination.contact')}
          title={t('contact.pagination.contact')}
        />

        <button
          type="button"
          className={`pagination-dot ${
            currentForm === 'work' ? 'active' : ''
          }`}
          onClick={() => setCurrentForm('work')}
          aria-label={t('contact.pagination.work')}
          title={t('contact.pagination.work')}
        />

      </div>

      {/* Google Map */}
      <div className="contact-map-container">
        <iframe
          title="Dagamedia Office Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3971.2847522502677!2d-73.35246752538183!3d5.541334833890253!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e6a7c385fb9893d%3A0x6b4efd559868bfad!2sLos%20Muiscas%2C%20Tunja%2C%20Boyaca%2C%20Colombia!5e0!3m2!1sen!2sco!4v1716300000000!5m2!1sen!2sco"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>

    </div>
  );
}