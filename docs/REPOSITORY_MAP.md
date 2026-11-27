# Where everything lives

[Home](../README.md) · [Contributing](../CONTRIBUTING.md) · [QA acceptance](QA_ACCEPTANCE.md)

This map describes the repository at commit `5560777` (27 November 2026). It helps newcomers find the relevant files without understanding Git internals.

## I just want to use Easy3DHome

Open [the project homepage](../README.md). To use a local copy, [download ZIP](https://github.com/loktoto/Easy3DHomeModel/archive/refs/heads/main.zip), extract the entire folder and open `index.html`. No Node.js, terminal or GitHub account needed. Keep the accompanying files in place.

## Repository map

| Location | What it contains |
| --- | --- |
| [README.md](../README.md) | Product introduction and getting started |
| [index.html](../index.html) | Editor entry point |
| [style.css](../style.css) | Editor styles |
| [app.js](../app.js) | Editor interactions and local projects |
| [core.js](../core.js) | Geometry and serialization |
| [renderer.js](../renderer.js) | 2D / 3D rendering |
| [i18n.js](../i18n.js) | Language catalog |
| [cloud.js](../cloud.js), [cloud-config.js](../cloud-config.js) | Optional cloud client/configuration |
| [backend/](../backend/) | Self-hosted database schema; excluded from public site |
| [welcome/](../welcome/) | Public landing pages |
| [docs/](../docs/) | Guides, QA and plans |
| [evidence/](../evidence/README.md) | Historical screenshots and reports |
| [tests/](../tests/README.md) | Automated tests |
| [scripts/](../scripts/README.md) | Standalone build |
| [.github/workflows/](../.github/workflows/) | CI and conditional deployment |
| [package.json](../package.json), [playwright.config.mjs](../playwright.config.mjs) | Developer test configuration |
| [easy-home-3d-standalone.html](../easy-home-3d-standalone.html) | Checked-in standalone; CI verifies byte-for-byte parity with built standalone and offline ZIP |
| [robots.txt](../robots.txt), [sitemap.xml](../sitemap.xml), `.nojekyll` | Static deployment and search metadata |
| [LICENSE](../LICENSE), [CONTRIBUTING.md](../CONTRIBUTING.md), `.gitignore` | Project maintenance |

## Why source files remain in the root

The static entry point uses relative JS/CSS paths; the standalone builder reads these files directly. The browser tests serve the repository root, and deployment currently uses root-based URLs. Moving these files requires coordinated changes to all those consumers and active feature branches. Retain the existing public URLs for old bookmarks and offline users. The build gate classifies every tracked path and rejects unclassified root files or non-allow-listed public assets. Public asset isolation and release work are tracked in [#30](https://github.com/loktoto/Easy3DHomeModel/issues/30).

## Automated inventory

Run `python3 scripts/build-site.py && python3 scripts/check-repo-layout.py`. The generated `dist/repository-inventory.json` lists every tracked file by role. Public site contents and offline bundle parity are verified in CI. Historical evidence and backend sources are never included in the deployable site.

## Find current status

[Open issues](https://github.com/loktoto/Easy3DHomeModel/issues) · [Pull requests](https://github.com/loktoto/Easy3DHomeModel/pulls) · [CI](https://github.com/loktoto/Easy3DHomeModel/actions)

A merged feature is not necessarily deployed. Historical screenshots are not current acceptance evidence. See [QA rules](QA_ACCEPTANCE.md).
