---
name: KreativVantage
description: An operating manual for a small business, set plainly on a light grey page.
colors:
  paper: "#f3f4f6"
  sheet: "#fbfbfc"
  desk: "#e8eaed"
  desk-deep: "#dee1e5"
  ink: "#15171c"
  ink-secondary: "#444a55"
  ink-muted: "#626873"
  rule: "#d8dbe0"
  rule-strong: "#c4c9d0"
  tab-blue: "#a8d6f0"
  tab-blue-deep: "#24589f"
  tab-green: "#b4dda0"
  tab-green-deep: "#2f7a1f"
  tab-yellow: "#e2e87a"
  tab-yellow-deep: "#5c6300"
  tab-purple: "#d8c0e4"
  tab-purple-deep: "#6e2c86"
  error: "#b3261e"
typography:
  display:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "clamp(2.5rem, 1.5rem + 3.4vw, 4.125rem)"
    fontWeight: 600
    lineHeight: 1.02
    letterSpacing: "-0.03em"
  headline:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "clamp(1.875rem, 1.35rem + 1.7vw, 2.75rem)"
    fontWeight: 600
    lineHeight: 1.08
    letterSpacing: "-0.025em"
  title:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Fragment Mono, ui-monospace, monospace"
    fontSize: "0.75rem"
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: "0.05em"
rounded:
  hairline: "2px"
  sheet: "4px"
spacing:
  gutter: "clamp(16px, 4.2vw, 44px)"
  section: "clamp(80px, 9vw, 144px)"
  band: "clamp(56px, 7vw, 104px)"
  container: "1240px"
  header: "68px"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.hairline}"
    padding: "0 22px"
    height: "48px"
  button-primary-hover:
    backgroundColor: "#000000"
  button-line:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.hairline}"
    padding: "0 22px"
    height: "48px"
  button-on-ink:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.hairline}"
  input:
    backgroundColor: "#ffffff"
    textColor: "{colors.ink}"
    rounded: "{rounded.hairline}"
    padding: "12px 14px"
    height: "50px"
  marker:
    size: "10px"
---

# Design System: KreativVantage

## Overview

**Creative North Star: "The Operating Manual", set plainly**

The site reads like a well-made operations manual for a small business: numbered sections, ruled lists, spec sheets and plain words. The cover shows AI sorting incoming work into the tools a business already has. The tone is calm, exact and plain-spoken.

On 2026-11-12 the user asked for the site to follow the simplicity of three references: covingtonplacepartners.com, vanshajpoonia.com and explee.com. What those share became the rules here:

- One typeface family for headings and body, at normal width and moderate sizes.
- Small uppercase labels for nav, buttons, links and section numbers.
- Hairline rules and 1px bordered panels instead of colour blocks and drop shadows.
- One accent at a time. Colour marks things. It never fills them.
- Nothing moves just to decorate. Type stays still.

The earlier "index-tab" build (expanded display type, letter-scramble headings, coloured divider sheets stacking on scroll, a tab rail on the right edge, a title-block input on the cover) is retired. The previous dark neon agency look is still the anti-reference.

**Key Characteristics:**
- A light cool grey page with slightly darker desk bands, as on CPP and vanshajpoonia.com.
- Two faint vertical hairlines at the container's outer edges from 1400px up (CPP).
- Numbered section labels in mono caps: "01 / Services".
- Chapter colour only as a 10px square marker.
- Solid lines mean automated; dashed lines mean done by hand.

## Colors

A neutral system. The four chapter colours survive only as markers.

