import  { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function StandardForm() {
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contactNumber: '',
    message: ''
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

    console.log(formData);

    alert(
      t('contact.standardForm.successMessage', {
        name: formData.name
      })
    );

    setFormData({
      name: '',
      email: '',
      contactNumber: '',
      message: ''
    });
  };

  return (
    <form
      className="contact-form"
      onSubmit={handleSubmit}
    >

      {/* Name */}
      <div className="form-group">
        <label htmlFor="name">
          {t('contact.standardForm.name')}{' '}
          <span className="required-asterisk">*</span>
        </label>

        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder={t('contact.standardForm.namePlaceholder')}
          autoComplete="name"
          required
        />
      </div>

      {/* Email */}
      <div className="form-group">
        <label htmlFor="email">
          {t('contact.standardForm.email')}{' '}
          <span className="required-asterisk">*</span>
        </label>

        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder={t('contact.standardForm.emailPlaceholder')}
          autoComplete="email"
          required
        />
      </div>

      {/* Contact Number */}
      <div className="form-group">
        <label htmlFor="contactNumber">
          {t('contact.standardForm.contactNumber')}
        </label>

        <input
          type="tel"
          id="contactNumber"
          name="contactNumber"
          value={formData.contactNumber}
          onChange={handleChange}
          placeholder={t('contact.standardForm.contactNumberPlaceholder')}
          autoComplete="tel"
        />
      </div>

      {/* Message */}
      <div className="form-group">
        <label htmlFor="message">
          {t('contact.standardForm.message')}{' '}
          <span className="required-asterisk">*</span>
        </label>

        <textarea
          id="message"
          name="message"
          rows="5"
          value={formData.message}
          onChange={handleChange}
          placeholder={t('contact.standardForm.messagePlaceholder')}
          required
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="submit-btn"
      >
        {t('contact.standardForm.submit')}
      </button>

    </form>
  );
}