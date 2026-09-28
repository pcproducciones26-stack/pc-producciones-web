import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { ArtistsMarquee } from "@/components/site/ArtistsMarquee";
import { EventsSection } from "@/components/site/EventsSection";
import { PastShowsSection } from "@/components/site/PastShowsSection";
import { AboutSection } from "@/components/site/AboutSection";
import { InstagramFeed } from "@/components/site/InstagramFeed";
import { ContactSection } from "@/components/site/ContactSection";
import { Footer } from "@/components/site/Footer";

export default function Home() {
  const contactEmail = process.env.CONTACT_EMAIL_TO ?? "hola@pcproducciones.com.ar";
  const whatsappNumber = process.env.WHATSAPP_NUMBER ?? "";

  return (
    <div id="top">
      <Header />
      <main>
        <Hero />
        <ArtistsMarquee />
        <EventsSection />
        <PastShowsSection />
        <AboutSection />
        <InstagramFeed />
        <ContactSection
          contactEmail={contactEmail}
          whatsappNumber={whatsappNumber}
        />
      </main>
      <Footer />
    </div>
  );
}
