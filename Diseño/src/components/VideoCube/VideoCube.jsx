import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useLanguage } from '../../context/LanguageContext';
import useBodyScrollLock from '../../hooks/useBodyScrollLock';
import {
  CUBE_FACES,
  CUBE_INSTRUCTIONS,
  CUBE_PROJECTS,
  CUBE_ROTATION,
  getYoutubePlayer,
  getYoutubePoster,
  getYoutubePosterFallback,
  getYoutubePreview,
} from '../../data/videoCubeData';
import styles from './VideoCube.module.css';

function getPointerPosition(event) {
  const pointer = event.touches?.[0] || event.changedTouches?.[0] || event;

  return {
    x: pointer.clientX,
    y: pointer.clientY,
  };
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

function CubeInstruction({ text }) {
  return (
    <div className={styles['cube-instruction-text']}>
      <span className={styles['cube-instruction-icon']} aria-hidden="true">
        ◄
      </span>

      {text}

      <span className={styles['cube-instruction-icon']} aria-hidden="true">
        ►
      </span>
    </div>
  );
}

function CubeFace({
  project,
  faceName,
  faceKey,
  isActive,
  isPreviewVisible,
  onClick,
  onMouseEnter,
  onMouseLeave,
  language,
}) {
  const playLabel =
    language === 'es'
      ? 'Reproducir video del cubo'
      : 'Play cube video';

  const cursorText = language === 'es' ? 'VER' : 'PLAY';

  return (
    <div
      className={`${styles['cube-face']} ${styles[`face-${faceName}`]} ${
        isActive ? styles['face-active'] : ''
      }`}
      onDragStart={(event) => event.preventDefault()}
      onMouseEnter={() => onMouseEnter(faceKey)}
      onMouseLeave={() => onMouseLeave(faceKey)}
    >
      <a
        href={`https://youtu.be/${project.id}`}
        onClick={(event) => onClick(event, project.id)}
        className={styles['face-card-link']}
        data-cursor={cursorText}
        aria-label={playLabel}
      >
        <div className={styles['face-image-wrapper']}>
          <img
            src={getYoutubePoster(project.id)}
            alt=""
            className={`${styles['face-poster-img']} ${
              isPreviewVisible ? styles['preview-visible'] : ''
            }`}
            loading="lazy"
            onError={(event) => {
              event.currentTarget.src = getYoutubePosterFallback(project.id);
            }}
          />

          {isPreviewVisible && (
            <iframe
              src={getYoutubePreview(project.id)}
              title={playLabel}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media"
              className={styles['face-video-preview']}
            />
          )}

          <div className={styles['face-play-overlay']}>
            <div className={styles['face-play-icon']}>
              <PlayIcon />
            </div>
          </div>

          <div className={styles['face-3d-shine']} aria-hidden="true" />
        </div>
      </a>
    </div>
  );
}

function VideoCubeLightbox({ videoId, onClose, language }) {
  useBodyScrollLock(true);

  const title =
    language === 'es'
      ? 'Video del cubo Dagamedia'
      : 'Dagamedia cube video';

  return createPortal(
    <div className="lightbox-modal" onClick={onClose}>
      <button
        type="button"
        className="lightbox-close"
        onClick={onClose}
        aria-label={language === 'es' ? 'Cerrar reproductor' : 'Close player'}
      >
        ✕
      </button>

      <div
        className="lightbox-content"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="lightbox-video-wrapper">
          <iframe
            src={getYoutubePlayer(videoId)}
            title={title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      </div>
    </div>,
    document.body
  );
}

export default function VideoCube() {
  const cubeRef = useRef(null);

  const rotationRef = useRef({
    x: CUBE_ROTATION.initialX,
    y: CUBE_ROTATION.initialY,
  });

  const dragRef = useRef({
    isDragging: false,
    startX: 0,
    startY: 0,
    startRotX: 0,
    startRotY: 0,
    hasMoved: false,
  });

  const autoRotateRef = useRef({
    active: true,
    timer: null,
  });

  const previewTimersRef = useRef({});

  const { language } = useLanguage();

  const [activeModalVideo, setActiveModalVideo] = useState(null);
  const [hoveredFace, setHoveredFace] = useState(null);
  const [previewFace, setPreviewFace] = useState(null);

  const allFaceKeys = CUBE_PROJECTS.map((project, index) => `${CUBE_FACES[index]}-${project.id}`);

  useEffect(() => {
    const cube = cubeRef.current;

    if (!cube) return undefined;

    let animationFrameId;

    const updateRotation = () => {
      if (autoRotateRef.current.active && !dragRef.current.isDragging) {
        rotationRef.current.y += CUBE_ROTATION.autoRotateSpeed;
        rotationRef.current.x =
          CUBE_ROTATION.initialX +
          Math.sin(Date.now() * CUBE_ROTATION.waveSpeed) *
            CUBE_ROTATION.waveAmplitude;

        cube.style.transform = `rotateX(${rotationRef.current.x}deg) rotateY(${rotationRef.current.y}deg)`;
      }

      animationFrameId = requestAnimationFrame(updateRotation);
    };

    cube.style.transform = `rotateX(${rotationRef.current.x}deg) rotateY(${rotationRef.current.y}deg)`;
    animationFrameId = requestAnimationFrame(updateRotation);

    return () => {
      cancelAnimationFrame(animationFrameId);

      if (autoRotateRef.current.timer) {
        clearTimeout(autoRotateRef.current.timer);
      }

      Object.values(previewTimersRef.current).forEach((timer) => {
        clearTimeout(timer);
      });
    };
  }, []);

  const handleDragStart = (event) => {
    const { x, y } = getPointerPosition(event);

    autoRotateRef.current.active = false;

    if (autoRotateRef.current.timer) {
      clearTimeout(autoRotateRef.current.timer);
    }

    dragRef.current = {
      isDragging: true,
      startX: x,
      startY: y,
      startRotX: rotationRef.current.x,
      startRotY: rotationRef.current.y,
      hasMoved: false,
    };
  };

  const handleDragMove = (event) => {
    if (!dragRef.current.isDragging) return;

    const { x, y } = getPointerPosition(event);

    const deltaX = x - dragRef.current.startX;
    const deltaY = y - dragRef.current.startY;

    if (
      Math.abs(deltaX) > CUBE_ROTATION.dragThreshold ||
      Math.abs(deltaY) > CUBE_ROTATION.dragThreshold
    ) {
      dragRef.current.hasMoved = true;
    }

    rotationRef.current.y =
      dragRef.current.startRotY + deltaX * CUBE_ROTATION.dragSensitivity;

    rotationRef.current.x = clamp(
      dragRef.current.startRotX - deltaY * CUBE_ROTATION.dragSensitivity,
      -CUBE_ROTATION.maxXRotation,
      CUBE_ROTATION.maxXRotation
    );

    if (cubeRef.current) {
      cubeRef.current.style.transform = `rotateX(${rotationRef.current.x}deg) rotateY(${rotationRef.current.y}deg)`;
    }
  };

  const handleDragEnd = () => {
    if (!dragRef.current.isDragging) return;

    dragRef.current.isDragging = false;

    setTimeout(() => {
      dragRef.current.hasMoved = false;
    }, CUBE_ROTATION.dragResetDelay);
  };

  const handleFaceClick = (event, videoId) => {
    event.preventDefault();

    if (dragRef.current.hasMoved) return;

    setActiveModalVideo(videoId);
  };

  const handleFaceMouseEnter = (faceKey) => {
    setHoveredFace(faceKey);

    if (previewTimersRef.current[faceKey]) {
      clearTimeout(previewTimersRef.current[faceKey]);
    }

    previewTimersRef.current[faceKey] = setTimeout(() => {
      setPreviewFace(faceKey);
    }, CUBE_ROTATION.previewDelay);
  };

  const handleFaceMouseLeave = (faceKey) => {
    if (previewTimersRef.current[faceKey]) {
      clearTimeout(previewTimersRef.current[faceKey]);
    }

    setHoveredFace(null);
    setPreviewFace(null);
  };

  const instruction = CUBE_INSTRUCTIONS[language] || CUBE_INSTRUCTIONS.es;
  const dragCursorText = language === 'es' ? 'GIRAR' : 'DRAG';

  return (
    <div className={styles['video-cube-wrapper']}>
      <CubeInstruction text={instruction} />

      <div
        className={styles['cube-viewport']}
        data-cursor={dragCursorText}
        onMouseDown={handleDragStart}
        onMouseMove={handleDragMove}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
        onTouchStart={handleDragStart}
        onTouchMove={handleDragMove}
        onTouchEnd={handleDragEnd}
      >
        <div className={styles['cube-space']} ref={cubeRef}>
          {CUBE_PROJECTS.map((project, index) => {
            const faceName = CUBE_FACES[index];
            const faceKey = allFaceKeys[index];
            const isActive = hoveredFace === faceKey || previewFace === faceKey;

            return (
              <CubeFace
                key={faceKey}
                project={project}
                faceName={faceName}
                faceKey={faceKey}
                isActive={isActive}
                isPreviewVisible={true}
                onClick={handleFaceClick}
                onMouseEnter={handleFaceMouseEnter}
                onMouseLeave={handleFaceMouseLeave}
                language={language}
              />
            );
          })}
        </div>
      </div>

      {activeModalVideo && (
        <VideoCubeLightbox
          videoId={activeModalVideo}
          language={language}
          onClose={() => setActiveModalVideo(null)}
        />
      )}
    </div>
  );
}