

import MemberClassCard from "./MemberClassCard";
import type { FitnessClassSummary } from "@/types";

interface Props {
  classes: FitnessClassSummary[];
}

export default function MemberClassList({ classes }: Props) {
  if (classes.length === 0) {
    return (
      <p className="text-sm" style={{ color: "var(--grey-mid)" }}>
        You are not signed up for any classes yet.
      </p>
    );
  }

  return (
    <ul className="flex flex-col gap-4">
      {classes.map((c) => (
        <MemberClassCard key={c.id} fitnessClass={c} />
      ))}
    </ul>
  );
}