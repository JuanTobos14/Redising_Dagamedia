import { useTranslation } from 'react-i18next';
import './WhatDoWeDo.css';

function WhatDoWeDo() {
  const { t } = useTranslation();

  return (
    <section className="what-we-do">
      <h2 className="section-title">{t('whatWeDo.mainTitle')}</h2>

      <div className="service-row">
        <div className="service-image">
          <img src="https://dagamedia.com/wp-content/uploads/2021/02/animacion-2d.jpg" alt={t('whatWeDo.animation2d.title')} />
        </div>
        <div className="service-info">
          <h3>{t('whatWeDo.animation2d.title')}</h3>
          <p>
            {t('whatWeDo.animation2d.description')}
          </p>
        </div>
      </div>

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