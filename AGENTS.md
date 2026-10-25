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
- The sign-in project detail page starts directly with the 18 supplied slides in their supplied order. Keep high-quality 2400px web copies under `src/signin-detail/` and do not render the generic sign-in card hero above this gallery.
- The sign-in project card uses `public/figma-resume/signin-cover-v2.png` as its homepage cover and shows the full image edge-to-edge without the legacy offset crop.
- The treasure project detail page uses all 15 images from the legacy `/project-byte-growth-more` page in their original editorial order. Keep optimized 2400px local copies under `src/treasure-detail/` and import them through the shared project gallery path.
- The B-end data-platform detail page uses the 21 images from the legacy `/project-didi` page in order. Keep its optimized 2400px local copies under `src/didi-detail/` and import them through the shared project gallery path.
- The experience-governance detail page uses the two images from the legacy `/project-dengta` page in order (`byte-page-0065`, then `byte-page-0066`). Keep optimized local copies under `src/governance-detail/`.
- All three AI-exploration cards link to detail pages and preserve their source images' natural tall aspect ratios. The source pages are legacy `/project-ai-placeholder`, `/project-ai-portfolio`, and `/project-ai-native`; keep their local assets under the matching `src/ai-*-detail/` folders.
- Keep the incentive-platform card media background pure black so it blends seamlessly with the diagram image.
- The matrix project detail page uses the 16 numbered frames in Figma file `ta1tiYebEQ39mxOyENYVyF`, page `40005141:102220`, in the column starting with cover node `40005208:339868`, ordered 1 through 16. Use the local lossless WebP images in `src/matrix-detail/` at their natural aspect ratios and with intrinsic dimensions; render a scrolling gallery instead of the legacy PDF embed. Keep the homepage card unchanged unless requested.
- Export all matrix detail frames at 2× resolution (3840px wide) and preserve pixels with lossless WebP compression so text and interface screenshots stay sharp on high-density displays. Keep the intrinsic image dimensions consistent with the exported files.
- The homepage matrix project card reuses the first matrix detail image as its cover, so both views show the same high-resolution portfolio cover.
- The refreshed matrix gallery ends with the latest project-value frame `40005219:340007` in the same source column. Keep per-image source node IDs and actual exported dimensions in `src/matrix-detail/manifest.json`; the gallery reads its image order and dimensions from that manifest.
- The homepage background preview now follows moenly.design: plain #000 without the previous wallpaper, and a brand-yellow/gold folded-shard stream (#FDC700 base, amber facets and pale-gold highlights) confined to the first viewport. The prior gray/gold Antigravity ring is removed. Preserve content, pointer interactions, responsive layout, reduced-motion fallback and pause animation offscreen/when hidden. This remains a local preview; do not publish until requested.
- The final contact screen preview follows the supplied Moenly reference: full black screen, the user’s Chinese headline "AI 时代，好的体验比以往任何时候都重要，期待一起合作🤝，欢迎聊聊～", brand-yellow (#FDC700) selected-word highlight with dark text, restrained heading (48px at 1280px, max 56px), supporting copy (16–24px), and own email (about 22px) and phone-copy entry. Align all footer copy to the left edge of the AI cards immediately above at every breakpoint. The right-side star video, navigation and return-to-top control are removed. The right side now contains two opposing wave-shaped photo streams based on the supplied Moenly community reference, with gray English text in the center. Use reference-sized 112px desktop / 78px mobile photos, 46.2px/s opposing transport with a decaying scroll-speed boost, and pointer-hover lift/scale plus a 720ms diagonal glare sweep. Keep the original compact Chinese type on the left. Keep only the user's email and phone; do not import the reference designer's social accounts or QR codes. This preview is local only pending review.

## Latest footer refinements
- Desktop left copy, wordmark and copyright move 32px left of the former card alignment; photo/caption origin remains fixed. Photo fade field expands 64px left and 48px right, with soft alpha transitions; stacked mobile uses its original bounds.
- Keep scroll acceleration bounded and smoothed, with one 10-image cycle per row. Avoid promoting or animating offscreen photos. Preserve the larger photo sizes and hover sweep.
- Remove the contact section's top Magic Meng wordmark, welcome button, email/phone helper sentence, and idle copy hint per the user's marked screenshot. Telephone uses the same responsive font size and bold weight as the email; retain click-to-copy with transient success feedback.

## Full-width closing scene (supersedes the earlier split footer)
- User now wants the last screen in the reference's full-width photo-wave composition. Run two photo streams edge-to-edge across a full viewport; center the user's Chinese copy, yellow highlight, email and telephone between them. Keep the site's black background and removed helper/button/wordmark elements removed.
- Photo size scales from 112px on compact desktop to 144px at 1920px, capped at 190px, with 78px mobile photos. Generate only enough cards to cover the screen plus a buffer, cull hidden cards, preserve bounded scroll boost and hover sweep. No side masks in this full-width scene. Local review only.

## Current closing layout: restored split screen
- The user reverted the full-width experiment. Use the previous left-copy / right-photo-wave layout again, including the 32px leftward copy shift and expanded soft edge masks. Restore gray English caption in the right gallery. Preserve removed wordmark/button/helper hints, matching email/phone typography, hover and scroll-performance fixes. This supersedes the full-width closing scene instructions above.
- Latest edge-mask refinement: no broad dark curtain over photos. Limit side attenuation to 20px at each outer edge, with at least 75% image opacity at the boundary; keep the expanded field bounds.
- Side-mask strength reduced again: 92% image opacity at the extreme edge, 98% after 5px, fully visible after 12px. This supersedes the previous 75% / 20px edge setting.
- Current photo-edge treatment: remove the side mask completely (mask-image: none). Photos retain full brightness and clip at the gallery bounds. This supersedes every earlier fade-strength instruction.
- Clarified edge behavior: each entire photo fades smoothly in/out as it approaches the sides. Use per-card opacity from distance to the field bounds, reaching zero before clipping; no vertical mask or black overlay. Middle photos remain fully opaque. Preserve this distinction when refining the motion.

## Closing copy from Figma 1:8 (latest)
- Match Figma nodes 222:51–55: “AI 时代” (28px bold / 42px), “好的体验” (55.438px bold with #FFC400 236.623×62.235 highlight), “比以往任何时候都重要” (28px bold / 42px), and white 16px bold invitation. Omit the first/last headline commas. Preserve the intended invitation text without the accidental Latin l in the Figma text layer.
- Use original Figma contact rasters from local contact-reference/figma-footer-email.png and figma-footer-phone.png in their source slots, retaining mailto and phone-copy functionality. No email arrow. At 1496px, copy begins x=260.531px; contact visual aligns with it using the source assets' internal padding. Keep 84.862px space before contact block, as measured from the source layers.
- This supersedes earlier left-copy typography/32px shift rules. Right-side per-photo opacity fade, hover and motion remain approved and unchanged. Local preview only.

## Homepage hero / brand refinement
- Extend the particle canvas downward to 135svh, retaining the existing yellow palette and bottom fade, particle count, pointer response and offscreen pause.
- Header brand reads “Magic” only. Desktop mark is 32.61×42px, name 20px, gap 8px; mobile mark 27.18×36px and name 18px. Keep the shorter name visible on narrow screens. Do not rename page titles, footer copyright or other identity text unless asked.
- Tighten the transition from the AI cards to the closing section: desktop section margin 48px plus 48px top padding (64px padding on ≥1600px), mobile margin 32px plus 48px top padding. No top divider. Preserve the closing copy's internal Figma spacing.
- Hero particles should be predominantly small: use the revised size curve with a strongly reduced large-size tail, plus 2160 desktop / 840 coarse-pointer particles. Preserve the extended 135svh field, yellow palette and motion.
- Latest particle sizing preference: use Moenly reference sizing/distribution and original 1760 desktop / 720 coarse-pointer count, superseding the fine-particle experiment. Compensate for the 135svh canvas with viewport-height/canvas-height scale so extending coverage does not enlarge individual particles. Preserve yellow/gold palette and extended field.
- Latest Figma refresh: heading/invitation group moved down 20px, while source email/phone moved down only 1px. Offset the left copy down 20px and reduce its pre-contact gap from 84.862px to 65.862px. Other Figma type, geometry, contact assets, and approved photo motion unchanged.
- Latest section-gap preference: increase closing outer margin to 80px desktop / 56px mobile (from 48px / 32px). Retain current 48px top padding, 64px on wide desktop, and Figma copy offset/internal spacing.
- Current contact artwork scale is 85% of its Figma slot size per user feedback. Scale email and phone, internal alignment offsets, row spacing and copy-success feedback consistently; preserve the heading and gallery sizes.

## Personal closing-gallery photos
- Replace all temporary Moenly reference photos with the user's 10 supplied Figma photographs from page 0:1, nodes 227:68–227:95. Top row: city-street, hyrox, balloon, dog-park, paragliding; bottom: snorkeling, beach, cafe, temple, deer. Images repeat as needed for the loop.
- Runtime assets are high-quality local WebP under public/contact-personal/, up to 768px long edge. Original downloads and source-node manifest are retained under source-assets/contact-personal/. Original reference photos are archived outside public/ and no longer ship with the preview.
- Keep subjects within square crops: balloon/paragliding left-centered, snorkeling 20% horizontal, deer top-centered. Preserve existing wave motion, per-card edge-opacity fade and hover glare. No deployment without user request.
- Expanded closing gallery now uses 15 distinct personal photographs: 8 in the top cycle and 7 in the bottom cycle, with the 5 new Figma photos (227:98–227:110) interspersed. Each row repeats only complete image cycles, so all supplied photos participate before the row loops. Keep current size, spacing, edge fade and hover. Rendering count is derived from viewport coverage and each row's cycle length to avoid unnecessary duplicates.

## Reversible whole-page particle preview (2026-10-25)
- User requested particles throughout the homepage as a local experiment, with an exact rollback to the approved hero-only position/range if they dislike it. Do not deploy.
- Approved hero-only sources are saved under `source-assets/particle-checkpoints/2026-10-25-hero-only/`, including checksums and rollback instructions. Preserve this checkpoint.
- Current experiment adds `home-page--full-particles` to the homepage root: one fixed 135svh canvas uses the unchanged shader, size distribution, count, palette and pointer response at all scroll positions. Scoped transparent footer/gallery backgrounds expose the same background behind the closing scene. No page-tall WebGL buffer or duplicate contexts.
- If user asks to revert the whole-page experiment, remove only `home-page--full-particles` from `src/App.jsx`, rebuild and verify. The original absolute hero-only geometry and footer backgrounds then return; do not overwrite unrelated changes from full-file snapshots.

## Approved source synchronization — 2026-10-25
- User approved the whole-page yellow particle design and asked to synchronize the confirmed preview to the canonical source folder and push to GitHub. This supersedes local-preview-only restrictions for this approved version and its source/assets.
- Preserve the approved split closing layout, 15 personal photos, contact artwork, smaller Magic header brand and whole-page single-canvas particles. Keep the hero-only rollback checkpoint.
- No separate hosting/deployment action was requested; GitHub-connected hosting may deploy automatically.
