// App pastel — versão simplificada, sem tweaks (ja é a direção pastel committed)

function App() {
  const [temas, setTemas] = React.useState(() => {
    const MIGRATED_KEY = "crisborba_migrated_v3";
    let stored = window.loadTemas();
    if (stored && Array.isArray(stored) && !localStorage.getItem(MIGRATED_KEY)) {
      stored = stored.filter(window.temaTemImagem);
      window.saveTemas(stored);
      localStorage.setItem(MIGRATED_KEY, "1");
    }
    return stored && Array.isArray(stored) && stored.length ? stored : window.getTemasComCodigo();
  });

  React.useEffect(() => {
    if (window.loadTemasRemote) {
      window.loadTemasRemote().then(data => {
        if (data && Array.isArray(data) && data.length) setTemas(data);
      });
    }
  }, []);

  const [query, setQuery] = React.useState("");
  const [categoria, setCategoria] = React.useState("Todos");
  const [tagsAtivas, setTagsAtivas] = React.useState([]);

  function toggleTag(t) {
    setTagsAtivas(tagsAtivas.includes(t) ? tagsAtivas.filter((x) => x !== t) : [...tagsAtivas, t]);
  }

  // Mostra somente decorações de parceria nesta página.
  // Particulares aparecem apenas na home (Cris Borba Decoracoes - Home.html).
  const temasParceria = React.useMemo(
    () => temas.filter((t) => t.tipo !== "particular"),
    [temas]
  );

  const temasFiltrados = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    return temasParceria.filter((t) => {
      if (categoria !== "Todos" && t.categoria !== categoria) return false;
      if (tagsAtivas.length > 0) {
        const has = tagsAtivas.every((tag) => t.tags.includes(tag));
        if (!has) return false;
      }
      if (q) {
        const blob = (t.nome + " " + t.descricao + " " + t.tags.join(" ") + " " + t.categoria).toLowerCase();
        if (!blob.includes(q)) return false;
      }
      return true;
    });
  }, [temasParceria, query, categoria, tagsAtivas]);

  const [temaAberto, setTemaAberto] = React.useState(null);
  const [adminOpen, setAdminOpen] = React.useState(false);

  function scrollToPortfolio() {
    const el = document.getElementById("portfolio");
    if (el) window.scrollTo({ top: el.offsetTop - 20, behavior: "smooth" });
  }

  return (
    <React.Fragment>
      <nav className="topbar-full" style={{ backgroundColor: "rgb(255, 252, 245)" }}>
        <div className="topbar topbar-inner">
          <div className="brand">
            <img src="logo-cris-borba.jpeg" alt="Cris Borba Decorações" className="brand-logo" style={{ objectFit: "cover" }} />
          </div>
          <div className="topbar-links">
            <a href="#portfolio">Portfólio</a>
            <a
              href="https://www.instagram.com/crisborba_eventos/"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              style={{ display: "inline-flex", alignItems: "center", color: "inherit" }}
            >
              <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 22, height: 22 }}>
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.336 3.608 1.311.975.975 1.249 2.242 1.311 3.608.058 1.266.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.062 1.366-.336 2.633-1.311 3.608-.975.975-2.242 1.249-3.608 1.311-1.265.058-1.645.069-4.849.069-3.205 0-3.584-.012-4.849-.069-1.366-.062-2.633-.336-3.608-1.311-.975-.975-1.249-2.242-1.311-3.608C2.175 15.647 2.163 15.268 2.163 12c0-3.204.012-3.584.069-4.849.062-1.366.336-2.633 1.311-3.608.975-.975 2.242-1.249 3.608-1.311C8.416 2.175 8.796 2.163 12 2.163zm0 1.838c-3.149 0-3.515.012-4.756.067-1.052.048-1.62.219-2 .368-.5.194-.86.426-1.236.803-.376.376-.609.736-.803 1.236-.149.38-.32.949-.368 2-.055 1.241-.067 1.607-.067 4.756 0 3.149.012 3.515.067 4.756.048 1.052.219 1.62.368 2 .194.5.426.86.803 1.236.376.376.736.609 1.236.803.38.149.949.32 2 .368 1.241.055 1.607.067 4.756.067 3.149 0 3.515-.012 4.756-.067 1.052-.048 1.62-.219 2-.368.5-.194.86-.426 1.236-.803.376-.376.609-.736.803-1.236.149-.38.32-.949.368-2 .055-1.241.067-1.607.067-4.756 0-3.149-.012-3.515-.067-4.756-.048-1.052-.219-1.62-.368-2-.194-.5-.426-.86-.803-1.236-.376-.376-.736-.609-1.236-.803-.38-.149-.949-.32-2-.368-1.241-.055-1.607-.067-4.756-.067zm0 3.131A4.868 4.868 0 1 1 12 16.868 4.868 4.868 0 0 1 12 7.132zm0 8.027A3.159 3.159 0 1 0 12 8.841a3.159 3.159 0 0 0 0 6.318zm6.205-8.225a1.137 1.137 0 1 1-2.274 0 1.137 1.137 0 0 1 2.274 0z" />
              </svg>
            </a>
            <a
              href="https://wa.me/5511972375707"
              target="_blank"
              rel="noreferrer"
              aria-label="WhatsApp"
              style={{ display: "inline-flex", alignItems: "center", color: "inherit" }}
            >
              <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 22, height: 22 }}>
                <path d="M.057 24l1.687-6.163a11.867 11.867 0 0 1-1.587-5.945C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 0 1 8.413 3.488 11.824 11.824 0 0 1 3.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 0 1-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 0 0 1.523 5.286l-.999 3.648 3.965-1.633z" />
              </svg>
            </a>
            {/* TEMPORÁRIO: botão para decorações particulares desativado até lançamento
            <a className="topbar-cta" href="Cris Borba Decoracoes - Home.html" style={{ backgroundColor: "rgb(255, 211, 80)", color: "rgb(0, 0, 0)", opacity: "100" }}>Decorações particulares
            </a>
            */}
          </div>
        </div>
      </nav>

      <div className="page">

      <window.Hero onExploreClick={scrollToPortfolio} />

      <window.Filtros
        temas={temasParceria}
        query={query} setQuery={setQuery}
        categoria={categoria} setCategoria={setCategoria}
        totalFiltrados={temasFiltrados.length} />


      {temasParceria.length === 0 ?
      <div className="empty">
          <p><strong>Catálogo em construção.</strong></p>
          <p style={{ marginTop: 8, fontSize: 15 }}>
            A Cris está adicionando as decorações aos poucos.
            Em breve novos temas aparecem por aqui.
          </p>
        </div> :
      temasFiltrados.length === 0 ?
      <div className="empty">
          <p>Nenhum tema encontrado com esses filtros.</p>
          <button className="btn btn-ghost" onClick={() => {setQuery("");setCategoria("Todos");setTagsAtivas([]);}}>
            limpar filtros
          </button>
        </div> :

      <section className="grid">
          {temasFiltrados.map((t, i) =>
        <window.TemaCard key={t.id} tema={t} index={i} onOpen={setTemaAberto} />
        )}
        </section>
      }

      <window.Footer onAdminClick={() => setAdminOpen(true)} />

      {temaAberto && <window.TemaModal tema={temaAberto} onClose={() => setTemaAberto(null)} />}
      {adminOpen && <window.AdminPanel onClose={() => setAdminOpen(false)} temas={temas} setTemas={setTemas} />}
      </div>
    </React.Fragment>);

}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);