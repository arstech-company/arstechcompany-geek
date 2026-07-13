import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ArticleBody from "@/components/ArticleBody";
import PostCard from "@/components/PostCard";
import { getAllPosts, getPostBySlug, getRelatedPosts } from "@/lib/posts";
import { formatDate } from "@/lib/format";
import { SITE_URL } from "@/lib/site";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  const url = `/artigos/${post.slug}`;

  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      url,
      publishedTime: post.date,
      authors: [post.author],
    },
    twitter: {
      card: "summary",
      title: post.title,
      description: post.excerpt,
    },
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const related = getRelatedPosts(post, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    author: { "@type": "Person", name: post.author },
    datePublished: post.date,
    publisher: {
      "@type": "Organization",
      name: "ARS Tech Company",
      url: "https://arstechcompany.com.br",
    },
    mainEntityOfPage: `${SITE_URL}/artigos/${post.slug}`,
    articleSection: post.category,
    keywords: post.body.tags.join(", "),
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="container container--article page-pad" style={{ paddingBottom: 40 }}>
        <nav aria-label="Breadcrumb" className="breadcrumb">
          <Link href="/">HOME</Link> / <Link href="/artigos">ARTIGOS</Link> /{" "}
          <span style={{ color: post.color }}>{post.category.toUpperCase()}</span>
        </nav>

        <span className="badge" style={{ color: post.color, borderColor: post.colorDim, background: post.tint }}>
          {post.category}
        </span>

        <h1 className="article__title">{post.title}</h1>
        <p className="article__excerpt">{post.excerpt}</p>

        <div className="article__meta">
          <span
            className="avatar"
            aria-hidden="true"
            style={{ background: `linear-gradient(135deg, ${post.color}, #020e38)` }}
          >
            {post.initials}
          </span>
          <div>
            <div className="article__author">{post.author}</div>
            <div className="article__date">
              {formatDate(post.date)} · {post.readMinutes} min de leitura
            </div>
          </div>
        </div>

        <div
          className="cover article-cover"
          style={{
            borderColor: post.colorDim,
            background: `linear-gradient(145deg, ${post.tintDeep}, #00111d 70%)`,
            color: post.color,
          }}
          aria-hidden="true"
        >
          <div className="cover__grid" />
          <span className="cover__code" style={{ color: post.color }}>
            {post.code}
          </span>
          <span className="cover__bracket cover__bracket--tl" />
          <span className="cover__bracket cover__bracket--br" />
        </div>

        <ArticleBody post={post} />

        <div className="tag-row">
          {post.body.tags.map((tag) => (
            <span key={tag} className="tag">
              # {tag}
            </span>
          ))}
        </div>
      </article>

      {related.length > 0 && (
        <section aria-label="Artigos relacionados" className="band band--top-only">
          <div className="container section">
            <h2 className="section__title" style={{ marginBottom: 22, fontSize: 22 }}>
              Continue explorando
            </h2>
            <div className="related-grid">
              {related.map((p) => (
                <PostCard key={p.slug} post={p} variant="related" />
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
