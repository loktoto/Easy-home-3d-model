#!/usr/bin/env python3
"""Create versioned, checksum-verified release assets from the checked-out source."""
from pathlib import Path
import hashlib
import json
import os
import shutil
import subprocess
import sys
import zipfile

root = Path(__file__).resolve().parents[1]
dist = root / "dist"
out = dist / "release"
if out.exists():
    shutil.rmtree(out)
out.mkdir(parents=True)
subprocess.run([sys.executable, str(root / "scripts/build-single.py")], cwd=root, check=True)
standalone = dist / "easy-home-3d.html"
if not standalone.is_file() or not standalone.stat().st_size:
    raise SystemExit("Standalone build missing")
shutil.copyfile(standalone, out / "Easy3DHome.html")
with zipfile.ZipFile(out / "Easy3DHome-offline.zip", "w", zipfile.ZIP_DEFLATED) as z:
    z.write(standalone, "index.html")
    z.write(root / "LICENSE", "LICENSE")
site_builder = root / "scripts/build-site.py"
if site_builder.is_file():
    subprocess.run([sys.executable, str(site_builder)], cwd=root, check=True)
    site = dist / "site"
    version = json.loads((site / "version.json").read_text(encoding="utf-8"))
    sha = os.environ.get("GITHUB_SHA") or subprocess.check_output(["git", "rev-parse", "HEAD"], cwd=root, text=True).strip()
    if version.get("commit") != sha:
        raise SystemExit("Public site version does not match build commit")
    with zipfile.ZipFile(out / "Easy3DHome-web.zip", "w", zipfile.ZIP_DEFLATED) as z:
        for p in sorted(site.rglob("*")):
            if p.is_file():
                z.write(p, p.relative_to(site).as_posix())
elif os.environ.get("GITHUB_EVENT_NAME") == "workflow_dispatch":
    raise SystemExit("Integrated allow-listed public site builder required")
for p in out.glob("*.zip"):
    with zipfile.ZipFile(p) as z:
        if z.testzip() or "index.html" not in z.namelist():
            raise SystemExit(f"Invalid archive: {p.name}")
hashes = [f"{hashlib.sha256(p.read_bytes()).hexdigest()}  {p.name}" for p in sorted(out.iterdir()) if p.is_file()]
(out / "SHA256SUMS").write_text("\n".join(hashes) + "\n", encoding="ascii")
print("Release assets:", ", ".join(p.name for p in sorted(out.iterdir())))
