# Prototype Instructions

Run the local server yourself and open the preview in the browser available to this environment. Do not give the user server-start instructions when you can run it.

Before making substantial visual changes, use the Product Design plugin's `get-context` skill when the visual source is unclear or no longer matches the current goal. When the user gives durable prototype-specific design feedback, preferences, or decisions, record them in `AGENTS.md`.

When implementing from a selected generated mock, treat that image as the source of truth for layout, component anatomy, density, spacing, color, typography, visible content, and hierarchy.

Build app UI in `src/`. Keep `.openai/hosting.json`, `worker/index.js`, `scripts/prepare-sites-build.mjs`, and `tests/sites-worker.test.mjs` intact so the same local prototype can be handed to Sites. Before a Sites handoff, run `npm run build` and `npm run test:sites`; the build must leave `dist/client/index.html`, `dist/server/index.js`, and `dist/.openai/hosting.json`.

## Current design source

- Treat Figma file `sEfVYSUpkr3Ss0rU2jSnZA`, node `1:8`, as the visual source of truth.
- Match its Chinese copy, dark two-column portfolio layout, spacing, radii, typography, and supplied imagery closely.
- Preserve the interaction language from the prior local portfolio prototype: restrained reveal motion, tactile hover lift/tilt, draggable decorative stickers, copy feedback, and an expandable work-experience panel.
- The header like control is cumulative rather than toggleable: every press increases the count, the heart stays yellow in every state, and each press replays the count/button/heart feedback animation.
- The latest profile-card layout uses the Figma `4:87` geometry: the card sits 8px inside the left hero column, the portrait extends 24px beyond the card's right edge, body copy is 17px/24.75px, the title rule is 214×1px in #404040, and the four tags sit at x=32.84px/bottom=43.08px with 14px type, 8px gaps, and 8px horizontal padding.
- The project-experience section follows the latest Figma card nodes (`40:302`, `1:312`, `1:320`, `1:336`, `1:344`, `5:159`, `1:360`): four cards in the left column, three in the right, per-card media/card heights, a ~26px column gap, and six 58px-tall capability tags with individual widths.
- The lighthouse project detail page uses all 43 images from the legacy `/project-ali` page in its original editorial order. Keep local optimized 2400px copies under `src/ali-detail/` and import them with Vite so the new site does not depend on the old deployment.
- The B-end data-platform detail page uses the 21 images from the legacy `/project-didi` page in order. Keep its optimized 2400px local copies under `src/didi-detail/` and import them through the shared project gallery path.
