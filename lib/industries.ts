// Industry pages. Each one is backed by real work in lib/work.ts and says only
// what that work shows, or what a service plainly includes (lib/services.ts,
// lib/pricing.ts). No invented clients, results or quotes.

import { automation, builds, carePlans } from "./pricing";

export type Industry = {
  slug: string;
  name: string;
  /** Who the page is for, shown as tags. */
  who: string[];
  headline: string;
  lede: string;
  intro: string[];
  focus: { title: string; body: string; href: string }[];
  work: string[];
  faq: { q: string; a: string }[];
  metaTitle: string;
  metaDescription: string;
};

const [landing, website, store, portal] = builds;

export const industries: Industry[] = [
  {
    slug: "contractors",
    name: "Contractors and home services",
    who: ["Roofers", "General contractors", "HVAC", "Remodelers", "Handyman services", "Plumbers", "Electricians"],
    headline: "Websites that keep a contractor's phone ringing.",
    lede: "Service pages, town pages and quote forms that reach you on the job. Built for roofers, HVAC companies, remodelers and the rest of the trades.",
    intro: [
      "Homeowners pick a contractor fast. They search on a phone, open two or three sites, and call the one that clearly does the job they need in their town.",
      "So we build a page for each service and each town you cover, put your phone number on every screen, and send each quote request to email and text at once. That is the setup on the ATLAS General Contracting site in Imperial.",
      "For HVAC, we built Healthy Mechanical a site led by indoor air quality, with financing and project pages and quote requests by email.",
    ],
    focus: [
      {
        title: "Service and service-area pages",
        body: "One page per service and per town you really work in, so each search has a page that answers it.",
        href: "/services/websites",
      },
      {
        title: "Quote forms that reach you on the job",
        body: "Requests go to email and text together, tagged by service, and get saved so none is lost.",
        href: "/services/automation-and-ai",
      },
      {
        title: "Project galleries",
        body: "A gallery and project pages that show real jobs, plus an editor for the pages you change often.",
        href: "/services/websites",
      },
      {
        title: "Care after launch",
        body: `Hosting, updates and seasonal changes each month from the people who built it, from ${carePlans[0].price} a month.`,
        href: "/services/care-and-training",
      },
    ],
    work: ["atlas-general-contracting", "healthy-mechanical"],
    faq: [
      {
        q: "Do I need a page for every town?",
        a: "Only for the towns you really work in. Each page should say something true about your work there, like jobs you have done nearby. Thin copies of the same page with the town swapped don't help.",
      },
      {
        q: "Can quote requests come to my phone?",
        a: "Yes. ATLAS gets an email and a text for each request, and every request is saved. We can also send them to your CRM.",
      },
      {
        q: "How much does a contractor website cost?",
        a: `Landing pages start at ${landing.from} and business websites with service and service-area pages at ${website.from}. You get a fixed-scope proposal with the price before work starts.`,
      },
    ],
    metaTitle: "Websites for contractors and home services in St. Louis",
    metaDescription: `Contractor websites for roofers, HVAC and home services in St. Louis: service and town pages, quote forms that text you, and project galleries. From ${website.from}.`,
  },
  {
    slug: "retail-and-wholesale",
    name: "Retail, showrooms and wholesale",
    who: ["Showrooms", "Cabinet and flooring stores", "Print shops", "Wholesalers", "Distributors", "Specialty retail"],
    headline: "Sell online to retail customers and dealers alike.",
    lede: "Online stores with real catalogs, dealer accounts and tiered pricing, plus sites for shops whose customers want to see the work first.",
    intro: [
      "VIRO Design & Finishes in St. Louis sells cabinets and flooring to homeowners and to dealers. We built one store for both: more than 13,000 cabinet products and 815 floors, dealer sign-up and approval, pricing tiers, and card and bank payments.",
      "Not every shop needs a full store. Oddball Ink in Arnold needed a site that shows its real jobs, explains art specs and takes file uploads, so orders start with the right files.",
    ],
    focus: [
      {
        title: "Catalog and checkout",
        body: "Products, variants, cart and checkout, with payments through Stripe or Authorize.Net. Card details never touch your server.",
        href: "/services/online-stores-and-portals",
      },
      {
        title: "Dealer and wholesale pricing",
        body: "Dealer sign-up and approval, pricing tiers and per-account discounts that follow the dealer while they are signed in.",
        href: "/services/online-stores-and-portals",
      },
      {
        title: "Customers synced to your CRM",
        body: "New customers and quote requests reach your CRM without anyone re-typing them, like the Reevo sync on the VIRO store.",
        href: "/services/automation-and-ai",
      },
      {
        title: "Catalog moved across",
        body: "We move your products, customers and photos from the old store, then check them against it before launch.",
        href: "/services/online-stores-and-portals",
      },
    ],
    work: ["viro-design-and-finishes", "oddball-ink"],
    faq: [
      {
        q: "Can retail customers and dealers use the same store?",
        a: "Yes. On the VIRO store, dealers sign up, staff approve them, and their prices follow them while they are signed in. Everyone else sees the regular prices.",
      },
      {
        q: "Can you move my products from my current store?",
        a: "Yes. For VIRO we migrated more than 13,000 cabinet products from the old store. We check the new catalog against the old one before launch.",
      },
      {
        q: "How much does an online store cost?",
        a: `Online stores start at ${store.from}. Stores with dealer accounts and pricing tiers fall under portals and custom platforms, from ${portal.from}. Your proposal says which one fits.`,
      },
    ],
    metaTitle: "Online stores for retail and wholesale in St. Louis",
    metaDescription: `Online stores with dealer accounts, tiered pricing and online payments, plus sites for shops and showrooms. Built for St. Louis businesses like VIRO. From ${store.from}.`,
  },
  {
    slug: "restaurants",
    name: "Restaurants",
    who: ["Restaurant groups", "Single restaurants", "Bars", "Cafes", "Caterers"],
    headline: "Your point of sale knows your guests. Your CRM should too.",
    lede: "Guest data from your point of sale kept in step with your CRM, safely and every day.",
    intro: [
      "We run a daily sync for a two-brand restaurant group that moves guest data from Toast into HubSpot. A previous sync had left the CRM out of step with the point of sale, so ours checks before it writes anything.",
      "Each day's export is checked to be complete before it is used. The first stage only reads and compares. Every run is logged, so the team can see what changed and why.",
      "We can build the website side too: menus, hours, locations and booking links your staff can update.",
    ],
    focus: [
      {
        title: "Point of sale to CRM sync",
        body: "Guest and order data from your point of sale reconciled into your CRM on a schedule.",
        href: "/services/automation-and-ai",
      },
      {
        title: "Checks before every write",
        body: "Read-only comparison first, then changes, with a log of every decision and an alert if a run fails.",
        href: "/services/automation-and-ai",
      },
      {
        title: "Guest lists that stay current",
        body: "Email lists built from real guest data, not exports done by hand each month.",
        href: "/services/automation-and-ai",
      },
      {
        title: "Restaurant websites",
        body: "Menus, hours, locations and booking links, with an editor for the pages you change often.",
        href: "/services/websites",
      },
    ],
    work: ["restaurant-group-pos-sync"],
    faq: [
      {
        q: "Which point of sale systems can you work with?",
        a: "Our restaurant sync runs on Toast exports into HubSpot. Other systems usually offer exports or an API. We check what yours offers before you pay for anything.",
      },
      {
        q: "Will a sync overwrite the records I already have?",
        a: "Not without checks. Our restaurant sync compares the sources read-only first and logs every decision before it writes anything.",
      },
      {
        q: "What does an automation cost?",
        a: `A single workflow starts at ${automation[0].from}. An automation package, where we map your week and automate up to four workflows, starts at ${automation[1].from}.`,
      },
    ],
    metaTitle: "Restaurant automation in St. Louis: POS to CRM sync",
    metaDescription:
      "Guest data from Toast and other point of sale systems synced into HubSpot or your CRM, with safety checks and run logs. Restaurant automation from a St. Louis company.",
  },
  {
    slug: "fitness",
    name: "Fitness and personal training",
    who: ["Personal trainers", "Training studios", "Gyms", "Yoga and pilates studios", "Coaches"],
    headline: "Turn site visits into booked first sessions.",
    lede: "Sites for trainers and studios that speak to the right clients and let them book on the spot.",
    intro: [
      "Charla Wewers runs a women-focused personal training studio in St. Louis. Her site speaks to that audience directly, shows programs and testimonials, and lets a new client book online.",
      "People choosing a trainer want to know three things fast: who you train, how it works and how to start. The site answers those first, then puts booking one tap away.",
    ],
    focus: [
      {
        title: "Online booking",
        body: "Booking tied to your calendar, like the Cal.com booking on Charla's site.",
        href: "/services/websites",
      },
      {
        title: "Programs and testimonials",
        body: "A page for each program, with real client words where you have permission to use them.",
        href: "/services/websites",
      },
      {
        title: "Contact that reaches you",
        body: "Forms that land in your inbox, with a thank-you page and the SMS terms you need if you text clients.",
        href: "/services/websites",
      },
      {
        title: "Follow-ups drafted for you",
        body: "New sign-ups added to your email list or CRM, with follow-up messages drafted for you to approve.",
        href: "/services/automation-and-ai",
      },
    ],
    work: ["charla-wewers"],
    faq: [
      {
        q: "Can clients book online?",
        a: "Yes. Charla's site uses Cal.com booking tied to her calendar. Other booking tools work too.",
      },
      {
        q: "Do I need a big site?",
        a: `No. Many trainers need a few strong pages: home, programs, about, testimonials and contact. Landing pages start at ${landing.from} and business websites at ${website.from}.`,
      },
      {
        q: "Can I update it myself?",
        a: `Yes, for the pages you change often. Business websites include an editor for them, and we walk you through it at launch. Care plans cover the rest from ${carePlans[0].price} a month.`,
      },
    ],
    metaTitle: "Websites for personal trainers and fitness studios in St. Louis",
    metaDescription: `Websites for personal trainers, studios and gyms in St. Louis, with online booking, programs and testimonials. Built for studios like Charla Wewers. From ${landing.from}.`,
  },
  {
    slug: "clubs-and-memberships",
    name: "Clubs and memberships",
    who: ["Private clubs", "Member organizations", "Coworking spaces", "Associations", "Social clubs"],
    headline: "A member portal your staff can run from one place.",
    lede: "Public sites for clubs and member groups, with a portal behind them for bookings, events, messages and a directory.",
    intro: [
      "Adventure Unknown is a private members club in St. Louis. It ran memberships, events, travel and room bookings by hand. We built a public site and a member portal behind it.",
      "Members book, RSVP, message each other and find each other in the directory. Staff get one admin with front-desk check-in, inquiries, bookings and messaging.",
    ],
    focus: [
      {
        title: "Membership applications",
        body: "Applications and inquiries that reach staff with what they need to decide.",
        href: "/services/websites",
      },
      {
        title: "Member portal",
        body: "Secure sign-in, bookings, a calendar, messages, clubs and a member directory.",
        href: "/services/online-stores-and-portals",
      },
      {
        title: "Events and RSVPs",
        body: "Event pages with RSVPs, so staff know who is coming.",
        href: "/services/online-stores-and-portals",
      },
      {
        title: "Front-desk admin",
        body: "Check-in, inquiries, bookings and messages in one admin your staff can run without a developer.",
        href: "/services/online-stores-and-portals",
      },
    ],
    work: ["adventure-unknown"],
    faq: [
      {
        q: "Can members sign in and book?",
        a: "Yes. Adventure Unknown members sign in to book, RSVP to events, message each other and use the directory.",
      },
      {
        q: "Can staff run it without a developer?",
        a: "Yes. Staff handle check-in, inquiries, bookings and messages in the admin, and we train them on it at launch.",
      },
      {
        q: "What does a member portal cost?",
        a: `Portals and custom platforms start at ${portal.from}. You get a fixed-scope proposal with the price before work starts.`,
      },
    ],
    metaTitle: "Member portals and websites for clubs in St. Louis",
    metaDescription: `Websites and member portals for private clubs and member groups in St. Louis: applications, bookings, events, messages, a directory and a staff admin. From ${portal.from}.`,
  },
];

export function getIndustry(slug: string) {
  return industries.find((i) => i.slug === slug);
}

/** The industry page a case file belongs to, if any. */
export function industryFor(workSlug: string) {
  return industries.find((i) => i.work.includes(workSlug));
}
