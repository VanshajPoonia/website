// Local pages, one per area we target. Facts here are either about our own work
// (lib/work.ts) or plain geography checked on 2026-11-11. No invented clients,
// visits, offices or rankings. Each page says something only true of its area,
// so none of them reads as a copy of another with the town swapped.

import { builds, carePlans } from "./pricing";
import { site } from "./site";

export type Place = { name: string; type: "City" | "AdministrativeArea" };

export type Area = {
  slug: string;
  name: string;
  /** The name as it reads mid-sentence, when that differs ("the Metro East"). */
  where?: string;
  state: "Missouri" | "Illinois";
  /** Where it sits, for the page head and the areas index. */
  region: string;
  headline: string;
  lede: string;
  intro: string[];
  /** Towns and neighbourhoods this page covers. */
  places: string[];
  focus: { title: string; body: string; href: string }[];
  /** Case files to show, nearest first. */
  work: string[];
  workLine: string;
  faq: { q: string; a: string }[];
  metaTitle: string;
  metaDescription: string;
  /** For structured data. */
  served: Place[];
};

const [landing, website, store, portal] = builds;

const meetFaq = (where: string) => ({
  q: "Can we meet in person?",
  a: `Yes, if you prefer. We meet clients in person anywhere in ${site.inPerson}, including at your business in ${where}. Video calls work too. We go with whatever suits you.`,
});

const costFaq = {
  q: "What does a website cost?",
  a: `The same wherever you are. Landing pages start at ${landing.from}, business websites at ${website.from}, online stores at ${store.from} and portals at ${portal.from}. You get a fixed-scope proposal with the price before any work starts.`,
};

