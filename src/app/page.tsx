import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { ArtistsMarquee } from "@/components/site/ArtistsMarquee";
import { EventsSection } from "@/components/site/EventsSection";
import { PastEventsSection } from "@/components/site/PastEventsSection";
import { AboutSection } from "@/components/site/AboutSection";
import { InstagramFeed } from "@/components/site/InstagramFeed";
import { ContactSection } from "@/components/site/ContactSection";
import { Footer } from "@/components/site/Footer";
import { getSiteSettings } from "@/lib/site-settings";

export const dynamic = "force-dynamic";

export default async function Home() {
  const contactEmail = process.env.CONTACT_EMAIL_TO ?? "info@pcproducciones.com.ar";
  const whatsappNumber = process.env.WHATSAPP_NUMBER ?? "";
  const { heroVideoUrl, marqueeArtists } = await getSiteSettings();

  return (
    <div id="top">
      <Header />
      <main>
        <Hero videoUrl={heroVideoUrl} />
        <ArtistsMarquee artists={marqueeArtists} />
        <EventsSection />
        <PastEventsSection />
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
