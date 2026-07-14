import type { Category, CategoryName } from "./types";

// Texturas: SVGs originais criados para o projeto (sem licença de terceiros),
// em /public/images/categories — apoio visual de baixa opacidade nos cards.
export const CATEGORIES: Category[] = [
  { name: "Filmes", slug: "filmes", color: "#a78bfa", code: "FLM://", texture: "/images/categories/filmes.svg" },
  { name: "Star Wars", slug: "star-wars", color: "#e2c044", code: "SWX://", texture: "/images/categories/star-wars.svg" },
  { name: "Marvel", slug: "marvel", color: "#e5484d", code: "MVL://", texture: "/images/categories/marvel.svg" },
  { name: "DC", slug: "dc", color: "#4c8dff", code: "DCU://", texture: "/images/categories/dc.svg" },
  { name: "Animes", slug: "animes", color: "#ec6bb0", code: "ANM://", texture: "/images/categories/animes.svg" },
  { name: "Games", slug: "games", color: "#3ecf8e", code: "GMS://", texture: "/images/categories/games.svg" },
  { name: "Tecnologia", slug: "tecnologia", color: "#38bdf8", code: "TEC://", texture: "/images/categories/tecnologia.svg" },
];

export function getCategory(name: CategoryName): Category {
  const category = CATEGORIES.find((c) => c.name === name);
  if (!category) throw new Error(`Categoria desconhecida: ${name}`);
  return category;
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return CATEGORIES.find((c) => c.slug === slug);
}
