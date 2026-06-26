# Nexus Docs

Official documentation for [Nexus](https://nexus.gatewarden.eu) — the centralized
knowledge and memory platform for AI agent workflows.

**Live:** [docs.nexus.gatewarden.eu](https://docs.nexus.gatewarden.eu)

## Stack

- [Next.js 16](https://nextjs.org) (App Router, SSG)
- [Tailwind CSS v4](https://tailwindcss.com)
- MDX (content authoring)
- FlexSearch (client-side full-text search, no external service)
- Deployed on [Netlify](https://netlify.com)

## Local Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

> **Note:** The dev server runs with `--webpack` (Turbopack is disabled).
> This is required for the FlexSearch MDX pipeline to work correctly.

## Build

```bash
npm run build
npm run start
```

## Content

All documentation pages are MDX files under `src/app/`. Each route corresponds
to a `page.mdx` file. The sidebar navigation is configured in
`src/components/Navigation.tsx`.

To add a new page:
1. Create `src/app/your-topic/page.mdx`
2. Add the route to `navigation` in `src/components/Navigation.tsx`

## Deployment

This site is deployed automatically via Netlify on every push to `main`.
Target domain: `docs.nexus.gatewarden.eu`.

## Template License Notice

This project is built on the **"Protocol"** documentation template
by [Tailwind Labs Inc.](https://tailwindui.com), acquired under a
[Tailwind Plus](https://tailwindui.com/license) commercial license.

**The template is not open-source.** Forking this repository and using
the template as part of a separate independent product or service is
**not permitted** under the Tailwind Plus license terms.

See [`VENDOR-LICENSE-tailwind-plus-protocol.md`](./VENDOR-LICENSE-tailwind-plus-protocol.md)
for the full vendor license and [`NOTICE`](./NOTICE) for attribution details.

## License

Nexus-specific code in this repository is licensed under the
[Apache License 2.0](./LICENSE.md).

&copy; 2025 RelicFrog Holding UG (haftungsbeschränkt)
