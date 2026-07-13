import type { Category, CategoryName } from "./types";

export const CATEGORIES: Category[] = [
  { name: "Filmes", slug: "filmes", color: "#a78bfa", code: "FLM://" },
  { name: "Star Wars", slug: "star-wars", color: "#e2c044", code: "SWX://" },
  { name: "Marvel", slug: "marvel", color: "#e5484d", code: "MVL://" },
  { name: "DC", slug: "dc", color: "#4c8dff", code: "DCU://" },
  { name: "Animes", slug: "animes", color: "#ec6bb0", code: "ANM://" },
  { name: "Games", slug: "games", color: "#3ecf8e", code: "GMS://" },
];

export function getCategory(name: CategoryName): Category {
  const category = CATEGORIES.find((c) => c.name === name);
  if (!category) throw new Error(`Categoria desconhecida: ${name}`);
  return category;
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return CATEGORIES.find((c) => c.slug === slug);
}
