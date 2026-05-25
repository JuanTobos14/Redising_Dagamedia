import "./WhatDoWeDo.css";

const WhatDoWeDo = () => {
  return (
    <section className="whatwedo">
      <h2>What Do We Do?</h2>

      <div className="container">
        
        <div className="card">
          <div className="image"></div>
          <h3>2D Animation</h3>
          <p>We create amazing 2D animations with creative storytelling.</p>
        </div>

        <div className="card">
          <div className="image"></div>
          <h3>3D Animation</h3>
          <p>We develop high-quality 3D animated content.</p>
        </div>

      </div>
    </section>
  );
};

export default WhatDoWeDo;