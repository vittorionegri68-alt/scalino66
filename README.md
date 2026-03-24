# Scalino 66 — Website

Design Style: Italian Heritage (#8)
Property: Bilocale nel Centro Storico di Cesena
Airbnb: https://www.airbnb.it/rooms/1388960535225462602

## Run locally

```bash
npm install
npm run dev
```

## Deploy on Vercel

1. Create GitHub repo `scalino66`
2. Push all files
3. Connect to Vercel → Import repo
4. Vercel auto-detects Vite — deploy with default settings
5. URL: `scalino66.vercel.app` (or custom domain)

## Key files

| File | Purpose |
|------|---------|
| `src/config.js` | Airbnb URL and property constants |
| `src/contact_info.js` | Phone, email, address, Instagram |
| `src/App.jsx` | Full site — all sections |
| `index.html` | SEO meta tags + schema markup |
| `public/sitemap.xml` | Google sitemap |
| `public/robots.txt` | Crawler rules |

## Customise images

All images use Unsplash placeholders. To replace:
- Hero images: update `HERO_1` and `HERO_2` constants in `App.jsx`
- Room gallery: update `ROOMS` array in `App.jsx`
- Lifestyle section: update `LIFESTYLE` array in `App.jsx`

## Sections

1. Hero — value proposition + dual CTA
2. Apartment — gallery + amenities + story of the name
3. Experience — lifestyle cards + distances
4. How It Works — 4 steps
5. Testimonials — 4 reviews + rating
6. Location — distances + neighbourhood description
7. About Host — Anna's bio
8. Final CTA — conversion push
9. Footer — contact + links
