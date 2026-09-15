# Enactive.app

A responsive landing page for **Enactive**, a desktop environment for AI agents. The site introduces the application through interactive previews of its workspace, model providers, and execution logs.

[Website](https://enactive.app) · [Application repository](https://github.com/StasEdward/Enactive) · [Documentation](https://enactive.dev/wiki/)

This repository contains the marketing website. The desktop application is maintained in the separate application repository linked above.

## Features

- Responsive layout with full-width navigation and footer bars.
- Interactive workspace, provider settings, and log previews.
- Simulated task execution with execution, artifact, and timeline tabs.
- Animation pause and replay controls, with reduced-motion support.
- Keyboard navigation for preview tabs and a skip-to-content link.
- Local SVG brand assets and bundled fonts.

The previews use sample data in the browser. They do not connect to AI providers, execute tasks, or modify project files.

## Technology

Plain HTML, CSS, and JavaScript. No framework, package installation, build step, backend, or API keys are required.

## Getting started

Clone the repository:

```bash
git clone https://github.com/StasEdward/enactive_app.git
cd enactive_app
```

Serve the repository root with Python 3:

```bash
python -m http.server 5188 --bind 127.0.0.1
```

On Ubuntu, use `python3` instead of `python` if needed.

Open [http://127.0.0.1:5188/](http://127.0.0.1:5188/) in a modern browser. Stop the server with `Ctrl+C`.

## Project structure

```text
.
├── index.html                 # Landing page content and preview markup
├── styles.css                 # Page styling and responsive layouts
├── assets/
│   ├── landing.js             # Preview interactions and simulated execution
│   ├── brand.css              # Brand colors, typography, and design tokens
│   ├── fonts.css              # Local font definitions
│   ├── fonts/                 # WOFF2 fonts and their license notices
│   ├── favicon.svg            # Browser icon
│   ├── mark-loop.svg          # Brand symbol
│   ├── wordmark.svg           # Wordmark for dark backgrounds
│   ├── wordmark-light.svg     # Alternate wordmark for light backgrounds
│   └── og.png                 # Social sharing image
└── README.md
```

## Development

- Edit `index.html` for copy, links, navigation, and preview structure.
- Edit `styles.css` for layout, text sizes, colors, and mobile breakpoints.
- Edit `assets/landing.js` for the demonstration sequence and tab behavior.
- Use `assets/brand.css` and `assets/fonts.css` for shared brand styling.

Reload the browser after editing. Use a hard refresh if cached styles or images remain visible.

## Validation

There is currently no automated test suite or build command. If Node.js is installed, check JavaScript syntax with:

```bash
node --check assets/landing.js
```

Before publishing, check:

- Desktop and mobile layouts, including navigation and enlarged text.
- All three previews, task detail tabs, pause, and replay.
- Keyboard navigation and the system reduced-motion preference.
- Internal anchors, external documentation links, and asset loading.
- Page metadata and the social sharing image URL.

### Documentation links

Documentation is hosted separately at `https://enactive.dev/wiki/`; this repository does not include a local `wiki/` directory. Some links in `index.html` still reference that directory. Update those links to the corresponding hosted documentation pages before publishing. The Open Graph image URL also currently points to `enactive.dev`; review it when deploying to `enactive.app`.

## Deployment

Upload `index.html`, `styles.css`, and the complete `assets/` directory to any static web server, keeping their relative paths intact. The server document root must contain `index.html` directly. Do not publish the `.git` directory.

For the Ubuntu setup discussed for this project, the intended document root is `/var/www/enactive.app`, served by Nginx through the existing Cloudflare Tunnel:

```text
https://enactive.app → Cloudflare Tunnel → Nginx → /var/www/enactive.app
```

When Nginx and `cloudflared` run directly on the same host, the tunnel can route to a local HTTP listener such as `http://127.0.0.1:8080`. A containerized tunnel requires an address reachable from its container. Server and tunnel configuration are managed separately and are not included in this repository.

## Contributing

Open an issue or pull request in this repository for website changes. Include a description of the change and, for visual updates, screenshots at desktop and mobile widths. Report desktop application issues in the [application repository](https://github.com/StasEdward/Enactive).

## License

No project-wide license file is currently included in this repository. Bundled fonts have their own license notices in `assets/fonts/`; retain those notices when redistributing the font files.
