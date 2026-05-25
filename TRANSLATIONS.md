# Sistema de Traducción - Daga Media

## 📋 Descripción

El proyecto utiliza **i18next** y **react-i18next** para manejar la internacionalización (i18n) multiidioma. Actualmente soporta:
- 🇪🇸 **Español** (es)
- 🇬🇧 **Inglés** (en)

## 📁 Estructura de Archivos

```
src/
├── locales/
│   ├── en.json          # Traducciones al inglés
│   └── es.json          # Traducciones al español
├── config.js            # Configuración de i18next
└── components/
    ├── Header/
    ├── Footer/
    ├── AboutUs/
    ├── WhatDoWeDo/
    ├── Ourfilms/
    ├── Contact/
    └── pages/Home/
```

## 🔄 Cómo Usar las Traducciones

### En Componentes React

1. **Importar el hook `useTranslation`:**
```jsx
import { useTranslation } from 'react-i18next';
```

2. **Usar el hook en el componente:**
```jsx
function MyComponent() {
  const { t, i18n } = useTranslation();
  
  return (
    <div>
      <h1>{t('section.title')}</h1>
      <p>{t('section.description')}</p>
    </div>
  );
}
```

3. **Cambiar idioma:**
```jsx
const handleLanguageChange = (lang) => {
  i18n.changeLanguage(lang);
};
```

### Estructura de las Claves de Traducción

Las claves siguen una estructura jerárquica anidada:
```
header.nav.home
header.nav.ourFilms
about.title
about.description1
contact.form.name
contact.form.submitButton
```

## ✏️ Agregar Nuevas Traducciones

### Paso 1: Abrir los archivos de traducción
- `src/locales/en.json` (inglés)
- `src/locales/es.json` (español)

### Paso 2: Agregar la clave de traducción

**en.json:**
```json
{
  "section": {
    "newKey": "English text"
  }
}
```

**es.json:**
```json
{
  "section": {
    "newKey": "Texto en español"
  }
}
```

### Paso 3: Usar en el componente
```jsx
const { t } = useTranslation();
<p>{t('section.newKey')}</p>
```

## 🔧 Configuración Actual

**Archivo:** `src/config.js`

- **Idioma por defecto:** Español (es)
- **Idioma alternativo:** Inglés (en)
- **Fallback:** Si una traducción no existe, usa inglés

## 📍 Características del Selector de Idioma

El Header incluye botones para cambiar entre idiomas (ES/EN). El botón del idioma actual está marcado con la clase `active`.

## 🎯 Próximos Pasos (Opcional)

Si en el futuro necesitas:
- **Agregar otro idioma:** Crear un nuevo archivo JSON en `src/locales/` (ej: `fr.json`) y actualizarlo en `src/config.js`
- **Cargar traducciones dinámicamente:** Usar i18next-http-backend para cargar desde un servidor
- **Pluralización:** Usar la función `t` con opciones de pluralización
- **Interpolación de variables:** Usar `{variable}` en las traducciones (ya configurado)

## 📝 Traducciones Incluidas

### Sections disponibles:
- `header` - Navegación y logo
- `home` - Página de inicio
- `about` - Acerca de nosotros
- `whatWeDo` - Servicios
- `films` - Películas
- `contact` - Formulario de contacto
- `footer` - Pie de página

## 🚀 Compilar y Probar

```bash
npm run dev       # Ejecutar en desarrollo
npm run build     # Compilar para producción
npm run lint      # Verificar código
```
