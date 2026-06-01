import { useEffect, useMemo, useRef, useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import {
  REACTION_EMOJIS,
  REACTION_TIMING,
  createFloatingReaction,
  getConnectionLabel,
  getLanguageText,
  getReactionPhrases,
  getSectionLabelKey,
} from '../../data/liveReactionsData';
import styles from './LiveReactions.module.css';

function HeartIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  );
}

function ArrowUpIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z" />
    </svg>
  );
}

function FloatingReaction({ reaction }) {
  return (
    <div
      className={`${styles['floating-emoji-item']} ${
        reaction.isPhrase ? styles['floating-phrase-item'] : ''
      }`}
      style={{
        '--drift-1': reaction.drift1,
        '--drift-2': reaction.drift2,
        '--drift-3': reaction.drift3,
      }}
    >
      {reaction.content}
    </div>
  );
}

function FloatingReactionsLayer({ reactions }) {
  return (
    <div className={styles['floating-emojis-layer']}>
      {reactions.map((reaction) => (
        <FloatingReaction key={reaction.id} reaction={reaction} />
      ))}
    </div>
  );
}

function StatsWidget({
  connectionState,
  currentSection,
  currentSectionCount,
  activeUsersCount,
}) {
  const { t, language } = useLanguage();

  const text = getLanguageText(language);
  const sectionLabel = t(getSectionLabelKey(currentSection));
  const statusLabel = getConnectionLabel(language, connectionState);

  const userWord =
    currentSectionCount === 1 ? text.userSingular : text.userPlural;

  return (
    <div className={styles['reactions-stats-container']}>
      <div className={`${styles['section-stats-widget']} ${styles[`status-${connectionState}`]}`}>
        <span
          className={`${styles['stats-dot-active']} ${styles[`dot-${connectionState}`]}`}
          aria-hidden="true"
        />

        <span className={styles['stats-text']}>
          <strong>{currentSectionCount}</strong> {userWord} {text.inSection}{' '}
          <em>{sectionLabel}</em>

          <span className={styles['stats-separator']}>|</span>

          {text.total}: <strong>{activeUsersCount}</strong>

          <span className={styles['stats-separator']}>·</span>

          <span
            className={`${styles['stats-status-label']} ${styles[`status-label-${connectionState}`]}`}
          >
            {statusLabel}
          </span>
        </span>
      </div>
    </div>
  );
}

function ReactionTray({ open, disabled, phrases, onSendReaction, trayRef }) {
  const { language } = useLanguage();
  const text = getLanguageText(language);

  return (
    <div
      ref={trayRef}
      className={`${styles['emoji-tray']} ${open ? styles['tray-open'] : ''} ${
        disabled ? styles.disabled : ''
      }`}
      role="toolbar"
      aria-label={text.reactionTray}
    >
      <div className={styles['emoji-tray-section']}>
        {REACTION_EMOJIS.map((emoji) => (
          <button
            key={emoji}
            type="button"
            className={styles['emoji-option']}
            onClick={() => onSendReaction(emoji)}
            disabled={disabled}
            title={`${text.sendReaction}: ${emoji}`}
          >
            {emoji}
          </button>
        ))}
      </div>

      <div className={styles['phrase-tray-section']}>
        {phrases.map((phrase) => (
          <button
            key={phrase}
            type="button"
            className={styles['phrase-option']}
            onClick={() => onSendReaction(phrase)}
            disabled={disabled}
            title={`${text.sendReaction}: ${phrase}`}
          >
            {phrase}
          </button>
        ))}
      </div>
    </div>
  );
}

function ReactionButton({
  open,
  disabled,
  cooldownProgress,
  onClick,
  buttonRef,
}) {
  const { language } = useLanguage();
  const text = getLanguageText(language);

  return (
    <button
      ref={buttonRef}
      type="button"
      className={`${styles['action-btn-circle']} ${open ? styles['btn-active'] : ''} ${
        disabled ? styles['btn-cooldown'] : ''
      }`}
      aria-label={text.sendReaction}
      aria-expanded={open}
      onClick={onClick}
      disabled={disabled}
      style={{ '--cooldown-progress': `${cooldownProgress}%` }}
    >
      {disabled ? (
        <span className={styles['cooldown-timer']} aria-hidden="true">
          ⏳
        </span>
      ) : (
        <HeartIcon />
      )}
    </button>
  );
}

function BackToTopButton() {
  const { language } = useLanguage();
  const text = getLanguageText(language);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      type="button"
      className={styles['action-btn-circle']}
      onClick={scrollToTop}
      aria-label={text.backToTop}
      title={text.backToTop}
    >
      <ArrowUpIcon />
    </button>
  );
}

