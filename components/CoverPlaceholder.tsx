import { hexToRgba } from "@/lib/colors";

interface CoverPlaceholderProps {
  color: string;
  code: string;
  gridSize?: "sm" | "lg";
  className?: string;
}

export default function CoverPlaceholder({
  color,
  code,
  gridSize = "lg",
  className,
}: CoverPlaceholderProps) {
  return (
    <div
      className={["cover", className].filter(Boolean).join(" ")}
      style={{
        background: `linear-gradient(145deg, ${hexToRgba(color, 0.28)}, #00111d 75%)`,
        color,
      }}
      aria-hidden="true"
    >
      <div className={`cover__grid ${gridSize === "sm" ? "cover__grid--sm" : ""}`} />
      <span className="cover__code" style={{ color }}>
        {code}
      </span>
      <span className="cover__bracket cover__bracket--tl" />
      <span className="cover__bracket cover__bracket--br" />
    </div>
  );
}
