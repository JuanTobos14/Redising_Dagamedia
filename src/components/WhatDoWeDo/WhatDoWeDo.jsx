import { useTranslation } from 'react-i18next';
import './WhatDoWeDo.css';

function WhatDoWeDo() {
  // Hook para acceder a las traducciones
  const { t } = useTranslation();

  return (
    <section className="what-we-do">
      {/* Título traducido */}
      <h2 className="section-title">{t('whatWeDo.mainTitle')}</h2>

      {/* Fila 1: Imagen Izquierda, Texto Derecha */}
      <div className="service-row">
        <div className="service-image">
          <img src="https://dagamedia.com/wp-content/uploads/2021/02/animacion-2d.jpg" alt={t('whatWeDo.animation2d.title')} />
        </div>
        <div className="service-info">
          {/* Títulos y descripciones traducidos */}
          <h3>{t('whatWeDo.animation2d.title')}</h3>
          <p>
            {t('whatWeDo.animation2d.description')}
          </p>
        </div>
      </div>

      {/* Fila 2: Texto Izquierda, Imagen Derecha (usamos la clase 'reverse') */}
      <div className="service-row reverse">
        <div className="service-image">
          <img src="https://dagamedia.com/wp-content/uploads/2021/02/animacion-3d.jpg" alt={t('whatWeDo.animation3d.title')} />
        </div>
        <div className="service-info">
          <h3>{t('whatWeDo.animation3d.title')}</h3>
          <p>
            {t('whatWeDo.animation3d.description')}
          </p>
        </div>
      </div>
    </section>
  );
}

export default WhatDoWeDo;