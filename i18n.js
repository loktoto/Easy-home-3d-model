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
const extra={"方案及收費":{"es":"Planes y precios","ja":"プランと料金","de":"Tarife und Preise","fr":"Offres et tarifs","ko":"요금제 및 가격","pt":"Planos e preços"},"測試結帳":{"es":"Pago de prueba","ja":"テスト決済","de":"Testzahlung","fr":"Paiement test","ko":"테스트 결제","pt":"Pagamento de teste"},"雲端版本歷史":{"es":"Historial en la nube","ja":"クラウド履歴","de":"Cloud-Versionsverlauf","fr":"Historique cloud","ko":"클라우드 버전 기록","pt":"Histórico na nuvem"},"比較":{"es":"Comparar","ja":"比較","de":"Vergleichen","fr":"Comparer","ko":"비교","pt":"Comparar"},"邀請代碼或連結":{"es":"Código o enlace de invitación","ja":"招待コードまたはリンク","de":"Einladungscode oder Link","fr":"Code ou lien d’invitation","ko":"초대 코드 또는 링크","pt":"Código ou link de convite"},"接受共享邀請":{"es":"Aceptar invitación","ja":"招待を承認","de":"Einladung annehmen","fr":"Accepter l’invitation","ko":"초대 수락","pt":"Aceitar convite"},"共享圖則":{"es":"Compartir plano","ja":"間取りを共有","de":"Grundriss teilen","fr":"Partager le plan","ko":"평면도 공유","pt":"Compartilhar planta"},"權限":{"es":"Permiso","ja":"権限","de":"Berechtigung","fr":"Autorisation","ko":"권한","pt":"Permissão"},"唯讀":{"es":"Solo lectura","ja":"閲覧のみ","de":"Nur lesen","fr":"Lecture seule","ko":"읽기 전용","pt":"Somente leitura"},"可編輯":{"es":"Puede editar","ja":"編集可能","de":"Bearbeiten","fr":"Modification","ko":"편집 가능","pt":"Pode editar"},"有效期":{"es":"Caduca","ja":"有効期限","de":"Gültig bis","fr":"Expire le","ko":"만료","pt":"Expira"},"建立邀請連結":{"es":"Crear enlace de invitación","ja":"招待リンクを作成","de":"Einladungslink erstellen","fr":"Créer un lien d’invitation","ko":"초대 링크 만들기","pt":"Criar link de convite"},"邀請連結":{"es":"Enlace de invitación","ja":"招待リンク","de":"Einladungslink","fr":"Lien d’invitation","ko":"초대 링크","pt":"Link de convite"},"撤銷":{"es":"Revocar","ja":"取り消す","de":"Widerrufen","fr":"Révoquer","ko":"취소","pt":"Revogar"},"雲端專案":{"es":"Proyectos en la nube","ja":"クラウドプロジェクト","de":"Cloud-Projekte","fr":"Projets cloud","ko":"클라우드 프로젝트","pt":"Projetos na nuvem"},"密碼":{"es":"Contraseña","ja":"パスワード","de":"Passwort","fr":"Mot de passe","ko":"비밀번호","pt":"Senha"},"登入":{"es":"Iniciar sesión","ja":"ログイン","de":"Anmelden","fr":"Se connecter","ko":"로그인","pt":"Entrar"},"註冊":{"es":"Registrarse","ja":"登録","de":"Registrieren","fr":"S’inscrire","ko":"가입","pt":"Cadastrar"},"上傳目前專案":{"es":"Subir proyecto actual","ja":"現在のプロジェクトをアップロード","de":"Aktuelles Projekt hochladen","fr":"Téléverser le projet actuel","ko":"현재 프로젝트 업로드","pt":"Enviar projeto atual"},"重新整理":{"es":"Actualizar","ja":"更新","de":"Aktualisieren","fr":"Actualiser","ko":"새로 고침","pt":"Atualizar"},"登出":{"es":"Cerrar sesión","ja":"ログアウト","de":"Abmelden","fr":"Se déconnecter","ko":"로그아웃","pt":"Sair"},"下載圖則":{"es":"Descargar plano","ja":"間取りをダウンロード","de":"Grundriss herunterladen","fr":"Télécharger le plan","ko":"평면도 다운로드","pt":"Baixar planta"},"刪除雲端版本":{"es":"Eliminar versión en la nube","ja":"クラウド版を削除","de":"Cloud-Version löschen","fr":"Supprimer la version cloud","ko":"클라우드 버전 삭제","pt":"Excluir versão na nuvem"},"未有雲端專案":{"es":"No hay proyectos en la nube","ja":"クラウドプロジェクトがありません","de":"Keine Cloud-Projekte","fr":"Aucun projet cloud","ko":"클라우드 프로젝트 없음","pt":"Nenhum projeto na nuvem"},"報告品牌設定":{"es":"Marca del informe","ja":"レポートのブランド","de":"Berichtsdesign","fr":"Identité du rapport","ko":"보고서 브랜드","pt":"Marca do relatório"},"使用自訂報告品牌":{"es":"Usar marca personalizada","ja":"カスタムブランドを使用","de":"Eigenes Design verwenden","fr":"Utiliser une identité personnalisée","ko":"맞춤 브랜드 사용","pt":"Usar marca personalizada"},"公司名稱":{"es":"Nombre de empresa","ja":"会社名","de":"Firmenname","fr":"Nom de l’entreprise","ko":"회사명","pt":"Nome da empresa"},"報告標題":{"es":"Título del informe","ja":"レポート名","de":"Berichtstitel","fr":"Titre du rapport","ko":"보고서 제목","pt":"Título do relatório"},"品牌顏色":{"es":"Color de marca","ja":"ブランドカラー","de":"Markenfarbe","fr":"Couleur de marque","ko":"브랜드 색상","pt":"Cor da marca"},"公司標誌":{"es":"Logotipo de empresa","ja":"会社ロゴ","de":"Firmenlogo","fr":"Logo de l’entreprise","ko":"회사 로고","pt":"Logotipo da empresa"},"移除標誌":{"es":"Quitar logotipo","ja":"ロゴを削除","de":"Logo entfernen","fr":"Retirer le logo","ko":"로고 제거","pt":"Remover logotipo"},"儲存品牌":{"es":"Guardar marca","ja":"ブランドを保存","de":"Design speichern","fr":"Enregistrer l’identité","ko":"브랜드 저장","pt":"Salvar marca"},"搜尋專案或客戶":{"es":"Buscar proyectos o clientes","ja":"プロジェクトや顧客を検索","de":"Projekte oder Kunden suchen","fr":"Rechercher projets ou clients","ko":"프로젝트 또는 고객 검색","pt":"Buscar projetos ou clientes"},"專案狀態":{"es":"Estado del proyecto","ja":"プロジェクトの状態","de":"Projektstatus","fr":"État du projet","ko":"프로젝트 상태","pt":"Status do projeto"},"全部":{"es":"Todos","ja":"すべて","de":"Alle","fr":"Tous","ko":"전체","pt":"Todos"},"草稿":{"es":"Borrador","ja":"下書き","de":"Entwurf","fr":"Brouillon","ko":"초안","pt":"Rascunho"},"進行中":{"es":"Activo","ja":"進行中","de":"Aktiv","fr":"Actif","ko":"진행 중","pt":"Ativo"},"已完成":{"es":"Completado","ja":"完了","de":"Abgeschlossen","fr":"Terminé","ko":"완료","pt":"Concluído"},"已封存":{"es":"Archivado","ja":"アーカイブ済み","de":"Archiviert","fr":"Archivé","ko":"보관됨","pt":"Arquivado"},"客戶資料":{"es":"Datos del cliente","ja":"顧客情報","de":"Kundendaten","fr":"Détails du client","ko":"고객 정보","pt":"Dados do cliente"},"客戶名稱":{"es":"Nombre del cliente","ja":"顧客名","de":"Kundenname","fr":"Nom du client","ko":"고객명","pt":"Nome do cliente"},"專案編號":{"es":"Referencia del proyecto","ja":"プロジェクト番号","de":"Projektreferenz","fr":"Référence du projet","ko":"프로젝트 번호","pt":"Referência do projeto"},"備註":{"es":"Notas","ja":"メモ","de":"Notizen","fr":"Notes","ko":"메모","pt":"Notas"},"儲存資料":{"es":"Guardar datos","ja":"情報を保存","de":"Daten speichern","fr":"Enregistrer les détails","ko":"정보 저장","pt":"Salvar dados"},"沒有符合搜尋的專案":{"es":"No hay coincidencias","ja":"一致するプロジェクトがありません","de":"Keine passenden Projekte","fr":"Aucun projet correspondant","ko":"일치하는 프로젝트 없음","pt":"Nenhum projeto encontrado"},"版本歷史":{"es":"Historial de versiones","ja":"バージョン履歴","de":"Versionsverlauf","fr":"Historique des versions","ko":"버전 기록","pt":"Histórico de versões"},"版本名稱":{"es":"Nombre de versión","ja":"バージョン名","de":"Versionsname","fr":"Nom de version","ko":"버전 이름","pt":"Nome da versão"},"儲存目前版本":{"es":"Guardar versión actual","ja":"現在のバージョンを保存","de":"Aktuelle Version speichern","fr":"Enregistrer la version actuelle","ko":"현재 버전 저장","pt":"Salvar versão atual"},"還原":{"es":"Restaurar","ja":"復元","de":"Wiederherstellen","fr":"Restaurer","ko":"복원","pt":"Restaurar"},"還原前":{"es":"Antes de restaurar","ja":"復元前","de":"Vor Wiederherstellung","fr":"Avant restauration","ko":"복원 전","pt":"Antes de restaurar"},"版本已儲存":{"es":"Versión guardada","ja":"バージョンを保存しました","de":"Version gespeichert","fr":"Version enregistrée","ko":"버전 저장됨","pt":"Versão salva"},"版本已還原":{"es":"Versión restaurada","ja":"バージョンを復元しました","de":"Version wiederhergestellt","fr":"Version restaurée","ko":"버전 복원됨","pt":"Versão restaurada"},"未有版本":{"es":"No hay versiones","ja":"バージョンがありません","de":"Noch keine Versionen","fr":"Aucune version","ko":"버전 없음","pt":"Nenhuma versão"},"與目前差異":{"es":"Comparado con la actual","ja":"現在の版との比較"},"描繪平面圖":{"es":"Calcar plano","ja":"間取りをトレース","de":"Grundriss nachzeichnen","fr":"Tracer le plan","ko":"평면도 따라 그리기","pt":"Traçar planta"},"平面圖圖片":{"es":"Imagen del plano","ja":"間取り画像","de":"Grundrissbild","fr":"Image du plan","ko":"평면도 이미지","pt":"Imagem da planta"},"點選比例校準點":{"es":"Seleccionar puntos de calibración","ja":"校正点を選択","de":"Kalibrierpunkte wählen","fr":"Choisir les points d’étalonnage","ko":"보정점 선택","pt":"Selecionar pontos de calibração"},"已知距離 (m)":{"es":"Distancia conocida (m)","ja":"既知の距離 (m)","de":"Bekannte Distanz (m)","fr":"Distance connue (m)","ko":"알려진 거리 (m)","pt":"Distância conhecida (m)"},"透明度 (%)":{"es":"Opacidad (%)","ja":"不透明度 (%)","de":"Deckkraft (%)","fr":"Opacité (%)","ko":"불투명도 (%)","pt":"Opacidade (%)"},"偏移 X (m)":{"es":"Desplazamiento X (m)","ja":"X オフセット (m)","de":"X-Versatz (m)","fr":"Décalage X (m)","ko":"X 오프셋 (m)","pt":"Deslocamento X (m)"},"偏移 Y (m)":{"es":"Desplazamiento Y (m)","ja":"Y オフセット (m)","de":"Y-Versatz (m)","fr":"Décalage Y (m)","ko":"Y 오프셋 (m)","pt":"Deslocamento Y (m)"},"套用圖片":{"es":"Aplicar imagen","ja":"画像を適用","de":"Bild anwenden","fr":"Appliquer l’image","ko":"이미지 적용","pt":"Aplicar imagem"},"移除圖片":{"es":"Quitar imagen","ja":"画像を削除","de":"Bild entfernen","fr":"Retirer l’image","ko":"이미지 제거","pt":"Remover imagem"},"請點選兩個不同位置":{"es":"Selecciona dos puntos distintos","ja":"異なる2点を選択","de":"Zwei verschiedene Punkte wählen","fr":"Choisir deux points distincts","ko":"서로 다른 두 점 선택","pt":"Selecionar dois pontos distintos"},"比例校準完成":{"es":"Calibración lista","ja":"校正完了","de":"Kalibrierung bereit","fr":"Étalonnage prêt","ko":"보정 완료","pt":"Calibração pronta"},"圖片無效或太大":{"es":"Imagen no válida o demasiado grande","ja":"画像が無効または大きすぎます","de":"Bild ungültig oder zu groß","fr":"Image invalide ou trop grande","ko":"잘못되었거나 너무 큰 이미지","pt":"Imagem inválida ou muito grande"},"已載入描繪圖片":{"es":"Imagen cargada","ja":"画像を読み込みました","de":"Bild geladen","fr":"Image chargée","ko":"이미지 불러옴","pt":"Imagem carregada"},"已移除描繪圖片":{"es":"Imagen eliminada","ja":"画像を削除しました","de":"Bild entfernt","fr":"Image retirée","ko":"이미지 제거됨","pt":"Imagem removida"},"PDF 圖則":{"es":"Plano PDF","ja":"間取り図 PDF","de":"PDF-Grundriss","fr":"Plan PDF","ko":"PDF 평면도","pt":"Planta PDF"},"紙張":{"es":"Papel","ja":"用紙","de":"Papier","fr":"Papier","ko":"용지","pt":"Papel"},"比例":{"es":"Escala","ja":"縮尺","de":"Maßstab","fr":"Échelle","ko":"축척","pt":"Escala"},"PDF 預覽":{"es":"Vista previa PDF","ja":"PDF プレビュー","de":"PDF-Vorschau","fr":"Aperçu PDF","ko":"PDF 미리보기","pt":"Prévia PDF"},"下載 PDF":{"es":"Descargar PDF","ja":"PDF をダウンロード","de":"PDF herunterladen","fr":"Télécharger le PDF","ko":"PDF 다운로드","pt":"Baixar PDF"},"PDF 產生失敗":{"es":"Error al generar PDF","ja":"PDF の生成に失敗しました","de":"PDF-Erstellung fehlgeschlagen","fr":"Échec de la création PDF","ko":"PDF 생성 실패","pt":"Falha ao gerar PDF"},"裝修預算":{"es":"Presupuesto de reforma","ja":"リフォーム予算","de":"Renovierungsbudget","fr":"Budget de rénovation","ko":"리모델링 예산","pt":"Orçamento de reforma"},"＋ 新增項目":{"es":"＋ Añadir partida","ja":"＋ 項目を追加","de":"＋ Posten hinzufügen","fr":"＋ Ajouter un poste","ko":"＋ 항목 추가","pt":"＋ Adicionar item"},"預備金 (%)":{"es":"Imprevistos (%)","ja":"予備費 (%)","de":"Reserve (%)","fr":"Imprévus (%)","ko":"예비비 (%)","pt":"Reserva (%)"},"工程項目":{"es":"Partida de obra","ja":"工事項目","de":"Arbeitsposten","fr":"Poste de travaux","ko":"공사 항목","pt":"Item de obra"},"工程合計":{"es":"Subtotal de obra","ja":"工事小計","de":"Arbeiten gesamt","fr":"Sous-total travaux","ko":"공사 소계","pt":"Subtotal de obras"},"傢俬合計":{"es":"Subtotal de muebles","ja":"家具小計","de":"Möbel gesamt","fr":"Sous-total mobilier","ko":"가구 소계","pt":"Subtotal de móveis"},"預備金":{"es":"Imprevistos","ja":"予備費","de":"Reserve","fr":"Imprévus","ko":"예비비","pt":"Reserva"},"預算合計":{"es":"Presupuesto total","ja":"予算合計","de":"Gesamtbudget","fr":"Budget total","ko":"총예산","pt":"Orçamento total"},"未定價項目":{"es":"Sin precio","ja":"価格未設定","de":"Ohne Preis","fr":"Sans prix","ko":"가격 미설정","pt":"Sem preço"},"新工程項目":{"es":"Nueva partida","ja":"新しい工事項目","de":"Neuer Arbeitsposten","fr":"Nouveau poste","ko":"새 공사 항목","pt":"Novo item de obra"},"傢俬購物清單":{"es":"Lista de compra de muebles","ja":"家具購入リスト","de":"Möbel-Einkaufsliste","fr":"Liste d’achat de meubles","ko":"가구 구매 목록","pt":"Lista de compras de móveis"},"貨幣":{"es":"Moneda","ja":"通貨","de":"Währung","fr":"Devise","ko":"통화","pt":"Moeda"},"下載 CSV":{"es":"Descargar CSV","ja":"CSV をダウンロード","de":"CSV herunterladen","fr":"Télécharger le CSV","ko":"CSV 다운로드","pt":"Baixar CSV"},"數量":{"es":"Cantidad","ja":"数量","de":"Menge","fr":"Quantité","ko":"수량","pt":"Quantidade"},"單價":{"es":"Precio unitario","ja":"単価","de":"Stückpreis","fr":"Prix unitaire","ko":"단가","pt":"Preço unitário"},"小計":{"es":"Subtotal","ja":"小計","de":"Zwischensumme","fr":"Sous-total","ko":"소계","pt":"Subtotal"},"已定價合計":{"es":"Subtotal con precio","ja":"価格設定済み小計","de":"Bewertete Summe","fr":"Sous-total chiffré","ko":"가격 설정 소계","pt":"Subtotal com preço"},"未定價件數":{"es":"Sin precio","ja":"価格未設定","de":"Ohne Preis","fr":"Sans prix","ko":"가격 미설정","pt":"Sem preço"},"未定價":{"es":"Sin precio","ja":"価格未設定","de":"Ohne Preis","fr":"Sans prix","ko":"가격 미설정","pt":"Sem preço"},"沒有傢俬":{"es":"Sin muebles","ja":"家具なし","de":"Keine Möbel","fr":"Aucun meuble","ko":"가구 없음","pt":"Sem móveis"},"最小建議淨距 (cm)":{"es":"Separación mínima sugerida (cm)","ja":"推奨最小間隔 (cm)","de":"Empfohlener Mindestabstand (cm)","fr":"Espacement minimal conseillé (cm)","ko":"권장 최소 간격 (cm)","pt":"Distância mínima sugerida (cm)"},"淨距提示":{"es":"Avisos de separación","ja":"間隔の注意事項","de":"Abstandshinweise","fr":"Alertes d’espacement","ko":"간격 알림","pt":"Avisos de distância"},"沒有低於設定值的淨距。":{"es":"No hay espacios por debajo del umbral.","ja":"基準未満の間隔はありません。","de":"Keine Abstände unter dem Grenzwert.","fr":"Aucun espace sous le seuil.","ko":"기준 미만 간격 없음","pt":"Nenhum espaço abaixo do limite."},"與牆身":{"es":"a la pared","ja":"壁まで","de":"zur Wand","fr":"au mur","ko":"벽까지","pt":"até a parede"},"傢俬之間":{"es":"entre muebles","ja":"家具の間","de":"zwischen Möbeln","fr":"entre meubles","ko":"가구 사이","pt":"entre móveis"},"尺寸單位":{"es":"Unidades de medida","ja":"測定単位","de":"Maßeinheiten","fr":"Unités de mesure","ko":"측정 단위","pt":"Unidades de medida"},"目前單位：":{"es":"Unidades: ","ja":"単位： ","de":"Einheiten: ","fr":"Unités : ","ko":"단위: ","pt":"Unidades: "},"外觀":{"es":"Apariencia","ja":"外観","de":"Darstellung","fr":"Apparence","ko":"테마","pt":"Aparência"},"深色":{"es":"Oscuro","ja":"ダーク","de":"Dunkel","fr":"Sombre","ko":"다크","pt":"Escuro"},"淺色":{"es":"Claro","ja":"ライト","de":"Hell","fr":"Clair","ko":"라이트","pt":"Claro"},"跟隨系統":{"es":"Sistema","ja":"システム","de":"System","fr":"Système","ko":"시스템","pt":"Sistema"},"Easy Home 3D · 免費開源裝修圖":{"es":"Easy3DHome · Planificador gratuito de código abierto","ja":"Easy3DHome · 無料のオープンソース間取り作成","de":"Easy3DHome · Kostenloser Open-Source-Grundrissplaner","fr":"Easy3DHome · Planificateur libre et gratuit","ko":"Easy3DHome · 무료 오픈 소스 평면도 편집기","pt":"Easy3DHome · Planejador gratuito de código aberto"},"專案名稱":{"es":"Nombre del proyecto","ja":"プロジェクト名","de":"Projektname","fr":"Nom du projet","ko":"프로젝트 이름","pt":"Nome do projeto"},"本機儲存":{"es":"Almacenamiento local","ja":"ローカル保存","de":"Lokaler Speicher","fr":"Stockage local","ko":"로컬 저장소","pt":"Armazenamento local"},"專案":{"es":"Proyectos","ja":"プロジェクト","de":"Projekte","fr":"Projets","ko":"프로젝트","pt":"Projetos"},"匯出 JSON":{"es":"Exportar JSON","ja":"JSON を出力","de":"JSON exportieren","fr":"Exporter JSON","ko":"JSON 내보내기","pt":"Exportar JSON"},"▦ 2D 平面圖":{"es":"▦ Plano 2D","ja":"▦ 2D 間取り","de":"▦ 2D-Grundriss","fr":"▦ Plan 2D","ko":"▦ 2D 평면도","pt":"▦ Planta 2D"},"⬡ 3D 模型":{"es":"⬡ Modelo 3D","ja":"⬡ 3D モデル","de":"⬡ 3D-Modell","fr":"⬡ Modèle 3D","ko":"⬡ 3D 모델","pt":"⬡ Modelo 3D"},"樓層":{"es":"Plantas","ja":"階","de":"Etagen","fr":"Étages","ko":"층","pt":"Andares"},"選取":{"es":"Seleccionar","ja":"選択","de":"Auswählen","fr":"Sélectionner","ko":"선택","pt":"Selecionar"},"畫房間":{"es":"Dibujar habitación","ja":"部屋を描く","de":"Raum zeichnen","fr":"Dessiner une pièce","ko":"방 그리기","pt":"Desenhar cômodo"},"逐幅畫牆":{"es":"Dibujar paredes","ja":"壁を描く","de":"Wände zeichnen","fr":"Dessiner les murs","ko":"벽 그리기","pt":"Desenhar paredes"},"門":{"es":"Puerta","ja":"ドア","de":"Tür","fr":"Porte","ko":"문","pt":"Porta"},"窗":{"es":"Ventana","ja":"窓","de":"Fenster","fr":"Fenêtre","ko":"창문","pt":"Janela"},"傢俬":{"es":"Muebles","ja":"家具","de":"Möbel","fr":"Meubles","ko":"가구","pt":"Móveis"},"建屋精靈":{"es":"Asistente de vivienda","ja":"住宅ウィザード","de":"Hausassistent","fr":"Assistant logement","ko":"주택 마법사","pt":"Assistente de casa"},"檢查":{"es":"Comprobar","ja":"チェック","de":"Prüfen","fr":"Vérifier","ko":"검사","pt":"Verificar"},"量度":{"es":"Medir","ja":"測定","de":"Messen","fr":"Mesurer","ko":"측정","pt":"Medir"},"移動畫布":{"es":"Mover vista","ja":"移動","de":"Verschieben","fr":"Déplacer","ko":"이동","pt":"Mover vista"},"吸附：開":{"es":"Ajuste: sí","ja":"スナップ：オン","de":"Rasterfang: an","fr":"Aimant : oui","ko":"스냅: 켜짐","pt":"Ajuste: ligado"},"尺寸：開":{"es":"Cotas: sí","ja":"寸法：オン","de":"Maße: an","fr":"Cotes : oui","ko":"치수: 켜짐","pt":"Cotas: ligadas"},"設定":{"es":"Propiedades","ja":"プロパティ","de":"Eigenschaften","fr":"Propriétés","ko":"속성","pt":"Propriedades"},"先畫房間，再加門窗及傢俬。":{"es":"Dibuja una habitación y añade puertas, ventanas y muebles.","ja":"部屋を描いて開口部と家具を追加します。","de":"Zeichne einen Raum und füge Öffnungen und Möbel hinzu.","fr":"Dessinez une pièce, puis ajoutez ouvertures et meubles.","ko":"방을 그린 후 문, 창문과 가구를 추가하세요.","pt":"Desenhe um cômodo e adicione aberturas e móveis."},"0 幅牆 · 0 件傢俬":{"es":"0 paredes · 0 muebles","ja":"壁 0 · 家具 0","de":"0 Wände · 0 Möbel","fr":"0 murs · 0 meubles","ko":"벽 0 · 가구 0","pt":"0 paredes · 0 móveis"},"開始設計你的屋企":{"es":"Diseña tu hogar","ja":"住まいをデザイン","de":"Gestalte dein Zuhause","fr":"Concevez votre intérieur","ko":"우리 집 디자인","pt":"Projete sua casa"},"只需在畫布點兩個角，就可以建立第一間房；之後可以自由畫牆、加門窗和擺傢俬。":{"es":"Haz clic en dos esquinas opuestas para crear una habitación. Añade paredes, puertas, ventanas y muebles.","ja":"対角の2点をクリックして部屋を作成し、壁、ドア、窓、家具を配置します。","de":"Wähle zwei gegenüberliegende Ecken für einen Raum. Füge Wände, Türen, Fenster und Möbel hinzu.","fr":"Cliquez sur deux coins opposés pour créer une pièce. Ajoutez murs, portes, fenêtres et meubles.","ko":"대각선 두 점을 클릭해 방을 만들고 벽, 문, 창문과 가구를 추가하세요.","pt":"Clique em dois cantos opostos para criar um cômodo. Adicione paredes, portas, janelas e móveis."},"▣ 畫第一間房":{"es":"▣ Dibujar primera habitación","ja":"▣ 最初の部屋を描く","de":"▣ Ersten Raum zeichnen","fr":"▣ Dessiner la première pièce","ko":"▣ 첫 방 그리기","pt":"▣ Desenhar primeiro cômodo"},"⌂ 建屋精靈":{"es":"⌂ Asistente de vivienda","ja":"⌂ 住宅ウィザード","de":"⌂ Hausassistent","fr":"⌂ Assistant logement","ko":"⌂ 주택 마법사","pt":"⌂ Assistente de casa"},"示範圖":{"es":"Plano de ejemplo","ja":"サンプル間取り","de":"Beispielgrundriss","fr":"Plan de démonstration","ko":"예제 평면도","pt":"Planta de exemplo"},"毋須註冊 · 自動儲存在此瀏覽器 · 資料不會上傳":{"es":"Sin registro · Guardado en este navegador · Sin subidas","ja":"登録不要 · ブラウザーに保存 · アップロードなし","de":"Keine Anmeldung · Lokal gespeichert · Keine Uploads","fr":"Sans compte · Stocké dans ce navigateur · Sans envoi","ko":"가입 불필요 · 브라우저 저장 · 업로드 없음","pt":"Sem cadastro · Salvo no navegador · Sem envio"},"1 格 = 0.5 m":{"es":"1 cuadro = 0,5 m","ja":"1 マス = 0.5 m","de":"1 Rasterfeld = 0,5 m","fr":"1 carreau = 0,5 m","ko":"1칸 = 0.5 m","pt":"1 quadrado = 0,5 m"},"屬性及尺寸":{"es":"Propiedades y dimensiones","ja":"プロパティと寸法","de":"Eigenschaften und Maße","fr":"Propriétés et dimensions","ko":"속성 및 치수","pt":"Propriedades e dimensões"},"準確尺寸，由你掌握。":{"es":"Dimensiones reales bajo tu control.","ja":"実寸を自由に設定。","de":"Echte Maße unter deiner Kontrolle.","fr":"Des dimensions réelles à votre portée.","ko":"실제 치수를 직접 조정하세요.","pt":"Dimensões reais sob seu controle."},"預設尺寸僅供規劃。訂購傢俬或施工前，必須現場覆尺並核對門窗及牆厚。":{"es":"Los tamaños predeterminados son orientativos. Verifica las medidas antes de comprar o construir.","ja":"既定の寸法は計画用です。購入や施工前に現地で寸法を確認してください。","de":"Standardmaße dienen nur der Planung. Vor Kauf und Bau vor Ort nachmessen.","fr":"Les tailles par défaut sont indicatives. Vérifiez les mesures sur place avant achat ou travaux.","ko":"기본 크기는 계획용입니다. 구매 및 시공 전 현장에서 측정하세요.","pt":"Medidas padrão são indicativas. Verifique no local antes de comprar ou construir."},"免費開源 · 無需帳號 · 個人資料預設只存在本機":{"es":"Gratis y de código abierto · Sin cuenta · Datos locales","ja":"無料・オープンソース · アカウント不要 · ローカル保存","de":"Kostenlos und Open Source · Kein Konto · Lokale Daten","fr":"Gratuit et libre · Sans compte · Données locales","ko":"무료 오픈 소스 · 계정 불필요 · 로컬 데이터","pt":"Gratuito e aberto · Sem conta · Dados locais"},"產品介紹／Languages ↗":{"es":"Acerca de / Idiomas ↗","ja":"概要・言語 ↗","de":"Über / Sprachen ↗","fr":"À propos / Langues ↗","ko":"정보 / 언어 ↗","pt":"Sobre / Idiomas ↗"},"我的專案":{"es":"Mis proyectos","ja":"マイプロジェクト","de":"Meine Projekte","fr":"Mes projets","ko":"내 프로젝트","pt":"Meus projetos"},"每個專案獨立保存在此瀏覽器。清除瀏覽資料可能導致資料消失，請定期匯出 JSON 備份。":{"es":"Los proyectos se guardan en el navegador. Exporta copias JSON regularmente.","ja":"プロジェクトはブラウザーに保存されます。JSON のバックアップを定期的に作成してください。","de":"Projekte werden im Browser gespeichert. Erstelle regelmäßig JSON-Sicherungen.","fr":"Les projets sont stockés dans ce navigateur. Exportez régulièrement des sauvegardes JSON.","ko":"프로젝트는 브라우저에 저장됩니다. 정기적으로 JSON 백업을 내보내세요.","pt":"Projetos ficam neste navegador. Exporte backups JSON regularmente."},"＋ 新建空白平面圖":{"es":"＋ Nuevo plano vacío","ja":"＋ 新規間取り","de":"＋ Neuer leerer Grundriss","fr":"＋ Nouveau plan vide","ko":"＋ 새 빈 평면도","pt":"＋ Nova planta vazia"},"新建示範圖":{"es":"Nuevo plano de ejemplo","ja":"新規サンプル","de":"Neuer Beispielgrundriss","fr":"Nouveau plan de démo","ko":"새 예제 평면도","pt":"Nova planta de exemplo"},"匯入 JSON":{"es":"Importar JSON","ja":"JSON を読み込む","de":"JSON importieren","fr":"Importer JSON","ko":"JSON 가져오기","pt":"Importar JSON"},"選擇傢俬":{"es":"Elegir muebles","ja":"家具を選択","de":"Möbel wählen","fr":"Choisir des meubles","ko":"가구 선택","pt":"Escolher móveis"},"選擇後放在畫面中央，可拖動、旋轉、輸入準確闊度／深度／高度，亦可鎖定位置。":{"es":"Los muebles aparecen en el centro. Arrastra, gira, cambia dimensiones o bloquea su posición.","ja":"家具は中央に配置されます。移動、回転、寸法変更、位置固定ができます。","de":"Möbel erscheinen in der Mitte. Verschieben, drehen, Maße ändern oder sperren.","fr":"Les meubles apparaissent au centre. Déplacez, tournez, redimensionnez ou verrouillez.","ko":"가구는 중앙에 나타납니다. 이동, 회전, 크기 변경 또는 잠금이 가능합니다.","pt":"Móveis aparecem no centro. Mova, gire, redimensione ou bloqueie."},"30 秒學識用":{"es":"Guía rápida","ja":"クイックガイド","de":"Kurzanleitung","fr":"Guide rapide","ko":"빠른 시작 안내","pt":"Guia rápido"},"兩層樓：":{"es":"Varias plantas:","ja":"複数階："},"快速起屋：":{"es":"Construcción rápida:","ja":"すばやく作成："},"新手畫房間：":{"es":"Dibujar una habitación:","ja":"部屋を描く："},"改尺寸：":{"es":"Editar dimensiones:","ja":"寸法を編集："},"門窗：":{"es":"Puertas y ventanas:","ja":"ドアと窓："},"加傢俬：":{"es":"Añadir muebles:","ja":"家具を追加："},"量距離：":{"es":"Medir distancia:","ja":"距離を測定："},"儲存：":{"es":"Guardar:","ja":"保存："},"建屋精靈 · 由零起一間屋":{"es":"Asistente · Crear desde cero","ja":"住宅ウィザード · 新規作成","de":"Hausassistent · Neu erstellen","fr":"Assistant · Partir de zéro","ko":"주택 마법사 · 새로 만들기","pt":"Assistente · Criar do zero"},"輸入大致尺寸，即時產生外牆、間隔牆、大門、窗戶、廚廁設備、睡房床及衣櫃。所有物件其後都可以逐項修改。":{"es":"Introduce dimensiones aproximadas para generar paredes, puertas, ventanas y muebles. Puedes editar cada objeto después.","ja":"概寸を入力すると壁、ドア、窓、家具が生成されます。各項目は後から編集できます。","de":"Gib ungefähre Maße ein, um Wände, Türen, Fenster und Möbel zu erstellen. Alles lässt sich danach bearbeiten.","fr":"Saisissez les dimensions approximatives pour générer murs, portes, fenêtres et meubles. Tout reste modifiable.","ko":"대략적인 치수를 입력해 벽, 문, 창문과 가구를 생성하세요. 이후 모든 항목을 편집할 수 있습니다.","pt":"Informe dimensões aproximadas para gerar paredes, portas, janelas e móveis. Tudo pode ser editado depois."},"總長 (m)":{"es":"Ancho (m)","ja":"幅 (m)","de":"Breite (m)","fr":"Largeur (m)","ko":"너비 (m)","pt":"Largura (m)"},"總闊 (m)":{"es":"Fondo (m)","ja":"奥行き (m)","de":"Tiefe (m)","fr":"Profondeur (m)","ko":"깊이 (m)","pt":"Profundidade (m)"},"睡房數目":{"es":"Dormitorios","ja":"寝室","de":"Schlafzimmer","fr":"Chambres","ko":"침실","pt":"Quartos"},"樓層數目":{"es":"Número de plantas","ja":"階数","de":"Anzahl Etagen","fr":"Nombre d’étages","ko":"층수","pt":"Número de andares"},"1 層":{"es":"1 planta","ja":"1 階","de":"1 Etage","fr":"1 étage","ko":"1층","pt":"1 andar"},"2 層（地下＋一樓）":{"es":"2 plantas (baja + superior)","ja":"2 階（1階＋2階）","de":"2 Etagen (EG + OG)","fr":"2 étages (RDC + étage)","ko":"2층 (1층 + 위층)","pt":"2 andares (térreo + superior)"},"⌂ 建立圖則":{"es":"⌂ Crear plano","ja":"⌂ 間取りを作成","de":"⌂ Grundriss erstellen","fr":"⌂ Créer le plan","ko":"⌂ 평면도 만들기","pt":"⌂ Criar planta"},"取消":{"es":"Cancelar","ja":"キャンセル","de":"Abbrechen","fr":"Annuler","ko":"취소","pt":"Cancelar"},"圖則檢查":{"es":"Comprobar plano","ja":"間取りチェック","de":"Grundriss prüfen","fr":"Vérifier le plan","ko":"평면도 검사","pt":"Verificar planta"},"知道了":{"es":"Listo","ja":"完了","de":"Fertig","fr":"Terminé","ko":"완료","pt":"Concluído"},"我的平面圖":{"es":"Mi plano","ja":"マイ間取り","de":"Mein Grundriss","fr":"Mon plan","ko":"내 평면도","pt":"Minha planta"},"編輯專案名稱":{"es":"Editar nombre","ja":"名前を編集","de":"Projektnamen bearbeiten","fr":"Modifier le nom","ko":"이름 편집","pt":"Editar nome"},"使用教學":{"es":"Ayuda","ja":"ヘルプ","de":"Hilfe","fr":"Aide","ko":"도움말","pt":"Ajuda"},"編輯工具":{"es":"Herramientas","ja":"編集ツール","de":"Bearbeitungswerkzeuge","fr":"Outils de modification","ko":"편집 도구","pt":"Ferramentas de edição"},"新增樓層":{"es":"Añadir planta","ja":"階を追加","de":"Etage hinzufügen","fr":"Ajouter un étage","ko":"층 추가","pt":"Adicionar andar"},"刪除頂層":{"es":"Eliminar planta superior","ja":"最上階を削除","de":"Oberste Etage entfernen","fr":"Retirer le dernier étage","ko":"최상층 제거","pt":"Remover último andar"},"選取及移動物件":{"es":"Seleccionar y mover objetos","ja":"選択して移動","de":"Objekte auswählen und bewegen","fr":"Sélectionner et déplacer","ko":"객체 선택 및 이동","pt":"Selecionar e mover objetos"},"新增傢俬":{"es":"Añadir muebles","ja":"家具を追加","de":"Möbel hinzufügen","fr":"Ajouter des meubles","ko":"가구 추가","pt":"Adicionar móveis"},"拖動畫布":{"es":"Arrastrar lienzo","ja":"キャンバスを移動","de":"Zeichenfläche ziehen","fr":"Déplacer le canevas","ko":"캔버스 이동","pt":"Mover tela"},"復原 (Ctrl/⌘+Z)":{"es":"Deshacer (Ctrl/⌘+Z)","ja":"元に戻す (Ctrl/⌘+Z)","de":"Rückgängig (Ctrl/⌘+Z)","fr":"Annuler (Ctrl/⌘+Z)","ko":"실행 취소 (Ctrl/⌘+Z)","pt":"Desfazer (Ctrl/⌘+Z)"},"重做":{"es":"Rehacer","ja":"やり直し","de":"Wiederholen","fr":"Rétablir","ko":"다시 실행","pt":"Refazer"},"全部置中":{"es":"Ajustar todo","ja":"全体表示","de":"Alles einpassen","fr":"Tout ajuster","ko":"전체 맞춤","pt":"Ajustar tudo"},"屬性":{"es":"Propiedades","ja":"プロパティ","de":"Eigenschaften","fr":"Propriétés","ko":"속성","pt":"Propriedades"},"2D／3D 繪圖區":{"es":"Área de dibujo 2D/3D","ja":"2D/3D 描画エリア","de":"2D/3D-Zeichenfläche","fr":"Zone de dessin 2D/3D","ko":"2D/3D 그리기 영역","pt":"Área de desenho 2D/3D"},"放大":{"es":"Acercar","ja":"拡大","de":"Vergrößern","fr":"Zoom avant","ko":"확대","pt":"Ampliar"},"縮小":{"es":"Alejar","ja":"縮小","de":"Verkleinern","fr":"Zoom arrière","ko":"축소","pt":"Reduzir"},"顯示全部":{"es":"Ajustar todo","ja":"全体表示","de":"Alles einpassen","fr":"Tout ajuster","ko":"전체 맞춤","pt":"Ajustar tudo"},"尺寸及物件屬性":{"es":"Dimensiones y propiedades","ja":"寸法とプロパティ","de":"Maße und Objekteigenschaften","fr":"Dimensions et propriétés","ko":"치수 및 객체 속성","pt":"Dimensões e propriedades"},"關閉":{"es":"Cerrar","ja":"閉じる","de":"Schließen","fr":"Fermer","ko":"닫기","pt":"Fechar"},"我的新居":{"es":"Mi nuevo hogar","ja":"新しい住まい","de":"Mein neues Zuhause","fr":"Mon nouveau logement","ko":"새로운 우리 집","pt":"Minha nova casa"},"語言":{"es":"Idioma","ja":"言語","de":"Sprache","fr":"Langue","ko":"언어","pt":"Idioma"},"✓ 本機已儲存":{"es":"✓ Guardado localmente","ja":"✓ ローカルに保存済み","de":"✓ Lokal gespeichert","fr":"✓ Enregistré localement","ko":"✓ 로컬 저장 완료","pt":"✓ Salvo localmente"},"⚠ 未能儲存，請匯出備份":{"es":"⚠ Error al guardar; exporta una copia","ja":"⚠ 保存失敗。バックアップを出力してください","de":"⚠ Speichern fehlgeschlagen; Sicherung exportieren","fr":"⚠ Échec de sauvegarde ; exportez une copie","ko":"⚠ 저장 실패. 백업을 내보내세요","pt":"⚠ Falha ao salvar; exporte uma cópia"},"儲存中…":{"es":"Guardando…","ja":"保存中…","de":"Speichern…","fr":"Enregistrement…","ko":"저장 중…","pt":"Salvando…"},"已經沒有可以復原的操作":{"es":"Nada que deshacer","ja":"元に戻す操作がありません","de":"Nichts rückgängig zu machen","fr":"Rien à annuler","ko":"취소할 작업 없음","pt":"Nada para desfazer"},"已復原":{"es":"Deshecho","ja":"元に戻しました","de":"Rückgängig gemacht","fr":"Annulé","ko":"실행 취소됨","pt":"Desfeito"},"已經沒有可以重做的操作":{"es":"Nada que rehacer","ja":"やり直す操作がありません","de":"Nichts zu wiederholen","fr":"Rien à rétablir","ko":"다시 실행할 작업 없음","pt":"Nada para refazer"},"已重做":{"es":"Rehecho","ja":"やり直しました","de":"Wiederholt","fr":"Rétabli","ko":"다시 실행됨","pt":"Refeito"},"吸附：":{"es":"Ajuste: ","ja":"スナップ：","de":"Rasterfang: ","fr":"Aimant : ","ko":"스냅: ","pt":"Ajuste: "},"開":{"es":"Sí","ja":"オン","de":"An","fr":"Oui","ko":"켜짐","pt":"Ligado"},"關":{"es":"No","ja":"オフ","de":"Aus","fr":"Non","ko":"꺼짐","pt":"Desligado"},"尺寸：":{"es":"Cotas: ","ja":"寸法：","de":"Maße: ","fr":"Cotes : ","ko":"치수: ","pt":"Cotas: "},"幅牆 ·":{"es":"paredes ·","ja":"壁 ·","de":"Wände ·","fr":"murs ·","ko":"벽 ·","pt":"paredes ·"},"個門窗 ·":{"es":"aberturas ·","ja":"開口部 ·","de":"Öffnungen ·","fr":"ouvertures ·","ko":"개구부 ·","pt":"aberturas ·"},"件傢俬":{"es":"muebles","ja":"家具","de":"Möbel","fr":"meubles","ko":"가구","pt":"móveis"},"3D 模式：拖動旋轉，滾輪縮放，按 2D 可返回編輯。":{"es":"3D: arrastra para girar y desplaza para acercar. Edita en 2D.","ja":"3D：ドラッグで回転、スクロールで拡大。編集は2Dで。","de":"3D: zum Drehen ziehen, zum Zoomen scrollen. In 2D bearbeiten.","fr":"3D : glissez pour tourner, défilez pour zoomer. Modifiez en 2D.","ko":"3D: 드래그해 회전, 스크롤로 확대. 편집은 2D에서.","pt":"3D: arraste para girar, role para ampliar. Edite em 2D."},"畫房間：依次點選兩個對角，立即建立四幅牆。點 Esc 可以取消。":{"es":"Elige dos esquinas opuestas. Esc cancela.","ja":"対角の2点を選択。Escでキャンセル。","de":"Zwei gegenüberliegende Ecken wählen. Esc bricht ab.","fr":"Choisissez deux coins opposés. Échap annule.","ko":"대각선 두 점을 선택하세요. Esc로 취소.","pt":"Escolha dois cantos opostos. Esc cancela."},"逐幅畫牆：點起點及終點；連續畫牆，回到第一點可結束，亦可按 Esc。":{"es":"Haz clic en los extremos; vuelve al inicio para cerrar o pulsa Esc.","ja":"端点をクリックし、始点に戻るかEscで終了。"},"加入門：按一下牆身，再於右側輸入實際門闊。":{"es":"Haz clic en una pared y ajusta el ancho de la puerta.","ja":"壁をクリックしてドア幅を設定。"},"加入窗：按一下牆身，再調整窗闊、窗高及窗台高度。":{"es":"Haz clic en una pared y ajusta la ventana.","ja":"壁をクリックして窓を設定。"},"量度：先按起點，再按終點，顯示兩點距離。":{"es":"Elige inicio y fin para medir.","ja":"始点と終点を選択して測定。"},"移動畫布：拖動畫面；滑鼠滾輪縮放。":{"es":"Arrastra el lienzo; desplaza para acercar.","ja":"ドラッグで移動、スクロールで拡大。"},"第 1 步／3：揀「畫房間」點兩個對角，或者逐幅畫牆。":{"es":"Paso 1/3: dibuja una habitación o paredes.","ja":"ステップ1/3：部屋または壁を描く。","de":"Schritt 1/3: Raum oder Wände zeichnen.","fr":"Étape 1/3 : dessiner une pièce ou des murs.","ko":"1/3단계: 방 또는 벽을 그리세요.","pt":"Passo 1/3: desenhe um cômodo ou paredes."},"第 2 步／3：已畫出牆身；下一步加入門窗，或直接放傢俬。":{"es":"Paso 2/3: añade aberturas o muebles.","ja":"ステップ2/3：開口部または家具を追加。","de":"Schritt 2/3: Öffnungen oder Möbel hinzufügen.","fr":"Étape 2/3 : ajouter ouvertures ou meubles.","ko":"2/3단계: 개구부 또는 가구 추가.","pt":"Passo 2/3: adicione aberturas ou móveis."},"第 3 步／3：加傢俬、修改闊深高並移動到正確位置。":{"es":"Paso 3/3: añade muebles y ajusta su posición.","ja":"ステップ3/3：家具を追加し位置を調整。","de":"Schritt 3/3: Möbel hinzufügen und positionieren.","fr":"Étape 3/3 : ajouter et placer les meubles.","ko":"3/3단계: 가구를 추가하고 배치.","pt":"Passo 3/3: adicione e posicione móveis."},"完成基本擺位：可選取物件微調尺寸、轉 3D、匯出 JSON 備份。":{"es":"Plano listo: ajusta dimensiones, revisa en 3D y exporta JSON.","ja":"間取り完成：寸法調整、3D確認、JSON出力。","de":"Grundriss fertig: Maße anpassen, 3D prüfen und JSON exportieren.","fr":"Plan prêt : ajustez les mesures, vérifiez en 3D et exportez JSON.","ko":"평면도 완료: 치수를 조정하고 3D 확인, JSON 내보내기.","pt":"Planta pronta: ajuste dimensões, veja em 3D e exporte JSON."},"已選取：":{"es":"Seleccionado: ","ja":"選択中：","de":"Ausgewählt: ","fr":"Sélection : ","ko":"선택: ","pt":"Selecionado: "},"牆身":{"es":"Pared","ja":"壁","de":"Wand","fr":"Mur","ko":"벽","pt":"Parede"},"門窗":{"es":"Aberturas","ja":"開口部","de":"Öffnungen","fr":"Ouvertures","ko":"개구부","pt":"Aberturas"},"已鎖定，請先解除鎖定":{"es":"Bloqueado; desbloquea primero","ja":"ロック中。先に解除してください"},"請選兩個不同位置":{"es":"Elige dos puntos diferentes","ja":"異なる2点を選択","de":"Zwei verschiedene Punkte wählen","fr":"Choisir deux points différents","ko":"서로 다른 두 점 선택","pt":"Escolher dois pontos diferentes"},"請輸入有效數字":{"es":"Introduce un número válido","ja":"有効な数値を入力","de":"Gültige Zahl eingeben","fr":"Saisir un nombre valide","ko":"유효한 숫자 입력","pt":"Informe um número válido"},"已刪除":{"es":"Eliminado ","ja":"削除：","de":"Gelöscht ","fr":"Supprimé ","ko":"삭제: ","pt":"Excluído "},"副本":{"es":"copia","ja":"コピー","de":"Kopie","fr":"copie","ko":"복사본","pt":"cópia"},"已加入":{"es":"Añadido ","ja":"追加：","de":"Hinzugefügt ","fr":"Ajouté ","ko":"추가: ","pt":"Adicionado "},"刪除物件":{"es":"Eliminar objeto","ja":"オブジェクトを削除","de":"Objekt löschen","fr":"Supprimer l’objet","ko":"객체 삭제","pt":"Excluir objeto"},"100% 本機運行":{"es":"100 % local","ja":"100% ローカル","de":"100 % lokal","fr":"100 % local","ko":"100% 로컬","pt":"100% local"},"按一下牆、門窗、傢俬或量度線，即可在此修改尺寸。":{"es":"Selecciona una pared, abertura, mueble o medida para editar.","ja":"壁、開口部、家具、寸法を選択して編集。","de":"Wähle eine Wand, Öffnung, Möbel oder Messung zum Bearbeiten.","fr":"Sélectionnez un mur, une ouverture, un meuble ou une mesure.","ko":"벽, 개구부, 가구 또는 측정값을 선택하여 편집.","pt":"Selecione parede, abertura, móvel ou medida para editar."},"米 (m)":{"es":"metros (m)","ja":"メートル (m)","de":"Meter (m)","fr":"mètres (m)","ko":"미터 (m)","pt":"metros (m)"},"圖則概覽":{"es":"Resumen del plano","ja":"間取り概要","de":"Grundrissübersicht","fr":"Aperçu du plan","ko":"평면도 개요","pt":"Visão geral da planta"},"層 · 目前":{"es":"plantas · activa","ja":"階 · 選択中","de":"Etagen · aktiv","fr":"étages · actif","ko":"층 · 선택됨","pt":"andares · ativo"},"幅":{"es":"paredes","ja":"壁","de":"Wände","fr":"murs","ko":"벽","pt":"paredes"},"個":{"es":"elementos","ja":"個","de":"Objekte","fr":"éléments","ko":"개","pt":"itens"},"件":{"es":"elementos","ja":"個","de":"Objekte","fr":"éléments","ko":"개","pt":"itens"},"量度線":{"es":"Medición","ja":"測定","de":"Messung","fr":"Mesure","ko":"측정","pt":"Medição"},"條":{"es":"líneas","ja":"線","de":"Linien","fr":"lignes","ko":"선","pt":"linhas"},"＋ 新增傢俬":{"es":"＋ Añadir muebles","ja":"＋ 家具を追加","de":"＋ Möbel hinzufügen","fr":"＋ Ajouter des meubles","ko":"＋ 가구 추가","pt":"＋ Adicionar móveis"},"開啟／管理專案":{"es":"Abrir / gestionar proyectos","ja":"プロジェクト管理","de":"Projekte verwalten","fr":"Gérer les projets","ko":"프로젝트 관리","pt":"Gerenciar projetos"},"✓ 檢查圖則":{"es":"✓ Comprobar plano","ja":"✓ 間取りチェック","de":"✓ Grundriss prüfen","fr":"✓ Vérifier le plan","ko":"✓ 평면도 검사","pt":"✓ Verificar planta"},"長":{"es":"Longitud","ja":"長さ","de":"Länge","fr":"Longueur","ko":"길이","pt":"Comprimento"},"直接設定牆長":{"es":"Fijar longitud de pared","ja":"壁の長さを設定","de":"Wandlänge festlegen","fr":"Définir la longueur du mur","ko":"벽 길이 설정","pt":"Definir comprimento da parede"},"牆長 (m)":{"es":"Longitud de pared (m)","ja":"壁の長さ (m)","de":"Wandlänge (m)","fr":"Longueur du mur (m)","ko":"벽 길이 (m)","pt":"Comprimento da parede (m)"},"準確端點座標（米）":{"es":"Coordenadas de extremos (m)","ja":"端点座標 (m)","de":"Endpunktkoordinaten (m)","fr":"Coordonnées des extrémités (m)","ko":"끝점 좌표 (m)","pt":"Coordenadas dos extremos (m)"},"起點 X":{"es":"Inicio X","ja":"始点 X","de":"Start X","fr":"Début X","ko":"시작 X","pt":"Início X"},"起點 Y":{"es":"Inicio Y","ja":"始点 Y","de":"Start Y","fr":"Début Y","ko":"시작 Y","pt":"Início Y"},"終點 X":{"es":"Fin X","ja":"終点 X","de":"Ende X","fr":"Fin X","ko":"끝 X","pt":"Fim X"},"終點 Y":{"es":"Fin Y","ja":"終点 Y","de":"Ende Y","fr":"Fin Y","ko":"끝 Y","pt":"Fim Y"},"牆身規格":{"es":"Especificaciones de pared","ja":"壁の仕様","de":"Wandspezifikationen","fr":"Caractéristiques du mur","ko":"벽 사양","pt":"Especificações da parede"},"牆高 (m)":{"es":"Altura de pared (m)","ja":"壁の高さ (m)","de":"Wandhöhe (m)","fr":"Hauteur du mur (m)","ko":"벽 높이 (m)","pt":"Altura da parede (m)"},"牆厚 (m)":{"es":"Grosor de pared (m)","ja":"壁の厚さ (m)","de":"Wandstärke (m)","fr":"Épaisseur du mur (m)","ko":"벽 두께 (m)","pt":"Espessura da parede (m)"},"牆長":{"es":"Longitud de pared","ja":"壁の長さ","de":"Wandlänge","fr":"Longueur du mur","ko":"벽 길이","pt":"Comprimento da parede"},"已放門窗":{"es":"Aberturas","ja":"開口部","de":"Öffnungen","fr":"Ouvertures","ko":"개구부","pt":"Aberturas"},"闊度 (m)":{"es":"Ancho (m)","ja":"幅 (m)","de":"Breite (m)","fr":"Largeur (m)","ko":"너비 (m)","pt":"Largura (m)"},"離起點 (m)":{"es":"Desplazamiento (m)","ja":"オフセット (m)","de":"Versatz (m)","fr":"Décalage (m)","ko":"오프셋 (m)","pt":"Deslocamento (m)"},"高度 (m)":{"es":"Altura (m)","ja":"高さ (m)","de":"Höhe (m)","fr":"Hauteur (m)","ko":"높이 (m)","pt":"Altura (m)"},"窗台離地 (m)":{"es":"Altura de alféizar (m)","ja":"窓台の高さ (m)","de":"Brüstungshöhe (m)","fr":"Hauteur d’allège (m)","ko":"창턱 높이 (m)","pt":"Altura do peitoril (m)"},"開口左邊剩餘牆長":{"es":"Pared antes de la abertura","ja":"開口部の手前の壁","de":"Wand vor Öffnung","fr":"Mur avant ouverture","ko":"개구부 앞 벽","pt":"Parede antes da abertura"},"開口右邊剩餘牆長":{"es":"Pared después de la abertura","ja":"開口部の先の壁","de":"Wand nach Öffnung","fr":"Mur après ouverture","ko":"개구부 뒤 벽","pt":"Parede depois da abertura"},"中心":{"es":"centro","ja":"中央","de":"Mitte","fr":"centre","ko":"중앙","pt":"centro"},"🔒 已鎖定位置":{"es":"🔒 Posición bloqueada","ja":"🔒 位置固定","de":"🔒 Position gesperrt","fr":"🔒 Position verrouillée","ko":"🔒 위치 잠김","pt":"🔒 Posição bloqueada"},"可拖動及修改尺寸":{"es":"Arrastra o cambia dimensiones","ja":"移動または寸法編集","de":"Ziehen oder Maße bearbeiten","fr":"Déplacer ou modifier les dimensions","ko":"이동 또는 치수 편집","pt":"Mover ou editar dimensões"},"傢俬名稱":{"es":"Nombre del mueble","ja":"家具名","de":"Möbelname","fr":"Nom du meuble","ko":"가구 이름","pt":"Nome do móvel"},"實際尺寸（米）":{"es":"Dimensiones (m)","ja":"寸法 (m)","de":"Maße (m)","fr":"Dimensions (m)","ko":"치수 (m)","pt":"Dimensões (m)"},"闊 (m)":{"es":"Ancho (m)","ja":"幅 (m)","de":"Breite (m)","fr":"Largeur (m)","ko":"너비 (m)","pt":"Largura (m)"},"深 (m)":{"es":"Fondo (m)","ja":"奥行き (m)","de":"Tiefe (m)","fr":"Profondeur (m)","ko":"깊이 (m)","pt":"Profundidade (m)"},"高 (m)":{"es":"Altura (m)","ja":"高さ (m)","de":"Höhe (m)","fr":"Hauteur (m)","ko":"높이 (m)","pt":"Altura (m)"},"擺放位置":{"es":"Posición","ja":"位置","de":"Position","fr":"Position","ko":"위치","pt":"Posição"},"中心 X":{"es":"Centro X","ja":"中心 X","de":"Mitte X","fr":"Centre X","ko":"중심 X","pt":"Centro X"},"中心 Y":{"es":"Centro Y","ja":"中心 Y","de":"Mitte Y","fr":"Centre Y","ko":"중심 Y","pt":"Centro Y"},"旋轉 (°)":{"es":"Rotación (°)","ja":"回転 (°)","de":"Drehung (°)","fr":"Rotation (°)","ko":"회전 (°)","pt":"Rotação (°)"},"顏色":{"es":"Color","ja":"色","de":"Farbe","fr":"Couleur","ko":"색상","pt":"Cor"},"底面積":{"es":"Superficie","ja":"占有面積","de":"Grundfläche","fr":"Emprise au sol","ko":"바닥 면적","pt":"Área ocupada"},"傢俬與牆身的邊緣距離":{"es":"Separación mueble-pared","ja":"家具と壁の間隔","de":"Abstand Möbel-Wand","fr":"Distance meuble-mur","ko":"가구-벽 간격","pt":"Distância móvel-parede"},"第":{"es":"Pared","ja":"壁","de":"Wand","fr":"Mur","ko":"벽","pt":"Parede"},"幅牆":{"es":"paredes","ja":"壁","de":"Wände","fr":"murs","ko":"벽","pt":"paredes"},"先畫牆，才可計算與牆身的距離。":{"es":"Dibuja paredes para calcular la separación.","ja":"壁を描くと間隔を計算できます。","de":"Zeichne Wände, um Abstände zu berechnen.","fr":"Dessinez des murs pour calculer les distances.","ko":"벽을 그리면 간격을 계산합니다.","pt":"Desenhe paredes para calcular a distância."},"✥ 在圖則上移動":{"es":"✥ Mover en plano","ja":"✥ 間取り上で移動","de":"✥ Im Grundriss bewegen","fr":"✥ Déplacer sur le plan","ko":"✥ 평면도에서 이동","pt":"✥ Mover na planta"},"🔓 解除鎖定":{"es":"🔓 Desbloquear","ja":"🔓 ロック解除","de":"🔓 Entsperren","fr":"🔓 Déverrouiller","ko":"🔓 잠금 해제","pt":"🔓 Desbloquear"},"🔒 鎖定傢俬":{"es":"🔒 Bloquear","ja":"🔒 ロック","de":"🔒 Sperren","fr":"🔒 Verrouiller","ko":"🔒 잠금","pt":"🔒 Bloquear"},"⟳ 旋轉 90°":{"es":"⟳ Girar 90°","ja":"⟳ 90°回転","de":"⟳ 90° drehen","fr":"⟳ Tourner de 90°","ko":"⟳ 90° 회전","pt":"⟳ Girar 90°"},"複製":{"es":"Duplicar","ja":"複製","de":"Duplizieren","fr":"Dupliquer","ko":"복제","pt":"Duplicar"},"兩點直線距離":{"es":"Distancia recta","ja":"直線距離","de":"Geradlinige Distanz","fr":"Distance en ligne droite","ko":"직선 거리","pt":"Distância em linha reta"},"量度結果":{"es":"Distancia","ja":"距離","de":"Distanz","fr":"Distance","ko":"거리","pt":"Distância"},"目前使用 ·":{"es":"Activo ·","ja":"選択中 ·","de":"Aktiv ·","fr":"Actif ·","ko":"선택됨 ·","pt":"Ativo ·"},"開啟":{"es":"Abrir","ja":"開く","de":"Öffnen","fr":"Ouvrir","ko":"열기","pt":"Abrir"},"刪除":{"es":"Eliminar","ja":"削除","de":"Löschen","fr":"Supprimer","ko":"삭제","pt":"Excluir"},"已載入專案：":{"es":"Proyecto cargado: ","ja":"プロジェクト読込："},"已新增示範圖則":{"es":"Plano de ejemplo creado","ja":"サンプルを作成しました","de":"Beispielgrundriss erstellt","fr":"Plan de démo créé","ko":"예제 평면도 생성됨","pt":"Planta de exemplo criada"},"已新增空白平面圖":{"es":"Plano vacío creado","ja":"新規間取りを作成しました","de":"Leerer Grundriss erstellt","fr":"Plan vide créé","ko":"빈 평면도 생성됨","pt":"Planta vazia criada"},"已下載 JSON 備份（包括傢俬及尺寸）":{"es":"Copia JSON descargada","ja":"JSON バックアップを出力しました"},"檔案大小超過 3 MB":{"es":"Archivo superior a 3 MB","ja":"ファイルが3 MBを超えています"},"成功匯入：":{"es":"Importado: ","ja":"読み込み："},"匯入失敗：":{"es":"Error de importación: ","ja":"読み込み失敗："},"建築面積":{"es":"Superficie de planta","ja":"床面積","de":"Grundfläche","fr":"Surface au sol","ko":"바닥 면적","pt":"Área de piso"},"層":{"es":"plantas","ja":"階","de":"Etagen","fr":"étages","ko":"층","pt":"andares"},"睡房":{"es":"Dormitorios","ja":"寝室","de":"Schlafzimmer","fr":"Chambres","ko":"침실","pt":"Quartos"},"間":{"es":"dormitorios","ja":"寝室","de":"Schlafzimmer","fr":"chambres","ko":"침실","pt":"quartos"},"注意：":{"es":"Aviso: ","ja":"注意：","de":"Hinweis: ","fr":"Avertissement : ","ko":"경고: ","pt":"Aviso: "},"請輸入有效長度及闊度":{"es":"Introduce ancho y fondo válidos","ja":"有効な幅と奥行きを入力"},"✓ 圖則檢查通過":{"es":"✓ Plano comprobado","ja":"✓ チェック完了","de":"✓ Grundrissprüfung bestanden","fr":"✓ Vérification réussie","ko":"✓ 평면도 검사 통과","pt":"✓ Verificação concluída"},"必須修正":{"es":"Debe corregirse","ja":"要修正","de":"Korrektur nötig","fr":"À corriger","ko":"수정 필요","pt":"Corrigir"},"建議檢查":{"es":"Revisión recomendada","ja":"確認推奨","de":"Überprüfung empfohlen","fr":"Révision conseillée","ko":"검토 권장","pt":"Revisão sugerida"},"地下 G/F":{"es":"Planta baja","ja":"1階","de":"Erdgeschoss","fr":"Rez-de-chaussée","ko":"1층","pt":"Térreo"},"已切換到":{"es":"Cambió a ","ja":"切替："},"最多支援 5 層":{"es":"Máximo 5 plantas","ja":"最大5階","de":"Maximal 5 Etagen","fr":"5 étages maximum","ko":"최대 5층","pt":"Máximo de 5 andares"},"已新增":{"es":"Añadido ","ja":"追加："},"至少保留一層":{"es":"Conserva al menos una planta","ja":"最低1階を残してください","de":"Mindestens eine Etage behalten","fr":"Conserver au moins un étage","ko":"최소 한 층 유지","pt":"Mantenha ao menos um andar"},"確定刪除":{"es":"Eliminar ","ja":"削除："},"已鎖定，無法誤拖":{"es":"Bloqueado","ja":"ロック済み","de":"Gesperrt","fr":"Verrouillé","ko":"잠김","pt":"Bloqueado"},"已解除鎖定":{"es":"Desbloqueado","ja":"ロック解除済み","de":"Entsperrt","fr":"Déverrouillé","ko":"잠금 해제됨","pt":"Desbloqueado"},"梳化":{"es":"Sofá","ja":"ソファ","de":"Sofa","fr":"Canapé","ko":"소파","pt":"Sofá"},"雙人床":{"es":"Cama doble","ja":"ダブルベッド","de":"Doppelbett","fr":"Lit double","ko":"더블 침대","pt":"Cama de casal"},"單人床":{"es":"Cama individual","ja":"シングルベッド","de":"Einzelbett","fr":"Lit simple","ko":"싱글 침대","pt":"Cama de solteiro"},"飯枱":{"es":"Mesa de comedor","ja":"ダイニングテーブル","de":"Esstisch","fr":"Table à manger","ko":"식탁","pt":"Mesa de jantar"},"椅子":{"es":"Silla","ja":"椅子","de":"Stuhl","fr":"Chaise","ko":"의자","pt":"Cadeira"},"書枱":{"es":"Escritorio","ja":"デスク","de":"Schreibtisch","fr":"Bureau","ko":"책상","pt":"Escrivaninha"},"衣櫃":{"es":"Armario","ja":"クローゼット","de":"Kleiderschrank","fr":"Armoire","ko":"옷장","pt":"Guarda-roupa"},"書架":{"es":"Estantería","ja":"本棚","de":"Bücherregal","fr":"Bibliothèque","ko":"책장","pt":"Estante"},"雪櫃":{"es":"Refrigerador","ja":"冷蔵庫","de":"Kühlschrank","fr":"Réfrigérateur","ko":"냉장고","pt":"Geladeira"},"廚櫃":{"es":"Mueble de cocina","ja":"キッチン収納","de":"Küchenschrank","fr":"Meuble de cuisine","ko":"주방 수납장","pt":"Armário de cozinha"},"洗衣機":{"es":"Lavadora","ja":"洗濯機","de":"Waschmaschine","fr":"Lave-linge","ko":"세탁기","pt":"Máquina de lavar"},"自訂方塊":{"es":"Bloque personalizado","ja":"カスタムブロック","de":"Eigener Block","fr":"Bloc personnalisé","ko":"사용자 블록","pt":"Bloco personalizado"},"示範：6 × 4.5 米":{"es":"Ejemplo: 6 × 4,5 m","ja":"サンプル：6 × 4.5 m","de":"Beispiel: 6 × 4,5 m","fr":"Démo : 6 × 4,5 m","ko":"예제: 6 × 4.5 m","pt":"Exemplo: 6 × 4,5 m"},"浴室櫃":{"es":"Mueble de baño","ja":"洗面台収納","de":"Badschrank","fr":"Meuble de salle de bains","ko":"욕실 수납장","pt":"Armário de banheiro"},"我的兩層屋":{"es":"Mi casa de dos plantas","ja":"2階建ての住まい","de":"Mein zweistöckiges Haus","fr":"Ma maison à deux niveaux","ko":"내 2층 집","pt":"Minha casa de dois andares"},"樓梯（地下）":{"es":"Escaleras (baja)","ja":"階段（1階）","de":"Treppe (EG)","fr":"Escalier (RDC)","ko":"계단 (1층)","pt":"Escada (térreo)"},"樓梯（一樓）":{"es":"Escaleras (superior)","ja":"階段（2階）","de":"Treppe (OG)","fr":"Escalier (étage)","ko":"계단 (위층)","pt":"Escada (superior)"},"圖則尚沒有牆身，先畫第一間房。":{"es":"No hay paredes; dibuja una habitación.","ja":"壁がありません。最初の部屋を描いてください。","de":"Noch keine Wände; zeichne den ersten Raum.","fr":"Aucun mur ; dessinez la première pièce.","ko":"벽이 없습니다. 첫 방을 그리세요.","pt":"Sem paredes; desenhe o primeiro cômodo."},"有牆身短於 0.1 米。":{"es":"Una pared mide menos de 0,1 m.","ja":"0.1 m 未満の壁があります。"},"不支援的圖則格式或版本":{"es":"Formato o versión no compatible","ja":"非対応の形式またはバージョン","de":"Format oder Version nicht unterstützt","fr":"Format ou version non pris en charge","ko":"지원하지 않는 형식 또는 버전","pt":"Formato ou versão não suportado"},"圖則資料不完整":{"es":"Datos incompletos","ja":"データが不完全です","de":"Unvollständige Daten","fr":"Données incomplètes","ko":"불완전한 데이터","pt":"Dados incompletos"},"物件數量超出限制":{"es":"Demasiados objetos","ja":"オブジェクト数が上限を超えています","de":"Zu viele Objekte","fr":"Trop d’objets","ko":"객체 수 제한 초과","pt":"Limite de objetos excedido"},"匯入平面圖":{"es":"Plano importado","ja":"読み込んだ間取り","de":"Importierter Grundriss","fr":"Plan importé","ko":"가져온 평면도","pt":"Planta importada"},"檔案超過 3 MB 限制":{"es":"El archivo supera 3 MB","ja":"ファイルが3 MBを超えています","de":"Datei größer als 3 MB","fr":"Fichier supérieur à 3 Mo","ko":"파일이 3 MB를 초과합니다","pt":"Arquivo superior a 3 MB"}};
const allowed=["zh-Hant","en","zh-Hans","es","ja","de","fr","ko","pt"],key="easy-home-3d:locale:v1";
let saved;try{saved=localStorage.getItem(key)}catch(e){}
const param=new URL(location.href).searchParams.get("lang"),locale=allowed.includes(param)?param:allowed.includes(saved)?saved:"zh-Hant";
try{localStorage.setItem(key,locale)}catch(e){}
const idx=locale==="zh-Hans"?1:0;
const missing=new Set();
function plain(value){if(!/[\u3400-\u9fff]/.test(value)||locale==="zh-Hant")return value;const m=value.match(/^(\s*)([\s\S]*?)(\s*)$/);const entry=messages[m[2]];if(!entry){missing.add(m[2]);return value;}const translated=extra[m[2]]?.[locale];if(["es","ja","de","fr","ko","pt"].includes(locale)&&!translated)missing.add(m[2]);return m[1]+(translated??entry[idx])+m[3];}
function t(value){if(locale==="zh-Hant"||typeof value!=="string")return value;if(/<[^>]+>/.test(value))return value.replace(/(^|>)([^<>]+)(?=<|$)/g,(_,prefix,part)=>prefix+plain(part));return plain(value);}
function staticUI(){document.documentElement.lang=locale;document.title=t(document.title);const walk=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);while(walk.nextNode()){const node=walk.currentNode;if(!node.parentElement.closest("script,style"))node.nodeValue=t(node.nodeValue);}
for(const node of document.querySelectorAll("[title],[aria-label],meta[name=description],#homeName,#projectName"))for(const attr of ["title","aria-label","content","value"]){if(node.hasAttribute(attr))node.setAttribute(attr,t(node.getAttribute(attr)));}
const projects=document.getElementById("projectsButton");projects.dataset.shortLabel=t("專案");document.getElementById("localeSelect").value=locale;}
window.EasyHomeI18n={t,locale,missing,key};staticUI();
})();