---
name: Kreativ Vantage
description: An operating manual for a small business, set on paper with index-tab chapters.
colors:
  paper: "#fcfcfd"
  desk: "#e9ebef"
  desk-deep: "#dfe2e7"
  ink: "#15171c"
  ink-secondary: "#444a55"
  ink-muted: "#626873"
  rule: "#dcdfe4"
  rule-strong: "#c7ccd3"
  tab-blue: "#a9ccf0"
  tab-blue-deep: "#1d5ca3"
  tab-green: "#a8ddb5"
  tab-green-deep: "#1c7442"
  tab-yellow: "#f5d66b"
  tab-yellow-deep: "#7a5c00"
  tab-salmon: "#f4ae95"
  tab-salmon-deep: "#ab3f27"
typography:
  display:
    fontFamily: "Archivo, Arial Narrow, sans-serif"
    fontSize: "clamp(2.875rem, 1.2rem + 5.2vw, 5.75rem)"
    fontWeight: 720
    lineHeight: 0.93
    letterSpacing: "-0.042em"
    fontVariation: "'wdth' 114"
  chapter:
    fontFamily: "Archivo, Arial Narrow, sans-serif"
    fontSize: "clamp(2.75rem, 1.4rem + 4.6vw, 6rem)"
    fontWeight: 750
    lineHeight: 0.9
    letterSpacing: "-0.045em"
    fontVariation: "'wdth' 122"
  headline:
    fontFamily: "Archivo, Arial Narrow, sans-serif"
    fontSize: "clamp(2.125rem, 1.25rem + 2.7vw, 3.5rem)"
    fontWeight: 680
    lineHeight: 0.98
    letterSpacing: "-0.032em"
    fontVariation: "'wdth' 108"
  title:
    fontFamily: "Archivo, Arial Narrow, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 650
    lineHeight: 1.05
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Public Sans, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Fragment Mono, ui-monospace, monospace"
    fontSize: "0.75rem"
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: "0.06em"
rounded:
  hairline: "2px"
  button: "3px"
  sheet: "4px"
  tab: "12px"
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
    rounded: "{rounded.button}"
    padding: "0 22px"
    height: "50px"
  button-primary-hover:
    backgroundColor: "#000000"
  button-line:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.button}"
    padding: "0 22px"
    height: "50px"
  button-on-ink:
    backgroundColor: "{colors.tab-yellow}"
    textColor: "{colors.ink}"
    rounded: "{rounded.button}"
  input:
    backgroundColor: "#ffffff"
    textColor: "{colors.ink}"
    rounded: "{rounded.hairline}"
    padding: "12px 14px"
    height: "50px"
  chip:
    textColor: "{colors.ink}"
    rounded: "{rounded.button}"
    padding: "4px 10px 4px 4px"
---

# Design System: Kreativ Vantage

## Overview

**Creative North Star: "The Operating Manual"**

The site reads like a well-made company operations manual for a small business. Paper-white pages sit on a cool grey desk. Each service is a chapter, marked by a coloured index tab the way real divider stock is, and the cover shows work routing itself between the tools a business already has. The tone is calm, exact and plain-spoken: owners should feel they are reading something organised by people who document everything.

Colour is functional. The four tab stocks are the only colours on the page and each belongs to exactly one chapter, so colour always answers "which service is this?". Ink black carries every primary action. Motion is physical and damped: letters assemble into headings, paper cards fly between trays and land with a squash, divider sheets stack as you scroll. Everything still reads with motion turned off.

The previous dark, neon, gradient "agency" look is the anti-reference.

**Key Characteristics:**
- Paper on a desk: white page bands alternate with grey desk bands.
- Four index-tab colours, one per service chapter, never decorative.
- Expanded grotesk display type with tight tracking; plain workhorse body.
- Mono only for data: times, prices, phone numbers, revisions, field and spec labels.
- Solid lines mean automated; dashed lines mean done by hand.

## Colors

A restrained neutral system with a full four-colour palette of index-tab stock, each colour bound to one chapter.

