import {test,expect} from '@playwright/test';
const rows=[
 ['zh-Hant','設計工作區','電郵','7 日','請輸入有效電郵及至少 8 個字元的密碼。'],
 ['zh-Hans','设计工作区','邮箱','7 天','请输入有效邮箱及至少 8 个字符的密码。'],
 ['en','DESIGN WORKSPACE','Email','7 days','Enter a valid email and at least 8 password characters'],
 ['es','ESPACIO DE DISEÑO','Correo electrónico','7 días','Introduce un correo válido y una contraseña de al menos 8 caracteres.'],
 ['ja','設計ワークスペース','メールアドレス','7 日間','有効なメールアドレスと8文字以上のパスワードを入力してください。'],
 ['de','ENTWURFSBEREICH','E-Mail','7 Tage','Gültige E-Mail-Adresse und mindestens 8 Passwortzeichen eingeben.'],
 ['fr','ESPACE DE CONCEPTION','Adresse e-mail','7 jours','Saisissez une adresse e-mail valide et un mot de passe d’au moins 8 caractères.'],
 ['ko','디자인 작업 공간','이메일','7일','유효한 이메일과 8자 이상의 비밀번호를 입력하세요.'],
 ['pt','ESPAÇO DE DESIGN','E-mail','7 dias','Informe um e-mail válido e senha de pelo menos 8 caracteres.']
];
for(const [locale,workspace,email,days,error] of rows){
 test('localized visible cloud validation and labels '+locale,async({page},info)=>{
  await page.addInitScript(()=>{window.Easy3DHomeCloudConfig={url:'http://127.0.0.1:4173',key:'sb_publishable_qa_only_not_a_real_key'};});
  await page.goto('/?lang='+locale);
  await expect(page.locator('#inspector .eyebrow')).toHaveText(workspace);
  await expect(page.locator('#shareDays option[value="7"]')).toHaveText(days);
  await page.locator('#projectsButton').click();await page.locator('#cloudButton').click();
  await expect(page.locator('label[for=cloudEmail]')).toHaveText(email);
  await page.locator('#cloudLogin').click();
  await expect(page.locator('#cloudStatus')).toHaveText(error);
  await page.screenshot({path:info.outputPath(locale+'-cloud-validation.png')});
 });
}
