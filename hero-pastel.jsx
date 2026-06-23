// Hero pastel — bolinhas decorativas, formato circular na imagem, eyebrow em pílula.

function HeroPastel({ onExploreClick }) {
  return (
    <section className="hero">
      <div className="hero-top">
        <div className="hero-text">
          <div className="hero-eyebrow">
            <span className="dot" />
            <span>Decoração de eventos · Feita com carinho</span>
          </div>
          <h1 className="hero-title">
            <span className="line">Parceria com</span>
            <span className="line italic">Buffet</span>
            <span className="line"><span className="accent">Gato Sapeka</span></span>
          </h1>
          <p className="hero-sub">
            Explore as nossas decorações e encontre a inspiração perfeita para o dia dos seus sonhos!
          </p>
          <div className="hero-actions">
            <button className="btn btn-primary" onClick={onExploreClick}>
              Ver projetos
              <span className="arrow">→</span>
            </button>
          </div>
        </div>

        <div className="hero-img-wrap" style={{ position: "relative" }}>
          <div className="hero-dot d1" />
          <div className="hero-dot d2" />
          <div className="hero-dot d3" />
          <div className="hero-img" style={{ display: "flex", alignItems: "center", justifyContent: "center", background: "transparent", boxShadow: "none" }}>
            <img
              src="logo-cris-borba.jpeg"
              alt="Cris Borba Decorações"
              style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "50%" }}
            />
          </div>
        </div>
      </div>

    </section>
  );
}

window.Hero = HeroPastel;
