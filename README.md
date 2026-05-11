# soban.tech

Personal portfolio website built with Next.js and neobrutalism design.

## Stack

- **Framework:** Next.js 16 (App Router, Turbopack)
- **Styling:** Tailwind CSS v4 + neobrutalism theme
- **UI:** shadcn/ui base components with custom neobrutalism tokens
- **Fonts:** Rubik (headings), Nunito (body), JetBrains Mono (code)
- **Icons:** Lucide React + custom GitHub/LinkedIn SVGs
- **Blog:** Markdown files in `content/blog/` with gray-matter + remark
- **Contact:** EmailJS integration

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Pages

| Route | Description |
|-------|-------------|
| `/` | Hero, skills marquee, experience, projects, loading screen |
| `/blog` | Blog index — reads from `content/blog/*.md` |
| `/blog/[slug]` | Individual blog post with neobrutalism prose |
| `/resume` | Resume with download button |
| `/contact` | Contact form (EmailJS) and social links |
| `/effects` | Text hover effects demo |

## Blog

Blog posts are plain markdown files in `content/blog/` with YAML frontmatter:

```yaml
---
title: "Post Title"
date: "2026-03-15"
excerpt: "Short description."
tags: ["Tag1", "Tag2"]
---
```

Drop an `.md` file in `content/blog/` and it appears on the site automatically.

## Environment Variables

Required for the contact form (EmailJS):

```
NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_xxxxxxx
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_xxxxxxx
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=xxxxxxxxxxxxxx
```

## Resume PDF

Place your resume at `public/Soban_Ejaz_Resume.pdf` for the download button to work.

## Build

```bash
npm run build
npm run start
```

## Deploy

Deployed on [Vercel](https://vercel.com) or any platform supporting Next.js.
