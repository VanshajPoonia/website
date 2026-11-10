# KreativVantage website

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
| Plans and prices (builds, automation, care plans, training) | `lib/pricing.ts` |
| Home FAQ and project steps | `lib/faq.ts` |
| Metadata and structured data helpers | `lib/seo.ts` |
| 3D cover scene (three.js, loaded after the first interaction) | `lib/scene.ts`, `components/Hero3D.tsx`, poster `public/hero/sorting-line.webp` |
| "Where the hours go" diagram | `components/HoursFlow.tsx` |
| Styles and design tokens | `app/globals.css`, documented in `DESIGN.md` |
| Product facts and what must never be invented | `PRODUCT.md` |

Change copy in the `lib/` files and the pages pick it up. Bump `site.updated` and `site.revision` when content changes; the footer, sitemap and legal pages read them.

## Cover poster

The cover shows `public/hero/sorting-line.webp` until three.js loads, and for good under reduced motion. It is an exact frame of the scene at `POSTER_T` in `lib/scene.ts`. If you change the scene, capture a new one: run the site, block the scene's own animation frames so it stays on its first frame, screenshot the canvas at 2x with a transparent page background and the tab rail hidden, and save it as WebP with alpha. Keep the image's width and height in `components/Hero3D.tsx` in step.

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

## Deploying

`vercel.json` sets `"framework": "nextjs"`, which overrides the Vercel project's framework preset (still Vite for the old site on `main`). Deployments from this code build as Next.js with no dashboard change, and older commits keep building as Vite. After the merge you can switch the preset in project settings to match, but nothing depends on it.

## Legacy site

The previous Vite site is archived on the `legacy` branch and served by the separate Vercel project `kreativvantage-legacy` at legacywebsite.kreativvantage.com. It sends `X-Robots-Tag: noindex` so it never competes with this site in search. That project is not connected to Git. To redeploy it, check out `legacy`, run `vercel link --project kreativvantage-legacy`, then `vercel deploy --prod`.

## After launch

1. Submit `https://www.kreativvantage.com/sitemap.xml` in Google Search Console.
2. Keep `site.updated` in `lib/site.ts` current when content changes.
