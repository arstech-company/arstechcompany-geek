interface CategoryBadgeProps {
  name: string;
  color: string;
  colorDim: string;
  tint: string;
  size?: "sm" | "md";
}

export default function CategoryBadge({ name, color, colorDim, tint, size = "md" }: CategoryBadgeProps) {
  return (
    <span
      className={`badge ${size === "sm" ? "badge--sm" : ""}`}
      style={{ color, borderColor: colorDim, background: tint }}
    >
      {name}
    </span>
  );
}
