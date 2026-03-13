



"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { leaveAction } from "@/lib/actions"
import { reportError } from "@/lib/reportError"; 
import type { FitnessClassSummary } from "@/types";

interface Props {
  fitnessClass: FitnessClassSummary;
}

export default function MemberClassCard({ fitnessClass }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState("");

  const handleLeave = async () => {
    setLoading(true);
    setError("");

    try {
      const result = await leaveAction(fitnessClass.id);
      if (result.error) {
        setError(result.error);
      } else {
        router.refresh();
      }
    } catch (err) {
      reportError(err, "MemberClassCard");
      setError("Could not leave class. Please try again.");
    } finally {
      setLoading(false);
    }
  }; 

  return (
    <li className="profile-card">
          <p className="text-lg font-bold mb-1">{fitnessClass.className}</p>
          <p className="text-sm mb-2 text-(--grey-dark) pt-4">
            {fitnessClass.classDay} {fitnessClass.classTime}
          </p>

          <div className="flex gap-3 pt-4">
            <Link
              href={`/classes/${fitnessClass.id}`}
              className="btn-primary flex-1 text-center"
            >
              SHOW CLASS
            </Link>
            <button
              type="button"
              onClick={handleLeave}
              disabled={loading}
              className="btn-primary flex-1 disabled:opacity-50"
              aria-label="Leave class"
            >
              {loading ? "LEAVING..." : "LEAVE"}
            </button>
          </div>

          {error && (
            <p className="text-(--error) text-xs mt-2">
              {error}
            </p>
          )}
        </li>
  );
} 