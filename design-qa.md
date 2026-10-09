# Design QA — 工作经历左侧对齐

- Source visual truth: `/var/folders/ym/1d49hm_s62g2v_0zw4ljscdw0000gn/T/codex-clipboard-0bb8ec36-427c-4330-889b-cdb475ab64fa.png`
- Implementation evidence: Codex in-app browser capture of `http://localhost:4177/`
- Viewport: 1496 × 900 CSS px
- Source pixels: 1134 × 846
- Implementation component: 1001px-wide experience shell at device scale 1
- Normalization: focused comparison of the experience-card top area; browser chrome and surrounding page content excluded
- State: desktop, experience section expanded

## Full-view comparison evidence

The existing page layout and experience-card proportions remain unchanged. The requested change is limited to the left alignment inside the first work-experience item.

## Focused region comparison evidence

The supplied annotation and the updated browser-rendered region were compared at the same desktop state. The year, company name, and four bullet markers share one left origin. The list copy follows the Figma reference with a 17px indent.

## Required fidelity surfaces

- Fonts and typography: existing font family, sizes, weights, line heights, and text content are unchanged.
- Spacing and layout rhythm: year, company name, and bullet markers are unified on one vertical axis; list copy uses the Figma-matched 17px indentation.
- Colors and visual tokens: unchanged.
- Image quality and asset fidelity: the existing yellow source icon remains unchanged.
- Copy and content: unchanged.

## Findings

No actionable P0, P1, or P2 differences remain for the requested alignment relationship.

## Comparison history

1. Earlier pass retained a 0.26px offset on the experience body to mirror raw Figma coordinates.
2. The user's annotated alignment clarified that these elements should share one visual baseline.
3. First fix: removed the body offset while preserving the 31.5px card inset.
4. Clarification: the four bullet markers—not the list copy—should align with the company title.
5. Final fix: reduced the marker-to-copy distance from 27px to the 17px spacing measured from Figma, while keeping the marker on the company-title axis.

## Verification

- Browser-rendered focused region captured successfully in the Codex in-app browser.
- Production build completed successfully.
- No surrounding layout, content, or interactions were changed.

final result: passed
