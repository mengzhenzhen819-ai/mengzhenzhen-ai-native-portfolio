# Homepage background preview QA

final result: passed

Scope: replace the wallpaper and previous Antigravity ring with a Moenly-inspired folded-shard stream. Preserve this portfolio's existing typography, images, content and layout. This is a local preview, not a full clone of Moenly and not a deployment.

## Evidence
- Reference: https://moenly.design/; public hero CSS specifies #000, full-width shard stream; blue #1f4dff and violet #fc3dff pearl facets, scale 2.05, speed 0.3, pointer repel.
- Source visual: qa/reference.jpg (1280×720).
- Implementation: http://127.0.0.1:4186/?preview=moenly; qa/desktop.jpg and qa/desktop-final.jpg (1280×720).
- Combined comparison: qa/comparison.jpg (both desktop captures normalized to 640×360 beside each other). Comparison limited to black background and particle shape/palette/distribution; content intentionally differs.
- Mobile: qa/mobile.jpg (390×844); no horizontal overflow. Temporary viewport override reset.
- Focused comparison: source CSS and read-only DOM check confirm body rgb(0,0,0), background-image:none, one new canvas, no .antigravity node. Full-view evidence clearly resolves the sparse folded purple/blue particle shapes, so another focused crop is unnecessary.

## Findings and comparison history
- Initial preview verification exposed a stale dev-module/React cache error and blank page. Switched the preview to the built bundle, verified complete rendered content and recaptured it. No errors or warnings from the built preview. Old dev-module logs were retained by the browser but refer to the preceding broken dev route, not this build.
- Final background comparison: no actionable P0/P1/P2 differences within the requested scope. Both use pure black with sparse blue/violet folded facets. The old texture and ring are gone.
- P3: Moenly has stronger bloom and multicolor edge dispersion. This local recreation keeps the same folded stream direction and violet/blue material with simpler shading; it does not reproduce its full postprocessing stack or hold-to-gather gesture.

## Required fidelity surfaces
- Typography: existing Satoshi/Chinese fallback, hierarchy and wrapping preserved; not replaced with reference typography.
- Layout rhythm: portfolio cards, spacing, radii and original content retained. Canvas behind content, pointer-events:none, first viewport only.
- Color: body and root #000; source blue/violet material values, no wallpaper. Card contrast retained.
- Image quality: all portfolio imagery unchanged; GPU geometry used for the procedural effect, no raster background or external hotlinks.
- Copy: unchanged.

## Verification
- Browser rendered on desktop and 390px mobile. Canvas present; no overflow.
- Work-experience collapse and expand both verified; existing controls remain above the non-interactive canvas layer.
- Particle positions visibly differ across captures, confirming animation.
- Build passed; existing Sites worker tests 4/4 passed.
- Offscreen/hidden pause and reduced-motion fallback present in code. OS reduced-motion switching and touch-device performance were not simulated in browser.
- Only local preview files changed; no publish, push or canonical-repo edit.

# Contact finale revision — 2026-10-25

final result: passed

## Source and implementation
- Selected target: user screenshot `/var/folders/ym/1d49hm_s62g2v_0zw4ljscdw0000gn/T/codex-clipboard-65b61231-c7ed-4045-a73d-83cc302e780b.png`; copied to `qa/contact-reference.jpg`.
- Local view: http://127.0.0.1:4186/?preview=contact-finale#contact
- Desktop implementation: `qa/contact-desktop-final.jpg`, 1280×720 CSS and image pixels (1:1 screenshot density).
- Mobile implementation: `qa/contact-mobile.jpg`, 390×844 CSS and image pixels.
- Combined comparison: `qa/contact-comparison.jpg`. Source normalized proportionally to 640×325, implementation to 640×360; differing source viewport ratio is explicit, neither is stretched. Compare composition and individual element scale rather than bottom-edge position.
- Focused evidence: browser DOM confirms email mailto href, no overflow, correct thin arrow SVG, active video playback with readyState 4 at 1080×1080 native resolution. Full-view title, contact and star details are readable; no extra crop required.

## Findings and repairs
1. [P2, fixed] Initial footer exceeded the 720px desktop viewport; copyright and return control fell below it. Reduced navigation height, capped video dimensions by viewport height, aligned copy to grid start. Post-fix section height 721px including border, top near 0, full footer visible in final capture.
2. [P2, fixed] An adapted diagonal arrow was too heavy compared with the reference's thin up-arrow. Replaced it with the Tabler outline arrow-up asset, verified correct URL and final rendering.
3. [P2, fixed] The React page did not initially scroll to #contact on direct navigation. Added explicit contact anchor handling after mount; reload now opens the footer at top≈0.
4. No remaining actionable P0/P1/P2 issues in the requested scope. Deliberate changes: user's own brand, email and phone replace reference identity/social profiles, as explicitly requested. Full-site sticky navigation, music and reference designer's social accounts were not imported.

