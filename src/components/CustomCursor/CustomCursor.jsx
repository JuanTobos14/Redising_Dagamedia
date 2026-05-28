import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import styles from './CustomCursor.module.css';

const DESKTOP_CURSOR_QUERY = '(hover: hover) and (pointer: fine)';

const INTERACTIVE_SELECTOR = [
  '[data-cursor]',
  'a',
  'button',
  'input',
  'select',
  'textarea',
  'label[for]',
  '[role="button"]',
].join(', ');

function isDesktopCursorAvailable() {
  return window.matchMedia(DESKTOP_CURSOR_QUERY).matches;
}

function getPointerPosition(event) {
  return {
    x: event.clientX,
    y: event.clientY,
  };
}

function getCursorText(target, language) {
  const customText = target.getAttribute('data-cursor');

  if (customText) {
    return customText;
  }

  return language === 'es' ? '' : '';
}

export default function CustomCursor() {
  const { language } = useLanguage();

  const dotRef = useRef(null);
  const ringRef = useRef(null);

  const mouseRef = useRef({ x: 0, y: 0 });
  const ringPositionRef = useRef({ x: 0, y: 0 });
  const animationFrameRef = useRef(null);

  const [isEnabled, setIsEnabled] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [cursorText, setCursorText] = useState('');

  useEffect(() => {
    const mediaQuery = window.matchMedia(DESKTOP_CURSOR_QUERY);

    const updateCursorAvailability = () => {
      const shouldEnable = mediaQuery.matches;

      setIsEnabled(shouldEnable);

      if (!shouldEnable) {
        setIsVisible(false);
        document.body.classList.remove('custom-cursor-active');
      }
    };

    updateCursorAvailability();

    mediaQuery.addEventListener('change', updateCursorAvailability);

    return () => {
      mediaQuery.removeEventListener('change', updateCursorAvailability);
      document.body.classList.remove('custom-cursor-active');
    };
  }, []);

  useEffect(() => {
    if (!isEnabled || !isDesktopCursorAvailable()) {
      return undefined;
    }

    document.body.classList.add('custom-cursor-active');

    const handlePointerMove = (event) => {
      const { x, y } = getPointerPosition(event);

      mouseRef.current.x = x;
      mouseRef.current.y = y;

      setIsVisible(true);
    };

    const handlePointerDown = () => {
      setIsClicking(true);
    };

    const handlePointerUp = () => {
      setIsClicking(false);
    };

    const handlePointerLeaveWindow = () => {
      setIsVisible(false);
      setIsClicking(false);
    };

    const handlePointerEnterWindow = () => {
      setIsVisible(true);
    };

    const handlePointerOver = (event) => {
      if (!(event.target instanceof Element)) {
        return;
      }

      if (event.target.tagName === 'IFRAME' || event.target.closest('iframe') || event.target.closest('.lightbox-modal')) {
        setIsHovered(false);
        setCursorText('');
        document.body.classList.remove('custom-cursor-active');
        return;
      }

      document.body.classList.add('custom-cursor-active');

      const interactiveTarget = event.target.closest(INTERACTIVE_SELECTOR);

      if (!interactiveTarget) {
        setIsHovered(false);
        setCursorText('');
        return;
      }

      setIsHovered(true);
      setCursorText(getCursorText(interactiveTarget, language));
    };

    const handlePointerOut = (event) => {
      if (!(event.target instanceof Element)) {
        return;
      }

      if (event.target.tagName === 'IFRAME' || event.target.closest('iframe') || event.target.closest('.lightbox-modal')) {
        document.body.classList.add('custom-cursor-active');
        return;
      }

      const nextTarget = event.relatedTarget;

      if (
        nextTarget instanceof Element &&
        nextTarget.closest(INTERACTIVE_SELECTOR)
      ) {
        return;
      }

      setIsHovered(false);
      setCursorText('');
    };

    const updateCursorPosition = () => {
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseRef.current.x}px, ${mouseRef.current.y}px, 0)`;
      }

      const ease = 0.12;

      ringPositionRef.current.x +=
        (mouseRef.current.x - ringPositionRef.current.x) * ease;

      ringPositionRef.current.y +=
        (mouseRef.current.y - ringPositionRef.current.y) * ease;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPositionRef.current.x}px, ${ringPositionRef.current.y}px, 0)`;
      }

      animationFrameRef.current = requestAnimationFrame(updateCursorPosition);
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointerup', handlePointerUp);
    window.addEventListener('pointerover', handlePointerOver);
    window.addEventListener('pointerout', handlePointerOut);
    document.addEventListener('mouseleave', handlePointerLeaveWindow);
    document.addEventListener('mouseenter', handlePointerEnterWindow);

    animationFrameRef.current = requestAnimationFrame(updateCursorPosition);

    return () => {
      document.body.classList.remove('custom-cursor-active');

      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('pointerover', handlePointerOver);
      window.removeEventListener('pointerout', handlePointerOut);
      document.removeEventListener('mouseleave', handlePointerLeaveWindow);
      document.removeEventListener('mouseenter', handlePointerEnterWindow);

      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isEnabled, language]);

  if (!isEnabled || !isVisible) {
    return null;
  }

  return (
    <div
      className={`${styles['custom-cursor-wrapper']} ${isHovered ? styles.hovered : ''} ${
        isClicking ? styles.clicking : ''
      } ${cursorText ? styles['has-text'] : ''}`}
      aria-hidden="true"
    >
      <div className={styles['cursor-dot-position']} ref={dotRef}>
        <span className={styles['cursor-dot']} />
      </div>

      <div className={styles['cursor-ring-position']} ref={ringRef}>
        <span className={styles['cursor-ring']}>
          {cursorText && (
            <span className={styles['cursor-text']}>
              {cursorText}
            </span>
          )}
        </span>
      </div>
    </div>
  );
}
