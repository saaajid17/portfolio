# Sajid's Portfolio

Personal portfolio for **Readowanul Haque Sajid** — CSE Student at BRAC University, ML/AI enthusiast.

## Stack

- **Next.js 14** — React framework
- **TypeScript** — Type safety
- **Tailwind CSS v4** — Styling
- **Framer Motion** — Physics animations throughout
- **Three.js / React Three Fiber** — 3D particle figure in hero
- **Lenis** — Smooth scroll

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Deploy to Vercel (Recommended)

1. Push this repo to GitHub
2. Go to [vercel.com](https://vercel.com) → New Project
3. Import your GitHub repo
4. Click Deploy — done ✓

No extra config needed. Vercel auto-detects Next.js.

## Deploy to GitHub Pages

Since this is a Next.js app with dynamic features, Vercel is strongly recommended.
If you need GitHub Pages, you'll need to export statically:

```bash
# In next.config.mjs, add:
# output: 'export'

npm run build   # generates /out folder
# Then push /out to gh-pages branch
```

## Project Structure

```
├── app/
│   ├── layout.tsx       ← Fonts, metadata
│   ├── page.tsx         ← Assembles all sections
│   └── globals.css      ← CSS variables, Tailwind
│
├── components/
│   ├── HeroScene.tsx    ← Three.js 3D particle figure
│   ├── Hero.tsx         ← Hero section
│   ├── About.tsx        ← About + parallax photo
│   ├── Journey.tsx      ← Weekly tracker + roadmap
│   ├── Projects.tsx     ← 3D tilt project cards
│   ├── Research.tsx     ← Research interests
│   ├── Skills.tsx       ← Animated skill bars
│   ├── Contact.tsx      ← Contact section
│   ├── Nav.tsx          ← Navigation
│   ├── Cursor.tsx       ← Custom physics cursor
│   ├── MagneticBtn.tsx  ← Magnetic hover effect
│   ├── Reveal.tsx       ← Scroll reveal with spring
│   └── SectionLabel.tsx ← Reusable section eyebrow
│
└── public/
    └── sajid.jpg        ← Your photo
```

## Updating Content

- **Add a project** → Edit `components/Projects.tsx`, add to the `projects` array
- **Update journey** → Edit `components/Journey.tsx`, weeks/semesters arrays
- **Add a skill** → Edit `components/Skills.tsx`, technical or certs arrays
- **Change contact** → Edit `components/Contact.tsx`
- **Add LinkedIn** → In `Contact.tsx`, add to the social links array

## Physics & Animation Notes

- **Magnetic buttons** — every CTA uses `MagneticBtn.tsx`
- **Scroll reveals** — every section uses `Reveal.tsx` with spring physics
- **3D tilt** — project cards tilt in 3D on hover (`Projects.tsx`)
- **Parallax** — photo in About section has scroll parallax
- **3D figure** — particle system in `HeroScene.tsx`, responds to mouse
- **Floating icons** — research cards have looping float animation
- **Skill bars** — spring-eased width animation on scroll into view
- **Smooth scroll** — Lenis in `app/page.tsx`
