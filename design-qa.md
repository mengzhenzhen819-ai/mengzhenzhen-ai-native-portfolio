# Design QA — Lighthouse project image replacement

- Source visual truth: `/var/folders/ym/1d49hm_s62g2v_0zw4ljscdw0000gn/T/codex-clipboard-3251b405-5286-4c56-8fec-0d60d0495172.png`
- Implementation screenshot: `/Users/dundun/Documents/Codex/2026-09-22/https-kuldar-com-https-kuldar-com/prototype/implementation-lighthouse.png`
- Focused implementation crop: `/Users/dundun/Documents/Codex/2026-09-22/https-kuldar-com-https-kuldar-com/prototype/implementation-lighthouse-card.png`
- Viewport: 1280 × 720 CSS px
- Source pixels: 986 × 728
- Implementation media: 495 × 363 CSS px at device scale 1
- Normalization: source viewed proportionally at the implementation width; `object-fit: cover` produces only a negligible vertical edge crop caused by the 1.354 vs 1.364 aspect-ratio difference.
- State: default project-card state

## Full-view comparison evidence

The updated page was opened in the Codex in-app browser at `http://localhost:4175/`. The target card now uses the supplied bitmap directly. The surrounding two-column project layout, card border, copy area, spacing, and neighboring cards remain unchanged.

## Focused region comparison evidence

The source image and the focused 495 × 363 implementation crop were opened together in one comparison input. The composition, typography embedded in the image, orange corner shape, phone, hand, background, color, and copy are preserved from the supplied source. No independent HTML/CSS reconstruction remains inside this image.

## Required fidelity surfaces

- Fonts and typography: all image typography comes directly from the supplied bitmap; no substitution.
- Spacing and layout rhythm: the image fills the existing 495 × 363 media slot without changing card spacing.
- Colors and visual tokens: original image colors are preserved; the card shell remains unchanged.
- Image quality and asset fidelity: the supplied 986 × 728 PNG is used directly and downscaled by the browser.
- Copy and content: image copy exactly matches the supplied source.

## Findings

No actionable P0, P1, or P2 differences remain for the requested image replacement.

## Comparison history

1. Earlier implementation assembled separate title and phone layers, causing overlap and crop differences.
2. Fix: removed the layered reconstruction and replaced it with the user's complete PNG as a single image.
3. Post-fix evidence: focused browser crop matches the source composition and content.

## Verification

- Browser-rendered implementation captured successfully.
- Page console warnings/errors checked: none.
- Existing project-card hover behavior remains attached to the replacement image.
- Production build and packaging tests are run as the final verification step.

final result: passed
