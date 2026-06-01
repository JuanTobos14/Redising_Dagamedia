import { useState } from "react";
import { useLanguage } from "../../context/LanguageContext";
import "./WhatDoWeDo.css";

// IMPORTS CORRECTOS
import gif2D from "../../assets/2d gif.gif";
import gif3D from "../../assets/3d gif.gif";

const SERVICES = [
  {
    id: "2d",
    titleKey: "services_2d_title",
    descKey: "services_2d_desc",
    image: gif2D,
    subtitleKey: "services_2d_fun",
    detailKey: "services_2d_detail",
  },
  {
    id: "3d",
    titleKey: "services_3d_title",
    descKey: "services_3d_desc",
    image: gif3D,
    subtitleKey: "services_3d_fun",
    detailKey: "services_3d_detail",
  },
];

function WhatDoWeDo() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState("2d");

  const active = SERVICES.find((s) => s.id === activeTab);

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const maxTilt = 18;

    const rotateY = ((x - centerX) / centerX) * maxTilt;
    const rotateX = -((y - centerY) / centerY) * maxTilt;

    card.style.transform = `
      perspective(1000px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      scale3d(1.04, 1.04, 1.04)
    `;

    const shine = card.querySelector(".card-shine");

    if (shine) {
      const shineX = (x / rect.width) * 100;
      const shineY = (y / rect.height) * 100;

      shine.style.background = `
        radial-gradient(
          circle at ${shineX}% ${shineY}%,
          rgba(255,255,255,0.16) 0%,
          rgba(255,255,255,0) 65%
        )
      `;
    }
  };

  const handleMouseLeave = (e) => {
    const card = e.currentTarget;

    card.style.transform = `
      perspective(1000px)
      rotateX(0deg)
      rotateY(0deg)
      scale3d(1,1,1)
    `;

    const shine = card.querySelector(".card-shine");

    if (shine) {
      shine.style.background = "transparent";
    }
  };

  return (
    <section className="wdwd-section reveal-on-scroll" id="servicios">
      <h2 className="section-label">
        {t("services_title")}
      </h2>

      <div className="wdwd-tabs">
        <div className="wdwd-tab-dot" />

        {SERVICES.map((svc) => (
          <button
            key={svc.id}
            className={`wdwd-tab subtitle-main ${
              activeTab === svc.id ? "active" : ""
            }`}
            onClick={() => setActiveTab(svc.id)}
            type="button"
          >
            {t(svc.titleKey)}
          </button>
        ))}

        <button
          className="wdwd-tab-arrow"
          onClick={() =>
            setActiveTab(activeTab === "2d" ? "3d" : "2d")
          }
          type="button"
          aria-label="Cambiar servicio"
        >
          <svg viewBox="0 0 24 24" width="28" height="28">
            <polygon
              points="8,4 20,12 8,20"
              fill="currentColor"
            />
          </svg>
        </button>
      </div>

      <p className="wdwd-subtitle text-normal">
        {t(active.descKey).split(".")[0]}.
      </p>

      <div className="wdwd-content">
        <div
          className="wdwd-image tilt-card"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <div className="card-shine" />

          <img
            src={active.image}
            alt={t(active.titleKey)}
          />
        </div>

        <div className="wdwd-text">
          <h3 className="wdwd-content-title subtitle-main">
            {t(active.subtitleKey) || "Drawing sequences is fun"}
          </h3>

          <p className="wdwd-content-description text-normal">
            {t(active.detailKey) || t(active.descKey)}
          </p>
        </div>
      </div>
    </section>
  );
}

export default WhatDoWeDo;