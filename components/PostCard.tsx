import Link from "next/link";
import type { Post } from "@/lib/types";
import { formatDate } from "@/lib/format";
import ArticleImage from "./ArticleImage";
import CategoryBadge from "./CategoryBadge";

interface PostCardProps {
  post: Post;
  variant?: "hero" | "side" | "grid" | "list" | "related";
}

export default function PostCard({ post, variant = "grid" }: PostCardProps) {
  const href = `/artigos/${post.slug}`;

  if (variant === "hero") {
    return (
      <Link href={href} className="post-card post-card--hero" style={{ borderColor: post.colorDim }}>
        <ArticleImage
          src={post.coverImage}
          alt={post.coverImageAlt}
          code={post.code}
          color={post.color}
          priority
          sizes="(max-width: 720px) 100vw, 60vw"
        />
        <div className="post-card__body">
          <CategoryBadge name={post.category} color={post.color} colorDim={post.colorDim} tint={post.tint} />
          <h2 className="post-card__title">{post.title}</h2>
          <p className="post-card__excerpt">{post.excerpt}</p>
          <div className="post-card__meta">
            <span>{post.author}</span>
            <span>·</span>
            <span>{formatDate(post.date)}</span>
          </div>
        </div>
      </Link>
    );
  }

  if (variant === "side") {
    return (
      <Link href={href} className="post-card post-card--side">
        <CategoryBadge name={post.category} color={post.color} colorDim={post.colorDim} tint={post.tint} size="sm" />
        <h3 className="post-card__title--side">{post.title}</h3>
        <p className="post-card__excerpt--sm">{post.excerpt}</p>
        <div className="post-card__meta post-card__meta--sm">
          {formatDate(post.date)}
        </div>
      </Link>
    );
  }

  if (variant === "related") {
    return (
      <Link href={href} className="post-card post-card--related">
        <CategoryBadge name={post.category} color={post.color} colorDim={post.colorDim} tint={post.tint} size="sm" />
        <h3 className="post-card__title--side" style={{ fontSize: 16 }}>
          {post.title}
        </h3>
        <div className="post-card__meta post-card__meta--sm">
          {formatDate(post.date)}
        </div>
      </Link>
    );
  }

  return (
    <Link href={href} className="post-card">
      <ArticleImage
        src={post.coverImage}
        alt={post.coverImageAlt}
        code={post.code}
        color={post.color}
        sizes="(max-width: 720px) 100vw, 320px"
      />
      <div className="post-card__body">
        <CategoryBadge name={post.category} color={post.color} colorDim={post.colorDim} tint={post.tint} size="sm" />
        <h3 className="post-card__title--card">{post.title}</h3>
        {variant === "list" && <p className="post-card__excerpt--sm">{post.excerpt}</p>}
        <div className="post-card__meta post-card__meta--sm">
          {variant === "list" ? `${post.author} · ` : ""}
          {formatDate(post.date)}
        </div>
      </div>
    </Link>
  );
}
