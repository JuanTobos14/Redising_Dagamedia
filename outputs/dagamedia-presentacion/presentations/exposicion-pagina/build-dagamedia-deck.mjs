import { createRequire } from 'node:module';
import { pathToFileURL } from 'node:url';
import fs from 'node:fs/promises';
import path from 'node:path';

const require = createRequire(import.meta.url);
const artifactPath = require.resolve('@oai/artifact-tool');
const { Presentation, PresentationFile } = await import(pathToFileURL(artifactPath).href);

const workspace = 'C:/Users/juanj/Desktop/dagamedia-rediseño/outputs/dagamedia-presentacion/presentations/exposicion-pagina';
const outputDir = path.join(workspace, 'output');
const previewDir = path.join(workspace, 'preview');
const assetsDir = 'C:/Users/juanj/Desktop/dagamedia-rediseño';
const repoAssetDir = 'C:/Users/juanj/Desktop/dagamedia-rediseño/src/assets';

await fs.mkdir(outputDir, { recursive: true });
await fs.mkdir(previewDir, { recursive: true });

const W = 1280;
const H = 720;
const ink = '#141414';
const paper = '#F7F4EC';
const muted = '#6D6A61';
const orange = '#FF8A00';
const gold = '#F5C542';
const charcoal = '#24201B';
const green = '#5F8D65';
const noFill = { type: 'none' };
const noLine = { fill: { type: 'none' } };

const deck = Presentation.create({ slideSize: { width: W, height: H } });

function rect(slide, x, y, w, h, fill = paper, lineStyle = noLine, radius = 0) {
  const shape = slide.shapes.add({
    geometry: 'rect',
    position: { x, y, w, h },
    fill,
    line: lineStyle,
  });
  void radius;
  return shape;
}

function line(slide, x, y, w, h, color = ink, width = 1) {
  return slide.shapes.add({
    geometry: 'rect',
    position: { x, y, w, h },
    fill: color,
    line: noLine,
  });
}

function text(slide, value, x, y, w, h, options = {}) {
  const shape = slide.shapes.add({
    geometry: 'rect',
    position: { x, y, w, h },
    fill: noFill,
    line: noLine,
  });
  shape.text = value;
  shape.text.typeface = options.typeface || 'Aptos';
  shape.text.fontSize = options.size || 24;
  shape.text.color = options.color || ink;
  shape.text.bold = Boolean(options.bold);
  shape.text.alignment = options.align || 'left';
  shape.text.verticalAlignment = options.valign || 'top';
  shape.text.insets = options.insets || { top: 4, right: 6, bottom: 4, left: 6 };
  if (options.leading) shape.text.lineSpacing = options.leading;
  return shape;
}

function image(slide, file, x, y, w, h, alt = '') {
  const img = slide.images.add({ path: file });
  img.frame = { left: x, top: y, width: w, height: h };
  img.alt = alt;
  return img;
}

function baseSlide(kicker, title, subtitle) {
  const slide = deck.slides.add();
  slide.background.fill = paper;
  text(slide, kicker.toUpperCase(), 64, 42, 360, 28, { size: 15, bold: true, color: orange });
  text(slide, title, 58, 78, 760, 108, { size: 42, bold: true, color: ink, leading: 92 });
  if (subtitle) text(slide, subtitle, 64, 188, 790, 60, { size: 19, color: muted, leading: 110 });
  line(slide, 64, 652, 1088, 2, '#D7CDBA');
  text(slide, 'DAGAMEDIA | Examen final TDM', 64, 666, 360, 22, { size: 12, color: muted });
  return slide;
}

function pill(slide, label, x, y, w, fill, color = ink) {
  rect(slide, x, y, w, 38, fill, noLine, 6);
  text(slide, label, x + 14, y + 8, w - 28, 22, { size: 14, bold: true, color, valign: 'middle' });
}

function bullet(slide, title, body, x, y, w, color = ink) {
  line(slide, x, y + 5, 8, 52, orange, 8);
  text(slide, title, x + 22, y, w - 22, 26, { size: 21, bold: true, color });
  text(slide, body, x + 22, y + 32, w - 22, 58, { size: 16, color: muted, leading: 108 });
}

function scoreRow(slide, label, pct, status, x, y, color) {
  text(slide, label, x, y, 320, 24, { size: 16, bold: true });
  rect(slide, x + 330, y + 4, 230, 12, '#DDD5C8', noLine, 3);
  rect(slide, x + 330, y + 4, Math.round(230 * pct), 12, color, noLine, 3);
  text(slide, status, x + 580, y - 2, 260, 24, { size: 15, color: muted });
}

