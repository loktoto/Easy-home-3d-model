# Easy Home 3D 🏠

**免費、開源、免登入的 2D 平面圖 + 3D 裝修規劃工具。**  
A free, open-source, privacy-first 2D/3D floor-plan and furniture editor that runs entirely in your browser.

[繁體中文](#繁體中文) · [English](#english) · [MIT License](LICENSE)

**Live public demo (Cloudflare Workers):** https://easy-home-3d-open-source.bballinbrowser-loktoto.workers.dev/

> 已透過 Cloudflare Browser Rendering 實際開啟公開網址，確認頁面標題、空白圖則和編輯屬性介面成功渲染。GitHub Pages 目前仍須在倉庫 Settings → Pages 啟用。

> **私隱**：由專案擁有者的私人 House_3D_Model 原型重新設計成通用的空白圖則工具。**不包含私人住宅圖則、私人傢俬記錄、私人 Cloudflare Worker／D1、同步金鑰或存檔。** 原私人 GitHub 倉庫及其雲端資料沒有被公開、修改或連接。

## 繁體中文

### 功能

- 🧱 **由空白開始**：直接畫牆（兩點確定、連續畫牆），支援吸附格線／牆端點。
- 📏 **真實尺寸**：牆長、門窗闊度、傢俬闊 × 深、量度線；精確輸入牆兩端座標、牆高及牆厚，單位米 (m)。
- 🚪 **門窗編輯**：在牆上加門窗，調整闊度、位置、窗台高度；3D 模式呈現開口。
- 🛋️ **自訂傢俬**：12 種物件，包括梳化、床、衣櫃、餐枱、廚櫃、書枱。可改闊、深、高、顏色、角度、位置、名稱。
- 🔒 **鎖定／解鎖／刪除／複製傢俬**：避免誤拖；牆及量度線也可以刪除。
- 🧊 **2D ⇄ 3D**：2D 畫圖、3D 旋轉視角；隨時返回編輯。
- 💾 **本機自動存檔 + 多專案**：使用瀏覽器 localStorage，毋須帳號、資料庫或 API。
- 📁 **JSON 備份／還原**：所有牆、開口、傢俬、鎖定及量度資料均可匯出／重新匯入。
- ↶ **Undo / Redo**：最多 65 次編輯歷史。
- 📱 **支援手機、平板、桌面**：Responsive、無廣告、無追蹤、無外部 JavaScript 依賴。

### 立即使用

開啟網站 →「開始畫牆」→ 按第一個角及第二個角 → 畫出所有牆 → 用「門」、「窗」加入開口 → 加入傢俬 → 切換 3D。選取物件即可輸入準確尺寸。

**本機運行：** 下載整個倉庫，打開 `index.html` 即可；不需要 Node.js、API key 或後端。也可下載 GitHub Actions 的 `easy-home-3d-convika` Artifact，內含單一 HTML。

**GitHub Pages：** 專案設有自動部署工作流程。第一次使用時進入倉庫 **Settings → Pages → Build and deployment → Source: GitHub Actions** 啟用 Pages。正式部署成功後，預設網址是：

https://loktoto.github.io/Easy-home-3d-model/

> 未核實已啟用、部署成功及網址回應之前，不要把上面當作已上線網址。

### 在 Convika 發佈免費公開連結

1. 在 GitHub Actions 下載 `easy-home-3d-convika` 建置成果，或在本機執行 `python3 scripts/build-single.py`。
2. `dist/easy-home-3d.html` 是**自足單一 HTML**，`dist/easy-home-3d-convika.zip` 是同一 HTML 的 ZIP。無外部 JS 依賴，檔案低於 2 MB。
3. 開啟 **[Convika 繁體中文網站](https://convika.com/zh-hant/)**，上傳 HTML 或 ZIP，再用自己的 Convika 帳戶發佈。
4. 把取得的真正 Convika 網址放到 GitHub README、自己的網站或社交平台，令任何人免登入直接用；日後更新可發布新版。

**注意：** Convika 的 *私人預覽* 可能會停用 JavaScript，要在正式發佈頁面才可完整運行編輯器。上傳／發佈需要 Convika 帳戶；**本專案沒有代替任何使用者登入 Convika 或發佈專頁**。平台實際限制以官網為準。

### 開發、測試及版本管理

無 npm 依賴。

~~~bash
node --check core.js
node --check renderer.js
node --check app.js
node --test tests/*.test.cjs
python3 scripts/build-single.py
~~~

| 檔案 | 用途 |
|---|---|
| `index.html` | UI 結構及無障礙操作 |
| `style.css` | 手機／桌面 Responsive 界面 |
| `core.js` | 通用圖則格式、坐標幾何、安全匯入／匯出 |
| `renderer.js` | 2D 畫圖、標尺寸、3D 透視模型 |
| `app.js` | 牆／門窗／傢俬編輯、復原、儲存及專案 |
| `tests/core.test.cjs` | 資料結構及幾何測試 |
| `scripts/build-single.py` | 產生可直接交給 Convika 的 HTML |
| `.github/workflows/site.yml` | GitHub Actions 測試、打包及 Pages 部署 |

### 私隱及施工警告

- 圖則只存於自己的瀏覽器 localStorage；**不會發送到伺服器，沒有雲端同步**。
- 清除瀏覽資料、私人瀏覽模式及儲存空間不足，可能令資料遺失；請定期「匯出 JSON」。
- 不直接支援匯入原私人版本的特製 JSON，避免不當公開私人圖則。
- 本工具**不是 CAD／結構工程或正式施工圖**，亦**沒有自動驗證承重、建築法規、門窗衝突、消防要求或傢俬碰撞**。
- 訂造傢俬、拆牆、鑿牆或裝修之前，請由合資格人士現場覆尺、核對實際結構和法規。

歡迎提交 Issues / PR，改善牆角交匯、房間自動閉合、樓層、材質、DXF/SVG、3D 性能及語言支援。詳見 [CONTRIBUTING.md](CONTRIBUTING.md)。

## English

**Easy Home 3D** is a zero-login, dependency-free 2D/3D home-planning tool. Start from a blank canvas, draw dimensioned walls, add doors and windows, place and lock customizable furniture, measure distances, orbit in 3D, manage locally saved projects, and export/import JSON backups. Reimagined from the owner's private prototype without publishing private plans or data.

**Run:** Open `index.html` in a modern browser or use the CI-generated standalone HTML. **Publish:** Enable GitHub Pages (Settings → Pages → GitHub Actions), or upload the standalone HTML to [Convika](https://convika.com/zh-hant/). **Test:** `node --test tests/*.test.cjs` and `python3 scripts/build-single.py`.

**Privacy:** localStorage only; no auth, telemetry, cloud sync or third-party JS. Back up JSON regularly. **Accuracy:** planning preview only; verify site measurements and building requirements before construction.

**License:** [MIT](LICENSE), © 2026 loktoto.
