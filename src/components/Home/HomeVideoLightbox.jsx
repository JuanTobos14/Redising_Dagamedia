import { HOME_VIDEO, getYoutubeEmbedUrl } from '../../data/homeData';
import useBodyScrollLock from '../../hooks/useBodyScrollLock';

export default function HomeVideoLightbox({ onClose }) {
  useBodyScrollLock(true);

  return (
    <div className="lightbox-modal" onClick={onClose}>
      <button
        type="button"
        className="lightbox-close"
        onClick={onClose}
        aria-label="Cerrar video"
      >
        ✕
      </button>

      <div
        className="lightbox-content"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="lightbox-video-wrapper">
          <iframe
            src={getYoutubeEmbedUrl(HOME_VIDEO.id)}
            title={HOME_VIDEO.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
}
