import { useLanguage } from '../../context/LanguageContext';
import StandardForm from './StandardForm';
import WorkWithUsForm from './WorkWithUsForm';
import './Contact.css';

export default function ContactLayout({ activeForm = 'standard', onChangeActiveForm }) {
  const { t } = useLanguage();
  const currentForm = activeForm;

  const setCurrentForm = (formType) => {
    if (onChangeActiveForm) {
      onChangeActiveForm(formType);
    }
  };

  return (
    <div className="contact-container">
      <header className="contact-tabs">
        <div className="contact-tab-dot" />

        <button
          type="button"
          className={`contact-tab subtitle-main ${currentForm === 'standard' ? 'active' : ''}`}
          onClick={() => setCurrentForm('standard')}
        >
          {t('contact_tab_contact')}
        </button>

        <button
          type="button"
          className={`contact-tab subtitle-main ${currentForm === 'work' ? 'active' : ''}`}
          onClick={() => setCurrentForm('work')}
        >
          {t('contact_tab_work')}
        </button>

        <button
          type="button"
          className="contact-tab-arrow"
          onClick={() => setCurrentForm(currentForm === 'standard' ? 'work' : 'standard')}
          aria-label="Cambiar formulario"
        >
          <svg viewBox="0 0 24 24" width="28" height="28">
            <polygon points="8,4 20,12 8,20" fill="currentColor" />
          </svg>
        </button>
      </header>

      <p className="contact-subtitle text-normal">
        {currentForm === 'work'
          ? t('contact_sub_work')
          : t('contact_sub_contact')}
      </p>

      <main className="contact-content">
        {currentForm === 'work' ? <WorkWithUsForm /> : <StandardForm />}
      </main>

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