function ReactionsControls({
  showTray,
  cooldown,
  cooldownProgress,
  phrases,
  trayRef,
  buttonRef,
  onToggleTray,
  onSendReaction,
}) {
  return (
    <div className={styles['reactions-controls-container']}>
      <div className={styles['controls-row']}>
        <div className={styles['reaction-button-wrapper']}>
          <ReactionTray
            open={showTray}
            disabled={cooldown}
            phrases={phrases}
            onSendReaction={onSendReaction}
            trayRef={trayRef}
          />

          <ReactionButton
            open={showTray}
            disabled={cooldown}
            cooldownProgress={cooldownProgress}
            onClick={onToggleTray}
            buttonRef={buttonRef}
          />
        </div>

        <BackToTopButton />
      </div>
    </div>
  );
}

export default function LiveReactions({
  socket,
  currentSection,
  sectionCounts,
  activeUsersCount,
}) {
  const { language } = useLanguage();

  const trayRef = useRef(null);
  const buttonRef = useRef(null);

  const [floatingReactions, setFloatingReactions] = useState([]);
  const [showTray, setShowTray] = useState(false);
  const [connectionState, setConnectionState] = useState('connecting');
  const [cooldown, setCooldown] = useState(false);
  const [cooldownProgress, setCooldownProgress] = useState(100);

  const phrases = useMemo(() => getReactionPhrases(language), [language]);

  useEffect(() => {
    if (!socket) {
      setConnectionState('offline');
      return undefined;
    }

    const handleConnect = () => {
      setConnectionState('connected');
    };

    const handleDisconnect = () => {
      setConnectionState('offline');
    };

    const handleConnectError = () => {
      setConnectionState('offline');
    };

    socket.on('connect', handleConnect);
    socket.on('disconnect', handleDisconnect);
    socket.on('connect_error', handleConnectError);

    setConnectionState(socket.connected ? 'connected' : 'connecting');

    return () => {
      socket.off('connect', handleConnect);
      socket.off('disconnect', handleDisconnect);
      socket.off('connect_error', handleConnectError);
    };
  }, [socket]);

  useEffect(() => {
    if (!socket) return undefined;

    const handleNewReaction = (reaction) => {
      const floatingReaction = createFloatingReaction(reaction);

      setFloatingReactions((currentReactions) => [
        ...currentReactions,
        floatingReaction,
      ]);

      window.setTimeout(() => {
        setFloatingReactions((currentReactions) =>
          currentReactions.filter(
            (currentReaction) => currentReaction.id !== floatingReaction.id
          )
        );
      }, REACTION_TIMING.floatingDuration);
    };

    socket.on('new_reaction', handleNewReaction);

    return () => {
      socket.off('new_reaction', handleNewReaction);
    };
  }, [socket]);

  useEffect(() => {
    if (!showTray) return undefined;

    const handleOutsideClick = (event) => {
      const target = event.target;

      if (!(target instanceof Element)) {
        return;
      }

      const clickedInsideTray = trayRef.current?.contains(target);
      const clickedButton = buttonRef.current?.contains(target);

      if (!clickedInsideTray && !clickedButton) {
        setShowTray(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [showTray]);

  useEffect(() => {
    if (!cooldown) return undefined;

    const { cooldownDuration, cooldownInterval } = REACTION_TIMING;
    const progressStep = (cooldownInterval / cooldownDuration) * 100;

    const timer = window.setInterval(() => {
      setCooldownProgress((currentProgress) => {
        const nextProgress = currentProgress + progressStep;

        if (nextProgress >= 100) {
          window.clearInterval(timer);
          setCooldown(false);
          return 100;
        }

        return nextProgress;
      });
    }, cooldownInterval);

    return () => {
      window.clearInterval(timer);
    };
  }, [cooldown]);

  const sendReaction = (reactionContent) => {
    if (cooldown) return;

    if (socket?.connected) {
      socket.emit('send_reaction', reactionContent);
    }

    setCooldown(true);
    setCooldownProgress(0);
    setShowTray(false);
  };

  const toggleTray = () => {
    if (cooldown) return;

    setShowTray((currentValue) => !currentValue);
  };

  const currentSectionCount = sectionCounts?.[currentSection] || 1;

  return (
    <>
      <FloatingReactionsLayer reactions={floatingReactions} />

      <StatsWidget
        connectionState={connectionState}
        currentSection={currentSection}
        currentSectionCount={currentSectionCount}
        activeUsersCount={activeUsersCount}
      />

      <ReactionsControls
        showTray={showTray}
        cooldown={cooldown}
        cooldownProgress={cooldownProgress}
        phrases={phrases}
        trayRef={trayRef}
        buttonRef={buttonRef}
        onToggleTray={toggleTray}
        onSendReaction={sendReaction}
      />
    </>
  );
}