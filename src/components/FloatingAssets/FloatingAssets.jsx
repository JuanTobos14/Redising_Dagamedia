import { useEffect, useRef } from 'react';
import { FLOATING_ASSETS } from '../../data/floatingAssetsData';
import styles from './FloatingAssets.module.css';

function StarAsset() {
  return (
    <svg viewBox="0 0 100 100" width="80" height="80" aria-hidden="true">
      <defs>
        <radialGradient id="starGrad" cx="30%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#fff" />
          <stop offset="50%" stopColor="#ffc502" />
          <stop offset="100%" stopColor="#ff6b00" />
        </radialGradient>

        <filter id="glowStar" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="8" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      <path
        d="M50,5 C50,35 65,50 95,50 C65,50 50,65 50,95 C50,65 35,50 5,50 C35,50 50,35 5,5"
        fill="url(#starGrad)"
        filter="url(#glowStar)"
      />
    </svg>
  );
}

function ReelAsset() {
  return (
    <svg viewBox="0 0 120 120" width="100" height="100" aria-hidden="true">
      <defs>
        <linearGradient id="reelGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2c2c2c" />
          <stop offset="50%" stopColor="#1e1e1e" />
          <stop offset="100%" stopColor="#0a0a0a" />
        </linearGradient>

        <linearGradient id="orangeBorder" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ff9f43" />
          <stop offset="100%" stopColor="#ff6b00" />
        </linearGradient>
      </defs>

      <circle cx="60" cy="60" r="50" fill="url(#reelGrad)" stroke="url(#orangeBorder)" strokeWidth="4" />
      <circle cx="60" cy="60" r="42" fill="none" stroke="#222" strokeWidth="2" strokeDasharray="6 3" />
      <circle cx="60" cy="32" r="10" fill="#121212" />
      <circle cx="60" cy="88" r="10" fill="#121212" />
      <circle cx="32" cy="60" r="10" fill="#121212" />
      <circle cx="88" cy="60" r="10" fill="#121212" />
      <circle cx="60" cy="60" r="12" fill="url(#orangeBorder)" />
      <rect x="57" y="52" width="6" height="16" rx="2" fill="#fff" transform="rotate(45 60 60)" />
    </svg>
  );
}

function PlayAsset() {
  return (
    <svg viewBox="0 0 100 100" width="90" height="90" aria-hidden="true">
      <defs>
        <linearGradient id="prismGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffb900" />
          <stop offset="50%" stopColor="#ff6b00" />
          <stop offset="100%" stopColor="#d35400" />
        </linearGradient>

        <filter id="shadowPlay">
          <feDropShadow dx="3" dy="10" stdDeviation="5" floodOpacity="0.4" />
        </filter>
      </defs>

      <polygon points="25,15 85,50 25,85" fill="url(#prismGrad)" filter="url(#shadowPlay)" />
      <polygon points="25,15 85,50 85,55 25,90" fill="rgba(0,0,0,0.15)" />
      <polygon points="25,15 28,12 85,50 82,53" fill="rgba(255,255,255,0.25)" />
    </svg>
  );
}

function DiamondAsset() {
  return (
    <svg viewBox="0 0 100 100" width="80" height="80" aria-hidden="true">
      <defs>
        <linearGradient id="diamGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ff7675" />
          <stop offset="100%" stopColor="#d63031" />
        </linearGradient>

        <linearGradient id="diamFacet" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.4)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </linearGradient>
      </defs>

      <polygon points="50,10 85,45 15,45" fill="url(#diamGrad)" />
      <polygon points="50,10 85,45 50,45" fill="url(#diamFacet)" />
      <polygon points="15,45 85,45 50,90" fill="url(#diamGrad)" />
      <polygon points="50,45 85,45 50,90" fill="url(#diamFacet)" />
      <path d="M50,10 L50,90 M15,45 L85,45" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
    </svg>
  );
}

function FloatingAssetIcon({ type }) {
  const icons = {
    star: <StarAsset />,
    reel: <ReelAsset />,
    play: <PlayAsset />,
    diamond: <DiamondAsset />,
  };

  return icons[type] || null;
}

export default function FloatingAssets() {
  const assetsRef = useRef({});
  const animationFrameRef = useRef(null);

  useEffect(() => {
    const updateFloatingAssets = () => {
      const scrollY = window.scrollY;

      FLOATING_ASSETS.forEach((asset) => {
        const element = assetsRef.current[asset.id];

        if (!element) return;

        const offsetY = (scrollY - asset.scrollOffset) * asset.translateFactor;
        const rotation = scrollY * asset.rotateFactor;

        element.style.transform = `translate3d(0, ${offsetY}px, 0) rotate(${rotation}deg)`;
      });
    };

    const handleScroll = () => {
      if (animationFrameRef.current) return;

      animationFrameRef.current = requestAnimationFrame(() => {
        updateFloatingAssets();
        animationFrameRef.current = null;
      });
    };

    updateFloatingAssets();

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);

      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <div className={styles['floating-assets-container']} aria-hidden="true">
      {FLOATING_ASSETS.map((asset) => (
        <div
          key={asset.id}
          ref={(element) => {
            assetsRef.current[asset.id] = element;
          }}
          className={`${styles['floating-asset']} ${styles[asset.className]}`}
        >
          <FloatingAssetIcon type={asset.type} />
        </div>
      ))}
    </div>
  );
}
