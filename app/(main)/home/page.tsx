
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

    /*   console.log();  */

    return (
        <main className="page-content">
            <Hero />
            <NewsSection news={news} />
            <NewsletterForm />
            <TestimonialsCarousel testimonials={testimonials} />
                <ContactForm />
                <Footer />
            </main>
  );
}