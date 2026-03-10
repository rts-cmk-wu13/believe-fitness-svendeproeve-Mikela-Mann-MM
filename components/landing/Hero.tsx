
import Link from "next/link";
import { getSession } from "@/lib/session";

export default async function Hero() {
    const session = await getSession();

    return (
        <section className="relative content-wrapper py10 bg-(--white)">
            <h1 className="text-4xl font-black leading-tight mb-1 text-(--brand-yellow)">
                Welcome to <br />
                Believe Fitness
            </h1>
            <div className="flex gap-3 mt-6">
                <Link href="/classes" className="btn-primary w-auto px-6">
                    CLASSES
                </Link>
                {session ? (
                    <Link href="/profile" className="btn-primary w-auto px-6">
                        MY PROFILE
                    </Link>
                ) : (
                    <Link href="/login" className="btn-secondary w-auto px-6">
                        LOG IN
                    </Link>
                )}
            </div>
        </section>
    );
} 