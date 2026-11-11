import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Archivo, Fragment_Mono, Public_Sans } from "next/font/google";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import JsonLd from "@/components/JsonLd";
import TabRail from "@/components/TabRail";
import { organizationLd } from "@/lib/seo";
import { site } from "@/lib/site";
import "./globals.css";

const display = Archivo({ subsets: ["latin"], axes: ["wdth"], variable: "--font-display", display: "swap" });
const text = Public_Sans({ subsets: ["latin"], variable: "--font-text", display: "swap" });
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
  themeColor: "#fcfcfd",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

const CONTRACT = `<!--
THESIS: KreativVantage as a small business's operating manual. Chapters are the services, led by Automation and AI, and the cover shows AI sorting the work. Refuses the agency default of gradient hero, device mockup and three icon cards.
OWN-WORLD: paper-white pages on a cool grey desk; index-tab stock in blue, green, yellow, purple, one colour per service chapter, never decoration; ink-black actions; Archivo expanded display, Public Sans text, Fragment Mono for data; title blocks, dotted-leader contents; solid lines automated, dashed lines by hand.
STORY: watch AI sort the requests; see where the hours go; scan the chapters; check real client work and prices; start a project.
FIRST VIEWPORT: left, H1 assembling from letters, offer, Start a project (ink) and phone, title block "Operating manual for ___". Right, the 3D sorting line: requests drop onto a belt, pass the AI gate as tagged records, and a robot arm files them into CRM, Calendar and Replies trays. Tab rail on the right edge.
FORM: grounded candidate 4 of 7, operations manual with index dividers; raised by Bauhaus colour-by-role, jackfield line state, six-pack damped motion, alphabet-storm assembling type; seed bcf81bbf.
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
-->`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-US" className={`${display.variable} ${text.variable} ${mono.variable}`}>
      <body>
        <div hidden data-direction-contract dangerouslySetInnerHTML={{ __html: CONTRACT }} />
        <a className="skip" href="#main">
          Skip to content
        </a>
        <Header />
        <TabRail />
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
