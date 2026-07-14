"use client";

import { useState } from "react";
import Image from "next/image";
import { hexToRgba } from "@/lib/colors";
import { withBasePath } from "@/lib/site";

interface ArticleImageProps {
  src: string;
  alt: string;
  code: string;
  color: string;
  /** Carrega com prioridade (capas above-the-fold: hero e página do artigo) */
  priority?: boolean;
  /** Dica de tamanhos para o browser escolher o recorte certo */
  sizes?: string;
  className?: string;
}

/**
 * Capa fotográfica dos artigos. A imagem fica limpa, sem etiquetas
 * sobrepostas; a linguagem HUD permanece nas bordas (grade e cantos em
 * colchete) e um overlay em gradiente preserva a identidade escura.
 * Se a imagem falhar, o placeholder HUD original (com o código do setor)
 * assume como fallback.
 */
export default function ArticleImage({
  src,
  alt,
  code,
  color,
  priority = false,
  sizes = "(max-width: 720px) 100vw, 33vw",
  className,
}: ArticleImageProps) {
  const [failed, setFailed] = useState(false);

  return (
    <div
      className={["cover", "cover--photo", className].filter(Boolean).join(" ")}
      style={{
        background: `linear-gradient(145deg, ${hexToRgba(color, 0.28)}, #00111d 75%)`,
        color,
      }}
    >
      {/* Camada HUD — visível nas bordas da foto e como fallback de erro */}
      <div className="cover__grid" aria-hidden="true" />
      {failed && (
        <span className="cover__code" style={{ color }} aria-hidden="true">
          {code}
        </span>
      )}

      {!failed && (
        <>
          <Image
            src={withBasePath(src)}
            alt={alt}
            fill
            priority={priority}
            sizes={sizes}
            className="cover__img"
            onError={() => setFailed(true)}
          />
          <div className="cover__overlay" aria-hidden="true" />
        </>
      )}

      <span className="cover__bracket cover__bracket--tl" aria-hidden="true" />
      <span className="cover__bracket cover__bracket--br" aria-hidden="true" />
    </div>
  );
}
