

"use client";

import { useRef, useEffect } from "react";
import ClassCard from "./ClassCard";
import type { FitnessClassSummary, Rating } from "@/types";

interface ClassCarouselProps {
    classes: (FitnessClassSummary & {
        asset?: { url: string };
        ratings?: Rating[];
    })[];
}

export default function ClassCarousel({ classes }: ClassCarouselProps) {
    const scrollRef = useRef<HTMLDivElement>(null);
    const repeated = [...classes, ...classes, ...classes];

    useEffect(() => {
        const el = scrollRef.current;
        if (!el) return;
        // Start i midten
        const third = el.scrollWidth / 3;
        el.scrollLeft = third;
    }, []);

    const handleScroll = () => {
        const el = scrollRef.current;
        if (!el) return;
        const third = el.scrollWidth / 3;
        if (el.scrollLeft < third * 0.5) {
            el.scrollLeft += third;
        } else if (el.scrollLeft > third * 1.5) {
            el.scrollLeft -= third;
        }
    };

    return (
        <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex gap-3 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-hide pr-6"
        >
            {repeated.map((c, i) => (
                <div key={`${Math.floor(i / classes.length)}-${c.id}`} className="snap-start shrink-0 w-40 sm:w-48">
                    <ClassCard fitnessClass={c} />
                </div>
            ))}
        </div>
    );
}
