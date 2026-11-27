#!/usr/bin/env python3
"""Build a strictly allow-listed public site, with no source tree or credentials."""
from pathlib import Path
import shutil, json, os, subprocess
root=Path(__file__).resolve().parents[1]
out=root/'dist'/'site'
if out.exists(): shutil.rmtree(out)
out.mkdir(parents=True)
public=['.nojekyll','index.html','style.css','core.js','renderer.js','app.js','i18n.js','cloud.js','cloud-config.js','robots.txt','sitemap.xml','welcome/index.html','welcome/landing.css','welcome/zh-hant/index.html','welcome/zh-hans/index.html']
for rel in public:
    src=root/rel
    if not src.is_file(): raise SystemExit(f'Missing public asset: {rel}')
    dst=out/rel
    dst.parent.mkdir(parents=True,exist_ok=True)
    shutil.copyfile(src,dst)
# Offline bundle must be built from the SAME commit.
subprocess.run(['python3',str(root/'scripts/build-single.py')],check=True)
shutil.copyfile(root/'dist/easy-home-3d.html',out/'easy-home-3d-standalone.html')
shutil.copyfile(root/'dist/easy-home-3d-convika.zip',out/'easy-home-3d-convika.zip')
# Public build ships with cloud intentionally disabled until a hosted project is configured.
(out/'cloud-config.js').write_text('window.Easy3DHomeCloudConfig = null;\n',encoding='utf-8')
(out/'version.json').write_text(json.dumps({'commit':os.environ.get('GITHUB_SHA') or subprocess.check_output(['git','rev-parse','HEAD'],cwd=root,text=True).strip(),'cloud':'disabled','billing':'disabled'},indent=2)+'\n',encoding='utf-8')
print('Public site:',out, len(list(out.rglob('*'))),'entries')
