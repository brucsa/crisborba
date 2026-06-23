// Card e Modal — pastel. Carrossel de imagens por opção, código por opção.

function getImagens(opcao) {
  if (opcao.imagens && opcao.imagens.length > 0) return opcao.imagens;
  if (opcao.imagem) return [opcao.imagem];
  return [];
}

function TemaCardPastel({ tema, index, onOpen }) {
  const opcao = tema.opcoes[0];
  const imagemCapa = getImagens(opcao)[0] || null;
  const numStr = String(index + 1).padStart(2, "0");
  return (
    <article className="card" onClick={() => onOpen(tema)}>
      <div className="card-img-wrap">
        <window.PlaceholderImg paleta={opcao.paleta} imagem={imagemCapa} label={tema.nome} />
        <div className="card-num">{numStr}</div>
        {tema.destaque && <div className="card-destaque">⭐ Em destaque</div>}
        {tema.opcoes.length > 1 && (
          <div className="card-opts">+{tema.opcoes.length - 1} vers{tema.opcoes.length > 2 ? "ões" : "ão"}</div>
        )}
      </div>
      <div className="card-body">
        <div className="card-meta">
          <span>{tema.categoria}</span>
          <span>·</span>
          <span>{tema.opcoes.length} opç{tema.opcoes.length > 1 ? "ões" : "ão"}</span>
        </div>
        <h3 className="card-title">{tema.nome}</h3>
      </div>
    </article>
  );
}

function TemaModalPastel({ tema, onClose, onSolicitar }) {
  const [opcaoIdx, setOpcaoIdx] = React.useState(0);
  const [imgIdx, setImgIdx] = React.useState(0);
  const [zoom, setZoom] = React.useState(false);

  React.useEffect(() => { setOpcaoIdx(0); setImgIdx(0); setZoom(false); }, [tema]);
  React.useEffect(() => { setImgIdx(0); }, [opcaoIdx]);

  React.useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") { if (zoom) setZoom(false); else onClose(); }
      if (e.key === "ArrowLeft")  prevImg();
      if (e.key === "ArrowRight") nextImg();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [zoom, onClose, imgIdx, opcaoIdx]);

  if (!tema) return null;
  const opcao = tema.opcoes[opcaoIdx];
  const codigo = opcao.codigo || "—";
  const imagens = getImagens(opcao);
  const imagemAtual = imagens[imgIdx] || null;

  function prevImg(e) {
    if (e) e.stopPropagation();
    if (imagens.length < 2) return;
    setImgIdx(i => (i - 1 + imagens.length) % imagens.length);
  }
  function nextImg(e) {
    if (e) e.stopPropagation();
    if (imagens.length < 2) return;
    setImgIdx(i => (i + 1) % imagens.length);
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Fechar">
          <span>fechar</span>
          <span className="x">✕</span>
        </button>

        <div className="modal-grid">
          <div className="modal-img-col">
            <div className="modal-img" onClick={() => imagens.length > 0 && setZoom(true)}>
              <window.PlaceholderImg paleta={opcao.paleta} imagem={imagemAtual} label={`${tema.nome} — ${opcao.titulo}`} full />

              {imagens.length > 1 && (
                <>
                  <button className="carousel-btn carousel-prev" onClick={prevImg}>‹</button>
                  <button className="carousel-btn carousel-next" onClick={nextImg}>›</button>
                  <div className="carousel-dots">
                    {imagens.map((_, i) => (
                      <button key={i}
                        className={`carousel-dot${i === imgIdx ? " active" : ""}`}
                        onClick={(e) => { e.stopPropagation(); setImgIdx(i); }}
                      />
                    ))}
                  </div>
                  <div className="carousel-count">{imgIdx + 1}/{imagens.length}</div>
                </>
              )}

              <div className="modal-zoom-hint"><span>⌕</span> clique para ampliar</div>
            </div>

            {tema.opcoes.length > 1 && (
              <div className="modal-thumbs">
                {tema.opcoes.map((o, i) => (
                  <button key={i} className={`modal-thumb ${i === opcaoIdx ? "active" : ""}`} onClick={() => setOpcaoIdx(i)}>
                    <window.PlaceholderImg paleta={o.paleta} imagem={getImagens(o)[0] || null} label={o.titulo} />
                    <span>{o.titulo}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="modal-info">
            <div className="modal-cat">{tema.categoria}</div>
            <h2 className="modal-title">{tema.nome}</h2>
            <p className="modal-desc">{tema.descricao}</p>

            <div className="modal-section">
              <div className="modal-opcao-head">
                <div>
                  <span className="modal-section-label">Opção em destaque</span>
                  <h3 className="modal-opcao-titulo">{opcao.titulo}</h3>
                </div>
                <div className="modal-codigo">
                  <span>código</span>
                  <strong>{codigo}</strong>
                </div>
              </div>
              {opcao.legenda && <p className="modal-opcao-legenda">{opcao.legenda}</p>}
            </div>

            <div className="modal-foot">
              <div className="codigo-aviso">
                <span className="codigo-aviso-label">Importante</span>
                <p>Ao falar com {onSolicitar ? "a Cris" : "o buffet"}, mencione o código <strong>{codigo}</strong> para identificar exatamente a decoração e versão.</p>
              </div>
              {onSolicitar && (
                <button className="btn btn-primary modal-solicitar-btn" onClick={() => onSolicitar(tema, codigo)}>
                  Solicitar orçamento · código {codigo} →
                </button>
              )}
            </div>
          </div>
        </div>

        {zoom && (
          <div className="zoom-overlay" onClick={() => setZoom(false)}>
            <button className="zoom-close" onClick={() => setZoom(false)}>fechar ✕</button>
            {imagens.length > 1 && (
              <>
                <button className="carousel-btn zoom-prev" onClick={(e) => { e.stopPropagation(); prevImg(); }}>‹</button>
                <button className="carousel-btn zoom-next" onClick={(e) => { e.stopPropagation(); nextImg(); }}>›</button>
              </>
            )}
            <div className="zoom-img">
              <window.PlaceholderImg paleta={opcao.paleta} imagem={imagemAtual} label={`${tema.nome} — ${opcao.titulo}`} full />
            </div>
            <div className="zoom-caption">
              {tema.nome} · {opcao.titulo} · <strong style={{color:"var(--amarelo)"}}>{codigo}</strong>
              {imagens.length > 1 && <span style={{marginLeft:10, opacity:0.7}}>{imgIdx + 1}/{imagens.length}</span>}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

window.TemaCard = TemaCardPastel;
window.TemaModal = TemaModalPastel;
