

"use client";

import { useState } from "react";
import Link from "next/link";
import ClassCarousel from "@/components/classes/ClassCarousel";
import { FitnessClassSummary, TrainerSummary, Rating } from "@/types";

interface Props {
  classes: (FitnessClassSummary & { asset?: { url: string }; ratings?: Rating[] })[];
  trainers: TrainerSummary[];
}

export default function SearchContent({
  
})
  return (
    <>
    /* Search bar */
    <div>
    </div>

    /* Popular classes  */

    /* Popular trainers */
    </>
  );
}