

import Link from "next/link";
import Image from "next/image";
import StarRating from "@/components/ui/Starrating"
import type { FitnessClassSummary, Rating } from "@/types";

interface ClassCardProps {
    fitnessClass: FitnessClassSummary & {
        asset?: { url: string }; ratings?:
        Rating[]
    };
    width?: number;
    height?: number;
}


function getAverageRating(ratings?: Rating[]): number {
    if (!ratings || ratings.length === 0) return 0;
    return ratings?.reduce((sum, r) => sum + r.rating, 0) / ratings?.length;
}

export default function ClassCard({ fitnessClass, width = 160, height = 200 }: ClassCardProps) {
    const avgRating = getAverageRating(fitnessClass.ratings);

    return (
        <Link href={`/classes/${fitnessClass.id}`}
            className="class-card"
            style={{ width, height }}
        >
            {/* Image */}
            {fitnessClass.asset?.url ? (
                <Image
                    src={fitnessClass.asset.url}
                    alt={fitnessClass.className}
                    fill
                    className="object-cover"
                    sizes={`${width}px`}
                />
            ) : (
                <div className="w-full h-full bg-var(--grey-light)" />
            )}

            {/* Label overlay */}
            <div className="class-card-label">
                <p className="text-sm font-bold leading-tight text-(--brand-black)">
                    {fitnessClass.className}
                </p>
                <StarRating rating={avgRating} size="sm" />
            </div>
        </Link>
    );
} 