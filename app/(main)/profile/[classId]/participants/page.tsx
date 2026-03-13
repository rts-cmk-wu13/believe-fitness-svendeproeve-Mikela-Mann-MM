

import { redirect, notFound } from "next/navigation";
import { getSession } from "@/lib/session";
import { getClassesById } from "@/lib/api/classes";
import { User } from "lucide-react";

interface Props {
  params: Promise<{ classId: string }>;
}

export default async function ParticipantsPage({ params }: Props) {
  const session = await getSession();
  if (!session) redirect("/login");
  if (session.role !== "instructor" && session.role !== "admin") {
    redirect("/profile");
  }

  const { classId } = await params;
  const fitnessClass = await getClassesById(classId).catch(() => null);
  if (!fitnessClass) notFound();

  const participants = fitnessClass.users ?? [];

  return (
    <main className="page-content content-wrapper pt-6" aria-label="Participants page">
      {/* Instructor header */}
      <div className="flex items-center gap-4 mb-8 pb-8" aria-label="Instructor info">
        <div
          className="w-14 h-14 rounded-full flex items-center justify-center shrink-0 bg-(--brand-yellow)"
          aria-hidden="true"
        >
          <User size={28} color="#0A0A0A" fill="#0A0A0A" aria-hidden="true" />
        </div>
        <div>
          <p className="font-bold text-lg">{fitnessClass.trainer?.trainerName ?? "Instructor"}</p>
          <p className="text-sm text-(--grey-dark)">{fitnessClass.className}</p>
        </div>
      </div>

      <h2 className="text-2xl font-bold mb-2 pb-2">{fitnessClass.className}</h2>

      <p className="font-bold text-sm mb-6 pb-5">
        Participants:{" "}
      </p>
      {participants.length === 0 ? (
        <p className="text-sm text-(--grey-mid)" role="status">
          No participants signed up yet.
        </p>
      ) : (
        <ul
          className="flex flex-col gap-3"
          aria-label={`Participants in ${fitnessClass.className}`}
        >
          {participants.map((user) => (
            <li
              key={user.id}
              className="flex items-center justify-between px-5 py-4 rounded-full border-[1.5px] border-(--brand-black)"
            >
              <div className="flex items-center gap-3">
                <User size={20} fill="#0A0A0A" color="var(--brand-black)" aria-hidden="true" />
                <span className="font-medium">
                  {user.userFirstName} {user.userLastName}
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}

    </main>

  );
}