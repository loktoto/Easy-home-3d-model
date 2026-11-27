# Development and deployment

[Home](../README.md) · [Contributing](../CONTRIBUTING.md) · [Testing](TESTING.md)

## Source layout

The root files are intentionally kept in place: the static deployment, standalone builder, offline ZIP and existing feature branches depend on these paths.

| Path | Purpose |
| --- | --- |
| `index.html` / `style.css` | Editor structure and responsive styles |
| `i18n.js` | UI language catalog |
| `core.js` | Geometry, data model, safe serialization |
| `renderer.js` | 2D drawing and 3D rendering |
| `app.js` | Editor interactions, local storage and projects |
| `easy-home-3d-standalone.html` | Checked-in standalone snapshot; do not assume parity with modular source |
| `welcome/` | Product landing pages and language variants |
| `scripts/` | Standalone build tooling |
| `tests/` | Node unit and Playwright browser tests |
| `evidence/` | Historical screenshots, synthetic plans and QA reports |
| `docs/` | User and contributor documentation |
| `.github/workflows/` | CI and conditional Pages deployment |

## Run and test

Open `index.html` directly, or serve the repository with a local static server. The editor has no npm runtime dependencies; Node.js, Python 3 and Playwright are needed for development/testing.

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

The Python builder generates `dist/easy-home-3d.html` and `dist/easy-home-3d-convika.zip` (ZIP contains `index.html`). The CI artifact is named `easy-home-3d-convika`. Keep modular source authoritative; standalone reconciliation is tracked in [#42](https://github.com/loktoto/Easy3DHomeModel/issues/42).

## Deployment

- **GitHub Pages:** repository owners can enable Settings → Pages → Build and deployment → Source: GitHub Actions. The existing workflow checks whether Pages is enabled before publishing. Expected URL: https://loktoto.github.io/Easy3DHomeModel/ — not confirmed live as of 27 November 2026.
- **Cloudflare:** existing demo at https://easy-home-3d-open-source.bballinbrowser-loktoto.workers.dev/; verify deployment revision before promoting it.
- **Other static hosts:** deploy the root static source with its relative paths, or build a single HTML file. For third-party HTML hosting such as [Convika](https://convika.com/zh-hant/), upload the built HTML or ZIP using your own account, publish and test the actual public page. Private previews may disable JavaScript. No third-party publication is implied.

Production readiness is tracked in [#30](https://github.com/loktoto/Easy3DHomeModel/issues/30). Verify all public links, editor entry points, language landing pages, mobile/desktop navigation and rollback before release.

## Data and compatibility

Internal geometry uses metres. Keep persisted schema, localStorage keys and import/export compatibility unless a tested migration is provided. Use only synthetic plans in tests. Do not include private original-prototype data, addresses, tokens or cloud credentials. Cloud features in open PRs do not change the current main-branch local-only policy.

Follow [QA acceptance](QA_ACCEPTANCE.md) before merging changes.
