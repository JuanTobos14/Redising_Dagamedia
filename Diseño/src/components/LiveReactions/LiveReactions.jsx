import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import './LiveReactions.css';

const EMOJIS = ['🔥', '🚀', '❤️', '🎉', '😮', '👏'];

export default function LiveReactions({ socket, currentSection, sectionCounts, activeUsersCount }) {
  const [floatingEmojis, setFloatingEmojis] = useState([]);
  const [showTray, setShowTray]             = useState(false);
  const [connectionState, setConnectionState] = useState('connecting'); // 'connected'|'connecting'|'offline'
  const trayRef  = useRef(null);
  const btnRef   = useRef(null);
  const { t, language } = useLanguage();

  /* Track socket connection state for indicator */
  useEffect(() => {
    if (!socket) { setConnectionState('offline'); return; }
    const onConnect    = () => setConnectionState('connected');
    const onDisconnect = () => setConnectionState('offline');
    const onConnectError = () => setConnectionState('offline');
    socket.on('connect',       onConnect);
    socket.on('disconnect',    onDisconnect);
    socket.on('connect_error', onConnectError);
    if (socket.connected) setConnectionState('connected');
    return () => {
      socket.off('connect',       onConnect);
      socket.off('disconnect',    onDisconnect);
      socket.off('connect_error', onConnectError);
    };
  }, [socket]);

  /* Receive remote reactions */
  useEffect(() => {
    if (!socket) return;
    const handle = (reaction) => {
      const newR = {
        id:     reaction.id,
        emoji:  reaction.emoji,
        drift1: `${(Math.random() - 0.5) * 60}px`,
        drift2: `${(Math.random() - 0.5) * 150}px`,
        drift3: `${(Math.random() - 0.5) * 220}px`,
      };
      setFloatingEmojis(prev => [...prev, newR]);
      setTimeout(() => {
        setFloatingEmojis(prev => prev.filter(r => r.id !== newR.id));
      }, 2300);
    };
    socket.on('new_reaction', handle);
    return () => socket.off('new_reaction', handle);
  }, [socket]);

  /* Close tray on click-outside */
  useEffect(() => {
    if (!showTray) return;
    const handler = (e) => {
      if (trayRef.current  && !trayRef.current.contains(e.target) &&
          btnRef.current   && !btnRef.current.contains(e.target)) {
        setShowTray(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [showTray]);

  const sendReaction = (emoji) => {
    if (socket && socket.connected) socket.emit('send_reaction', emoji);
    setShowTray(false);
  };

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const getSectionLabel = (secId) => {
    const map = { inicio: 'nav_inicio', nosotros: 'nav_nosotros', servicios: 'nav_servicios', peliculas: 'nav_peliculas', contacto: 'nav_contacto' };
    return t(map[secId] || 'nav_inicio');
  };

  const currentSectionCount = sectionCounts ? (sectionCounts[currentSection] || 1) : 1;
  const plural = currentSectionCount === 1;
  const userWord = language === 'es' ? (plural ? 'usuario' : 'usuarios') : (plural ? 'user' : 'users');
  const inWord   = language === 'es' ? 'en' : 'in';

  const statusLabel = {
    connected:  language === 'es' ? 'en vivo'      : 'live',
    connecting: language === 'es' ? 'conectando…'  : 'connecting…',
    offline:    language === 'es' ? 'sin conexión'  : 'offline',
  }[connectionState];

  return (
    <>
      {/* Floating Emojis */}
      <div className="floating-emojis-layer">
        {floatingEmojis.map((r) => (
          <div
            key={r.id}
            className="floating-emoji-item"
            style={{ '--drift-1': r.drift1, '--drift-2': r.drift2, '--drift-3': r.drift3 }}
          >
            {r.emoji}
          </div>
        ))}
      </div>

      {/* Controls Overlay */}
      <div className="reactions-overlay-container">

        {/* Stats widget */}
        <div className={`section-stats-widget status-${connectionState}`}>
          <div className={`stats-dot-active dot-${connectionState}`} />
          <span className="stats-text">
            <strong>{currentSectionCount}</strong> {userWord} {inWord} <em>{getSectionLabel(currentSection)}</em>
            <span className="stats-separator">|</span>
            Total: <strong>{activeUsersCount}</strong>
            <span className="stats-separator">·</span>
            <span className={`stats-status-label status-label-${connectionState}`}>{statusLabel}</span>
          </span>
        </div>

        {/* Action Row */}
        <div className="controls-row">

          {/* Reactions panel */}
          <div className="reaction-button-wrapper">

            {/* Emoji tray — controlled by state now (fixes the CSS-only hover bug) */}
            <div
              ref={trayRef}
              className={`emoji-tray ${showTray ? 'tray-open' : ''}`}
              role="toolbar"
              aria-label="Reaction emojis"
            >
              {EMOJIS.map((emoji) => (
                <button
                  key={emoji}
                  type="button"
                  className="emoji-option"
                  onClick={() => sendReaction(emoji)}
                  title={`Send ${emoji}`}
                >
                  {emoji}
                </button>
              ))}
            </div>

            <button
              ref={btnRef}
              type="button"
              className={`action-btn-circle ${showTray ? 'btn-active' : ''}`}
              aria-label="Send Reaction"
              aria-expanded={showTray}
              onClick={() => setShowTray(p => !p)}
            >
              <svg viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
            </button>
          </div>

          {/* Back to top */}
          <button
            type="button"
            className="action-btn-circle"
            onClick={scrollToTop}
            aria-label="Back to Top"
            title={language === 'es' ? 'Volver arriba' : 'Back to top'}
          >
            <svg viewBox="0 0 24 24">
              <path d="M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z" />
            </svg>
          </button>
        </div>

      </div>
    </>
  );
}
