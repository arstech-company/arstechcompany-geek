import Link from "next/link";
import type { Metadata } from "next";
import PostCard from "@/components/PostCard";
import { getAllPosts, getCategoriesWithCounts } from "@/lib/posts";
import { SITE_DESCRIPTION } from "@/lib/site";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  const posts = getAllPosts();
  const categories = getCategoriesWithCounts();
  const heroPost = posts[0];
  const sidePosts = posts.slice(1, 3);
  const recentPosts = posts.slice(3, 9);

  return (
    <main>
      <section className="container hero fade-up">
        <div className="hero__kicker">
          <span className="hero__kicker-rule" aria-hidden="true" />
          BLOG OFICIAL // ARS TECH COMPANY
        </div>
        <h1 className="hero__title">
          Onde tecnologia encontra <span className="gradient-text">cultura pop</span>.
        </h1>
        <p className="hero__lead">{SITE_DESCRIPTION}</p>
        <div className="hero__actions">
          <Link href="/artigos" className="btn btn-primary">
            Explorar artigos
          </Link>
          <a href="#categorias" className="btn btn-outline">
            Navegar por universo
          </a>
        </div>
      </section>

      <section aria-label="Destaques" className="container section--tight">
        <div className="featured-grid">
          <PostCard post={heroPost} variant="hero" />
          <div className="side-stack">
            {sidePosts.map((post) => (
              <PostCard key={post.slug} post={post} variant="side" />
            ))}
          </div>
        </div>
      </section>

      <section id="categorias" aria-label="Categorias" className="band">
        <div className="container section">
          <div className="section__head">
            <h2 className="section__title">Navegue por universo</h2>
            <span className="section__kicker">06 SETORES ATIVOS</span>
          </div>
          <div className="category-grid">
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={`/artigos?categoria=${category.slug}`}
                className="category-card"
                style={{ borderColor: category.colorDim }}
              >
                <span className="category-card__code" style={{ color: category.color }}>
                  {category.code}
                </span>
                <span className="category-card__name">{category.name}</span>
                <span className="category-card__count">{category.count} artigos</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section aria-label="Posts recentes" className="container section">
        <div className="section__head">
          <h2 className="section__title">Recentes</h2>
          <Link href="/artigos" className="section__link">
            Ver todos →
          </Link>
        </div>
        <div className="post-grid">
          {recentPosts.map((post) => (
            <PostCard key={post.slug} post={post} variant="grid" />
          ))}
        </div>
      </section>
    </main>
  );
}
