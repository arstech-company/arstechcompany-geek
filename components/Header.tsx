"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { INSTITUTIONAL_URL } from "@/lib/site";

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
          <Image
            src="/images/ars-tech-logo.jpeg"
            alt="ARS Tech"
            width={36}
            height={36}
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
