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

## Deploying

`vercel.json` sets `"framework": "nextjs"`, which overrides the Vercel project's framework preset (still Vite for the old site on `main`). Deployments from this code build as Next.js with no dashboard change, and older commits keep building as Vite. After the merge you can switch the preset in project settings to match, but nothing depends on it.

## Before this goes live

1. Verify `kreativvantage.com` in Resend (it adds a few DNS records in Cloudflare) and add the three Resend variables above in Vercel.
2. Open a preview deployment and send a test enquiry.
3. Merge to `main`.
4. Submit `https://www.kreativvantage.com/sitemap.xml` in Google Search Console.
