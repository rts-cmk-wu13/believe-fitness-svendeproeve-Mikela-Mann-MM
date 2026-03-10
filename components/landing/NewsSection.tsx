

import Image from "next/image";
import type { NewsItem } from "@/types";

interface NewsSectionProps {
    news: NewsItem[];
}

export default function NewsSection({ news }: NewsSectionProps) {
    if (news.length === 0) return <></>;

    return (
        <section className="content-wrapper py-6">
            <h2 className="text-2xl font-black mb-6 text-[var(--brand-yellow)]">
                News
            </h2>
            <div className="flex flex-col gap-8">
                {news.map((item) => (
                    <article key={item.id}>
                        <h3 className="text-xl font-bold leading-snug mb-3">
                            {item.title}
                        </h3>
                        {item.asset?.url && (
                            <div className="relative w-full h-48 mb-3 rounded-xl overflow-hidden">
                                <Image
                                    src={item.asset.url}
                                    alt={item.title}
                                    fill
                                    className="object-cover"
                                    sizes="100vw" /*eller 411px  */
                                />
                            </div>
                        )}
                        <p className="text-sm leading-relaxed text-[var(--grey-dark)]">
                            {item.text}
                        </p>
                        <hr className="mt-8 border-[var(--grey-border)]" />
                    </article>
                ))}
            </div>
        </section>
    );
}