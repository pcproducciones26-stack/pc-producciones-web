import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "PC Producciones | Experiencias en vivo",
  description:
    "PC es una productora especializada en el desarrollo de experiencias en vivo: shows, festivales y eventos corporativos.",
  openGraph: {
    title: "PC Producciones",
    description:
      "Productora especializada en el desarrollo de experiencias en vivo.",
    url: siteUrl,
    siteName: "PC Producciones",
    locale: "es_AR",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={`${inter.variable} h-full scroll-smooth antialiased`}>
      <body className="min-h-full flex flex-col bg-white text-neutral-950">
        {children}
      </body>
    </html>
  );
}
