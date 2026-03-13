
import { getNews } from "@/lib/api/news";
import { getTestimonials } from "@/lib/api/testimonials";
import Hero from "@/components/landing/Hero";
import NewsSection from "@/components/landing/NewsSection";
import TestimonialsCarousel from "@/components/landing/TestimonialCarousel";
import ContactForm from "@/components/landing/ContactForm";
import Footer from "@/components/landing/Footer";
import NewsletterForm from "@/components/landing/NewsletterForm";

export default async function HomePage() {

    const [news, testimonials] = await Promise.all([
        getNews().catch((e) => { console.error("news:", e); return []; }),
        getTestimonials().catch((e) => { console.error("testimonials:", e); return []; }),
    ]);

    return (
        <main className="page-content">
            <Hero />
            <NewsSection news={news} />
            <div className="flex justify-center py-2">
                <div className="h-0.75 w-12 bg-(--grey-mid) rounded-full" />
            </div>
            <NewsletterForm />
            <TestimonialsCarousel testimonials={testimonials} />
            <ContactForm />
            <div className="flex justify-center py-2">
                <div className="h-0.75 w-12 bg-(--grey-mid) rounded-full" />
            </div>
            
            <Footer />
        </main>
    );
}