"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { INSTITUTIONAL_URL, withBasePath } from "@/lib/site";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/artigos", label: "Artigos" },
];

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <Link href="/" className="brand">
          {/* Derivada de performance: mesmo logo oficial de
              public/images/logo.jpeg, apenas redimensionado (120px = 3x do
              slot de 40px, cobre telas HiDPI). O original permanece intocado. */}
          <Image
            src={withBasePath("/images/logo-120.webp")}
            alt="ARS Tech Company"
            width={44}
            height={44}
            priority
            className="brand__logo"
          />
          <span className="brand__word">
            <span className="brand__name">
              ARS <span className="brand__geek">GEEK</span>
            </span>
            <span className="brand__domain">geek.arstechcompany.com.br</span>
          </span>
        </Link>
        <nav aria-label="Principal" className="nav">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`nav__link ${isActive(pathname, link.href) ? "nav__link--active" : ""}`}
              aria-current={isActive(pathname, link.href) ? "page" : undefined}
            >
              {link.label}
            </Link>
          ))}
          <a href={INSTITUTIONAL_URL} className="nav__cta" target="_blank" rel="noopener noreferrer">
            ARS Tech ↗
          </a>
        </nav>
      </div>
    </header>
  );
}
