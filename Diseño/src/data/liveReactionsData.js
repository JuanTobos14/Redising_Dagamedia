export const REACTION_EMOJIS = ['🔥', '🚀', '❤️', '🎉', '😮', '👏'];

export const REACTION_PHRASES = {
  es: ['¡Increíble!', '¡Espectacular!', '¡Buenísimo!', '¡Me encanta!'],
  en: ['Awesome!', 'Amazing!', 'Spectacular!', 'Love it!'],
};

export const SECTION_LABEL_KEYS = {
  inicio: 'nav_inicio',
  nosotros: 'nav_nosotros',
  servicios: 'nav_servicios',
  peliculas: 'nav_peliculas',
  contacto: 'nav_contacto',
};

export const CONNECTION_LABELS = {
  es: {
    connected: 'en vivo',
    connecting: 'conectando…',
    offline: 'sin conexión',
  },
  en: {
    connected: 'live',
    connecting: 'connecting…',
    offline: 'offline',
  },
};

export const REACTION_TEXT = {
  es: {
    userSingular: 'usuario',
    userPlural: 'usuarios',
    inSection: 'en',
    total: 'Total',
    reactionTray: 'Bandeja de reacciones',
    sendReaction: 'Enviar reacción',
    backToTop: 'Volver arriba',
  },
  en: {
    userSingular: 'user',
    userPlural: 'users',
    inSection: 'in',
    total: 'Total',
    reactionTray: 'Reaction tray',
    sendReaction: 'Send reaction',
    backToTop: 'Back to top',
  },
};

export const REACTION_TIMING = {
  cooldownDuration: 1500,
  cooldownInterval: 30,
  floatingDuration: 2300,
};

export function getLanguageText(language) {
  return REACTION_TEXT[language] || REACTION_TEXT.es;
}

export function getConnectionLabel(language, connectionState) {
  const labels = CONNECTION_LABELS[language] || CONNECTION_LABELS.es;

  return labels[connectionState] || labels.offline;
}

export function getReactionPhrases(language) {
  return REACTION_PHRASES[language] || REACTION_PHRASES.es;
}

export function getSectionLabelKey(sectionId) {
  return SECTION_LABEL_KEYS[sectionId] || SECTION_LABEL_KEYS.inicio;
}

export function createFloatingReaction(reaction) {
  const reactionContent = reaction.emoji || reaction;
  const reactionId = reaction.id || `${Date.now()}-${Math.random()}`;

  return {
    id: reactionId,
    content: reactionContent,
    isPhrase: reactionContent.length > 2,
    drift1: `${(Math.random() - 0.5) * 60}px`,
    drift2: `${(Math.random() - 0.5) * 150}px`,
    drift3: `${(Math.random() - 0.5) * 220}px`,
  };
}