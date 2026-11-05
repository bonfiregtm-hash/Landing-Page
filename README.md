# Bonfire GTM — landing page

Static site (no build step). Deploy on Vercel: Framework preset "Other", no build command, output directory = root.

Links: demo https://cal.com/bonfiregtm/demo · waitlist https://forms.gle/EdGWZGEn91CfFPFG7

## Shared styles (keep pages from drifting)
- `assets/site.css`: fonts (local Geist), colour + type tokens, headings, body copy, buttons, section rhythm, FAQ. Every page loads it first.
- `assets/chrome.css` + `assets/chrome.js`: announcement bar, header, Product dropdown, footer. Self-contained (own tokens), so page CSS can't resize it. Also copied into the blog by `blog-cms/scripts/sync_chrome.py`.
- `assets/site.js`: announcement dismiss, header hairline on scroll, mobile menu.
- `partials/header.html`, `partials/footer.html`: inlined verbatim into every page between the `<!-- partial:... -->` markers.
- Page files keep only their own section styles.

## Feature pages
`/lead-lists`, `/verification`, `/deliverability`, `/linkedin`, `/replies`, `/meetings`, `/client-workspaces`, `/reports`: one folder each, styled by `assets/feature.css` (shared section + mockup patterns, mirroring /agents and /plays).
They are generated: edit copy in `site/tools/features_content.py` (facts only from blog-cms/docs/bonfire-facts.md), then
`python3 ../tools/build_features.py . && python3 ../tools/inline_partials.py . && python3 ../tools/seo_head.py .` (the second step re-inlines the header/footer partials into every page; the third normalises the SEO head).
The Product dropdown groups pages as Engine (Agents, Flows, Plays) / Outreach (Lead lists, Verification, Deliverability, LinkedIn) / Pipeline (Replies, Meetings, Reports, Client workspaces).

## SEO (technical)
- `site/tools/seo_head.py SITE_DIR` is the single source of truth for every page's `<title>` (<=60), meta description (<=155), canonical (`https://bonfiregtm.com/<page>/`, trailing slash), Open Graph + Twitter tags (`/assets/og.png`, 1200x630), favicons (`/favicon.ico`, `/assets/app-icon.png`, `/apple-touch-icon.png`) and the home JSON-LD (Organization, WebSite, SoftwareApplication; no price/ratings). It also points internal page links at the trailing-slash URL and rewrites `sitemap.xml`. Run it after any page edit; `--check` reports drift. It leaves other head tags alone (e.g. the Google Search Console `google-site-verification` meta on home).
- Root files: `robots.txt` (all allowed, AI crawlers named, both sitemaps), `sitemap.xml` (12 pages), `llms.txt` (facts from blog-cms/docs/bonfire-facts.md only), IndexNow key file `<key>.txt` (key also in `site/tools/indexnow_key.txt`).
- After a deploy is live: `python3 site/tools/indexnow_ping.py` submits every URL from both sitemaps to api.indexnow.org.
- Adding a page: add it to `PAGES` in seo_head.py (title, description, OG description) and to llms.txt.
