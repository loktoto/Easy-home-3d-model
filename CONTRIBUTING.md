# Contributing to Easy Home 3D

Pull requests and issues are welcome. Keep the project free, self-hostable, dependency-light, privacy-first, mobile-friendly, and available in Traditional Chinese.

## Development

- Open index.html in a browser. Core has no network dependencies.
- Run: node --check core.js && node --check renderer.js && node --check app.js
- Run: node --test tests/*.test.cjs
- Build the single HTML package: python3 scripts/build-single.py
- Avoid external services, telemetry, tracking pixels, API keys, analytics or third-party fonts by default.
- Use metres consistently for world-space geometry; millimetre conversion can be added in the UI without changing storage units.
- Add or update tests for geometry, serialization and interactions; attach before/after screenshots for UI changes.

## Privacy & security

Do not copy floor plans, furniture locations, owner addresses, cloud credentials or keys from the original private repository. Test with the generic demo from core.js, or synthetic examples only. Sanitize imported user JSON and escape any user-supplied names before injecting HTML.

## Pull requests

Explain motivation, implementation, data-model compatibility, and how you tested mobile touch, 2D/3D navigation, import/export and local save.

MIT licensed. © 2026 loktoto.
