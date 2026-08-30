import type { Metadata } from "next";
import { getCategoriesWithCounts } from "@/lib/posts";

// Página de referência interna para desenvolvedores — fora da navegação,
// do sitemap e da indexação; acessível apenas pela URL direta.
export const metadata: Metadata = {
  title: "Componentes",
  description: "Design system visual do ARS GEEK: paleta, tipografia, botões, badges e blocos editoriais.",
  alternates: { canonical: "/componentes" },
  robots: { index: false, follow: false },
};

const SWATCHES = [
  { name: "Navy profundo", hex: "#00080f" },
  { name: "Navy base", hex: "#00111d" },
  { name: "Card navy", hex: "#020e38" },
  { name: "Steel blue", hex: "#3d60b0" },
  { name: "Ciano elétrico", hex: "#38bdf8" },
  { name: "Texto claro", hex: "#edf2f8" },
  { name: "Filmes", hex: "#a78bfa" },
  { name: "Star Wars", hex: "#e2c044" },
  { name: "Marvel", hex: "#e5484d" },
  { name: "DC", hex: "#4c8dff" },
  { name: "Animes", hex: "#ec6bb0" },
  { name: "Games", hex: "#3ecf8e" },
];

const DS_TAGS = ["star-wars", "analise", "bastidores", "cultura-pop", "games"];

export default function ComponentesPage() {
  const categories = getCategoriesWithCounts();

  return (
    <main className="container container--ds page-pad">
      <div className="ds-kicker">SISTEMA VISUAL // ARS GEEK v1.0</div>
      <h1 className="ds-title">Componentes</h1>
      <p className="ds-lead">
        Identidade derivada da paleta navy da ARS Tech Company, com ciano elétrico (#38bdf8) como cor de
        evolução geek e seis cores de apoio — uma por universo. Tipografia: Geist para leitura, Geist Mono
        para camada HUD.
      </p>

      <h2 className="ds-section-title">Paleta</h2>
      <div className="swatch-grid">
        {SWATCHES.map((s) => (
          <div key={s.hex} className="swatch">
            <div className="swatch__color" style={{ background: s.hex }} />
            <div className="swatch__label">
              <div className="swatch__name">{s.name}</div>
              <div className="swatch__hex">{s.hex}</div>
            </div>
          </div>
        ))}
      </div>

      <h2 className="ds-section-title">Botões</h2>
      <div className="ds-row ds-panel">
        <button type="button" className="btn btn-primary">
          Primário
        </button>
        <button type="button" className="btn btn-outline">
          Secundário
        </button>
        <button type="button" className="btn btn-ghost">
          Ghost
        </button>
        <button type="button" className="btn btn-primary" disabled>
          Desabilitado
        </button>
      </div>

      <h2 className="ds-section-title">Badges de categoria</h2>
      <div className="ds-badges ds-panel">
        {categories.map((c) => (
          <span key={c.slug} className="badge" style={{ color: c.color, borderColor: c.colorDim, background: c.tint }}>
            {c.name}
          </span>
        ))}
      </div>

      <h2 className="ds-section-title">Busca</h2>
      <div className="ds-panel" style={{ maxWidth: 520 }}>
        <div className="search-field">
          <span className="search-field__icon" aria-hidden="true">
            ⌕
          </span>
          <input
            type="search"
            aria-label="Exemplo de busca"
            placeholder="Buscar no arquivo…"
            className="search-field__input"
          />
        </div>
      </div>

      <h2 className="ds-section-title">Paginação</h2>
      <div className="ds-pagination ds-panel">
        <button type="button" className="page-btn" aria-label="Página anterior">
          ←
        </button>
        <button type="button" className="page-btn page-btn--active" aria-current="page">
          1
        </button>
        <button type="button" className="page-btn">
          2
        </button>
        <button type="button" className="page-btn">
          3
        </button>
        <span style={{ color: "var(--accent-mid)", fontFamily: "var(--font-geist-mono)" }}>…</span>
        <button type="button" className="page-btn" aria-label="Próxima página">
          →
        </button>
      </div>

      <h2 className="ds-section-title">Blocos editoriais</h2>
      <div className="ds-blocks">
        <blockquote className="quote-block" style={{ borderLeftColor: "#38bdf8", background: "rgba(56,189,248,.08)" }}>
          “Que a força esteja com o seu deploy.”
          <footer style={{ color: "#38bdf8" }}>— Bloco de citação</footer>
        </blockquote>

        <figure className="code-block">
          <figcaption className="code-block__bar">
            <span className="code-block__dot" style={{ background: "#e5484d" }} aria-hidden="true" />
            <span className="code-block__dot" style={{ background: "#e2c044" }} aria-hidden="true" />
            <span className="code-block__dot" style={{ background: "#3ecf8e" }} aria-hidden="true" />
            <span className="code-block__filename">exemplo.ts</span>
          </figcaption>
          <pre className="code-block__pre">{`const universo = "geek";\nconsole.log(\`Bem-vindo ao lado \${universo} da força.\`);`}</pre>
        </figure>

        <aside className="highlight-block">
          <div className="highlight-block__kicker">⟡ DESTAQUE</div>
          <p className="highlight-block__text">
            Bloco de destaque para insights, avisos e informações-chave dentro dos artigos.
          </p>
        </aside>
      </div>

      <h2 className="ds-section-title">Tags</h2>
      <div className="ds-tag-row ds-panel" style={{ marginBottom: 8 }}>
        {DS_TAGS.map((tag) => (
          <span key={tag} className="tag">
            # {tag}
          </span>
        ))}
      </div>
    </main>
  );
}
