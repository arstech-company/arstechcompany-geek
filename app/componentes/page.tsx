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

// Cores da marca ARS Tech. Espelham 1:1 os tokens de app/globals.css —
// ao mexer lá, atualize aqui.
const BRAND_SWATCHES = [
  { name: "Navy 900 · base", hex: "#1e2749", token: "--navy-900" },
  { name: "Navy 700 · superfície", hex: "#273469", token: "--navy-700" },
  { name: "Slate 800 · cards", hex: "#30343f", token: "--slate-800" },
  { name: "Steel 400 · bordas", hex: "#9197b4", token: "--steel-400" },
  { name: "Ghost 50 · branco", hex: "#fafaff", token: "--ghost-50" },
];

// Escala derivada da matiz do --navy-700 (228°). Existe porque a paleta
// da marca não tem tom claro o bastante para link, CTA e foco sobre fundo
// escuro com contraste AA.
const SCALE_SWATCHES = [
  { name: "Blue 600 · CTA", hex: "#3b4c9e", token: "--blue-600" },
  { name: "Blue 500 · wash", hex: "#4a5cbf", token: "--blue-500" },
  { name: "Blue 400 · metadados", hex: "#949ed6", token: "--blue-400" },
  { name: "Blue 300 · links", hex: "#9ca9f2", token: "--blue-300" },
  { name: "Blue 200 · foco/ativo", hex: "#a5b2ff", token: "--blue-200" },
];

// Tons de texto que não saem da paleta bruta nem da escala derivada: são
// definidos direto nos tokens semânticos de app/globals.css. Ficam aqui para
// que a página continue documentando 1:1 tudo que pinta texto no site.
const TEXT_SWATCHES = [
  { name: "Corpo de artigo", hex: "#dadce8", token: "--text-body" },
  { name: "Texto secundário", hex: "#a3a9c4", token: "--text-muted" },
];

// Contraste do #9197B4 da paleta contra as superfícies reais do site, medido
// para decidir se ele poderia ser o token de texto secundário. Reprova AA em
// quatro delas — por isso --text-muted usa #a3a9c4.
const MUTED_RATIOS = [
  { surface: "--bg-deep", hex: "#1e2749", ratio: "5,06:1", pass: true },
  { surface: "--bg-navy", hex: "#273469", ratio: "4,09:1", pass: false },
  { surface: "--bg-card", hex: "#30343f", ratio: "4,32:1", pass: false },
  { surface: ".band", hex: "#2c3454", ratio: "4,22:1", pass: false },
  { surface: ".post-card", hex: "#2e344b", ratio: "4,27:1", pass: false },
];

const DS_TAGS = ["star-wars", "analise", "bastidores", "cultura-pop", "games"];

export default function ComponentesPage() {
  const categories = getCategoriesWithCounts();

  return (
    <main className="container container--ds page-pad">
      <div className="ds-kicker">SISTEMA VISUAL // ARS GEEK v2.0</div>
      <h1 className="ds-title">Componentes</h1>
      <p className="ds-lead">
        Identidade construída sobre a paleta navy da ARS Tech Company, com uma escala azul derivada para
        estados interativos e sete cores de apoio — uma por universo. Todo texto e todo par de foco foi
        verificado em WCAG AA (mínimo 4,5:1 para texto, 3:1 para UI) contra a superfície mais clara do
        site. Tipografia: Geist para leitura, Geist Mono para a camada HUD.
      </p>

      <h2 className="ds-section-title">Paleta da marca</h2>
      <div className="swatch-grid">
        {BRAND_SWATCHES.map((s) => (
          <div key={s.token} className="swatch">
            <div className="swatch__color" style={{ background: `var(${s.token})` }} />
            <div className="swatch__label">
              <div className="swatch__name">{s.name}</div>
              <div className="swatch__hex">
                {s.hex} · {s.token}
              </div>
            </div>
          </div>
        ))}
      </div>

      <h2 className="ds-section-title">Escala interativa derivada</h2>
      <div className="swatch-grid">
        {SCALE_SWATCHES.map((s) => (
          <div key={s.token} className="swatch">
            <div className="swatch__color" style={{ background: `var(${s.token})` }} />
            <div className="swatch__label">
              <div className="swatch__name">{s.name}</div>
              <div className="swatch__hex">
                {s.hex} · {s.token}
              </div>
            </div>
          </div>
        ))}
      </div>

      <h2 className="ds-section-title">Texto</h2>
      <div className="swatch-grid">
        {TEXT_SWATCHES.map((s) => (
          <div key={s.token} className="swatch">
            <div className="swatch__color" style={{ background: `var(${s.token})` }} />
            <div className="swatch__label">
              <div className="swatch__name">{s.name}</div>
              <div className="swatch__hex">
                {s.hex} · {s.token}
              </div>
            </div>
          </div>
        ))}
      </div>

      <aside className="highlight-block" style={{ marginBottom: 44 }}>
        <div className="highlight-block__kicker">⟡ DECISÃO DE ACESSIBILIDADE</div>
        <p className="highlight-block__text">
          <strong style={{ color: "var(--white)" }}>#9197B4</strong> é cor oficial da paleta da marca e
          continua no sistema como <code>--steel-400</code>, aplicada em bordas, separadores e UI não
          textual. Ela <strong style={{ color: "var(--white)" }}>não</strong> é usada como cor de texto:
          contra as superfícies reais do site ela reprova o mínimo de 4,5:1 da WCAG AA para texto normal.
          O token semântico <code>--text-muted</code> usa <strong style={{ color: "var(--white)" }}>#a3a9c4</strong>,
          que preserva a matiz, sobe a luminosidade o mínimo necessário e passa em todas as superfícies
          (pior caso 5,07:1). Acessibilidade prevalece sobre o uso literal do HEX da paleta.
        </p>
        <div className="ds-badges" style={{ marginTop: 16 }}>
          {MUTED_RATIOS.map((r) => (
            <span
              key={r.surface}
              className="badge badge--sm"
              style={{
                color: r.pass ? "var(--white)" : "var(--text-muted)",
                borderColor: "var(--steel-400)",
                background: r.hex,
              }}
            >
              #9197B4 / {r.surface} · {r.ratio} · {r.pass ? "AA" : "reprova"}
            </span>
          ))}
        </div>
      </aside>

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
        <blockquote className="quote-block" style={{ borderLeftColor: "var(--interactive)", background: "rgb(var(--interactive-rgb) / .08)" }}>
          “Que a força esteja com o seu deploy.”
          <footer style={{ color: "var(--interactive)" }}>— Bloco de citação</footer>
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
