# Pipe Ref

Piping engineering reference: pipe dimensions, flanges, fittings, gaskets, valves, pressure–temperature ratings and design calculators. A static site with no build step and no dependencies.

## What's inside

| Page | Covers |
|---|---|
| `pipe.html` | ASME B36.10M / B36.19M pipe, NPS ½–48 |
| `flanges.html` | ASME B16.5 Class 150–2500 (incl. Class 400): weld neck, slip-on, socket weld, threaded, lap joint, blind |
| `butt-weld-fittings.html` | ASME B16.9 elbows, tees, reducers, caps, returns, NPS ½–48 |
| `gaskets.html` | ASME B16.20 spiral wound gaskets, all classes |
| `pt-ratings.html` | ASME B16.5 ratings, Material Groups 1.1, 2.1, 2.2 |
| `socket-weld-npt.html`, `valves.html`, `line-blinds.html` | B16.11, B16.10 / B16.34, B16.48 |
| `calculators.html`, `size-sheet.html`, others | Wall thickness, flange class, bolt length, spans, spacing, access checks |

All engineering data lives in `assets/app.js`; interface code in `assets/ui.js`; styles in `assets/app.css`. Fonts (Geist) are self-hosted in `assets/fonts`.

## Run locally

Open with any static server (opening the files directly with `file://` blocks the fonts):

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Deploy

**GitHub Pages:** push this folder to a repository's `main` branch, then in *Settings → Pages* set *Source* to **GitHub Actions**. The included workflow (`.github/workflows/pages.yml`) publishes the site on every push. All links are relative, so it works at `https://<user>.github.io/<repo>/`.

**Netlify:** connect the repository (or drag the folder into Netlify). `netlify.toml` publishes the root with no build command.

## Data and standards

Values are taken from ASME B16.5, B16.9, B16.20, B36.10M and related standards as published by manufacturers and reference sites, and cross-checked where possible. Verify critical values against the edition of the standard your project specifies. Standards are the property of their publishers.
