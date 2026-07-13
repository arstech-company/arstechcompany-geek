"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import type { DecoratedCategory, Post } from "@/lib/types";
import { hexToRgba } from "@/lib/colors";
import PostCard from "./PostCard";

interface ArticlesExplorerProps {
  posts: Post[];
  categories: DecoratedCategory[];
}

const PAGE_SIZE = 6;

export default function ArticlesExplorer({ posts, categories }: ArticlesExplorerProps) {
  const searchParams = useSearchParams();
  const initialCategory = useMemo(() => {
    const slug = searchParams.get("categoria");
    return categories.find((c) => c.slug === slug)?.name ?? "Todas";
  }, [searchParams, categories]);

  const [category, setCategory] = useState<string>(initialCategory);
  const [query, setQuery] = useState("");
  const [visible, setVisible] = useState(PAGE_SIZE);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return posts.filter((p) => {
      const matchesCategory = category === "Todas" || p.category === category;
      const matchesQuery =
        !q || p.title.toLowerCase().includes(q) || p.excerpt.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [posts, category, query]);

  const visiblePosts = filtered.slice(0, visible);
  const hasMore = filtered.length > visible;
  const countLabel = String(filtered.length).padStart(2, "0");

  function selectCategory(name: string) {
    setCategory(name);
    setVisible(PAGE_SIZE);
  }

  return (
    <>
      <div className="list-kicker">ARQUIVO // {countLabel} REGISTROS</div>
      <h1 className="list-title">Todos os artigos</h1>

      <div className="filters-row">
        <div className="search-field">
          <span className="search-field__icon" aria-hidden="true">
            ⌕
          </span>
          <input
            type="search"
            aria-label="Buscar artigos"
            placeholder="Buscar no arquivo…"
            className="search-field__input"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setVisible(PAGE_SIZE);
            }}
          />
        </div>
      </div>

      <div role="toolbar" aria-label="Filtrar por categoria" className="chip-row">
        <button
          type="button"
          className={`chip ${category === "Todas" ? "chip--active" : ""}`}
          aria-pressed={category === "Todas"}
          style={
            category === "Todas"
              ? { borderColor: "#38bdf8", background: "rgba(56,189,248,.18)" }
              : undefined
          }
          onClick={() => selectCategory("Todas")}
        >
          Todas
        </button>
        {categories.map((c) => {
          const active = category === c.name;
          return (
            <button
              key={c.slug}
              type="button"
              className={`chip ${active ? "chip--active" : ""}`}
              aria-pressed={active}
              style={active ? { borderColor: c.color, background: hexToRgba(c.color, 0.18) } : undefined}
              onClick={() => selectCategory(c.name)}
            >
              {c.name}
            </button>
          );
        })}
      </div>

      <div className="post-grid">
        {visiblePosts.map((post) => (
          <PostCard key={post.slug} post={post} variant="list" />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="empty-state">
          <div className="empty-state__code">ERR_404 // NADA ENCONTRADO</div>
          <p className="empty-state__text">
            Nenhum artigo corresponde à busca. Tente outro termo ou categoria.
          </p>
        </div>
      )}

      {hasMore && (
        <div className="load-more-row">
          <button
            type="button"
            className="btn btn-outline"
            onClick={() => setVisible((v) => v + PAGE_SIZE)}
          >
            Carregar mais ↓
          </button>
        </div>
      )}
    </>
  );
}
