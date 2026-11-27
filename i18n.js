/* UI-only localization. Saved user names are not translated on load. */
(function(){
"use strict";
const messages={
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
const allowed=["zh-Hant","en","zh-Hans"],key="easy-home-3d:locale:v1";
let saved;try{saved=localStorage.getItem(key)}catch(e){}
const param=new URL(location.href).searchParams.get("lang"),locale=allowed.includes(param)?param:allowed.includes(saved)?saved:"zh-Hant";
try{localStorage.setItem(key,locale)}catch(e){}
const idx=locale==="en"?0:1;
const missing=new Set();
function plain(value){if(!/[\u3400-\u9fff]/.test(value)||locale==="zh-Hant")return value;const m=value.match(/^(\s*)([\s\S]*?)(\s*)$/);const entry=messages[m[2]];if(!entry){missing.add(m[2]);return value;}return m[1]+entry[idx]+m[3];}
function t(value){if(locale==="zh-Hant"||typeof value!=="string")return value;if(/<[^>]+>/.test(value))return value.replace(/(^|>)([^<>]+)(?=<|$)/g,(_,prefix,part)=>prefix+plain(part));return plain(value);}
function staticUI(){document.documentElement.lang=locale;document.title=t(document.title);const walk=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);while(walk.nextNode()){const node=walk.currentNode;if(!node.parentElement.closest("script,style"))node.nodeValue=t(node.nodeValue);}
for(const node of document.querySelectorAll("[title],[aria-label],meta[name=description],#homeName,#projectName"))for(const attr of ["title","aria-label","content","value"]){if(node.hasAttribute(attr))node.setAttribute(attr,t(node.getAttribute(attr)));}
const projects=document.getElementById("projectsButton");projects.dataset.shortLabel=t("專案");document.getElementById("localeSelect").value=locale;}
window.EasyHomeI18n={t,locale,missing,key};staticUI();
})();