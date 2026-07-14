"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { DecoratedCategory } from "@/lib/types";
import CategorySectorCard from "./CategorySectorCard";

interface SectorsCarouselProps {
  categories: DecoratedCategory[];
}

const CARD_GAP = 14;

/**
 * Carrossel horizontal da seção "Navegue por universo". Mantém os cards de
 * setor no tamanho original, em uma única linha deslizável: arrasto com
 * mouse/touch, roda do mouse, botões anterior/próximo e setas do teclado.
 * Sem autoplay — só se move com interação do usuário.
 */
export default function SectorsCarousel({ categories }: SectorsCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const dragState = useRef({ dragging: false, moved: false, startX: 0, startScroll: 0 });
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const updateButtons = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 4);
    setCanNext(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    updateButtons();
    el.addEventListener("scroll", updateButtons, { passive: true });
    window.addEventListener("resize", updateButtons);

    // Roda do mouse vertical → deslocamento horizontal, sem sequestrar a
    // rolagem da página quando o carrossel já chegou ao fim.
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;
      const towardEnd = e.deltaY > 0;
      const canScroll = towardEnd
        ? el.scrollLeft < el.scrollWidth - el.clientWidth - 1
        : el.scrollLeft > 1;
      if (!canScroll) return;
      e.preventDefault();
      el.scrollLeft += e.deltaY;
    };
    el.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      el.removeEventListener("scroll", updateButtons);
      window.removeEventListener("resize", updateButtons);
      el.removeEventListener("wheel", onWheel);
    };
  }, [updateButtons]);

  const prefersReducedMotion = () =>
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const scrollByCards = useCallback((direction: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>(".category-card");
    const step = card ? card.offsetWidth + CARD_GAP : 200;
    el.scrollBy({ left: direction * step, behavior: prefersReducedMotion() ? "auto" : "smooth" });
  }, []);

  // Arrasto com mouse (touch já desliza nativamente via overflow scroll).
  function onPointerDown(e: React.PointerEvent<HTMLDivElement>) {
    if (e.pointerType !== "mouse") return;
    const el = trackRef.current;
    if (!el) return;
    dragState.current = { dragging: true, moved: false, startX: e.clientX, startScroll: el.scrollLeft };
    el.classList.add("is-dragging");
  }

  function onPointerMove(e: React.PointerEvent<HTMLDivElement>) {
    const el = trackRef.current;
    const s = dragState.current;
    if (!el || !s.dragging) return;
    const delta = e.clientX - s.startX;
    if (Math.abs(delta) > 5) {
      s.moved = true;
      el.setPointerCapture(e.pointerId);
    }
    el.scrollLeft = s.startScroll - delta;
  }

  function endDrag(e: React.PointerEvent<HTMLDivElement>) {
    const el = trackRef.current;
    const s = dragState.current;
    if (!el || !s.dragging) return;
    s.dragging = false;
    el.classList.remove("is-dragging");
    if (el.hasPointerCapture(e.pointerId)) el.releasePointerCapture(e.pointerId);
  }

  function onClickCapture(e: React.MouseEvent<HTMLDivElement>) {
    // Depois de um arrasto, o clique final não deve abrir o link do card.
    if (dragState.current.moved) {
      e.preventDefault();
      e.stopPropagation();
      dragState.current.moved = false;
    }
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      scrollByCards(1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      scrollByCards(-1);
    }
  }

  return (
    <div className="sectors-carousel-wrapper">
      <button
        type="button"
        className="sectors-carousel__btn sectors-carousel__btn--prev"
        aria-label="Ver setor anterior"
        disabled={!canPrev}
        suppressHydrationWarning
        onClick={() => scrollByCards(-1)}
      >
        ‹
      </button>

      <div
        ref={trackRef}
        className="sectors-carousel"
        role="group"
        aria-label="Setores do blog — role horizontalmente para ver todos"
        tabIndex={0}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
        onPointerCancel={endDrag}
        onClickCapture={onClickCapture}
        onKeyDown={onKeyDown}
      >
        {categories.map((category) => (
          <CategorySectorCard key={category.slug} category={category} />
        ))}
      </div>

      <button
        type="button"
        className="sectors-carousel__btn sectors-carousel__btn--next"
        aria-label="Ver próximo setor"
        disabled={!canNext}
        suppressHydrationWarning
        onClick={() => scrollByCards(1)}
      >
        ›
      </button>
    </div>
  );
}
