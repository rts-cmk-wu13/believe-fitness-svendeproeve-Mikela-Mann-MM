

import Image from "next/image";
import { notFound } from "next/navigation";
import { getClassesById } from "@/lib/api/classes"
import { getSession } from "@/lib/session";
import RateButton from "@/components/classes/Ratebutton";
import StarRating from "@/components/ui/Starrating";
import EnrollButton from "@/components/classes/EnrollButton";

interface Props {
    params: Promise<{ id: string }>;
}

function getAvgRating(ratings?: { rating: number }[]): number {
    if (!ratings || ratings.length === 0) return 0;
    return ratings.reduce((s, r) => s + r.rating, 0) / ratings.length;
}

export default async function ClassesDetailPage({ params }: Props) {
    const { id } = await params;
    const fitnessClass = await getClassesById(id).catch(() => null);
    if (!fitnessClass) notFound();

    const session = await getSession();
    const avgRating = getAvgRating(fitnessClass.ratings);
    const isEnrolled =
        session &&
        fitnessClass.users?.some((u) => u.id === session.userId) === true;

// Max-deltagere nået?
    const isFull =
        fitnessClass.maxParticipants !== undefined &&
        (fitnessClass.users?.length ?? 0) >= fitnessClass.maxParticipants;

    return (
        <main className="page-content" id="main-content">
            {/* Hero */}

            <div className="relative h-[55vw] max-h-88"
                aria-label={`Hero image for ${fitnessClass.className}`}
            >
                {fitnessClass.asset?.url ? (
                    <Image
                        src={fitnessClass.asset.url}
                        alt={`${fitnessClass.className} class`}
                        fill
                        className="object-cover"
                        sizes="411px"
                        priority
                    />
                ) : (
                    <div className="w-full h-full bg-(--grey-light)"
                        role="img"
                        aria-label="No label available"
                    />
                )}

                {/* Title + rating */}
                <div
                    className="absolute inset-0 flex flex-col justify-end p-5 bg-[linear-gradient(to_top,rgba(80,80,80,0.9)_0%,transparent_50%)]"
                    >
                    <h1 className="text-4xl font-black leading-tight mb-3 text-(--brand-yellow)">{fitnessClass.className}
                    </h1>

                    <div className="flex items-center justify-between">
                        <div
                            className="flex items-center gap-2"
                            role="group"
                            aria-label={`Average rating: ${avgRating.toFixed(1)} out of 5`}
                        >

                            <StarRating rating={avgRating} />
                            <span
                                className="text-sm font-medium text-(--brand-yellow)"
                                aria-hidden="true"
                            >
                                {avgRating.toFixed(1)}/5
                            </span>
                        </div>

                        {session && (
                            <RateButton
                                classId={fitnessClass.id}
                                userId={session.userId}
                                className={fitnessClass.className}
                                aria-label={`Rate ${fitnessClass.className}`}
                            />
                        )}
                    </div>
                </div>
            </div>

            {/*   Detaljer  */}

            <div className="content-wrapper pt-6">
                <p
                    className="font-medium mb-4"
                    aria-label={`Schedule: ${fitnessClass.classDay} at ${fitnessClass.classTime}`}
                >
                    {fitnessClass.classDay} – {fitnessClass.classTime}
                </p>

                {/* Træner */}
                {fitnessClass.trainer && (
                    <section className="mb-10" aria-labelledby="trainer-heading">
                        <h2 id="trainer-heading" className="text-xl font-bold mb-4">
                            Trainer
                        </h2>
                        <p className="text-center font-bold" aria-label={`Trainer: ${fitnessClass.trainer.trainerName}`}>
                            {fitnessClass.trainer.trainerName}
                        </p>
                    </section>
                )}

                {/* Enroll / login */}
                {session ? (
                    <EnrollButton
                        classId={fitnessClass.id}
                        initialEnrolled={isEnrolled ?? false}
                    />
                ) : (

                    <a href="/login"
                        className="btn-primary"
                        aria-label={`Log in to sign up for ${fitnessClass.className}`}
                    >
                        LOG IN TO SIGN UP
                    </a>
                )}
            </div>

        </main>
    );
}