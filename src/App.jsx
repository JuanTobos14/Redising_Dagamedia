const WhatDoWeDo = () => {
  return (
    <section style={{ padding: "40px", background: "#111", color: "#fff" }}>
      <h2>What Do We Do?</h2>

      <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
        
        {/* BLOQUE 1 */}
        <div style={{ flex: 1 }}>
          
          {/* Espacio para imagen */}
          <div
            style={{
              width: "100%",
              height: "150px",
              background: "#ccc",
              borderRadius: "10px",
              marginBottom: "10px"
            }}
          ></div>

          <h3>2D Animation</h3>
          <p>
            We create amazing 2D animations with creative storytelling.
          </p>
        </div>

        {/* BLOQUE 2 */}
        <div style={{ flex: 1 }}>
          
          {/* Espacio para imagen */}
          <div
            style={{
              width: "100%",
              height: "150px",
              background: "#ccc",
              borderRadius: "10px",
              marginBottom: "10px"
            }}
          ></div>

          <h3>3D Animation</h3>
          <p>
            We develop high-quality 3D animated content.
          </p>
        </div>

      </div>
    </section>
  );
};

export default WhatDoWeDo;