// src/data/aboutUsData.js

import zoeImage from '../assets/ZOE-copia-724x1024.jpg';
import pobladorImage from '../assets/poblador-dos-724x1024.jpg';

import soldadoUno from '../assets/Soldado_uno.jpg';
import soldadoDos from '../assets/Soldado_dos.jpg';
import soldadoTres from '../assets/Soldado_tres.jpg';
import soldadoCuatro from '../assets/Soldado_cuatro.jpg';

export const DIRECTOR_IMAGES = [
  {
    id: 'zoe-character-sheet',
    src: zoeImage,
    alt: 'Zoe character sheet – Dagamedia',
    fit: 'contain',
    position: 'center',
  },
  {
    id: 'poblador-character-sheet',
    src: pobladorImage,
    alt: 'Poblador character sheet – Dagamedia',
    fit: 'contain',
    position: 'center',
  },
];

export const TEAM_IMAGES = [
  {
    id: 'soldado-sketch-uno',
    src: soldadoUno,
    alt: 'Soldier sketch process – Dagamedia',
    fit: 'cover',
    position: 'center',
  },
  {
    id: 'soldado-sketch-dos',
    src: soldadoDos,
    alt: 'Soldier sketch process – Dagamedia',
    fit: 'cover',
    position: 'center',
  },
  {
    id: 'soldado-sketch-tres',
    src: soldadoTres,
    alt: 'Soldier sketch process – Dagamedia',
    fit: 'cover',
    position: 'center',
  },
  {
    id: 'soldado-render-cuatro',
    src: soldadoCuatro,
    alt: 'Soldier render process – Dagamedia',
    fit: 'cover',
    position: 'center',
  },
];