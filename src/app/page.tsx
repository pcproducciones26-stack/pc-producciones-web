import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { ArtistsMarquee } from "@/components/site/ArtistsMarquee";
import { EventsSection } from "@/components/site/EventsSection";
import { PastEventsSection } from "@/components/site/PastEventsSection";
import { FeaturedPastEventsSection } from "@/components/site/FeaturedPastEventsSection";
import { AboutSection } from "@/components/site/AboutSection";
import { InstagramFeed } from "@/components/site/InstagramFeed";
import { ContactSection } from "@/components/site/ContactSection";
import { Footer } from "@/components/site/Footer";
import { getSiteSettings } from "@/lib/site-settings";
import { prisma } from "@/lib/prisma";
import {
  SITE_ALTERNATE_NAMES,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
  SOCIAL_PROFILES,
  jsonLdScript,
} from "@/lib/seo";

export const dynamic = "force-dynamic";

export default async function Home() {
  const contactEmail = process.env.CONTACT_EMAIL_TO ?? "info@pcproducciones.com.ar";
  const {
    heroVideoUrl,
    heroTitle,
    heroSubtitle,
    heroCtaLabel,
    heroCtaUrl,
    marqueeArtists,
    aboutText,
    aboutAreas,
    featuredTitle,
    featuredSubtitle,
  } = await getSiteSettings();

  const upcomingEvents = await prisma.event.findMany({
    where: { status: "PUBLISHED", date: { gte: new Date() } },
    orderBy: { date: "asc" },
    take: 20,
  });

  const organization = {
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    alternateName: SITE_ALTERNATE_NAMES,
    url: SITE_URL,
    logo: `${SITE_URL}/logos/pc-negro.png`,
    description: SITE_DESCRIPTION,
    email: contactEmail,
    sameAs: SOCIAL_PROFILES,
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      organization,
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        name: SITE_NAME,
        alternateName: SITE_ALTERNATE_NAMES,
        url: SITE_URL,
        inLanguage: "es-AR",
        publisher: { "@id": `${SITE_URL}/#organization` },
      },
      ...upcomingEvents.map((event) => ({
        "@type": "Event",
        name: event.title,
        startDate: event.date.toISOString(),
        eventStatus: "https://schema.org/EventScheduled",
        eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
        location: { "@type": "Place", name: event.venue, address: event.venue },
        ...(event.imageUrl && { image: [event.imageUrl] }),
        description: event.description ?? `${event.title} — ${event.venue}`,
        organizer: { "@id": `${SITE_URL}/#organization` },
        offers: {
          "@type": "Offer",
          url: event.ticketUrl,
          availability: "https://schema.org/InStock",
        },
      })),
    ],
  };

  return (
    <div id="top" className="bg-neutral-950 text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(jsonLd)}
      />
      <Header />
      <main>
        <Hero
          videoUrl={heroVideoUrl}
          title={heroTitle}
          subtitle={heroSubtitle}
          ctaLabel={heroCtaLabel}
          ctaUrl={heroCtaUrl}
        />
        <ArtistsMarquee artists={marqueeArtists} />
        <EventsSection />
        <PastEventsSection />
        <FeaturedPastEventsSection
          title={featuredTitle}
          subtitle={featuredSubtitle}
        />
        <AboutSection text={aboutText} areas={aboutAreas} />
        <InstagramFeed />
        <ContactSection contactEmail={contactEmail} />
      </main>
      <Footer />
    </div>
  );
}
