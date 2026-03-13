

import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { getUserById } from "@/lib/api/users";
import MemberClassList from "@/components/profile/MemberClassList";
import InstructorClassList from "@/components/profile/InstructorClassList";
import { getClassesById } from "@/lib/api/classes";
import { User } from "lucide-react";
import type { FitnessClass } from "@/types";

export default async function ProfilePage() {
  const session = await getSession();
if (!session) redirect("/login");

const user = await getUserById(session.userId, session.token).catch(() => null);
if (!user) redirect("/login");

const isInstructor = session.role === "instructor" || session.role === "admin";

const classes = isInstructor
  ? await Promise.all(
      (user.classes ?? []).map((c) =>
        getClassesById(String(c.id)).catch(() => c)
      )
    ) as FitnessClass[]
  : user.classes ?? [];

  console.log("classes:", JSON.stringify(classes, null, 2));

return (
  <main className="page-content page-content content-wrapper overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]content-wrapper pt-8"
aria-label="Profile page"
  >
  {/* Profile header */ }
  <section>
    <div className="flex items-center gap-4 mb-8 pb-8">
      <div
        className="size-14 rounded-full flex items-center justify-center shrink-0 bg-(--brand-yellow)"
        aria-hidden="true"
      >
        <User size={28} color="#0A0A0A" fill="#0A0A0A" strokeWidth={2} />
      </div>
      <div>
        <p className="font-bold text-lg" >
          {user.userFirstName} {user.userLastName}
        </p>
        <p className="text-sm capitalize text-(--grey-dark)">
          {isInstructor ? "Instructor" : "Member"}
        </p>
      </div>
    </div>
      </section >

  {/* Class list*/ }
  <section>
    {
      isInstructor?(
          <InstructorClassList classes = {classes} />
        ) : (
  <MemberClassList classes={classes} />
)}
      </section >

</main >


);

}