

"use client";

import { useState } from "react";
import { enrollAction, leaveAction } from "@/lib/actions";
import { reportError } from "@/lib/reportError";

interface EnrollButtonProps {
    classId: number;
    initialEnrolled: boolean;
}

export default function EnrollButton({ classId, initialEnrolled }: EnrollButtonProps) {
    const [enrolled, setEnrolled] = useState(initialEnrolled);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleClick = async () => {
        setLoading(true);
        setError("");
        try {
            const result = enrolled ? await leaveAction(classId) : await enrollAction(classId);

            if (result.error) setError(result.error);
            else setEnrolled((e) => !e);
        } catch (err) {
            reportError(err, "EnrollButton");
            setError("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center">
            <button
                onClick={handleClick}
                disabled={loading}
                className={`
                    w-[70%] py-4 rounded-xl
                    bg-(--brand-mid) text-white font-medium text-base
                    border-none transition-opacity
                    ${loading ? "opacity-70 cursor-not-allowed" : "cursor-pointer hover:opacity-90"}
                `}
            >
                {loading ? "..." : enrolled ? "LEAVE CLASS" : "SIGN UP"}
            </button>
            {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
        </div>
    );
} 