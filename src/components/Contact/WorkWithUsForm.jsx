import  { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function WorkWithUsForm() {
  const { t } = useTranslation();

  const [fileName, setFileName] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    profession: '',
    message: '',
    reelLink: '',
    cvUpload: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      setFileName(file.name);

      setFormData((prev) => ({
        ...prev,
        cvUpload: file
      }));
    } else {
      setFileName('');

      setFormData((prev) => ({
        ...prev,
        cvUpload: null
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(formData);

    alert(
      t('contact.workForm.successMessage', {
        name: formData.name
      })
    );

    setFormData({
      name: '',
      email: '',
      profession: '',
      message: '',
      reelLink: '',
      cvUpload: null
    });

    setFileName('');
  };

  return (
    <form
      className="contact-form"
      onSubmit={handleSubmit}
    >

      {/* Name */}
      <div className="form-group">
        <label htmlFor="name">
          {t('contact.workForm.name')}{' '}
          <span className="required-asterisk">*</span>
        </label>

        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder={t('contact.workForm.namePlaceholder')}
          autoComplete="name"
          required
        />
      </div>

      {/* Email */}
      <div className="form-group">
        <label htmlFor="email">
          {t('contact.workForm.email')}{' '}
          <span className="required-asterisk">*</span>
        </label>

        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder={t('contact.workForm.emailPlaceholder')}
          autoComplete="email"
          required
        />
      </div>

      {/* Profession */}
      <div className="form-group">
        <label htmlFor="profession">
          {t('contact.workForm.profession')}
        </label>

        <select
          id="profession"
          name="profession"
          value={formData.profession}
          onChange={handleChange}
        >
          <option value="">
            {t('contact.workForm.selectOption')}
          </option>

          <option value="2d-animator">
            {t('contact.workForm.options.animator2d')}
          </option>

          <option value="3d-animator">
            {t('contact.workForm.options.animator3d')}
          </option>

          <option value="illustrator">
            {t('contact.workForm.options.illustrator')}
          </option>

          <option value="modeler">
            {t('contact.workForm.options.modeler')}
          </option>

          <option value="composer">
            {t('contact.workForm.options.composer')}
          </option>

          <option value="voice-actor">
            {t('contact.workForm.options.voiceActor')}
          </option>

          <option value="other">
            {t('contact.workForm.options.other')}
          </option>
        </select>
      </div>

      {/* Message */}
      <div className="form-group">
        <label htmlFor="message">
          {t('contact.workForm.message')}{' '}
          <span className="required-asterisk">*</span>
        </label>

        <textarea
          id="message"
          name="message"
          rows="5"
          value={formData.message}
          onChange={handleChange}
          placeholder={t('contact.workForm.messagePlaceholder')}
          required
        />
      </div>

      {/* Reel + CV */}
      <div className="form-row">

        {/* Reel */}
        <div className="form-group">
          <label htmlFor="reelLink">
            {t('contact.workForm.reelLink')}{' '}
            <span className="required-asterisk">*</span>
          </label>

          <input
            type="url"
            id="reelLink"
            name="reelLink"
            value={formData.reelLink}
            onChange={handleChange}
            placeholder={t('contact.workForm.reelPlaceholder')}
            required
          />
        </div>

        {/* CV */}
        <div className="form-group file-upload-container">

          <label htmlFor="cvUpload">
            {t('contact.workForm.cvUpload')}{' '}
            <span className="required-asterisk">*</span>
          </label>

          <div className="file-upload-wrapper">

            <label
              htmlFor="cvUpload"
              className="custom-file-upload"
            >
              {t('contact.workForm.selectFile')}
            </label>

            <input
              type="file"
              id="cvUpload"
              name="cvUpload"
              accept=".pdf"
              style={{ display: 'none' }}
              onChange={handleFileChange}
              required
            />

            {fileName && (
              <span className="file-name-display">
                {fileName}
              </span>
            )}

          </div>
        </div>

      </div>

      {/* Submit */}
      <button
        type="submit"
        className="submit-btn"
      >
        {t('contact.workForm.submit')}
      </button>

    </form>
  );
}