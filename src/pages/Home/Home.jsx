import { useTranslation } from 'react-i18next';
import './Home.css';

function Home() {
  const { t } = useTranslation();

  return (
    <div className="home-container">
      <div className="phrase-section">
        <h2 className="home-phrase">{t('home.phrase')}</h2>
      </div>

      <div className="video-main-wrapper">
        <div className="video-player-box">
          <div className="play-icon-center">
            <div className="triangle"></div>
          </div>
          <img 
            src="https://dagamedia.com/wp-content/uploads/2021/02/tundama-poster.jpg" 
            alt="Daga Media Video Preview" 
            className="video-poster"
          />
        </div>
      </div>
    </div>
  );
}

export default Home;