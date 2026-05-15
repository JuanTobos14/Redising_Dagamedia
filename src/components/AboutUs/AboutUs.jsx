import './AboutUs.css';

function AboutUs() {
  return (
    <section className="about-container">
      <div className="about-header">
        <h2>ABOUT US</h2>
      </div>

      <div className="about-main-content">
        <div className="about-image-large">
          {/* Imagen principal de Tundama/Daga */}
          <img src="https://dagamedia.com/wp-content/uploads/2021/02/tundama-poster.jpg" alt="Daga Media Project" />
        </div>
        <div className="about-text">
          <p>
            En <strong>Daga Media</strong>, somos apasionados por la narrativa visual. 
            Desde Boyacá para el mundo, creamos contenidos que inspiran y conectan.
          </p>
          <p>
            Especializados en animación 2D, 3D y producción cinematográfica de alto impacto.
          </p>
        </div>
      </div>

      {/* Las 3 imágenes que dibujaste abajo */}
      <div className="about-grid">
        <div className="grid-item">
          <img src="https://dagamedia.com/wp-content/uploads/2021/02/servicios-animacion.jpg" alt="Animación" />
        </div>
        <div className="grid-item">
          <img src="https://dagamedia.com/wp-content/uploads/2021/02/servicios-produccion.jpg" alt="Producción" />
        </div>
        <div className="grid-item">
          <img src="https://dagamedia.com/wp-content/uploads/2021/02/servicios-post.jpg" alt="Post-producción" />
        </div>
      </div>
    </section>
  );
}

export default AboutUs;