## Fidelity surfaces
- Fonts: local reference Montserrat regular/medium/extrabold for final screen; existing typography elsewhere unchanged.
- Layout: large two-line heading left, blue selection highlight, supporting copy, rounded Say hello label, primary email and own phone, square star animation right; desktop copyright/back-to-top at bottom; mobile stacked without horizontal overflow.
- Color: pure black, off-white foreground, subdued gray copy, #1677ff highlight; original prismatic video.
- Assets: original 1080px local MP4 and poster, source arrow, existing mail/phone icons recolored white, Tabler arrow-up. No hotlinks or handmade substitute for the star.
- Copy: source English headline/intro retained; own contact details; only email and phone per user decision.

## Verification and boundaries
- Browser: desktop and mobile rendered; video playback verified and repeated captures show distinct animation states.
- Phone click feedback verified. Browser clipboard bridge did not expose the OS clipboard contents, so actual cross-application paste was not asserted.
- Email links verified as mailto:15291968365@163.com, without sending email.
- Return-to-top clicked and verified scrollY=0; Contact returns to the footer.
- No warnings/errors in the current production preview bundle. Build passed; worker tests 4/4 passed after final edit.
- Visibility/offscreen/reduced-motion video pause implemented; OS reduced-motion changes not simulated.
- Temporary viewport override reset. Local preview remains open; no publish, push or canonical-repository edits.

## User copy revision
- Replaced the reference English heading and intro with the user's exact Chinese copy: “AI 时代，好的体验比以往任何时候都重要，期待一起合作🤝，欢迎聊聊～”. Highlighted “好的体验” and sized the remaining phrase to preserve the split layout.
- Supporting navigation, email hint and CTA now use Chinese. Own email and phone unchanged.
- Browser captures: `qa/contact-chinese-desktop.jpg` (1280×720) and `qa/contact-chinese-mobile.jpg` (390×844). Copy verified in rendered DOM, no horizontal overflow; desktop footer restored at top≈0. Video retained.
- Build passed. This is a copy/layout-only revision; no additional worker tests required beyond the prior 4/4 pass.
- final result: passed

## Homepage yellow palette revision
- Changed only the hero shader palette to website brand #FDC700 with amber facets and pale-gold highlights. Geometry, density, movement, footer and all interactions unchanged.
- Browser screenshot: `qa/hero-gold-particles.jpg`, 1280×720. Yellow/gold visible on black and consistent with existing yellow heart, logo and stickers. No current bundle console errors/warnings.
- Build passed. Previous purple source retained outside src as `../moenly-reference/hero-purple-preview.jsx`. Local review only.
- final result: passed

## Footer alignment / yellow highlight revision
- Footer copy, wordmark and copyright now align with the left edge of the immediately preceding AI cards. Browser-measured desktop x=156.7734375 for both card and copy (1280px viewport); mobile x=12 for both (390px viewport).
- Removed right-side star video, right navigation and bottom-right control. The prior star version is backed up in `../moenly-reference/contact-star-version.jsx`.
- Highlight and handles use #FDC700; dark text retains readable contrast. Supporting focus/hover accents also use yellow.
- Screenshots: `qa/contact-yellow-aligned.jpg` (1280×720), `qa/contact-yellow-aligned-mobile.jpg` (390×844). Both rendered without horizontal overflow; no right-side elements in DOM. Viewport reset and desktop preview left open.
- Build passed. No new automated tests added for this reversible presentation edit.
- final result: passed

## Footer typography reduction
- Reduced desktop headline from 76.8px to 48px at 1280px (maximum 56px), lead to 24px, follow-up line to 19.968px, body to 16px, and email to 21.76px. Wordmark, icons, highlight handles and spacing were reduced proportionally.
- Browser desktop proof: `qa/contact-refined-type.jpg` (1280×720); mobile proof: `qa/contact-refined-type-mobile.jpg` (390×844), headline 37.05px and email 17.94px.
- Card/footer left edges still both 156.7734375px on desktop. Yellow highlight, removed right side, own copy and contacts retained. No horizontal overflow in either viewport.
- Build passed. Viewport reset; local preview remains open. This is a reversible typography-only edit, no new tests required.
- final result: passed

# Right-side photo-wave gallery — 2026-10-25

final result: passed

