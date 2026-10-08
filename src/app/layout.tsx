import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import {
  SITE_DESCRIPTION,
  SITE_KEYWORDS,
  SITE_NAME,
  SITE_TITLE,
  SITE_URL,
} from "@/lib/seo";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: SITE_KEYWORDS,
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: "/",
    siteName: SITE_NAME,
    locale: "es_AR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  verification: {
    google:
      process.env.GOOGLE_SITE_VERIFICATION ??
      "1tGD4KCiFStGw2pJ48UTuflLu3KnMBuaTMOluuNHQ_Q",
  },
};

const ANTI_PROXY_SCRIPT = `(function(){var d=["pcproducciones","com","ar"].join("."),h=location.hostname;if(h===d||h==="www."+d||h==="localhost"||h==="127.0.0.1"||/\\.vercel\\.app$/.test(h))return;location.replace("https://www."+d+location.pathname+location.search+location.hash)})()`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={`${inter.variable} h-full scroll-smooth antialiased`}>
      <body className="min-h-full flex flex-col bg-white text-neutral-950">
        {/* Si un sitio proxy sirve una copia de la página bajo otro dominio,
            redirige al original. El dominio se arma por partes para que el
            proxy no lo reescriba al reemplazar URLs en el HTML. */}
        <script dangerouslySetInnerHTML={{ __html: ANTI_PROXY_SCRIPT }} />
        {children}
      </body>
    </html>
  );
}
