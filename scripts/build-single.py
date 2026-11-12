#!/usr/bin/env python3
"""Produce one dependency-free HTML file for Convika, email, and offline use.

No private Home_3D_Model data, cloud tokens, cookies, or external scripts.
"""
from pathlib import Path
import html
import re
import sys
import zipfile

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "index.html"
OUT = ROOT / "dist" / "easy-home-3d.html"
OUT.parent.mkdir(parents=True, exist_ok=True)

page = SOURCE.read_text("utf-8")
css = (ROOT / "style.css").read_text("utf-8")
scripts = [ (ROOT / f).read_text("utf-8") for f in ["core.js", "renderer.js", "app.js"] ]
assert "</style" not in css.lower()
assert all("</script" not in code.lower() for code in scripts)
page = page.replace('<link rel="stylesheet" href="./style.css">', "<style>\n" + css + "\n</style>")
for name in ["core.js", "renderer.js", "app.js"]:
    page = page.replace(f'<script src="./{name}" defer></script>', "")
page = page.replace("</body>", "<script>\n" + "\n;\n".join(scripts) + "\n</script>\n</body>")
assert '<script src="' not in page
assert '<link rel="stylesheet"' not in page
assert len(page.encode("utf-8")) < 2_000_000
OUT.write_text(page, encoding="utf-8")

bundle = ROOT / "dist" / "easy-home-3d-convika.zip"
with zipfile.ZipFile(bundle, "w", zipfile.ZIP_DEFLATED) as f:
    f.write(OUT, "index.html")
print("Built", OUT, OUT.stat().st_size, "bytes")
print("ZIP", bundle, bundle.stat().st_size, "bytes")
