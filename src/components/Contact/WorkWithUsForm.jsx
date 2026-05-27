import { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';

export default function WorkWithUsForm() {
  const [fileName, setFileName] = useState('');
  const { t } = useLanguage();

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
    } else {
      setFileName('');
    }
  };

  return (
    <form className="contact-form">
      <div className="form-group">
        <label className="text-small" htmlFor="name">
          {t('form_name')}
        </label>

        <input type="text" id="name" name="name" required />
      </div>

      <div className="form-group">
        <label className="text-small" htmlFor="email">
          {t('form_email')}
        </label>

        <input type="email" id="email" name="email" required />
      </div>

      <div className="form-group">
        <label className="text-small" htmlFor="profession">
          {t('form_work_question')}
        </label>

        <select id="profession" name="profession">
          <option value="">{t('form_work_select')}</option>
          <option value="2d-animator">{t('form_work_2d')}</option>
          <option value="3d-animator">{t('form_work_3d')}</option>
          <option value="illustrator">{t('form_work_illustrator')}</option>
          <option value="modeler">{t('form_work_modeler')}</option>
          <option value="composer">{t('form_work_composer')}</option>
          <option value="voice-actor">{t('form_work_voice')}</option>
          <option value="other">{t('form_work_other')}</option>
        </select>
      </div>

      <div className="form-group">
        <label className="text-small" htmlFor="message">
          {t('form_message')}
        </label>

        <textarea id="message" name="message" required />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label className="text-small" htmlFor="reelLink">
            {t('form_work_reel')}
          </label>

          <input type="url" id="reelLink" name="reelLink" required />
        </div>

        <div className="form-group file-upload-container">
          <label className="text-small" htmlFor="cvUpload">
            {t('form_work_cv')}
          </label>

          <div className="file-upload-wrapper">
            <label htmlFor="cvUpload" className="custom-file-upload">
              {t('form_work_select_file')}
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
              <span className="file-name-display text-small">
                {fileName}
              </span>
            )}
          </div>
        </div>
      </div>

      <button type="submit" className="submit-btn">
        {t('form_send')}
      </button>
    </form>
  );
}