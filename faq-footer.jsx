// FAQ + Footer com Instagram CTA.

function FAQ() {
  const items = [
  {
    q: "Como funciona a contratação?",
    a: "Você navega o portfólio, escolhe os temas e versões que mais combinam com a sua festa, e entra em contato pelo Instagram. A partir daí, marcamos uma conversa para entender datas, espaço, número de convidados e personalizar tudo."
  },
  {
    q: "Posso misturar elementos de temas diferentes?",
    a: "Sim. A maioria das nossas decorações combina referências. Use o portfólio como ponto de partida e a gente desenha algo único para você."
  },
  {
    q: "Atendem em qualquer espaço?",
    a: "Atendemos em buffets, salões, casas e espaços ao ar livre. Fazemos visita técnica antes do evento para alinhar o cenário com a planta do local."
  },
  {
    q: "Os temas listados são os únicos disponíveis?",
    a: "Não. Esse portfólio mostra projetos já realizados e combinações testadas. Se você tem uma referência diferente, mande pra gente — adoramos criar do zero."
  },
  {
    q: "Com quanto tempo de antecedência preciso fechar?",
    a: "Para casamentos e eventos grandes, recomendamos pelo menos 90 dias. Para festas infantis e chás, 30 dias é confortável. Datas em alta temporada (dezembro, junho) lotam mais cedo."
  },
  {
    q: "Vocês fornecem só decoração ou o evento todo?",
    a: "Nosso foco é decoração e cenografia. Indicamos parceiros de buffet, fotografia, DJ e bolo conforme o estilo do seu evento."
  }];


  const [open, setOpen] = React.useState(0);

  return (
    <section className="faq" id="faq">
      <div className="faq-head">
        <span className="section-num">03</span>
        <h2 className="section-title">Perguntas frequentes</h2>
      </div>
      <div className="faq-list">
        {items.map((item, i) =>
        <div key={i} className={`faq-item ${open === i ? "open" : ""}`}>
            <button className="faq-q" onClick={() => setOpen(open === i ? -1 : i)}>
              <span className="faq-num">{String(i + 1).padStart(2, "0")}</span>
              <span className="faq-q-text">{item.q}</span>
              <span className="faq-toggle">{open === i ? "−" : "+"}</span>
            </button>
            {open === i && <div className="faq-a">{item.a}</div>}
          </div>
        )}
      </div>
    </section>);

}

function Instagram() {
  // Mock embed — placeholders coloridos com username.
  const posts = [
  "Amarelo & Preto", "Rosa & Dourado", "Boho Terracota", "Tropical",
  "Lavanda", "Verde & Branco", "Coral & Areia", "Azul Marinho"];

  return (
    <section className="instagram" id="instagram">
      <div className="ig-head">
        <span className="section-num">04</span>
        <div>
          <h2 className="section-title">No Instagram</h2>
          <p className="ig-handle">@crisborba.decoracoes</p>
        </div>
      </div>
      <div className="ig-grid">
        {posts.map((p, i) =>
        <a key={i} className="ig-post" href="#" onClick={(e) => e.preventDefault()}>
            <window.PlaceholderImg paleta={p} label={`post ${String(i + 1).padStart(2, "0")}`} />
            <div className="ig-overlay">
              <span>♡ {120 + i * 17}</span>
              <span>◯ {8 + i * 2}</span>
            </div>
          </a>
        )}
      </div>
    </section>);

}

function Footer({ onAdminClick }) {
  return (
    <footer className="home-footer" id="footer">
      <span>© 2026 Cris Borba Decorações</span>
      <span className="sep">·</span>
      <span>Cada festa, uma memória que fica.</span>
      <a
        href="https://www.instagram.com/crisborba_eventos/"
        target="_blank"
        rel="noreferrer"
        aria-label="Instagram"
        style={{ display: "inline-flex", alignItems: "center", color: "inherit", marginLeft: 8 }}
      >
        <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 20, height: 20 }}>
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.336 3.608 1.311.975.975 1.249 2.242 1.311 3.608.058 1.266.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.062 1.366-.336 2.633-1.311 3.608-.975.975-2.242 1.249-3.608 1.311-1.265.058-1.645.069-4.849.069-3.205 0-3.584-.012-4.849-.069-1.366-.062-2.633-.336-3.608-1.311-.975-.975-1.249-2.242-1.311-3.608C2.175 15.647 2.163 15.268 2.163 12c0-3.204.012-3.584.069-4.849.062-1.366.336-2.633 1.311-3.608.975-.975 2.242-1.249 3.608-1.311C8.416 2.175 8.796 2.163 12 2.163zm0 1.838c-3.149 0-3.515.012-4.756.067-1.052.048-1.62.219-2 .368-.5.194-.86.426-1.236.803-.376.376-.609.736-.803 1.236-.149.38-.32.949-.368 2-.055 1.241-.067 1.607-.067 4.756 0 3.149.012 3.515.067 4.756.048 1.052.219 1.62.368 2 .194.5.426.86.803 1.236.376.376.736.609 1.236.803.38.149.949.32 2 .368 1.241.055 1.607.067 4.756.067 3.149 0 3.515-.012 4.756-.067 1.052-.048 1.62-.219 2-.368.5-.194.86-.426 1.236-.803.376-.376.609-.736.803-1.236.149-.38.32-.949.368-2 .055-1.241.067-1.607.067-4.756 0-3.149-.012-3.515-.067-4.756-.048-1.052-.219-1.62-.368-2-.194-.5-.426-.86-.803-1.236-.376-.376-.736-.609-1.236-.803-.38-.149-.949-.32-2-.368-1.241-.055-1.607-.067-4.756-.067zm0 3.131A4.868 4.868 0 1 1 12 16.868 4.868 4.868 0 0 1 12 7.132zm0 8.027A3.159 3.159 0 1 0 12 8.841a3.159 3.159 0 0 0 0 6.318zm6.205-8.225a1.137 1.137 0 1 1-2.274 0 1.137 1.137 0 0 1 2.274 0z" />
        </svg>
      </a>
      <a
        href="https://wa.me/5511972375707"
        target="_blank"
        rel="noreferrer"
        aria-label="WhatsApp"
        style={{ display: "inline-flex", alignItems: "center", color: "inherit", marginLeft: 8 }}
      >
        <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 20, height: 20 }}>
          <path d="M.057 24l1.687-6.163a11.867 11.867 0 0 1-1.587-5.945C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 0 1 8.413 3.488 11.824 11.824 0 0 1 3.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 0 1-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 0 0 1.523 5.286l-.999 3.648 3.965-1.633z" />
        </svg>
      </a>
      <button className="home-footer-admin" onClick={onAdminClick}>
        área da Cris
      </button>
    </footer>
  );
}

window.FAQ = FAQ;
window.Instagram = Instagram;
window.Footer = Footer;