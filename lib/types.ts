export type CategoryName =
  | "Filmes"
  | "Star Wars"
  | "Marvel"
  | "DC"
  | "Animes"
  | "Games"
  | "Tecnologia";

export interface Category {
  name: CategoryName;
  slug: string;
  color: string;
  /** HUD-style prefix shown on cover placeholders, e.g. "FLM://" */
  code: string;
  /** Textura SVG decorativa de fundo do card de setor (em /public) */
  texture: string;
}

/** Metadados da imagem de capa de um artigo (arquivo local em /public). */
export interface PostCover {
  coverImage: string;
  coverImageAlt: string;
  imageCredit: string;
  imageSource: string;
  imageLicense: string;
}

export interface DecoratedCategory extends Category {
  count: number;
  colorDim: string;
  tint: string;
}

/**
 * Blocos editoriais que compõem o corpo de um artigo. A estrutura em blocos
 * espelha o design system (parágrafo, subtítulo, citação, destaque, código)
 * e foi pensada para mapear 1:1 com um CMS headless ou MDX no futuro.
 */
export type ArticleBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "quote"; text: string; by: string }
  | { type: "highlight"; text: string }
  | { type: "code"; filename: string; code: string };

export interface PostSeed extends PostCover {
  slug: string;
  title: string;
  category: CategoryName;
  excerpt: string;
  author: string;
  /** ISO date (YYYY-MM-DD) */
  date: string;
  tags: string[];
  blocks: ArticleBlock[];
  /** Fontes consultadas na apuração, exibidas ao fim do artigo */
  sources?: Array<{ label: string; url: string }>;
}

export interface Post extends PostSeed {
  /** Zero-padded position used to build the HUD cover code, e.g. "001" */
  code: string;
  color: string;
  colorDim: string;
  tint: string;
  tintDeep: string;
  initials: string;
}
