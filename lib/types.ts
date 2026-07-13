export type CategoryName =
  | "Filmes"
  | "Star Wars"
  | "Marvel"
  | "DC"
  | "Animes"
  | "Games";

export interface Category {
  name: CategoryName;
  slug: string;
  color: string;
  /** HUD-style prefix shown on cover placeholders, e.g. "FLM://" */
  code: string;
}

export interface DecoratedCategory extends Category {
  count: number;
  colorDim: string;
  tint: string;
}

export interface PostBody {
  intro: string;
  context: string;
  quote: string;
  quoteBy: string;
  sectionTitle: string;
  sectionBody: string;
  codeFile: string;
  codeSnippet: string;
  highlight: string;
  closing: string;
  tags: string[];
}

export interface PostSeed {
  slug: string;
  title: string;
  category: CategoryName;
  excerpt: string;
  author: string;
  /** ISO date (YYYY-MM-DD) */
  date: string;
  readMinutes: number;
  body: PostBody;
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
