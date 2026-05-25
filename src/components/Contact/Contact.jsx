import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './Contact.css';

// Hook para manejar el formulario con traducciones multiidioma
function Contact() {
  // Hook para acceder a las traducciones
  const { t } = useTranslation();

  // Estado para manejar el formulario
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    mensaje: ''
  });

  // Función para actualizar los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // Función para enviar el formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    const { nombre, email, mensaje } = formData;
    // Usar la traducción del mensaje de éxito con interpolación
    const successMsg = t('contact.form.successMessage')
      .replace('{name}', nombre)
      .replace('{email}', email)
      .replace('{message}', mensaje);
    alert(successMsg);
    // Aquí iría la lógica para enviar a un servidor o email service
    setFormData({ nombre: '', email: '', mensaje: '' });
  };

  return (
    <section className="contact-section">
      {/* Título traducido */}
      <h2 className="contact-title">{t('contact.title')}</h2>
      
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
          {/* Campo Nombre traducido */}
          <div className="form-group">
            <label>{t('contact.form.name')}</label>
            <input 
              type="text" 
              name="nombre"
              placeholder={t('contact.form.namePlaceholder')}
              value={formData.nombre}
              onChange={handleChange} 
              required
            />
          </div>

          {/* Campo Email traducido */}
          <div className="form-group">
            <label>{t('contact.form.email')}</label>
            <input 
              type="email" 
              name="email"
              placeholder={t('contact.form.emailPlaceholder')}
              value={formData.email}
              onChange={handleChange}
              required 
            />
          </div>

          {/* Campo Mensaje traducido */}
          <div className="form-group">
            <label>{t('contact.form.message')}</label>
            <textarea 
              name="mensaje"
              placeholder={t('contact.form.messagePlaceholder')}
              rows="4"
              value={formData.mensaje}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          {/* Botón de envío traducido */}
          <button type="submit" className="submit-btn">{t('contact.form.submitButton')}</button>
        </form>
      </div>
    </section>
  );
}

export default Contact;