- Source: selected user composite `codex-clipboard-eddc6dab-fcc0-468c-8712-f5ee9750d081.png`, retained as `qa/contact-wave-reference.jpg`, and public community scene at https://moenly.design/#works.
- Implementation: http://127.0.0.1:4186/?preview=contact-photo-waves#contact. Full-view evidence `qa/contact-photo-waves.jpg` (1280×720 CSS/image px), mobile `qa/contact-photo-waves-mobile.jpg` (390×844 CSS/image px).
- Focused comparison: `qa/contact-wave-comparison.jpg` puts the selected right-side crop beside the local gallery crop, normalized proportionally to comparable 500px widths. Compared rows, density, wave amplitude, square photo crops and center typography; exact animation phase intentionally differs.
- All 20 reference images are local 256px WebP files; 60 repeated photo elements, all complete with valid intrinsic dimensions in the final desktop check. Source files and attribution under `public/contact-community/`. Reference photos are explicitly temporary preview material, not represented as the owner's photographs.
- Motion: top/bottom rows travel in opposing directions at 24px/sec along sine offsets. Reference's continuous sinusoidal arrangement is recreated; the reference's page-scroll-driven acceleration is omitted for this standalone footer module. No full source navigation/browser frame imported.
- English text uses rgb(136,136,136) on black as requested, with no blue accent. Chinese title remains 48px at 1280px; its left edge still equals the preceding card edge (156.7734375px; mobile 12px).
- Initial validation found unloaded photo slots during lazy loading. Switched this small local photo set to eager loading, confirmed all 60 loaded and recaptured. Refined card size and panel height to match the selected compact composite.
- Browser checks: transformed x position changed from 865.06px to 600.66px between captures, confirming transport; no horizontal overflow at 1280px or 390px; mobile stacks below contacts. No console errors/warnings in current preview. Viewport reset and preview left open.
- Fonts/typography: local Montserrat for gray gallery caption, existing small Chinese scale preserved. Layout/color: left alignment retained, right module fits without covering contacts, existing yellow palette untouched. Images: original reference crops, no placeholders/hotlinks; user copy/contact details unchanged.
- Visibility/hidden-tab pause and reduced-motion static layout implemented; OS preference switching not simulated. Build passed; existing worker tests 4/4 passed.
- No remaining actionable P0/P1/P2 differences for the requested approximate motion/form. No publication or canonical-repository changes.

## Larger photo cards and reference hover — 2026-10-25

- Updated the gallery from the compact composite scale to the reference's actual CSS dimensions: desktop 112px photos with 24px gaps; mobile 78px photos with 14px gaps. Panel height is 500px desktop and 390px mobile. Existing Chinese copy, yellow highlight, and contacts remain unchanged.
- Matched reference transport at 46.2px/sec in opposing directions, its sine frequency/phase/amplitude, and scroll-velocity acceleration with exponential decay. This supersedes the earlier 24px/sec / no-scroll-boost implementation above.
- Added pointer hover: 5px lift, 1.018 scale, subtle brand-yellow shadow, and a 720ms diagonal glare sweep. Touch and reduced-motion preferences skip this hover animation.
- Actual browser pointer interaction confirmed data-hovered=true, interpolated translate/scale, yellow drop-shadow and the 720ms glare transition. Evidence: qa/contact-photo-hover.jpg.
- Desktop evidence: qa/contact-large-photos.jpg (1280×720); mobile: qa/contact-large-photos-mobile.jpg (390×844). No horizontal overflow at either size. All 60 rendered images completed loading; no console warnings/errors. Temporary viewport override reset; local preview kept open.
- Production build passed. No new tests added for this reversible visual/motion adjustment. Reference photo assets remain temporary local preview material. No deployment, push, or canonical repository edits.
- final result: passed

## Softer, wider photo fade — 2026-10-25
- Expanded the photo field 32px left and 48px right, keeping the caption and motion origin fixed. Replaced the narrow 2% edge mask with gradual alpha stops over 40px left / 56px right, allowing photos to continue farther outward before fading.
- Mobile stacked layout retains its original field bounds. Desktop browser confirmed field x=536.77–1265.30 at 1280px, no horizontal overflow. Build passed.
- Evidence: qa/contact-mask-softer-outward.jpg. Local preview only; no deployment.

## Scroll workload and acceleration optimization — 2026-10-25
- Found 60 continuously updated photo nodes and 60 promoted transform layers in the prior footer. Reduced repeated rows to one 10-photo cycle each (20 nodes total); each cycle remains wider than the gallery including fade gutters. Hidden cards skip transform writes. Only visible cards are promoted, and all promotion is released when the module leaves the viewport.
- Smoothed the scroll-speed boost rather than applying the former instantaneous spike (up to 936px/s extra). New boost is capped at 110px/s and eased toward its target, preserving the 46.2px/s base transport and hover behavior.
- Hero pointer handling now returns immediately while its canvas is offscreen, avoiding redundant geometry reads during pointer movement farther down the page.
- Build passed. Browser verified 20/20 photos loaded, 14–16 promoted layers while visible, 0 when offscreen, no horizontal overflow, and no console errors/warnings. Home/End navigation still reaches the appropriate page regions. Evidence: qa/contact-scroll-optimized.jpg.
- These checks validate reduced workload and correct rendering; no numeric frame-rate claim is made. Local preview only, no deployment.

