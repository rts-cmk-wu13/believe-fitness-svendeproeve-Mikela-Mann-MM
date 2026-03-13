

import Image from "next/image";
import type { NewsItem } from "@/types";

interface NewsSectionProps {
    news: NewsItem[];
}

export default function NewsSection({ news }: NewsSectionProps) {
    if (news.length === 0) return <></>;

    return (
        <section className="content-wrapper py-6">
            <h2 className="text-3xl font-black mb-6 text-(--brand-yellow)">
                News
            </h2>
            <div className="flex flex-col gap-8">
                {news.map((item) => (
                    <article key={item.id} className="group">
                        <h3 className="text-md font-bold leading-snug mb-3 pt-2 pb-3">
                            {item.title}
                        </h3>
                        {item.asset?.url && (
                            <div className="relative w-full h-48 mb-3 overflow-hidden">
                                <Image
                                    src={item.asset.url}
                                    alt={item.title}
                                    fill
                                    className="object-cover transition-transform duration-300 group-active:scale-[1.02]"
                                    sizes="100vw" 
                                />
                            </div>
                        )}
                        <p className="text-sm leading-relaxed text-(--grey-dark) pt-3">
                            {item.text}
                        </p>
                        
                    </article>
                ))}
            </div>
        </section>
    );
}