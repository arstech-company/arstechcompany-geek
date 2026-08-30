import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ArticleBody from "@/components/ArticleBody";
import ArticleImage from "@/components/ArticleImage";
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
      images: [{ url: post.coverImage, alt: post.coverImageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [post.coverImage],
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
    image: `${SITE_URL}${post.coverImage}`,
    articleSection: post.category,
    keywords: post.tags.join(", "),
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
            <div className="article__date">{formatDate(post.date)}</div>
          </div>
        </div>

        <figure className="article-figure">
          <ArticleImage
            src={post.coverImage}
            alt={post.coverImageAlt}
            code={post.code}
            color={post.color}
            priority
            sizes="(max-width: 800px) 100vw, 760px"
            className="article-cover"
          />
          <figcaption className="article-figure__credit">
            Imagem:{" "}
            <a href={post.imageSource} target="_blank" rel="noopener noreferrer">
              {post.imageCredit}
            </a>{" "}
            · {post.imageLicense}
            {post.imageSource.includes("wikimedia.org") && " · via Wikimedia Commons"}
          </figcaption>
        </figure>

        <ArticleBody post={post} />

        <div className="tag-row">
          {post.tags.map((tag) => (
            <span key={tag} className="tag">
              # {tag}
            </span>
          ))}
        </div>

        {post.sources && post.sources.length > 0 && (
          <aside className="article-sources" aria-label="Fontes consultadas">
            <div className="article-sources__title">FONTES CONSULTADAS</div>
            <ul className="article-sources__list">
              {post.sources.map((source) => (
                <li key={source.url}>
                  <a href={source.url} target="_blank" rel="noopener noreferrer">
                    {source.label} ↗
                  </a>
                </li>
              ))}
            </ul>
          </aside>
        )}
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
