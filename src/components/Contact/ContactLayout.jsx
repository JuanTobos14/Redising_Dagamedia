import { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import StandardForm from './StandardForm';
import WorkWithUsForm from './WorkWithUsForm';
import styles from './Contact.module.css';

const FORMS = [
  {
    id: 'standard',
    labelKey: 'contact_tab_contact',
    subtitleKey: 'contact_sub_contact',
    Component: StandardForm,
  },
  {
    id: 'work',
    labelKey: 'contact_tab_work',
    subtitleKey: 'contact_sub_work',
    Component: WorkWithUsForm,
  },
];

const MAP_TITLE = 'Dagamedia Office Map';

const MAP_SRC =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3971.2847522502677!2d-73.3419956!3d5.5732819!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e6a7c762797ec35%3A0x4dd06b9858acbe6c!2sDagamedia!5e0!3m2!1ses-419!2sco!4v1716300000000!5m2!1ses-419!2sco';

function getFormIndex(formId) {
  const index = FORMS.findIndex((form) => form.id === formId);
  return index >= 0 ? index : 0;
}

function getPreviousFormId(formId) {
  const currentIndex = getFormIndex(formId);
  const previousIndex = currentIndex === 0 ? FORMS.length - 1 : currentIndex - 1;

  return FORMS[previousIndex].id;
}

function getNextFormId(formId) {
  const currentIndex = getFormIndex(formId);
  const nextIndex = currentIndex === FORMS.length - 1 ? 0 : currentIndex + 1;

  return FORMS[nextIndex].id;
}

function getDirection(currentFormId, targetFormId) {
  const currentIndex = getFormIndex(currentFormId);
  const targetIndex = getFormIndex(targetFormId);

  if (targetIndex > currentIndex) return 'next';
  if (targetIndex < currentIndex) return 'previous';

  return 'idle';
}

function ContactTextSwitcher({
  activeFormId,
  transitionDirection,
  onPreviousForm,
  onNextForm,
}) {
  const { t } = useLanguage();

  const activeForm = FORMS[getFormIndex(activeFormId)];
  const previousForm = FORMS[getFormIndex(getPreviousFormId(activeFormId))];
  const nextForm = FORMS[getFormIndex(getNextFormId(activeFormId))];

  const transitionClass =
    transitionDirection === 'previous'
      ? styles['switch-previous']
      : transitionDirection === 'next'
        ? styles['switch-next']
        : '';

  return (
    <div
      key={`${activeFormId}-${transitionDirection}`}
      className={`${styles['contact-switcher-row']} ${transitionClass}`}
      aria-label="Selector de formulario"
    >
      <button
        type="button"
        className={`${styles['switcher-arrow']} ${styles['switcher-arrow-left']}`}
        onClick={onPreviousForm}
        aria-label={`Cambiar a ${t(previousForm.labelKey)}`}
        data-cursor="Cambiar"
      >
        ‹
      </button>

      <div className={styles['contact-text-switcher']}>
        <button
          type="button"
          className={`${styles['switcher-item']} ${styles['switcher-side']} ${styles['switcher-left']}`}
          onClick={onPreviousForm}
          aria-label={`Cambiar a ${t(previousForm.labelKey)}`}
          data-cursor="Cambiar"
        >
          {t(previousForm.labelKey)}
        </button>

        <button
          type="button"
          className={`${styles['switcher-item']} ${styles['switcher-active']}`}
          onClick={onNextForm}
          aria-label={`Formulario actual: ${t(activeForm.labelKey)}. Cambiar al siguiente.`}
          data-cursor="Cambiar"
        >
          {t(activeForm.labelKey)}
        </button>

        <button
          type="button"
          className={`${styles['switcher-item']} ${styles['switcher-side']} ${styles['switcher-right']}`}
          onClick={onNextForm}
          aria-label={`Cambiar a ${t(nextForm.labelKey)}`}
          data-cursor="Cambiar"
        >
          {t(nextForm.labelKey)}
        </button>
      </div>

      <button
        type="button"
        className={`${styles['switcher-arrow']} ${styles['switcher-arrow-right']}`}
        onClick={onNextForm}
        aria-label={`Cambiar a ${t(nextForm.labelKey)}`}
        data-cursor="Cambiar"
      >
        ›
      </button>
    </div>
  );
}

function ContactDots({ activeFormId, onSelectForm }) {
  const { t } = useLanguage();

  return (
    <div className={styles['contact-pagination']} aria-label="Selector de formulario">
      {FORMS.map((form) => {
        const selected = form.id === activeFormId;

        return (
          <button
            key={form.id}
            type="button"
            className={`${styles['pagination-dot']} ${selected ? styles.activeDot : ''}`}
            onClick={() => onSelectForm(form.id)}
            aria-label={`Cambiar a ${t(form.labelKey)}`}
            aria-pressed={selected}
            data-cursor="Cambiar"
          />
        );
      })}
    </div>
  );
}

function ContactMap() {
  return (
    <div className={styles['contact-map-container']}>
      <iframe
        src={MAP_SRC}
        width="100%"
        height="100%"
        className={styles['contact-map-frame']}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title={MAP_TITLE}
      />
    </div>
  );
}

export default function ContactLayout({ activeForm, onChangeActiveForm }) {
  const { t } = useLanguage();
  const [transitionDirection, setTransitionDirection] = useState('idle');

  const activeIndex = getFormIndex(activeForm);
  const activeFormConfig = FORMS[activeIndex];
  const ActiveFormComponent = activeFormConfig.Component;

  const handleSelectForm = (targetFormId) => {
    if (targetFormId === activeFormConfig.id) return;

    setTransitionDirection(getDirection(activeFormConfig.id, targetFormId));
    onChangeActiveForm(targetFormId);
  };

  const handlePreviousForm = () => {
    const previousFormId = getPreviousFormId(activeFormConfig.id);

    setTransitionDirection('previous');
    onChangeActiveForm(previousFormId);
  };

  const handleNextForm = () => {
    const nextFormId = getNextFormId(activeFormConfig.id);

    setTransitionDirection('next');
    onChangeActiveForm(nextFormId);
  };

  return (
    <div className={styles['contact-container']}>
      <h2 className="section-label">{t('contact_title')}</h2>

      <ContactTextSwitcher
        activeFormId={activeFormConfig.id}
        transitionDirection={transitionDirection}
        onPreviousForm={handlePreviousForm}
        onNextForm={handleNextForm}
      />

      <p
        key={`${activeFormConfig.id}-subtitle`}
        className={`${styles['contact-subtitle']} text-normal`}
      >
        {t(activeFormConfig.subtitleKey)}
      </p>

      <div className={styles['contact-grid']}>
        <ContactMap />

        <main key={activeFormConfig.id} className={styles['contact-content']}>
          <ActiveFormComponent />
        </main>
      </div>

      <ContactDots
        activeFormId={activeFormConfig.id}
        onSelectForm={handleSelectForm}
      />
    </div>
  );
}