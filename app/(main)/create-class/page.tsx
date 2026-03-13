

import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { getClassesById } from "@/lib/api/classes";
import { getTrainers } from "@/lib/api/trainers";
import CreateClassForm from "@/components/classes/CreateClassForm";

interface Props {
    searchParams: Promise<{ edit?: string }>;
}

export default async function CreateClassPage({ searchParams }: Props) {
    const session = await getSession();
    if (!session) redirect("/login");
    if (session.role !== "instructor" && session.role !== "admin") {
        redirect("/profile");
    }

    const { edit } = await searchParams;
    const trainers = await getTrainers().catch(() => []);

    const existingClass = edit
        ? await getClassesById(edit).catch(() => null)
        : null;

    return (
            <main className="content-wrapper page-content pt-8">
            <h1 className="text-md font-black mb-6 pb-6">
    {existingClass ? "Edit class" : "Create a new class"}
</h1>

            <CreateClassForm
                trainers={trainers}
                existingClass={existingClass ?? undefined}
            />

        </main>

    );
}