## Contact copy cleanup — 2026-10-25
- Removed all four red-marked elements: top wordmark, welcome button, helper sentence, and idle copy hint. Retained the Chinese headline/intro and bottom copyright.
- Telephone matches email font size/weight: 21.76px / 800 at 1280px, both 17.94px at 390px. Preserved headline/gallery vertical placement after removing the nav.
- Build passed. Browser confirmed removed elements absent, no horizontal overflow at desktop/mobile, and phone activation displays “号码已复制”. OS clipboard paste not independently tested. Evidence: qa/contact-cleanup.jpg; viewport reset. Local preview only.

# Full-width closing photo scene — 2026-10-25

- Source visual: supplied `codex-clipboard-528321e3-a5a1-406b-9c55-f31b5a608174.png` (2970×1414) and https://moenly.design/#works. Scope: full-viewport, two opposing sinusoidal photo rows with centered content. Existing black/yellow palette and own Chinese/contact copy are intentional adaptations.
- Implementation: qa/contact-fullscreen-wide.jpg (1920×914 CSS/image px), qa/contact-fullscreen-desktop.jpg (1280×720), qa/contact-fullscreen-mobile.jpg (390×844). Combined comparison: qa/contact-fullscreen-comparison.jpg, source and wide capture scaled proportionally to 960px each. Animation phase is intentionally different. The source screenshot includes a narrow header strip; local footer has no imported source navigation.
- Initial comparison found undersized desktop photos at 1920px (112px); fixed with responsive 7.5vw sizing, yielding 144px at 1920px, capped at 190px. The final combined capture was opened and reviewed after verifying all 30 image nodes loaded. An early capture was taken before decoding completed and was replaced with the complete capture.
- Fonts/typography: own compact Chinese heading remains centered, with responsive yellow highlight and matching email/phone font sizes; local Satoshi/PingFang fallback and existing Montserrat retained. Reference English headline replaced by the user's established copy.
- Layout/rhythm: gallery spans x=0 to viewport width, no side masks. Two photo rows frame the central message/contact block. Wide desktop uses a horizontal contact row; mobile stacks email and phone. No horizontal overflow at 1280px, 1920px or 390px. The comparison image clearly shows row shape, edge coverage, card dimensions, corner radii and central content placement; no additional cropped comparison is needed for this large, sparse composition.
- Color/assets/copy: black background and #FDC700 highlight preserved by prior user preference. Original local reference photos remain temporary preview assets, sharp at the rendered sizes; no placeholders or hotlinks. Own Chinese copy and contact details retained, removed controls stay absent.
- Interaction: pointer entry verified data-hovered=true and 720ms diagonal glare; phone click displayed success feedback. Full-width layout retains smoothed scroll boost, offscreen/hidden pause and reduced-motion static fallback. Responsive card count supplies viewport width plus a buffer while preserving culling. No console warnings/errors. Build passed; viewport reset, preview marked deliverable.
- No remaining actionable P0/P1/P2 findings for the requested composition. Reference colors/copy/navigation are deliberate scope adaptations. No deployment or canonical-repository changes.
- final result: passed

## Restore split footer — 2026-10-25
- User reverted the full-screen composition; restored the prior left-copy/right-gallery layout and gray English caption, including expanded soft side masks and leftward copy shift.
- Preserved clean contact details, identical phone/email sizes, hover sweep, smoothed scroll boost, culling and offscreen pause. Removed full-screen layout overrides.
- Build passed. Browser evidence qa/contact-split-restored.jpg (1280×720) matches the preceding split preview qa/contact-cleanup.jpg composition. Copy x=124.77px, gallery x=568.77px; phone/email both 21.76px; 20 photo nodes, no horizontal overflow. Preview kept open locally, no deployment.
- final result: passed

## Reduce side mask strength — 2026-10-25
- Replaced the fully transparent 40px/56px side fades with 20px subtle edge transitions, retaining 75% image opacity at the boundary and 92% after 8px. This limits darkening to 25% at the extreme edge instead of fully blacking out photos.
- Existing field bounds, split layout, copy, photo sizes and motion retained. Build passed; browser confirmed computed mask, no horizontal overflow and visible edge photos. Evidence: qa/contact-light-edge.jpg (1280×720). Local preview only.
- final result: passed

## Faint edge transition — 2026-10-25
- Reduced maximum edge attenuation from 25% to 8%, and transition width from 20px to 12px. Existing split layout and animation unchanged.
- Build passed. Browser confirmed computed mask and no horizontal overflow. Screenshot: qa/contact-faint-edge.jpg. Local preview only.
- final result: passed