### Primary
- **Ink** (#15171c): text, primary buttons, the 1px rules that open lists and tables, the closing panel ground.

### Chapter markers
Tints of the KreativVantage K: the cyan-blue of its diagonal, the leaf green and lime of its arch, the plum of its bar.
- **Automation Lime** (#e2e87a): chapter 1. Also the one accent: the "10 hours a week" highlight, the AI node and the "25 minutes" highlight in the hours diagram, text selection.
- **Website Blue** (#a8d6f0): chapter 2. Deep #24589f carries focus rings.
- **Platform Green** (#b4dda0): chapter 3.
- **Care Plum** (#d8c0e4): chapter 4.
- **Error Red** (#b3261e): form errors only.

### Neutral
- **Paper** (#f3f4f6): the page.
- **Sheet** (#fbfbfc): tables, the hours panel, the handover sample.
- **Desk** (#e8eaed): alternate bands and the footer.
- **Secondary Ink** (#444a55) and **Muted Ink** (#626873): supporting copy and labels. Muted passes 4.5:1 on paper and desk.
- **Rule** (#d8dbe0) and **Strong Rule** (#c4c9d0): hairlines and panel borders.

### Named Rules
**The Marker Rule.** A chapter colour appears only as a small square marker next to that chapter's number or name: services rows, page heads, the mobile menu, chips, price rows, form picks, the footer. Never as a fill, a band or a hover wash.

**The One Accent Rule.** Lime is the only colour that highlights anything, and only for the time-saved figures and the AI step.

**The Logo Palette Rule.** New colour comes from the K or it does not come in. The logo itself is never recoloured.

## Typography

**Family:** Archivo at normal width for headings and body (as on vanshajpoonia.com).
**Labels:** Fragment Mono in caps at 12 to 13px (as on CPP).

### Hierarchy
- **Display** (600, up to 66px, 1.02): the cover H1, about 11ch.
- **Page H1** (600, up to 60px, 1.04): subpage heads, up to 20ch.
- **Headline** (600, up to 44px, 1.08): section headings.
- **Title** (600, 18 to 26px): services rows, case files, list heads.
- **Body** (400, 17px, 1.6): copy at 44 to 68ch.
- **Label** (Fragment Mono, caps, 0.05em): nav links, buttons, text links, section numbers, spec terms, prices and times.

### Named Rules
**The One Weight Rule.** Headings use weight 600 and nothing heavier. No expanded widths.

**The Still Type Rule.** Headings render as plain text. No scrambling, typing or assembling effects.

**The Data-Only Mono Rule.** Mono is for labels and data. Never for headings or paragraphs.

## Layout

A 1240px container with a fluid gutter (16 to 44px). Sections alternate paper and desk bands (80 to 144px of vertical space). A section head stacks a mono number label, the heading and one line under it, left aligned, at most 780px wide. Content sits in ruled lists, spec sheets and simple grids of bordered cells. The header is a 68px sticky bar, and the nav becomes a full-screen menu below 900px.

## Elevation & Depth

Flat. Panels have a 1px border and no shadow. Screenshots have a 1px border and do not zoom on hover. Nothing is rotated or stacked. The only depth on the site is the 3D cover scene.

## Shapes

2px corners on buttons, inputs and sheets, 4px on screenshot frames. Squares for markers, a circle only for status dots. Rules are 1px: ink to open a list or table, grey between rows.

## Components

### Buttons
- 48px tall (38px small), 2px corners, mono caps at 13px.
- **Primary:** ink with paper text. Hover goes to pure black. No lift, no shadow.
- **Line:** 1px ink border. Hover adds a 6% ink wash.
- **On the ink panel:** primary turns paper, line gets a paper border.

### Text links
- Mono caps with a trailing arrow ("ALL WORK →"). Underline on hover.

### Section labels
- "01 / Services" in mono caps, muted, above the heading. Home sections are numbered 01 to 07.

### Services list
- One row per chapter: marker and number, title with its one-line headline, keywords, hours back and starting price, arrow. Hairline rows under a 1px ink rule. Area and industry indexes use the same rows without the price column.

### Case files
- Screenshot beside a spec sheet. The first spec row is Status, with a filled dot for Live and a ring for anything else (as on vanshajpoonia.com). Services used are listed as markers with names.

### Inputs / Fields
- White field, 1px ink border, 2px corners, 50px tall, mono caps label above. Focus turns the border Website Blue Deep with a 3px tinted ring. Checked picks get a light ink wash and their chapter marker.

### Navigation
- The K logo and wordmark (weight 600), four mono caps links (current page underlined), mono phone, ink "Start a project". The mobile menu lists services as ruled rows with markers, then links, then a full-width call button.

### Sorting line (cover)
- A WebGL sorting line on transparent ground: requests ride a belt through the lime AI gate and a robot arm files them into CRM, Calendar and Replies trays. The poster frame (`public/hero/sorting-line.webp`) paints first; the scene loads after the first interaction or 5 seconds. Reduced motion, Save-Data and no WebGL keep the poster.

### Hours lanes
- "Where the hours go" draws one quote request twice on a flat bordered sheet: by hand as a dotted line that drops into your lane four times, automated as one solid line through Website, AI, CRM, Inbox and Calendar. Tallies and minutes are mono. Below it, 25 requests a week: over 10 hours by hand, 25 minutes automated. Pause and Replay are mono caps buttons. Reduced motion opens on the finished state.

### Time estimates
- Time figures are rough estimates for a typical small business, not measured results. Each carries an asterisk (`components/Est.tsx`), and the footer note (`#estimates`) explains them on every page. Shared figures live in `lib/hours.ts`, per service in `hoursBack` in `lib/services.ts`. Case studies never get made-up time figures.

## Do's and Don'ts

### Do:
- **Do** keep one family, one heading weight, and normal width.
- **Do** mark a chapter with its square and nothing more.
- **Do** use 1px borders and rules for structure.
- **Do** keep primary actions ink, or paper on the ink panel.
- **Do** label demonstration data as an example, and keep client facts to what was built.

### Don't:
- **Don't** fill areas with chapter colours, or use them on hover.
- **Don't** add drop shadows, tilted sheets, gradient text, glass or glows.
- **Don't** animate type, or add floating chrome like side rails.
- **Don't** set headings or paragraphs in mono.
- **Don't** build sections out of equal grids of icon cards. Use ruled lists, spec sheets and bordered cells.
