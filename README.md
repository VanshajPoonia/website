# Kreativ Vantage website

The marketing site for kreativvantage.com. Next.js (App Router), statically rendered, deployed on Vercel.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build, every page pre-rendered
npm run start
```

Node 22 or newer.

## Where things live

| What | Where |
| --- | --- |
| Business facts (phone, email, legal name, revision date) | `lib/site.ts` |
| Services, one per chapter | `lib/services.ts` |
| Client work and case files | `lib/work.ts`, screenshots in `public/work/` |
| Prices | `lib/pricing.ts` |
| Home FAQ and project steps | `lib/faq.ts` |
| Metadata and structured data helpers | `lib/seo.ts` |
| 3D cover scene (three.js, loaded after the first interaction) | `lib/scene.ts`, `components/Hero3D.tsx` |
| Styles and design tokens | `app/globals.css`, documented in `DESIGN.md` |
| Product facts and what must never be invented | `PRODUCT.md` |

Change copy in the `lib/` files and the pages pick it up. Bump `site.updated` and `site.revision` when content changes; the footer, sitemap and legal pages read them.

## Contact form

`app/api/contact/route.ts` sends enquiries through Resend. Set these on Vercel (see `.env.example`):

- `RESEND_API_KEY`
- `CONTACT_TO_EMAIL`, where enquiries land
- `CONTACT_FROM_EMAIL`, a verified sender on your Resend domain

Without them the form tells visitors to email or call instead. Nothing is dropped silently. A hidden field and a minimum fill time filter out simple bots.

## SEO and housekeeping included

- Pre-rendered HTML for every page, unique titles, descriptions and canonical URLs
- `sitemap.xml`, `robots.txt`, `llms.txt`, `/.well-known/security.txt`, web manifest, icons
- Open Graph and Twitter cards generated per page (`opengraph-image.tsx`)
- JSON-LD: Organization and WebSite on every page, plus Service, FAQPage, BreadcrumbList and CreativeWork where they apply
- Custom 404, privacy policy, terms of service, accessibility statement
- Security headers (CSP, HSTS, frame, referrer and permissions policies) in `next.config.ts`
- Redirects from common legal URLs (`/privacy-policy`, `/terms-of-service`)

## Before this goes live

1. Confirm the email address in `lib/site.ts` and `public/.well-known/security.txt` (currently `hello@kreativvantage.com`).
2. Set the legal name and governing-law state in `lib/site.ts` (`legalName`, `jurisdiction`). The terms page shows a highlighted placeholder until then.
3. Confirm the "from" prices in `lib/pricing.ts`. They are carried over from the old site.
4. In Vercel, switch the `website` project's framework preset from Vite to Next.js, and clear any custom output directory, before merging to `main`.
5. Add the Resend environment variables above.
6. After launch, submit the sitemap in Google Search Console.
