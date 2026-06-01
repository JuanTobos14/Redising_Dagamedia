import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useLanguage } from '../../context/LanguageContext';
import './VideoCube.css';

const PROJECTS = [
  { id: '110eJJP_QVs', title: 'Tundama',             tag: 'Largometraje Animación 3D' },
  { id: 'ohnGoV38SB4', title: 'Oso',                  tag: 'Cortometraje Animación'   },
  { id: 'HVHsgO69FSA', title: 'Cerdos',               tag: 'Comercial Animación 3D'   },
  { id: 'RQFsIshO7gE', title: 'Niño (Abuso Infantil)',tag: 'Narrativo Animación 2D'   },
  { id: 'ro02De3I21c', title: 'Lotería de Boyacá',    tag: 'Comercial Animación 3D'   },
  { id: 'NRC4f_Z29RY', title: 'Boyacá es para Vivirla',tag: 'Campaña Promocional'     },
];

const FACES = ['front', 'back', 'left', 'right', 'top', 'bottom'];

export default function VideoCube() {
  const cubeRef      = useRef(null);
  const { t, language } = useLanguage();
  const [activeModalVideo, setActiveModalVideo] = useState(null);
  const [hoveredFace,      setHoveredFace]      = useState(null);

  const rotationRef    = useRef({ x: -15, y: 45 });
  const dragRef        = useRef({ isDragging: false, startX: 0, startY: 0, startRotX: 0, startRotY: 0, hasMoved: false });
  const autoRotateRef  = useRef({ active: true, timer: null });
  const iframeTimers   = useRef({});

  /* Block body scroll when lightbox is open */
  useEffect(() => {
    if (activeModalVideo) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [activeModalVideo]);

  /* Auto-rotate RAF loop */
  useEffect(() => {
    const cube = cubeRef.current;
    if (!cube) return;
    let rafId;
    const update = () => {
      if (autoRotateRef.current.active && !dragRef.current.isDragging) {
        rotationRef.current.y += 0.18;
        rotationRef.current.x = -15 + Math.sin(Date.now() * 0.0005) * 8;
        cube.style.transform = `rotateX(${rotationRef.current.x}deg) rotateY(${rotationRef.current.y}deg)`;
      }
      rafId = requestAnimationFrame(update);
    };
    cube.style.transform = `rotateX(${rotationRef.current.x}deg) rotateY(${rotationRef.current.y}deg)`;
    rafId = requestAnimationFrame(update);
    return () => {
      cancelAnimationFrame(rafId);
      if (autoRotateRef.current.timer) clearTimeout(autoRotateRef.current.timer);
    };
  }, []);

  /* Drag handlers */
  const handleDragStart = (e) => {
    const cx = e.touches ? e.touches[0].clientX : e.clientX;
    const cy = e.touches ? e.touches[0].clientY : e.clientY;
    autoRotateRef.current.active = false;
    if (autoRotateRef.current.timer) clearTimeout(autoRotateRef.current.timer);
    dragRef.current = { isDragging: true, startX: cx, startY: cy, startRotX: rotationRef.current.x, startRotY: rotationRef.current.y, hasMoved: false };
  };

  const handleDragMove = (e) => {
    if (!dragRef.current.isDragging) return;
    const cx = e.touches ? e.touches[0].clientX : e.clientX;
    const cy = e.touches ? e.touches[0].clientY : e.clientY;
    const dx = cx - dragRef.current.startX;
    const dy = cy - dragRef.current.startY;
    if (Math.abs(dx) > 6 || Math.abs(dy) > 6) dragRef.current.hasMoved = true;
    rotationRef.current.y = dragRef.current.startRotY + dx * 0.4;
    rotationRef.current.x = Math.max(-80, Math.min(80, dragRef.current.startRotX - dy * 0.4));
    if (cubeRef.current) cubeRef.current.style.transform = `rotateX(${rotationRef.current.x}deg) rotateY(${rotationRef.current.y}deg)`;
  };

  const handleDragEnd = () => {
    if (!dragRef.current.isDragging) return;
    dragRef.current.isDragging = false;
    setTimeout(() => { dragRef.current.hasMoved = false; }, 80);
    autoRotateRef.current.timer = setTimeout(() => { autoRotateRef.current.active = true; }, 2500);
  };

  /* Open lightbox on click (not drag) */
  const handleFaceClick = (e, videoId) => {
    e.preventDefault();
    if (dragRef.current.hasMoved) return;
    setActiveModalVideo(videoId);
  };

  /* Hover: start delayed iframe inject for smooth preview */
  const handleFaceMouseEnter = (faceId) => {
    setHoveredFace(faceId);
    if (iframeTimers.current[faceId]) clearTimeout(iframeTimers.current[faceId]);
    iframeTimers.current[faceId] = setTimeout(() => {
      setHoveredFace(faceId + '_ready');
    }, 600);
  };

  const handleFaceMouseLeave = (faceId) => {
    if (iframeTimers.current[faceId]) clearTimeout(iframeTimers.current[faceId]);
    setHoveredFace(null);
  };

  const cubeInstruction = language === 'es'
    ? 'Arrastra para rotar · haz clic para reproducir'
    : 'Drag to rotate · click to play';

  return (
    <div style={{ width: '100%', position: 'relative' }}>
      <div className="cube-instruction-text">
        <span className="cube-instruction-icon">◄</span>
        {cubeInstruction}
        <span className="cube-instruction-icon">►</span>
      </div>

      {/* 3D Viewport */}
      <div
        className="cube-viewport"
        onMouseDown={handleDragStart}
        onMouseMove={handleDragMove}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
        onTouchStart={handleDragStart}
        onTouchMove={handleDragMove}
        onTouchEnd={handleDragEnd}
      >
        {/* Ambient glow ring behind cube */}
        <div className="cube-glow-ring" />

        <div className="cube-space" ref={cubeRef}>
          {PROJECTS.map((project, idx) => {
            const faceName  = FACES[idx];
            const faceKey   = `${faceName}-${project.id}`;
            const isHovered = hoveredFace === faceKey || hoveredFace === faceKey + '_ready';
            const showIframe = hoveredFace === faceKey + '_ready';

            return (
              <div
                key={faceName}
                className={`cube-face face-${faceName} ${isHovered ? 'face-active' : ''}`}
                onDragStart={(e) => e.preventDefault()}
                onMouseEnter={() => handleFaceMouseEnter(faceKey)}
                onMouseLeave={() => handleFaceMouseLeave(faceKey)}
              >
                <a
                  href={`https://youtu.be/${project.id}`}
                  onClick={(e) => handleFaceClick(e, project.id)}
                  className="face-card-link"
                >
                  <div className="face-image-wrapper">
                    {/* Thumbnail always visible as base layer */}
                    <img
                      src={`https://img.youtube.com/vi/${project.id}/hqdefault.jpg`}
                      alt={project.title}
                      className="face-poster-img"
                      loading="lazy"
                    />

                    {/* Iframe injected only on hover (after delay) — saves bandwidth */}
                    {showIframe && (
                      <iframe
                        src={`https://www.youtube.com/embed/${project.id}?autoplay=1&mute=1&controls=0&loop=1&playlist=${project.id}&modestbranding=1&rel=0`}
                        title={project.title}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media"
                        className="face-video-preview face-video-lazy"
                        style={{ pointerEvents: 'none' }}
                      />
                    )}

                    {/* Play overlay */}
                    <div className="face-play-overlay">
                      <div className="face-play-icon">
                        <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                      </div>
                    </div>

                    {/* 3D shine reflection effect on face */}
                    <div className="face-3d-shine" />
                  </div>

                  <div className="face-info-bar">
                    <span className="face-project-tag">{project.tag}</span>
                    <h3 className="face-project-title">{project.title}</h3>
                  </div>
                </a>
              </div>
            );
          })}
        </div>
      </div>

      {/* Fullscreen Lightbox */}
      {activeModalVideo && createPortal(
        <div className="cube-lightbox-modal" onClick={() => setActiveModalVideo(null)}>
          <button
            className="cube-lightbox-close"
            onClick={() => setActiveModalVideo(null)}
            aria-label="Cerrar reproductor"
          >✕</button>
          <div className="cube-lightbox-content" onClick={(e) => e.stopPropagation()}>
            <div className="cube-lightbox-video-wrapper">
              <iframe
                src={`https://www.youtube.com/embed/${activeModalVideo}?autoplay=1`}
                title="Dagamedia Project Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