## Remove side fade entirely — 2026-10-25
- Removed the photo field's mask. Photos now retain full opacity and clip at the existing expanded bounds. Layout and motion unchanged.
- Build passed; browser confirmed mask-image:none and no horizontal overflow. Evidence: qa/contact-no-mask.jpg. Local preview only.
- final result: passed

## Per-photo edge fade (clarified intent) — 2026-10-25
- Implemented uniform opacity on each entire photo according to its distance from the left/right bounds. Smoothstep interpolation fades the whole card (including border) to zero before clipping, then back in as it enters. No vertical black overlay or container mask.
- Geometry is read during resize only; animation uses cached bounds, preserves culling/offscreen pause and promotes transform/opacity only while visible. Nearly transparent cards do not intercept pointer events.
- Build passed. Browser verified center opacity=1 and partial edge photo opacities (0.579, 0.048, 0.163, 0.395), plus fully faded outer cards and mask-image:none. No desktop/mobile horizontal overflow; no console errors/warnings. Evidence: qa/contact-individual-photo-fade.jpg. Viewport reset, local preview kept open. No deployment.
- final result: passed

# Closing left copy from Figma — 2026-10-25

- Source: Figma sEfVYSUpkr3Ss0rU2jSnZA / 1:8, high-fidelity contexts for 222:51, 52, 53, 54, 55, 60 and 63. Source capture qa/figma-1-8-latest.png is 1496×6266. Local desktop qa/contact-figma-copy-desktop.jpg is 1496×800 CSS/image px; final default preview qa/contact-figma-copy-final.jpg is 1280×720; mobile qa/contact-figma-copy-mobile.jpg is 390×844.
- Full-view desktop and mobile were opened in browser; focused 1:1 comparison qa/contact-figma-copy-comparison.jpg was opened with both source and implementation in the same image. Source crop (215,5620)–(600,6035), local crop (215,77)–(600,492), identical 385×415 sizes; no density rescaling. Whole-page source crop only normalizes the section's vertical origin.
- Fonts: local Satoshi with Chinese system fallback, specified bold weights, 28px/42px lead and tail, 55.438px highlight title, 16px/22px bold white invitation, and source tracking. Slight Chinese fallback rasterization remains an optical P3 difference; a 0.3px black text stroke on the highlight narrows the visible source weight difference. No actionable typography or wrapping issues.
- Layout: measured source-relative spacing, exact highlight dimensions, desktop copy x=260.531px at 1496px. Browser measured highlight 236.617×62.234px, within subpixel rounding of source. Source relative invitation/contact spacing restored. Right gallery unchanged.
- Tokens/copy: #FFC400 highlight, white copy, no headline commas or email arrow. Fixed the accidental Latin l in Figma's invitation to retain the user's intended Chinese phrase. Existing site black background retained, so black source-asset rectangles blend with it (Figma background was #0A0A0A).
- Static assets: exact original 727dc.png (824×296) and 82396.png (702×100) downloaded through supplied Figma asset URLs to local contact-reference filenames. Runtime uses local paths. Email artwork renders 342.859×123.156px inside the specified 342.861×48.881px crop; phone renders 341.563×48.648px in the 341.568×48.656px slot. Both loaded with nonzero intrinsic sizes. Existing similar icons were inspected but source rasters retained because these Figma contact layers are raster artwork.
- Interaction: mailto address verified without sending; phone click displays “号码已复制”, success state resets. Original phone clipboard helper retained; external paste not asserted. Accessible names and photo alt text retained.
- Build passed. No console errors/warnings, no horizontal overflow desktop/mobile. Temporary viewport reset, local preview kept open. Prior photo fade/hover untouched. No publishing or canonical repository changes.
- No remaining actionable P0/P1/P2 findings. final result: passed

## Taller hero particle field and compact Magic brand — 2026-10-25
- Extended the hero canvas from 100svh to 135svh: browser measured 972px at 720px viewport height, and 1139px at 844px mobile viewport. Existing bottom fade, shader palette, particle count and offscreen pause retained.
- Header brand now reads Magic. Desktop mark is 32.609×42px with 20px text and 8px gap; mobile uses 27.18×36px / 18px and remains visible. Header/card positioning, like button, footer and page titles untouched.
- Build passed. Browser verified desktop/mobile no horizontal overflow, expected name/sizes, rendered yellow particles extending below the old first-viewport bound, reveal opacity fully settled, and no console warnings/errors. Evidence: qa/hero-taller-magic.jpg (1280×720), qa/hero-taller-magic-mobile.jpg (390×844). Temporary viewport reset, local preview kept open. No deployment.
- final result: passed

