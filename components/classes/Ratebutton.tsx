

"use client";

import { useState } from "react";
import RatingModal from "@/components/classes/RatingModal";

interface RateButtonProps {
    classId: number;
    userId: number;
    className: string;
}

export default function RateButton({ classId, userId, className }: RateButtonProps) {   
    const [open, setOpen] = useState(false);

    return (
        <>
        <button
            onClick={() => setOpen(true)}
            aria-label={`Rate ${className}`}
            className="px-5 py-2 rounded-full text-sm font-bold tracking-wide border-[1.5px] border-(--brand-yellow) text-(--brand-yellow) bg-transparent cursor-pointer"
        >
            RATE CLASS
        </button>
        {open && (
            <RatingModal
                classId={classId}
                userId={userId}
                className={className}
                onClose={() => setOpen(false)}
            />
        )}
        </>
    );
}