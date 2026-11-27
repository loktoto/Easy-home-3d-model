# Publish Easy3DHome

[Repository home](../README.md) · [QA acceptance](QA_ACCEPTANCE.md) · [Production release issue](https://github.com/loktoto/Easy3DHomeModel/issues/30)

## Before publishing

1. Merge the integrated free release only after required unit, desktop/mobile browser, packaged-site and applicable backend checks pass. Inspect real screenshots from that exact revision; record findings on the PR.
2. Confirm the public Worker is serving the approved main commit. Its `/version.json` must match the full commit SHA. Do not publish a newer source ZIP against an older website.
3. Set the intended semantic version in `package.json` through a reviewed PR. Do not overwrite an existing release tag.
4. Open [Actions → Publish versioned Easy3DHome release](https://github.com/loktoto/Easy3DHomeModel/actions/workflows/publish-release.yml). Select **Run workflow**, branch `main`. Enter the reviewed full SHA, the matching `vX.Y.Z` tag, and confirm that screenshot review and deployment verification are complete.

The workflow tests and builds before it publishes. Only the manual confirmed main run can create a public GitHub Release. PR runs produce evidence and a dry-run artifact without changing releases or tags.

## Downloads

- `Easy3DHome.html`: standalone HTML.
- `Easy3DHome-offline.zip`: extract, then open `index.html`; license included.
- `Easy3DHome-web.zip`: allow-listed public website for static hosting; available after the integrated public-site builder is merged.
- `SHA256SUMS`: integrity checks.

No login or paid tier is required to use the offline editor. No cloud credentials or private plans may be published.

## Repository settings (maintainer)

After the public website is verified, set the About description to:

> Free, open-source 2D floor plan and 3D home planner. Design rooms, arrange furniture and plan renovations. No account required.

Set the Website to the verified public URL. Suggested topics: `floor-plan`, `room-planner`, `interior-design`, `3d-modeling`, `home-design`, `furniture-planner`, `offline-first`, `open-source`, `javascript`. GitHub repository settings require authorized administration access; do not add admin tokens to CI.

See [GitHub Releases](https://github.com/loktoto/Easy3DHomeModel/releases) after successful publication.
