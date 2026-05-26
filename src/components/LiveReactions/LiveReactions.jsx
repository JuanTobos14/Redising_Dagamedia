import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import './LiveReactions.css';

const EMOJIS = ['🔥', '🚀', '❤️', '🎉', '😮', '👏'];

export default function LiveReactions({ socket, currentSection, sectionCounts, activeUsersCount }) {
  const [floatingEmojis, setFloatingEmojis] = useState([]);
  const [showTray, setShowTray] = useState(false);
  const { t, language } = useLanguage();

  // Listen to remote reactions from the WebSocket server
  useEffect(() => {
    if (!socket) return;

    const handleNewReaction = (reaction) => {
      const id = reaction.id;
      // Add new reaction with custom drifts for organic floating paths
      const newReaction = {
        id,
        emoji: reaction.emoji,
        drift1: `${(Math.random() - 0.5) * 60}px`,
        drift2: `${(Math.random() - 0.5) * 150}px`,
        drift3: `${(Math.random() - 0.5) * 220}px`
      };

      setFloatingEmojis((prev) => [...prev, newReaction]);

      // Clean up after animation finishes (2.2 seconds)
      setTimeout(() => {
        setFloatingEmojis((prev) => prev.filter((r) => r.id !== id));
      }, 2300);
    };

    socket.on('new_reaction', handleNewReaction);
    return () => {
      socket.off('new_reaction', handleNewReaction);
    };
  }, [socket]);

  // Send a reaction to the server
  const sendReaction = (emoji) => {
    if (socket) {
      socket.emit('send_reaction', emoji);
    }
  };

  // Scroll to top of the page
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Human readable section name mapper using translations
  const getSectionLabel = (secId) => {
    switch (secId) {
      case 'inicio': return t('nav_inicio');
      case 'nosotros': return t('nav_nosotros');
      case 'servicios': return t('nav_servicios');
      case 'peliculas': return t('nav_peliculas');
      case 'contacto': return t('nav_contacto');
      default: return t('nav_inicio');
    }
  };

  // Count of users in the current section
  const currentSectionCount = sectionCounts ? (sectionCounts[currentSection] || 1) : 1;

  return (
    <>
      {/* Floating Emojis Layer */}
      <div className="floating-emojis-layer">
        {floatingEmojis.map((r) => (
          <div
            key={r.id}
            className="floating-emoji-item"
            style={{
              '--drift-1': r.drift1,
              '--drift-2': r.drift2,
              '--drift-3': r.drift3
            }}
          >
            {r.emoji}
          </div>
        ))}
      </div>

      {/* Main Overlay UI Controls */}
      <div className="reactions-overlay-container">
        
        {/* Real-time Section User Count Stats */}
        <div className="section-stats-widget">
          <div className="stats-dot-active" />
          <span className="stats-text">
            <strong>{currentSectionCount}</strong> {currentSectionCount === 1 ? (language === 'es' ? 'usuario' : 'user') : (language === 'es' ? 'usuarios' : 'users')} {language === 'es' ? 'en' : 'in'} <em>{getSectionLabel(currentSection)}</em> 
            <span style={{ margin: '0 6px', opacity: 0.4 }}>|</span> 
            Total: <strong>{activeUsersCount}</strong>
          </span>
        </div>

        {/* Action Row */}
        <div className="controls-row">
          
          {/* Reactions trigger & panel */}
          <div className="reaction-button-wrapper">
            <div className="emoji-tray">
              {EMOJIS.map((emoji) => (
                <button
                  key={emoji}
                  type="button"
                  className="emoji-option"
                  onClick={() => sendReaction(emoji)}
                  title={`Enviar ${emoji}`}
                >
                  {emoji}
                </button>
              ))}
            </div>

            <button
              type="button"
              className="action-btn-circle"
              aria-label="Send Reaction"
              onClick={() => setShowTray(!showTray)}
            >
              {/* Heart/reaction icon */}
              <svg viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
            </button>
          </div>

          {/* Back to top button */}
          <button
            type="button"
            className="action-btn-circle"
            onClick={scrollToTop}
            aria-label="Back to Top"
            title="Volver arriba"
          >
            {/* Arrow up icon */}
            <svg viewBox="0 0 24 24">
              <path d="M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z" />
            </svg>
          </button>
        </div>

      </div>
    </>
  );
}
