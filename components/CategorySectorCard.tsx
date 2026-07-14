import Link from "next/link";
import { withBasePath } from "@/lib/site";
import type { DecoratedCategory } from "@/lib/types";

interface CategorySectorCardProps {
  category: DecoratedCategory;
}

/**
 * Card de setor da seção "Navegue por universo". Nome e contagem são os
 * protagonistas; a textura SVG temática entra como camada decorativa de
 * baixa opacidade atrás do conteúdo, e a cor do setor vive na borda e na
 * própria textura.
 */
export default function CategorySectorCard({ category }: CategorySectorCardProps) {
  return (
    <Link
      href={`/artigos?categoria=${category.slug}`}
      className="category-card"
      style={{ borderColor: category.colorDim }}
    >
      <span
        className="category-card__texture"
        aria-hidden="true"
        style={{ backgroundImage: `url(${withBasePath(category.texture)})` }}
      />
      <span className="category-card__name">{category.name}</span>
      <span className="category-card__count">{category.count} artigos</span>
    </Link>
  );
}
