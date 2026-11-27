#!/usr/bin/env python3
"""Keep stable public entry points, classify every tracked file, and verify offline parity."""
from pathlib import Path
import subprocess, collections, json, zipfile
root=Path(__file__).resolve().parents[1]
files=subprocess.check_output(["git","ls-files","-z"],cwd=root).decode().split("\0")
categories=collections.defaultdict(list)
runtime={"index.html","style.css","app.js","core.js","renderer.js","i18n.js","cloud.js","cloud-config.js"}
root_config={".gitignore",".nojekyll","package.json","playwright.config.mjs","playwright.docs.config.mjs","robots.txt","sitemap.xml"}
for p in filter(None,files):
    if p in runtime: group="runtime"
    elif p=="easy-home-3d-standalone.html": group="generated"
    elif p in root_config or p.startswith(".github/"): group="configuration"
    elif p in {"README.md","CONTRIBUTING.md","LICENSE"} or p.startswith("docs/") or p.endswith("/README.md"): group="documentation"
    elif p.startswith("backend/"): group="backend"
    elif p.startswith("tests/"): group="tests"
    elif p.startswith("scripts/"): group="build"
    elif p in {"support/index.html","support/binance-pay.svg"}: group="support assets"
    elif p.startswith("welcome/"): group="landing"
    elif p.startswith("evidence/"): group="historical evidence"
    else: raise SystemExit("Unclassified path: "+p)
    categories[group].append(p)
site=root/"dist/site"
expected=runtime|{"robots.txt","sitemap.xml",".nojekyll","version.json","easy-home-3d-standalone.html","easy-home-3d-convika.zip"}|{p for p in categories["landing"]}|{p for p in categories["support assets"]}
actual={p.relative_to(site).as_posix() for p in site.rglob("*") if p.is_file()}
assert actual==expected,(actual-expected,expected-actual)
standalone=(site/"easy-home-3d-standalone.html").read_bytes()
assert standalone==(root/"easy-home-3d-standalone.html").read_bytes(),"Regenerate tracked standalone from modular sources"
with zipfile.ZipFile(site/"easy-home-3d-convika.zip") as z:
    assert z.namelist()==["index.html"] and z.read("index.html")==standalone
report=root/"dist/repository-inventory.json"
report.write_text(json.dumps(dict(sorted(categories.items())),indent=2)+"\n")
print("Tracked paths:",sum(map(len,categories.values())),"; exact public site/standalone/ZIP parity verified")
