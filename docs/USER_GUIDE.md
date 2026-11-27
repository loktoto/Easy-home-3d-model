# Easy3DHome user guide

[Home](../README.md) · [繁體中文](USER_GUIDE.zh-Hant.md)

## Open the planner

Try the [existing online demo](https://easy-home-3d-open-source.bballinbrowser-loktoto.workers.dev/), whose current deployment is not yet verified. On a computer you can instead [download the ZIP](https://github.com/loktoto/Easy3DHomeModel/archive/refs/heads/main.zip), extract it and open `index.html`. Do not open the HTML directly inside the ZIP or move it away from the accompanying files. No GitHub account or terminal is required.

## Your first design

1. Start with a blank project, a demo plan or the **Home wizard**. Back up an existing design before replacing it.
2. Select **Draw room**, then click or tap two opposite corners. For irregular rooms, use **Draw walls**.
3. Select a wall to edit its length, thickness, height and endpoints. Dimensions are in metres in the main-branch editor.
4. Choose **Door** or **Window**, then select a wall. Adjust the opening's width and position in properties.
5. Choose **Furniture**, select an item and drag it into place. Select it again to change width, depth, height, angle or position; lock it to prevent accidental moves.
6. Use **Measure** to check a distance and **Check** for basic geometry warnings. Select **3D model** to inspect the result.
7. Use **Export JSON** to save a backup. In **Projects**, create or switch projects and import a saved JSON file.

## Multiple floors and controls

The floor tabs select the active 2D floor; plus/minus add or remove the top floor. The 3D view stacks the floors. The wizard generates one or two floors, and additional floors can be added up to five. Back up before removing a floor.

On a phone, scroll the editing toolbar to reach more tools, use the properties button to open the inspector, and pinch to zoom. On a computer, use the mouse wheel to zoom, drag an empty area to pan and use the fit control to show the full layout. Ctrl/Command+Z undoes changes; Escape cancels wall drawing. Arrow keys nudge selected furniture.

Language options are under **Projects**. Translation coverage is still being validated.

## Troubleshooting and FAQ

**Do I need GitHub?** No. A GitHub account is only needed to post feedback or contribute.

**The web demo does not load.** Try the extracted ZIP on a computer. Online deployment status is tracked in [#30](https://github.com/loktoto/Easy3DHomeModel/issues/30).

**The downloaded page is blank.** Extract the entire ZIP, open the root `index.html` in a modern browser, and check that JavaScript is enabled. The file preview on GitHub is not the editor. If your browser restricts local files, use the online deployment once verified.

**Where are my plans?** In this browser's local storage. Different devices, browser profiles and site addresses have separate storage. Local-file storage behavior can vary by browser. Private browsing or clearing site data may delete saved plans.

**How do I transfer a plan?** Export JSON on the old device and import it in Projects on the new device. Avoid sharing private plans publicly.

**A tool is missing on mobile.** Scroll the toolbar horizontally, use the properties button, or rotate the device. If the problem persists, report your browser and screen size.

**Can I use the plan for construction?** It is a planning preview only. Geometry checks are not guarantees of clearance, structural integrity, code compliance or safety. Always verify real dimensions and consult qualified professionals.

**Is it free?** The current MIT-licensed local editor is free to use, without an account. No cloud sync is required or included in the current main-branch editor.

## Feedback

[Report a problem or request a feature](https://github.com/loktoto/Easy3DHomeModel/issues/new/choose). Sign in to GitHub, describe what happened and how to reproduce it, and include only synthetic examples or redacted screenshots. Never post private home plans or personal details.

[Back to home](../README.md)