{
  const slide = deck.slides.add();
  slide.background.fill = charcoal;
  image(slide, path.join(repoAssetDir, 'Logo-DAGAMEDIA-Encabezado.png'), 62, 52, 300, 124, 'Logo DAGAMEDIA');
  text(slide, 'Rediseño web corporativo', 64, 208, 760, 70, { size: 50, bold: true, color: paper });
  text(slide, 'Una pagina React para presentar servicios, identidad, portafolio audiovisual, contacto y experiencia interactiva.', 68, 295, 610, 86, { size: 23, color: '#E7DDC8', leading: 108 });
  pill(slide, 'React + Vite', 68, 426, 145, orange, '#111111');
  pill(slide, 'CSS Modules', 230, 426, 150, '#E8D7AA');
  pill(slide, 'Express + Socket.IO', 398, 426, 190, '#C7D6BD');
  rect(slide, 780, 68, 390, 550, '#0E0D0B', noLine, 8);
  image(slide, path.join(assetsDir, 'Captura de pantalla 2026-06-01 124819.png'), 885, 82, 220, 512, 'Captura de pagina DAGAMEDIA');
  text(slide, 'Fecha de consolidacion: 28 de mayo de 2026', 68, 652, 480, 28, { size: 15, color: '#C7BDA7' });
}

{
  const slide = baseSlide('Objetivo', 'Que resolvimos con la pagina', 'La entrega necesitaba una web completa, coherente con wireframes, funcional y lista para revision desde GitHub.');
  bullet(slide, 'Identidad clara', 'La marca DAGAMEDIA queda visible desde el inicio con navegacion directa a cada seccion.', 82, 288, 520);
  bullet(slide, 'Contenido completo', 'Inicio, servicios, About Us, Our Films, contacto y footer conviven en una experiencia One Page.', 82, 410, 520);
  bullet(slide, 'Interaccion', 'Se agregaron microinteracciones, traduccion, cursor personalizado y reacciones en vivo.', 685, 288, 470);
  bullet(slide, 'Entrega defendible', 'El repositorio mantiene historial, README, scripts de ejecucion y rama limpia para merge.', 685, 410, 470);
}

{
  const slide = baseSlide('Arquitectura', 'La pagina se construyo como sistema de componentes', 'La estructura permite explicar tecnologia, separacion de responsabilidades y buenas practicas.');
  const nodes = [
    ['React', 'Componentes UI', 94, 288, orange],
    ['Data', 'Contenido reusable', 360, 288, gold],
    ['CSS Modules', 'Estilos por seccion', 626, 288, '#C7D6BD'],
    ['Express', 'Servidor opcional', 892, 288, '#E8D7AA'],
    ['Socket.IO', 'Reacciones en vivo', 492, 472, '#D8B4A0'],
  ];
  for (const [a, b, x, y, c] of nodes) {
    rect(slide, x, y, 190, 98, c, noLine, 8);
    text(slide, a, x + 18, y + 20, 154, 28, { size: 23, bold: true });
    text(slide, b, x + 18, y + 54, 154, 24, { size: 14, color: '#3D382F' });
  }
  line(slide, 284, 337, 76, 3, '#B7AA95');
  line(slide, 550, 337, 76, 3, '#B7AA95');
  line(slide, 816, 337, 76, 3, '#B7AA95');
  line(slide, 585, 388, 3, 84, '#B7AA95');
  text(slide, 'src/components, src/data, src/hooks, src/services y server.js muestran una division facil de defender ante la revision tecnica.', 130, 584, 960, 46, { size: 19, color: muted, align: 'center' });
}

{
  const slide = baseSlide('Funcionalidades', 'Que se puede mostrar en vivo', 'La exposicion debe enseñar flujos, no solo decir que existen.');
  image(slide, path.join(repoAssetDir, 'POSTER-Oficial-DagaM_Redes.jpg'), 834, 162, 178, 250, 'Poster audiovisual');
  image(slide, path.join(repoAssetDir, 'Logo-Tundama.png'), 1016, 220, 138, 116, 'Logo Tundama');
  bullet(slide, 'Navegacion One Page', 'Navbar con anclas: inicio, servicios, peliculas, nosotros y contacto.', 80, 266, 560);
  bullet(slide, 'Internacionalizacion', 'Traducciones EN/ES para presentar la pagina a distintos publicos.', 80, 386, 560);
  bullet(slide, 'Contacto', 'Formulario estandar y flujo de trabajo con nosotros, mas mapa y redes.', 80, 506, 560);
  bullet(slide, 'Portafolio audiovisual', 'Seccion de films con recursos visuales locales y lightbox.', 690, 466, 420);
}

