import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ADSENSE_CLIENT_ID, GA_MEASUREMENT_ID, SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: "#00080f",
  colorScheme: "dark",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Onde tecnologia encontra cultura pop`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "cultura geek",
    "star wars",
    "marvel",
    "dc",
    "animes",
    "games",
    "filmes",
    "ARS Tech Company",
  ],
  authors: [{ name: "ARS Tech Company", url: "https://arstechcompany.com.br" }],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: SITE_NAME,
    title: `${SITE_NAME} — Onde tecnologia encontra cultura pop`,
    description: SITE_DESCRIPTION,
    url: "/",
    images: [{ url: "/images/ars-tech-logo.jpeg", width: 1254, height: 1254, alt: "ARS GEEK" }],
  },
  twitter: {
    card: "summary",
    title: `${SITE_NAME} — Onde tecnologia encontra cultura pop`,
    description: SITE_DESCRIPTION,
    images: ["/images/ars-tech-logo.jpeg"],
  },
  ...(ADSENSE_CLIENT_ID
    ? { other: { "google-adsense-account": ADSENSE_CLIENT_ID } }
    : {}),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body>
        <a href="#conteudo-principal" className="skip-link">
          Pular para o conteúdo
        </a>
        <div className="hud-layer" aria-hidden="true" />
        <Header />
        <div id="conteudo-principal" className="content-shell">
          {children}
        </div>
        <Footer />

        {ADSENSE_CLIENT_ID && (
          <Script
            id="google-adsense"
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT_ID}`}
            crossOrigin="anonymous"
            strategy="afterInteractive"
          />
        )}

        {GA_MEASUREMENT_ID && (
          <>
            <Script
              id="google-analytics-src"
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_MEASUREMENT_ID}');
              `}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
