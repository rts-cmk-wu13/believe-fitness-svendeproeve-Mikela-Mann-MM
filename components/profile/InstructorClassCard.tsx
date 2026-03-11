

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Pencil, Trash2 } from "lucide-react";
import { deleteClassAction } from "@/lib/actions"
import { reportError } from "@/lib/reportError"; 
import type { FitnessClassSummary } from "@/types";

interface Props {
  fitnessClass: FitnessClassSummary & { users?: { id: number }[] };
}

export default function InstructorClassCard({ fitnessClass }: Props) {
  const router = useRouter();
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");

  const handleDelete = async () => {
    if (!confirmDelete) {
      setConfirmDelete(true);
      return;
    }

    setDeleting(true);
    setError("");

    try {
      const result = await deleteClassAction(fitnessClass.id);
      if (result.error) {
        setError(result.error);
        setConfirmDelete(false);
      } else {
        router.refresh();
      }
    } catch (err) {
      reportError(err, "InstructorClassCard");
      setError("Could not delete class. Please try again.");
      setConfirmDelete(false)
    } finally {
      setDeleting(false);
    }
  }; 


  return (
    <li className="profile-card">
          <p className="text-xl font-bold mb-1">{fitnessClass.className}</p>
          <p className="text-sm mb-2 text-(--grey-dark)">
            {fitnessClass.classDay} {fitnessClass.classTime}
          </p>

          <div className="flex justify-between mb-4">
            <p className="text-sm">
              Max participants: {" "} 
              <span className="font-medium">{fitnessClass.maxParticipants}</span>
            </p>
            <p className="text-sm">
              Joined: {" "} 
              <span className="font-medium">{fitnessClass.users?.length ?? 0}</span>
            </p>
          </div>

          <div className="flex items-center justify-between">
            <Link
              href={`/profile/${fitnessClass.id}/participants`}
              className="btn-primary shrink-0 w-auto px-5"
            >
              PARTICIPANTS
            </Link>
            <div className="flex gap-2">
              <Link
                href={`/create-class?edit=${fitnessClass.id}`}
                className="w-10 h-10 rounded-full flex items-center justify-center bg-(--brand-yellow)"
                aria-label="Edit class"
              >
                <Pencil size={16} />
              </Link>
              <button
                type="button"
                onClick={handleDelete}
                disabled={deleting}
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                  confirmDelete ? "bg-red-600" : "bg-(--brand-yellow)"
                }`}
                aria-label={confirmDelete ? "Confirm delete class" : "Delete class"}
                title={confirmDelete ? "Click again to confirm deletion" : "Delete class"}
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>

          {confirmDelete && (
            <p className="text-red-600 text-xs mt-2">
              Click the bin again to confirm deletion.
            </p>
          )}
          {error && (
            <p className="text-(--error) text-xs mt-2">
              {error}
            </p>
          )}
        </li>
  );
} 