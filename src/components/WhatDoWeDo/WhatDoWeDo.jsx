import { useTranslation } from 'react-i18next';
import "./WhatDoWeDo.css";

const WhatDoWeDo = () => {
  // Hook para acceder a las traducciones
  const { t } = useTranslation();

  return (
    <section className="whatwedo">
      <h2>{t('whatWeDo.mainTitle')}</h2>

      <div className="container">
        
        <div className="card">
          <div className="image"></div>
          <h3>{t('whatWeDo.animation2d.title')}</h3>
          <p>{t('whatWeDo.animation2d.description')}</p>
        </div>

        <div className="card">
          <div className="image"></div>
          <h3>{t('whatWeDo.animation3d.title')}</h3>
          <p>{t('whatWeDo.animation3d.description')}</p>
        </div>

      </div>
    </section>
  );
};

export default WhatDoWeDo;