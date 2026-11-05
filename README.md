# Bonfire GTM — landing page

Static site (no build step). Deploy on Vercel: Framework preset "Other", no build command, output directory = root.

Links: demo https://cal.com/bonfiregtm/demo · waitlist https://forms.gle/EdGWZGEn91CfFPFG7

## Shared styles (keep pages from drifting)
- `assets/site.css`: fonts (local Geist), colour + type tokens, headings, body copy, buttons, section rhythm, FAQ. Every page loads it first.
- `assets/chrome.css` + `assets/chrome.js`: announcement bar, header, Product dropdown, footer. Self-contained (own tokens), so page CSS can't resize it. Also copied into the blog by `blog-cms/scripts/sync_chrome.py`.
- `assets/site.js`: announcement dismiss, header hairline on scroll, mobile menu.
- `partials/header.html`, `partials/footer.html`: inlined verbatim into every page between the `<!-- partial:... -->` markers.
- Page files keep only their own section styles.
