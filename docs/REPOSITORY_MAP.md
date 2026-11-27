# Where everything lives

[Home](../README.md) · [Contributing](../CONTRIBUTING.md) · [QA acceptance](QA_ACCEPTANCE.md)

This map describes the repository at commit `1b1cd88` (27 November 2026). It helps newcomers find the relevant files without understanding Git internals.

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
| [welcome/](../welcome/) | Public landing pages |
| [docs/](../docs/) | Guides, QA and plans |
| [evidence/](../evidence/README.md) | Historical screenshots and reports |
| [tests/](../tests/README.md) | Automated tests |
| [scripts/](../scripts/README.md) | Standalone build |
| [.github/workflows/](../.github/workflows/) | CI and conditional deployment |
| [package.json](../package.json), [playwright.config.mjs](../playwright.config.mjs) | Developer test configuration |
| [easy-home-3d-standalone.html](../easy-home-3d-standalone.html) | Checked-in standalone snapshot; parity not guaranteed |
| [robots.txt](../robots.txt), [sitemap.xml](../sitemap.xml), `.nojekyll` | Static deployment and search metadata |
| [LICENSE](../LICENSE), [CONTRIBUTING.md](../CONTRIBUTING.md), `.gitignore` | Project maintenance |

## Why source files remain in the root

The static entry point uses relative JS/CSS paths; the standalone builder reads these files directly. The browser tests serve the repository root, and deployment currently uses root-based URLs. Moving these files requires coordinated changes to all those consumers and active feature branches. Do not move or remove the standalone snapshot until [#42](https://github.com/loktoto/Easy3DHomeModel/issues/42) is resolved. Public asset isolation and release work are tracked in [#30](https://github.com/loktoto/Easy3DHomeModel/issues/30).

## Find current status

[Open issues](https://github.com/loktoto/Easy3DHomeModel/issues) · [Pull requests](https://github.com/loktoto/Easy3DHomeModel/pulls) · [CI](https://github.com/loktoto/Easy3DHomeModel/actions)

A merged feature is not necessarily deployed. Historical screenshots are not current acceptance evidence. See [QA rules](QA_ACCEPTANCE.md).