## Tighter gap above closing section — 2026-10-25
- Reduced desktop outer margin/top padding from 120+94px to 48+48px; ≥1600px padding reduced from 136px to 64px. Mobile now uses 32+48px instead of 76+114px. Internal copy/photo spacing unchanged.
- Build passed. After reveal settled, browser measured 96px from the final AI card bottom to the closing copy top (formerly 214px), with no horizontal overflow. Evidence: qa/contact-tighter-gap.jpg, showing the preceding card edge and closing content together. Local preview only.
- final result: passed

## Smaller hero particle distribution — 2026-10-25
- Reweighted shader sizes toward small particles; removed the broad large-shard tail, retaining only a rare larger accent. Sampled size curve averages 51.6% of the former scale and caps at 61.0% of the former maximum (before unchanged depth/perspective factors). Desktop count increases 1760→2160, coarse-pointer 720→840.
- Palette, stream geometry, speed, pointer behavior, field height and pause behavior unchanged. Build passed. Browser confirmed visible smaller gold particles, 972px field at 720px viewport, no horizontal overflow and no console errors/warnings. Evidence: qa/hero-fine-particles.jpg. Local preview only.
- final result: passed

## Restore reference particle sizing — 2026-10-25
- User found the fine-particle experiment too small. Restored the original Moenly-derived size distribution from ../moenly-reference/hero-purple-preview.jsx, and original 1760/720 instance counts. Added viewport-height/canvas-height scale correction so the previously requested 135svh coverage extension does not magnify particle sizes.
- Kept yellow palette, field extension and current header unchanged. Build passed; browser rendered visible mixed-size gold particles with no warnings/errors. Evidence: qa/hero-reference-particle-size.jpg. Local preview kept open, no deployment.
- final result: passed

## Latest Figma copy position refresh — 2026-10-25
- Re-read current Figma 1:8 metadata and high-fidelity contexts for 222:51–55, 60 and 63. Heading/invitation nodes moved down 20px since the prior implementation; contact nodes moved down 1px. Typography, copy, highlight size and contact assets unchanged.
- Updated left-copy relative offset +20px and pre-contact gap 84.862→65.862px. Source email offset from lead=265.506px, phone=313.568px; browser measured 265.492px and 313.555px respectively. Desktop x=260.531px at 1496px width. Subpixel differences are rounding only. Right gallery and hero untouched.
- Current source capture: qa/figma-footer-refresh-source.png (1496×6266). Desktop: qa/contact-figma-refresh-desktop.jpg (1496×800), final default preview qa/contact-figma-refresh-final.jpg (1280×720), mobile qa/contact-figma-refresh-mobile.jpg (390×844).
- Opened source and local in the combined 1:1 comparison qa/contact-figma-refresh-comparison.jpg. Source crop (215,5620)–(600,6035), local (215,30)–(600,445), each 385×415, no scaling. Fonts/color/assets/copy remain as previously verified: local Satoshi/Chinese fallback, #FFC400 highlight, original contact artwork and intended invitation without stray Latin l. Existing slight CJK rasterization difference remains P3; no layout or asset mismatch.
- Build passed. Original contact rasters loaded with expected dimensions; phone activation showed success feedback; no desktop/mobile horizontal overflow, no console warnings/errors. Viewport reset and local preview retained. No deployment.
- final result: passed

## Increase closing section gap — 2026-10-25
- Increased only outer section margin by 32px desktop / 24px mobile. Current desktop AI-card-to-copy gap is 148px, up from 116px after the latest Figma refresh. Closing internal layout, typography and photo motion unchanged.
- Build passed; browser measured 148px and no horizontal overflow. Evidence qa/contact-wider-gap.jpg includes the preceding card and closing section together. Local preview only.
- final result: passed

## Smaller contact block — 2026-10-25
- Scaled only the email/phone artwork and copy-success state to 85%, including internal padding alignment and row spacing. Email slot now 291.430px wide; phone 290.328px. Heading, pre-contact gap, section spacing and photo gallery unchanged.
- Build passed. Browser verified expected dimensions, no horizontal overflow and successful phone feedback. Evidence: qa/contact-smaller-details.jpg. Local preview only.
- final result: passed

# Personal photograph replacement from Figma — 2026-10-25

