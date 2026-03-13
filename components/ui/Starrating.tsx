

import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number; 
  max?: number; 
  size?: "sm" | "md";
}

export default function StarRating({ rating, max = 5, size = "md" }: StarRatingProps) {
  const sizePX = size === "sm" ? "14" : "18";

  return (
    <div className="flex items-center gap-0.5"
      role="img"
      arial-label={`${rating} out of ${max} stars`}>
      {Array.from({ length: max }, (_, i) => (
        <Star key={i} size={sizePX} fill={i < Math.round(rating) ? "#0A0A0A" : "#D1D5DB"}
          stroke={i < Math.round(rating) ? "#0A0A0A" : "#D1D5DB"} />

      ))}
    </div>
  );
}