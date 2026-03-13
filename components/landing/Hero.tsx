
import Link from "next/link";
import { getSession } from "@/lib/session";

export default async function Hero() {
    const session = await getSession();

    return (
        <section className="relative content-wrapper min-h-[280px] pt-24 pb-10 bg-[url('/images/welcome-center.jpg')] bg-cover bg-center bg-no-repeat">
            <div className="absolute inset-0 bg-black/50" />
            <div className="relative z-10">
            <h1 className="text-4xl font-black leading-tight mb-1 text-(--brand-yellow)">
                Welcome to <br />
                Believe Fitness
            </h1>
            <div className="flex gap-3 mt-6 pt-4">
                <Link href="/classes" className="btn-primary btn-primary--sm">
                    CLASSES
                </Link>
                {session ? (
                    <Link href="/profile" className="btn-primary btn-primary--sm">
                        MY PROFILE
                    </Link>
                ) : (
                    <Link href="/login" className="btn-primary btn-primary--sm">
                        LOG IN
                    </Link>
                )}
                </div>
            </div>
        </section>
    );
} 