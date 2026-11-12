import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Archivo, Fragment_Mono } from "next/font/google";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import JsonLd from "@/components/JsonLd";
import { organizationLd } from "@/lib/seo";
import { site } from "@/lib/site";
import "./globals.css";

const display = Archivo({ subsets: ["latin"], variable: "--font-display", display: "swap" });
const mono = Fragment_Mono({ subsets: ["latin"], weight: "400", variable: "--font-mono", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Websites and automation for small businesses`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.name,
  formatDetection: { telephone: false, address: false, email: false },
  robots: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  openGraph: { siteName: site.name, locale: site.locale, type: "website" },
  twitter: { card: "summary_large_image" },
  category: "business",
};

export const viewport: Viewport = {
  themeColor: "#f3f4f6",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

const CONTRACT = `<!--
THESIS: KreativVantage as a small business's operating manual, set plainly. Services are numbered chapters, led by Automation and AI, and the cover shows AI sorting the work. Refuses the agency default of gradient hero, device mockup and three icon cards.
OWN-WORLD: a light cool grey page with darker desk bands and two hairlines down the container edges; Archivo at normal width for everything, Fragment Mono caps for labels; chapter colours (blue, green, lime, plum) only as small square markers; lime as the one accent for time saved; ink actions; 1px rules and flat bordered panels; solid lines automated, dashed lines by hand.
REFERENCES (2026-11-12): covingtonplacepartners.com, vanshajpoonia.com, explee.com, for the simplicity of their elements.
STORY: watch AI sort the requests; scan the four services; see where the hours go; check real client work and prices; start a project.
FIRST VIEWPORT: left, H1, offer, the hours-back line, Start a project (ink) and phone. Right, the 3D sorting line: requests pass the AI gate as tagged records and a robot arm files them into CRM, Calendar and Replies trays.
-->`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-US" className={`${display.variable} ${mono.variable}`}>
      <body>
        <div hidden data-direction-contract dangerouslySetInnerHTML={{ __html: CONTRACT }} />
        <a className="skip" href="#main">
          Skip to content
        </a>
        <Header />
        <main id="main" tabIndex={-1}>
          {children}
        </main>
        <Footer />
        <JsonLd data={organizationLd()} />
        <Analytics />
      </body>
    </html>
  );
}
