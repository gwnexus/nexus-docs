# Changelog

All changes to the **nexus-docs site** itself (content, structure, navigation, build). Changes to the Nexus platform are documented on the [/changelog](/src/app/changelog/page.mdx) page.

---

## 2026-07-14

- `mcp-server`: sync to nexus-mcp v0.10.3 — bump version ref, correct tool count to 62, Layer 1 to 6 tools, Layer 2 to 48 tools, add `project_update` entry, add Schema Version Envelope section
- `mcp-tools`: update stub tool count to 62
- `changelog`: add v0.10.3 entry; remove doc-site-internal artefacts (`Docs: Corrected Tool Count`) from changelog — doc-site changes belong here only
- `changelog`: remove Nexus Docs Site launch note from v0.9.1 — doc-site-internal
- `page` (homepage): update "New in" banner to v0.10.3
- `roadmap`: update tool version ref to nexus-mcp v0.10.3
- `cli`: add `nexus run` usage guide, offline mode (`--no-db`), `.nexus/env` vs `.env.nexus.local` table, Headroom troubleshooting section
- `quickstart`: add step 4 — Headroom / cost control setup
- `workspaces`: add "Files written by nexus pull" reference table
- `plugins`: expand nexus-headroom-intercept — observed compression ratios, verify transform mode, cache and retrieval docs; remove stale distribution/auto-assignment section

## 2026-06-27

- Initial Nexus documentation site — deployed to docs.nexus.gatewarden.eu
- MDX content for all routes: Getting Started, Tools, Core Concepts, Reference
- FlexSearch build-time index, dark mode, sidebar navigation with scroll-spy
- Built on tailwind-plus-protocol template (Tailwind Plus commercial license)
- Netlify deployment as separate site from nexus-hub (ADR-0001, ADR-0002)

---

## 2025-07-29

- Update to React 19 and Next.js 15.4

## 2025-04-28

- Update template to Tailwind CSS v4.1.4

## 2025-04-17

- Fix header opacity
- Organize imports
- Fix scrolling issues when navigating from the mobile nav ([#1387](https://github.com/tailwindlabs/tailwind-plus-issues/issues/1387), [#1666](https://github.com/tailwindlabs/tailwind-plus-issues/issues/1666))

## 2025-04-10

- Update template to Tailwind CSS v4.1.3

## 2025-03-22

- Update template to Tailwind CSS v4.0.15

## 2025-02-18

- Fix responsive design issue in footer

## 2025-02-10

- Update template to Tailwind CSS v4.0.6

## 2025-01-23

- Update template to Tailwind CSS v4.0

## 2024-11-01

- Fix code block rendering when no snippet language is specified ([#1643](https://github.com/tailwindlabs/tailwind-plus-issues/issues/1643))

## 2024-08-08

- Configure experimental `outputFileTracingIncludes` for hosting on Vercel

## 2024-06-21

- Bump Headless UI dependency to v2.1
- Update to new data-attribute-based transition API

## 2024-06-18

- Update `prettier` and `prettier-plugin-tailwindcss` dependencies

## 2024-05-31

- Fix `npm audit` warnings

## 2024-05-07

- Bump Headless UI dependency to v2.0

## 2024-01-17

- Fix `sharp` dependency issues ([#1549](https://github.com/tailwindlabs/tailwind-plus-issues/issues/1549))

## 2024-01-16

- Replace Twitter with X

## 2024-01-10

- Update Tailwind CSS, Next.js, Prettier, TypeScript, ESLint, and other dependencies
- Update Tailwind `darkMode` setting to new `selector` option
- Fix `not-prose` typography alignment issues
- Add name to MDX search function
- Sort classes

## 2023-10-03

- Add missing `@types/mdx` dependency ([#1512](https://github.com/tailwindlabs/tailwind-plus-issues/issues/1512))

## 2023-09-07

- Added TypeScript version of template

## 2023-08-15

- Bump Next.js dependency

## 2023-07-31

- Port template to Next.js app router

## 2023-07-24

- Fix search rendering bug in Safari ([#1470](https://github.com/tailwindlabs/tailwind-plus-issues/issues/1470))

## 2023-07-18

- Add 404 page
- Sort imports and other formatting

## 2023-05-16

- Bump Next.js dependency

## 2023-05-15

- Replace Algolia DocSearch with basic built-in search ([#1395](https://github.com/tailwindlabs/tailwind-plus-issues/issues/1395))

## 2023-04-11

- Bump Next.js dependency

## 2023-03-29

- Bump Tailwind CSS and Prettier dependencies
- Sort classes

## 2023-03-22

- Bump Headless UI dependency

## 2023-02-15

- Fix scroll restoration bug ([#1387](https://github.com/tailwindlabs/tailwind-plus-issues/issues/1387))

## 2023-02-02

- Bump Headless UI dependency

## 2023-01-16

- Fixes yarn compatibility ([#1403](https://github.com/tailwindlabs/tailwind-plus-issues/issues/1403))
- Bump `zustand` dependency

## 2023-01-07

- Enable markdown table support in using `remark-gfm` plugin ([#1398](https://github.com/tailwindlabs/tailwind-plus-issues/issues/1398))
- Fix SVG attribute casing ([#1402](https://github.com/tailwindlabs/tailwind-plus-issues/issues/1402))

## 2023-01-03

- Fix header disappearing in Safari ([#1392](https://github.com/tailwindlabs/tailwind-plus-issues/issues/1392))

## 2022-12-17

- Bump `mdx-annotations` dependency

## 2022-12-16

- Fix scroll jumping issue with Dialog in Safari ([#1387](https://github.com/tailwindlabs/tailwind-plus-issues/issues/1387))
- Update "API" item in header navigation link to home page
- Bump Headless UI dependency

## 2022-12-15

- Initial release
