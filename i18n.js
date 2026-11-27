/* UI-only localization. Saved user names are not translated on load. */
(function(){
"use strict";
const messages={
"方案及收費":["Plans and pricing","方案及收费"],"目前只支援測試付款，未啟用真實收費。開源本機核心功能保持免費。":["Test checkout only; live charging is disabled. Open-source local core remains free.","目前仅支持测试付款，未启用真实收费。开源本地核心功能保持免费。"],"一次性 · 測試模式":["One-time · Test mode","一次性 · 测试模式"],"雲端專業方案 · 測試模式":["Hosted professional plan · Test mode","云端专业方案 · 测试模式"],"測試結帳":["Test checkout","测试结账"],"沒有有效付費權限":["No active paid entitlement","没有有效付费权限"],"測試付款未配置":["Test checkout is not configured","测试付款未配置"],
"雲端版本歷史":["Cloud version history","云端版本历史"],"只限擁有人存取版本記錄。保留最近 50 個版本；還原會建立新版本而非覆蓋舊記錄。":["Only the owner can access history. Keeps 50 latest revisions; restoration creates a new revision instead of overwriting history.","仅所有者可访问版本记录。保留最近 50 个版本；恢复将创建新版本，而非覆盖旧记录。"],"比較":["Compare","比较"],"還原此雲端版本？會新增版本記錄。":["Restore this cloud revision? A new revision will be created.","恢复此云端版本？将新增版本记录。"],"已建立新雲端版本":["New cloud revision created","已创建新云端版本"],
"邀請代碼或連結":["Invitation code or link","邀请代码或链接"],"接受共享邀請":["Accept share invitation","接受共享邀请"],"共享圖則":["Share plan","共享图纸"],"邀請連結只可使用一次，收件者必須登入。權限到期或撤銷後，不能再存取雲端圖則；已下載副本無法收回。":["Single-use invitation; recipient must sign in. Expired or revoked access prevents further cloud access, but downloaded copies cannot be recalled.","邀请链接仅可使用一次，接收者必须登录。权限到期或撤销后，无法继续访问云端图纸；已下载副本无法收回。"],"權限":["Permission","权限"],"唯讀":["Read only","只读"],"可編輯":["Can edit","可编辑"],"有效期":["Expires","有效期"],"建立邀請連結":["Create invitation link","创建邀请链接"],"邀請連結":["Invitation link","邀请链接"],"撤銷":["Revoke","撤销"],"共享邀請已接受":["Invitation accepted","共享邀请已接受"],"未使用邀請":["Unused invitation","未使用邀请"],"已接受邀請":["Claimed invitation","已接受邀请"],
"雲端專案":["Cloud projects","云端项目"],"選擇性同步。目前圖則不會自動上傳；登入後可自行上傳及下載。離線功能不受影響。":["Opt-in sync. Plans are never uploaded automatically; sign in to upload or download explicitly. Offline use remains available.","选择性同步。当前图纸不会自动上传；登录后可自行上传及下载。离线功能不受影响。"],"密碼":["Password","密码"],"登入":["Sign in","登录"],"註冊":["Sign up","注册"],"上傳目前專案":["Upload current project","上传当前项目"],"重新整理":["Refresh","刷新"],"登出":["Sign out","退出登录"],"雲端服務未配置；仍可使用本機功能。":["Cloud is not configured; local features remain available.","云端服务未配置；仍可使用本地功能。"],"請確認電郵後再登入。":["Confirm your email before signing in.","请确认邮箱后再登录。"],"雲端同步成功":["Cloud sync successful","云端同步成功"],"下載圖則":["Download plan","下载图纸"],"刪除雲端版本":["Delete cloud version","删除云端版本"],"下載會取代目前本機同步副本，繼續？":["Download will replace the linked local copy. Continue?","下载会替换当前本地同步副本，继续？"],"確定刪除雲端版本？本機資料仍會保留。":["Delete the cloud version? Local data will remain.","确认删除云端版本？本地数据仍会保留。"],"未有雲端專案":["No cloud projects","暂无云端项目"],
"報告品牌設定":["Report branding","报告品牌设置"],"使用自訂報告品牌":["Use custom report branding","使用自定义报告品牌"],"加入你有權使用的公司名稱、報告標題及標誌。僅在選擇自訂品牌匯出時使用。":["Add a company name, report title and logo you have permission to use. Applied only when custom branding is selected.","加入你有权使用的公司名称、报告标题及标志。仅在选择自定义品牌导出时使用。"],"公司名稱":["Company name","公司名称"],"報告標題":["Report title","报告标题"],"品牌顏色":["Brand color","品牌颜色"],"公司標誌":["Company logo","公司标志"],"移除標誌":["Remove logo","移除标志"],"我有權使用此品牌資料":["I have permission to use these brand assets","我有权使用此品牌资料"],"儲存品牌":["Save branding","保存品牌"],
"搜尋專案或客戶":["Search projects or clients","搜索项目或客户"],"專案狀態":["Project status","项目状态"],"全部":["All","全部"],"草稿":["Draft","草稿"],"進行中":["Active","进行中"],"已完成":["Completed","已完成"],"已封存":["Archived","已归档"],"客戶資料":["Client details","客户资料"],"資料保存在目前專案，只在本機使用。此功能不提供多用戶權限隔離。":["Stored in this project on this device. This does not provide multi-user authorization.","数据保存在当前项目，仅在本地使用。此功能不提供多用户权限隔离。"],"客戶名稱":["Client name","客户名称"],"專案編號":["Project reference","项目编号"],"備註":["Notes","备注"],"儲存資料":["Save details","保存资料"],"沒有符合搜尋的專案":["No matching projects","没有符合搜索的项目"],
"版本歷史":["Version history","版本历史"],"本機版本記錄。還原前會保留目前版本；最多保留 12 個版本及約 1 MB 資料。定期匯出 JSON 備份。":["Local version history. Current state is preserved before restoration; up to 12 versions and about 1 MB. Export JSON backups regularly.","本地版本记录。恢复前保留当前版本；最多保存 12 个版本及约 1 MB 数据。定期导出 JSON 备份。"],"版本名稱":["Version name","版本名称"],"儲存目前版本":["Save current version","保存当前版本"],"還原":["Restore","恢复"],"還原前":["Before restore","恢复前"],"還原此版本？目前圖則會保留為另一個版本。":["Restore this version? The current plan will be preserved as another version.","恢复此版本？当前图纸将保留为另一个版本。"],"版本大小超出限制，請匯出 JSON。":["Version exceeds size limit; export JSON instead.","版本大小超出限制，请导出 JSON。"],"版本已儲存":["Version saved","版本已保存"],"版本已還原":["Version restored","版本已恢复"],"未有版本":["No versions yet","暂无版本"],"與目前差異":["Compared with current","与当前差异"],
"描繪平面圖":["Trace floor plan","描绘平面图"],"選擇本機圖片，點兩個已知距離的點，再輸入真實距離。第一點對齊圖則原點，可調整位置及透明度。圖片只保存在本機。":["Choose a local image, click two points of known separation, and enter the distance. First point aligns to the plan origin; offset and opacity are adjustable. Stored locally only.","选择本地图片，点击两个已知距离的点，再输入真实距离。第一点对齐图纸原点，可调整位置及透明度。图片仅保存在本地。"],"平面圖圖片":["Floor plan image","平面图图片"],"點選比例校準點":["Select calibration points","选择比例校准点"],"已知距離 (m)":["Known distance (m)","已知距离 (m)"],"透明度 (%)":["Opacity (%)","透明度 (%)"],"偏移 X (m)":["Offset X (m)","偏移 X (m)"],"偏移 Y (m)":["Offset Y (m)","偏移 Y (m)"],"套用圖片":["Apply image","应用图片"],"移除圖片":["Remove image","移除图片"],"請點選兩個不同位置":["Select two distinct points","请选择两个不同位置"],"比例校準完成":["Calibration ready","比例校准完成"],"圖片無效或太大":["Image invalid or too large","图片无效或太大"],"圖片尺寸超出限制":["Image dimensions exceed limit","图片尺寸超出限制"],"已載入描繪圖片":["Tracing image loaded","已载入描绘图片"],"已移除描繪圖片":["Tracing image removed","已移除描绘图片"],"已儲存圖片，可調整位置與透明度。":["Saved image; adjust offset and opacity.","已保存图片，可调整位置与透明度。"],
"PDF 圖則":["PDF floor plan","PDF 图纸"],"匯出目前樓層 2D 圖則，按實際比例印刷。列印時選 100% 原始大小；核對紙上 50 mm 校準線。":["Export the active 2D floor at a fixed scale. Print at 100% actual size and verify the 50 mm calibration bar.","导出当前楼层 2D 图纸，按实际比例打印。选择 100% 原始大小，核对纸上 50 mm 校准线。"],"紙張":["Paper","纸张"],"比例":["Scale","比例"],"PDF 預覽":["PDF preview","PDF 预览"],"下載 PDF":["Download PDF","下载 PDF"],"圖則太大，請選較小比例或較大紙張。":["Plan is too large; choose a smaller scale or larger paper.","图纸太大，请选择更小比例或更大纸张。"],"圖則已按比例置中。":["Plan centered at selected scale.","图纸已按比例居中。"],"PDF 產生失敗":["PDF generation failed","PDF 生成失败"],
"裝修預算":["Renovation budget","装修预算"],"自行輸入工程項目、數量及單價；包括已定價傢俬，未定價不計入合計。":["Enter work items, quantities and unit costs. Includes priced furniture; excludes unpriced items.","自行输入工程项目、数量及单价；包括已定价家具，未定价不计入合计。"],"＋ 新增項目":["＋ Add item","＋ 添加项目"],"預備金 (%)":["Contingency (%)","预备金 (%)"],"工程項目":["Work item","工程项目"],"工程合計":["Work subtotal","工程合计"],"傢俬合計":["Furniture subtotal","家具合计"],"預備金":["Contingency","预备金"],"預算合計":["Budget total","预算合计"],"未定價項目":["Unpriced items","未定价项目"],"新工程項目":["New work item","新工程项目"],
"傢俬購物清單":["Furniture shopping list","家具购物清单"],"同款同尺寸自動合併數量；價格由你輸入，未定價不計入合計。":["Identical items are grouped. Enter your own prices; unpriced items are excluded from totals.","同款同尺寸自动合并数量；价格由你输入，未定价不计入合计。"],"貨幣":["Currency","货币"],"下載 CSV":["Download CSV","下载 CSV"],"數量":["Quantity","数量"],"單價":["Unit price","单价"],"小計":["Subtotal","小计"],"已定價合計":["Priced subtotal","已定价合计"],"未定價件數":["Unpriced items","未定价件数"],"未定價":["Unpriced","未定价"],"沒有傢俬":["No furniture","没有家具"],"改變貨幣會清除現有價格，不會自動換算。繼續？":["Changing currency clears prices; no conversion. Continue?","改变货币会清除现有价格，不会自动换算。继续？"],
"最小建議淨距 (cm)":["Suggested minimum clearance (cm)","最小建议净距 (cm)"],"淨距提示":["Clearance notices","净距提示"],"沒有低於設定值的淨距。":["No gaps below the chosen threshold.","没有低于设定值的净距。"],"與牆身":["to wall","与墙体"],"傢俬之間":["between furniture","家具之间"],"只檢查同層平面幾何，不代表通行或消防合規。":["Same-floor planar geometry only; not a circulation or fire compliance check.","仅检查同层平面几何，不代表通行或消防合规。"],
"尺寸單位":["Measurement units","尺寸单位"],"目前單位：":["Units: ","当前单位："],
"外觀":["Appearance","外观"],
"深色":["Dark","深色"],
"淺色":["Light","浅色"],
"跟隨系統":["System","跟随系统"],
 "Easy Home 3D · 免費開源裝修圖": [
  "Easy3DHome · Free open-source floor planner",
  "Easy3DHome · 免费开源装修图"
 ],
 "專案名稱": [
  "Project name",
  "项目名称"
 ],
 "本機儲存": [
  "Local storage",
  "本地保存"
 ],
 "專案": [
  "Projects",
  "项目"
 ],
 "匯出 JSON": [
  "Export JSON",
  "导出 JSON"
 ],
 "▦ 2D 平面圖": [
  "▦ 2D plan",
  "▦ 2D 平面图"
 ],
 "⬡ 3D 模型": [
  "⬡ 3D model",
  "⬡ 3D 模型"
 ],
 "樓層": [
  "Floors",
  "楼层"
 ],
 "選取": [
  "Select",
  "选择"
 ],
 "畫房間": [
  "Draw room",
  "画房间"
 ],
 "逐幅畫牆": [
  "Draw walls",
  "逐段画墙"
 ],
 "門": [
  "Door",
  "门"
 ],
 "窗": [
  "Window",
  "窗"
 ],
 "傢俬": [
  "Furniture",
  "家具"
 ],
 "建屋精靈": [
  "Home wizard",
  "建屋向导"
 ],
 "檢查": [
  "Check",
  "检查"
 ],
 "量度": [
  "Measure",
  "测量"
 ],
 "移動畫布": [
  "Pan",
  "移动画布"
 ],
 "吸附：開": [
  "Snap: on",
  "吸附：开"
 ],
 "尺寸：開": [
  "Dimensions: on",
  "尺寸：开"
 ],
 "設定": [
  "Properties",
  "设置"
 ],
 "先畫房間，再加門窗及傢俬。": [
  "Draw a room, then add openings and furniture.",
  "先画房间，再添加门窗和家具。"
 ],
 "0 幅牆 · 0 件傢俬": [
  "0 walls · 0 furniture items",
  "0 段墙 · 0 件家具"
 ],
 "開始設計你的屋企": [
  "Design your home",
  "开始设计你的家"
 ],
 "只需在畫布點兩個角，就可以建立第一間房；之後可以自由畫牆、加門窗和擺傢俬。": [
  "Click two opposite corners to create a room, then draw walls, add doors and windows, and place furniture.",
  "在画布点击两个对角即可创建第一个房间，之后可自由画墙、添加门窗和摆放家具。"
 ],
 "▣ 畫第一間房": [
  "▣ Draw first room",
  "▣ 画第一个房间"
 ],
 "⌂ 建屋精靈": [
  "⌂ Home wizard",
  "⌂ 建屋向导"
 ],
 "示範圖": [
  "Demo plan",
  "示例图"
 ],
 "毋須註冊 · 自動儲存在此瀏覽器 · 資料不會上傳": [
  "No sign-up · Saved in this browser · No uploads",
  "无需注册 · 自动保存在此浏览器 · 数据不会上传"
 ],
 "1 格 = 0.5 m": [
  "1 square = 0.5 m",
  "1 格 = 0.5 m"
 ],
 "屬性及尺寸": [
  "Properties & dimensions",
  "属性及尺寸"
 ],
 "準確尺寸，由你掌握。": [
  "Real dimensions, in your control.",
  "准确尺寸，由你掌握。"
 ],
 "預設尺寸僅供規劃。訂購傢俬或施工前，必須現場覆尺並核對門窗及牆厚。": [
  "Default sizes are for planning only. Verify measurements, openings and wall thickness on site before buying or building.",
  "默认尺寸仅供规划。订购家具或施工前，必须现场复尺并核对门窗及墙厚。"
 ],
 "免費開源 · 無需帳號 · 個人資料預設只存在本機": [
  "Free and open source · No account · Data stays on this device",
  "免费开源 · 无需账号 · 数据默认仅保存在本地"
 ],
 "產品介紹／Languages ↗": [
  "About / Languages ↗",
  "产品介绍／Languages ↗"
 ],
 "我的專案": [
  "My projects",
  "我的项目"
 ],
 "每個專案獨立保存在此瀏覽器。清除瀏覽資料可能導致資料消失，請定期匯出 JSON 備份。": [
  "Each project is stored in this browser. Clearing browser data may erase projects; export JSON backups regularly.",
  "每个项目独立保存在此浏览器。清除浏览数据可能导致数据丢失，请定期导出 JSON 备份。"
 ],
 "＋ 新建空白平面圖": [
  "＋ New blank plan",
  "＋ 新建空白平面图"
 ],
 "新建示範圖": [
  "New demo plan",
  "新建示例图"
 ],
 "匯入 JSON": [
  "Import JSON",
  "导入 JSON"
 ],
 "選擇傢俬": [
  "Choose furniture",
  "选择家具"
 ],
 "選擇後放在畫面中央，可拖動、旋轉、輸入準確闊度／深度／高度，亦可鎖定位置。": [
  "Items appear at the center. Drag, rotate, enter width/depth/height, or lock position.",
  "家具放在画面中央，可拖动、旋转、输入准确宽度／深度／高度，也可锁定位置。"
 ],
 "30 秒學識用": [
  "Quick start guide",
  "30 秒快速入门"
 ],
 "兩層樓：": [
  "Multiple floors:",
  "多楼层："
 ],
 "工具列「樓層」可切換地下／一樓，＋／－ 加層或刪頂層；2D 只顯示目前樓層，3D 會把所有樓層建築物疊起來。建屋精靈可選 1 或 2 層。": [
  "Use the floor tabs and plus/minus buttons to add or remove the top floor. 2D shows the active floor; 3D stacks all floors. The wizard supports one or two floors.",
  "工具栏“楼层”可切换首层／二层，＋／－ 添加楼层或删除顶层；2D 仅显示当前楼层，3D 将所有楼层叠加。建屋向导可选 1 或 2 层。"
 ],
 "快速起屋：": [
  "Build quickly:",
  "快速建屋："
 ],
 "用「建屋精靈」輸入總長、總闊及睡房數目，即時建立外牆、間隔、門窗、廚廁設備、床及衣櫃；再用「檢查」確認沒有門窗重疊、牆身斷開或傢俬碰撞。": [
  "Enter overall dimensions and bedrooms in the home wizard to generate walls, partitions, openings, fixtures and furniture. Run Check for overlaps and disconnected walls.",
  "使用“建屋向导”输入总长、总宽及卧室数量，生成外墙、隔墙、门窗、厨卫设备、床及衣柜；再使用“检查”确认是否存在重叠、断墙或家具碰撞。"
 ],
 "新手畫房間：": [
  "Draw a room:",
  "新手画房间："
 ],
 "揀「畫房間」，點兩個對角即可建立長方形四面牆。揀「逐幅畫牆」可畫不規則房間，按 Esc 結束。": [
  "Choose Draw room and click opposite corners for four rectangular walls. Draw walls creates irregular rooms; press Esc to finish.",
  "选择“画房间”，点击两个对角即可创建矩形四面墙。“逐段画墙”可绘制不规则房间，按 Esc 结束。"
 ],
 "改尺寸：": [
  "Edit dimensions:",
  "修改尺寸："
 ],
 "選一幅牆可輸入牆長、牆兩端坐標、牆厚與高度；直接拖動牆端點也可調整，相接的牆會跟隨。單位為米。": [
  "Select a wall to enter length, endpoints, thickness and height. Drag endpoints to move connected walls. Units are meters.",
  "选择一段墙可输入墙长、两端坐标、墙厚及高度；拖动端点时相连墙体也会跟随。单位为米。"
 ],
 "門窗：": [
  "Doors and windows:",
  "门窗："
 ],
 "選「門」或「窗」，再按在任何牆上；可修改闊度、離牆角距離及窗台高度。": [
  "Choose Door or Window and click a wall. Adjust width, offset and sill height.",
  "选择“门”或“窗”，再点击墙体；可修改宽度、距墙角距离和窗台高度。"
 ],
 "加傢俬：": [
  "Add furniture:",
  "添加家具："
 ],
 "揀傢俬 → 調整闊／深／高 → 在平面圖拖到合適位置；可鎖定、解除鎖定、複製及刪除。移動也可直接輸入 X／Y。": [
  "Choose furniture, set width/depth/height, and drag into position. Lock, unlock, duplicate or delete. Enter X/Y for precise positioning.",
  "选择家具 → 调整宽／深／高 → 拖到合适位置；可锁定、解锁、复制及删除。也可直接输入 X／Y 坐标。"
 ],
 "量距離：": [
  "Measure distance:",
  "测量距离："
 ],
 "用「量度」選兩點，顯示相距多少米；2D／3D 可隨時切換。": [
  "Choose Measure and click two points to see their distance. Switch between 2D and 3D anytime.",
  "使用“测量”选择两点，显示距离；2D／3D 可随时切换。"
 ],
 "儲存：": [
  "Save:",
  "保存："
 ],
 "系統在本機自動儲存。可切換多個專案、用 JSON 匯出或匯入；沒有雲端同步。": [
  "Projects auto-save locally. Switch projects or import/export JSON. No cloud sync.",
  "系统自动保存在本地。可切换多个项目、导入或导出 JSON；没有云端同步。"
 ],
 "手機雙指可以縮放及移動畫布；3D 可以旋轉視角，也可直接拖動未鎖定的傢俬。電腦滑鼠滾輪可縮放、拖空白畫布可平移；選定傢俬後方向鍵每次微調 5 cm，Shift＋方向鍵 25 cm。Esc 取消畫牆；Delete 刪除；Ctrl/⌘＋Z 復原。": [
  "On mobile, pinch to zoom and pan. In 3D rotate the view or drag unlocked furniture. On desktop, scroll to zoom and drag empty space to pan. Arrow keys move selected furniture by 5 cm; Shift+arrow by 25 cm. Esc cancels drawing, Delete removes, Ctrl/⌘+Z undoes.",
  "手机双指缩放及移动画布；3D 可旋转视角，也可拖动未锁定家具。电脑滚轮缩放，拖动空白画布平移；方向键微调家具 5 cm，Shift＋方向键 25 cm。Esc 取消画墙；Delete 删除；Ctrl/⌘＋Z 撤销。"
 ],
 "建屋精靈 · 由零起一間屋": [
  "Home wizard · Build from scratch",
  "建屋向导 · 从零建屋"
 ],
 "輸入大致尺寸，即時產生外牆、間隔牆、大門、窗戶、廚廁設備、睡房床及衣櫃。所有物件其後都可以逐項修改。": [
  "Enter approximate dimensions to generate walls, partitions, doors, windows, fixtures, beds and wardrobes. Every item can be edited afterward.",
  "输入大致尺寸，生成外墙、隔墙、大门、窗户、厨卫设备、床及衣柜。所有物件都可逐项修改。"
 ],
 "總長 (m)": [
  "Width (m)",
  "总长 (m)"
 ],
 "總闊 (m)": [
  "Depth (m)",
  "总宽 (m)"
 ],
 "睡房數目": [
  "Bedrooms",
  "卧室数量"
 ],
 "1 間": [
  "1",
  "1 间"
 ],
 "2 間": [
  "2",
  "2 间"
 ],
 "3 間": [
  "3",
  "3 间"
 ],
 "樓層數目": [
  "Number of floors",
  "楼层数量"
 ],
 "1 層": [
  "1 floor",
  "1 层"
 ],
 "2 層（地下＋一樓）": [
  "2 floors (ground + upper)",
  "2 层（首层＋二层）"
 ],
 "⌂ 建立圖則": [
  "⌂ Create plan",
  "⌂ 创建图纸"
 ],
 "取消": [
  "Cancel",
  "取消"
 ],
 "圖則檢查": [
  "Plan check",
  "图纸检查"
 ],
 "即時檢查門窗重疊、開口高度、未接合牆身及傢俬碰撞；只作規劃輔助，不取代專業核對。": [
  "Check overlapping openings, opening heights, disconnected walls and furniture collisions. Planning aid only, not a professional assessment.",
  "即时检查门窗重叠、开口高度、未连接墙体及家具碰撞；仅作规划辅助，不替代专业核对。"
 ],
 "知道了": [
  "Done",
  "知道了"
 ],
 "Easy Home 3D — 免費開源的 2D 平面圖與 3D 裝修規劃工具。畫牆、加門窗、放傢俬、量尺寸、自動儲存。": [
  "Easy3DHome — free open-source 2D floor plan and 3D home planner. Draw walls, add openings and furniture, measure, and save locally.",
  "Easy3DHome — 免费开源的 2D 平面图与 3D 装修规划工具。画墙、添加门窗、放家具、测量尺寸、自动保存。"
 ],
 "我的平面圖": [
  "My floor plan",
  "我的平面图"
 ],
 "編輯專案名稱": [
  "Edit project name",
  "编辑项目名称"
 ],
 "使用教學": [
  "Help",
  "使用教程"
 ],
 "編輯工具": [
  "Editing tools",
  "编辑工具"
 ],
 "新增樓層": [
  "Add floor",
  "添加楼层"
 ],
 "刪除頂層": [
  "Remove top floor",
  "删除顶层"
 ],
 "選取及移動物件": [
  "Select and move objects",
  "选择及移动物件"
 ],
 "點兩個對角快速建立長方形房間": [
  "Click opposite corners to create a rectangular room",
  "点击两个对角快速创建矩形房间"
 ],
 "連續點選兩點畫牆": [
  "Click endpoints to draw walls",
  "依次点击端点画墙"
 ],
 "按一下牆身加門": [
  "Click a wall to add a door",
  "点击墙体添加门"
 ],
 "按一下牆身加窗": [
  "Click a wall to add a window",
  "点击墙体添加窗"
 ],
 "新增傢俬": [
  "Add furniture",
  "添加家具"
 ],
 "輸入尺寸，一次建立多房家居": [
  "Enter dimensions to generate a multi-room home",
  "输入尺寸，一次生成多房间住宅"
 ],
 "檢查門窗、牆身及傢俬問題": [
  "Check openings, walls and furniture",
  "检查门窗、墙体及家具问题"
 ],
 "點選兩點測量距離": [
  "Click two points to measure distance",
  "点击两点测量距离"
 ],
 "拖動畫布": [
  "Drag canvas",
  "拖动画布"
 ],
 "復原 (Ctrl/⌘+Z)": [
  "Undo (Ctrl/⌘+Z)",
  "撤销 (Ctrl/⌘+Z)"
 ],
 "重做": [
  "Redo",
  "重做"
 ],
 "全部置中": [
  "Fit all",
  "全部居中"
 ],
 "屬性": [
  "Properties",
  "属性"
 ],
 "2D／3D 繪圖區": [
  "2D/3D drawing area",
  "2D／3D 绘图区"
 ],
 "可編輯平面圖畫布；使用工具列選擇畫牆、量度、傢俬": [
  "Editable floor plan canvas; use toolbar to draw, measure or add furniture",
  "可编辑平面图画布；使用工具栏画墙、测量、添加家具"
 ],
 "放大": [
  "Zoom in",
  "放大"
 ],
 "縮小": [
  "Zoom out",
  "缩小"
 ],
 "顯示全部": [
  "Fit all",
  "显示全部"
 ],
 "尺寸及物件屬性": [
  "Dimensions and object properties",
  "尺寸及物件属性"
 ],
 "關閉": [
  "Close",
  "关闭"
 ],
 "我的新居": [
  "My new home",
  "我的新家"
 ],
 "語言": [
  "Language",
  "语言"
 ],
 "✓ 本機已儲存": [
  "✓ Saved locally",
  "✓ 已保存到本地"
 ],
 "⚠ 未能儲存，請匯出備份": [
  "⚠ Save failed; export a backup",
  "⚠ 保存失败，请导出备份"
 ],
 "儲存中…": [
  "Saving…",
  "保存中…"
 ],
 "已經沒有可以復原的操作": [
  "Nothing to undo",
  "没有可撤销的操作"
 ],
 "已復原": [
  "Undone",
  "已撤销"
 ],
 "已經沒有可以重做的操作": [
  "Nothing to redo",
  "没有可重做的操作"
 ],
 "已重做": [
  "Redone",
  "已重做"
 ],
 "吸附：": [
  "Snap: ",
  "吸附："
 ],
 "開": [
  "On",
  "开"
 ],
 "關": [
  "Off",
  "关"
 ],
 "尺寸：": [
  "Dimensions: ",
  "尺寸："
 ],
 "幅牆 ·": [
  "walls ·",
  "段墙 ·"
 ],
 "個門窗 ·": [
  "openings ·",
  "个门窗 ·"
 ],
 "件傢俬": [
  "furniture items",
  "件家具"
 ],
 "3D 模式：拖動旋轉，滾輪縮放，按 2D 可返回編輯。": [
  "3D: drag to orbit, scroll to zoom; choose 2D to edit.",
  "3D 模式：拖动旋转，滚轮缩放，点击 2D 返回编辑。"
 ],
 "畫房間：依次點選兩個對角，立即建立四幅牆。點 Esc 可以取消。": [
  "Draw room: choose two opposite corners to create four walls. Esc cancels.",
  "画房间：依次点击两个对角，创建四段墙。Esc 取消。"
 ],
 "逐幅畫牆：點起點及終點；連續畫牆，回到第一點可結束，亦可按 Esc。": [
  "Draw walls: click endpoints; return to the first point to close, or press Esc.",
  "逐段画墙：点击起点及终点；返回第一点闭合，或按 Esc 结束。"
 ],
 "加入門：按一下牆身，再於右側輸入實際門闊。": [
  "Add door: click a wall, then set its width in properties.",
  "添加门：点击墙体，再在属性中输入实际门宽。"
 ],
 "加入窗：按一下牆身，再調整窗闊、窗高及窗台高度。": [
  "Add window: click a wall, then set width, height and sill.",
  "添加窗：点击墙体，再调整窗宽、窗高及窗台高度。"
 ],
 "量度：先按起點，再按終點，顯示兩點距離。": [
  "Measure: click start and end points to see distance.",
  "测量：先点击起点，再点击终点，显示两点距离。"
 ],
 "移動畫布：拖動畫面；滑鼠滾輪縮放。": [
  "Pan: drag the canvas; scroll to zoom.",
  "移动画布：拖动画面；滚轮缩放。"
 ],
 "第 1 步／3：揀「畫房間」點兩個對角，或者逐幅畫牆。": [
  "Step 1/3: draw a room using opposite corners, or draw walls.",
  "第 1 步／3：选择“画房间”点击两个对角，或逐段画墙。"
 ],
 "第 2 步／3：已畫出牆身；下一步加入門窗，或直接放傢俬。": [
  "Step 2/3: walls are ready; add openings or furniture.",
  "第 2 步／3：墙体已绘制；添加门窗或直接放家具。"
 ],
 "第 3 步／3：加傢俬、修改闊深高並移動到正確位置。": [
  "Step 3/3: add furniture, set dimensions and position.",
  "第 3 步／3：添加家具，修改宽深高并移动到正确位置。"
 ],
 "完成基本擺位：可選取物件微調尺寸、轉 3D、匯出 JSON 備份。": [
  "Layout ready: refine dimensions, view 3D, and export JSON.",
  "基本摆放完成：微调尺寸、切换 3D、导出 JSON 备份。"
 ],
 "單位：米 (m) · 格線按縮放顯示": [
  "Units: meters (m) · Grid adapts to zoom",
  "单位：米 (m) · 网格随缩放显示"
 ],
 "透視 3D · 模型尺寸以米 (m) 計": [
  "Perspective 3D · Model dimensions in meters",
  "透视 3D · 模型尺寸以米 (m) 计"
 ],
 "已選取：": [
  "Selected: ",
  "已选择："
 ],
 "牆身": [
  "Wall",
  "墙体"
 ],
 "門窗": [
  "Openings",
  "门窗"
 ],
 "請先畫牆，再按牆身加入": [
  "Draw a wall first, then click to add a ",
  "请先画墙，再点击墙体添加"
 ],
 "牆太短，無法放置門窗": [
  "Wall is too short for an opening",
  "墙太短，无法放置门窗"
 ],
 "這個位置已有門窗，請移到其他牆段（至少預留 5 cm）": [
  "Opening already present; leave at least 5 cm clearance",
  "此位置已有门窗，请移到其他墙段（至少预留 5 cm）"
 ],
 "已鎖定，請先解除鎖定": [
  "Locked; unlock first",
  "已锁定，请先解锁"
 ],
 "房間長及闊最少 0.4 米；請選較遠的對角": [
  "Room width and depth must be at least 0.4 m",
  "房间长和宽至少 0.4 米，请选择更远的对角"
 ],
 "這個房間已有四面牆": [
  "This room already has four walls",
  "此房间已有四面墙"
 ],
 "已建立": [
  "Created ",
  "已创建"
 ],
 "米房間；下一步加門窗": [
  "m room; add openings next",
  "米房间；下一步添加门窗"
 ],
 "牆最少需要 0.1 米": [
  "Wall must be at least 0.1 m",
  "墙长至少 0.1 米"
 ],
 "已封閉房間輪廓；可加門窗及傢俬": [
  "Room closed; add openings and furniture",
  "房间轮廓已闭合；可添加门窗和家具"
 ],
 "請選兩個不同位置": [
  "Choose two different points",
  "请选择两个不同位置"
 ],
 "已鎖定傢俬；先到屬性解除鎖定": [
  "Furniture locked; unlock in properties",
  "家具已锁定；请在属性中解锁"
 ],
 "已結束當前繪製": [
  "Drawing finished",
  "当前绘制已结束"
 ],
 "請輸入有效數字": [
  "Enter a valid number",
  "请输入有效数字"
 ],
 "牆長不可少於 0.1 米": [
  "Wall length cannot be less than 0.1 m",
  "墙长不能小于 0.1 米"
 ],
 "牆長必須在 0.1 至 1000 米之間": [
  "Wall length must be 0.1–1000 m",
  "墙长必须在 0.1 至 1000 米之间"
 ],
 "門窗位置重疊，請縮窄或移動至少 5 cm": [
  "Openings overlap; narrow or move by at least 5 cm",
  "门窗位置重叠，请缩窄或移动至少 5 cm"
 ],
 "已刪除": [
  "Deleted ",
  "已删除"
 ],
 "副本": [
  "copy",
  "副本"
 ],
 "已加入": [
  "Added ",
  "已添加"
 ],
 "；現在可直接拖動，或於屬性修改尺寸": [
  "; drag or edit dimensions in properties",
  "；可直接拖动或在属性中修改尺寸"
 ],
 "刪除物件": [
  "Delete object",
  "删除物件"
 ],
 "100% 本機運行": [
  "100% local",
  "100% 本地运行"
 ],
 "按一下牆、門窗、傢俬或量度線，即可在此修改尺寸。": [
  "Select a wall, opening, furniture item or measurement to edit it here.",
  "点击墙体、门窗、家具或测量线，即可在此修改尺寸。"
 ],
 "新增牆壁後，可在右邊直接輸入精確座標；所有尺寸標籤以": [
  "After drawing walls, enter precise coordinates here. All dimensions use ",
  "添加墙体后，可在此直接输入准确坐标；所有尺寸标签以"
 ],
 "米 (m)": [
  "meters (m)",
  "米 (m)"
 ],
 "顯示。": [
  ".",
  "显示。"
 ],
 "圖則概覽": [
  "Plan overview",
  "图纸概览"
 ],
 "層 · 目前": [
  "floors · active",
  "层 · 当前"
 ],
 "幅": [
  "walls",
  "段"
 ],
 "個": [
  "items",
  "个"
 ],
 "件": [
  "items",
  "件"
 ],
 "量度線": [
  "Measurement",
  "测量线"
 ],
 "條": [
  "lines",
  "条"
 ],
 "＋ 新增傢俬": [
  "＋ Add furniture",
  "＋ 添加家具"
 ],
 "開啟／管理專案": [
  "Open / manage projects",
  "打开／管理项目"
 ],
 "✓ 檢查圖則": [
  "✓ Check plan",
  "✓ 检查图纸"
 ],
 "長": [
  "Length",
  "长"
 ],
 "m · 高": [
  "m · Height",
  "m · 高"
 ],
 "直接設定牆長": [
  "Set wall length",
  "直接设置墙长"
 ],
 "牆長 (m)": [
  "Wall length (m)",
  "墙长 (m)"
 ],
 "準確端點座標（米）": [
  "Endpoint coordinates (m)",
  "准确端点坐标（米）"
 ],
 "起點 X": [
  "Start X",
  "起点 X"
 ],
 "起點 Y": [
  "Start Y",
  "起点 Y"
 ],
 "終點 X": [
  "End X",
  "终点 X"
 ],
 "終點 Y": [
  "End Y",
  "终点 Y"
 ],
 "牆身規格": [
  "Wall specifications",
  "墙体规格"
 ],
 "牆高 (m)": [
  "Wall height (m)",
  "墙高 (m)"
 ],
 "牆厚 (m)": [
  "Wall thickness (m)",
  "墙厚 (m)"
 ],
 "牆長": [
  "Wall length",
  "墙长"
 ],
 "已放門窗": [
  "Openings",
  "已放置门窗"
 ],
 "直接修改牆長，或拖動兩端黃色控制點。相接牆身會跟隨端點；移動整幅牆時也會保留連接。": [
  "Edit length or drag the yellow endpoint handles. Connected walls follow endpoints and remain connected when moving a wall.",
  "直接修改墙长或拖动两端黄色控制点。相连墙体会跟随端点；移动整段墙时保留连接。"
 ],
 "附在": [
  "Attached to a",
  "附在"
 ],
 "m 牆上": [
  "m wall",
  "m 墙上"
 ],
 "闊度 (m)": [
  "Width (m)",
  "宽度 (m)"
 ],
 "離起點 (m)": [
  "Offset (m)",
  "距起点 (m)"
 ],
 "高度 (m)": [
  "Height (m)",
  "高度 (m)"
 ],
 "窗台離地 (m)": [
  "Sill height (m)",
  "窗台离地 (m)"
 ],
 "開口左邊剩餘牆長": [
  "Remaining wall before opening",
  "开口左侧剩余墙长"
 ],
 "開口右邊剩餘牆長": [
  "Remaining wall after opening",
  "开口右侧剩余墙长"
 ],
 "「離起點」為開口": [
  "Offset is the distance from the wall start to the",
  "“距起点”为开口"
 ],
 "中心": [
  "center",
  "中心"
 ],
 "到牆起點的距離。上面列出開口兩側剩餘牆長，方便預留門邊傢俬空間。": [
  "of the opening. Remaining wall lengths help plan furniture clearance.",
  "到墙体起点的距离。上面列出开口两侧剩余墙长，方便预留门边家具空间。"
 ],
 "🔒 已鎖定位置": [
  "🔒 Position locked",
  "🔒 位置已锁定"
 ],
 "可拖動及修改尺寸": [
  "Drag or edit dimensions",
  "可拖动及修改尺寸"
 ],
 "傢俬名稱": [
  "Furniture name",
  "家具名称"
 ],
 "實際尺寸（米）": [
  "Dimensions (m)",
  "实际尺寸（米）"
 ],
 "闊 (m)": [
  "Width (m)",
  "宽 (m)"
 ],
 "深 (m)": [
  "Depth (m)",
  "深 (m)"
 ],
 "高 (m)": [
  "Height (m)",
  "高 (m)"
 ],
 "擺放位置": [
  "Position",
  "摆放位置"
 ],
 "中心 X": [
  "Center X",
  "中心 X"
 ],
 "中心 Y": [
  "Center Y",
  "中心 Y"
 ],
 "旋轉 (°)": [
  "Rotation (°)",
  "旋转 (°)"
 ],
 "顏色": [
  "Color",
  "颜色"
 ],
 "底面積": [
  "Footprint",
  "占地面积"
 ],
 "傢俬與牆身的邊緣距離": [
  "Furniture-to-wall clearance",
  "家具与墙体边缘距离"
 ],
 "第": [
  "Wall",
  "第"
 ],
 "幅牆": [
  "walls",
  "段墙"
 ],
 "先畫牆，才可計算與牆身的距離。": [
  "Draw walls to calculate clearance.",
  "先画墙，再计算与墙体的距离。"
 ],
 "顯示傢俬外邊緣與牆面的最短平面距離（包括牆厚），不包括門扇開啟及實際施工誤差。": [
  "Shortest planar distance from furniture edge to wall face, including wall thickness; excludes door swing and construction tolerances.",
  "显示家具外边缘到墙面的最短平面距离（含墙厚），不含门扇开启及施工误差。"
 ],
 "✥ 在圖則上移動": [
  "✥ Move on plan",
  "✥ 在图纸上移动"
 ],
 "🔓 解除鎖定": [
  "🔓 Unlock",
  "🔓 解锁"
 ],
 "🔒 鎖定傢俬": [
  "🔒 Lock",
  "🔒 锁定家具"
 ],
 "⟳ 旋轉 90°": [
  "⟳ Rotate 90°",
  "⟳ 旋转 90°"
 ],
 "複製": [
  "Duplicate",
  "复制"
 ],
 "兩點直線距離": [
  "Straight-line distance",
  "两点直线距离"
 ],
 "量度結果": [
  "Distance",
  "测量结果"
 ],
 "目前使用 ·": [
  "Active ·",
  "当前使用 ·"
 ],
 "開啟": [
  "Open",
  "打开"
 ],
 "刪除": [
  "Delete",
  "删除"
 ],
 "永久刪除「": [
  "Permanently delete “",
  "永久删除“"
 ],
 "」？此操作無法復原，建議先匯出 JSON。": [
  "”? This cannot be undone; export JSON first.",
  "”？此操作无法撤销，建议先导出 JSON。"
 ],
 "已載入專案：": [
  "Project loaded: ",
  "已载入项目："
 ],
 "已新增示範圖則": [
  "Demo plan created",
  "已新建示例图"
 ],
 "已新增空白平面圖": [
  "Blank plan created",
  "已新建空白平面图"
 ],
 "已下載 JSON 備份（包括傢俬及尺寸）": [
  "JSON backup downloaded, including dimensions and furniture",
  "已下载 JSON 备份（含家具及尺寸）"
 ],
 "檔案大小超過 3 MB": [
  "File exceeds 3 MB",
  "文件大小超过 3 MB"
 ],
 "成功匯入：": [
  "Imported: ",
  "成功导入："
 ],
 "匯入失敗：": [
  "Import failed: ",
  "导入失败："
 ],
 "只接受 Easy Home 3D 匯出的 JSON。": [
  "Only Easy3DHome JSON exports are supported.",
  "仅支持 Easy3DHome 导出的 JSON。"
 ],
 "建築面積": [
  "Floor area",
  "建筑面积"
 ],
 "層": [
  "floors",
  "层"
 ],
 "睡房": [
  "Bedrooms",
  "卧室"
 ],
 "間": [
  "bedrooms",
  "间"
 ],
 "注意：": [
  "Warning: ",
  "注意："
 ],
 "項尺寸問題，建議減少房間或加大尺寸。": [
  "dimension issues; reduce bedrooms or increase size.",
  "项尺寸问题，建议减少房间或增大尺寸。"
 ],
 "✓ 尺寸檢查通過；建立後可再逐項微調。": [
  "✓ Dimension check passed; adjust items after creation.",
  "✓ 尺寸检查通过；创建后可逐项微调。"
 ],
 "請輸入有效長度及闊度": [
  "Enter valid width and depth",
  "请输入有效长度及宽度"
 ],
 "層家居：": [
  "floor home: ",
  "层住宅："
 ],
 "✓ 圖則檢查通過": [
  "✓ Plan check passed",
  "✓ 图纸检查通过"
 ],
 "沒有發現門窗重疊、超出牆身、牆身斷開或傢俬碰撞。此檢查只作規劃輔助，不取代現場覆尺及專業結構評估。": [
  "No overlapping openings, out-of-wall openings, disconnected walls or furniture collisions detected. Planning aid only, not a site measurement or structural assessment.",
  "未发现门窗重叠、超出墙体、墙体断开或家具碰撞。仅作规划辅助，不替代现场复尺及专业结构评估。"
 ],
 "必須修正": [
  "Must fix",
  "必须修正"
 ],
 "建議檢查": [
  "Review suggested",
  "建议检查"
 ],
 "以上為平面幾何檢查；承重牆、消防及建築法規仍需合資格人士核對。": [
  "These are planar geometry checks. Structural, fire and building-code compliance requires qualified professionals.",
  "以上为平面几何检查；承重墙、消防及建筑法规仍需合资格人士核对。"
 ],
 "地下 G/F": [
  "Ground floor",
  "首层"
 ],
 "已切換到": [
  "Switched to ",
  "已切换到"
 ],
 "最多支援 5 層": [
  "Maximum 5 floors",
  "最多支持 5 层"
 ],
 "已新增": [
  "Added ",
  "已添加"
 ],
 "至少保留一層": [
  "Keep at least one floor",
  "至少保留一层"
 ],
 "確定刪除": [
  "Delete ",
  "确认删除"
 ],
 "？該層所有牆、門窗、傢俬及量度都會移除。": [
  "? All walls, openings, furniture and measurements on this floor will be removed.",
  "？该层所有墙体、门窗、家具及测量都会删除。"
 ],
 "載入一般示範平面圖？目前空白圖則會被示範取代。": [
  "Load demo plan? The current empty plan will be replaced.",
  "载入示例平面图？当前空白图纸将被示例替换。"
 ],
 "已鎖定，無法誤拖": [
  "Locked to prevent dragging",
  "已锁定，防止误拖"
 ],
 "已解除鎖定": [
  "Unlocked",
  "已解锁"
 ],
 "請在平面圖直接拖動傢俬，亦可再次開啟屬性輸入座標": [
  "Drag furniture on the plan or reopen properties to enter coordinates",
  "直接在平面图拖动家具，或重新打开属性输入坐标"
 ],
 "梳化": [
  "Sofa",
  "沙发"
 ],
 "雙人床": [
  "Double bed",
  "双人床"
 ],
 "單人床": [
  "Single bed",
  "单人床"
 ],
 "飯枱": [
  "Dining table",
  "餐桌"
 ],
 "椅子": [
  "Chair",
  "椅子"
 ],
 "書枱": [
  "Desk",
  "书桌"
 ],
 "衣櫃": [
  "Wardrobe",
  "衣柜"
 ],
 "書架": [
  "Bookshelf",
  "书架"
 ],
 "雪櫃": [
  "Refrigerator",
  "冰箱"
 ],
 "廚櫃": [
  "Kitchen cabinet",
  "橱柜"
 ],
 "洗衣機": [
  "Washing machine",
  "洗衣机"
 ],
 "自訂方塊": [
  "Custom block",
  "自定义方块"
 ],
 "示範：6 × 4.5 米": [
  "Demo: 6 × 4.5 m",
  "示例：6 × 4.5 米"
 ],
 "浴室櫃": [
  "Bathroom cabinet",
  "浴室柜"
 ],
 "我的兩層屋": [
  "My two-floor home",
  "我的两层住宅"
 ],
 "樓梯（地下）": [
  "Stairs (ground)",
  "楼梯（首层）"
 ],
 "樓梯（一樓）": [
  "Stairs (upper)",
  "楼梯（二层）"
 ],
 "圖則尚沒有牆身，先畫第一間房。": [
  "No walls yet; draw your first room.",
  "图纸尚无墙体，先画第一个房间。"
 ],
 "有牆身短於 0.1 米。": [
  "A wall is shorter than 0.1 m.",
  "存在短于 0.1 米的墙体。"
 ],
 "幅牆有未接合的端點，房間可能未封閉。": [
  "walls have disconnected endpoints; rooms may not be closed.",
  "段墙有未连接端点，房间可能未闭合。"
 ],
 "有門窗依附的牆身已被刪除。": [
  "An opening refers to a deleted wall.",
  "有门窗依附的墙体已被删除。"
 ],
 "有門窗超出牆身範圍。": [
  "An opening extends beyond a wall.",
  "有门窗超出墙体范围。"
 ],
 "有門窗頂部高於牆身。": [
  "An opening is taller than its wall.",
  "有门窗顶部高于墙体。"
 ],
 "同一幅牆上的門窗重疊，或相距少於 5 cm。": [
  "Openings on a wall overlap or are less than 5 cm apart.",
  "同一段墙上的门窗重叠，或相距少于 5 cm。"
 ],
 "」與「": [
  "” and “",
  "”与“"
 ],
 "」在平面上重疊。": [
  "” overlap on the plan.",
  "”在平面上重叠。"
 ],
 "」與牆身重疊。": [
  "” overlaps a wall.",
  "”与墙体重叠。"
 ],
 "不支援的圖則格式或版本": [
  "Unsupported plan format or version",
  "不支持的图纸格式或版本"
 ],
 "圖則資料不完整": [
  "Incomplete plan data",
  "图纸数据不完整"
 ],
 "物件數量超出限制": [
  "Object count exceeds limit",
  "物件数量超过限制"
 ],
 "匯入平面圖": [
  "Imported plan",
  "导入的平面图"
 ],
 "檔案超過 3 MB 限制": [
  "File exceeds 3 MB limit",
  "文件超过 3 MB 限制"
 ]
};
const extra={"方案及收費":{"es":"Planes y precios","ja":"プランと料金"},"測試結帳":{"es":"Pago de prueba","ja":"テスト決済"},"雲端版本歷史":{"es":"Historial en la nube","ja":"クラウド履歴"},"比較":{"es":"Comparar","ja":"比較"},"邀請代碼或連結":{"es":"Código o enlace de invitación","ja":"招待コードまたはリンク"},"接受共享邀請":{"es":"Aceptar invitación","ja":"招待を承認"},"共享圖則":{"es":"Compartir plano","ja":"間取りを共有"},"權限":{"es":"Permiso","ja":"権限"},"唯讀":{"es":"Solo lectura","ja":"閲覧のみ"},"可編輯":{"es":"Puede editar","ja":"編集可能"},"有效期":{"es":"Caduca","ja":"有効期限"},"建立邀請連結":{"es":"Crear enlace de invitación","ja":"招待リンクを作成"},"邀請連結":{"es":"Enlace de invitación","ja":"招待リンク"},"撤銷":{"es":"Revocar","ja":"取り消す"},"雲端專案":{"es":"Proyectos en la nube","ja":"クラウドプロジェクト"},"密碼":{"es":"Contraseña","ja":"パスワード"},"登入":{"es":"Iniciar sesión","ja":"ログイン"},"註冊":{"es":"Registrarse","ja":"登録"},"上傳目前專案":{"es":"Subir proyecto actual","ja":"現在のプロジェクトをアップロード"},"重新整理":{"es":"Actualizar","ja":"更新"},"登出":{"es":"Cerrar sesión","ja":"ログアウト"},"下載圖則":{"es":"Descargar plano","ja":"間取りをダウンロード"},"刪除雲端版本":{"es":"Eliminar versión en la nube","ja":"クラウド版を削除"},"未有雲端專案":{"es":"No hay proyectos en la nube","ja":"クラウドプロジェクトがありません"},"報告品牌設定":{"es":"Marca del informe","ja":"レポートのブランド"},"使用自訂報告品牌":{"es":"Usar marca personalizada","ja":"カスタムブランドを使用"},"公司名稱":{"es":"Nombre de empresa","ja":"会社名"},"報告標題":{"es":"Título del informe","ja":"レポート名"},"品牌顏色":{"es":"Color de marca","ja":"ブランドカラー"},"公司標誌":{"es":"Logotipo de empresa","ja":"会社ロゴ"},"移除標誌":{"es":"Quitar logotipo","ja":"ロゴを削除"},"儲存品牌":{"es":"Guardar marca","ja":"ブランドを保存"},"搜尋專案或客戶":{"es":"Buscar proyectos o clientes","ja":"プロジェクトや顧客を検索"},"專案狀態":{"es":"Estado del proyecto","ja":"プロジェクトの状態"},"全部":{"es":"Todos","ja":"すべて"},"草稿":{"es":"Borrador","ja":"下書き"},"進行中":{"es":"Activo","ja":"進行中"},"已完成":{"es":"Completado","ja":"完了"},"已封存":{"es":"Archivado","ja":"アーカイブ済み"},"客戶資料":{"es":"Datos del cliente","ja":"顧客情報"},"客戶名稱":{"es":"Nombre del cliente","ja":"顧客名"},"專案編號":{"es":"Referencia del proyecto","ja":"プロジェクト番号"},"備註":{"es":"Notas","ja":"メモ"},"儲存資料":{"es":"Guardar datos","ja":"情報を保存"},"沒有符合搜尋的專案":{"es":"No hay coincidencias","ja":"一致するプロジェクトがありません"},"版本歷史":{"es":"Historial de versiones","ja":"バージョン履歴"},"版本名稱":{"es":"Nombre de versión","ja":"バージョン名"},"儲存目前版本":{"es":"Guardar versión actual","ja":"現在のバージョンを保存"},"還原":{"es":"Restaurar","ja":"復元"},"還原前":{"es":"Antes de restaurar","ja":"復元前"},"版本已儲存":{"es":"Versión guardada","ja":"バージョンを保存しました"},"版本已還原":{"es":"Versión restaurada","ja":"バージョンを復元しました"},"未有版本":{"es":"No hay versiones","ja":"バージョンがありません"},"與目前差異":{"es":"Comparado con la actual","ja":"現在の版との比較"},"描繪平面圖":{"es":"Calcar plano","ja":"間取りをトレース"},"平面圖圖片":{"es":"Imagen del plano","ja":"間取り画像"},"點選比例校準點":{"es":"Seleccionar puntos de calibración","ja":"校正点を選択"},"已知距離 (m)":{"es":"Distancia conocida (m)","ja":"既知の距離 (m)"},"透明度 (%)":{"es":"Opacidad (%)","ja":"不透明度 (%)"},"偏移 X (m)":{"es":"Desplazamiento X (m)","ja":"X オフセット (m)"},"偏移 Y (m)":{"es":"Desplazamiento Y (m)","ja":"Y オフセット (m)"},"套用圖片":{"es":"Aplicar imagen","ja":"画像を適用"},"移除圖片":{"es":"Quitar imagen","ja":"画像を削除"},"請點選兩個不同位置":{"es":"Selecciona dos puntos distintos","ja":"異なる2点を選択"},"比例校準完成":{"es":"Calibración lista","ja":"校正完了"},"圖片無效或太大":{"es":"Imagen no válida o demasiado grande","ja":"画像が無効または大きすぎます"},"已載入描繪圖片":{"es":"Imagen cargada","ja":"画像を読み込みました"},"已移除描繪圖片":{"es":"Imagen eliminada","ja":"画像を削除しました"},"PDF 圖則":{"es":"Plano PDF","ja":"間取り図 PDF"},"紙張":{"es":"Papel","ja":"用紙"},"比例":{"es":"Escala","ja":"縮尺"},"PDF 預覽":{"es":"Vista previa PDF","ja":"PDF プレビュー"},"下載 PDF":{"es":"Descargar PDF","ja":"PDF をダウンロード"},"PDF 產生失敗":{"es":"Error al generar PDF","ja":"PDF の生成に失敗しました"},"裝修預算":{"es":"Presupuesto de reforma","ja":"リフォーム予算"},"＋ 新增項目":{"es":"＋ Añadir partida","ja":"＋ 項目を追加"},"預備金 (%)":{"es":"Imprevistos (%)","ja":"予備費 (%)"},"工程項目":{"es":"Partida de obra","ja":"工事項目"},"工程合計":{"es":"Subtotal de obra","ja":"工事小計"},"傢俬合計":{"es":"Subtotal de muebles","ja":"家具小計"},"預備金":{"es":"Imprevistos","ja":"予備費"},"預算合計":{"es":"Presupuesto total","ja":"予算合計"},"未定價項目":{"es":"Sin precio","ja":"価格未設定"},"新工程項目":{"es":"Nueva partida","ja":"新しい工事項目"},"傢俬購物清單":{"es":"Lista de compra de muebles","ja":"家具購入リスト"},"貨幣":{"es":"Moneda","ja":"通貨"},"下載 CSV":{"es":"Descargar CSV","ja":"CSV をダウンロード"},"數量":{"es":"Cantidad","ja":"数量"},"單價":{"es":"Precio unitario","ja":"単価"},"小計":{"es":"Subtotal","ja":"小計"},"已定價合計":{"es":"Subtotal con precio","ja":"価格設定済み小計"},"未定價件數":{"es":"Sin precio","ja":"価格未設定"},"未定價":{"es":"Sin precio","ja":"価格未設定"},"沒有傢俬":{"es":"Sin muebles","ja":"家具なし"},"最小建議淨距 (cm)":{"es":"Separación mínima sugerida (cm)","ja":"推奨最小間隔 (cm)"},"淨距提示":{"es":"Avisos de separación","ja":"間隔の注意事項"},"沒有低於設定值的淨距。":{"es":"No hay espacios por debajo del umbral.","ja":"基準未満の間隔はありません。"},"與牆身":{"es":"a la pared","ja":"壁まで"},"傢俬之間":{"es":"entre muebles","ja":"家具の間"},"尺寸單位":{"es":"Unidades de medida","ja":"測定単位"},"目前單位：":{"es":"Unidades: ","ja":"単位： "},"外觀":{"es":"Apariencia","ja":"外観"},"深色":{"es":"Oscuro","ja":"ダーク"},"淺色":{"es":"Claro","ja":"ライト"},"跟隨系統":{"es":"Sistema","ja":"システム"},"Easy Home 3D · 免費開源裝修圖":{"es":"Easy3DHome · Planificador gratuito de código abierto","ja":"Easy3DHome · 無料のオープンソース間取り作成"},"專案名稱":{"es":"Nombre del proyecto","ja":"プロジェクト名"},"本機儲存":{"es":"Almacenamiento local","ja":"ローカル保存"},"專案":{"es":"Proyectos","ja":"プロジェクト"},"匯出 JSON":{"es":"Exportar JSON","ja":"JSON を出力"},"▦ 2D 平面圖":{"es":"▦ Plano 2D","ja":"▦ 2D 間取り"},"⬡ 3D 模型":{"es":"⬡ Modelo 3D","ja":"⬡ 3D モデル"},"樓層":{"es":"Plantas","ja":"階"},"選取":{"es":"Seleccionar","ja":"選択"},"畫房間":{"es":"Dibujar habitación","ja":"部屋を描く"},"逐幅畫牆":{"es":"Dibujar paredes","ja":"壁を描く"},"門":{"es":"Puerta","ja":"ドア"},"窗":{"es":"Ventana","ja":"窓"},"傢俬":{"es":"Muebles","ja":"家具"},"建屋精靈":{"es":"Asistente de vivienda","ja":"住宅ウィザード"},"檢查":{"es":"Comprobar","ja":"チェック"},"量度":{"es":"Medir","ja":"測定"},"移動畫布":{"es":"Mover vista","ja":"移動"},"吸附：開":{"es":"Ajuste: sí","ja":"スナップ：オン"},"尺寸：開":{"es":"Cotas: sí","ja":"寸法：オン"},"設定":{"es":"Propiedades","ja":"プロパティ"},"先畫房間，再加門窗及傢俬。":{"es":"Dibuja una habitación y añade puertas, ventanas y muebles.","ja":"部屋を描いて開口部と家具を追加します。"},"0 幅牆 · 0 件傢俬":{"es":"0 paredes · 0 muebles","ja":"壁 0 · 家具 0"},"開始設計你的屋企":{"es":"Diseña tu hogar","ja":"住まいをデザイン"},"只需在畫布點兩個角，就可以建立第一間房；之後可以自由畫牆、加門窗和擺傢俬。":{"es":"Haz clic en dos esquinas opuestas para crear una habitación. Añade paredes, puertas, ventanas y muebles.","ja":"対角の2点をクリックして部屋を作成し、壁、ドア、窓、家具を配置します。"},"▣ 畫第一間房":{"es":"▣ Dibujar primera habitación","ja":"▣ 最初の部屋を描く"},"⌂ 建屋精靈":{"es":"⌂ Asistente de vivienda","ja":"⌂ 住宅ウィザード"},"示範圖":{"es":"Plano de ejemplo","ja":"サンプル間取り"},"毋須註冊 · 自動儲存在此瀏覽器 · 資料不會上傳":{"es":"Sin registro · Guardado en este navegador · Sin subidas","ja":"登録不要 · ブラウザーに保存 · アップロードなし"},"1 格 = 0.5 m":{"es":"1 cuadro = 0,5 m","ja":"1 マス = 0.5 m"},"屬性及尺寸":{"es":"Propiedades y dimensiones","ja":"プロパティと寸法"},"準確尺寸，由你掌握。":{"es":"Dimensiones reales bajo tu control.","ja":"実寸を自由に設定。"},"預設尺寸僅供規劃。訂購傢俬或施工前，必須現場覆尺並核對門窗及牆厚。":{"es":"Los tamaños predeterminados son orientativos. Verifica las medidas antes de comprar o construir.","ja":"既定の寸法は計画用です。購入や施工前に現地で寸法を確認してください。"},"免費開源 · 無需帳號 · 個人資料預設只存在本機":{"es":"Gratis y de código abierto · Sin cuenta · Datos locales","ja":"無料・オープンソース · アカウント不要 · ローカル保存"},"產品介紹／Languages ↗":{"es":"Acerca de / Idiomas ↗","ja":"概要・言語 ↗"},"我的專案":{"es":"Mis proyectos","ja":"マイプロジェクト"},"每個專案獨立保存在此瀏覽器。清除瀏覽資料可能導致資料消失，請定期匯出 JSON 備份。":{"es":"Los proyectos se guardan en el navegador. Exporta copias JSON regularmente.","ja":"プロジェクトはブラウザーに保存されます。JSON のバックアップを定期的に作成してください。"},"＋ 新建空白平面圖":{"es":"＋ Nuevo plano vacío","ja":"＋ 新規間取り"},"新建示範圖":{"es":"Nuevo plano de ejemplo","ja":"新規サンプル"},"匯入 JSON":{"es":"Importar JSON","ja":"JSON を読み込む"},"選擇傢俬":{"es":"Elegir muebles","ja":"家具を選択"},"選擇後放在畫面中央，可拖動、旋轉、輸入準確闊度／深度／高度，亦可鎖定位置。":{"es":"Los muebles aparecen en el centro. Arrastra, gira, cambia dimensiones o bloquea su posición.","ja":"家具は中央に配置されます。移動、回転、寸法変更、位置固定ができます。"},"30 秒學識用":{"es":"Guía rápida","ja":"クイックガイド"},"兩層樓：":{"es":"Varias plantas:","ja":"複数階："},"快速起屋：":{"es":"Construcción rápida:","ja":"すばやく作成："},"新手畫房間：":{"es":"Dibujar una habitación:","ja":"部屋を描く："},"改尺寸：":{"es":"Editar dimensiones:","ja":"寸法を編集："},"門窗：":{"es":"Puertas y ventanas:","ja":"ドアと窓："},"加傢俬：":{"es":"Añadir muebles:","ja":"家具を追加："},"量距離：":{"es":"Medir distancia:","ja":"距離を測定："},"儲存：":{"es":"Guardar:","ja":"保存："},"建屋精靈 · 由零起一間屋":{"es":"Asistente · Crear desde cero","ja":"住宅ウィザード · 新規作成"},"輸入大致尺寸，即時產生外牆、間隔牆、大門、窗戶、廚廁設備、睡房床及衣櫃。所有物件其後都可以逐項修改。":{"es":"Introduce dimensiones aproximadas para generar paredes, puertas, ventanas y muebles. Puedes editar cada objeto después.","ja":"概寸を入力すると壁、ドア、窓、家具が生成されます。各項目は後から編集できます。"},"總長 (m)":{"es":"Ancho (m)","ja":"幅 (m)"},"總闊 (m)":{"es":"Fondo (m)","ja":"奥行き (m)"},"睡房數目":{"es":"Dormitorios","ja":"寝室"},"樓層數目":{"es":"Número de plantas","ja":"階数"},"1 層":{"es":"1 planta","ja":"1 階"},"2 層（地下＋一樓）":{"es":"2 plantas (baja + superior)","ja":"2 階（1階＋2階）"},"⌂ 建立圖則":{"es":"⌂ Crear plano","ja":"⌂ 間取りを作成"},"取消":{"es":"Cancelar","ja":"キャンセル"},"圖則檢查":{"es":"Comprobar plano","ja":"間取りチェック"},"知道了":{"es":"Listo","ja":"完了"},"我的平面圖":{"es":"Mi plano","ja":"マイ間取り"},"編輯專案名稱":{"es":"Editar nombre","ja":"名前を編集"},"使用教學":{"es":"Ayuda","ja":"ヘルプ"},"編輯工具":{"es":"Herramientas","ja":"編集ツール"},"新增樓層":{"es":"Añadir planta","ja":"階を追加"},"刪除頂層":{"es":"Eliminar planta superior","ja":"最上階を削除"},"選取及移動物件":{"es":"Seleccionar y mover objetos","ja":"選択して移動"},"新增傢俬":{"es":"Añadir muebles","ja":"家具を追加"},"拖動畫布":{"es":"Arrastrar lienzo","ja":"キャンバスを移動"},"復原 (Ctrl/⌘+Z)":{"es":"Deshacer (Ctrl/⌘+Z)","ja":"元に戻す (Ctrl/⌘+Z)"},"重做":{"es":"Rehacer","ja":"やり直し"},"全部置中":{"es":"Ajustar todo","ja":"全体表示"},"屬性":{"es":"Propiedades","ja":"プロパティ"},"2D／3D 繪圖區":{"es":"Área de dibujo 2D/3D","ja":"2D/3D 描画エリア"},"放大":{"es":"Acercar","ja":"拡大"},"縮小":{"es":"Alejar","ja":"縮小"},"顯示全部":{"es":"Ajustar todo","ja":"全体表示"},"尺寸及物件屬性":{"es":"Dimensiones y propiedades","ja":"寸法とプロパティ"},"關閉":{"es":"Cerrar","ja":"閉じる"},"我的新居":{"es":"Mi nuevo hogar","ja":"新しい住まい"},"語言":{"es":"Idioma","ja":"言語"},"✓ 本機已儲存":{"es":"✓ Guardado localmente","ja":"✓ ローカルに保存済み"},"⚠ 未能儲存，請匯出備份":{"es":"⚠ Error al guardar; exporta una copia","ja":"⚠ 保存失敗。バックアップを出力してください"},"儲存中…":{"es":"Guardando…","ja":"保存中…"},"已經沒有可以復原的操作":{"es":"Nada que deshacer","ja":"元に戻す操作がありません"},"已復原":{"es":"Deshecho","ja":"元に戻しました"},"已經沒有可以重做的操作":{"es":"Nada que rehacer","ja":"やり直す操作がありません"},"已重做":{"es":"Rehecho","ja":"やり直しました"},"吸附：":{"es":"Ajuste: ","ja":"スナップ："},"開":{"es":"Sí","ja":"オン"},"關":{"es":"No","ja":"オフ"},"尺寸：":{"es":"Cotas: ","ja":"寸法："},"幅牆 ·":{"es":"paredes ·","ja":"壁 ·"},"個門窗 ·":{"es":"aberturas ·","ja":"開口部 ·"},"件傢俬":{"es":"muebles","ja":"家具"},"3D 模式：拖動旋轉，滾輪縮放，按 2D 可返回編輯。":{"es":"3D: arrastra para girar y desplaza para acercar. Edita en 2D.","ja":"3D：ドラッグで回転、スクロールで拡大。編集は2Dで。"},"畫房間：依次點選兩個對角，立即建立四幅牆。點 Esc 可以取消。":{"es":"Elige dos esquinas opuestas. Esc cancela.","ja":"対角の2点を選択。Escでキャンセル。"},"逐幅畫牆：點起點及終點；連續畫牆，回到第一點可結束，亦可按 Esc。":{"es":"Haz clic en los extremos; vuelve al inicio para cerrar o pulsa Esc.","ja":"端点をクリックし、始点に戻るかEscで終了。"},"加入門：按一下牆身，再於右側輸入實際門闊。":{"es":"Haz clic en una pared y ajusta el ancho de la puerta.","ja":"壁をクリックしてドア幅を設定。"},"加入窗：按一下牆身，再調整窗闊、窗高及窗台高度。":{"es":"Haz clic en una pared y ajusta la ventana.","ja":"壁をクリックして窓を設定。"},"量度：先按起點，再按終點，顯示兩點距離。":{"es":"Elige inicio y fin para medir.","ja":"始点と終点を選択して測定。"},"移動畫布：拖動畫面；滑鼠滾輪縮放。":{"es":"Arrastra el lienzo; desplaza para acercar.","ja":"ドラッグで移動、スクロールで拡大。"},"第 1 步／3：揀「畫房間」點兩個對角，或者逐幅畫牆。":{"es":"Paso 1/3: dibuja una habitación o paredes.","ja":"ステップ1/3：部屋または壁を描く。"},"第 2 步／3：已畫出牆身；下一步加入門窗，或直接放傢俬。":{"es":"Paso 2/3: añade aberturas o muebles.","ja":"ステップ2/3：開口部または家具を追加。"},"第 3 步／3：加傢俬、修改闊深高並移動到正確位置。":{"es":"Paso 3/3: añade muebles y ajusta su posición.","ja":"ステップ3/3：家具を追加し位置を調整。"},"完成基本擺位：可選取物件微調尺寸、轉 3D、匯出 JSON 備份。":{"es":"Plano listo: ajusta dimensiones, revisa en 3D y exporta JSON.","ja":"間取り完成：寸法調整、3D確認、JSON出力。"},"已選取：":{"es":"Seleccionado: ","ja":"選択中："},"牆身":{"es":"Pared","ja":"壁"},"門窗":{"es":"Aberturas","ja":"開口部"},"已鎖定，請先解除鎖定":{"es":"Bloqueado; desbloquea primero","ja":"ロック中。先に解除してください"},"請選兩個不同位置":{"es":"Elige dos puntos diferentes","ja":"異なる2点を選択"},"請輸入有效數字":{"es":"Introduce un número válido","ja":"有効な数値を入力"},"已刪除":{"es":"Eliminado ","ja":"削除："},"副本":{"es":"copia","ja":"コピー"},"已加入":{"es":"Añadido ","ja":"追加："},"刪除物件":{"es":"Eliminar objeto","ja":"オブジェクトを削除"},"100% 本機運行":{"es":"100 % local","ja":"100% ローカル"},"按一下牆、門窗、傢俬或量度線，即可在此修改尺寸。":{"es":"Selecciona una pared, abertura, mueble o medida para editar.","ja":"壁、開口部、家具、寸法を選択して編集。"},"米 (m)":{"es":"metros (m)","ja":"メートル (m)"},"圖則概覽":{"es":"Resumen del plano","ja":"間取り概要"},"層 · 目前":{"es":"plantas · activa","ja":"階 · 選択中"},"幅":{"es":"paredes","ja":"壁"},"個":{"es":"elementos","ja":"個"},"件":{"es":"elementos","ja":"個"},"量度線":{"es":"Medición","ja":"測定"},"條":{"es":"líneas","ja":"線"},"＋ 新增傢俬":{"es":"＋ Añadir muebles","ja":"＋ 家具を追加"},"開啟／管理專案":{"es":"Abrir / gestionar proyectos","ja":"プロジェクト管理"},"✓ 檢查圖則":{"es":"✓ Comprobar plano","ja":"✓ 間取りチェック"},"長":{"es":"Longitud","ja":"長さ"},"直接設定牆長":{"es":"Fijar longitud de pared","ja":"壁の長さを設定"},"牆長 (m)":{"es":"Longitud de pared (m)","ja":"壁の長さ (m)"},"準確端點座標（米）":{"es":"Coordenadas de extremos (m)","ja":"端点座標 (m)"},"起點 X":{"es":"Inicio X","ja":"始点 X"},"起點 Y":{"es":"Inicio Y","ja":"始点 Y"},"終點 X":{"es":"Fin X","ja":"終点 X"},"終點 Y":{"es":"Fin Y","ja":"終点 Y"},"牆身規格":{"es":"Especificaciones de pared","ja":"壁の仕様"},"牆高 (m)":{"es":"Altura de pared (m)","ja":"壁の高さ (m)"},"牆厚 (m)":{"es":"Grosor de pared (m)","ja":"壁の厚さ (m)"},"牆長":{"es":"Longitud de pared","ja":"壁の長さ"},"已放門窗":{"es":"Aberturas","ja":"開口部"},"闊度 (m)":{"es":"Ancho (m)","ja":"幅 (m)"},"離起點 (m)":{"es":"Desplazamiento (m)","ja":"オフセット (m)"},"高度 (m)":{"es":"Altura (m)","ja":"高さ (m)"},"窗台離地 (m)":{"es":"Altura de alféizar (m)","ja":"窓台の高さ (m)"},"開口左邊剩餘牆長":{"es":"Pared antes de la abertura","ja":"開口部の手前の壁"},"開口右邊剩餘牆長":{"es":"Pared después de la abertura","ja":"開口部の先の壁"},"中心":{"es":"centro","ja":"中央"},"🔒 已鎖定位置":{"es":"🔒 Posición bloqueada","ja":"🔒 位置固定"},"可拖動及修改尺寸":{"es":"Arrastra o cambia dimensiones","ja":"移動または寸法編集"},"傢俬名稱":{"es":"Nombre del mueble","ja":"家具名"},"實際尺寸（米）":{"es":"Dimensiones (m)","ja":"寸法 (m)"},"闊 (m)":{"es":"Ancho (m)","ja":"幅 (m)"},"深 (m)":{"es":"Fondo (m)","ja":"奥行き (m)"},"高 (m)":{"es":"Altura (m)","ja":"高さ (m)"},"擺放位置":{"es":"Posición","ja":"位置"},"中心 X":{"es":"Centro X","ja":"中心 X"},"中心 Y":{"es":"Centro Y","ja":"中心 Y"},"旋轉 (°)":{"es":"Rotación (°)","ja":"回転 (°)"},"顏色":{"es":"Color","ja":"色"},"底面積":{"es":"Superficie","ja":"占有面積"},"傢俬與牆身的邊緣距離":{"es":"Separación mueble-pared","ja":"家具と壁の間隔"},"第":{"es":"Pared","ja":"壁"},"幅牆":{"es":"paredes","ja":"壁"},"先畫牆，才可計算與牆身的距離。":{"es":"Dibuja paredes para calcular la separación.","ja":"壁を描くと間隔を計算できます。"},"✥ 在圖則上移動":{"es":"✥ Mover en plano","ja":"✥ 間取り上で移動"},"🔓 解除鎖定":{"es":"🔓 Desbloquear","ja":"🔓 ロック解除"},"🔒 鎖定傢俬":{"es":"🔒 Bloquear","ja":"🔒 ロック"},"⟳ 旋轉 90°":{"es":"⟳ Girar 90°","ja":"⟳ 90°回転"},"複製":{"es":"Duplicar","ja":"複製"},"兩點直線距離":{"es":"Distancia recta","ja":"直線距離"},"量度結果":{"es":"Distancia","ja":"距離"},"目前使用 ·":{"es":"Activo ·","ja":"選択中 ·"},"開啟":{"es":"Abrir","ja":"開く"},"刪除":{"es":"Eliminar","ja":"削除"},"已載入專案：":{"es":"Proyecto cargado: ","ja":"プロジェクト読込："},"已新增示範圖則":{"es":"Plano de ejemplo creado","ja":"サンプルを作成しました"},"已新增空白平面圖":{"es":"Plano vacío creado","ja":"新規間取りを作成しました"},"已下載 JSON 備份（包括傢俬及尺寸）":{"es":"Copia JSON descargada","ja":"JSON バックアップを出力しました"},"檔案大小超過 3 MB":{"es":"Archivo superior a 3 MB","ja":"ファイルが3 MBを超えています"},"成功匯入：":{"es":"Importado: ","ja":"読み込み："},"匯入失敗：":{"es":"Error de importación: ","ja":"読み込み失敗："},"建築面積":{"es":"Superficie de planta","ja":"床面積"},"層":{"es":"plantas","ja":"階"},"睡房":{"es":"Dormitorios","ja":"寝室"},"間":{"es":"dormitorios","ja":"寝室"},"注意：":{"es":"Aviso: ","ja":"注意："},"請輸入有效長度及闊度":{"es":"Introduce ancho y fondo válidos","ja":"有効な幅と奥行きを入力"},"✓ 圖則檢查通過":{"es":"✓ Plano comprobado","ja":"✓ チェック完了"},"必須修正":{"es":"Debe corregirse","ja":"要修正"},"建議檢查":{"es":"Revisión recomendada","ja":"確認推奨"},"地下 G/F":{"es":"Planta baja","ja":"1階"},"已切換到":{"es":"Cambió a ","ja":"切替："},"最多支援 5 層":{"es":"Máximo 5 plantas","ja":"最大5階"},"已新增":{"es":"Añadido ","ja":"追加："},"至少保留一層":{"es":"Conserva al menos una planta","ja":"最低1階を残してください"},"確定刪除":{"es":"Eliminar ","ja":"削除："},"已鎖定，無法誤拖":{"es":"Bloqueado","ja":"ロック済み"},"已解除鎖定":{"es":"Desbloqueado","ja":"ロック解除済み"},"梳化":{"es":"Sofá","ja":"ソファ"},"雙人床":{"es":"Cama doble","ja":"ダブルベッド"},"單人床":{"es":"Cama individual","ja":"シングルベッド"},"飯枱":{"es":"Mesa de comedor","ja":"ダイニングテーブル"},"椅子":{"es":"Silla","ja":"椅子"},"書枱":{"es":"Escritorio","ja":"デスク"},"衣櫃":{"es":"Armario","ja":"クローゼット"},"書架":{"es":"Estantería","ja":"本棚"},"雪櫃":{"es":"Refrigerador","ja":"冷蔵庫"},"廚櫃":{"es":"Mueble de cocina","ja":"キッチン収納"},"洗衣機":{"es":"Lavadora","ja":"洗濯機"},"自訂方塊":{"es":"Bloque personalizado","ja":"カスタムブロック"},"示範：6 × 4.5 米":{"es":"Ejemplo: 6 × 4,5 m","ja":"サンプル：6 × 4.5 m"},"浴室櫃":{"es":"Mueble de baño","ja":"洗面台収納"},"我的兩層屋":{"es":"Mi casa de dos plantas","ja":"2階建ての住まい"},"樓梯（地下）":{"es":"Escaleras (baja)","ja":"階段（1階）"},"樓梯（一樓）":{"es":"Escaleras (superior)","ja":"階段（2階）"},"圖則尚沒有牆身，先畫第一間房。":{"es":"No hay paredes; dibuja una habitación.","ja":"壁がありません。最初の部屋を描いてください。"},"有牆身短於 0.1 米。":{"es":"Una pared mide menos de 0,1 m.","ja":"0.1 m 未満の壁があります。"},"不支援的圖則格式或版本":{"es":"Formato o versión no compatible","ja":"非対応の形式またはバージョン"},"圖則資料不完整":{"es":"Datos incompletos","ja":"データが不完全です"},"物件數量超出限制":{"es":"Demasiados objetos","ja":"オブジェクト数が上限を超えています"},"匯入平面圖":{"es":"Plano importado","ja":"読み込んだ間取り"},"檔案超過 3 MB 限制":{"es":"El archivo supera 3 MB","ja":"ファイルが3 MBを超えています"},"目前只支援測試付款，未啟用真實收費。開源本機核心功能保持免費。":{"es":"Solo pagos de prueba; los cobros reales están desactivados. El editor local de código abierto sigue siendo gratuito.","ja":"テスト決済のみ。実際の請求は無効です。オープンソースのローカル編集機能は引き続き無料です。"},"一次性 · 測試模式":{"es":"Pago único · Modo de prueba","ja":"買い切り · テストモード"},"雲端專業方案 · 測試模式":{"es":"Plan profesional alojado · Modo de prueba","ja":"ホスト型プロプラン · テストモード"},"沒有有效付費權限":{"es":"Sin derecho de pago activo","ja":"有効な有料利用権がありません"},"測試付款未配置":{"es":"Pago de prueba sin configurar","ja":"テスト決済が未設定です"},"只限擁有人存取版本記錄。保留最近 50 個版本；還原會建立新版本而非覆蓋舊記錄。":{"es":"Solo el propietario accede al historial. Se conservan las últimas 50 revisiones; restaurar crea una nueva revisión sin sobrescribir las anteriores.","ja":"履歴は所有者のみ閲覧可能です。最新50版を保持し、復元時は既存履歴を上書きせず新しい版を作成します。"},"還原此雲端版本？會新增版本記錄。":{"es":"¿Restaurar esta revisión en la nube? Se creará una nueva revisión.","ja":"このクラウド版を復元しますか？新しい版が作成されます。"},"已建立新雲端版本":{"es":"Nueva revisión en la nube creada","ja":"新しいクラウド版を作成しました"},"邀請連結只可使用一次，收件者必須登入。權限到期或撤銷後，不能再存取雲端圖則；已下載副本無法收回。":{"es":"Invitación de un solo uso; el destinatario debe iniciar sesión. El acceso caducado o revocado impide consultar la nube, pero no recupera copias ya descargadas.","ja":"招待は一度のみ使用可能で、受信者はログインが必要です。期限切れや取消後はクラウドにアクセスできませんが、ダウンロード済みのコピーは回収できません。"},"共享邀請已接受":{"es":"Invitación aceptada","ja":"招待を承認しました"},"未使用邀請":{"es":"Invitación sin usar","ja":"未使用の招待"},"已接受邀請":{"es":"Invitación utilizada","ja":"使用済みの招待"},"選擇性同步。目前圖則不會自動上傳；登入後可自行上傳及下載。離線功能不受影響。":{"es":"Sincronización voluntaria. Nunca se suben planos automáticamente; inicia sesión y sube o descarga de forma explícita. Puedes seguir trabajando sin conexión.","ja":"同期は任意です。間取りは自動送信されません。ログインして明示的にアップロードまたはダウンロードします。オフライン利用も可能です。"},"雲端服務未配置；仍可使用本機功能。":{"es":"La nube no está configurada; las funciones locales siguen disponibles.","ja":"クラウドは未設定です。ローカル機能は利用できます。"},"請確認電郵後再登入。":{"es":"Confirma tu correo antes de iniciar sesión.","ja":"ログイン前にメールを確認してください。"},"雲端同步成功":{"es":"Sincronización correcta","ja":"クラウド同期に成功しました"},"下載會取代目前本機同步副本，繼續？":{"es":"La descarga sustituirá la copia local vinculada. ¿Continuar?","ja":"ダウンロードすると紐付けられたローカルコピーが置き換わります。続行しますか？"},"確定刪除雲端版本？本機資料仍會保留。":{"es":"¿Eliminar la versión en la nube? Los datos locales se conservarán.","ja":"クラウド版を削除しますか？ローカルデータは保持されます。"},"加入你有權使用的公司名稱、報告標題及標誌。僅在選擇自訂品牌匯出時使用。":{"es":"Añade nombre de empresa, título y logotipo que tengas permiso para usar. Solo se aplican con la marca personalizada activada.","ja":"使用許可のある会社名、タイトル、ロゴを追加してください。カスタムブランド選択時のみ適用されます。"},"我有權使用此品牌資料":{"es":"Tengo permiso para usar estos recursos de marca","ja":"これらのブランド素材の使用許可を得ています"},"資料保存在目前專案，只在本機使用。此功能不提供多用戶權限隔離。":{"es":"Guardado en este proyecto y dispositivo. No proporciona autorización multiusuario.","ja":"この端末のプロジェクトに保存されます。複数ユーザーのアクセス権管理は提供しません。"},"本機版本記錄。還原前會保留目前版本；最多保留 12 個版本及約 1 MB 資料。定期匯出 JSON 備份。":{"es":"Historial local. Se conserva el estado actual antes de restaurar; hasta 12 versiones y aproximadamente 1 MB. Exporta copias JSON regularmente.","ja":"ローカル履歴。復元前に現在の状態を保存します。最大12版、約1 MB。定期的にJSONバックアップを出力してください。"},"還原此版本？目前圖則會保留為另一個版本。":{"es":"¿Restaurar esta versión? El plano actual se conservará como otra versión.","ja":"この版を復元しますか？現在の間取りは別の版として保持されます。"},"版本大小超出限制，請匯出 JSON。":{"es":"La versión supera el límite; exporta JSON en su lugar.","ja":"版のサイズが上限を超えています。代わりにJSONを出力してください。"},"選擇本機圖片，點兩個已知距離的點，再輸入真實距離。第一點對齊圖則原點，可調整位置及透明度。圖片只保存在本機。":{"es":"Elige una imagen local, marca dos puntos de distancia conocida e introduce esa distancia. El primer punto se alinea con el origen; puedes ajustar posición y opacidad. Solo se guarda localmente.","ja":"ローカル画像を選択し、距離が分かる2点をクリックして距離を入力します。最初の点は原点に揃います。位置と不透明度を調整できます。ローカル保存のみです。"},"圖片尺寸超出限制":{"es":"Las dimensiones de la imagen superan el límite","ja":"画像の寸法が上限を超えています"},"已儲存圖片，可調整位置與透明度。":{"es":"Imagen guardada; ajusta posición y opacidad.","ja":"画像を保存しました。位置と不透明度を調整できます。"},"匯出目前樓層 2D 圖則，按實際比例印刷。列印時選 100% 原始大小；核對紙上 50 mm 校準線。":{"es":"Exporta la planta 2D activa a escala fija. Imprime al 100 % y verifica la barra de calibración de 50 mm.","ja":"選択中の階の2D間取りを固定縮尺で出力します。100%の実寸印刷で50 mmの校正バーを確認してください。"},"圖則太大，請選較小比例或較大紙張。":{"es":"El plano es demasiado grande; elige una escala menor o papel mayor.","ja":"間取りが大きすぎます。縮尺を小さくするか用紙を大きくしてください。"},"圖則已按比例置中。":{"es":"Plano centrado a la escala elegida.","ja":"選択した縮尺で間取りを中央に配置しました。"},"自行輸入工程項目、數量及單價；包括已定價傢俬，未定價不計入合計。":{"es":"Introduce partidas, cantidades y precios unitarios. Incluye muebles con precio y excluye los que no lo tienen.","ja":"工事項目、数量、単価を入力します。価格設定済みの家具のみ合計に含まれます。"},"同款同尺寸自動合併數量；價格由你輸入，未定價不計入合計。":{"es":"Se agrupan los artículos idénticos. Introduce tus precios; los artículos sin precio no se incluyen en el total.","ja":"同じ項目はまとめられます。価格を入力してください。価格未設定の項目は合計に含まれません。"},"改變貨幣會清除現有價格，不會自動換算。繼續？":{"es":"Cambiar la moneda borra los precios, sin conversión. ¿Continuar?","ja":"通貨を変更すると価格が消去され、換算されません。続行しますか？"},"只檢查同層平面幾何，不代表通行或消防合規。":{"es":"Solo geometría plana de la misma planta; no verifica circulación ni seguridad contra incendios.","ja":"同じ階の平面形状のみ確認します。通行や防火基準への適合性は確認しません。"},"工具列「樓層」可切換地下／一樓，＋／－ 加層或刪頂層；2D 只顯示目前樓層，3D 會把所有樓層建築物疊起來。建屋精靈可選 1 或 2 層。":{"es":"Usa las pestañas y los botones más/menos para añadir o quitar la planta superior. 2D muestra la planta activa y 3D todas las plantas. El asistente admite una o dos plantas.","ja":"階のタブと＋／－ボタンで最上階を追加・削除します。2Dは選択中の階、3Dは全階を表示します。ウィザードは1階または2階に対応します。"},"用「建屋精靈」輸入總長、總闊及睡房數目，即時建立外牆、間隔、門窗、廚廁設備、床及衣櫃；再用「檢查」確認沒有門窗重疊、牆身斷開或傢俬碰撞。":{"es":"Introduce dimensiones generales y dormitorios en el asistente para generar paredes, tabiques, aberturas, instalaciones y muebles. Usa Comprobar para detectar solapamientos y paredes desconectadas.","ja":"住宅ウィザードに全体寸法と寝室数を入力し、壁、間仕切り、開口部、設備、家具を生成します。チェックで重なりや未接続の壁を確認します。"},"揀「畫房間」，點兩個對角即可建立長方形四面牆。揀「逐幅畫牆」可畫不規則房間，按 Esc 結束。":{"es":"Elige Dibujar habitación y haz clic en esquinas opuestas para crear cuatro paredes rectangulares. Dibujar paredes permite formas irregulares; pulsa Esc para terminar.","ja":"部屋を描くを選び、対角の点をクリックして四角形の壁を作成します。壁を描くで不規則な部屋を作り、Escで終了します。"},"選一幅牆可輸入牆長、牆兩端坐標、牆厚與高度；直接拖動牆端點也可調整，相接的牆會跟隨。單位為米。":{"es":"Selecciona una pared para introducir longitud, extremos, grosor y altura. Arrastra los extremos para mover paredes conectadas. Las unidades son metros.","ja":"壁を選択して長さ、端点、厚さ、高さを入力します。端点をドラッグすると接続した壁も移動します。基準単位はメートルです。"},"選「門」或「窗」，再按在任何牆上；可修改闊度、離牆角距離及窗台高度。":{"es":"Elige Puerta o Ventana y haz clic en una pared. Ajusta ancho, desplazamiento y altura de alféizar.","ja":"ドアまたは窓を選び、壁をクリックします。幅、オフセット、窓台高さを調整します。"},"揀傢俬 → 調整闊／深／高 → 在平面圖拖到合適位置；可鎖定、解除鎖定、複製及刪除。移動也可直接輸入 X／Y。":{"es":"Elige muebles, define ancho/fondo/altura y arrástralos a su posición. Bloquea, desbloquea, duplica o elimina. Introduce X/Y para posicionar con precisión.","ja":"家具を選び、幅・奥行き・高さを設定して移動します。ロック、解除、複製、削除が可能です。X/Yを入力して正確に配置します。"},"用「量度」選兩點，顯示相距多少米；2D／3D 可隨時切換。":{"es":"Elige Medir y haz clic en dos puntos para ver la distancia. Cambia entre 2D y 3D en cualquier momento.","ja":"測定を選び2点をクリックすると距離が表示されます。2Dと3Dはいつでも切り替えできます。"},"系統在本機自動儲存。可切換多個專案、用 JSON 匯出或匯入；沒有雲端同步。":{"es":"Los proyectos se guardan automáticamente en local. Cambia de proyecto o importa/exporta JSON. Sin sincronización automática en la nube.","ja":"プロジェクトはローカルに自動保存されます。切替やJSON入出力が可能です。自動クラウド同期はありません。"},"手機雙指可以縮放及移動畫布；3D 可以旋轉視角，也可直接拖動未鎖定的傢俬。電腦滑鼠滾輪可縮放、拖空白畫布可平移；選定傢俬後方向鍵每次微調 5 cm，Shift＋方向鍵 25 cm。Esc 取消畫牆；Delete 刪除；Ctrl/⌘＋Z 復原。":{"es":"En móvil, pellizca para ampliar y mover la vista. En 3D gira la vista o arrastra muebles desbloqueados. En ordenador, desplaza para ampliar y arrastra el espacio vacío. Las flechas mueven muebles 5 cm; Mayús+flecha, 25 cm. Esc cancela, Supr elimina y Ctrl/⌘+Z deshace.","ja":"スマホではピンチで拡大し移動できます。3Dでは視点を回転するかロック解除した家具をドラッグします。PCではスクロールで拡大、空白をドラッグして移動します。矢印キーで5 cm、Shift＋矢印で25 cm移動。Escで描画取消、Deleteで削除、Ctrl/⌘+Zで元に戻します。"},"1 間":{"es":"1","ja":"1"},"2 間":{"es":"2","ja":"2"},"3 間":{"es":"3","ja":"3"},"即時檢查門窗重疊、開口高度、未接合牆身及傢俬碰撞；只作規劃輔助，不取代專業核對。":{"es":"Comprueba solapamientos, alturas de aberturas, paredes desconectadas y colisiones de muebles. Solo ayuda a planificar; no es una evaluación profesional.","ja":"開口部の重なりや高さ、未接続の壁、家具の衝突を確認します。計画補助のみで専門的な評価ではありません。"},"Easy Home 3D — 免費開源的 2D 平面圖與 3D 裝修規劃工具。畫牆、加門窗、放傢俬、量尺寸、自動儲存。":{"es":"Easy3DHome: planificador gratuito de código abierto para planos 2D y hogares 3D. Dibuja paredes, añade aberturas y muebles, mide y guarda localmente.","ja":"Easy3DHome：無料のオープンソース2D間取り・3D住宅プランナー。壁、開口部、家具を配置し、測定してローカルに保存できます。"},"點兩個對角快速建立長方形房間":{"es":"Haz clic en esquinas opuestas para crear una habitación rectangular","ja":"対角の点をクリックして四角い部屋を作成"},"連續點選兩點畫牆":{"es":"Haz clic en los extremos para dibujar paredes","ja":"端点をクリックして壁を描く"},"按一下牆身加門":{"es":"Haz clic en una pared para añadir una puerta","ja":"壁をクリックしてドアを追加"},"按一下牆身加窗":{"es":"Haz clic en una pared para añadir una ventana","ja":"壁をクリックして窓を追加"},"輸入尺寸，一次建立多房家居":{"es":"Introduce dimensiones para generar una vivienda con varias habitaciones","ja":"寸法を入力して複数の部屋がある住宅を生成"},"檢查門窗、牆身及傢俬問題":{"es":"Comprueba aberturas, paredes y muebles","ja":"開口部、壁、家具を確認"},"點選兩點測量距離":{"es":"Haz clic en dos puntos para medir distancia","ja":"2点をクリックして距離を測定"},"可編輯平面圖畫布；使用工具列選擇畫牆、量度、傢俬":{"es":"Lienzo editable; usa las herramientas para dibujar, medir o añadir muebles","ja":"編集可能な間取りキャンバス。ツールで描画、測定、家具追加ができます"},"單位：米 (m) · 格線按縮放顯示":{"es":"Unidades: metros (m) · Cuadrícula adaptada al zoom","ja":"単位：メートル (m) · 拡大率に応じたグリッド"},"透視 3D · 模型尺寸以米 (m) 計":{"es":"Perspectiva 3D · Dimensiones en metros","ja":"3D透視図 · 寸法はメートル"},"請先畫牆，再按牆身加入":{"es":"Dibuja primero una pared y luego haz clic para añadir ","ja":"先に壁を描いてからクリックして追加："},"牆太短，無法放置門窗":{"es":"La pared es demasiado corta para una abertura","ja":"壁が短すぎて開口部を配置できません"},"這個位置已有門窗，請移到其他牆段（至少預留 5 cm）":{"es":"Ya existe una abertura; deja al menos 5 cm de separación","ja":"既存の開口部から5 cm以上離してください"},"房間長及闊最少 0.4 米；請選較遠的對角":{"es":"Ancho y fondo de la habitación: al menos 0,4 m","ja":"部屋の幅と奥行きは0.4 m以上必要です"},"這個房間已有四面牆":{"es":"Esta habitación ya tiene cuatro paredes","ja":"この部屋にはすでに4面の壁があります"},"已建立":{"es":"Creado ","ja":"作成："},"米房間；下一步加門窗":{"es":"m de habitación; añade aberturas después","ja":"mの部屋。次は開口部を追加"},"牆最少需要 0.1 米":{"es":"La pared debe medir al menos 0,1 m","ja":"壁は0.1 m以上必要です"},"已封閉房間輪廓；可加門窗及傢俬":{"es":"Habitación cerrada; añade aberturas y muebles","ja":"部屋を閉じました。開口部と家具を追加できます"},"已鎖定傢俬；先到屬性解除鎖定":{"es":"Mueble bloqueado; desbloquéalo en propiedades","ja":"家具がロックされています。プロパティで解除してください"},"已結束當前繪製":{"es":"Dibujo terminado","ja":"描画を終了しました"},"牆長不可少於 0.1 米":{"es":"La longitud de pared no puede ser inferior a 0,1 m","ja":"壁の長さは0.1 m以上必要です"},"牆長必須在 0.1 至 1000 米之間":{"es":"La longitud de pared debe estar entre 0,1 y 1000 m","ja":"壁の長さは0.1～1000 mである必要があります"},"門窗位置重疊，請縮窄或移動至少 5 cm":{"es":"Las aberturas se solapan; reduce o mueve al menos 5 cm","ja":"開口部が重なっています。縮小するか5 cm以上移動してください"},"；現在可直接拖動，或於屬性修改尺寸":{"es":"; arrastra o edita las dimensiones en propiedades","ja":"。移動またはプロパティで寸法を編集できます"},"新增牆壁後，可在右邊直接輸入精確座標；所有尺寸標籤以":{"es":"Tras dibujar paredes, introduce aquí las coordenadas precisas. Las dimensiones usan ","ja":"壁を描いた後、正確な座標を入力できます。基準単位は"},"顯示。":{"es":".","ja":"です。"},"m · 高":{"es":"m · Altura","ja":"m · 高さ"},"直接修改牆長，或拖動兩端黃色控制點。相接牆身會跟隨端點；移動整幅牆時也會保留連接。":{"es":"Edita la longitud o arrastra los controles amarillos de los extremos. Las paredes conectadas siguen los extremos y permanecen unidas al moverlas.","ja":"長さを編集するか黄色の端点ハンドルをドラッグします。接続された壁は端点に追従し、壁を移動しても接続を維持します。"},"附在":{"es":"Unido a una pared de","ja":"取り付け先："},"m 牆上":{"es":"m de pared","ja":"mの壁"},"「離起點」為開口":{"es":"El desplazamiento es la distancia desde el inicio de la pared hasta el","ja":"オフセットは壁の始点から開口部の"},"到牆起點的距離。上面列出開口兩側剩餘牆長，方便預留門邊傢俬空間。":{"es":"de la abertura. Las longitudes restantes ayudan a planificar el espacio para muebles.","ja":"までの距離です。残りの壁長は家具配置の参考になります。"},"顯示傢俬外邊緣與牆面的最短平面距離（包括牆厚），不包括門扇開啟及實際施工誤差。":{"es":"Distancia plana mínima del borde del mueble a la cara de pared, incluido el grosor; excluye giro de puertas y tolerancias de obra.","ja":"家具の端から壁面までの平面上の最短距離（壁厚を含む）。ドアの開閉範囲や施工誤差は含みません。"},"永久刪除「":{"es":"Eliminar permanentemente «","ja":"完全に削除："},"」？此操作無法復原，建議先匯出 JSON。":{"es":"»? No se puede deshacer; exporta JSON antes.","ja":"？取り消せません。先にJSONを出力してください。"},"只接受 Easy Home 3D 匯出的 JSON。":{"es":"Solo se admiten archivos JSON exportados por Easy3DHome.","ja":"Easy3DHomeから出力したJSONのみ対応しています。"},"項尺寸問題，建議減少房間或加大尺寸。":{"es":"problemas de dimensiones; reduce dormitorios o aumenta el tamaño.","ja":"件の寸法の問題。寝室数を減らすか全体を広げてください。"},"✓ 尺寸檢查通過；建立後可再逐項微調。":{"es":"✓ Dimensiones correctas; ajusta los objetos después de crear.","ja":"✓ 寸法チェック合格。作成後に各項目を調整できます。"},"層家居：":{"es":"plantas: ","ja":"階建て住宅："},"沒有發現門窗重疊、超出牆身、牆身斷開或傢俬碰撞。此檢查只作規劃輔助，不取代現場覆尺及專業結構評估。":{"es":"No se detectaron aberturas solapadas o fuera de paredes, paredes desconectadas ni colisiones de muebles. Solo ayuda a planificar; no sustituye mediciones ni evaluación estructural.","ja":"開口部の重なりや壁外配置、未接続の壁、家具の衝突は検出されませんでした。計画補助のみで現地測定や構造評価に代わるものではありません。"},"以上為平面幾何檢查；承重牆、消防及建築法規仍需合資格人士核對。":{"es":"Estas comprobaciones son de geometría plana. La conformidad estructural, contra incendios y normativa requiere profesionales cualificados.","ja":"平面形状の確認です。構造、防火、建築基準への適合は有資格者による確認が必要です。"},"？該層所有牆、門窗、傢俬及量度都會移除。":{"es":"? Se eliminarán todas las paredes, aberturas, muebles y mediciones de esta planta.","ja":"？この階の壁、開口部、家具、測定値がすべて削除されます。"},"載入一般示範平面圖？目前空白圖則會被示範取代。":{"es":"¿Cargar el plano de ejemplo? Se sustituirá el plano vacío actual.","ja":"サンプル間取りを読み込みますか？現在の空の間取りが置き換わります。"},"請在平面圖直接拖動傢俬，亦可再次開啟屬性輸入座標":{"es":"Arrastra los muebles en el plano o abre las propiedades para introducir coordenadas","ja":"間取り上で家具をドラッグするか、プロパティで座標を入力"},"幅牆有未接合的端點，房間可能未封閉。":{"es":"paredes tienen extremos desconectados; las habitaciones podrían no estar cerradas.","ja":"面の壁に未接続の端点があります。部屋が閉じていない可能性があります。"},"有門窗依附的牆身已被刪除。":{"es":"Una abertura hace referencia a una pared eliminada.","ja":"削除された壁を参照する開口部があります。"},"有門窗超出牆身範圍。":{"es":"Una abertura se extiende fuera de la pared.","ja":"壁からはみ出す開口部があります。"},"有門窗頂部高於牆身。":{"es":"Una abertura es más alta que su pared.","ja":"壁より高い開口部があります。"},"同一幅牆上的門窗重疊，或相距少於 5 cm。":{"es":"Las aberturas de una pared se solapan o están a menos de 5 cm.","ja":"同じ壁の開口部が重なるか間隔が5 cm未満です。"},"」與「":{"es":"» y «","ja":"」と「"},"」在平面上重疊。":{"es":"» se solapan en el plano.","ja":"」が平面上で重なっています。"},"」與牆身重疊。":{"es":"» se solapa con una pared.","ja":"」が壁と重なっています。"}};
const allowed=["zh-Hant","en","zh-Hans","es","ja"],key="easy-home-3d:locale:v1";
let saved;try{saved=localStorage.getItem(key)}catch(e){}
const param=new URL(location.href).searchParams.get("lang"),locale=allowed.includes(param)?param:allowed.includes(saved)?saved:"zh-Hant";
try{localStorage.setItem(key,locale)}catch(e){}
const idx=locale==="zh-Hans"?1:0;
const missing=new Set();
function plain(value){if(!/[\u3400-\u9fff]/.test(value)||locale==="zh-Hant")return value;const m=value.match(/^(\s*)([\s\S]*?)(\s*)$/);const entry=messages[m[2]];if(!entry){missing.add(m[2]);return value;}const translated=extra[m[2]]?.[locale];if(["es","ja"].includes(locale)&&!translated)missing.add(m[2]);return m[1]+(translated??entry[idx])+m[3];}
function t(value){if(locale==="zh-Hant"||typeof value!=="string")return value;if(/<[^>]+>/.test(value))return value.replace(/(^|>)([^<>]+)(?=<|$)/g,(_,prefix,part)=>prefix+plain(part));return plain(value);}
function staticUI(){document.documentElement.lang=locale;document.title=t(document.title);const walk=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);while(walk.nextNode()){const node=walk.currentNode;if(!node.parentElement.closest("script,style"))node.nodeValue=t(node.nodeValue);}
for(const node of document.querySelectorAll("[title],[aria-label],meta[name=description],#homeName,#projectName"))for(const attr of ["title","aria-label","content","value"]){if(node.hasAttribute(attr))node.setAttribute(attr,t(node.getAttribute(attr)));}
const projects=document.getElementById("projectsButton");projects.dataset.shortLabel=t("專案");document.getElementById("localeSelect").value=locale;}
window.EasyHomeI18n={t,locale,missing,key};staticUI();
})();