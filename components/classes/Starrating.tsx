

import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number; // Expected to be between 0 and 5
  max?: number; // Optional, default to 5
  size?: "sm" | "md";
}

export default function StarRating({ rating, max = 5, size = "md" }: StarRatingProps) {
  const sizePX = size === "sm" ? "14" : "18"; 

  return (
    <div className="flex items-center gap-0.5">
        arial-label={`${rating} out of ${max} stars`}
      {Array.from({ length: max }, (_, i) => (
        <Star key={i} size={sizePX} fill={i < Math.round(rating) ? "var(--brand-yellow)" : "#D1D5DB"}
        stroke={i < Math.round(rating) ? "var(--brand-yellow)" : "#D1D5DB"} />

      ))}
      </div>
  );
}