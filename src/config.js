import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enJSON from './locales/en.json';
import esJSON from './locales/es.json';

// Inicializar i18next con react-i18next
// Este archivo configura el sistema de traducción multiidioma
i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enJSON }, // Traducciones al inglés
      es: { translation: esJSON }  // Traducciones al español
    },
    lng: 'es',                      // Idioma por defecto: español
    fallbackLng: 'en',              // Idioma de respaldo si falta una traducción
    interpolation: {
      escapeValue: false            // Permitir caracteres especiales en traducciones
    }
  });

export default i18n;
