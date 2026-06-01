import { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { SelectInput, SubmitButton, TextInput } from './FormField';
import { saveContactSubmission } from '../../services/contactStorage';
import styles from './Contact.module.css';

const NAME_MIN_LENGTH = 2;
const NAME_MAX_LENGTH = 60;

const EMAIL_MIN_LENGTH = 6;
const EMAIL_MAX_LENGTH = 120;

const MESSAGE_MIN_LENGTH = 20;
const MESSAGE_MAX_LENGTH = 280;

const REEL_MIN_LENGTH = 10;
const REEL_MAX_LENGTH = 2048;

const WORK_OPTIONS = [
  { value: '', labelKey: 'form_work_select', disabled: true },
  { value: '2d', labelKey: 'form_work_2d' },
  { value: '3d', labelKey: 'form_work_3d' },
  { value: 'illustrator', labelKey: 'form_work_illustrator' },
  { value: 'modeler', labelKey: 'form_work_modeler' },
  { value: 'composer', labelKey: 'form_work_composer' },
  { value: 'voice', labelKey: 'form_work_voice' },
  { value: 'other', labelKey: 'form_work_other' },
];

export default function WorkWithUsForm() {
  const { t } = useLanguage();

  const [fileName, setFileName] = useState('');
  const [message, setMessage] = useState('');
  const [notification, setNotification] = useState('');

  const isMessageTooShort =
    message.length > 0 && message.length < MESSAGE_MIN_LENGTH;

  const showNotification = (text) => {
    setNotification(text);

    window.setTimeout(() => {
      setNotification('');
    }, 3200);
  };

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];

    setFileName(file ? file.name : '');
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const form = event.currentTarget;

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const formData = new FormData(form);
    const cvFile = formData.get('work-cv-upload');

    const submission = {
      formType: 'work-with-us',
      name: formData.get('work-name')?.trim() || '',
      email: formData.get('work-email')?.trim() || '',
      role: formData.get('work-role') || '',
      message: formData.get('work-message')?.trim() || '',
      reelLink: formData.get('work-reel')?.trim() || '',
      cv:
        cvFile && cvFile.name
          ? {
              name: cvFile.name,
              type: cvFile.type,
              size: cvFile.size,
            }
          : null,
    };

    saveContactSubmission(submission);

    form.reset();
    setMessage('');
    setFileName('');
    showNotification('Tu postulación fue registrada correctamente.');
  };

  return (
    <>
      {notification && (
        <div className={styles['form-notification']} role="status">
          {notification}
        </div>
      )}

      <form
        className={`${styles['contact-form']} ${styles['work-form']}`}
        onSubmit={handleSubmit}
        method="post"
        action=""
      >
        <TextInput
          id="work-name"
          labelKey="form_name"
          required
          minLength={NAME_MIN_LENGTH}
          maxLength={NAME_MAX_LENGTH}
          autoComplete="name"
        />

        <TextInput
          id="work-email"
          labelKey="form_email"
          type="email"
          required
          minLength={EMAIL_MIN_LENGTH}
          maxLength={EMAIL_MAX_LENGTH}
          autoComplete="email"
        />

        <SelectInput
          id="work-role"
          labelKey="form_work_question"
          options={WORK_OPTIONS}
          required
        />

        <div className={styles['form-group']}>
          <label className="text-small" htmlFor="work-message">
            {t('form_message')}
          </label>

          <textarea
            id="work-message"
            name="work-message"
            required
            minLength={MESSAGE_MIN_LENGTH}
            maxLength={MESSAGE_MAX_LENGTH}
            value={message}
            onChange={(event) => setMessage(event.target.value)}
          />

          <div className={styles['message-footer']}>
            <span className={styles['field-hint']}>
              Mínimo {MESSAGE_MIN_LENGTH} caracteres
            </span>

            <span
              className={`${styles['character-counter']} ${
                isMessageTooShort ? styles['counter-error'] : ''
              }`}
            >
              {message.length}/{MESSAGE_MAX_LENGTH}
            </span>
          </div>
        </div>

        <div className={styles['form-row']}>
          <TextInput
            id="work-reel"
            labelKey="form_work_reel"
            type="url"
            required
            minLength={REEL_MIN_LENGTH}
            maxLength={REEL_MAX_LENGTH}
            autoComplete="url"
          />

          <div className={`${styles['form-group']} ${styles['file-upload-container']}`}>
            <label className="text-small" htmlFor="work-cv-upload">
              {t('form_work_cv')}
            </label>

            <div className={styles['file-upload-wrapper']}>
              <input
                id="work-cv-upload"
                name="work-cv-upload"
                type="file"
                accept="application/pdf"
                className={styles['file-upload-input']}
                onChange={handleFileChange}
                required
              />

              <label htmlFor="work-cv-upload" className={styles['custom-file-upload']}>
                <span className={styles['file-upload-main-text']}>
                  {fileName || t('form_work_select_file')}
                </span>
              </label>
            </div>
          </div>
        </div>

        <SubmitButton />
      </form>
    </>
  );
}