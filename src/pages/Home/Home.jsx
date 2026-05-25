import './Home.css';

function Home() {
  return (
    <div className="home-container">
      {/* Espacio para la frase central del boceto */}
      <div className="phrase-section">
        <h2 className="home-phrase">"Cretivity"</h2>
      </div>

      {/* Contenedor del video con mucho más espacio */}
      <div className="video-main-wrapper">
        <div className="video-player-box">
          <div className="play-icon-center">
            <div className="triangle"></div>
          </div>
          {/* Imagen de fondo del video */}
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