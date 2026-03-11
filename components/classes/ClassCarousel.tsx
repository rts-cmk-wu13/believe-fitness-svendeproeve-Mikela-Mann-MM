

import ClassCard from "./ClassCard";
import type { FitnessClassSummary, Rating } from "@/types";

interface ClassCarouselProps {
    classes: (FitnessClassSummary & {
        asset?: { url: string };
        ratings?: Rating[];
    })[];
}

export default function ClassCarousel({ classes }: ClassCarouselProps) {
    return (
        <div className="flex gap-3 overflow-x-auto pb-2 snap-x snap-mandatory">
        {classes.map((c)=> (
        <div key={c.id} className="snap-start shrink-0 w-40 sm:w-48">
            <ClassCard fitnessClass={c} /* width={160} height={200} */ />
        </div>
        ))}
        </div>
    );
}

//skal kortene være responsive og skal denne tilføjes [-webkit-overflow-scrolling:touch]