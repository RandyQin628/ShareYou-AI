# Home Weak-Point Review Design QA

- Source visual truth: current Home implementation plus the user override to remove every newly added double-circle brand element
- Desktop implementation: `C:\Users\26506\.codex\visualizations\2026\07\03\019f268a-0f7f-7bf1-825f-71bf469eef65\shareyou-home-no-added-double-circle.png`
- Mobile implementation: `C:\Users\26506\.codex\visualizations\2026\07\03\019f268a-0f7f-7bf1-825f-71bf469eef65\shareyou-home-no-added-double-circle-mobile.png`
- Viewports: desktop 1280 x 720 with full-page capture; mobile 390 x 844
- State: Chinese, Trigonometric Functions active, weak-point review expanded

**Findings**

- No actionable P0, P1, or P2 issues remain.
- All newly added double-circle elements are removed from the daily-goal progress bar, course node, weak-point entry, and carousel selection.
- The original ShareYou navigation logo and browser favicon remain unchanged because they predate this feature and identify the product itself.
- Typography, spacing, colors, supplied mascot, course art, weak-point copy, and the existing recommendation section remain unchanged.
- Desktop and mobile layouts have no horizontal overflow; mobile reports `scrollWidth === clientWidth === 375`.

**Interactions Tested**

- Weak-point review remains expandable and keeps correct `aria-expanded` state.
- Carousel selection now uses the original simple blue dot.
- Progress growth, viewport-triggered reveals, carousel pause/resume, language switching, and reduced-motion support remain intact.
- Desktop and mobile browser console logs contain no application errors.

**Comparison History**

- Pass 1: DOM and visual inspection found zero instances of `.daily-goal__mark`, `.path-node__brand`, `.weak-review__heading img`, or `.deck__dot img` on desktop and mobile. No further visual fix was required.

**Follow-up Polish**

- No P3 follow-up is required for this scoped removal.

final result: passed


---

# Home Membership Modal Design QA

- Source visual truth: `C:\Users\26506\.codex\generated_images\019f268a-0f7f-7bf1-825f-71bf469eef65\exec-4cea89ab-4c32-4342-a1b0-658766781e67.png`, with the user-selected composition override: combine A and C on the left and place B on the right.
- Desktop implementation: `C:\Users\26506\.codex\visualizations\2026\07\03\019f268a-0f7f-7bf1-825f-71bf469eef65\home-membership-modal\membership-modal-desktop.png`
- Mobile implementation: `C:\Users\26506\.codex\visualizations\2026\07\03\019f268a-0f7f-7bf1-825f-71bf469eef65\home-membership-modal\membership-modal-mobile.png`
- Full-view comparison: `C:\Users\26506\.codex\visualizations\2026\07\03\019f268a-0f7f-7bf1-825f-71bf469eef65\home-membership-modal\membership-modal-comparison.png`
- Viewports: desktop 1280 x 720; mobile 390 x 844.
- State: Chinese, membership dialog open.

**Findings**

- No actionable P0, P1, or P2 issues remain.
- Typography preserves the existing ShareYou system stack, compact UI scale, clear hierarchy, and non-negative letter spacing.
- Desktop spacing follows the selected wide two-column composition; the full CTA and secondary action fit without internal scrolling at 1280 x 720.
- Colors use the existing cobalt brand token, neutral surfaces, restrained blue-violet CTA accent, and sufficient contrast.
- The supplied mascot cutout is used directly with correct proportions and no replacement illustration.
- Copy combines A and C on the left while preserving B's complete free-versus-Premium comparison on the right.
- Mobile stacks the offer before the comparison, keeps the primary action visible before the second section, and has no horizontal overflow.

**Focused Region Comparison**

- A separate crop was not needed because the combined 1280-wide comparison keeps the title, progress panel, benefit rows, CTA, and comparison table readable at inspection size.

**Interactions Tested**

- Both “升级会员” and “了解会员” open the same dialog.
- Backdrop, close button, secondary action, and Escape close the dialog.
- Focus moves into the dialog, is trapped while open, and returns to the triggering link after close.
- Background content is inert while the modal is open.
- Chinese and English modal content both update with the existing language switch.
- The upgrade CTA provides an explicit prototype response without pretending payment is connected.
- Desktop console has no application errors. The mobile iframe harness logged a browser-injection MutationObserver error that is not emitted by the direct page.

**Comparison History**

- Pass 1: the modal required internal scrolling at 1280 x 720 and the programmatic close-button focus showed an oversized focus ring.
- Fix: reduced vertical spacing and row heights, removed the minimum-height pressure, focused the dialog container, and suppressed only the container's non-interactive outline.
- Pass 2: the complete desktop modal fits at 1280 x 720, the selected two-column hierarchy is preserved, and mobile stacking has no horizontal overflow.

**Follow-up Polish**

- P3: add real pricing and payment states only after the commercial terms and payment integration are confirmed.

final result: passed


## Membership Modal Short-Viewport Follow-up

- Viewport: 1280 x 640 desktop harness.
- The compact desktop media query activates below 700px viewport height.
- Dialog metrics: `clientHeight === scrollHeight === 459`; no internal vertical or horizontal scrolling.
- The title, progress summary, all four benefits, monthly plan, primary/secondary actions, complete comparison table, note, and close control are visible simultaneously.
- Standard 1280 x 720 remains scroll-free with `clientHeight === scrollHeight === 610`.
- Direct-page console: no application errors.

