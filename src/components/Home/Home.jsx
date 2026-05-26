import { useTranslation } from 'react-i18next';
import "./Home.css";

function Home() {
  // Hook para acceder a las traducciones
  const { t } = useTranslation();

  return (
    <section className="hero section-padding">
      {/* Título traducido - "Creativity" / "Creatividad" */}
      <h1>{t('home.phrase')}</h1>

      <p>
        Come, take a look at our <span>productions</span>
      </p>

      <div className="video-container">
        <img
          src="https://picsum.photos/1200/600"
          alt="video"
        />

        <div className="play-btn">
          ▶
        </div>
      </div>
    </section>
  );
}

export default Home;