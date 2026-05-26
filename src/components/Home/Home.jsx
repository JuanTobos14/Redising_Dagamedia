import "./Home.css";

function Home() {
  return (
    <section className="hero">
      <h1>Creativity</h1>

      <p>
        Come, take a look at our <span>productions</span>
      </p>

      <div className="video-container">
        <img
          src="https://picsum.photos/1200/600"
          alt="video"
        />

        <div className="play-btn">
          ▶
        </div>
      </div>
    </section>
  );
}

export default Home;