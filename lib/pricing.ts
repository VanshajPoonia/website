// Plans and prices, set by KreativVantage on 2026-11-11. Build prices are
// starting points; each project is quoted in a fixed-scope proposal.

export type Plan = {
  name: string;
  /** Display price, e.g. "$1,499". */
  from: string;
  /** Numeric minimum in USD, for structured data. */
  min: number;
  unit?: string;
  chapter: number;
  for: string;
  includes: string[];
};

export const builds: Plan[] = [
  {
    name: "Landing page",
    from: "$599",
    min: 599,
    chapter: 2,
    for: "One focused page for a service, an offer or a new business.",
    includes: [
      "Custom design, built from scratch",
      "Phone-first build and technical SEO",
      "Form that emails and texts you",
      "Hosting, domain and SSL set up",
      "Walkthrough at launch",
    ],
  },
  {
    name: "Business website",
    from: "$1,499",
    min: 1499,
    chapter: 2,
    for: "A full site for an established local business, up to 8 pages.",
    includes: [
      "Everything in a landing page",
      "Service and service-area pages",
      "Structured data and Google Search Console setup",
      "Forms wired to your CRM, email or phone",
      "An editor for the pages you change often",
    ],
  },
  {
    name: "Online store",
    from: "$2,499",
    min: 2499,
    chapter: 3,
    for: "Sell online and run products, orders and payments yourself.",
    includes: [
      "Catalog, cart and checkout",
      "Payments through Stripe or Authorize.Net",
      "Admin for products, prices and orders",
      "Product import from your current store",
      "Order emails to you and your customers",
    ],
  },
  {
    name: "Portal or custom platform",
    from: "$3,800",
    min: 3800,
    chapter: 3,
    for: "Dealer ordering, member areas, bookings and the admin behind them.",
    includes: [
      "Accounts, approvals and role-based access",
      "Dealer pricing tiers or member features",
      "Integrations with your CRM, payments and calendar",
      "Full system documentation",
      "Admin and AI development training",
    ],
  },
];

export const automation: Plan[] = [
  {
    name: "Single workflow",
    from: "$399",
    min: 399,
    chapter: 1,
    for: "One job automated, such as a form that lands in your CRM, inbox and phone at once.",
    includes: ["One connected workflow", "Logging and failure alerts", "A short written runbook"],
  },
  {
    name: "Automation package",
    from: "$1,499",
    min: 1499,
    chapter: 1,
    for: "We map your week together and automate the biggest time sinks.",
    includes: [
      "A mapping session on how work moves today",
      "Up to 4 connected workflows",
      "AI drafting or sorting where it helps, with a person approving",
      "Logs, alerts and a runbook for each workflow",
    ],
  },
];

export type CarePlan = { name: string; price: string; min: number; for: string; featured?: boolean };

export const carePlans: CarePlan[] = [
  { name: "Essentials", price: "$99", min: 99, for: "Keep the site safe, fast and online." },
  { name: "Growth", price: "$249", min: 249, for: "Regular changes and a team that knows your site.", featured: true },
  { name: "Partner", price: "$599", min: 599, for: "Ongoing builds and automations, planned with you." },
];

/** Comparison rows. true = included, false = not included, string = detail. */
export const careRows: { label: string; values: (boolean | string)[] }[] = [
  { label: "Hosting, SSL and domain management", values: [true, true, true] },
  { label: "Uptime monitoring and alerts", values: [true, true, true] },
  { label: "Security and dependency updates", values: [true, true, true] },
  { label: "Backups of your site's data", values: [true, true, true] },
  { label: "Changes and new pages each month", values: ["1 hour", "4 hours", "10 hours"] },
  { label: "Automation monitoring", values: [false, true, true] },
  { label: "New features and automations", values: [false, false, "Within your hours"] },
  { label: "Check-in", values: [false, "Monthly email", "Quarterly planning call"] },
  { label: "Reply time", values: ["2 business days", "Next business day", "Same business day"] },
];

export const training: Plan[] = [
  {
    name: "Admin walkthrough",
    from: "Included",
    min: 0,
    chapter: 4,
    for: "A guided tour of your dashboard and docs with every build.",
    includes: [],
  },
  {
    name: "AI development training",
    from: "$299",
    min: 299,
    unit: " a session",
    chapter: 4,
    for: "Working safely with Claude, Codex and other AI coding tools on your own system.",
    includes: [],
  },
];

export const carePlanDiscount = "Sign up for any care plan for 12 months and we take 10% off your build.";

export const pricingNotes = [
  "Every project gets a written, fixed-scope proposal before any work starts.",
  carePlanDiscount,
  "Third-party costs such as domains, payment processing fees and paid APIs are separate and agreed up front.",
  "You own the custom code once the project is paid.",
  "Unused care plan hours do not roll over. Work beyond your hours is quoted first, never billed by surprise.",
  "Ongoing SEO campaigns and guaranteed rankings are not included in any plan.",
];

/** Short starting-price lines used across the site. */
export const startingAt = {
  websites: "Landing pages from $599. Business websites from $1,499.",
  stores: "Online stores from $2,499. Portals and custom platforms from $3,800.",
  automation: "Single workflows from $399. Automation packages from $1,499.",
  care: "Care plans from $99 a month. AI development training from $299 a session.",
};
