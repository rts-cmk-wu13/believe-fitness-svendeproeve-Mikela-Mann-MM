

"use client"

import { useState } from "react";
import { Star } from "lucide-react";
import { rateAction } from "@/lib/actions";
import { reportError } from "@/lib/reportError";

interface RatingModalProps {
    classId: number;
    userId: number;
    className: string;
    onClose: () => void;
}

export default function RatingModal({ classId, userId, className, onClose }: RatingModalProps) {
    const [rating, setRating] = useState(5);
    const [hovered, setHovered] = useState<number | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const displayed = hovered ?? rating;


    const handleSave = async () => {
        setLoading(true);
        setError("");
        try {
            const result = await rateAction(classId, { userId, rating });
            if (result.error) setError(result.error);
            else onClose();
        } catch (err) {
            reportError(err, "RatingModal");
            setError("Could not submit rating. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (

        <div
            role="dialog"
            aria-modal="true"
            arial-label={`Rate the ${className} class`}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-6"
            onClick={onClose}
        >
            <div
                className="w-full max-w-sm rounded-2xl px-8 py-8 bg-(--white) shadow-xl flex flex-col items-center gap-4"
                onClick={(e) => e.stopPropagation()}
            >
                <h3 className="font-bold text-base text-center leading-snug">
                    Rate the {className} class
                </h3>


                {/* Star */}
                <div className="flex gap-1 pt-2" aria-hidden="true">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <button
                            key={star}
                            onClick={() => setRating(star)}
                            onMouseEnter={() => setHovered(star)}
                            onMouseLeave={() => setHovered(null)}
                            className="cursor-pointer"
                            tabIndex={-1}
                        >
                            <Star
                                key={star}
                                size={14}
                                fill={star <= rating ? "var(--brand-yellow)" : "var(--grey-200)"}
                                stroke={star <= rating ? "var-(--brand-yellow)" : "var(--grey-200)"}
                            />
                        </button>
                    ))}
                </div>

                <p className="text-sm text-center font-semibold" aria-live="polite">
                    Your rating: {displayed}/5
                </p>

                {/* Slider */}

                <input
                    type="range"
                    min={1}
                    max={5}
                    step={1}
                    value={rating}
                    onChange={(e) => setRating(Number(e.target.value))}
                    className="w-full accent-(--brand-yellow) cursor-pointer pb-6 pt-4"
                    aria-label={`Select a rating between 1 and 5 for the ${className} class`}
                />

                {error && (
                    <p className="text-(--error) text-center text-sm mb-3" role="alert">
                        {error}
                    </p>
                )}

                <button
                    onClick={handleSave}
                    disabled={loading}
                    className="btn-primary w-full py-4 rounded-full"
                    aria-label={`Save rating of ${rating} out of 5 for ${className} `}
                    aria-busy={loading}
                >
                    {loading ? "Saving ..." : "SAVE RATING"}
                </button>
            </div>
        </div>
    );
}