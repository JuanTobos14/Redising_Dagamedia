import { useLanguage } from '../../context/LanguageContext';
import styles from './Contact.module.css';

export function TextInput({
  id,
  labelKey,
  type = 'text',
  required = false,
  minLength,
  maxLength,
  autoComplete,
}) {
  const { t } = useLanguage();

  return (
    <div className={styles['form-group']}>
      <label className="text-small" htmlFor={id}>
        {t(labelKey)}
      </label>

      <input
        id={id}
        name={id}
        type={type}
        required={required}
        minLength={minLength}
        maxLength={maxLength}
        autoComplete={autoComplete}
      />
    </div>
  );
}

export function SelectInput({ id, labelKey, options, required = false }) {
  const { t } = useLanguage();

  return (
    <div className={styles['form-group']}>
      <label className="text-small" htmlFor={id}>
        {t(labelKey)}
      </label>

      <select id={id} name={id} required={required} defaultValue="">
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            disabled={option.disabled}
          >
            {t(option.labelKey)}
          </option>
        ))}
      </select>
    </div>
  );
}

export function SubmitButton() {
  const { t } = useLanguage();

  return (
    <button type="submit" className={styles['submit-btn']}>
      {t('form_send')}
    </button>
  );
}