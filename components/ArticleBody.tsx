import type { Post } from "@/lib/types";

interface ArticleBodyProps {
  post: Post;
}

export default function ArticleBody({ post }: ArticleBodyProps) {
  return (
    <div className="article-body">
      {post.blocks.map((block, index) => {
        switch (block.type) {
          case "paragraph":
            return <p key={index}>{block.text}</p>;

          case "heading":
            return <h2 key={index}>{block.text}</h2>;

          case "quote":
            return (
              <blockquote
                key={index}
                className="quote-block"
                style={{ borderLeftColor: post.color, background: post.tint }}
              >
                “{block.text}”
                <footer style={{ color: post.color }}>— {block.by}</footer>
              </blockquote>
            );

          case "highlight":
            return (
              <aside key={index} className="highlight-block">
                <div className="highlight-block__kicker">⟡ DESTAQUE</div>
                <p className="highlight-block__text">{block.text}</p>
              </aside>
            );

          case "code":
            return (
              <figure key={index} className="code-block">
                <figcaption className="code-block__bar">
                  <span className="code-block__dot" style={{ background: "#e5484d" }} aria-hidden="true" />
                  <span className="code-block__dot" style={{ background: "#e2c044" }} aria-hidden="true" />
                  <span className="code-block__dot" style={{ background: "#3ecf8e" }} aria-hidden="true" />
                  <span className="code-block__filename">{block.filename}</span>
                </figcaption>
                <pre className="code-block__pre">{block.code}</pre>
              </figure>
            );
        }
      })}
    </div>
  );
}
