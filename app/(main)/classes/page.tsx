

import Image from "next/image";
import Link from "next/link";
import { getClasses } from "@/lib/api/classes";
import ClassCarousel from "@/components/classes/ClassCarousel";
import { getRatings } from "@/lib/api/ratings";
import StarRating from "@/components/ui/StarRating";

function getAvgRating(ratings?: { rating: number }[]): number {
    if (!ratings || ratings.length === 0) return 5;
    return ratings.reduce((s, r) => s + r.rating, 0) / ratings.length;
}

export default async function ClassesPage() {
    const classes = await getClasses().catch(() => []);

 // Fetch ratings for alle klasser parallelt - ved mange klasser 100+ vil det overbelaste api'et
    const ratingsPerClass = await Promise.all(
        classes.map((c) => getRatings(c.id).catch(() => []))
    );
 
    const classesWithRatings = classes.map((c, i) => ({
        ...c,
        ratings: ratingsPerClass[i],
    }));

    const featuredIndex = classes.length
        ? Math.floor(Math.random() * classes.length)
        : 0;
    const featured = classesWithRatings[featuredIndex] ?? null;
    const rest = classesWithRatings.filter((_, i) => i !== featuredIndex);


    const featuredRating = getAvgRating(featured?.ratings);

    return (
        <main className="page-content" aria-label="Classes page">
            <div className="content-wrapper pt-4">
                <h1 className="text-2xl font-bold mb-6">Popular classes</h1>
            </div>

            {featured && (
                <>
                    <Link
                        href={`/classes/${featured.id}`}
                        className="block relative mx-6 mb-8 rounded-2xl overflow-hidden h-80"
                        aria-label={`View featured class: ${featured.className}`}
                    >
                        {(featured as any).asset?.url ? (
                            <Image
                                src={(featured as any).asset.url}
                                alt={`${featured.className} class cover image`}
                                fill
                                className="object-cover"
                                sizes="411px"
                                priority
                            />
                        ) : (
                            <div className="w-full h-full bg-(--grey-light)" aria-hidden="true" />
                        )}
                        <div className="absolute bottom-0 left-0 right-0 p-4 rounded-b-2xl bg-(--brand-yellow)"
                            aria-label={`${featured.className}, rated ${featuredRating.toFixed(1)} out of 5`}
                        >
                            <p className="font-bold text-sm">{featured.className}</p>
                            <StarRating rating={featuredRating} size="sm" />
                        </div>
                    </Link>

                    {rest.length > 0 && (
                        <section aria-label="Classes recommended for you">
                            <div className="content-wrapper mb-3">
                                <h2 className="text-xl font-bold">Classes for You</h2>
                            </div>
                            <div className="pl-6">
                                <ClassCarousel classes={rest as any} />
                            </div>
                        </section>
                    )}
                </>
            )}


        </main>
    );
}