# Easy3DHome tests

[Home](../README.md) · [QA acceptance](../docs/QA_ACCEPTANCE.md)

## Run locally

```sh
npm install
npm run test:unit
npm run build
npx playwright install --with-deps chromium webkit
npm run test:e2e
```

The local editor itself does not need npm. Browser testing uses a local static server and desktop Chromium / emulated mobile WebKit.

## Find the right test

| Area | Location |
| --- | --- |
| Geometry and data model | [core.test.cjs](core.test.cjs) |
| Full editor journey | [user-journey](e2e/user-journey.spec.mjs) |
| Onboarding and templates | [onboarding](e2e/onboarding.spec.mjs) · [templates](e2e/templates.spec.mjs) |
| Furniture and autosave | [furniture](e2e/furniture-validation.spec.mjs) · [autosave](e2e/autosave.spec.mjs) |
| Mobile and 3D | [navigation](e2e/navigation.spec.mjs) · [mobile targets](e2e/mobile-targets.spec.mjs) · [3D fit](e2e/mobile-3d-fit.spec.mjs) |
| Undo and export | [undo](e2e/undo-floor.spec.mjs) · [PNG](e2e/png-export.spec.mjs) |
| Branding and languages | [branding](e2e/branding.spec.mjs) · [i18n](e2e/i18n.spec.mjs) · [landing](e2e/landing.spec.mjs) |

Use [Actions](https://github.com/loktoto/Easy3DHomeModel/actions) to find results and screenshot artifacts. Passing CI does not replace visual review or physical-device testing.