{
  const slide = baseSlide('Rubrica', 'Si cumple, pero hay dos puntos que conviene rematar', 'Lectura directa contra la rubrica del examen final.');
  scoreRow(slide, 'Funcionalidad completa', 0.86, 'Alta: flujos principales y formularios', 84, 284, green);
  scoreRow(slide, 'Wireframes', 0.72, 'Bien: falta asegurar PDFs en main', 84, 332, gold);
  scoreRow(slide, 'Despliegue y accesibilidad', 0.64, 'Revisar URL publica y ARIA/teclado', 84, 380, gold);
  scoreRow(slide, 'Responsive y UI', 0.82, 'Alta: layout trabajado y microinteracciones', 84, 428, green);
  scoreRow(slide, 'Metodologia CSS', 0.78, 'CSS Modules + global/shared', 84, 476, green);
  scoreRow(slide, 'Cliente-servidor', 0.70, 'Express + Socket.IO explicable', 84, 524, gold);
  scoreRow(slide, 'Codigo y repositorio', 0.82, 'Build y lint pasan; rama limpia', 84, 572, green);
  rect(slide, 905, 276, 180, 180, '#111111', noLine, 90);
  text(slide, 'Merge', 938, 332, 116, 38, { size: 30, bold: true, color: paper, align: 'center' });
  text(slide, 'por PR', 938, 374, 116, 28, { size: 20, color: orange, align: 'center' });
}

{
  const slide = baseSlide('Repositorio', 'Como hacer el merge sin borrar trabajo del equipo', 'La clave es mezclar ramas con PR normal, no squash destructivo ni reset.');
  bullet(slide, 'Rama fuente', '`release/dagamedia-redesign` contiene el rediseño y README actualizado.', 90, 280, 520);
  bullet(slide, 'Rama destino', '`main` es la portada de GitHub; al mergear ahi carga el README.', 90, 400, 520);
  bullet(slide, 'Historial', 'Los commits de los compañeros siguen en el grafo de Git si se hace merge normal.', 690, 280, 460);
  bullet(slide, 'Verificacion', 'Antes de cerrar: revisar URL publica, PDFs de wireframes e informe final.', 690, 400, 460);
  text(slide, 'Pista para el PR: comparar release/dagamedia-redesign -> main y resolver solo si GitHub marca conflicto real.', 120, 584, 1000, 42, { size: 22, bold: true, color: ink, align: 'center' });
}

{
  const slide = baseSlide('Guion 5 min', 'Que decir en la exposicion', 'Orden recomendado para hablar claro y cubrir la rubrica.');
  const steps = [
    ['0:00 - 0:40', 'Problema y objetivo del examen'],
    ['0:40 - 1:30', 'Recorrido visual por la pagina'],
    ['1:30 - 2:30', 'Tecnologias: React, Vite, CSS Modules, Express y Socket.IO'],
    ['2:30 - 3:40', 'Funcionalidades: traduccion, contacto, films, interacciones'],
    ['3:40 - 4:35', 'Rubrica: que cumple y que se valido con build/lint'],
    ['4:35 - 5:00', 'Merge, despliegue y cierre'],
  ];
  steps.forEach(([time, copy], index) => {
    const y = 260 + index * 66;
    rect(slide, 95, y, 150, 42, index % 2 ? '#E8D7AA' : '#C7D6BD', noLine, 6);
    text(slide, time, 108, y + 10, 124, 20, { size: 15, bold: true, align: 'center' });
    text(slide, copy, 278, y + 8, 780, 28, { size: 22, color: ink });
  });
}

const pptxPath = path.join(outputDir, 'DAGAMEDIA-presentacion-redisenio.pptx');
for (let i = 0; i < deck.slides.count; i += 1) {
  const slide = deck.slides.getItem(i);
  const png = await deck.export({ slide, format: 'png', scale: 1 });
  await png.save(path.join(previewDir, `slide-${String(i + 1).padStart(2, '0')}.png`));
}
const pptx = await PresentationFile.exportPptx(deck);
await pptx.save(pptxPath);
console.log(pptxPath);
