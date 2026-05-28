# DAGAMEDIA

Sitio web corporativo de DAGAMEDIA desarrollado con React y Vite. El proyecto presenta la identidad de la productora, sus servicios, piezas audiovisuales, secciones informativas, contacto y elementos interactivos para una experiencia de una sola pagina.

Fecha de consolidacion del rediseño: 28 de mayo de 2026.

## Estado del proyecto

- Rediseño visual integrado en una experiencia One Page.
- Navegacion por secciones con desplazamiento suave.
- Secciones principales: inicio, que hacemos, sobre nosotros, films, contacto y footer.
- Sistema de traduccion EN/ES.
- Recursos visuales locales para evitar enlaces externos rotos.
- Cursor personalizado, animaciones, assets flotantes, carruseles y reacciones en vivo.
- Servidor Express opcional con Socket.IO para funcionalidades interactivas.

## Tecnologias

- React
- Vite
- JavaScript
- CSS Modules y CSS global
- Express
- Socket.IO

## Estructura principal

```text
src/
  components/       Componentes reutilizables de la interfaz
  data/             Contenido y configuraciones de secciones
  hooks/            Hooks de soporte
  pages/            Vistas principales
  services/         Servicios de almacenamiento/contacto
  styles/           Estilos compartidos
public/             Assets publicos
server.js           Servidor Express para produccion e interacciones
```

## Instalacion

```bash
npm install
```

## Desarrollo

```bash
npm run dev
```

## Build de produccion

```bash
npm run build
```

## Servidor de produccion

```bash
npm start
```

## Flujo de ramas sugerido

La rama consolidada del rediseño debe usarse como base para el merge final hacia `main`. Las ramas antiguas de componentes o pruebas pueden conservarse solo como respaldo temporal hasta validar el merge.

Rama recomendada para integrar:

```text
release/dagamedia-redesign
```
