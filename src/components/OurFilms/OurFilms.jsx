import "./OurFilms.css";

function OurFilms() {
  return (
    <section className="our-films">
      <h2 className="our-films-label">Our Films</h2>

      <div className="our-films-header">
        <h3>
          We invite you to <br />
          watch our selection.
        </h3>

        <p>
          Some of our <span>short films</span> are about to premiere, while
          others are still in progress. We present them to you.
        </p>
      </div>

      {/* Galería superior */}
      <div className="our-films-gallery">
        <img
          className="film-image-main"
          src="https://picsum.photos/1000/460?random=1"
          alt="Film preview"
        />

        <img
          className="film-image-vertical"
          src="https://picsum.photos/380/460?random=2"
          alt="Film vertical preview"
        />

        <img
          className="film-image-vertical"
          src="https://picsum.photos/380/460?random=3"
          alt="Film character preview"
        />
      </div>

      {/* Sección Tundama con barra horizontal */}
      <div className="tundama-scroll-section">
        <div className="tundama-scroll-track">
          <div className="tundama-image-card">
            <img
              src="https://picsum.photos/900/480?random=4"
              alt="Tundama sketch"
            />
          </div>

          <div className="tundama-image-card">
            <img
              src="https://picsum.photos/900/480?random=5"
              alt="Tundama information"
            />
          </div>

          <div className="tundama-image-card">
            <img
              src="https://picsum.photos/900/480?random=6"
              alt="Tundama poster"
            />
          </div>
        </div>
      </div>

      {/* Trailer */}
      <div className="trailer-section">
        <h3 className="trailer-title">
          We present to you the official trailer.
        </h3>

        <div className="trailer-video">
          <img
            src="https://picsum.photos/1100/420?random=7"
            alt="Official trailer preview"
          />

          <button className="trailer-play" aria-label="Play trailer">
            ▶
          </button>
        </div>

        <p className="trailer-description">
          At the beginning of the 16th century, a brave chieftain confronts the
          devastating arrival of the Spanish to his territories. Two children
          searching for their kidnapped sister find themselves in the midst of
          this clash of cultures, triggering battles where feelings and acts of
          bravery, betrayal, love, and greed are uncovered.
        </p>
      </div>
    </section>
  );
}

export default OurFilms;