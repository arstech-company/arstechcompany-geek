import Link from "next/link";
import type { Post } from "@/lib/types";
import { formatDate } from "@/lib/format";
import CategoryBadge from "./CategoryBadge";
import CoverPlaceholder from "./CoverPlaceholder";

interface PostCardProps {
  post: Post;
  variant?: "hero" | "side" | "grid" | "list" | "related";
}

export default function PostCard({ post, variant = "grid" }: PostCardProps) {
  const href = `/artigos/${post.slug}`;

  if (variant === "hero") {
    return (
      <Link href={href} className="post-card post-card--hero" style={{ borderColor: post.colorDim }}>
        <CoverPlaceholder color={post.color} code={post.code} gridSize="lg" />
        <div className="post-card__body">
          <CategoryBadge name={post.category} color={post.color} colorDim={post.colorDim} tint={post.tint} />
          <h2 className="post-card__title">{post.title}</h2>
          <p className="post-card__excerpt">{post.excerpt}</p>
          <div className="post-card__meta">
            <span>{post.author}</span>
            <span>·</span>
            <span>{formatDate(post.date)}</span>
            <span>·</span>
            <span>{post.readMinutes} min</span>
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
          {formatDate(post.date)} · {post.readMinutes} min
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
          {formatDate(post.date)} · {post.readMinutes} min
        </div>
      </Link>
    );
  }

  return (
    <Link href={href} className="post-card">
      <CoverPlaceholder color={post.color} code={post.code} gridSize="sm" />
      <div className="post-card__body">
        <CategoryBadge name={post.category} color={post.color} colorDim={post.colorDim} tint={post.tint} size="sm" />
        <h3 className="post-card__title--card">{post.title}</h3>
        {variant === "list" && <p className="post-card__excerpt--sm">{post.excerpt}</p>}
        <div className="post-card__meta post-card__meta--sm">
          {variant === "list" ? `${post.author} · ` : ""}
          {formatDate(post.date)} · {post.readMinutes} min
        </div>
      </div>
    </Link>
  );
}
