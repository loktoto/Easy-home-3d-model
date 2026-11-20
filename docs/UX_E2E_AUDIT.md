# Easy Home 3D — UX review and end-to-end quality gate

2026-11-12 | Traditional Chinese (Hong Kong) | Project: https://github.com/loktoto/Easy-home-3d-model

## Scope

This is a real executable browser app, not a static mock-up. The owner requested an open-source editor that takes a new user from an empty plan to accurately placed furniture, and then safely saves and restores that plan. Existing private residential plans and Cloudflare storage are intentionally excluded from this repo.

## Evidence-based sources

1. Nielsen Norman Group, [10 usability heuristics](https://www.nngroup.com/articles/ten-usability-heuristics/) (last reviewed 2024-01-30): system status, user control, error prevention, recovery, recognition vs recall.
2. [Sweet Home 3D official user guide](https://www.sweethome3d.com/users-guide/): click-to-click wall creation, Esc termination, wall editing, door/window placement, multi-pane 2D/3D workflow.
3. [W3C WCAG 2.2](https://www.w3.org/TR/WCAG22/): 2.5.7 dragging alternatives, 2.5.8 pointer target minimums, 2.5.3 accessible names, 2.4.7 visible focus.
4. [Playwright CI guide](https://playwright.dev/docs/ci): executable GitHub Actions browser tests with screenshots and traces on failures.
5. [Playwright 1.65 release](https://github.com/microsoft/playwright/releases): browser automation pin (current stable checked 2026-11-12).
6. [Apple Human Interface Guidelines — Buttons](https://developer.apple.com/design/human-interface-guidelines/buttons): generally 44 × 44 pt tap region, clear primary actions, recognizable labels and press feedback.

## Retained and independently revalidated

- Canvas 2D geometry and browser-side 3D perspective without remote library or backend.
- Metric coordinates, walls, openings, furniture dimensions, lock/unlock.
- User-scoped localStorage and multi-project JSON import/export.
- Browser syntax and unit tests, now supplemented with Chromium and mobile WebKit E2E.

## Corrected bugs

| Severity | Reproduction | Root cause | Fix |
| --- | --- | --- | --- |
| Critical | Add window, then add furniture and immediately drag it | Inserting furniture kept the preceding window tool active | Switch back to 2D/select and select the new object |
| High | Drag furniture, undo/redo, then try to lock the same item | Undo/redo always cleared selection | Preserve selection when item remains in restored model |
| High | Resize a wall beside another room wall | Distinct segments did not maintain common endpoints | Move connected endpoints and allow precise wall length |
| Medium | Place overlapping doors/windows on one wall | No opening collision validation | Reject overlap and enforce 5 cm clearance |
| Medium | Try to draw first room without coordinates knowledge | Needed many explicit points | Two-corner rectangle room entry with dimension preview |
| Medium | Narrow mobile viewport, toolbar and footer | Overly compact and icon-only controls | 42–44px targets, readable tool labels, condensed 320px header |
| Medium | On mobile after selecting furniture, properties overlay covers canvas | No explicit one-click escape into move mode | "在圖則上移動" control closes the inspector |
| Medium | Start wall editing then press Escape | State was difficult to understand | Explicit cancellation, closure feedback and contextual three-step hints |

## Newly added

- Guided rectangle tool: choose two diagonal points; renders width, height and square metres before confirming four walls.
- Direct wall-length field, draggable endpoints and joined-wall adjustments.
- Responsive tool labels and larger hit targets.
- Furniture position keyboard arrows (5 cm; Shift+arrow 25 cm) and numeric X/Y entry as drag alternatives.
- Pinch-to-zoom on touch and ground-plane 3D furniture dragging.
- Proper opening spacing validation and unit test coverage.
- Playwright E2E on desktop Chromium and mobile Safari WebKit, with persistent CI logs, traces, screenshots.
- Standalone offline HTML packaging for Convika.

## Acceptance journey

1. Brand-new visitor sees a blank plan and a clear "畫第一間房" action.
2. Two taps/clicks build a room; 2D view shows dimensioned walls.
3. Select a wall, input exact length; adjoining wall remains connected.
4. Place a door and window in valid wall locations, rejecting overlaps.
5. Pick furniture, change width/depth/height, drag, nudge or enter X/Y, rotate, lock, unlock, duplicate and delete.
6. Use 3D view and return to editable 2D.
7. Undo/redo without losing a still-existing object selection.
8. Export JSON; import in a new project; reload the browser; same furniture and openings remain.
9. Verify a narrow screen without document horizontal overflow.

CI: [End-to-end workflow](../.github/workflows/e2e.yml), [unit tests](../tests/core.test.cjs), [build/publish workflow](../.github/workflows/site.yml). Individual test results and failures live in GitHub Actions — do not interpret a green syntax check as proof of E2E success.

## Data safety

All user layout changes remain in browser localStorage; no login, analytics or cloud sync. Back up with JSON, as incognito/private browsing, device changes and clearing site data can remove the only copy. An inactive tab may defer saving by 250 ms, but beforeunload also attempts a save.

## Known limitations (not CAD)

- Walls are line segments with approximate planar thickness; automatic structural detection and detailed wall joints are not implemented.
- Arbitrary floor plans use wall-by-wall drawing; the quick room tool draws rectangles only.
- 3D perspective is lightweight Canvas rasterization, not physically based 3D rendering; photorealistic textures and precise ray picking are beyond this version.
- Door/window clearances are plan-level overlap checks, not building-code validation. Furniture/wall clearance is a 2D measurement and does not consider swing arcs.
- No real-world survey, accessibility certification, anti-collision solver, load-bearing validation, DXF/IFC/BIM output, cloud sync, collaboration, or cloud backup.
- Automated iOS Safari WebKit emulation is not a substitute for real-device testing across all operating systems.

## Release policy

Only describe a commit as production verified when the latest commit's unit/build and E2E workflows both pass. Deploy the exact tested source. If Cloudflare and GitHub are different commits, disclose this as a version mismatch until redeployed and smoke-tested. Do not ship private plans or any secrets.


## Final verification evidence (2026-11-12)

- Browser E2E run: https://github.com/loktoto/Easy-home-3d-model/actions/runs/43178748534
  - **14 collected; 10 passed; 4 intentionally skipped** because each of the two browser projects has project-specific tests. This is not 14 passes.
  - Desktop Chromium: empty start; complete walls/openings/furniture/edit/move/lock/undo/redo/3D/JSON/reload journey; quick two-corner room and joined-wall precise length; direct 3D furniture dragging; 320 px width; standalone HTML.
  - Mobile Safari WebKit: empty start; demo/furniture/edit/2D-3D; 320 px width; standalone HTML with touch room creation, furniture and reload.
- Unit/build workflow: https://github.com/loktoto/Easy-home-3d-model/actions/runs/43178748617 (successful).
- Cloudflare production Worker updated from standalone source commit 4d713530be5be8eb92d8937cab454e226a309ac2 and deploy API returned success.
- Production DOM independently verified through Cloudflare Browser Rendering at https://easy-home-3d-open-source.bballinbrowser-loktoto.workers.dev/ with the "畫第一間房" button, empty stats and 2D/3D navigation.
- The repository's standalone HTML is around 74 KB and contains its CSS + JS, with no runtime network assets.
- **Scope of verification:** browser emulator + independent production-load smoke test; physical-device matrix, visual accessibility certification and building accuracy are not guaranteed.

## 2026-11-21 enhancement pass

### Newly corrected bug

| Severity | Reproduction | Root cause | Fix |
| --- | --- | --- | --- |
| High | Export a plan with a window sill of 1.6 m and window height of 2.4 m, or lower a wall below its existing opening; reopen it in 3D | `sanitize()` capped opening height against wall height but ignored sill height, and wall-height edits only reclamped opening width/offset | Cap height at `wall height − sill` on import and whenever wall height changes; `validate()` now reports impossible openings |

### Newly added

- **Home wizard**: generate a complete multi-room home from name, width (4–24 m), depth (4–24 m) and 1–3 bedrooms. It produces exterior and partition walls, front/side windows, internal and entrance doors, kitchen/bathroom fixtures, beds, storage and a measurement line. All 231 integer-dimension combinations in the tested grid validate with zero geometry issues.
- **Plan checker**: a dialog and inspector action reporting overlapping openings, openings outside a wall, openings taller than the wall, dangling wall endpoints, furniture–furniture collisions and furniture–wall intersections. Errors and suggestions are distinguished, with the same disclaimer that this is not a CAD/building-code check.
- **Door swing direction**: 2D door arcs now open toward the plan interior instead of always using a fixed sign.
- **3D hit testing**: invalid projected polygons no longer enter the furniture/wall selection list.
- **Test coverage**: 16 unit tests and 12 executable browser tests (6 further tests are intentionally skipped per browser project). New E2E journeys cover wizard construction, plan checking, wall-height clamping, backup restore, mobile wizard use and a sweep of the remaining toolbar/keyboard controls.

### End-to-end home-build evidence

A real Chromium session started from a blank plan, generated a 10 × 7 m three-bedroom home with 9 walls, 12 openings, 9 furniture items and 1 measurement, then:

1. Ran the plan checker — passed with no geometry issues.
2. Changed a wall from 10.00 m to 10.50 m — the adjoining wall endpoint followed with 0 m gap.
3. Dragged a desk 0.806 m, rotated, locked, duplicated, undid and redid it — counts went 11 → 10 → 11.
4. Orbited the 3D model, exported JSON, imported it into a second project and reloaded — all 12 openings remained.
5. Recorded zero browser JavaScript errors.

Screenshots, the exported JSON and a readable report are in [`evidence/home-build-report.html`](../evidence/home-build-report.html).

## 2026-11-21 two-floor house pass

### New capability

- **Floor-aware document**: `floorCount`, `floorHeight` and per-object `floor` are stored in the plan. Older one-floor JSON files load as floor 0 without migration. `sanitize()` clamps floors, `validate()` only compares objects on the same floor, and `getBounds(model, floor)` supports per-floor fitting.
- **Floor UI**: tab bar for G/F and upper floors, add/remove floor buttons (up to 5), 2D editing restricted to the active floor, 3D rendering of every floor with semi-transparent upper slabs and correctly offset walls, windows, furniture and measurements.
- **Two-floor house generator**: `G.house(opts)` independently builds a ground floor and an upper floor, adds stairs where they fit without collision, and produces a clean plan across 273 tested width/depth/bedroom combinations (255 include stairs; very small plans omit them).
- **Wizard floors option**: choose 1 or 2 floors; preview and final stats reflect the selected floor count.

### Verification

- 18 unit tests and 14 executable browser tests pass (8 project-specific skips).
- A real Chromium session generated a 10 × 7 m two-floor home: ground floor 7 walls / 8 openings / 9 furniture, first floor 9 walls / 12 openings / 10 furniture. Plan check passed.
- Furniture was added separately to each floor with the correct `floor` value; a ground-floor chair was resized to 0.55 m, rotated, locked, duplicated, undone and redone.
- 3D rendered both floors stacked; JSON export/import/reload preserved 2 floors and 3 projects; adding a floor produced 3 floors and deleting the top floor returned to 2. Zero browser JavaScript errors.
- Evidence: [`evidence/two-floor-home-report.html`](../evidence/two-floor-home-report.html), screenshots `01`–`08` and `two-floor-home.json`.

## 2026-11-21 responsive UI/UX pass

Measured at 320, 360, 375, 390, 414, 430, 768 and 1024 px with real Chromium viewports and screenshots.

| Issue found | UX decision |
| --- | --- |
| All editing tools lived in one over-long rail; primary actions such as furniture and checker were off-screen on phones | Split the toolbar into a fixed top row (2D/3D and floor controls) and a scrollable tool rail with a right-edge fade affordance |
| Floor tabs, add/remove buttons and header actions were 34–36 px high | Raise every phone-width target to at least 44 px, in line with Apple HIG and WCAG 2.5.8 |
| Wizard title wrapped and its primary action fell below the fold at 320 px | Compact small-screen dialog spacing, shorter title/action text and sticky bottom actions |
| Onboarding card hid too much of the canvas on small phones | Reduce start-tip padding and type sizes at ≤420 px while keeping 44 px buttons |

Result: zero document horizontal overflow at every measured width, all phone controls ≥44 px, wizard action buttons always within the viewport. A dedicated E2E sweep locks the 320–768 px behaviour. Full metrics and screenshots: [`evidence/responsive-ui-report.html`](../evidence/responsive-ui-report.html).