final result: passed


## Membership Conversion Polish Follow-up

- Desktop modal width increased from 1100px to 1180px; short-height desktop width increased to 1160px.
- Transparent monthly pricing is shown as `99元/月` with the derived `约 3.3 元/天` value and “随时取消”.
- Premium comparison column now has a restrained tinted surface, “推荐” status, stronger value hierarchy, row hover feedback, and clearer conversion copy.
- Entry motion now staggers the mascot, progress summary, benefit rows, plan, CTA, comparison rows, and note. The CTA highlight runs once per open; reduced-motion users receive static content.
- 1280 x 720: `clientHeight === scrollHeight === 610`, width 1178px, no internal scrolling.
- 1280 x 640: `clientHeight === scrollHeight === 460`, width 1158px, no internal scrolling.
- Direct-page console: no application errors.

final result: passed

## Membership Proportion Balance Follow-up

- Standard desktop width reduced to 1120px while retaining the complete two-column hierarchy.
- Short-height desktop width reduced to 1080px and vertical rhythm restored so the dialog no longer reads as a flat strip.
- The comparison panel is vertically balanced against the purchase panel, with the table remaining fully visible.
- 1280 x 720: `clientHeight === scrollHeight === 610`, width 1118px, no internal scrolling.
- 1280 x 640: `clientHeight === scrollHeight === 513`, width 1078px, no internal scrolling.
- Direct-page browser check: no application layout errors.

final result: passed

## Course Overview And Current Lesson Follow-up

- Source: the user-provided course-page screenshot and a matching 1280 x 720 pre-change browser capture.
- Scope: the first three approved changes only — richer course overview, richer current-lesson decision data, and a tighter two-column layout.
- Desktop 1280 x 720: the overview and path align at 92px, columns resolve to 394px / 682px, and `clientWidth === scrollWidth === 1265`.
- Mobile 390 x 844 harness: the document resolves to 375px after the scrollbar, `clientWidth === scrollWidth === 375`, and both primary cards remain 343px wide.
- Chinese and English labels both update correctly; existing lesson completion data drives course progress, level progress, mastery, and CTA state.
- The weak-point review entry routes through the existing lesson flow without changing the answer interface.
- Progress indicators expose progressbar semantics, keyboard focus remains visible, and reduced-motion support covers the new transitions.
- No P0, P1, or P2 visual issues remain.

final result: passed

## Course Overview Center-Pinning Follow-up

- Desktop 1280 x 720: the overview card top remains exactly 145px before and after the full 83px document scroll (delta 0px).
- The card center resolves to 390.36px, matching the 390px center of the viewport area beneath the 60px navigation.
- The right learning path continues to scroll independently without changing the left card position.
- Mobile 390 x 844: the overview returns to static document flow; `clientWidth === scrollWidth === 375` and no content is obscured.

final result: passed

## Course Overview True Fixed-Position Follow-up

- Root cause: the page-entry translate animation created a containing block, so the earlier fixed element still moved with its ancestor in some viewport and zoom states.
- The page entry is now opacity-only; the desktop overview uses true viewport-fixed positioning.
- Column left/width values are recalculated on window resize, visual viewport resize (browser zoom), media-query changes, and rail resize.
- Desktop 1280 x 720: card top remains 144.64px before and after the full 83px scroll (delta 0px).
- Simulated zoom viewport 960 x 720: card top remains 144.64px before and after scrolling (delta 0px), with no horizontal overflow.
- At 900px and below the overview returns to the normal stacked layout.

final result: passed

## Course Path States, Integrated Lesson And Motion Follow-up

- Scope: approved course-page items 4-6 only: stronger path states, one integrated current-lesson region, and viewport-triggered lightweight feedback.
- Visual source: C:\Users\26506\AppData\Local\Temp\codex-clipboard-3076d4e9-202b-48f1-b4de-2b5d409f564f.png.
- Final desktop capture: C:\Users\26506\.codex\visualizations\2026\07\03\019f268a-0f7f-7bf1-825f-71bf469eef65\course-path-456\course-final.png.
- Side-by-side comparison: C:\Users\26506\.codex\visualizations\2026\07\03\019f268a-0f7f-7bf1-825f-71bf469eef65\course-path-456\course-comparison.png.
- Level 1 now exposes completed lessons, total lessons, a semantic progress bar, and distinct current/completed/locked/coming-soon states.
- The mascot, relevant coordinate-geometry asset, lesson details, mastery, AI reason and primary CTA now form one current-lesson region; the unrelated dumbbell visual was removed.
- Locked and coming-soon nodes are focusable buttons with visible reasons. Activation shows the existing localized toast plus restrained border feedback.
- IntersectionObserver gates reveal animations, path-line drawing and progress growth until each element enters the viewport. At 1280 x 520, lower nodes changed from hidden to visible only after scrolling; the fixed overview remained at the same top position.
- Completed-state simulation produced 1 / 3, changed the first lesson to review, and promoted the second lesson to the current playable link.
- Desktop 1280 x 720 and mobile 390 x 844 both have no horizontal overflow. Chinese and English dynamic state copy both passed.
- prefers-reduced-motion disables bobbing, pulsing, feedback animations, reveal transitions and progress interpolation.
- No application console errors and no P0, P1 or P2 visual issues remain.

final result: passed
