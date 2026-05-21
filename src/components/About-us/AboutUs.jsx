import React from 'react';

function AboutUs() {
  return (
    <section>
      {/* Introducción Principal */}
      <div>
        <h1>Daga Media</h1>
        <h2>Creamos experiencias digitales que impulsan tu negocio</h2>
        <p>
          Somos una agencia digital especializada en conectar marcas con audiencias reales. 
          Nos apasiona el diseño, el desarrollo web y las estrategias digitales que generan resultados.
        </p>
      </div>

      {/* Nuestros Servicios */}
      <div>
        <h3>Nuestros Servicios</h3>
        <ul>
          <li>
            <h4>Desarrollo Web</h4>
            <p>Sitios web modernos, rápidos y optimizados para cualquier dispositivo.</p>
          </li>
          <li>
            <h4>Diseño de Marca</h4>
            <p>Identidades visuales únicas que transmiten la esencia de tu negocio.</p>
          </li>
          <li>
            <h4>Marketing Digital</h4>
            <p>Estrategias a medida para posicionar tu marca en el mercado actual.</p>
          </li>
        </ul>
      </div>

      {/* Filosofía */}
      <div>
        <h3>¿Por qué elegirnos?</h3>
        <p>
          No solo creamos páginas web; construimos herramientas de trabajo. Nos enfocamos 
          en la funcionalidad, la velocidad y en que tu inversión se traduzca en clientes.
        </p>
      </div>
    </section>
  );
}

export default AboutUs;