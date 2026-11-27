# Worker release verification

The existing public Worker is `easy-home-3d-open-source`. Do not alter unrelated Workers or databases. Build from the reviewed commit: `python3 scripts/build-site.py && node scripts/build-worker.mjs`. This wraps only the existing allow-listed site; it never includes the repository, backend SQL or credentials.

Upload the generated module as a **new version** of the existing Worker; set the commit SHA annotation. Record the previously deployed version ID before publishing. Validate the preview or staging route before sending 100% traffic. Verify /version.json, all nine landing routes, the editor and standalone, robots/sitemap, ZIP download, negative paths and mobile/desktop workflows. Do not mark production or publish a release if the revision differs. Rollback: deploy the previous Worker version to 100%, then recheck its revision and browser behavior. A rollback changes code only; it does not modify any database or local browser plans.

Cloud is disabled by default. Hosted Supabase configuration must use a dedicated reviewed project and public publishable key only.

## Primary branded host

The primary public address is https://easy3dhome.pages.dev/. The legacy Worker is retained for existing users' origin-specific storage. The Pages project currently uses the same verified allow-listed module via Advanced Mode, with no external bindings. A future static Direct Upload migration requires working Pages asset authorization; do not enable auto-deployment from unreviewed branches.
