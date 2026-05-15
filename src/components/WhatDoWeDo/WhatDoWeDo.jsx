import './WhatDoWeDo.css';

function WhatDoWeDo() {
  return (
    <section className="what-we-do">
      <h2 className="section-title">Animación 2D y 3D</h2>

      {/* Fila 1: Imagen Izquierda, Texto Derecha */}
      <div className="service-row">
        <div className="service-image">
          <img src="https://dagamedia.com/wp-content/uploads/2021/02/animacion-2d.jpg" alt="Animación 2D" />
        </div>
        <div className="service-info">
          <h3>Animación 2D</h3>
          <p>
            Creamos personajes y mundos únicos con técnicas tradicionales y digitales. 
            Nuestras historias cobran vida a través de un movimiento fluido y una estética cautivadora.
          </p>
        </div>
      </div>

      {/* Fila 2: Texto Izquierda, Imagen Derecha (usamos la clase 'reverse') */}
      <div className="service-row reverse">
        <div className="service-image">
          <img src="https://dagamedia.com/wp-content/uploads/2021/02/animacion-3d.jpg" alt="Animación 3D" />
        </div>
        <div className="service-info">
          <h3>Animación 3D</h3>
          <p>
            Modelado, texturizado y renderizado de alta calidad. Llevamos la producción 
            audiovisual al siguiente nivel con efectos visuales y entornos tridimensionales inmersivos.
          </p>
        </div>
      </div>
    </section>
  );
}

export default WhatDoWeDo;