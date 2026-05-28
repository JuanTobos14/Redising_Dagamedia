import { createPortal } from 'react-dom';
import useBodyScrollLock from '../../hooks/useBodyScrollLock';

export default function LightboxPortal({
  videoId,
  title = 'Dagamedia Film Preview',
  onClose,
}) {
  useBodyScrollLock(true);

  return createPortal(
    <div className="lightbox-modal" onClick={onClose}>
      <button
        type="button"
        className="lightbox-close"
        onClick={onClose}
        aria-label="Cerrar reproductor"
      >
        ✕
      </button>

      <div
        className="lightbox-content"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="lightbox-video-wrapper">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&controls=0&modestbranding=1&rel=0&iv_load_policy=3`}
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
