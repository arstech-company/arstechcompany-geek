import Image from "next/image";
import Link from "next/link";
import { CATEGORIES } from "@/lib/categories";
import { CONTACT_EMAIL, INSTITUTIONAL_URL, TOOLS_URL, withBasePath } from "@/lib/site";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container site-footer__grid">
        <div>
          <div className="site-footer__brand">
            <Image
              src={withBasePath("/images/ars-tech-logo.jpeg")}
              alt=""
              width={30}
              height={30}
              className="brand__logo"
            />
            <span className="brand__name">
              ARS <span className="brand__geek">GEEK</span>
            </span>
          </div>
          <p className="site-footer__tagline">
            Onde tecnologia encontra cultura pop. O universo editorial geek da ARS Tech Company.
          </p>
        </div>

        <div>
          <div className="site-footer__heading">UNIVERSOS</div>
          <nav className="site-footer__links" aria-label="Categorias">
            {CATEGORIES.map((category) => (
              <Link
                key={category.slug}
                href={`/artigos?categoria=${category.slug}`}
                style={{ color: "var(--accent-light)" }}
              >
                {category.name}
              </Link>
            ))}
          </nav>
        </div>

        <div>
          <div className="site-footer__heading">ECOSSISTEMA ARS</div>
          <nav className="site-footer__links" aria-label="Ecossistema ARS Tech">
            <a href={INSTITUTIONAL_URL} target="_blank" rel="noopener noreferrer">
              Site institucional ↗
            </a>
            <a href={TOOLS_URL} target="_blank" rel="noopener noreferrer">
              ARS Tech Tools ↗
            </a>
            <a href={`mailto:${CONTACT_EMAIL}`}>Contato</a>
          </nav>
        </div>
      </div>

      <div className="site-footer__bottom">
        <div className="container site-footer__bottom-inner">
          <span>© {year} ARS Tech Company. Todos os direitos reservados.</span>
          <span>geek.arstechcompany.com.br // v1.0</span>
        </div>
      </div>
    </footer>
  );
}
