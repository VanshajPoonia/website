// "From" prices come from the previous kreativvantage.com pricing table.
// CONFIRM: the owner chose "starting at" tiers but has not set new numbers.

export type Tier = {
  name: string;
  from: string;
  unit?: string;
  chapter: number;
  for: string;
  includes: string[];
  cta: string;
};

export const tiers: Tier[] = [
  {
    name: "Landing page",
    from: "$499",
    chapter: 1,
    for: "One focused page for a service, an offer or a new business.",
    includes: [
      "Custom design, built from scratch",
      "Phone-first build and technical SEO",
      "Contact form wired to your email",
      "Hosting and domain setup",
      "Support by phone",
    ],
    cta: "Start a landing page",
  },
  {
    name: "Online store",
    from: "$799",
    chapter: 2,
    for: "Sell products online and manage stock, orders and payments yourself.",
    includes: [
      "Catalog, cart and checkout",
      "Payments through Stripe or Authorize.Net",
      "Admin dashboard access",
      "Dedicated hosting",
      "Admin walkthrough at launch",
    ],
    cta: "Start a store",
  },
  {
    name: "Custom build",
    from: "$1,499",
    chapter: 3,
    for: "Multi-page sites, dealer portals, member areas and automations.",
    includes: [
      "Scoped in a fixed proposal before work starts",
      "Integrations with your CRM, POS, email and calendar",
      "Documentation for the whole system",
      "Cloud hosting and custom domain",
      "Priority phone support",
    ],
    cta: "Scope a custom build",
  },
];

export const addOns = [
  { name: "Care plan", from: "$100", unit: "/month", body: "Hosting, monitoring, updates and changes, handled by the team that built it." },
  { name: "Training", from: "$299", body: "Hands-on training on your admin, your docs and working safely with AI coding tools." },
  { name: "Automation workflows", from: "Quoted", body: "Priced per workflow once we have mapped the steps with you." },
];

export const pricingNotes = [
  "Every project gets a written, fixed-scope proposal before any work starts.",
  "Third-party costs such as domains, payment processing fees and paid APIs are separate and agreed up front.",
  "You own the custom code once the project is paid.",
  "Ongoing SEO campaigns and guaranteed rankings are not included in any package.",
];
