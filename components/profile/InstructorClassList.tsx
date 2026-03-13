

import Link from "next/link";
import InstructorClassCard from "./InstructorClassCard";
import type { FitnessClass, FitnessClassSummary } from "@/types";

interface Props {
  classes: FitnessClassSummary [];
}

export default function InstructorClassList({ classes }: Props) {
  
    return (
        <div>
            <div className="flex flex-col gap-6">
            <ul className="flex flex-col gap-4 mb-6">
                {classes.map((c) => (
            <InstructorClassCard key={c.id} fitnessClass={c} />
                ))}
            </ul>
            {/* ADD CLASS button - altid synlig for instruktører */}
            <Link href="/create-class" className="btn-primary">
                ADD CLASS
            </Link>
        </div>
        </div>
    );
  }