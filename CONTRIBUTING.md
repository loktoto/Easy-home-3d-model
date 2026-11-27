# Contributing to Easy3DHome

Thanks for helping improve Easy3DHome. You do not need coding skills to report a problem or suggest an improvement.

## Report a problem or suggest an idea

Open [New issue](https://github.com/loktoto/Easy3DHomeModel/issues/new/choose), sign in to GitHub and select the appropriate template. Describe what you were trying to do and what happened. Include your browser/device and a redacted screenshot if useful. Search [existing issues](https://github.com/loktoto/Easy3DHomeModel/issues) first.

Never post private home plans, furniture locations, addresses, cloud credentials or keys. Use synthetic examples only.

## Contribute code

1. Review the existing [UX audit](docs/UX_E2E_AUDIT.md) and the commands below.
2. Find or open a scoped issue. Fork the repository if needed, create a branch, and keep changes focused.
3. Open `index.html` in a browser. The local editor has no npm runtime dependencies.
4. Run syntax checks, unit tests, the standalone build and browser E2E.
5. Open a pull request linked to the issue. Explain motivation, implementation, model compatibility and testing.

```bash
node --check i18n.js
node --check core.js
node --check renderer.js
node --check app.js
npm install
npm run test:unit
npm run build
npx playwright install --with-deps chromium webkit
npm run test:e2e
```

## Engineering principles

Keep the core free, self-hostable, dependency-light, local-first and mobile-friendly. Preserve internal geometry in metres and existing JSON/localStorage compatibility. Avoid default telemetry, tracking pixels, third-party fonts, credentials and unrelated external services. Sanitize imported JSON and escape user-provided names.

## Acceptance before merge

Follow [QA acceptance](docs/QA_ACCEPTANCE.md): unit/build checks, desktop Chromium and mobile WebKit E2E, actual screenshots from the exact PR head, visual inspection, and no unresolved critical defects. Test mobile touch, 2D/3D navigation, import/export and local save where relevant. Historical screenshots are not current acceptance.

MIT licensed. © 2026 loktoto.

[Back to Easy3DHome](README.md)
