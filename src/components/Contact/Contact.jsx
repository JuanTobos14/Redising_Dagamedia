import  { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './Contact.css';

function Contact() {
  const { t } = useTranslation();

  // Estado del formulario
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    mensaje: ''
  });

  // Actualizar campos
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // Enviar formulario
  const handleSubmit = (e) => {
    e.preventDefault();

    const { nombre, email, mensaje } = formData;

    // Interpolación nativa de i18next
    const successMsg = t('contact.form.successMessage', {
      name: nombre,
      email,
      message: mensaje
    });

    alert(successMsg);

    // Reset formulario
    setFormData({
      nombre: '',
      email: '',
      mensaje: ''
    });
  };

  return (
    <section className="contact-section">
      {/* Título */}
      <h2 className="contact-title">
        {t('contact.title')}
      </h2>

      <div className="contact-container">

        {/* Mapa */}
        <div className="map-placeholder">
          <iframe
            title="Daga Media Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3971.314981446733!2d-73.3637!3d5.5333!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNcKwMzInMDAuMCJOIDczwrAyMSc0OS4zIlc!5e0!3m2!1ses!2sco!4v1620000000000!5m2!1ses!2sco"
            width="100%"
            height="250"
            style={{
              border: 0,
              borderRadius: '10px'
            }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        {/* Formulario */}
        <form
          className="contact-form"
          onSubmit={handleSubmit}
        >

          {/* Nombre */}
          <div className="form-group">
            <label htmlFor="nombre">
              {t('contact.form.name')}
            </label>

            <input
              id="nombre"
              type="text"
              name="nombre"
              placeholder={t('contact.form.namePlaceholder')}
              value={formData.nombre}
              onChange={handleChange}
              autoComplete="name"
              required
            />
          </div>

          {/* Email */}
          <div className="form-group">
            <label htmlFor="email">
              {t('contact.form.email')}
            </label>

            <input
              id="email"
              type="email"
              name="email"
              placeholder={t('contact.form.emailPlaceholder')}
              value={formData.email}
              onChange={handleChange}
              autoComplete="email"
              required
            />
          </div>

          {/* Mensaje */}
          <div className="form-group">
            <label htmlFor="mensaje">
              {t('contact.form.message')}
            </label>

            <textarea
              id="mensaje"
              name="mensaje"
              placeholder={t('contact.form.messagePlaceholder')}
              rows="4"
              value={formData.mensaje}
              onChange={handleChange}
              required
            />
          </div>

          {/* Botón */}
          <button
            type="submit"
            className="submit-btn"
          >
            {t('contact.form.submitButton')}
          </button>

        </form>
      </div>
    </section>
  );
}

export default Contact;