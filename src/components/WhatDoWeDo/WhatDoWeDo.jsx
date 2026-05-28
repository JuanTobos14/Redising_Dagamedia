import { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import VideoCube from '../VideoCube/VideoCube';
import { DEFAULT_SERVICE_ID, SERVICES } from '../../data/servicesData';
import styles from './WhatDoWeDo.module.css';

const MAX_TILT = 18;

function getServiceIndex(serviceId) {
  const index = SERVICES.findIndex((service) => service.id === serviceId);
  return index >= 0 ? index : 0;
}

function getServiceById(serviceId) {
  return SERVICES.find((service) => service.id === serviceId) || SERVICES[0];
}

function getPreviousServiceId(currentServiceId) {
  const currentIndex = getServiceIndex(currentServiceId);
  const previousIndex =
    currentIndex === 0 ? SERVICES.length - 1 : currentIndex - 1;

  return SERVICES[previousIndex].id;
}

function getNextServiceId(currentServiceId) {
  const currentIndex = getServiceIndex(currentServiceId);
  const nextIndex =
    currentIndex === SERVICES.length - 1 ? 0 : currentIndex + 1;

  return SERVICES[nextIndex].id;
}

function getDirection(currentServiceId, targetServiceId) {
  const currentIndex = getServiceIndex(currentServiceId);
  const targetIndex = getServiceIndex(targetServiceId);

  if (targetIndex > currentIndex) return 'next';
  if (targetIndex < currentIndex) return 'previous';

  return 'idle';
}

function getTiltTransform(eventTarget, mouseEvent) {
  const rect = eventTarget.getBoundingClientRect();

  const x = mouseEvent.clientX - rect.left;
  const y = mouseEvent.clientY - rect.top;

  const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * MAX_TILT;
  const rotateX = -((y - rect.height / 2) / (rect.height / 2)) * MAX_TILT;

  return {
    transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.04, 1.04, 1.04)`,
    shinePosition: `${(x / rect.width) * 100}% ${(y / rect.height) * 100}%`,
  };
}

function ServiceTextSwitcher({
  activeServiceId,
  transitionDirection,
  onPreviousService,
  onNextService,
}) {
  const { t } = useLanguage();

  const activeService = getServiceById(activeServiceId);
  const previousService = getServiceById(getPreviousServiceId(activeServiceId));
  const nextService = getServiceById(getNextServiceId(activeServiceId));

  const transitionClass =
    transitionDirection === 'previous'
      ? styles['switch-previous']
      : transitionDirection === 'next'
        ? styles['switch-next']
        : '';

  return (
    <div
      key={`${activeServiceId}-${transitionDirection}`}
      className={`${styles['wdwd-switcher-row']} ${transitionClass}`}
      aria-label="Selector de servicio"
    >
      <button
        type="button"
        className={`${styles['switcher-arrow']} ${styles['switcher-arrow-left']}`}
        onClick={onPreviousService}
        aria-label={`Cambiar a ${t(previousService.titleKey)}`}
        data-cursor="Cambiar"
      >
        ‹
      </button>

      <div className={styles['wdwd-text-switcher']}>
        <button
          type="button"
          className={`${styles['switcher-item']} ${styles['switcher-side']} ${styles['switcher-left']}`}
          onClick={onPreviousService}
          aria-label={`Cambiar a ${t(previousService.titleKey)}`}
          data-cursor="Cambiar"
        >
          {t(previousService.titleKey)}
        </button>

        <button
          type="button"
          className={`${styles['switcher-item']} ${styles['switcher-active']}`}
          onClick={onNextService}
          aria-label={`Servicio actual: ${t(activeService.titleKey)}. Cambiar al siguiente.`}
          data-cursor="Cambiar"
        >
          {t(activeService.titleKey)}
        </button>

        <button
          type="button"
          className={`${styles['switcher-item']} ${styles['switcher-side']} ${styles['switcher-right']}`}
          onClick={onNextService}
          aria-label={`Cambiar a ${t(nextService.titleKey)}`}
          data-cursor="Cambiar"
        >
          {t(nextService.titleKey)}
        </button>
      </div>

      <button
        type="button"
        className={`${styles['switcher-arrow']} ${styles['switcher-arrow-right']}`}
        onClick={onNextService}
        aria-label={`Cambiar a ${t(nextService.titleKey)}`}
        data-cursor="Cambiar"
      >
        ›
      </button>
    </div>
  );
}

function ServiceDots({ activeServiceId, onSelectService }) {
  const { t } = useLanguage();

  return (
    <div className={styles['wdwd-dots']} aria-label="Indicador de servicio">
      {SERVICES.map((service) => {
        const isActive = service.id === activeServiceId;

        return (
          <button
            key={service.id}
            type="button"
            className={`${styles['wdwd-dot']} ${isActive ? styles.activeDot : ''}`}
            onClick={() => onSelectService(service.id)}
            aria-label={`Cambiar a ${t(service.titleKey)}`}
            aria-pressed={isActive}
            data-cursor="Cambiar"
          />
        );
      })}
    </div>
  );
}

function ServiceMedia({ service }) {
  const { t } = useLanguage();
  const isImageService = service.type === 'image';

  const handleMouseMove = (event) => {
    if (!isImageService) return;

    const card = event.currentTarget;
    const shine = card.querySelector(`.${styles['card-shine']}`);
    const tilt = getTiltTransform(card, event);

    card.style.transform = tilt.transform;

    if (shine) {
      shine.style.background = `radial-gradient(circle at ${tilt.shinePosition}, var(--text-section-label) 0%, transparent 65%)`;
    }
  };

  const handleMouseLeave = (event) => {
    if (!isImageService) return;

    const card = event.currentTarget;
    const shine = card.querySelector(`.${styles['card-shine']}`);

    card.style.transform =
      'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';

    if (shine) {
      shine.style.background = 'transparent';
    }
  };

  return (
    <div
      className={`${styles['wdwd-image']} ${
        service.type === 'cube' ? styles['cube-card'] : styles['tilt-card']
      }`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      data-cursor={service.type === 'cube' ? 'Girar' : 'Ver'}
    >
      {isImageService && <div className={styles['card-shine']} aria-hidden="true" />}

      {service.type === 'cube' ? (
        <VideoCube />
      ) : (
        <img src={service.image} alt={t(service.titleKey)} loading="lazy" />
      )}
    </div>
  );
}

function ServiceDescription({ service }) {
  const { t } = useLanguage();

  return (
    <div className={styles['wdwd-text']}>
      <h3 className={`${styles['wdwd-content-title']} subtitle-main`}>
        {t(service.subtitleKey)}
      </h3>

      <p className={`${styles['wdwd-content-description']} text-normal`}>
        {t(service.detailKey)}
      </p>
    </div>
  );
}

export default function WhatDoWeDo() {
  const { t } = useLanguage();

  const [activeServiceId, setActiveServiceId] = useState(DEFAULT_SERVICE_ID);
  const [transitionDirection, setTransitionDirection] = useState('idle');

  const activeService = getServiceById(activeServiceId);
  const isCubeService = activeService.type === 'cube';
  const shortDescription = `${t(activeService.descKey).split('.')[0]}.`;

  const handleSelectService = (targetServiceId) => {
    if (targetServiceId === activeServiceId) return;

    setTransitionDirection(getDirection(activeServiceId, targetServiceId));
    setActiveServiceId(targetServiceId);
  };

  const handlePreviousService = () => {
    const previousServiceId = getPreviousServiceId(activeServiceId);

    setTransitionDirection('previous');
    setActiveServiceId(previousServiceId);
  };

  const handleNextService = () => {
    const nextServiceId = getNextServiceId(activeServiceId);

    setTransitionDirection('next');
    setActiveServiceId(nextServiceId);
  };

  return (
    <section
      className={`${styles['wdwd-section']} section-padded reveal-on-scroll`}
      id="servicios"
    >
      <h2 className="section-label">{t('services_title')}</h2>

      <ServiceTextSwitcher
        activeServiceId={activeServiceId}
        transitionDirection={transitionDirection}
        onPreviousService={handlePreviousService}
        onNextService={handleNextService}
      />

      <p
        key={`${activeService.id}-subtitle`}
        className={`${styles['wdwd-subtitle']} text-normal`}
      >
        {shortDescription}
      </p>

      <div
        key={activeService.id}
        className={`${styles['wdwd-content']} ${
          isCubeService ? styles['cube-layout'] : styles['image-layout']
        }`}
      >
        {isCubeService ? (
          <>
            <ServiceDescription service={activeService} />
            <ServiceMedia service={activeService} />
          </>
        ) : (
          <>
            <ServiceMedia service={activeService} />
            <ServiceDescription service={activeService} />
          </>
        )}
      </div>

      <ServiceDots
        activeServiceId={activeServiceId}
        onSelectService={handleSelectService}
      />
    </section>
  );
}