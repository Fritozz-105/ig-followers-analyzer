# Zooch IG Analyzer — Instagram Follower Insights

A privacy-focused Instagram follower analysis tool that helps you understand your Instagram network. All data processing runs entirely in your browser — **nothing is ever uploaded to a server**.

## Features

- **ZIP File Upload** — Upload your Instagram data export ZIP file directly (no extraction needed)
- **Comprehensive Analysis**
  - See who doesn't follow you back
  - Find mutual connections
  - Discover fans (followers you don't follow back)
  - Follow-back rate calculation
- **Dynamic Insights** — Personalized insights based on your data including connection quality, follow ratio, and engagement potential
- **Privacy First** — 100% client-side processing; your data never leaves your device
- **Modern UI** — Premium dark theme with animated hero, grid patterns, and responsive layout
- **Error Handling** — Error boundary for graceful crash recovery
- **Security Hardened** — Security headers (X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy), input sanitization, and file size validation

## How to Use

1. **Export your Instagram data** — Go to Instagram Settings → Account Center → Your Information and Permissions → Export your information
2. **Configure the export** — Select "Followers and Following", set format to **JSON**, data range to **All Time**
3. **Download the ZIP** — Instagram will email you when the export is ready
4. **Upload to the analyzer** — Drop the ZIP file into the upload area
5. **View results** — See your detailed follower analysis, mutual connections, and personalized insights

## Tech Stack

| Technology | Purpose |
|---|---|
| [Next.js 16](https://nextjs.org/) | React framework with App Router |
| [React 19](https://react.dev/) | UI library with TypeScript |
| [Tailwind CSS 4](https://tailwindcss.com/) | Utility-first CSS styling |
| [JSZip](https://stuk.github.io/jszip/) | Client-side ZIP file extraction |
| [Framer Motion](https://www.framer.com/motion/) | Animations (via `motion` package) |
| [Lucide React](https://lucide.dev/) | Icon library |
| [Radix UI](https://www.radix-ui.com/) | Accessible UI primitives |

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout with metadata, fonts, error boundary
│   ├── page.tsx            # Main page with hero, upload, and results views
│   └── globals.css         # CSS variables and Tailwind imports
├── components/
│   ├── ErrorBoundary.tsx   # React error boundary for crash recovery
│   ├── FileUpload.tsx      # ZIP file upload with validation and parsing
│   ├── Footer.tsx          # Site footer
│   ├── InstructionsModal.tsx # First-visit instructions modal
│   ├── Results.tsx         # Analysis results with insights
│   └── ui/
│       ├── animated-grid-pattern.tsx  # SVG animated background
│       ├── button.tsx      # Reusable button component (CVA variants)
│       └── hero.tsx        # Animated hero section with canvas beams
├── data/
│   ├── howItWorks.ts       # "How It Works" step content
│   └── modalContent.ts     # Instructions modal content
├── lib/
│   └── utils.ts            # Utility functions (cn for class merging)
└── types/
    └── index.ts            # TypeScript interfaces
```

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Building for Production

```bash
npm run build
npm run start
```

## Security

- All processing is done client-side — no data is transmitted to any server
- File upload validates both file type and size (max 500MB)
- Usernames are sanitized before being used in URLs to prevent injection
- Security headers configured: `X-Frame-Options`, `X-Content-Type-Options`, `X-XSS-Protection`, `Referrer-Policy`, `Permissions-Policy`
- No authentication required — no user accounts or credentials stored
- Error boundary prevents sensitive error details from leaking to users

## License

This project is private.
