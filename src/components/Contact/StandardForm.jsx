import { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { SubmitButton, TextInput } from './FormField';
import { saveContactSubmission } from '../../services/contactStorage';
import styles from './Contact.module.css';

const NAME_MIN_LENGTH = 2;
const NAME_MAX_LENGTH = 60;

const EMAIL_MIN_LENGTH = 6;
const EMAIL_MAX_LENGTH = 120;

const PHONE_MAX_LENGTH = 25;

const MESSAGE_MIN_LENGTH = 20;
const MESSAGE_MAX_LENGTH = 280;

export default function StandardForm() {
  const { t } = useLanguage();

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

  const handleSubmit = (event) => {
    event.preventDefault();

    const form = event.currentTarget;

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const formData = new FormData(form);

    const submission = {
      formType: 'contact',
      name: formData.get('contact-name')?.trim() || '',
      email: formData.get('contact-email')?.trim() || '',
      phone: formData.get('contact-phone')?.trim() || '',
      message: formData.get('contact-message')?.trim() || '',
    };

    saveContactSubmission(submission);

    form.reset();
    setMessage('');
    showNotification('Tu mensaje fue registrado correctamente.');
  };

  return (
    <>
      {notification && (
        <div className={styles['form-notification']} role="status">
          {notification}
        </div>
      )}

      <form
        className={`${styles['contact-form']} ${styles['standard-form']}`}
        onSubmit={handleSubmit}
        method="post"
        action=""
      >
        <TextInput
          id="contact-name"
          labelKey="form_name"
          required
          minLength={NAME_MIN_LENGTH}
          maxLength={NAME_MAX_LENGTH}
          autoComplete="name"
        />

        <TextInput
          id="contact-email"
          labelKey="form_email"
          type="email"
          required
          minLength={EMAIL_MIN_LENGTH}
          maxLength={EMAIL_MAX_LENGTH}
          autoComplete="email"
        />

        <TextInput
          id="contact-phone"
          labelKey="form_phone"
          type="tel"
          maxLength={PHONE_MAX_LENGTH}
          autoComplete="tel"
        />

        <div className={`${styles['form-group']} ${styles['message-group']}`}>
          <label className="text-small" htmlFor="contact-message">
            {t('form_message')}
          </label>

          <textarea
            id="contact-message"
            name="contact-message"
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

        <SubmitButton />
      </form>
    </>
  );
}