import { useState } from 'react';
import './Contact.css';

function Contact() {
  // Usamos un estado para manejar el formulario, como en el repo del profe
  const [nombre, setNombre] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`¡Gracias ${nombre}! Tu mensaje ha sido enviado (simulación).`);
  };

  return (
    <section className="contact-section">
      <h2 className="contact-title">CONTACT</h2>
      
      <div className="contact-container">
        {/* El Mapa (según tu dibujo, arriba del formulario) */}
        <div className="map-placeholder">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3971.314981446733!2d-73.3637!3d5.5333!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNcKwMzInMDAuMCJOIDczwrAyMSc0OS4zIlc!5e0!3m2!1ses!2sco!4v1620000000000!5m2!1ses!2sco" 
            width="100%" 
            height="250" 
            style={{ border: 0, borderRadius: '10px' }} 
            allowFullScreen="" 
            loading="lazy"
          ></iframe>
        </div>

        {/* El Formulario */}
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nombre:</label>
            <input 
              type="text" 
              placeholder="Escribe tu nombre" 
              value={nombre}
              onChange={(e) => setNombre(e.target.value)} 
              required
            />
          </div>

          <div className="form-group">
            <label>Correo electrónico:</label>
            <input type="email" placeholder="tucorreo@ejemplo.com" required />
          </div>

          <div className="form-group">
            <label>Mensaje:</label>
            <textarea placeholder="¿En qué podemos ayudarte?" rows="4"></textarea>
          </div>

          <button type="submit" className="submit-btn">ENVIAR MENSAJE</button>
        </form>
      </div>
    </section>
  );
}

export default Contact;