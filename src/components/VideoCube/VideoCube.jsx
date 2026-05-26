import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import './VideoCube.css';

const PROJECTS = [
  {
    id: '110eJJP_QVs',
    title: 'Tundama',
    tag: 'Largometraje Animación 3D'
  },
  {
    id: 'ohnGoV38SB4',
    title: 'Oso',
    tag: 'Cortometraje Animación'
  },
  {
    id: 'HVHsgO69FSA',
    title: 'Cerdos',
    tag: 'Comercial Animación 3D'
  },
  {
    id: 'RQFsIshO7gE',
    title: 'Niño (Abuso Infantil)',
    tag: 'Narrativo Animación 2D'
  },
  {
    id: 'ro02De3I21c',
    title: 'Lotería de Boyacá',
    tag: 'Comercial Animación 3D'
  },
  {
    id: 'NRC4f_Z29RY',
    title: 'Boyacá es para Vivirla',
    tag: 'Campaña Promocional'
  }
];

const FACES = ['front', 'back', 'left', 'right', 'top', 'bottom'];

export default function VideoCube() {
  const cubeRef = useRef(null);
  const [activeModalVideo, setActiveModalVideo] = useState(null);
  
  // Keep track of rotation in refs to update DOM directly at 60fps (no re-renders)
  const rotationRef = useRef({ x: -15, y: 45 }); // Initial tilt
  const dragRef = useRef({ isDragging: false, startX: 0, startY: 0, startRotX: 0, startRotY: 0, hasMoved: false });
  const autoRotateRef = useRef({ active: true, timer: null });

  // Disable background scrolling when video lightbox is open
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

  useEffect(() => {
    const cube = cubeRef.current;
    if (!cube) return;

    let animationFrameId;

    const updateCubeTransform = () => {
      const { x, y } = rotationRef.current;
      cube.style.transform = `rotateX(${x}deg) rotateY(${y}deg)`;
    };

    updateCubeTransform();

    const animate = () => {
      if (autoRotateRef.current.active && !dragRef.current.isDragging) {
        rotationRef.current.y += 0.18;
        rotationRef.current.x = -15 + Math.sin(Date.now() * 0.0005) * 8; // Gentle up/down swing
        updateCubeTransform();
      }
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (autoRotateRef.current.timer) clearTimeout(autoRotateRef.current.timer);
    };
  }, []);

  const handleDragStart = (e) => {
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    autoRotateRef.current.active = false;
    if (autoRotateRef.current.timer) clearTimeout(autoRotateRef.current.timer);

    dragRef.current = {
      isDragging: true,
      startX: clientX,
      startY: clientY,
      startRotX: rotationRef.current.x,
      startRotY: rotationRef.current.y,
      hasMoved: false
    };
  };

  const handleDragMove = (e) => {
    if (!dragRef.current.isDragging) return;

    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    const dx = clientX - dragRef.current.startX;
    const dy = clientY - dragRef.current.startY;

    // If moved more than 6px, mark it as a drag (not a simple click)
    if (Math.abs(dx) > 6 || Math.abs(dy) > 6) {
      dragRef.current.hasMoved = true;
    }

    rotationRef.current.y = dragRef.current.startRotY + dx * 0.4;
    rotationRef.current.x = Math.max(-80, Math.min(80, dragRef.current.startRotX - dy * 0.4));

    if (cubeRef.current) {
      cubeRef.current.style.transform = `rotateX(${rotationRef.current.x}deg) rotateY(${rotationRef.current.y}deg)`;
    }
  };

  const handleDragEnd = () => {
    if (!dragRef.current.isDragging) return;
    dragRef.current.isDragging = false;

    // Small delay to clear hasMoved flag so click event can be synchronously blocked first
    setTimeout(() => {
      dragRef.current.hasMoved = false;
    }, 80);

    autoRotateRef.current.timer = setTimeout(() => {
      autoRotateRef.current.active = true;
    }, 2500);
  };

  // Prevent link navigation and open modal instead (only if the user did NOT drag the cube)
  const handleFaceClick = (e, videoId) => {
    e.preventDefault();
    if (dragRef.current.hasMoved) {
      return; // Do not open player if the user was dragging the cube
    }
    setActiveModalVideo(videoId);
  };

  return (
    <div style={{ width: '100%', position: 'relative' }}>
      <div className="cube-instruction-text">
        <span className="cube-instruction-icon">◄</span>
        Arrastra para rotar el cubo y haz clic para reproducir el proyecto
        <span className="cube-instruction-icon">►</span>
      </div>

      {/* 3D Viewport wrapper */}
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
        {/* The 3D Space */}
        <div className="cube-space" ref={cubeRef}>
          {PROJECTS.map((project, idx) => {
            const faceName = FACES[idx];
            return (
              <div 
                key={faceName}
                className={`cube-face face-${faceName}`}
                onDragStart={(e) => e.preventDefault()}
              >
                <a 
                  href={`https://youtu.be/${project.id}`}
                  onClick={(e) => handleFaceClick(e, project.id)}
                  className="face-card-link"
                >
                  <div className="face-image-wrapper">
                    <iframe
                      src={`https://www.youtube.com/embed/${project.id}?autoplay=1&mute=1&controls=0&playlist=${project.id}&loop=1&modestbranding=1&rel=0&iv_load_policy=3&showinfo=0&disablekb=1&enablejsapi=1`}
                      title={project.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      className="face-video-preview"
                      style={{ 
                        width: '100%', 
                        height: '100%', 
                        border: 'none', 
                        pointerEvents: 'none'
                      }}
                    ></iframe>
                    <div className="face-play-overlay">
                      <div className="face-play-icon">
                        <svg viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
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

      {/* Fullscreen Premium Lightbox Modal for video playback */}
      {activeModalVideo && createPortal(
        <div className="cube-lightbox-modal" onClick={() => setActiveModalVideo(null)}>
          <button 
            className="cube-lightbox-close" 
            onClick={() => setActiveModalVideo(null)}
            aria-label="Cerrar reproductor"
          >
            ✕
          </button>
          <div className="cube-lightbox-content" onClick={(e) => e.stopPropagation()}>
            <div className="cube-lightbox-video-wrapper">
              <iframe
                src={`https://www.youtube.com/embed/${activeModalVideo}?autoplay=1`}
                title="Dagamedia Project Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