- Source: supplied photo collage codex-clipboard-aeec76ab-960b-4b5b-9190-ba7b94243d12.png and high-fidelity Figma contexts for page 0:1 nodes 227:68,71,74,77,80,83,86,89,92,95. The 10 downloaded source images match the user's street portrait, HYROX, balloon, dog/park, paragliding, snorkeling, beach, cafe, temple and deer subjects.
- Asset source/implementation comparison: opened qa/personal-photo-contact-sheet.jpg containing all 10 square-slot crops against the supplied source collage. This is an asset replacement, not a recreation of the collage layout. Intentional square crops retain subjects; corrected the initial paragliding crop (person was off-frame), balloon framing, snorkeling faces and deer's ears before finalizing. Original source aspect ratios retained in files; only object-fit/object-position adapt them to slots.
- Runtime: qa/contact-personal-photos.jpg (1280×720) and qa/contact-personal-photos-mobile.jpg (390×844), rendered and inspected. Browser verified 20/20 image nodes loaded from exactly 10 distinct contact-personal URLs, each with nonzero intrinsic dimensions. Assets are up to 768px long edge, quality-94 WebP, 945312 bytes total; no EXIF metadata forwarded. Original downloads/source IDs/dimensions/object positions retained in source-assets/contact-personal/manifest.json. The balloon HTTP/2 download failed once; HTTP/1.1 retry completed and the decoded image was verified.
- Font/layout/color/copy: existing approved split composition, left Figma typography, contact size and spacing, black/yellow palette and gray caption untouched. Original reference image directory archived outside public/ rather than shipping unused reference photos.
- Motion/interaction: hover entry verified true; source glare transition retained. Container mask remains none; three partially transparent edge cards verified, preserving whole-photo fade. Scroll boost, visibility pause and culling unchanged. Desktop/mobile no horizontal overflow. No console warnings/errors. Build passed; temporary viewport reset and local preview retained.
- No remaining actionable P0/P1/P2 issues for the replacement scope. No deployment or canonical repository edits.
- final result: passed

## Five additional personal photos — 2026-10-25
- Retrieved new Figma nodes 227:98,101,104,107,110 through high-fidelity design contexts with screenshots. Downloaded the five original assets and created quality-94 WebP versions up to 768px long edge. Source/asset crop sheet qa/personal-photos-expanded-sheet.jpg was opened and reviewed: forest portrait, traditional street, white-top portrait, dog and athlete portrait. Adjusted forest-portrait crop toward the left to retain its subject. Source manifest now contains all 15 photographs, total runtime image payload 1413528 bytes.
- Interspersed the new photos into 8-photo upper and 7-photo lower cycles. Updated rendering to use whole cycles per row instead of truncating uneven lists at a common count; no photos are skipped and loop padding does not immediately repeat a partial list. At current desktop/mobile sizes only 15 photo nodes are needed, with existing offscreen culling retained.
- Geometry invariant checked at 366px, 648.5px and 900px field base widths: wrap positions are fully transparent at both ends, so the coordinate wrap remains hidden. Existing photo sizes, spacing, wave, speed, hover, opacity fade, left copy and overall layout retained.
- Browser: desktop explicitly tested at 1280×720, mobile at 390×844. Verified all 15 distinct URLs and all 15 loaded images; 112px desktop cards; four partially transparent edge cards; pointer entry sets hover state. No horizontal overflow or console warnings/errors. Evidence: qa/contact-personal-photos-15.jpg and qa/contact-personal-photos-15-mobile.jpg. Viewport reset; preview kept open. Build passed. Local review only, no deployment.
- final result: passed


## Whole-page particle experiment — 2026-10-25
- Saved exact hero-only checkpoint with verified SHA-256 snapshots before changing App/CSS. Original HeroAtmosphere shader and behavior remain byte-identical.
- Implemented opt-in homepage class + fixed viewport-scale field; no page-tall buffers or extra canvas instances. Footer/gallery backgrounds become transparent only in this mode.
- Production build passed. Desktop 1280×720: one canvas (1280×972), fixed top=0 at initial view and scrollY=5541, no horizontal overflow. Footer shows particles behind content and all 15 personal photos load; console warnings/errors empty. Mobile 390×844: field 390×1139 with no horizontal overflow.
- Captures: qa/whole-page-particles-hero.jpg, qa/whole-page-particles-middle.jpg, qa/whole-page-particles-footer.jpg. Local preview only.


## Closing Figma refresh and two photo crops — 2026-10-26
- Read high-fidelity design context and screenshot for sEfVYSUpkr3Ss0rU2jSnZA / 227:121. Updated only closing left layout and city-street/hyrox framing. Latest contact rasters and selection dot were downloaded from provided Figma asset URLs and stored locally.
- Desktop 1496px: measured lead x=243.361, 28px/42px lines, strong 346.641×75px at 55.438px. Email 294.938×42.047 and phone 293.820×41.852. Source offsets agree within rounding. Subject transforms 1.35 and 1.65 confirmed; originals remain unchanged.
- Production build passed. Mobile 390px: no horizontal overflow; heading fits, email/phone assets loaded, copy bottom leaves 16px before photo gallery. Existing right wave/particle code unchanged except the two image styles.
- Proof: qa/footer-figma-oct26-desktop.jpg. Local preview only.


