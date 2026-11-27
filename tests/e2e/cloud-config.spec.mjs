import {test,expect} from '@playwright/test';
const jwt=role=>[Buffer.from(JSON.stringify({alg:'HS256',typ:'JWT'})).toString('base64url'),Buffer.from(JSON.stringify({role})).toString('base64url'),'synthetic_signature'].join('.');
const publishable='sb_publishable_qa_only_not_a_real_key';
for(const [label,key,enabled] of [['publishable',publishable,true],['legacy-anon',jwt('anon'),true],['secret','sb_secret_qa_only_not_a_real_key',false],['service-role',jwt('service_role'),false],['unknown','qa-only-not-a-real-service-key',false]]){
 test('cloud configuration guard '+label,async({page},info)=>{
  const requests=[];page.on('request',r=>{if(r.url().startsWith('https://qa-cloud.example.invalid/'))requests.push(r.url());});
  await page.addInitScript(key=>{window.Easy3DHomeCloudConfig={url:'https://qa-cloud.example.invalid',key};},key);
  await page.goto('/?lang=en');
  await page.locator('#projectsButton').click();await page.locator('#cloudButton').click();
  expect(await page.evaluate(()=>Easy3DHomeCloud.configured())).toBe(enabled);
  if(enabled){await expect(page.locator('#cloudAuth')).toBeVisible();await page.locator('#cloudLogin').click();await expect(page.locator('#cloudStatus')).toContainText('Enter a valid email');}
  else{await expect(page.locator('#cloudAuth')).toBeHidden();await expect(page.locator('#cloudStatus')).toContainText('not configured');}
  await page.screenshot({path:info.outputPath('cloud-key-'+label+'.png')});
  await page.locator('[data-close=cloudDialog]').last().click();
  await page.locator('#addFurnitureButton').click();await page.locator('#furnitureCatalog button').first().click();await expect(page.locator('#saveStatus')).toContainText('Saved locally');
  expect(requests).toEqual([]);
  await page.screenshot({path:info.outputPath('cloud-key-'+label+'-local.png')});
 });
}