### Primary
- **Ink** (#15171c): body text, primary buttons, rules that carry structure (1.5px), the closing panel ground.

### Secondary
- **Website Blue** (#a9ccf0): chapter 1, Websites. Deep variant (#1d5ca3) for text and focus rings on paper.
- **Platform Green** (#a8ddb5): chapter 2, Online stores and portals. Deep #1c7442.
- **Automation Yellow** (#f5d66b): chapter 3, Automation and AI. Also text selection and the primary button on the ink panel. Deep #7a5c00.
- **Care Salmon** (#f4ae95): chapter 4, Care and training. Deep #ab3f27, also the error colour.

### Neutral
- **Paper** (#fcfcfd): the page. Cool, never cream.
- **Desk** (#e9ebef): alternate bands, the chapter stack's ground, footer, sidebar cards.
- **Secondary Ink** (#444a55): supporting copy.
- **Muted Ink** (#626873): captions, labels, metadata. Passes 4.5:1 on paper.
- **Rule** (#dcdfe4) and **Strong Rule** (#c7ccd3): hairlines and image borders.

### Named Rules
**The One Tab, One Chapter Rule.** A tab colour appears only where its chapter is meant: its divider, its service page header, its chips, its log chip, its 3D tray. Never as decoration or emphasis.

**The Tinted Secondary Rule.** Secondary text on a tab colour is ink mixed toward that tab (`color-mix(in oklab, ink 84%, tab)`), never grey.

## Typography

**Display Font:** Archivo, variable width (Arial Narrow fallback)
**Body Font:** Public Sans (system-ui fallback)
**Label/Mono Font:** Fragment Mono

**Character:** an industrial manual-cover grotesk, stretched wide and set tight, over a plain civic text face built for forms and documentation. The mono is the manual's data voice.

### Hierarchy
- **Display** (720, wdth 114, clamp 2.875 to 5.75rem, 0.93): the cover H1 and page H1s, max about 16ch.
- **Chapter** (750, wdth 122, up to 6rem, 0.9): divider sheet titles and chapter numerals.
- **Headline** (680, wdth 108, clamp 2.125 to 3.5rem, 0.98): section headings.
- **Title** (600 to 650, 1.125 to 1.5rem): case files, FAQ questions, list heads.
- **Body** (400, 17px, 1.6): copy at 44 to 68ch.
- **Label** (Fragment Mono 400, 12px, 0.06em, uppercase): spec terms, field labels, table heads, footer headings.

### Named Rules
**The Assembling Letters Rule.** Display and headline text may decode from noise into place once, on load or on first view. The real text is always in the HTML first, glyph widths are locked so nothing reflows, and reduced motion skips it.

**The Data-Only Mono Rule.** Fragment Mono is for times, prices, phone numbers, revisions, counts and labels. Never for headings or paragraphs.

## Layout

A 1240px container with a fluid gutter (16 to 44px). Sections alternate paper and desk bands with generous vertical rhythm (80 to 144px). Section heads are a two-column grid: heading left (7fr), supporting line right (5fr), bottom aligned. They stack below 820px. Content grids are asymmetric (7/5, 4/7, 11/13), never equal thirds of icon cards. On the home page, divider sheets become sticky at 1000px and wider (when the viewport is at least 760px tall), each 12px lower than the last, so the tabs stay visible as a staggered stack. The chapter tab rail is fixed to the right edge at 1280px and wider. The header is a 68px sticky bar, and the nav becomes a full-screen menu below 900px.

## Elevation & Depth

Mostly flat paper with one soft sheet shadow for anything that sits on the desk.

### Shadow Vocabulary
- **Sheet** (`box-shadow: 0 1px 1px rgb(21 23 28 / 0.04), 0 14px 34px -16px rgb(21 23 28 / 0.24)`): screenshots, the example log, the price table, the before/after panel, the handover document.
- **Divider stack** (`box-shadow: 0 -1px 0 rgb(21 23 28 / 0.05), 0 -18px 40px -28px rgb(21 23 28 / 0.45), 0 24px 40px -30px rgb(21 23 28 / 0.4)`): divider sheets, so each reads as lying on the one before.

### Named Rules
**The Real Paper Rule.** Depth comes from soft offset shadows and real 3D only. No bevels, embossing, inset "punched" effects or faked materials.

## Shapes

Square-shouldered paper: 2 to 4px corners on sheets, inputs and buttons. The only round shape is the index tab: 12px top corners on chapter tabs, 10px on contents tabs and footer numbers. Structure is drawn with rules. 1.5px ink rules open lists, tables and spec sheets. 1px hairlines separate rows. Dotted leaders (radial-gradient dots) join a title to its summary, as in a table of contents.

## Components

### Buttons
- **Shape:** near-square (3px), 50px tall (40px small).
- **Primary:** ink with paper text, display face 600 at 106% width. Hover goes to pure black, lifts 1px and the trailing arrow slides 3px.
- **Line:** 1.5px ink border, transparent. Hover adds a 6% ink wash.
- **On the ink panel:** primary becomes Automation Yellow. Line becomes a paper border.

### Index tabs (signature)
- Vertical tabs on the right rail, horizontal tabs on divider sheets, square-topped tabs in the contents list and footer. Each carries its chapter numeral at 125% width. The active rail tab slides fully out and gains a deeper shadow.

### Chips
- Tab colour at 55% mixed into paper, with a solid numeral square. They list the chapters a project used.

### Cards / Containers
- No generic cards. Containers are paper sheets on the desk (sheet shadow, 4px), spec tables (`dl` with mono terms), divider sheets, and log records (a 3px yellow top rule).

### Inputs / Fields
- **Style:** white field, 1.5px ink border, 2px corners, 50px tall, mono uppercase label above.
- **Focus:** border turns Website Blue Deep with a 3px tinted ring.
- **Error:** Care Salmon Deep border and message. Errors say what is wrong and how to fix it.
- **Picks:** checkbox tiles that fill with their chapter's tab colour when checked.

### Navigation
- Header: brand mark and wordmark, four text links (current page underlined 2px), mono phone, ink "Start a project". The mobile menu lists chapters as tab-coloured rows, then links, then a full-width call button.

### Example log and 3D trays (signature)
- The cover's routing log is a ruled paper slip: mono time, event, and a station chip in that station's tab colour. A clerk made of characters changes expression as steps complete. It drives the WebGL scene: four rounded trays (Website, CRM, Inbox, Calendar) on transparent ground with soft shadows, joined by solid ink tubes, with paper cards arcing between them. The scene loads after the first interaction or 6 seconds, pauses off screen, and shows one still frame under reduced motion. A flat SVG drawing stands in until then.

## Do's and Don'ts

### Do:
- **Do** give each service its tab colour everywhere it appears, and nowhere else.
- **Do** draw automated paths solid and manual paths dashed.
- **Do** render real text first and animate on top of it. Every effect has a static state.
- **Do** keep primary actions ink, or yellow on the ink panel.
- **Do** label demonstration data as an example, and keep client facts to what was actually built.

### Don't:
- **Don't** use cream or warm paper. The page is cool white (#fcfcfd) on a cool desk (#e9ebef).
- **Don't** add eyebrow labels above headings, gradient text, glass, or neon glows.
- **Don't** fake material with bevels, embossing or inset shadows.
- **Don't** set headings or paragraphs in mono.
- **Don't** build sections out of equal grids of icon cards. Use contents lists, spec sheets, divider sheets and case files.
