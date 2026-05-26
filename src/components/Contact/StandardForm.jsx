import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

export default function StandardForm() {
  const { t } = useLanguage();

  return (
    <form className="contact-form">
      <div className="form-group">
        <label htmlFor="name">
          {t('form_name')}
        </label>
        <input type="text" id="name" name="name" required />
      </div>
      <div className="form-group">
        <label htmlFor="email">
          {t('form_email')}
        </label>
        <input type="email" id="email" name="email" required />
      </div>
      <div className="form-group">
        <label htmlFor="contactNumber">{t('form_phone')}</label>
        <input type="tel" id="contactNumber" name="contactNumber" />
      </div>
      <div className="form-group">
        <label htmlFor="message">
          {t('form_message')}
        </label>
        <textarea id="message" name="message" required />
      </div>
      <button type="submit" className="submit-btn">{t('form_send')}</button>
    </form>
  );
}