export const areas: Area[] = [
  {
    slug: "st-louis",
    name: "St. Louis",
    state: "Missouri",
    region: "St. Louis city and county, Missouri",
    headline: "Websites and automation for St. Louis businesses.",
    lede: "KreativVantage is based in St. Louis. Most of our clients are here, from a flooring showroom and a private club to a roofer in Imperial.",
    intro: [
      "We build websites, online stores and automations for small businesses across St. Louis city and county and Jefferson County. A cabinet and flooring store with dealer pricing, a members club with its own portal, a personal training studio, a contractor and a print shop are all on our work page.",
      "Local customers search on a phone and call the first business that looks right. So every site we build loads fast on a phone, says plainly what you do and where, and sends each request straight to you.",
      "If you work in more than one part of town, the site gets a page for each place you serve. That is how the ATLAS General Contracting site covers the towns it works in.",
    ],
    places: [
      "St. Louis city",
      "Clayton",
      "University City",
      "Richmond Heights",
      "Brentwood",
      "Maplewood",
      "Webster Groves",
      "Kirkwood",
      "Creve Coeur",
    ],
    focus: [
      {
        title: "Websites that bring in calls",
        body: "Phone-first pages with a call button, a page for each service, and quote forms that email and text you.",
        href: "/services/websites",
      },
      {
        title: "Online stores and portals",
        body: "Like the VIRO store in St. Louis: a full catalog, dealer pricing, online payments and an admin your staff can run.",
        href: "/services/online-stores-and-portals",
      },
      {
        title: "Automation and AI",
        body: "Leads, orders and bookings copied between your tools for you. AI drafts the replies and a person approves them.",
        href: "/services/automation-and-ai",
      },
    ],
    work: ["viro-design-and-finishes", "adventure-unknown", "atlas-general-contracting", "charla-wewers", "oddball-ink"],
    workLine: "Live projects for St. Louis area businesses.",
    faq: [
      {
        q: "Are you based in St. Louis?",
        a: "Yes. KreativVantage LLC is a Missouri company based in St. Louis. Most of our clients are in the St. Louis area, and we also work with businesses across the US.",
      },
      meetFaq("St. Louis"),
      costFaq,
      {
        q: "Can you help my business show up on Google Maps?",
        a: "We build the website side of it: fast pages, a page for each service and town, structured data, and the same name, phone and service area as your Google Business Profile. We can also tell you what to fix on the profile itself. We don't sell ongoing SEO campaigns or promise rankings.",
      },
      {
        q: "Do you only work with St. Louis businesses?",
        a: "No. We are based here, but we build for businesses anywhere in the US. One of our websites is for an HVAC company in Charlotte, North Carolina.",
      },
    ],
    metaTitle: "Web design and AI automation in St. Louis, MO",
    metaDescription: `St. Louis web design and automation for small businesses. Fast websites, online stores and AI automations from a St. Louis company. Websites from ${website.from}.`,
    served: [
      { name: "St. Louis", type: "City" },
      { name: "St. Louis County", type: "AdministrativeArea" },
    ],
  },
  {
    slug: "fenton",
    name: "Fenton",
    state: "Missouri",
    region: "St. Louis County, Missouri",
    headline: "Websites and automation for Fenton businesses.",
    lede: "Fenton sits between I-44, Highway 141, Gravois Road and the Meramec River. We build websites and automations for the shops, trades and service businesses around it.",
    intro: [
      "A Fenton business rarely serves Fenton alone. A contractor off Highway 141 gets calls from Valley Park, Arnold and High Ridge. A shop near Gravois Bluffs is one search away from the big-box stores next door.",
      "So your site has to say what you do, which towns you cover and how to reach you, in the first few seconds, on a phone. We build it that way. Then we connect the forms to your inbox, your phone or your CRM, so no request sits unread.",
      "We are based in St. Louis, and two of our projects are just south of Fenton: a roofer in Imperial and a print shop in Arnold.",
    ],
    places: ["Fenton", "Valley Park", "Sunset Hills", "Murphy", "High Ridge", "Arnold"],
    focus: [
      {
        title: "A page for each town you cover",
        body: "Service-area pages for Fenton and the towns around it, so a search in Valley Park or High Ridge finds you too.",
        href: "/services/websites",
      },
      {
        title: "Quote requests that reach you on the job",
        body: "Every form goes to your email and phone at once, tagged with the service and the town, and into your CRM if you use one.",
        href: "/services/automation-and-ai",
      },
      {
        title: "Care after launch",
        body: `Hosting, updates and small changes each month from the people who built it, from ${carePlans[0].price} a month.`,
        href: "/services/care-and-training",
      },
    ],
    work: ["atlas-general-contracting", "oddball-ink"],
    workLine: "Two projects a short drive south of Fenton.",
    faq: [
      {
        q: "Do you work with businesses in Fenton?",
        a: "Yes. We are based in St. Louis and build for businesses across St. Louis County and Jefferson County. It starts with a conversation about your business, then a fixed-scope proposal.",
      },
      meetFaq("Fenton"),
      {
        q: "Can my site show up in nearby towns too?",
        a: "Yes, for the towns you really work in. We build a page for each one with real details about your work there. The ATLAS General Contracting site in Imperial has pages like this for the towns it covers.",
      },
      costFaq,
    ],
    metaTitle: "Web design and automation in Fenton, MO",
    metaDescription: `Websites and automation for Fenton, MO businesses. Phone-first sites, service-area pages and quote forms that reach you fast. Based in St. Louis. Websites from ${website.from}.`,
    served: [{ name: "Fenton", type: "City" }],
  },
  {
    slug: "jefferson-county",
    name: "Jefferson County",
    state: "Missouri",
    region: "Jefferson County, Missouri",
    headline: "Websites and automation for Jefferson County businesses.",
    lede: "From Arnold and Imperial down to Festus and Hillsboro. Two of our clients are in Jefferson County already.",
    intro: [
      "ATLAS General Contracting in Imperial and Oddball Ink in Arnold both came to us for websites. ATLAS needed every quote request in front of the team fast, so its forms send email and text alerts and save each lead. Oddball Ink had a one-of-a-kind identity that its old site hid.",
      "Jefferson County businesses cover a lot of ground. A contractor in Imperial can work in Arnold, Festus and south St. Louis County in the same week. Each of those is its own search, so each one gets its own page on the site.",
    ],
    places: [
      "Arnold",
      "Imperial",
      "Barnhart",
      "Festus",
      "Crystal City",
      "Herculaneum",
      "Pevely",
      "Hillsboro",
      "De Soto",
      "High Ridge",
      "House Springs",
      "Byrnes Mill",
      "Cedar Hill",
      "Murphy",
    ],
    focus: [
      {
        title: "Service and town pages",
        body: "A page for each service and each town you cover, built like the ATLAS site, with a call button on every one.",
        href: "/services/websites",
      },
      {
        title: "Leads that land everywhere at once",
        body: "Form requests go to email and text at the same moment and get saved, so a lead never depends on one inbox.",
        href: "/services/automation-and-ai",
      },
      {
        title: "A site that shows your real work",
        body: "A gallery of real jobs, sorted by type, like the one we built for Oddball Ink.",
        href: "/services/websites",
      },
    ],
    work: ["atlas-general-contracting", "oddball-ink"],
    workLine: "Our Jefferson County clients.",
    faq: [
      {
        q: "Have you worked with Jefferson County businesses?",
        a: "Yes. ATLAS General Contracting in Imperial and Oddball Ink in Arnold. Both projects are on our work page with what we built.",
      },
      meetFaq("Jefferson County"),
      {
        q: "Can you build pages for each town I serve?",
        a: "Yes. A town page works when it has something real to say about your work there. We help you write them, and we don't make pages for places you don't serve.",
      },
      costFaq,
    ],
    metaTitle: "Web design and automation in Jefferson County, MO",
    metaDescription: `Websites and automation for businesses in Arnold, Imperial, Festus, Hillsboro and the rest of Jefferson County, MO. Clients in Imperial and Arnold. Websites from ${website.from}.`,
    served: [
      { name: "Jefferson County", type: "AdministrativeArea" },
      { name: "Arnold", type: "City" },
      { name: "Imperial", type: "City" },
      { name: "Festus", type: "City" },
      { name: "Hillsboro", type: "City" },
      { name: "High Ridge", type: "City" },
    ],
  },
  {
    slug: "south-county",
    name: "South County",
    state: "Missouri",
    region: "South St. Louis County, Missouri",
    headline: "Websites and automation for South County businesses.",
    lede: "Oakville, Mehlville, Affton, Crestwood, Sunset Hills and the rest of South St. Louis County. Sites and automations for the businesses along Lindbergh, Gravois, Tesson Ferry and Lemay Ferry.",
    intro: [
      "South County is full of small businesses: contractors, salons, gyms, restaurants, auto shops and family retail. Many of their new customers find them with a quick search on a phone.",
      "We build sites that load fast, put the phone number and the main services up front, and send every form to you right away. If you serve both sides of the Meramec, the site can have pages for the Jefferson County towns too.",
    ],
    places: ["Oakville", "Mehlville", "Affton", "Lemay", "Concord", "Sappington", "Green Park", "Crestwood", "Sunset Hills"],
    focus: [
      {
        title: "Phone-first websites",
        body: "Designed and tested at phone size first, with click-to-call, maps and booking links where they help.",
        href: "/services/websites",
      },
      {
        title: "Booking without phone tag",
        body: "Online booking tied to your calendar, like the booking on the Charla Wewers studio site.",
        href: "/services/websites",
      },
      {
        title: "Point of sale and CRM in step",
        body: "For restaurants and shops, sales and customer lists kept in sync, like the Toast to HubSpot sync in our work.",
        href: "/services/automation-and-ai",
      },
    ],
    work: ["oddball-ink", "charla-wewers", "atlas-general-contracting"],
    workLine: "Work just across the Meramec and around St. Louis.",
    faq: [
      {
        q: "Which parts of South County do you cover?",
        a: "All of it, including Oakville, Mehlville, Affton, Lemay, Concord, Sappington, Crestwood and Sunset Hills. We are based in St. Louis.",
      },
      meetFaq("South County"),
      {
        q: "I already have a website. Can you redesign it?",
        a: "Yes. Our Oddball Ink project in Arnold is a redesign. We keep what works, bring forward what customers were looking for, and move your content across.",
      },
      costFaq,
    ],
    metaTitle: "Web design and automation in South St. Louis County",
    metaDescription: `Websites and automation for South County businesses in Oakville, Mehlville, Affton, Crestwood and Sunset Hills. Based in St. Louis. Websites from ${website.from}.`,
    served: [
      { name: "Oakville", type: "City" },
      { name: "Mehlville", type: "City" },
      { name: "Affton", type: "City" },
      { name: "Crestwood", type: "City" },
      { name: "Sunset Hills", type: "City" },
    ],
  },
  {
    slug: "west-county",
    name: "West County",
    state: "Missouri",
    region: "West St. Louis County, Missouri",
    headline: "Websites and automation for West County businesses.",
    lede: "Chesterfield, Ballwin, Manchester, Des Peres, Valley Park and the rest of West St. Louis County. Sites, stores and automations for the businesses along I-64 and Manchester Road.",
    intro: [
      "When customers have plenty of choice, they compare. They open a few sites, look at the work, and call the one that makes it easiest.",
      "We build sites that show real work, load fast and make the next step obvious. For retailers and wholesalers we build online stores with dealer accounts and tiered pricing, like the VIRO store in St. Louis.",
    ],
    places: ["Chesterfield", "Ballwin", "Manchester", "Des Peres", "Town and Country", "Ellisville", "Wildwood", "Valley Park", "Eureka"],
    focus: [
      {
        title: "A site that looks the part",
        body: "Designed around your business with no themes, then tested on real phones before launch.",
        href: "/services/websites",
      },
      {
        title: "Stores and member portals",
        body: "Online stores with dealer pricing, or member portals with bookings and events, like the ones we built for VIRO and Adventure Unknown.",
        href: "/services/online-stores-and-portals",
      },
      {
        title: "AI that drafts, people who approve",
        body: "AI that sorts requests and drafts replies, with a person approving before anything goes out.",
        href: "/services/automation-and-ai",
      },
    ],
    work: ["viro-design-and-finishes", "adventure-unknown"],
    workLine: "Stores and portals we have built in St. Louis.",
    faq: [
      {
        q: "Do you work with businesses in Chesterfield and Ballwin?",
        a: "Yes. We are based in St. Louis and build for businesses across West County, including Chesterfield, Ballwin, Manchester, Des Peres, Town and Country and Wildwood.",
      },
      meetFaq("West County"),
      {
        q: "Can you build an online store with dealer or wholesale pricing?",
        a: `Yes. The VIRO store has dealer sign-up, staff approval, pricing tiers and per-dealer overrides. Online stores start at ${store.from} and portals at ${portal.from}.`,
      },
      {
        q: "Will I own the site?",
        a: "Yes. Once the project is paid, the custom code is yours, with documentation. You can stay with us, hire another developer or use AI coding tools.",
      },
    ],
    metaTitle: "Web design and automation in West St. Louis County",
    metaDescription:
      "Websites, online stores and automation for West County businesses in Chesterfield, Ballwin, Manchester, Des Peres and Wildwood. Based in St. Louis.",
    served: [
      { name: "Chesterfield", type: "City" },
      { name: "Ballwin", type: "City" },
      { name: "Manchester", type: "City" },
      { name: "Des Peres", type: "City" },
      { name: "Wildwood", type: "City" },
    ],
  },
  {
    slug: "metro-east",
    name: "Metro East",
    where: "the Metro East",
    state: "Illinois",
    region: "Madison, St. Clair and Monroe counties, Illinois",
    headline: "Websites and automation for Metro East businesses.",
    lede: "Belleville, O'Fallon, Edwardsville, Collinsville, Alton and the rest of the Illinois side of the St. Louis area. We are just across the river, and we meet clients in person.",
    intro: [
      "A lot of Metro East businesses work both sides of the Mississippi. A contractor in Collinsville can take a job in Belleville in the morning and one in St. Louis in the afternoon.",
      "So the site needs a page for each place you really serve, in Illinois and Missouri, and forms that reach you wherever you are. We build it that way, then connect it to your inbox, your phone and your CRM.",
      "We are based in St. Louis, and our nearest projects are just across the river.",
    ],
    places: [
      "Belleville",
      "O'Fallon",
      "Fairview Heights",
      "Shiloh",
      "Swansea",
      "Mascoutah",
      "Collinsville",
      "Edwardsville",
      "Glen Carbon",
      "Maryville",
      "Troy",
      "Granite City",
      "Alton",
      "Godfrey",
      "Wood River",
      "Columbia",
      "Waterloo",
    ],
    focus: [
      {
        title: "Pages for both sides of the river",
        body: "A page for each Illinois and Missouri town you really work in, so a search in Belleville or in South County finds you.",
        href: "/services/websites",
      },
      {
        title: "Requests that reach you anywhere",
        body: "Quote and booking requests sent to email and text together, and saved, so nothing waits until you are back at the office.",
        href: "/services/automation-and-ai",
      },
      {
        title: "Online stores and portals",
        body: "Online stores with dealer pricing, or member portals with bookings, like the ones we built for VIRO and Adventure Unknown in St. Louis.",
        href: "/services/online-stores-and-portals",
      },
    ],
    work: ["viro-design-and-finishes", "adventure-unknown", "charla-wewers"],
    workLine: "Our nearest work, just across the river in St. Louis.",
    faq: [
      {
        q: "Do you work with Illinois businesses?",
        a: "Yes. We are based in St. Louis and work with businesses across the Metro East, including Belleville, O'Fallon, Edwardsville, Collinsville, Alton and Granite City.",
      },
      meetFaq("the Metro East"),
      {
        q: "Can my site cover towns in both Illinois and Missouri?",
        a: "Yes, for the places you really serve. Each town page should say something true about your work there. We don't make pages for places you don't serve.",
      },
      costFaq,
    ],
    metaTitle: "Web design and automation in the Metro East, IL",
    metaDescription: `Websites and automation for Metro East businesses in Belleville, O'Fallon, Edwardsville, Collinsville and Alton, IL. In person or by video. Websites from ${website.from}.`,
    served: [
      { name: "Madison County", type: "AdministrativeArea" },
      { name: "St. Clair County", type: "AdministrativeArea" },
      { name: "Belleville", type: "City" },
      { name: "O'Fallon", type: "City" },
      { name: "Edwardsville", type: "City" },
      { name: "Collinsville", type: "City" },
      { name: "Alton", type: "City" },
    ],
  },
  {
    slug: "central-and-southern-illinois",
    name: "Central and Southern Illinois",
    state: "Illinois",
    region: "Within about 100 miles of St. Louis, Illinois",
    headline: "Websites and automation for central and southern Illinois.",
    lede: "Springfield, Mount Vernon, Centralia, Effingham, Carbondale and the towns in between, all within about 100 miles of St. Louis. We come to you, or we meet on video.",
    intro: [
      "In smaller towns, plenty of businesses still run on word of mouth and an old website. A fast, clear site with a way to call, book or ask for a quote is often enough to stand out.",
      "We build for businesses across this part of Illinois from St. Louis. The project can run on calls, video and a private preview link, and we can drive out to meet you when that helps.",
    ],
    places: [
      "Springfield",
      "Jacksonville",
      "Litchfield",
      "Carlinville",
      "Highland",
      "Effingham",
      "Vandalia",
      "Centralia",
      "Salem",
      "Mount Vernon",
      "Sparta",
      "Chester",
      "Carbondale",
    ],
    focus: [
      {
        title: "A site that stands out locally",
        body: "Custom design built for phones first, with your services, the towns you cover and your phone number up front.",
        href: "/services/websites",
      },
      {
        title: "Booking and quote requests",
        body: "Booking tied to your calendar, and quote forms that email and text you the moment they come in.",
        href: "/services/websites",
      },
      {
        title: "Care from the people who built it",
        body: `Hosting, updates and small changes each month, from ${carePlans[0].price} a month, with a direct line to the people who built your site.`,
        href: "/services/care-and-training",
      },
    ],
    work: ["atlas-general-contracting", "charla-wewers"],
    workLine: "Work from around St. Louis.",
    faq: [
      {
        q: "Do you work with businesses this far from St. Louis?",
        a: "Yes. We work with businesses across Illinois within about 100 miles of St. Louis, from Springfield down to Carbondale, and with businesses across the Midwest and the rest of the US by video.",
      },
      meetFaq("central or southern Illinois"),
      {
        q: "Is a small site enough for a small-town business?",
        a: `Often, yes. A landing page from ${landing.from} gives you one strong page with a form that emails and texts you. A business website from ${website.from} adds a page for each service and each town you serve.`,
      },
    ],
    metaTitle: "Web design and automation in central and southern Illinois",
    metaDescription: `Websites and automation for businesses in Springfield, Mount Vernon, Centralia, Effingham and Carbondale, IL, within about 100 miles of St. Louis. From ${landing.from}.`,
    served: [
      { name: "Springfield", type: "City" },
      { name: "Mount Vernon", type: "City" },
      { name: "Centralia", type: "City" },
      { name: "Effingham", type: "City" },
      { name: "Carbondale", type: "City" },
    ],
  },
];

/** How an area reads mid-sentence. */
export function whereOf(a: Area) {
  return a.where ?? a.name;
}

export function getArea(slug: string) {
  return areas.find((a) => a.slug === slug);
}
