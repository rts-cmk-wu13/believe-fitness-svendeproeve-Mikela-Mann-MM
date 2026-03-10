
/* import { getNews } from "@/lib/api";
import { getTestimonials } from "@/lib/api";
import Hero from "../components/landing/Hero";
import NewsSection from "../components/landing/NewsSection"; 
import NewsletterForm from "@/components/landing/NewsletterForm"; 
import TestimonialsCarousel from "@/components/landing/TestimonialCarousel";
import ContactForm from "@/components/landing/ContactForm";  
import Footer from "../components/landing/Footer";
 */
export default async function HomePage() {
/*   const [news, testimonials] = await Promise.all([
    getNews().catch(() => []), // Hvis hentning af nyheder fejler, returner en tom array    
    getTestimonials().catch(() => []), // Hvis hentning af testimonials fejler, returner en tom array
  ]); */

/*   console.log();  */
  
  return (
      <main className="page-content">
        <h1>Forside</h1>
        {/* <Hero /> */}
      {/*   <NewsSection news={news} /> */}
     {/*    <NewsletterForm /> */}
      {/*   <TestimonialsCarousel testimonials={testimonials} > */}
     {/*    <ContactForm />  */}
      {/*   <Footer /> */}
      </main>
  );
}