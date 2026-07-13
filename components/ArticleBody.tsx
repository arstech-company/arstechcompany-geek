import type { Post } from "@/lib/types";

interface ArticleBodyProps {
  post: Post;
}

export default function ArticleBody({ post }: ArticleBodyProps) {
  const { body, color } = post;

  return (
    <div className="article-body">
      <p>{body.intro}</p>
      <p>{body.context}</p>

      <blockquote className="quote-block" style={{ borderLeftColor: color, background: post.tint }}>
        “{body.quote}”
        <footer style={{ color }}>— {body.quoteBy}</footer>
      </blockquote>

      <h2>{body.sectionTitle}</h2>
      <p>{body.sectionBody}</p>

      <figure className="code-block">
        <figcaption className="code-block__bar">
          <span className="code-block__dot" style={{ background: "#e5484d" }} aria-hidden="true" />
          <span className="code-block__dot" style={{ background: "#e2c044" }} aria-hidden="true" />
          <span className="code-block__dot" style={{ background: "#3ecf8e" }} aria-hidden="true" />
          <span className="code-block__filename">{body.codeFile}</span>
        </figcaption>
        <pre className="code-block__pre">{body.codeSnippet}</pre>
      </figure>

      <aside className="highlight-block">
        <div className="highlight-block__kicker">⟡ DESTAQUE</div>
        <p className="highlight-block__text">{body.highlight}</p>
      </aside>

      <p>{body.closing}</p>
    </div>
  );
}
