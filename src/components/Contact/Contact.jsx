import { useState } from 'react';
import './Contact.css';

// Usamos un estado para manejar el formulario, como en el repo del profe
function Contact() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    mensaje: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { nombre, email, mensaje } = formData;
    alert(`¡Gracias ${nombre}! Tu mensaje ha sido enviado.\n\nCorreo: ${email}\nMensaje: ${mensaje}`);
    // Aquí iría la lógica para enviar a un servidor o email service
    setFormData({ nombre: '', email: '', mensaje: '' });
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
              name="nombre"
              placeholder="Escribe tu nombre" 
              value={formData.nombre}
              onChange={handleChange} 
              required
            />
          </div>

          <div className="form-group">
            <label>Correo electrónico:</label>
            <input 
              type="email" 
              name="email"
              placeholder="tucorreo@ejemplo.com" 
              value={formData.email}
              onChange={handleChange}
              required 
            />
          </div>

          <div className="form-group">
            <label>Mensaje:</label>
            <textarea 
              name="mensaje"
              placeholder="¿En qué podemos ayudarte?" 
              rows="4"
              value={formData.mensaje}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <button type="submit" className="submit-btn">ENVIAR MENSAJE</button>
        </form>
      </div>
    </section>
  );
}

export default Contact;