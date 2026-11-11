# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Next.js (App Router), statically rendered, deployed on Vercel. Chosen by the user on 2026-11-10 to replace the Vite single-page app for SEO. The Vercel project `website` must switch its framework preset from Vite to Next.js before this branch merges to `main`.

## Users

Owners of US small businesses, mostly around St. Louis, MO: trades, home services, retail, e-commerce, fitness, hospitality, real estate. They need a site that brings in calls and leads, and they lose hours every week to manual work (copying leads between tools, re-keying orders, chasing quotes). They are not technical. They want to know what they will get, roughly what it costs, and who they will be talking to. (Audience confirmed by the user 2026-11-10.)

## Product Purpose

KreativVantage (KreativVantage LLC, St. Louis, Missouri) is a website and automation development agency with a focus on AI and saving time. It designs and builds websites, e-commerce and custom platforms, connects the tools a business already uses, and automates repetitive work. Success for this site: a qualified small business owner sends the project form or calls.

## Positioning

Every build is documented and AI-ready, so the client owns and controls it: organised code, written docs, no vendor lock-in, and training so the client (or any developer or AI coding agent) can keep it running. Websites are wired to the rest of the business, so a lead, an order or a booking lands where it needs to go without anyone re-typing it.

## Operating Context

- Engagements are fixed-scope proposals. Example: the signed Viro proposal (e-commerce and dealer platform) priced a standard project at $3,800, or $3,300 with a monthly hosting and maintenance plan.
- Deliverables named in proposals: build, testing, standard technical SEO, security testing, documentation, admin training, and "AI development and management" training (working with Claude/Codex, giving agents context, source control, reviewing AI changes).
- Third-party costs (domains, payment fees, email, APIs) are separate and discussed up front.
- Client owns the custom code after final payment.
- Out of scope unless added: ongoing SEO campaigns, backlinks, guaranteed rankings.

## Capabilities and Constraints

- Marketing and lead-generation websites (Next.js, Vercel).
- E-commerce and dealer portals: catalog, cart, checkout, dealer pricing tiers, admin dashboard (Viro).
- Member portals with auth and admin (Adventure Unknown).
- Integrations and automation: CRM sync (Reevo, HubSpot), POS to CRM (Toast to HubSpot), lead routing to email, SMS, Zapier and Supabase (Atlas), booking tools, n8n workflows with AI models (comic script to Canva layouts).
- Hosting, maintenance and care plans.
- Contact: phone +1 (314) 780-2331, email hello@kreativvantage.com (confirmed 2026-11-11). Domain mail runs on Cloudflare Email Routing.
- Legal entity: KreativVantage LLC, a Missouri LLC based in St. Louis (confirmed 2026-11-11). Terms are governed by Missouri law.
- Pricing: set on 2026-11-11 under the owner's delegation ("introduce plans and pricing as you see fit"), anchored on the old site's prices and the $3,800 Viro proposal. Source of truth is `lib/pricing.ts`. Builds from $599 / $1,499 / $2,499 / $3,800; automation from $399 / $1,499; care plans $99 / $249 / $599 a month with 1 / 4 / 10 hours; AI training $299 a session; 10% off a build with a 12-month care plan; care plans monthly, cancel any time.
- Undecided, never invent: street address, project timelines.

## Brand Commitments

- Name: KreativVantage, one word, as on the legal entity and domain. The signed Viro proposal spelled it "Kreativ Vantage"; that spelling is only an alternate name.
- User-pinned direction for this rebuild (2026-11-10): light, professional theme. Reference: covingtonplacepartners.com. Craft reference: oddballink.vercel.app (rich motion, a character-built face that morphs, embedded 3D), but not its dark neon theme.
- Performance- and SEO-first. Custom 404, privacy policy, terms of service and the rest of a professional site's legal and technical SEO set.

## Evidence on Hand

Live client work the user approved showing by name with links (2026-11-10):
- VIRO Design & Finishes (virostl.com): St. Louis cabinetry and flooring store with dealer pricing, online payments, CRM sync and booking.
- Adventure Unknown (adventure-unknown.com): private club in St. Louis, marketing site plus member portal.
- ATLAS General Contracting (goatlasgo.us): roofing and construction lead-gen site, service-area pages, lead forms wired to email, SMS, Zapier and Supabase.
- Healthy Mechanical Services (healthymechanical.com): HVAC, Charlotte metro.
- Charla Wewers Personal Training (charlawewers.com): St. Louis trainer.
- Oddball Ink (oddballink.vercel.app): Arnold, MO print shop redesign.
Automation work (anonymised): Toast POS to HubSpot sync for a restaurant group; n8n pipeline turning comic scripts into Canva layouts with AI models.

Absent, never fabricate: testimonials, client metrics (hours saved, revenue, rankings), team bios, years in business, client counts.

## Product Principles

1. Show the work. Real sites, real integrations, no invented numbers.
2. Plain words for non-technical owners. Explain what they get and what it saves them.
3. The client owns it. Documentation, training and no lock-in are part of every build.
4. Fast and findable by default. The agency's own site is the first proof.

## Local Search

Added 2026-11-11 to rank around St. Louis. The user picked Fenton and Jefferson County first, plus nearby areas.

- Area pages (`lib/areas.ts`, `/areas/*`): St. Louis, Fenton, Jefferson County, South County, West County, Metro East, and central and southern Illinois (Illinois within about 100 miles of St. Louis, per the user).
- Wider reach: the site says it works across the Midwest and the US (user asked to use "Midwest" as a keyword, 2026-11-11). Don't claim Midwest clients beyond the case files.
- Industry pages (`lib/industries.ts`, `/industries/*`): contractors, retail and wholesale, restaurants, fitness, clubs. Each is backed by a case file.
- Rules: every page needs facts only true of its area or industry. No town-swapped copies, no doorway pages, no invented visits, offices or clients.
- Meetings: in person anywhere in Missouri and Illinois, or by video, depending on the client (confirmed 2026-11-11). Source of truth is `site.inPerson`.
- Google Business Profile: listed as "Kreativ Vantage", Website designer, 2 reviews (checked 2026-11-11). Its service area was the whole US, which put the map pin in the Pacific. The owner was told to set local service areas. The Maps link is `site.googleMaps`.

## Accessibility & Inclusion

WCAG 2.2 AA. Respect reduced motion. Every effect has a static fallback.
