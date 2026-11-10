import { startingAt } from "./pricing";
import type { ChapterColor } from "./site";

export type Service = {
  slug: string;
  chapter: number;
  color: ChapterColor;
  title: string;
  /** Short label for tabs and menus. */
  tab: string;
  headline: string;
  summary: string;
  intro: string[];
  included: { title: string; body: string }[];
  changes: string[];
  work: string[];
  priceNote: string;
  /** Lowest starting price in USD, for structured data. Monthly for care. */
  fromPrice: number;
  faq: { q: string; a: string }[];
  metaTitle: string;
  metaDescription: string;
};

export const services: Service[] = [
  {
    slug: "automation-and-ai",
    chapter: 1,
    color: "yellow",
    title: "Automation and AI",
    tab: "Automation & AI",
    headline: "Stop copying things from one tool into another.",
    summary:
      "We connect your website, CRM, point of sale, inbox and calendar, and use AI where it helps, so the repetitive steps happen on their own.",
    intro: [
      "Every small business has a list of jobs that are just moving information around. Copy the lead into the CRM. Export the sales and import them somewhere else. Write the same reply again. Build the same layout again.",
      "We map those steps with you, then automate the ones that are safe to automate. Where a judgment call is needed, AI drafts and a person approves. Every automation logs what it did, so nothing happens in the dark.",
    ],
    included: [
      { title: "AI drafting and sorting", body: "AI that drafts replies, sorts enquiries, summarises calls or pulls details from documents, with a person in the loop." },
      { title: "Lead routing", body: "Form submissions go to your CRM, email and phone at once, tagged with where they came from." },
      { title: "Tool-to-tool sync", body: "Point of sale, CRM, accounting, booking and email tools kept in step, with checks before anything is overwritten." },
      { title: "Content pipelines", body: "Repeatable production work, from a script or a spreadsheet to a finished layout, run as one workflow." },
      { title: "Workflow tools", body: "n8n, Zapier or custom code, whichever fits your volume and budget. We recommend the simplest one that works." },
      { title: "Logs and alerts", body: "Every run is logged, failures alert a person, and nothing is deleted without a review step." },
    ],
    changes: [
      "The busywork runs on its own, every day.",
      "Fewer mistakes from re-typing.",
      "A clear record of what ran and when.",
    ],
    work: ["restaurant-group-pos-sync", "comic-production-pipeline", "atlas-general-contracting"],
    priceNote: startingAt.automation,
    fromPrice: 399,
    faq: [
      {
        q: "Which tools can you connect?",
        a: "Anything with an API or a reliable export: CRMs like HubSpot, point of sale like Toast, email, calendars, spreadsheets, Canva, Supabase and more. If a tool has no API, we tell you up front.",
      },
      {
        q: "Is AI going to send things to my customers without me?",
        a: "Only if you want it to. Our default is that AI drafts and a person approves anything customer-facing.",
      },
      {
        q: "What happens when an automation fails?",
        a: "It stops, logs why, and alerts a person. We design the steps so a failure never half-writes your data.",
      },
    ],
    metaTitle: "Business automation and AI integration for small businesses",
    metaDescription:
      "Automate lead routing, CRM and point-of-sale sync, AI drafting and content pipelines with n8n, Zapier or custom code. Logged, reviewed and built to save time.",
  },
  {
    slug: "websites",
    chapter: 2,
    color: "blue",
    title: "Websites",
    tab: "Websites",
    headline: "A website that brings in work and sends it to the right place.",
    summary:
      "Fast, findable websites for local businesses, with every form wired to your inbox, phone or CRM so no lead sits unread.",
    intro: [
      "Most small business sites look fine and do very little. A customer fills in a form, it lands in an inbox nobody checks, and the job goes to whoever called back first.",
      "We design and build each site from scratch, set it up so Google can read every page, and connect the forms to the tools you already use. When someone asks for a quote, you hear about it in the place you actually look.",
    ],
    included: [
      { title: "Custom design", body: "Designed around your business and your customers. No themes, no page builders to fight with." },
      { title: "Built for phones first", body: "Most local searches happen on a phone. Every page is designed and tested at phone size before desktop." },
      { title: "Technical SEO", body: "Clean titles and descriptions, a sitemap, structured data, service and service-area pages, and fast load times." },
      { title: "Forms that go somewhere", body: "Quote and contact forms that email you, text you, or create a contact in your CRM, with a confirmation to the customer." },
      { title: "Bookings and calls", body: "Booking links, click-to-call buttons and maps where they help a customer take the next step." },
      { title: "Hosting and domain setup", body: "We set up hosting, the domain, SSL and email routing so the site is live and secure on day one." },
    ],
    changes: [
      "Quote requests reach you within seconds, on your phone or in your CRM.",
      "Customers can find your services and your area in search.",
      "You can update the site yourself, or ask us to.",
    ],
    work: ["atlas-general-contracting", "healthy-mechanical", "charla-wewers", "oddball-ink"],
    priceNote: startingAt.websites,
    fromPrice: 599,
    faq: [
      {
        q: "Do you use templates or website builders?",
        a: "No. Each site is designed and coded for the business. You get the source code, so you are never locked into a builder subscription.",
      },
      {
        q: "Will my site show up on Google?",
        a: "Every site ships with the technical SEO foundation: page titles, descriptions, a sitemap, structured data and fast load times. Rankings depend on competition and content, so we never promise a position.",
      },
      {
        q: "Can I edit the site myself?",
        a: "Yes. We can set up an editor for the parts you change often, and we train you on it. Or you can send changes to us on a care plan.",
      },
    ],
    metaTitle: "Website design and development for small businesses",
    metaDescription:
      "Custom websites for small businesses with technical SEO, phone-first design and forms wired to your inbox, phone or CRM. Landing pages from $599.",
  },
  {
    slug: "online-stores-and-portals",
    chapter: 3,
    color: "green",
    title: "Online stores and portals",
    tab: "Stores & portals",
    headline: "Stores, dealer ordering and member portals that run the day-to-day.",
    summary:
      "E-commerce, wholesale and dealer ordering, member areas and admin dashboards, so customers serve themselves and your team stops re-keying orders.",
    intro: [
      "Some businesses outgrow a brochure site. Customers want to order online, dealers want their own prices, members want to book a room without a phone call.",
      "We build the store or portal around how you already sell: your catalog, your pricing rules, your approval steps. Payments go through a trusted processor, and your team runs it all from one admin.",
    ],
    included: [
      { title: "Catalog and checkout", body: "Products, variants, cart and checkout, with payments handled by a processor such as Stripe or Authorize.Net. Card details never touch your server." },
      { title: "Dealer and wholesale pricing", body: "Dealer sign-up and approval, pricing tiers, per-account discounts, and prices that follow the dealer everywhere they are signed in." },
      { title: "Member portals", body: "Secure sign-in, bookings, messages, directories and events for members, plus the admin tools your staff need." },
      { title: "Admin dashboard", body: "Manage products, prices, orders, customers and content without calling a developer." },
      { title: "Data migration", body: "We move your existing catalog, customers and photos across, and check them against the old system." },
      { title: "Documentation", body: "Written docs for the system, the data and the deployment, so any developer or AI coding agent can pick it up." },
    ],
    changes: [
      "Orders arrive priced, paid and complete.",
      "Dealers and members help themselves at any hour.",
      "Your staff manage it from one place.",
    ],
    work: ["viro-design-and-finishes", "adventure-unknown"],
    priceNote: startingAt.stores,
    fromPrice: 2499,
    faq: [
      {
        q: "Which payment processors do you work with?",
        a: "Stripe and Authorize.Net are the most common, and we can work with the processor you already have. Card data is handled by the processor, never stored on your site.",
      },
      {
        q: "Can you move my products from my current store?",
        a: "Usually, yes. For VIRO we moved more than 13,000 cabinet products and 800 floors from their old store, then checked prices and photos against the original.",
      },
      {
        q: "Who owns the code?",
        a: "You do, once the project is paid. It comes with documentation so you can keep working with us, hire another developer, or use AI coding tools.",
      },
    ],
    metaTitle: "E-commerce, dealer ordering and member portal development",
    metaDescription:
      "Custom online stores from $2,499 and dealer, wholesale and member portals from $3,800, with admin dashboards and payments through Stripe or Authorize.Net.",
  },
  {
    slug: "care-and-training",
    chapter: 4,
    color: "purple",
    title: "Care and training",
    tab: "Care & training",
    headline: "Someone to keep it running, and the know-how to run it yourself.",
    summary:
      "Hosting, updates and changes on a monthly plan, plus hands-on training for your team on the admin, the docs and working with AI coding tools.",
    intro: [
      "A website or platform needs looking after: updates, backups, small changes, the occasional fix. A care plan means you have someone to call who already knows the system.",
      "We also teach. Every build ends with a walkthrough of the admin, and we offer training on keeping the system up yourself, including how to work safely with AI coding tools like Claude and Codex.",
    ],
    included: [
      { title: "Hosting and monitoring", body: "Hosting, SSL, domain and uptime checks, with alerts to us if something breaks." },
      { title: "Updates and changes", body: "Content changes, new pages and small features, handled on your plan." },
      { title: "Security upkeep", body: "Dependency updates and security patches applied and tested." },
      { title: "Admin training", body: "A walkthrough of your dashboard: products, prices, orders, content, users." },
      { title: "AI development training", body: "Giving an AI agent the right context, source control, reviewing AI changes before they go live, and testing and deploying safely." },
      { title: "Handover docs", body: "Written documentation for the system, kept up to date as it changes." },
    ],
    changes: [
      "One team that already knows your system.",
      "Changes done in days, not lost in an inbox.",
      "Your team can handle the routine work.",
    ],
    work: ["viro-design-and-finishes", "adventure-unknown"],
    priceNote: startingAt.care,
    fromPrice: 99,
    faq: [
      {
        q: "Do I have to be on a care plan?",
        a: "No. You own the code and can host it anywhere. A care plan is there if you want someone to look after it.",
      },
      {
        q: "What does AI development training cover?",
        a: "How to give an AI coding agent the right project context, how to use source control safely, how to review AI-made changes, and how to test and deploy them.",
      },
    ],
    metaTitle: "Website care plans, hosting and AI development training",
    metaDescription:
      "Monthly website care plans with hosting, updates and changes from $99 a month, plus admin and AI development training for your team from $299 a session.",
  },
];

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}
