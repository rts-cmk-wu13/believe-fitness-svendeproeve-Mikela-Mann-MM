

import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { getUserById } from "@/lib/api/users";
import MemberClassList from "@/components/profile/MemberClassList";
import InstructorClassList from "@/components/profile/InstructorClassList";
import { User } from "lucide-react";

export default async function ProfilePage() {
  const session = await getSession();
if (!session) redirect("/login");

const user = await getUserById(session.userId).catch(() => null);
if (!user) redirect("/login");

const isInstructor = session.role === "instructor" || session.role === "admin";

return (
  <main className="page-content content-wrapper pt-6"
aria-label="Profile page"
  >
  {/* Profile header */ }
  <section>
    <div className="flex items-center gap-4 mb-8">
      <div
        className="size-14 rounded-full flex items-center justify-center shrink-0 bg-(--brand-yellow)"
        aria-hidden="true"
      >
        <User size={28} color="#0A0A0A" strokeWidth={2} />
      </div>
      <div>
        <p className="font-bold text-lg" >
          {fullName}
        </p>
        <p
          className="text-sm capitalize text-(--grey-dark)"
          aria-label={`Role: ${roleLabel}`}
        >
          {roleLabel}
        </p>
      </div>
    </div>
      </section >

  {/* Class list*/ }
  < section aria - label={ isInstructor ? "Classes you instruct" : "Classes you are enrolled in" }>
    {
      isInstructor?(
          <InstructorClassList classes = {(user as any).classes ?? []} />
        ) : (
  <MemberClassList classes={(user as any).enrolledClasses ?? []} />
)}
      </section >

</main >


);

}