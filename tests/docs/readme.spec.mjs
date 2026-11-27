import {test,expect} from '@playwright/test';
import {readFile,access} from 'node:fs/promises';
import {marked} from 'marked';
test('README product homepage: local links, donation model and desktop/mobile preview',async({page},info)=>{
 const source=await readFile('README.md','utf8');
 for(const match of source.matchAll(/\]\(([^)]+)\)|(?:src|href)="([^"]+)"/g)){const target=match[1]||match[2];if(target&&!/^(https?:|#|mailto:)/.test(target))await access(target.split('#')[0]);}
 const body=marked.parse(source,{gfm:true});
 await page.goto('/');
 await page.setContent('<!doctype html><html><head><meta name="viewport" content="width=device-width, initial-scale=1"><base href="http://127.0.0.1:4173/"><style>*{box-sizing:border-box}body{margin:0;color:#24292f;background:#f6f8fa;font:16px/1.6 system-ui,sans-serif}article{max-width:1000px;background:white;border:1px solid #d0d7de;border-radius:8px;padding:clamp(16px,4vw,42px);margin:20px auto;overflow-wrap:anywhere}h1,h2{border-bottom:1px solid #d8dee4;padding-bottom:.3em}h1{font-size:32px}h2{font-size:24px}a{color:#0969da;text-decoration:none}img{max-width:100%;height:auto}table{border-collapse:collapse;width:100%}td,th{border:1px solid #d0d7de;padding:8px 12px}tr:nth-child(even){background:#f6f8fa}code{background:#eff1f3;padding:2px 4px}</style></head><body><article>'+body+'</article></body></html>');
 await expect(page.getByRole('heading',{name:'Easy3DHome',exact:true})).toBeVisible();
 await expect(page.getByRole('heading',{name:'Support the project'})).toBeVisible();
 await expect(page.getByText('There are no paid feature tiers',{exact:false})).toBeVisible();
 await expect(page.locator('img[alt="Actual 3D editor showing a two-floor home"]')).toBeVisible();
 await page.locator('img[alt="Actual 3D editor showing a two-floor home"]').evaluate(img=>img.decode());
 expect(await page.evaluate(()=>document.documentElement.scrollWidth)).toBeLessThanOrEqual(await page.evaluate(()=>innerWidth+1));
 await page.screenshot({path:info.outputPath('readme-homepage.png'),fullPage:true});
});