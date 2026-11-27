import {test,expect} from '@playwright/test';
const locales=["en","zh-Hant","zh-Hans","es","ja","de","fr","ko","pt"];
const expected={"fps":"122051428","eth":"0xc050e720076db090ab2ef3c2ee69bd6e894adf37","sol":"4QFYkpezFhkst6W4uVGKZdZMLJ4KN9MCq5cJrJhBLxfX","polygon":"0xc050e720076db090ab2ef3c2ee69bd6e894adf37","trx":"TNQcbtUTTW5gB6zAQqzetDhrLn7hWQWtem"};
for(const lang of locales) test('direct support '+lang,async({page},info)=>{
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('/support/?lang='+lang);await expect(page.locator('html')).toHaveAttribute('lang',lang);
 await expect(page.locator('h1')).toBeVisible();
 await expect(page.locator('a[href="https://payme.hsbc/toll"]')).toBeVisible();
 await expect(page.locator('a[href="https://app.binance.com/uni-qr/HUYpXw1E"]')).toBeVisible();
 await expect(page.locator('img')).toBeVisible();expect(await page.locator('img').evaluate(i=>i.complete&&i.naturalWidth>0)).toBe(true);
 for(const [id,value] of Object.entries(expected)){await expect(page.locator('#'+id)).toHaveText(value);const button=page.locator('[data-copy="'+id+'"]');await button.click();await expect(button).toHaveAttribute('aria-label',/.+/);await expect(page.locator('#status')).not.toBeEmpty();}
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+2)).toBe(true);
 await page.screenshot({path:info.outputPath('support-'+lang+'.png'),fullPage:true,animations:'disabled'});
 await page.locator('#lang').selectOption(lang==='en'?'zh-Hant':'en');await expect(page.locator('html')).toHaveAttribute('lang',lang==='en'?'zh-Hant':'en');
 await page.locator('#back').click();await expect(page.locator('#stage')).toBeVisible();expect(errors).toEqual([]);
});
test('all landing support links are localized and safe',async({page})=>{for(const lang of locales){const url=lang==='en'?'/welcome/':'/welcome/'+lang.toLowerCase()+'/';await page.goto(url);await page.locator('[data-support]').click();await expect(page.locator('html')).toHaveAttribute('lang',lang);}});
test('payment links are exact external destinations without sending funds',async({page})=>{await page.goto('/support/');for(const url of ['https://payme.hsbc/toll','https://app.binance.com/uni-qr/HUYpXw1E']){const link=page.locator('a[href="'+url+'"]');await expect(link).toHaveAttribute('target','_blank');await expect(link).toHaveAttribute('rel','noopener noreferrer');await page.context().route(url,route=>route.fulfill({status:200,contentType:'text/plain',body:'Mock destination, no transfer'}));const popupPromise=page.waitForEvent('popup');await link.click();const popup=await popupPromise;await popup.waitForLoadState();expect(popup.url()).toBe(url);await popup.close();}});
