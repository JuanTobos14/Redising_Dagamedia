import './OurFilms.css';

function OurFilms() {
  return (
    <section className="films-container">
      <h2 className="films-title">OUR FILMS</h2>

      {/* Slider de Películas */}
      <div className="slider-wrapper">
        <button className="slider-arrow">{"<"}</button>
        <div className="slider-content">
          <div className="film-mini">
            <img src="https://dagamedia.com/wp-content/uploads/2021/02/tundama-poster.jpg" alt="Film" />
          </div>
          <div className="film-featured">
            <img src="https://dagamedia.com/wp-content/uploads/2021/02/tundama-poster.jpg" alt="Film Featured" />
            <div className="film-overlay">ESTRENO</div>
          </div>
          <div className="film-mini">
            <img src="https://dagamedia.com/wp-content/uploads/2021/02/tundama-poster.jpg" alt="Film" />
          </div>
        </div>
        <button className="slider-arrow">{">"}</button>
      </div>

      {/* Sección Tundama (3 columnas según tu dibujo) */}
      <div className="tundama-header">
        <h3>TUNDAMA</h3>
      </div>
      
      <div className="tundama-grid">
        {/* Columna 1: Póster */}
        <div className="grid-col poster">
          <img src="https://dagamedia.com/wp-content/uploads/2021/02/tundama-poster.jpg" alt="Tundama Poster" />
        </div>

        {/* Columna 2: Info y Trailer */}
        <div className="grid-col info">
          <p>La historia de un héroe que defendió su pueblo con valor. Una producción épica de animación 3D.</p>
          <div className="video-placeholder">
            <span>TRAILER (VIDEO)</span>
          </div>
        </div>

        {/* Columna 3: Personaje */}
        <div className="grid-col character">
          <img src="https://dagamedia.com/wp-content/uploads/2021/02/servicios-post.jpg" alt="Character Design" />
        </div>
      </div>
    </section>
  );
}

export default OurFilms;