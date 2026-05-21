import React from 'react';

function Footer() {
  return (
    <footer>
      <hr />
      {/* Secciones de información */}
      <div>
        <div>
          <h3>Daga Media</h3>
          <p>Tu aliado en el mundo digital.</p>
        </div>

        <div>
          <h4>Contacto</h4>
          <p>Email: info@dagamedia.com</p>
          <p>Ubicación: Colombia / Global</p>
        </div>

        <div>
          <h4>Enlaces Rápidos</h4>
          <ul>
            <li><a href="#inicio">Inicio</a></li>
            <li><a href="#servicios">Servicios</a></li>
            <li><a href="#contacto">Contacto</a></li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div>
        <p>&copy; {new Date().getFullYear()} Daga Media. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}

export default Footer;