## Same-tab project navigation — 2026-10-26
- Explicit target="_self" added to ordinary project cards, AI cards and detail return links. Existing href routes and return anchors preserved.
- Production build passed. Browser verified matrix detail, its return link, AI interface detail and its return link all use tab 22; tab count remained 20 throughout. All 10 homepage project anchors use _self. AI return card visible at y=138px.
- Evidence: qa/project-same-tab-navigation.jpg. Local preview updated.


## Preview service recovery — 2026-10-26
- Reported project pages unavailable. Confirmed no process accepting connections at 127.0.0.1:4186; existing production build and routes intact.
- Restarted Vite production preview on 127.0.0.1:4186 with strictPort. Home and all 10 detail routes return HTTP 200; entry JS/CSS/favicon assets also checked. No application code changes required.
- Browser inspection blocked by browser URL security policy; did not bypass or attempt another browser surface. Verification in this recovery is limited to local server route/asset health.


## Homepage opens at hero — 2026-10-26
- Initial homepage navigation and reload now clear stale project/contact hashes and jump instantly to top. Detail URLs remain valid. Return links use a one-use marker; browser Back uses the clicked project’s history state.
- Actual hook logic exercised in an isolated JS harness: 11 scenarios passed, including fresh root/project/contact hashes, reload with stale return state, explicit detail return, browser Back and Strict Mode effect replay. Production build and 4 routing/packaging tests passed.
- Existing preview service serves the updated JS bundle on 4186. Use bare http://127.0.0.1:4186/ as the user-facing homepage entry. Browser UI verification unavailable after prior browser policy rejection; no workaround attempted.

## Selected expertise tags — option 1 — 2026-10-26

Source visual truth: `qa/tags-option-one-reference.png` (first displayed generation, exec-05ff8201-d208-41ac-8b72-773542153d3c).
Implementation: local homepage at http://127.0.0.1:4186/; `qa/tags-option-one-desktop.png`, `qa/tags-option-one-detail.png`, `qa/tags-option-one-mobile.png`.

Scope: only the four stats-card expertise descriptors. Existing portrait, copy, metric layout, contact controls, particles and other homepage regions intentionally retain their established source implementation. Tags remain static expertise text, with no invented tab or filter behavior.

Viewport and normalization: source image 1945×809 pixels; desktop implementation 1496×850 CSS/pixels at DPR 1. The two hero content crops were aspect-preservingly normalized to a common 1002px width in `qa/tags-option-one-comparison.png`. Focused tag crops are shown together in `qa/tags-option-one-detail-comparison.png`. Surrounding generated portrait/copy differences are out of scope; the actual user assets are preserved.

Comparison history:
- Initial review: [P2] primary amber emphasis weaker than selected visual. Increased primary border alpha from .56 to .70 and fill from .075 to .11.
- Rebuilt and recaptured the desktop/full and focused comparison images after that change. The primary now reads as the clear yellow emphasis; secondary tags remain quiet charcoal outlines.

Required fidelity surfaces:
- Fonts/typography: existing Satoshi/PingFang stack, 14px/24px medium desktop; 12px compact mobile. Exact four labels retained and fully visible.
- Spacing/layout: desktop tag height 32px, 10px gaps, natural text widths; row left aligns with career paragraph, 19.234px clear gap below tags. At 390px and 320px, tags form two rows without overflow; paragraph gap 24px. No row clipping or overlap.
- Color/tokens: #FDC700 primary text, yellow outline, restrained amber fill; #D4D4D4 secondary text, #484848 border and almost-transparent dark fill. Removed silver gradients/top highlights. Reviewed against both combined comparison artifacts.
- Asset quality: reused existing local Figma circular dot asset in the primary label; no new illustrative assets required. Original portrait and stickers stay intact.
- Content: AI产品 / 增长玩法 / 全链路设计思维 / 数据导向 unchanged. No extra visible controls or labels.

Checks: production build passed; whitespace diff check passed. Browser console warnings/errors empty. Verified initial hero scrollY=0, all four descriptors, responsive wrap and noninteractive descriptor semantics. Existing navigation/contact code remains unchanged by this scoped patch.

Residual P3: mockup is a generated composition with slightly different surrounding metrics/portrait and tag density; surrounding source UI is intentionally preserved. No actionable P0/P1/P2 issues remain in scope.

final result: passed


## Final tag color/thickness and release — 2026-10-26
- User finalized #FFC400 for primary text, border and existing Figma dot. Border thickness is 0.5px; actual browser computed border width was 0.5px at DPR 2. Fill uses rgba(255,196,0,.11).
- Visual evidence: local qa/tags-half-pixel-border.png. Main selected mock and responsive comparison are documented above.
- Canonical source synchronized byte-for-byte from the confirmed local preview. User explicitly requested publication.

- Release checks: canonical production build passed; Sites routing/packaging tests passed 4/4; source diff check passed.
