import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Página não encontrada",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main className="not-found">
      <div>
        <div className="not-found__code" aria-hidden="true">
          ERR_404
        </div>
        <h1 className="not-found__title">Sinal perdido no hiperespaço.</h1>
        <p className="not-found__text">
          A página que você procura não existe ou foi movida para outro setor do arquivo.
        </p>
        <Link href="/" className="btn btn-primary">
          Voltar para a home
        </Link>
      </div>
    </main>
  );
}
