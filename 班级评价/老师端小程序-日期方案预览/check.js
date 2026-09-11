
/* -------- iOS 状态栏图标与微信胶囊（按参考图 1:1 绘制） -------- */
(function(){
  const sig='<svg width="20" height="13" viewBox="0 0 20 13" fill="none"><path d="M1.65039 7.58008C1.95012 7.58014 2.21992 7.64999 2.46973 7.7998C2.71973 7.9498 2.92031 8.15039 3.07031 8.40039C3.22009 8.6502 3.29 8.92001 3.29004 9.21973V10.6904C3.28997 10.9901 3.22011 11.26 3.07031 11.5098C2.92031 11.7598 2.71973 11.9604 2.46973 12.1104C2.21993 12.2601 1.95009 12.33 1.65039 12.3301C1.35054 12.3301 1.07022 12.2602 0.820312 12.1104C0.570312 11.9604 0.369727 11.7598 0.219727 11.5098C0.0699196 11.26 6.65565e-05 10.9901 0 10.6904V9.21973C4.28388e-05 8.92 0.0699405 8.6502 0.219727 8.40039C0.369727 8.15039 0.570312 7.9498 0.820312 7.7998C1.07023 7.64994 1.35052 7.58008 1.65039 7.58008ZM7 5.36035C7.3 5.36035 7.57031 5.43008 7.82031 5.58008C8.0701 5.73001 8.26999 5.9299 8.41992 6.17969C8.56992 6.42969 8.63965 6.7 8.63965 7V10.6904C8.63958 10.9902 8.56979 11.2599 8.41992 11.5098C8.26994 11.7597 8.07028 11.9604 7.82031 12.1104C7.57031 12.2604 7.3 12.3301 7 12.3301C6.70004 12.3301 6.4199 12.2603 6.16992 12.1104C5.91992 11.9604 5.72031 11.7598 5.57031 11.5098C5.4204 11.2599 5.34968 10.9803 5.34961 10.6904V7C5.34961 6.7 5.42031 6.42969 5.57031 6.17969C5.72027 5.92989 5.92009 5.73 6.16992 5.58008C6.41992 5.43008 6.7 5.36035 7 5.36035ZM17.6904 0C17.9901 6.55189e-05 18.26 0.0699202 18.5098 0.219727C18.7598 0.369727 18.9604 0.570312 19.1104 0.820312C19.2601 1.07011 19.33 1.33994 19.3301 1.63965V10.6904C19.33 10.9901 19.2601 11.26 19.1104 11.5098C18.9604 11.7598 18.7598 11.9604 18.5098 12.1104C18.26 12.2601 17.9901 12.33 17.6904 12.3301C17.3906 12.3301 17.1102 12.2602 16.8604 12.1104C16.6104 11.9604 16.4098 11.7598 16.2598 11.5098C16.11 11.26 16.0401 10.9901 16.04 10.6904V1.63965C16.0401 1.33992 16.11 1.07012 16.2598 0.820312C16.4098 0.570312 16.6104 0.369727 16.8604 0.219727C17.1103 0.0698807 17.3906 0 17.6904 0ZM12.3496 2.79004C12.6495 2.79004 12.92 2.85984 13.1699 3.00977C13.4199 3.15977 13.6195 3.36035 13.7695 3.61035C13.9195 3.86025 13.9902 4.12983 13.9902 4.42969V10.6797C13.9902 10.9797 13.9195 11.25 13.7695 11.5C13.6196 11.7499 13.4198 11.9497 13.1699 12.0996C12.9199 12.2496 12.6496 12.3203 12.3496 12.3203C12.0498 12.3203 11.7694 12.2603 11.5195 12.1104C11.2696 11.9704 11.0699 11.7697 10.9199 11.5098C10.77 11.2598 10.7002 10.9796 10.7002 10.6797V4.42969C10.7002 4.12993 10.7701 3.86018 10.9199 3.61035C11.0699 3.36044 11.2696 3.15975 11.5195 3.00977C11.7694 2.85983 12.0498 2.7901 12.3496 2.79004Z" fill="currentColor"/></svg>';
  const wifi='<svg width="17" height="13" viewBox="0 0 17 13" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M0.358555 4.76929C0.777728 5.20063 1.43114 5.12668 1.96127 4.65838C3.71194 3.08094 5.8941 2.26757 8.33517 2.26757C10.7762 2.26757 12.9707 3.10559 14.7091 4.65838C15.2269 5.13901 15.8803 5.1883 16.3118 4.76929C16.7433 4.32564 16.8049 3.66016 16.3611 3.19185C14.5118 1.30632 11.4913 0 8.33517 0C5.17904 0 2.1462 1.31864 0.309241 3.20418C-0.134589 3.66016 -0.085275 4.32564 0.358555 4.78162V4.76929ZM3.40372 7.86256C3.88454 8.33086 4.50097 8.28156 5.04343 7.83791C5.93109 7.13546 7.11463 6.65483 8.33517 6.66715C9.54337 6.66715 10.7269 7.13546 11.6269 7.85023C12.1694 8.29389 12.8105 8.31854 13.2789 7.85023C13.7351 7.38193 13.8091 6.66715 13.3283 6.2235C12.1324 5.15133 10.3324 4.39958 8.3475 4.39958C6.36259 4.39958 4.55028 5.15133 3.36674 6.2235C2.94756 6.61786 2.86126 7.29566 3.41605 7.86256H3.40372ZM7.52148 11.954C8.05161 12.4593 8.6064 12.4593 9.13653 11.954L10.1351 10.9928C10.6653 10.4752 10.7762 9.82203 10.1721 9.37838C9.66666 9.02099 9.02557 8.78684 8.33517 8.78684C7.64477 8.78684 6.99135 9.02099 6.4982 9.3907C5.8941 9.82203 6.01739 10.4875 6.54752 10.9928L7.53381 11.954H7.52148Z" fill="currentColor"/></svg>';
  const bat='<svg width="26" height="13" viewBox="0 0 34 17"><rect x="1" y="1.2" width="27.5" height="14.6" rx="4.8" fill="none" stroke="currentColor" stroke-width="1.6" opacity=".45"/><rect x="3.6" y="3.8" width="17" height="9.4" rx="2.4" fill="currentColor"/><path d="M30.6 5.7 a3.3 3.3 0 0 1 0 5.6 z" fill="currentColor" opacity=".45"/></svg>';
  document.querySelectorAll('.statusbar .right').forEach(e=>{e.innerHTML=sig+wifi+bat;e.style.cssText+=';display:flex;align-items:center;gap:6px'});
  document.querySelectorAll('.capsule').forEach(e=>{e.innerHTML='<span class="half"><span class="cap-dots"><i></i><i></i><i></i></span></span><span class="half"><span class="cap-ring"></span></span>'});
  /* Tab 图标（线性 SVG，选中态由 CSS 加粗描边） */
  const ic=p=>'<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">'+p+'</svg>';
  const tabs={
    'sc-home':'<path d="M4.6 11.4L12 4.7l7.4 6.7"/><path d="M6.4 10.1v8.3a1.6 1.6 0 0 0 1.6 1.6h8a1.6 1.6 0 0 0 1.6-1.6v-8.3"/>',
    'sc-msgs':'<path d="M20 11.7c0 3.8-3.6 6.9-8 6.9-.9 0-1.8-.1-2.6-.4l-4.2 1.2 1-3c-1.4-1.2-2.2-2.9-2.2-4.7 0-3.8 3.6-6.9 8-6.9s8 3.1 8 6.9z"/><path d="M8.6 11.7h.01M12 11.7h.01M15.4 11.7h.01"/>',
    'sc-me':'<circle cx="12" cy="8.3" r="3.6"/><path d="M5.2 19.6c1.5-3.1 3.9-4.7 6.8-4.7s5.3 1.6 6.8 4.7"/>'
  };
  document.querySelectorAll('.tab').forEach(t=>{const p=tabs[t.dataset.t];if(p)t.querySelector('.ti').innerHTML=ic(p)});
})();
/* -------- 手机壳视口自适应：居中并按需等比缩放 -------- */
function fitPhone(){
  /* 外壳描边（box-shadow 外扩 12px）计入尺寸，受限方向至少留 16px 空白便于截图；隐藏手机壳时无外扩 */
  const pad=document.body.classList.contains('no-shell')?0:24;
  const s=Math.min(1,(innerHeight-32)/(844+pad),(innerWidth-32)/(390+pad));
  /* 用 zoom 而非 transform:scale——原生 select 弹层按布局坐标定位，transform 会导致错位 */
  document.querySelector('.phone').style.zoom=s;
}
/* -------- 手机壳显隐：演示说明内开关，localStorage 记忆并与家长端共享 -------- */
function shellOn(){return localStorage.getItem('proto-shell')!=='off'}
function toggleShell(){
  localStorage.setItem('proto-shell',shellOn()?'off':'on');
  applyShell();renderDemo();
}
function applyShell(){
  document.body.classList.toggle('no-shell',!shellOn());
  fitPhone();
}
addEventListener('resize',fitPhone);applyShell();
/* -------- 素质评价入口显隐：首页演示说明内开关，localStorage 记忆并与家长端共享；后续阶段功能，默认隐藏 -------- */
function evalOn(){return localStorage.getItem('proto-eval')==='on'}
function toggleEval(){localStorage.setItem('proto-eval',evalOn()?'off':'on');applyEval();renderDemo()}
function applyEval(){document.getElementById('gi-eval').style.display=evalOn()?'':'none'}
applyEval();
/* -------- 导航（含 hash 直达：teacher.html#sc-batch 可直接打开对应屏） -------- */
/* hero 分类 chip → 滚动到工作台对应区块 */
function scrollSec(id){document.getElementById(id).scrollIntoView({behavior:'smooth',block:'start'})}
function go(id){
  document.querySelectorAll('.screen').forEach(s=>s.classList.remove('show'));
  document.getElementById(id).classList.add('show');
  document.querySelectorAll('.body').forEach(b=>b.scrollTop=0);
  curScreen=id;history.replaceState(null,'','#'+id);closeDemo();
  /* 代学生请假页进入时自动初始化学生列表 */
  if(id==='sc-attleave'){
    if(!alStudents.length||alStudents._cls!==alClsName){alInitStudents()}
    alRender();
    alRenderSymptoms();
  }
  /* 代学生补签页进入时自动初始化学生列表 */
  if(id==='sc-attsign'){
    if(!asStudents.length||asStudents._cls!==asClsName){asInitStudents()}
    if(!asSelected||Object.keys(asSelected).length===0){asRender()}
    asUpdateForm();
  }
  /* 请假审批列表页进入时自动渲染 */
  if(id==='sc-leave'){
    lvRender();
  }
}
/* -------- 演示入口：说明与快捷跳转随当前屏切换 -------- */
var curScreen='sc-home';
const demoInfo={
 'sc-home':{t:'首页（宫格式）',d:'首页重构为微信校园小程序常见的宫格式：绿色头部为学校 + 教师身份区（角色标签、任教班级、扫一扫），下方依次为消息提醒条（引导订阅微信服务通知）、智能校徽活动横幅与宫格入口。入口映射：智能校徽 / 活动横幅 → 校徽信息收集页；素质评价 → 德育评价（发起点评、星星积分、点评记录，与家长端同步；后续阶段功能，宫格入口默认隐藏，由本说明底部开关控制显示）；校园签到 → 考勤统计总览（校长=全校 / 教师=任教班级，班级卡下钻明细）；智慧放学 → 播报控制台；学生管理 → 名册 / 人脸授权 / 家长绑定 / 名册核正聚合页；老师管理 → 教师注册审核（仅校级管理员可见）；请假 → 审批列表（内含代录请假入口）。头部姓名可下拉打开身份切换面板：列出教师身份与同号家长侧的孩子（师长双身份），选择孩子即切换为家长身份并跳转家长端，与「我的-账号切换」同能力、双入口；双角色权限互不渗透。底部 Tab 收敛为「首页 / 消息 / 我的」三个，消息未读角标与「我的」入口、消息列表红点联动。原「待处理」工作台（考勤异常 / 请假审批 / 信息核正聚合待办）保留为预览页，页面级入口待后续版本确定落点。',a:[['预览 · 待办工作台（原首页）',"go('sc-todo')"],['查看智能校徽办理进度','badgeSheet()'],['打开智能校徽信息收集页',"go('sc-apply')"],['预览 · 素质评价（后续阶段）',"go('sc-eval')"],['打开身份切换面板','idPanel()']]},
 'sc-apply':{t:'信息确认',d:'首页活动横幅或宫格「智能校徽」入口进入。统计卡显示在读学生/未提交/待确认/已确认四态；下方状态下拉（全部/未提交/待确认）与姓名搜索合并为一行，二者联动筛选；点击班级标题行（折叠箭头在左侧）可折叠/展开该班学生名单（带动效）。学生列表：待确认学生显示提交时间、已确认学生显示确认时间，均可点击跳转信息确认详情页；未提交学生不可点击。底部操作条：「分享校徽办理」跳转详情页可分享给家长；「一键提醒未提交」仅通知未提交家长。',a:[['筛选未提交学生','document.querySelector(".sf-sel").value="no";colFilterSel("no")'],['折叠/展开班级名单','toggleGrp("grp-3-2")'],['进入可编辑详情（待确认）',"go('sc-cf-edit','赵梓涵','三年级(2)班')"],['进入只读详情（已确认）',"go('sc-cf-view','林晓乐','三年级(2)班')"],['进入校徽办理详情页',"go('sc-applydetail')"],['返回首页',"go('sc-home')"]]},
 'sc-cf-edit':{t:'信息确认详情（可编辑）',d:'从信息确认页点击「待确认」学生进入。顶部学生信息卡（头像/姓名/班级·待确认）；下方办理信息含 01 学生姓名（可编辑）、02 就读班级（可编辑）、03 学生证件照（可重新上传+正确/错误示范参考），供老师查验修改。底部「确认无误」按钮点击后返回信息确认页并提示成功。',a:[['点击确认无误','cfConfirm()'],['返回信息确认页',"go('sc-apply')"]]},
 'sc-cf-view':{t:'信息确认详情（只读）',d:'从信息确认页点击「已确认」学生进入。顶部学生信息卡（头像/姓名/班级·已确认）；下方办理信息与可编辑态一致但全部 disabled 不可编辑。底部「取消确认」按钮点击后弹出居中确认弹框（标题「提示」/内容「确定取消确认？」/按钮「取消」「确定」），取消关闭弹框停留在当前页，确定则返回信息确认页。',a:[['点击取消确认','cfCancelConfirm()'],['返回信息确认页',"go('sc-apply')"]]},
 'sc-applydetail':{t:'校徽办理详情',d:'「分享校徽办理」入口进入，展示完整的校徽办理说明：宣传头图、申请说明、校徽样式参考、办理信息表单、证件照示例与正误示范。教师身份不支持办理：表单字段禁用，底部显示「分享到微信」按钮。点击「分享到微信」弹出摘要信息窗口，包含学校、班级、办理时间、补办周期、费用等关键信息，点击分享后可直接分享到微信，家长点击后可直接进入办理页面。',a:[['分享到微信','shareBadgeSheet()'],['返回信息收集页',"go('sc-apply')"]]},
 'sc-todo':{t:'待办工作台（预览 · 原首页）',d:'首页已重构为宫格式，本工作台保留为预览页（页面级入口待后续版本确定落点，当前仅经演示说明进入）。hero 分类总览点击可直达对应区块；今日出勤概览与考勤页同源，点击进入考勤；快捷入口提升「我的」内高频操作（代录/绑定邀请/绑定审核/历史考勤）。待办聚合考勤异常、请假审批与信息核正事务，告警与缺勤通道分离；缺勤推送家长前必经此人工闸门。「信息核正」区块消费标签运维标记（连续未读、错拿换发），并含「名册核正」：家长对待认领孩子反馈「不是我的孩子」后，生成对应班主任待办（反馈者账号不下发、重复反馈去重限频），核实后提交更正或标记误报，管理端名册同步标记、任一侧处理即闭环。教师代录的单据即时生效并同步双家长，不占用待处理。第一阶段范围收敛（首页已隐藏、后续阶段实现，下方按钮可预览对应页面）：①特殊天气降级横幅——暴雨等降级模式下融合窗放宽至 ±5 秒、低质量帧不进比对、缺席软标记不计入模式统计，降级日按班批量核对；②紧急请假单超时升级置顶卡——临近升级的紧急单自动置顶，超时按校级策略升级年级组长，处理后自动回落。',a:[['返回首页',"go('sc-home')"],['预览 · 降级批量核对（后续阶段）',"go('sc-batch')"],['预览 · 临近升级请假单（后续阶段）',"go('sc-leavedt')"],['查看身份强冲突处置',"go('sc-conflict')"],['处理名册核正待办','rosterFixSheet()']]},
 'sc-eval':{t:'素质评价（德育评价）',d:'首页宫格「素质评价」入口（后续阶段，默认隐藏，可在首页演示说明开关显示），当前含德育维度。顶部为统计总览（星星总数 / 表扬 / 待改进 / 点评次数，可切班级与周期）；功能条五入口中「表现点评」与右下浮钮均可发起点评，表现排行 / 评价报告 / 积分商城 / 积分统计为演示占位（积分兑换项由学校配置）。发起点评：选学生、选表扬（+1）/待改进（−2）、填点评项目，提交后记录置顶、顶部统计联动，并即时同步家长端（家长侧只读）。点评记录支持按点评人 / 学生姓名 / 组名搜索；列表仅展示部分记录（演示）。',a:[['发起点评','evalSheet()'],['返回首页',"go('sc-home')"]]},
 'sc-att':{t:'校园签到（考勤统计）',d:'首页宫格「校园签到」入口进入，统计总览页：日/周/月切换 + 日期导航（演示「今天」为 7月6日 周一；日视图提供今天与上一上学日 7月3日，周视图提供本周 7月6–10日与上周 6月29日–7月3日，月视图为本月上学日 7月1–3日累计人次）、出勤率环形图汇总卡与年级班级列表；「查询时段出入校」入口收敛为后续阶段（代码注释保留）。汇总卡标题为「班级合计」，统计任教班级（王老师：三(2)班 + 三(1)班）的合计数据。统计项统一为出勤、缺勤、请假、迟到、早退；迟到/早退计入出勤、单列计数。年级班级模块按年级分组（一级目录），展开后显示班级卡，班级名不显示年级前缀（如"(2)班"），班级卡显示学生总数与出勤率，点击班级卡跳转该班考勤明细页。',a:[['切到周视图',"attPeriod('week')"],['切到月视图',"attPeriod('month')"],['进入班级考勤明细',"go('sc-attclass')"],['返回首页',"go('sc-home')"]]},
 'sc-attclass':{t:'考勤明细',d:'校园签到统计页点击班级卡进入。标题「考勤明细」，顶部筛选栏：日期选择器、班级选择（点击弹出底部sheet，左年级栏+右班级chips）、考勤状态筛选。列表按时段分组：上午（上学+放学）、下午（上学+放学）、晚上（上学+放学），每组上方有时段标题。学生条目状态除未签到/未签退外均带跳转箭头标识：已签到/迟到点击跳转签到详情页，请假学生点击跳转该学生的请假记录页，缺勤学生点击跳转补签页面。底部「代学生请假」按钮跳转代学生请假页，「代学生补签」按钮弹出补签sheet。',a:[['代学生补签',"asEnterSheet()"],['代学生请假',"alEnter()"],['查看学生签到详情（林晓乐）',"stuTab('sign');go('sc-attstu')"],['请假学生跳转请假记录',"go('sc-attclass');var s=document.querySelector('.stu[data-st=leave]');s&&s.click()"],['缺勤学生补签',"go('sc-attclass');var s=document.querySelector('.stu[data-st=abs]');s&&s.click()"],['筛选未签到',"go('sc-attclass');document.getElementById('attc-st').value='nosign';renderAttc()"],['打开班级选择sheet','attcClsSheet()'],['返回统计页',"go('sc-att')"],['返回首页',"go('sc-home')"]]},
 'sc-attleave':{t:'代学生请假',d:'考勤明细页底部「代学生请假」按钮进入。顶部筛选区：日期选择器+班级选择（点击弹出sheet，左年级栏+右班级chips，同考勤明细页）。下方学生姓名搜索框。学生列表标题为「代请假学生」，支持多选（勾选框+全选），全选时显示已选人数，未选时显示未签到人数。下方请假表单：请假类型（病假/事假可切换）。病假表单含是否传染病（必选）、病状（多选chips：发热/感冒/咳嗽等）、开始结束时间、事由、证明材料。事假表单含开始结束时间、事由、证明材料。底部「提交」按钮。',a:[['切到事假',"alType('personal')"],['切到病假',"alType('sick')"],['打开班级选择','alClsSheet()'],['返回考勤明细',"go('sc-attclass')"]]},
 'sc-attsign':{t:'代学生补签',d:'考勤明细页底部「代学生补签」按钮先弹出时段选择弹框（先选上午/下午/晚上，再选上学/放学），确定后进入。缺勤学生点击直接跳转本页，反显时段+默认选中该学生。顶部筛选区（日期+班级，同代学生请假页样式）+搜索框。学生列表标题「代补签学生」，全班学生，缺勤学生标注红色"缺勤"标签，支持多选+全选。补签表单：考勤时段（反显如"上午-上学"）、考勤时间（时分选择，非必填，填写后自动判定考勤状态）、考勤状态（单选：正常到校/迟到/缺勤，默认缺勤，可手动修改）。底部「提交」按钮。',a:[['选择考勤时间','asTimeSheet()'],['返回考勤明细',"go('sc-attclass')"]]},
 'sc-stuleave':{t:'学生请假记录',d:'考勤明细页点击请假状态学生条目进入。标题「请假记录」，顶部显示该学生基本信息（头像、性别icon+姓名、班级）。下方为请假条目列表，每个条目显示请假类型（病假/事假）、请假时段，底部显示家长称谓(家长姓名)和提交时间，无状态标识。点击条目跳转请假详情页。',a:[['打开请假详情',"go('sc-stuleavedt')"],['返回考勤明细',"go('sc-attclass')"]]},
 'sc-stuleavedt':{t:'学生请假详情',d:'学生请假记录页点击条目进入。标题「请假详情」。第一模块为请假信息：标题（病假/事假）右侧审批状态为「已审批」（绿色teal），下方显示学生、开始时间、结束时间、事由。第二模块为流转记录：提交节点（MM-DD hh:mm · 家长称谓）、已审批节点（MM-DD hh:mm · 处理老师）。',a:[['返回请假记录',"go('sc-stuleave')"]]},
 'sc-attcsign':{t:'补签',d:'考勤明细页点击缺勤学生进入。展示学生信息卡（头像、姓名、班级、缺勤标签），补签信息表单（补签日期、到校时间*、通行通道、补签原因*），备注说明（选填）。底部「确认补签」按钮，提交后该学生状态由「缺勤」更新为「已签到」，操作留痕，返回考勤明细页。',a:[['确认补签',"sgConfirm()"],['选择到校时间','sgTimeSheet()'],['返回考勤明细',"go('sc-attclass')"]]},
 'sc-attstu':{t:'学生签到详情（林晓乐）',d:'考勤明细页点击学生行进入，演示以林晓乐为例。「签到」Tab：到校/离校时间轴，顶部日期 chips 可切换——今天（7月6日 周一）为实时视图，到校节点显示时间、校门通道与通行抓拍（照片点击放大预览；视频为演示占位，点击 toast 模拟播放；识别融合方式为校徽+人脸一致，不再以标签形式在页面展示），离校未发生时显示「待记录」，入校区块（到校及上学时段通行）抓拍超过一组时，到校标题旁显示「收起」，点击整体收起/展开该区块抓拍，仅一组抓拍时不显示（如 7月3日视图），时间轴节点以「入/离」圆形徽标区分（入=青碧、离=蓝、灰=待记录），事件标题旁括注上学/放学时间（演示为上学 08:00、放学 16:30，与迟到判定及智慧放学时段口径一致，实际随校级作息配置）。上学时段内多次进出校门（今天演示：11:47 出、13:36 再入）以轻量通行记录节点呈现——小圆点 + 时间 + 通道 + 抓拍，不标注入/离徽标、状态标签与推送提示文案（到校/离校两个主节点已承担出勤语义；出/入校消息实际仍实时推送家长，仅页面不展示提示）；通行事件全量留痕展示、不合并（多枚校徽幂等去重是同一次通行内的合并，跨次通行不去重），当日多次出入不影响出勤判定（首入定到校、末出定离校）；上一上学日 7月3日（周五）为历史定格视图，到校与离校节点齐备、各带抓拍，补请假通过后自动更新；更早日期经「选择日期」toast 说明。「统计」Tab：顶部月份导航可切换——7月为本月至今（应出勤 4 天），6月为历史月定格（应出勤 22 天、请假 1 天、出勤率 95.5%），更早月份 toast 说明；统计项含应出勤/出勤/请假/缺勤/迟到/早退与出勤率环形图，及逐日出勤记录（历史月仅展示部分记录），迟到计入出勤并单独计数，口径与班级/全校统计一致。隐私与合规口径：通行抓拍用于教师考勤人工核对，家长端亦可在 App 内查看本人孩子的抓拍照片与视频（家长端「校园签到」页与本页同构）；到离校推送消息仍仅含时间与事件、不含影像（与校徽办理页说明一致）；抓拍访问一律留痕可审计。',a:[['查看抓拍大图','attShot()'],['切到 7月3日（含离校抓拍）',"go('sc-attstu');stuTab('sign');stuDate('yest')"],['切到统计 Tab',"go('sc-attstu');stuTab('stat')"],['查看 6月统计（历史月）',"go('sc-attstu');stuTab('stat');if(stuM.i===0)stuMonth(-1)"],['返回考勤明细',"go('sc-attclass')"]]},
 'sc-dismiss':{t:'智慧放学',d:'按日期/时段（上午/下午/晚上）筛选，任教班级置顶展示，年级维度展示班级放学状态。点击未放学班级弹出放学确认弹框，可直接开始放学或设置延迟放学时间（延迟到时自动放学）。已放学班级绿色标示并显示放学时间，延迟班级打"延"角标。',a:[['点击三年级(3)班放学','dmConfirm("三年级","(3)班")'],['切换下午','dmPeriod("pm")'],['返回首页',"go('sc-home')"]]},
 'sc-me':{t:'我的（宫格重构版）',d:'版式与家长端「我的」同构：浅色头部为教师账号区（头像、姓名、姓名下方「班主任」角色标签；任教班级与学科在首页头部与身份切换页展示，本页不重复），点头部进个人资料查看与编辑（后续阶段，演示 toast）。本阶段保留两张宫格卡片，分组与家长端「我的」一致：「孩子」= 添加孩子（教师账号以家长身份为自己的孩子发起绑定，师长双身份，进教师端「添加孩子」页，详见该页演示说明）；「账号与帮助」= 账号切换 / 系统设置（后续阶段）/ 帮助与反馈（后续阶段）。以下宫格为后续阶段能力、本阶段隐藏：代办操作（代录请假免审即时生效、结果同步家长；首发分发核对为抽检性质、不阻塞考勤）、家长绑定（生成绑定邀请 / 绑定申请人工审核 / 班级注册码批量审核，均为名册匹配未覆盖时的兜底通道，待审数以图标角标呈现、清空即隐藏）、记录与合规（请假审批记录含待审批 + 已办结；历史考勤即考勤页切换日期回看；人脸授权情况与影像合规说明为本班合规视图）、管理员专区（教师注册审核，仅校级管理员可见）；退出登录入口现收于账号切换页右下浮钮。上述隐藏能力在首页宫格与各业务页仍可进入。页脚「隐私政策 · 用户协议」为静态展示、原型内不可点。原「消息」区入口已移除：消息为结果与通知类、可操作事项在首页待办，入口收敛为底部「消息」Tab（未读角标联动）。「账号」区提供「账号切换」入口，进入账号切换整页（师长双身份单选即切，与首页头部身份面板双入口）；双角色权限互不渗透：家长侧不继承任何教师权限，教师侧亦看不到家长数据。',a:[['生成绑定邀请','inviteSheet()'],['审核家长绑定申请','reviewSheet()'],['班级注册码批量审核',"go('sc-bindbatch')"],['进入账号切换',"go('sc-switch')"]]},
 'sc-addchild':{t:'添加孩子',d:'「我的-孩子」区入口进入，与家长端「添加孩子 · 人工申请」表单同构：教师账号以家长身份为自己的孩子发起绑定（师长双身份，双角色权限互不渗透）。学校默认带出任教学校，其余学校需按名称关键字搜索、不提供名录浏览（防止合作学校名录被穷举）；学生姓名需手填全名、不提供学生检索（防枚举探测）；监护关系自选，绑定后可修改。提交后路由至该班班主任审核，结果以消息通知，审核通过前不可见孩子任何数据；姓名不匹配返回统一模糊反馈并限频。原型提交后回到「我的」并给出路由提示，不做审核结果演示。',a:[['模拟提交申请','tcSubmitApply()'],['返回我的',"go('sc-me')"]]},
 'sc-switch':{t:'账号切换',d:'「我的-账号」区或首页头部下拉面板进入的整页身份列表。同号全部身份平铺单选：教师身份恒在第一位（当前选中）；点孩子行直接切换为家长身份并跳转家长端，无二次确认（原「切换为家长身份」确认半屏已废弃、模板保留）；点「王老师」行仅提示当前已是教师身份。师长双身份仅同号存在家长账号时显示孩子行；双角色权限互不渗透。右下角悬浮按钮退出登录（确认半屏）。',a:[['切换为家长身份（林晓乐）',"idToParent('林晓乐')"],['退出登录确认','logoutSheet()'],['返回我的',"go('sc-me')"]]},
 'sc-conflict':{t:'身份冲突处置',d:'决策表强冲突（他人脸绑上此签）实时告警；本例命中决策表 v3.2 第 3 行：读到 A 的签 + 命中 B 的脸，且 B 自己的签不在 ±5 秒融合窗内。缩略图挂在事件下而非学生档案、仅处理人可见，闭环后 7–30 天删除；处理人的文字结论属人工管理行为，系统不据此做机器身份关联。',a:[['返回待办工作台',"go('sc-todo')"]]},
 'sc-absent':{t:'疑似缺勤核对',d:'无签无脸的人工核对：补录到校 / 确认缺勤并通知 / 误报。（特殊天气降级下的提示与批量核对为后续阶段能力，本页相关文案已隐藏）',a:[['返回待办工作台',"go('sc-todo')"]]},
 'sc-leave':{t:'请假',d:'首页宫格「请假」入口进入。顶部四个tab：待审批/已拒绝/已同意/已撤销。tab下方筛选区：日期选择器+学生姓名搜索框（一行）。列表按年级→班级→请假条目三级层级展示（同学生管理页结构），条目内容：姓名+请假类型、开始时间、结束时间（MM-DD hh:mm）、家长称谓+提交时间、右侧审批状态chip。点击待审批条目跳转待审批请假详情页。',a:[['切到已拒绝',"lvTab(document.querySelectorAll('#lv-tabs .fchip')[1],'rejected')"],['切到已同意',"lvTab(document.querySelectorAll('#lv-tabs .fchip')[2],'approved')"],['切到已撤销',"lvTab(document.querySelectorAll('#lv-tabs .fchip')[3],'revoked')"],['打开待审批详情',"lvPendDetail('林晓乐','07-07 08:00')"],['发起代录请假',"go('sc-proxyleave')"],['返回首页',"go('sc-home')"]]},
 'sc-lvpend':{t:'待审批请假详情',d:'请假列表点击待审批条目进入。标题「请假详情」。第一模块请假信息：类型+「待审批」状态chip、学生、开始时间、结束时间、事由。第二模块流转记录：仅提交节点（无已审批节点）。底部「拒绝」「同意」按钮。点击拒绝弹出拒绝理由弹框（非必填，可直接确定）。',a:[['拒绝(弹理由框)','lvRejectSheet()'],['同意','lvApproveConfirm()'],['返回请假列表',"go('sc-leave')"]]},
 'sc-leavedt':{t:'请假单详情',d:'通过 / 退回补充 / 不通过；待审批期间暂按请假处理（抑制缺勤告警）。（超时提醒与升级年级组长策略为后续阶段能力，本页相关提示已隐藏）',a:[['返回审批列表',"go('sc-leave')"]]},
 'sc-proxyleave':{t:'代录请假',d:'家长自发之外的第二发起通道：班主任代录本班学生默认「代录即通过」——免审即时生效、单据永久标记「教师代录·家长口头确认」、审批结果同步双家长作为监督异议通道、操作留痕可审计；免审单不进入教师待处理列表，避免自审自批与待办计数虚高。代录人与审批人不同（科任老师代录、或校级要求年级组长审批）时仍走正常审批流；保守学校可关闭免审（校级配置，默认值随首批试点校调研确定）。演示剧情：李沐宸今日无签无脸且家长未留言，家长来电说明发热就医，班主任代录病假——生效后待核项自动核销、考勤流水回溯改判为请假。学生/日期/照片三个选择器为原型模拟：学生弹层支持任教班级切换（班主任班 / 科任班）与姓名搜索，列表带今日考勤状态便于代录时核对；时间为「日期 + 时 + 分」三列滚轮：日期列带真实历法星期（今天显示「当天」），分钟列 30 分钟步进——最少可请 0.5 小时（粒度为校级配置、对齐主流办公产品的选择习惯，开始时间为当天前后各 30 天——补请假回溯上限，结束时间以开始日期为锚最长 90 天——更长缺勤引导走休学/病休备案，边界均为校级配置；选择器顶部左「清除」清空该时间、右「✕」关闭，中部回显始终带全年份作为确认关口，滚轮项与表单在当年内省略年份，跨年时段在表单与单据中显式标年——学期跨自然年，12 月请到次年 1 月的假属常见场景；起止选定后自动计算「时长（上学日）」——按校历扣除周末（真实历法），每上学日按在校时段 08:00–16:00 计 8 小时、起止超出在校时段的部分不计入、满 8 小时折算为天，对应学生请假「上学日不产生缺勤」的实际语义，演示未含法定节假日与寒暑假，时长亦是「事假 1 天内免证明」等规则的挂载点）；证明材料为图片网格（与家长端同构）：点「＋」添加照片（演示以证件照示例图轮换模拟）、缩略图右上角 ✕ 删除，最多 5 个、单个上限 10 MB，满 5 个后隐藏添加块。提交的单据按实际所选学生与时段落入「已办结」列表。注意：原型提交一律按班主任免审主线演示，科任身份代录实际走正常审批流（转该班班主任审批），此分支不做可操作演示。',a:[['提交并查看已办结联动','submitProxyLeave()'],['返回请假列表',"go('sc-leave')"]]},
 'sc-login':{t:'注册 / 登录',d:'微信一键登录（手机号授权）即注册，或手机号验证码登录；教师注册走「微信扫学校注册码」直达表单，登录页不设入口。',a:[['模拟微信一键登录','wxLogin()'],['模拟扫学校注册码 → 教师注册',"go('sc-reg')"],['模拟登录 · 未匹配教师身份',"go('sc-noauth')"],['模拟扫到失效注册码',"go('sc-expired')"]]},
 'sc-reg':{t:'扫码注册',d:'微信群识别 / 扫描学校注册码（24 小时有效）直达本页，学校由码带出。表单字段：学校（只读）、教师姓名*、性别*、职务*（校长/年段长(级组长)/班主任/任课老师，sheet 选择）、称谓（默认"老师"）、任教班级*（年级+班级多选，sheet 内固定 300px 高度 + max-height:90% 兜底，确保不超出手机屏幕）。提交时拉起微信授权获取手机号：命中学校白名单免审核自动生效，未命中转管理端待确认列表。',a:[['模拟提交 · 命中白名单（免审核生效）','regDemo(false)'],['模拟提交 · 未命中白名单（转待确认）','regDemo(true)'],['选择职务','regDutySheet()'],['选择任教班级','regOpenCls()'],['返回登录页',"go('sc-login')"]]},
 'sc-tchmgr':{t:'教师管理',d:'首页宫格「教师管理」入口。功能栏：邀请教师（生成邀请码/二维码）、新增教师（跳转新增教师页）、待审核（角标2，跳转教师待审核页）。统计栏：部门数/教师数/未激活。搜索栏：姓名搜索+筛选下拉（全部/未激活）。教师列表按职务分组（校长/年段长(级组长)/班主任/任课老师），每个职务组显示教师人数，可折叠展开。教师条目含头像+姓名+职务，点击跳转教师详情页（只读）。未激活教师头像显示灰色"未激活"遮罩。',a:[['新增教师',"go('sc-addtch')"],['待审核',"go('sc-tchpend')"],['筛选未激活',"tmFilterPick('inactive','未激活')"],['搜索教师',"document.getElementById('tm-search').value='陈';tmSearch('陈')"],['查看教师详情（张明远）',"tdShow('张明远')"],['返回首页',"go('sc-home')"]]},
 'sc-tchdetail':{t:'教师详情',d:'教师管理页点击教师条目进入。只读页面，展示教师基本信息：学校、教师姓名、性别、职务、称谓、任教班级。不可编辑，无底部操作按钮。',a:[['返回教师管理',"go('sc-tchmgr')"]]},
 'sc-addtch':{t:'新增教师',d:'教师管理页点击「新增教师」进入。表单同教师注册页：学校（只读）、教师姓名、性别、职务（sheet选择）、称谓、任教班级（年级+班级多选）。底部按钮文案为「提交」。',a:[['提交','atSubmit()'],['返回教师管理',"go('sc-tchmgr')"]]},
 'sc-tchpend':{t:'教师待审核',d:'教师管理页点击「待审核」进入。三个页签：待审核、已拒绝、已通过。搜索框在统计行上方。列表按职务分组（同教师管理页结构），职务行和教师行均有勾选框可多选联动。教师条目姓名后显示性别icon+审核状态标识，右侧「详情」按钮跳转教师审核页。姓名下方显示时间（待审核=提交时间，已拒绝=拒绝时间，已通过=通过时间）。待审核列表底部显示全选+批量通过/拒绝操作栏；已拒绝、已通过列表仅展示。拒绝操作弹出拒绝理由弹框（非必填）。',a:[['切到已拒绝',"document.querySelector('#tp-tabs .fchip[data-tpt=reject]').click()"],['切到已通过',"document.querySelector('#tp-tabs .fchip[data-tpt=pass]').click()"],['批量通过','tpApprove()'],['查看教师审核详情（陈静怡）',"tpDetail('陈静怡')"],['返回教师管理',"go('sc-tchmgr')"]]},
 'sc-tchaudit':{t:'教师审核/详情',d:'待审核页点击教师条目「详情」进入。待审核状态下标题为「教师审核」，页面可编辑（同新增教师页+手机号只读），底部有拒绝和通过按钮。已拒绝/已通过状态下标题为「教师详情」，所有信息只读不可编辑，无底部按钮。拒绝操作弹出拒绝理由弹框（非必填）。',a:[['通过审核','tauditApprove()'],['拒绝审核（弹拒绝理由）','tauditReject()'],['返回待审核',"go('sc-tchpend')"]]},
 'sc-pending':{t:'注册审核中',d:'未命中白名单的申请状态页：展示申请信息与处理时效；审核期间教师再次扫码进入的是本页而非注册表单，避免重复提交；结果以消息通知。',a:[['前往管理端待确认列表',"location.href='admin.html#teacher'"],['返回登录页',"go('sc-login')"]]},
 'sc-msgs':{t:'消息（底部 Tab）',d:'底部三 Tab 之一。只放结果与通知类消息：审批结果同步、注册自动生效（管理员角色）等；可操作事项一律进待办，两者不重复。（超时升级提醒、降级模式启停两类消息随对应功能收敛到后续阶段，已隐藏）即时触达走微信服务通知（订阅消息），本页为历史记录，支持全部已读；未读数与 Tab 角标、「我的」入口红点联动。点击消息直达业务对象详情（单据/记录），纯通知类以半屏说明 + 行动按钮呈现，不设独立消息详情页。',a:[['全部标为已读','markAllRead()']]},
 'sc-expired':{t:'注册码已失效',d:'扫到过期 / 被作废注册码的落地页（对应注册流程图 B2N 节点）：注册码 24 小时有效、管理员可随时作废重生成，失效码不进注册表单，引导联系学校获取新码。与管理端「作废当前注册码」操作互为演示闭环。',a:[['模拟扫描新注册码',"go('sc-reg')"],['返回登录页',"go('sc-login')"]]},
 'sc-noauth':{t:'未匹配教师身份',d:'登录成功但手机号既不在教师名册、也无注册申请记录时的承接页（对应登录流程图 L3N 节点）：引导用学校群注册码扫码注册——登录页不设注册入口的设计由此闭环；若该手机号有审核中的申请，登录则直达「注册审核中」页。注册码由学校管理员生成、24 小时有效；「扫码注册」在真实产品中调起微信扫一扫，原型以按钮模拟直达注册表单。',a:[['模拟扫码注册',"go('sc-reg')"],['查看注册审核中页',"go('sc-pending')"],['返回登录页',"go('sc-login')"]]},
 'sc-sms':{t:'手机号验证码登录',d:'输入手机号获取验证码（60 秒重发倒计时；演示任意 4–6 位数字可登录），未注册手机号验证后自动注册。',a:[['返回登录页',"go('sc-login')"]]},
 'sc-auth':{t:'教师身份认证',d:'微信授权取号后与学校管理员预置的教师名册自动匹配，无需自行提交材料；未匹配的手机号在登录环节引导扫学校注册码注册（唯一准入通道，不设并行人工审核）。名册信息由学校维护，匹配有误或不是本人请勿确认，联系学校修改后重新登录；同手机号双身份用户登录后可在「我的」切换。',a:[['确认并进入首页',"go('sc-home')"]]},
 'sc-batch':{t:'降级批量核对（后续阶段预览）',d:'第一阶段不纳入、仅作预览。雨天早高峰按班十条左右的批量设计：未见脸软标记 2 + 无签无脸 8 共 10 条，与到班点名比对，勾选=确认到校，一键补录；点名未到的 2 条不勾选、转逐条核对。',a:[['返回待办工作台',"go('sc-todo')"]]},
 'sc-bindbatch':{t:'班级注册码 · 批量审核（冷启动）',d:'学校未预先导入监护人手机号名册时的开学季集中绑定：班主任生成限时班级注册码（可随时关停）分发到班级群，家长扫码注册后提交预填班级的绑定申请。本页自动与班级学生名册比对（学生名册随校徽制发已存在）：姓名精确命中默认勾选、一键通过即时生效；未命中 / 超 4 名监护人上限 / 重复申请标红转逐条处理。集中期结束关停注册码，人工申请通道回归「仅在确认认识该家庭时通过」的窄兜底严审。与家长端「班级注册码绑定申请」页互为演示闭环。',a:[['一键通过已勾选','bindApprove()'],['返回学生管理',"go('sc-stumgr')"]]},
 'sc-stumgr':{t:'学生管理',d:'首页宫格「学生管理」入口：统计栏（班级数/学生数/已录脸/未录脸/未激活）→ 操作按钮区（新增学生、待审核·角标3，白色背景贯通左对齐）→ 搜索栏（姓名搜索+筛选下拉，筛选项：全部/已录脸/未录脸/未激活）→ 层级列表（年级>班级>学生）。班级名不显示年级前缀。学生头像根据状态遮罩：未激活灰色遮罩"未激活"、未录脸橙色遮罩"未录脸"、其余正常展示。点击学生条目跳转学生详情页。',a:[['新增学生',"go('sc-addstu')"],['待审核',"go('sc-stuPend')"],['筛选未录脸',"smFilterPick('noface','未录脸')"],['筛选未激活',"smFilterPick('inactive','未激活')"],['搜索学生',"document.getElementById('sm-search').value='林';smSearch('林')"],['查看学生详情（林晓乐）',"sdShow('林晓乐')"],['返回首页',"go('sc-home')"]]},
 'sc-studetail':{t:'学生详情',d:'学生管理页点击学生条目进入。三部分信息：基本信息（头像、性别、姓名、出生年月日、年龄、班级）、详细信息（现住址）、家长信息（关系、家长姓名、家长手机号，支持多个家长，可拨打）。底部两个按钮：修改信息、更多操作（转班/离校/删除/取消）。',a:[['更多操作','sdMoreActions()'],['修改信息',"toast('演示：进入修改信息')"],['返回学生管理',"go('sc-stumgr')"]]},
 'sc-addstu':{t:'新增学生',d:'学生管理页点击「新增学生」进入。表单分两部分：学生信息（姓名*、性别、出生日期*、就读班级*、学生类型、学生学号）和第一联系人（家长称谓*、手机号*、绑定卡号）。可「添加更多家长」增加联系人。底部「保存」按钮提交后返回学生管理页。',a:[['保存返回',"smSaveStu()"],['添加更多家长','smAddContact()'],['选择班级','smClsSheet()'],['返回学生管理',"go('sc-stumgr')"]]},
 'sc-stuPend':{t:'待审核',d:'学生管理页点击「待审核」进入。三个页签：待审核、已拒绝、已通过。搜索框在统计行上方，支持按姓名搜索。列表按年级>班级>学生层级展开，年级行、班级行、学生行均有勾选框可多选联动（年级勾选联动该年级所有班级和学生，班级勾选联动该班所有学生）。学生条目姓名下显示提交时间，姓名后显示审核状态标识，右侧「详情」按钮跳转学生审核页。点击学生条目本身进行勾选不跳转，仅点击「详情」才跳转。待审核列表底部显示全选+批量通过/拒绝操作栏；已拒绝、已通过列表仅展示。拒绝操作弹出拒绝理由弹框（非必填，可直接确定提交）。',a:[['切到已拒绝',"document.querySelector('#sp-tabs .fchip[data-spt=reject]').click()"],['切到已通过',"document.querySelector('#sp-tabs .fchip[data-spt=pass]').click()"],['批量通过','spApprove()'],['查看学生审核详情（张小明）',"spDetail('张小明')"],['返回学生管理',"go('sc-stumgr')"]]},
 'sc-stuaudit':{t:'学生审核/详情',d:'待审核页点击学生条目「详情」进入。待审核状态下标题为「学生审核」，页面可编辑（同修改学生信息页），底部有拒绝和通过按钮。已拒绝/已通过状态下标题为「学生详情」，所有信息只读不可编辑，无修改头像按钮、无添加家长按钮、无底部拒绝/通过按钮。拒绝操作弹出拒绝理由弹框（非必填）。',a:[['通过审核','auditApprove()'],['拒绝审核（弹拒绝理由）','auditReject()'],['添加更多家长','auditAddContact()'],['返回待审核',"go('sc-stuPend')"]]},
 'ce-rank':{t:'班级评价·排行',d:'时间维度为今日、本周、本月、本学期、本学年，默认本周。排行总分说明：按时间维度排名；总分=初始总分-总扣分+总加分；初始总分为各指标维度初始分之和；初始分由学校端【班级评价】-【检查项管理】配置。未来时间不可选，查询范围不超过本学年。',a:[['返回班级评价首页',"go('sc-home')"]]},
 'ce-multi':{t:'班级评价·评价',d:'可评价日期取学校端排班表与当前学年的交集，不产生跨周历史评级。无评价权限提示「暂无点评权限」；扫码异常、学生状态、检查项状态和网络异常的演示提示统一收录在本说明中。',a:[['返回首页',"go('sc-home')"]]},
 'ce-today':{t:'班级评价·今日评价',d:'提交前的异常演示：学生已离校、班级归属错误或检查项已停用提示「学生状态错误，请重新进入」；检查项配置在未提交期间发生变更提示「检查项已变更，请重新进入当前页面」；校徽无效提示「学生校徽无效，请重新扫码」；校徽未绑定提示「学生校徽尚未绑定」；扫码取消不提示；无评价权限提示「暂无点评权限」；无摄像头权限提示「无摄像头权限，请打开摄像头」；网络提交失败提示「网络错误，请重新上传」。以上场景均保留在当前页面，不自动返回。',a:[['返回首页',"go('sc-home')"]]},
 'ce-records':{t:'班级评价·记录',d:'时间维度为今日、本周、本月、本学期、本学年，默认本周。我的评价仅允许操作本人提交的记录；我的班级只读。历史记录中的检查项旧名称永久保留，并支持按旧名称查询。',a:[['返回首页',"go('sc-home')"]]},
 'ce-settings':{t:'班级评价·设置',d:'维护值周老师分组、负责年级和执行时间。执行时间两端同时填写或同时为空，当前暂定最长一年；最终权限生效细节以需求文档待确认项为准。',a:[['返回首页',"go('sc-home')"]]},
};
function renderDemo(){
  const i=demoInfo[curScreen]||{t:curScreen,d:'',a:[]};
  document.getElementById('demo-pop').innerHTML='<div class="dt">📋 '+i.t+'</div><div class="dd">'+i.d+'</div>'+
    i.a.map(x=>'<button onclick="closeDemo();'+x[1]+'">'+x[0]+' →</button>').join('')+
    (curScreen==='sc-home'?'<div class="sw-row" onclick="toggleEval()">显示「素质评价」入口<span class="sw'+(evalOn()?' on':'')+'"></span></div>':'')+
    '<div class="sw-row" onclick="toggleShell()">显示手机壳<span class="sw'+(shellOn()?' on':'')+'"></span></div>';
}
function toggleDemo(){renderDemo();const p=document.getElementById('demo-pop');p.scrollTop=0;p.classList.toggle('show')}
function closeDemo(){document.getElementById('demo-pop').classList.remove('show')}
/* 演示说明展开时，点击弹层（含 chip）以外区域收起；捕获阶段监听，不受页面元素 stopPropagation 影响 */
document.addEventListener('click',e=>{
  const p=document.getElementById('demo-pop');
  if(p.classList.contains('show')&&!e.target.closest('#demo-fab'))p.classList.remove('show');
},true);
if(location.hash&&document.getElementById(location.hash.slice(1)))go(location.hash.slice(1));
document.querySelectorAll('.tab').forEach(t=>t.addEventListener('click',()=>go(t.dataset.t)));
/* -------- toast -------- */
let tT;
function toast(m){
  const t=document.getElementById('toast');
  t.textContent=m;t.classList.add('show');
  clearTimeout(tT);tT=setTimeout(()=>t.classList.remove('show'),3000);
}
/* 处理完成的统一落点：默认回待办工作台（工作台内流程），请假单等从业务列表进入的传入对应列表页 */
function done(m,to){go(to||'sc-todo');toast(m);decCount()}
function decCount(){
  const el=document.getElementById('todo-count');
  el.textContent=Math.max(0,parseInt(el.textContent)-1);
}
/* -------- 请假通过 -------- */
function approveLeave(){
  document.getElementById('pin-urgent').style.display='none';
  done('已通过：7月7日 08:00–12:00 不产生缺勤，结果已同步双家长','sc-leave');
}
/* -------- 智慧放学 -------- */
/* s:0=未放学 s:1=已放学 s:2=放学中 delay:延迟时间(HH:MM) */
var dmData={
  am:[
    {grade:'一年级',classes:[{n:'(1)班',s:1,t:'11:30'},{n:'(2)班',s:1,t:'11:32'},{n:'(3)班',s:0}]},
    {grade:'二年级',classes:[{n:'(1)班',s:1,t:'11:30'},{n:'(2)班',s:1,t:'11:31'},{n:'(3)班',s:1,t:'11:35'},{n:'(4)班',s:1,t:'11:33'}]},
    {grade:'三年级',classes:[{n:'(1)班',s:1,t:'11:30'},{n:'(2)班',s:1,t:'11:34'},{n:'(3)班',s:0}]}
  ],
  pm:[
    {grade:'一年级',classes:[{n:'(1)班',s:1,t:'16:30'},{n:'(2)班',s:1,t:'16:32'},{n:'(3)班',s:0}]},
    {grade:'二年级',classes:[{n:'(1)班',s:1,t:'16:30'},{n:'(2)班',s:0},{n:'(3)班',s:1,t:'16:35'},{n:'(4)班',s:0}]},
    {grade:'三年级',classes:[{n:'(1)班',s:1,t:'16:35'},{n:'(2)班',s:0},{n:'(3)班',s:0}]},
    {grade:'四年级',classes:[{n:'(1)班',s:0},{n:'(2)班',s:0},{n:'(3)班',s:0}]},
    {grade:'五年级',classes:[{n:'(1)班',s:0},{n:'(2)班',s:0}]},
    {grade:'六年级',classes:[{n:'(1)班',s:0},{n:'(2)班',s:0}]}
  ],
  ev:[
    {grade:'一年级',classes:[{n:'(1)班',s:0},{n:'(2)班',s:0},{n:'(3)班',s:0}]},
    {grade:'二年级',classes:[{n:'(1)班',s:0},{n:'(2)班',s:0},{n:'(3)班',s:0},{n:'(4)班',s:0}]},
    {grade:'三年级',classes:[{n:'(1)班',s:0},{n:'(2)班',s:0},{n:'(3)班',s:0}]}
  ]
};
var dmSt={period:'am',status:'all',cls:null,timer:null};
function dmUpdateDate(){
  var now=new Date();
  var y=now.getFullYear();
  var m=String(now.getMonth()+1).padStart(2,'0');
  var d=String(now.getDate()).padStart(2,'0');
  document.getElementById('dm-date-label').textContent=y+'年'+m+'月'+d+'日';
}
function dmRender(){
  var data=dmData[dmSt.period];
  var total=0,done=0,undone=0;
  data.forEach(function(g){g.classes.forEach(function(c){total++;if(c.s===1)done++;else undone++;})});
  document.getElementById('dm-sum-total').textContent=total;
  document.getElementById('dm-sum-undone').textContent=undone;
  document.getElementById('dm-sum-done').textContent=done;
  var html='';
  data.forEach(function(g){
    var cls=g.classes.filter(function(c){
      if(dmSt.status==='all')return true;
      if(dmSt.status==='done')return c.s===1;
      return c.s!==1;
    });
    if(cls.length===0)return;
    var gDone=g.classes.filter(function(c){return c.s===1}).length;
    var gUndone=g.classes.length-gDone;
    html+='<div class="dm-card"><div class="dt">'+g.grade;
    html+='<div class="dm-stat"><span><i class="w"></i>未放学 '+gUndone+'</span><span><i class="d"></i>已放学 '+gDone+'</span></div>';
    html+='</div><div class="dm-cls-grid">';
    cls.forEach(function(c){
      if(c.s===1){
        html+='<div class="dm-cls done">'+c.n+'<small>'+c.t+'</small>';
        if(c.delay)html+='<span class="dc-badge">延</span>';
        html+='</div>';
      }else if(c.delay){
        html+='<div class="dm-cls delayed" onclick="dmConfirm(\''+g.grade+'\',\''+c.n+'\')">'+c.n+'<small>延至 '+c.delay+'</small><span class="dc-badge">延</span></div>';
      }else{
        html+='<div class="dm-cls undone" onclick="dmConfirm(\''+g.grade+'\',\''+c.n+'\')">'+c.n+'</div>';
      }
    });
    html+='</div></div>';
  });
  document.getElementById('dm-list').innerHTML=html;
}
function dmPeriod(p){
  dmSt.period=p;
  document.querySelectorAll('.dm-seg .seg').forEach(function(x){x.classList.toggle('on',x.dataset.dp===p);});
  dmRender();
}
function dmSelOpen(){document.getElementById('dmfs-mask').classList.add('show')}
function dmSelClose(){document.getElementById('dmfs-mask').classList.remove('show')}
function dmSelPick(s){
  dmSt.status=s;
  var labels={all:'全部',undone:'未放学',done:'已放学'};
  document.getElementById('dm-sel-label').textContent=labels[s];
  document.querySelectorAll('#dmfs-mask .dmfs-opt').forEach(function(x){x.classList.toggle('on',x.dataset.ds===s);});
  dmSelClose();
  dmRender();
}
document.getElementById('dmfs-mask').addEventListener('click',function(e){if(e.target.id==='dmfs-mask')dmSelClose()});
/* 放学确认弹框 */
function dmConfirm(grade,cls){
  dmSt.cls={grade:grade,cls:cls};
  document.getElementById('dmf-cls-lbl').textContent=grade+cls;
  dmUpdateStartBtn();
  if(dmSt.timer)clearInterval(dmSt.timer);
  dmSt.timer=setInterval(dmUpdateStartBtn,1000);
  document.getElementById('dmf-mask').classList.add('show');
}
function dmUpdateStartBtn(){
  var now=new Date();
  var h=String(now.getHours()).padStart(2,'0');
  var m=String(now.getMinutes()).padStart(2,'0');
  var s=String(now.getSeconds()).padStart(2,'0');
  document.getElementById('dmf-start-time').textContent=h+':'+m+':'+s;
}
function dmStart(){
  if(!dmSt.cls)return;
  var g=dmData[dmSt.period].find(function(x){return x.grade===dmSt.cls.grade});
  var c=g?g.classes.find(function(x){return x.n===dmSt.cls.cls}):null;
  if(c){
    c.s=1;
    var now=new Date();
    c.t=String(now.getHours()).padStart(2,'0')+':'+String(now.getMinutes()).padStart(2,'0');
  }
  var msg=dmSt.cls.grade+dmSt.cls.cls+' 已放学';
  dmfClose();dmRender();toast(msg);
}
function dmfClose(){
  if(dmSt.timer){clearInterval(dmSt.timer);dmSt.timer=null;}
  document.getElementById('dmf-mask').classList.remove('show');
}
/* 延迟放学时间选择弹框（24小时时分滚轮，复用 wheelTo/wheelPaint） */
var dmHours=[],dmMins=[];
for(var i=0;i<24;i++)dmHours.push(String(i).padStart(2,'0'));
for(var i=0;i<60;i++)dmMins.push(String(i).padStart(2,'0'));
function dmDelayOpen(){
  var now=new Date();now.setMinutes(now.getMinutes()+10);
  var hi=now.getHours(),mi=now.getMinutes();
  document.getElementById('dmd-wh').innerHTML=dmWheelItems(dmHours);
  document.getElementById('dmd-wm').innerHTML=dmWheelItems(dmMins);
  dmWheelInit('dmd-wh',hi);dmWheelInit('dmd-wm',mi);
  document.getElementById('dmd-mask').classList.add('show');
}
function dmWheelItems(a){return '<div class="wi pad"></div><div class="wi pad"></div>'+a.map(function(x,i){return '<div class="wi" data-i="'+i+'" onclick="wheelTo(this)">'+x+'</div>'}).join('')+'<div class="wi pad"></div><div class="wi pad"></div>'}
function dmWheelInit(id,idx){
  var w=document.getElementById(id);
  w.addEventListener('scroll',function(){wheelPaint(w)});
  w.scrollTop=idx*36;wheelPaint(w);
}
function dmWheelSel(id){var len=id==='dmd-wh'?24:60;return Math.min(Math.max(Math.round(document.getElementById(id).scrollTop/36),0),len-1)}
function dmdCancel(){document.getElementById('dmd-mask').classList.remove('show')}
function dmdOk(){
  var time=dmHours[dmWheelSel('dmd-wh')]+':'+dmMins[dmWheelSel('dmd-wm')];
  if(dmSt.cls){
    var g=dmData[dmSt.period].find(function(x){return x.grade===dmSt.cls.grade});
    var c=g?g.classes.find(function(x){return x.n===dmSt.cls.cls}):null;
    if(c)c.delay=time;
  }
  var msg=dmSt.cls.grade+dmSt.cls.cls+' 已设置延迟放学至 '+time;
  document.getElementById('dmd-mask').classList.remove('show');
  dmfClose();dmRender();toast(msg);
}
document.getElementById('dmf-mask').addEventListener('click',function(e){if(e.target.id==='dmf-mask')dmfClose()});
document.getElementById('dmd-mask').addEventListener('click',function(e){if(e.target.id==='dmd-mask')dmdCancel()});
dmUpdateDate();
dmRender();
/* -------- 教师管理：数据 + 列表 + 搜索 + 筛选 -------- */
const tmDuties=['校长','年段长(级组长)','班主任','任课老师'];
const tmData=[
  {n:'张明远',av:'张',gen:'',duty:'校长',cls:'全校',title:'校长',active:true},
  {n:'李秀芳',av:'李',gen:'girl',duty:'年段长(级组长)',cls:'三年级',title:'李主任',active:true},
  {n:'王建国',av:'王',gen:'',duty:'班主任',cls:'三(2)',title:'王老师',active:true},
  {n:'赵雅琴',av:'赵',gen:'girl',duty:'班主任',cls:'三(1)',title:'赵老师',active:true},
  {n:'陈志强',av:'陈',gen:'',duty:'任课老师',cls:'三(1)、三(2)',title:'陈老师',active:true},
  {n:'刘芳',av:'刘',gen:'girl',duty:'任课老师',cls:'四(1)、四(2)',title:'刘老师',active:true},
  {n:'孙鹏',av:'孙',gen:'',duty:'任课老师',cls:'三(1)',title:'孙老师',active:false},
  {n:'周敏',av:'周',gen:'girl',duty:'年段长(级组长)',cls:'四年级',title:'周主任',active:true},
  {n:'吴磊',av:'吴',gen:'',duty:'任课老师',cls:'五(1)、五(2)',title:'吴老师',active:true},
  {n:'郑海涛',av:'郑',gen:'',duty:'班主任',cls:'四(1)',title:'郑老师',active:true},
  {n:'黄丽',av:'黄',gen:'girl',duty:'班主任',cls:'五(1)',title:'黄老师',active:true},
  {n:'杨梅',av:'杨',gen:'girl',duty:'任课老师',cls:'三(2)',title:'杨老师',active:true}
];
var tmFilter='all';
var tmKeyword='';
function tmFiltered(){
  return tmData.filter(function(t){
    if(tmKeyword&&t.n.indexOf(tmKeyword)<0)return false;
    if(tmFilter==='inactive'&&!t.active)return true;
    if(tmFilter==='inactive'&&t.active)return false;
    return true;
  });
}
function tmRender(){
  var list=tmFiltered();
  var h='';
  if(!list.length){
    h='<div class="sm-empty"><div class="ico" style="display:flex;align-items:center;justify-content:center"><svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#D5DAE4" stroke-width="1.2"><circle cx="9.5" cy="8" r="3.4"/><path d="M4 19.5c.6-3.1 2.9-4.8 5.5-4.8 1.1 0 2.2.3 3.1.9"/></svg></div><div class="muted">未找到匹配的教师</div></div>';
  }else{
    tmDuties.forEach(function(d){
      var stus=list.filter(function(t){return t.duty===d});
      if(!stus.length)return;
      h+='<div class="sm-grade">'+
        '<div class="sm-grade-hd" onclick="smToggleGrade(this)"><span style="font-size:14px;font-weight:700">'+d+'</span>'+
        '<span class="cnt">'+stus.length+' 人</span><span class="arr">▼</span></div>'+
        '<div class="sm-grade-bd"><div class="sm-cls"><div class="sm-cls-bd">'+
        stus.map(function(t){
          var avMask=t.active?'':'<div class="mask inactive" style="position:absolute;inset:0;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:8px;color:#fff;font-weight:600;background:rgba(120,128,140,.88)">未激活</div>';
          return '<div class="stu" style="padding:10px 14px;cursor:pointer" onclick="tdShow(\''+t.n+'\')">'+
            '<div class="sm-stu-av" style="position:relative"><div class="avatar adult'+(t.gen?' '+t.gen:'')+'">'+t.av+'</div>'+avMask+'</div>'+
            '<div><div class="nm">'+t.n+'</div>'+(t.active?'':'<div class="muted" style="font-size:11px">未激活</div>')+'</div>'+
            '<span class="muted" style="margin-left:auto">›</span></div>';
        }).join('')+
        '</div></div></div></div>';
    });
  }
  document.getElementById('tm-list').innerHTML=h;
}
function tmSearch(v){tmKeyword=v.trim();tmRender()}
function tmFilterSheet(){
  var opts=[['all','全部'],['inactive','未激活']];
  sheet('<h3>筛选</h3><div style="max-height:300px;overflow-y:auto;margin:2px 0 14px">'+
    opts.map(function(o){return '<label style="display:flex;align-items:center;gap:10px;padding:12px 2px;border-bottom:1px solid #F0F2F6;font-size:14px;cursor:pointer" onclick="tmFilterPick(\''+o[0]+'\',\''+o[1]+'\')">'+o[1]+(tmFilter===o[0]?'<span style="margin-left:auto;color:var(--navy);font-size:16px">✓</span>':'<span class="arr" style="margin-left:auto">›</span>')+'</label>'}).join('')+'</div>');
}
function tmFilterPick(v,label){tmFilter=v;closeSheet();document.getElementById('tm-filter-btn').textContent=label;tmRender()}
/* 教师详情（只读） */
function tdShow(name){
  var t=tmData.find(function(x){return x.n===name});
  if(!t)return;
  var h='<div class="card" style="text-align:center;margin-bottom:12px;padding:18px 0">'+
    '<div class="avatar adult'+(t.gen?' '+t.gen:'')+'" style="width:70px;height:70px;font-size:26px;margin:0 auto">'+t.av+'</div>'+
    '<div style="font-size:17px;font-weight:600;margin-top:8px">'+t.n+'</div>'+
    '<div class="sd-gender" style="justify-content:center;margin-top:4px"><span class="ico '+(t.gen==='girl'?'female':'male')+'">'+(t.gen==='girl'?'♀':'♂')+'</span>'+(t.gen==='girl'?'女':'男')+'</div>'+
    '</div>'+
    '<div class="frm-sec">基本信息</div>'+
    '<div class="card">'+
    frmRow('学校','市实验一小')+
    frmRow('教师姓名',t.n)+
    frmRow('性别',t.gen==='girl'?'女':'男')+
    frmRow('职务',t.duty)+
    frmRow('称谓',t.title)+
    frmRow('任教班级',t.cls)+
    '</div>';
  document.getElementById('td-content').innerHTML=h;
  go('sc-tchdetail');
}
/* 新增教师 */
var atDuty='',atSel=new Set(),atCur='三年级';
function atGender(el){document.querySelectorAll('#at-gender .fchip').forEach(x=>x.classList.remove('on'));el.classList.add('on')}
function atDutySheet(){
  sheet('<h3>选择职务</h3><div style="max-height:300px;overflow-y:auto;margin:2px 0 14px">'+
    tmDuties.map(function(d){return '<label style="display:flex;align-items:center;gap:10px;padding:12px 2px;border-bottom:1px solid #F0F2F6;font-size:14px;cursor:pointer" onclick="atDutyPick(\''+d+'\')">'+d+(atDuty===d?'<span style="margin-left:auto;color:var(--navy);font-size:16px">✓</span>':'<span class="arr" style="margin-left:auto">›</span>')+'</label>'}).join('')+'</div>');
}
function atDutyPick(d){atDuty=d;closeSheet();var t=document.getElementById('at-duty-txt');t.textContent=d;t.style.color='var(--ink)'}
function atOpenCls(){
  sheet('<h3>选择任教班级</h3>'+
   '<div class="desc" style="margin-bottom:8px">先点左侧年级，再选班级；可跨年级多选</div>'+
   '<div id="at-sel" class="fchips" style="margin-bottom:8px;gap:6px"></div>'+
   '<div style="display:flex;border:1px solid var(--line);border-radius:12px;overflow:hidden;height:300px;flex-shrink:0">'+
   '<div id="at-grades" style="width:88px;background:#EFF3F9;overflow-y:auto;flex-shrink:0"></div>'+
   '<div style="flex:1;padding:10px 10px 6px;overflow-y:auto"><div class="fchips" id="at-cls" style="gap:7px"></div></div></div>'+
   '<button class="btn pri blk" style="margin-top:12px;padding:11px" onclick="closeSheet()">完成</button>');
  atRender();
}
function atField(){
  var t=document.getElementById('at-cls-txt');
  if(atSel.size){t.textContent=[...atSel].join('、');t.style.color='var(--ink)'}
  else{t.textContent='请选择任教班级';t.style.color='var(--ink-3)'}
}
function atRender(){
  atField();
  var gEl=document.getElementById('at-grades');
  if(!gEl)return;
  gEl.innerHTML=Object.keys(regGrades).map(function(g){
    var n=[...atSel].filter(function(k){return k[0]===g[0]}).length;
    return '<button onclick="atCur=\''+g+'\';atRender()" style="display:block;width:100%;text-align:left;padding:11px 12px;font-size:12.5px;'+(g===atCur?'background:#fff;color:var(--navy);font-weight:600;border-left:3px solid var(--navy);':'color:var(--ink-2);border-left:3px solid transparent;')+'">'+g+(n?' <span style="font-size:10.5px;color:var(--navy)">·'+n+'</span>':'')+'</button>';
  }).join('');
  var n=regGrades[atCur],h='';
  for(var i=1;i<=n;i++){var k=atCur[0]+'('+i+')';h+='<button class="fchip'+(atSel.has(k)?' on':'')+'" onclick="atToggle(\''+k+'\')">'+k+'</button>'}
  document.getElementById('at-cls').innerHTML=h;
  document.getElementById('at-sel').innerHTML=atSel.size?
    [...atSel].map(function(k){return '<span class="chip navy plain" style="font-size:11.5px;padding:4px 10px;cursor:pointer" onclick="atToggle(\''+k+'\')">'+k+' ✕</span>'}).join(''):
    '<span class="muted">尚未选择 · 先点左侧年级，再选班级</span>';
}
function atToggle(k){atSel.has(k)?atSel.delete(k):atSel.add(k);atRender()}
function atSubmit(){
  var nm=document.getElementById('at-name').value.trim();
  var g=document.querySelector('#at-gender .fchip.on');
  var cls=[...atSel];
  if(!nm){toast('请输入教师姓名');return}
  if(!g){toast('请选择性别');return}
  if(!atDuty){toast('请选择职务');return}
  if(!cls.length){toast('请至少选择一个任教班级');return}
  toast('已提交，教师信息已保存');
  setTimeout(function(){go('sc-tchmgr');toast('新增教师：'+nm+'（'+atDuty+'）已添加')},800);
}
/* -------- 教师待审核：三tab + 职务列表 + 多选 + 底部操作 -------- */
const tpData={
  pend:[
    {n:'陈静怡',av:'陈',gen:'girl',duty:'班主任',cls:'三(1)、三(3)',phone:'139****5521',time:'今天 10:12',ck:false},
    {n:'李强',av:'李',gen:'',duty:'任课老师',cls:'三(1)、三(2)、四(1)',phone:'137****0032',time:'今天 09:47',ck:false}
  ],
  reject:[
    {n:'郑海涛',av:'郑',gen:'',duty:'班主任',cls:'五(1)',phone:'135****7712',time:'7月2日 11:05',reason:'核实非本校教师',ck:false}
  ],
  pass:[
    {n:'周敏',av:'周',gen:'girl',duty:'年段长(级组长)',cls:'四(1)、四(2)',phone:'133****4409',time:'7月6日 08:40',ck:false},
    {n:'刘老师',av:'刘',gen:'girl',duty:'任课老师',cls:'五(1)、五(2)',phone:'136****8874',time:'7月1日 08:12',ck:false}
  ]
};
var tpCur='pend';
var tpKeyword='';
var tpAuditName='';
var tpReadOnly=false;
var tpDuty='',tpSel=new Set(),tpCurG='三年级';
function tpTab(el,k){
  tpCur=k;tpKeyword='';
  var si=document.getElementById('tp-search');if(si)si.value='';
  document.querySelectorAll('#tp-tabs .fchip').forEach(function(x){x.classList.remove('on')});
  el.classList.add('on');
  tpRender();
}
function tpStatusLabel(k){return k==='pend'?'待审核':k==='reject'?'已拒绝':'已通过'}
function tpStatusClass(k){return k==='pend'?'amber':k==='reject'?'gray':'teal'}
function tpFilteredList(){return tpData[tpCur].filter(function(t){return !tpKeyword||t.n.indexOf(tpKeyword)>-1})}
function tpDutyAllOn(d,list){return list.filter(function(t){return t.duty===d}).every(function(t){return t.ck})}
function tpRender(){
  var list=tpFilteredList();
  var h='';
  if(!list.length){
    h='<div class="sm-empty"><div class="ico" style="display:flex;align-items:center;justify-content:center"><svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#D5DAE4" stroke-width="1.2"><circle cx="9.5" cy="8" r="3.4"/><path d="M4 19.5c.6-3.1 2.9-4.8 5.5-4.8 1.1 0 2.2.3 3.1.9"/></svg></div><div class="muted">暂无相关记录</div></div>';
  }else{
    h='<input type="text" id="tp-search" placeholder="输入姓名搜索" style="border-radius:20px;margin-bottom:10px" value="'+tpKeyword+'" oninput="tpSearch(this.value)">';
    h+='<div class="muted" style="padding:2px 2px 10px">申请入校: '+list.length+'人</div>';
    tmDuties.forEach(function(d){
      var stus=list.filter(function(t){return t.duty===d});
      if(!stus.length)return;
      var dAllOn=stus.every(function(t){return t.ck});
      h+='<div class="sm-grade">'+
        '<div class="sm-grade-hd" style="gap:10px"><div class="ck'+(dAllOn?' on':'')+'" onclick="event.stopPropagation();tpCkDuty(\''+d+'\')"></div><span style="font-size:14px;font-weight:700;flex:1" onclick="smToggleGrade(this.parentElement)">'+d+'</span>'+
        '<span class="cnt">'+stus.length+' 人</span><span class="arr" onclick="smToggleGrade(this.parentElement)">▼</span></div>'+
        '<div class="sm-grade-bd"><div class="sm-cls"><div class="sm-cls-bd">'+
        stus.map(function(t){return tpStuRow(t)}).join('')+
        '</div></div></div></div>';
    });
  }
  document.getElementById('tp-main').innerHTML=h;
  tpUpdateCnt();
  document.getElementById('tp-foot').style.display=tpCur==='pend'?'flex':'none';
}
function tpStuRow(t){
  var statLbl=tpStatusLabel(tpCur);
  var statCls=tpStatusClass(tpCur);
  var genIco='<span class="ico '+(t.gen==='girl'?'female':'male')+'" style="display:inline-flex;align-items:center;justify-content:center;width:16px;height:16px;border-radius:50%;background:'+(t.gen==='girl'?'#F06292':'#4A90D9')+';color:#fff;font-size:10px;vertical-align:middle;margin:0 2px">'+(t.gen==='girl'?'♀':'♂')+'</span>';
  return '<div class="stu" style="padding:10px 14px 10px 22px;cursor:pointer" onclick="tpCkStu(\''+t.n+'\')">'+
    '<div class="ck'+(t.ck?' on':'')+'" onclick="event.stopPropagation();tpCkStu(\''+t.n+'\')" style="flex-shrink:0"></div>'+
    '<div class="avatar adult'+(t.gen?' '+t.gen:'')+'">'+t.av+'</div>'+
    '<div style="flex:1;min-width:0"><div class="nm">'+t.n+genIco+'<span class="chip '+statCls+' plain" style="font-size:10px;padding:1px 6px;vertical-align:middle">'+statLbl+'</span></div><div class="sub">'+t.time+'</div></div>'+
    '<span class="muted" style="margin-left:auto;font-size:12px;white-space:nowrap;flex-shrink:0;padding:4px 0 4px 8px" onclick="event.stopPropagation();tpDetail(\''+t.n+'\')">详情 ›</span></div>';
}
function tpSearch(v){tpKeyword=v.trim();tpRender()}
function tpCkStu(name){var t=tpData[tpCur].find(function(x){return x.n===name});if(t)t.ck=!t.ck;tpRender()}
function tpCkDuty(d){var list=tpFilteredList();var stus=list.filter(function(t){return t.duty===d});var allOn=stus.every(function(t){return t.ck});stus.forEach(function(t){t.ck=!allOn});tpRender()}
function tpAll(el){var list=tpFilteredList();var allOn=list.every(function(t){return t.ck});list.forEach(function(t){t.ck=!allOn});tpRender()}
function tpUpdateCnt(){
  var k=tpData[tpCur].filter(function(t){return t.ck}).length;
  var total=tpFilteredList().length;
  document.getElementById('tp-cnt').textContent='全选 · 已选 '+k+' 人';
  document.getElementById('tp-all').classList.toggle('on',k>0&&k===total);
  document.getElementById('tp-approve').disabled=k===0;
  document.getElementById('tp-reject').disabled=k===0;
  document.getElementById('tp-approve').style.opacity=k===0?0.5:1;
  document.getElementById('tp-reject').style.opacity=k===0?0.5:1;
}
function tpApprove(){
  var picked=tpData.pend.filter(function(t){return t.ck});
  if(!picked.length)return;
  tpData.pend=tpData.pend.filter(function(t){return !t.ck});
  picked.forEach(function(t){t.ck=false;t.time='刚刚';tpData.pass.push(t)});
  toast('已通过 '+picked.length+' 人审核，教师信息已生效');
  tpRender();
}
/* 拒绝理由弹框（非必填） */
var tpRejectCallback=null;
function tpRejectSheet(cb){
  tpRejectCallback=cb;
  sheet('<h3>拒绝理由</h3>'+
    '<div class="desc" style="margin-bottom:8px">填写拒绝理由（非必填，可直接确定）</div>'+
    '<textarea id="tp-reason" placeholder="请输入拒绝理由（选填）" style="width:100%;min-height:80px;border:1px solid var(--line);border-radius:10px;padding:10px 12px;font-size:14px;font-family:inherit;resize:none;outline:none;margin-bottom:12px"></textarea>'+
    '<div style="display:flex;gap:10px"><button class="btn ghost blk" style="padding:10px" onclick="closeSheet()">取消</button><button class="btn pri blk" style="padding:10px" onclick="tpRejectConfirm()">确定</button></div>');
}
function tpRejectConfirm(){
  var reason=document.getElementById('tp-reason').value.trim();
  closeSheet();
  if(tpRejectCallback){tpRejectCallback(reason);tpRejectCallback=null}
}
function tpRejectBatch(){
  var picked=tpData.pend.filter(function(t){return t.ck});
  if(!picked.length)return;
  tpRejectSheet(function(reason){
    tpData.pend=tpData.pend.filter(function(t){return !t.ck});
    picked.forEach(function(t){t.ck=false;t.reason=reason||'未填写';t.time='刚刚';tpData.reject.push(t)});
    toast('已拒绝 '+picked.length+' 人，已移入「已拒绝」列表');
    tpRender();
  });
}
/* 教师审核页 */
function tpDetail(name){
  tpAuditName=name;
  tpReadOnly=tpCur!=='pend';
  var t=tpData[tpCur].find(function(x){return x.n===name});
  if(!t)return;
  document.getElementById('taudit-title').textContent=tpReadOnly?'教师详情':'教师审核';
  document.getElementById('taudit-name').value=t.n;
  document.getElementById('taudit-name').readOnly=tpReadOnly;
  document.getElementById('taudit-name').style.background=tpReadOnly?'#F0F2F6':'';
  var genders=document.querySelectorAll('#taudit-gender .fchip');
  genders.forEach(function(l){l.classList.remove('on');l.style.pointerEvents=tpReadOnly?'none':'';l.style.opacity=tpReadOnly?'0.6':''});
  if(t.gen==='girl')genders[1].classList.add('on');else genders[0].classList.add('on');
  tpDuty=t.duty;
  document.getElementById('taudit-duty-txt').textContent=t.duty;
  document.getElementById('taudit-duty-txt').style.color='var(--ink)';
  document.getElementById('taudit-duty-pick').style.pointerEvents=tpReadOnly?'none':'';
  document.getElementById('taudit-title').value=t.duty==='校长'?'校长':t.duty==='年段长(级组长)'?'主任':t.duty==='班主任'?'老师':'老师';
  document.getElementById('taudit-title').readOnly=tpReadOnly;
  document.getElementById('taudit-title').style.background=tpReadOnly?'#F0F2F6':'';
  tpSel.clear();t.cls.split('、').forEach(function(c){tpSel.add(c)});
  document.getElementById('taudit-cls-txt').textContent=t.cls;
  document.getElementById('taudit-cls-txt').style.color='var(--ink)';
  document.getElementById('taudit-cls-pick').style.pointerEvents=tpReadOnly?'none':'';
  document.getElementById('taudit-phone').value=t.phone;
  document.getElementById('taudit-foot').style.display=tpReadOnly?'none':'flex';
  go('sc-tchaudit');
}
function tauditGender(el){document.querySelectorAll('#taudit-gender .fchip').forEach(x=>x.classList.remove('on'));el.classList.add('on')}
function tauditDutySheet(){
  sheet('<h3>选择职务</h3><div style="max-height:300px;overflow-y:auto;margin:2px 0 14px">'+
    tmDuties.map(function(d){return '<label style="display:flex;align-items:center;gap:10px;padding:12px 2px;border-bottom:1px solid #F0F2F6;font-size:14px;cursor:pointer" onclick="tauditDutyPick(\''+d+'\')">'+d+(tpDuty===d?'<span style="margin-left:auto;color:var(--navy);font-size:16px">✓</span>':'<span class="arr" style="margin-left:auto">›</span>')+'</label>'}).join('')+'</div>');
}
function tauditDutyPick(d){tpDuty=d;closeSheet();var t=document.getElementById('taudit-duty-txt');t.textContent=d;t.style.color='var(--ink)'}
function tauditOpenCls(){
  sheet('<h3>选择任教班级</h3>'+
   '<div class="desc" style="margin-bottom:8px">先点左侧年级，再选班级；可跨年级多选</div>'+
   '<div id="tp-sel" class="fchips" style="margin-bottom:8px;gap:6px"></div>'+
   '<div style="display:flex;border:1px solid var(--line);border-radius:12px;overflow:hidden;height:300px;flex-shrink:0">'+
   '<div id="tp-grades" style="width:88px;background:#EFF3F9;overflow-y:auto;flex-shrink:0"></div>'+
   '<div style="flex:1;padding:10px 10px 6px;overflow-y:auto"><div class="fchips" id="tp-cls" style="gap:7px"></div></div></div>'+
   '<button class="btn pri blk" style="margin-top:12px;padding:11px" onclick="closeSheet()">完成</button>');
  tauditRender();
}
function tauditRender(){
  var t=document.getElementById('taudit-cls-txt');
  if(tpSel.size){t.textContent=[...tpSel].join('、');t.style.color='var(--ink)'}
  var gEl=document.getElementById('tp-grades');
  if(!gEl)return;
  gEl.innerHTML=Object.keys(regGrades).map(function(g){
    var n=[...tpSel].filter(function(k){return k[0]===g[0]}).length;
    return '<button onclick="tpCurG=\''+g+'\';tauditRender()" style="display:block;width:100%;text-align:left;padding:11px 12px;font-size:12.5px;'+(g===tpCurG?'background:#fff;color:var(--navy);font-weight:600;border-left:3px solid var(--navy);':'color:var(--ink-2);border-left:3px solid transparent;')+'">'+g+(n?' <span style="font-size:10.5px;color:var(--navy)">·'+n+'</span>':'')+'</button>';
  }).join('');
  var n=regGrades[tpCurG],h='';
  for(var i=1;i<=n;i++){var k=tpCurG[0]+'('+i+')';h+='<button class="fchip'+(tpSel.has(k)?' on':'')+'" onclick="tauditToggle(\''+k+'\')">'+k+'</button>'}
  document.getElementById('tp-cls').innerHTML=h;
  document.getElementById('tp-sel').innerHTML=tpSel.size?
    [...tpSel].map(function(k){return '<span class="chip navy plain" style="font-size:11.5px;padding:4px 10px;cursor:pointer" onclick="tauditToggle(\''+k+'\')">'+k+' ✕</span>'}).join(''):
    '<span class="muted">尚未选择 · 先点左侧年级，再选班级</span>';
}
function tauditToggle(k){tpSel.has(k)?tpSel.delete(k):tpSel.add(k);tauditRender()}
function tauditApprove(){
  var t=tpData[tpCur].find(function(x){return x.n===tpAuditName});
  if(t){var idx=tpData[tpCur].indexOf(t);tpData[tpCur].splice(idx,1);t.ck=false;t.time='刚刚';tpData.pass.push(t)}
  toast('已通过：'+tpAuditName+' 审核通过，教师信息已生效');
  setTimeout(function(){go('sc-tchpend');tpRender()},800);
}
function tauditReject(){
  tpRejectSheet(function(reason){
    var t=tpData[tpCur].find(function(x){return x.n===tpAuditName});
    if(t){var idx=tpData[tpCur].indexOf(t);tpData[tpCur].splice(idx,1);t.ck=false;t.reason=reason||'未填写';t.time='刚刚';tpData.reject.push(t)}
    toast('已拒绝：'+tpAuditName+'，已移入「已拒绝」列表');
    setTimeout(function(){go('sc-tchpend');tpRender()},800);
  });
}
/* 角标更新 */
var taN=2;
function taBadge(){
  const b=document.getElementById('ta-badge');
  if(b){b.textContent=taN;b.style.display=taN?'':'none'}
  const e=document.getElementById('ta-badge2');
  if(e){e.textContent=taN>0?taN+' 条待审':'已清空';if(!taN)e.className=e.className.replace('amber','gray')}
}
/* -------- 注册/登录（演示） -------- */
function wxLogin(){toast('已通过微信授权获取手机号 138****2233（演示）');setTimeout(()=>go('sc-auth'),700)}
function smsSend(btn){
  const ph=document.getElementById('sms-phone').value.trim();
  if(!/^1\d{10}$/.test(ph)){toast('请输入正确的 11 位手机号');return}
  btn.disabled=true;let s=60;btn.textContent='已发送 60s';
  const iv=setInterval(()=>{s--;if(s<=0){clearInterval(iv);btn.disabled=false;btn.textContent='重新获取'}else btn.textContent='已发送 '+s+'s'},1000);
  toast('验证码已发送（演示：任意 4–6 位数字均可登录）');
}
function smsLogin(){
  const ph=document.getElementById('sms-phone').value.trim(),cd=document.getElementById('sms-code').value.trim();
  if(!/^1\d{10}$/.test(ph)){toast('请输入正确的 11 位手机号');return}
  if(!/^\d{4,6}$/.test(cd)){toast('请输入 4–6 位数字验证码');return}
  toast('验证通过（演示）');setTimeout(()=>go('sc-auth'),500);
}
/* -------- 扫码注册：手机号短信验证（本人性）+ 性别单选 + 班级多选 + 白名单校验（演示） -------- */
function regGender(el){
  document.querySelectorAll('#reg-gender .fchip').forEach(x=>x.classList.remove('on'));
  el.classList.add('on');
}
/* 职务选择 */
var regDuty='';
function regDutySheet(){
  var duties=['校长','年段长(级组长)','班主任','任课老师'];
  sheet('<h3>选择职务</h3>'+
   '<div style="max-height:300px;overflow-y:auto;margin:2px 0 14px">'+
   duties.map(function(d){return '<label style="display:flex;align-items:center;gap:10px;padding:12px 2px;border-bottom:1px solid #F0F2F6;font-size:14px;cursor:pointer" onclick="regDutyPick(\''+d+'\')">'+d+(regDuty===d?'<span style="margin-left:auto;color:var(--navy);font-size:16px">✓</span>':'<span class="arr" style="margin-left:auto">›</span>')+'</label>'}).join('')+'</div>');
}
function regDutyPick(d){regDuty=d;closeSheet();var t=document.getElementById('reg-duty-txt');t.textContent=d;t.style.color='var(--ink)'}
/* 年级分组的班级多选：点击控件从底部滑出选择面板（左年级栏 + 右班级 chips + 已选可点删） */
const regGrades={'一年级':8,'二年级':8,'三年级':10,'四年级':10,'五年级':8,'六年级':6};
let regCur='三年级';const regSel=new Set();
function regKey(g,i){return g[0]+'('+i+')'}
function regOpenCls(){
  sheet('<h3>选择任教班级</h3>'+
   '<div class="desc" style="margin-bottom:8px">先点左侧年级，再选班级；可跨年级多选</div>'+
   '<div id="reg-sel" class="fchips" style="margin-bottom:8px;gap:6px"></div>'+
   '<div style="display:flex;border:1px solid var(--line);border-radius:12px;overflow:hidden;height:300px;flex-shrink:0">'+
     '<div id="reg-grades" style="width:88px;background:#EFF3F9;overflow-y:auto;flex-shrink:0"></div>'+
     '<div style="flex:1;padding:10px 10px 6px;overflow-y:auto"><div class="fchips" id="reg-cls" style="gap:7px"></div></div>'+
   '</div>'+
   '<button class="btn pri blk" style="margin-top:12px;padding:11px" onclick="closeSheet()">完成</button>');
  regRender();
}
function regField(){
  const t=document.getElementById('reg-cls-txt');
  if(regSel.size){t.textContent=[...regSel].join('、');t.style.color='var(--ink)'}
  else{t.textContent='请选择任教班级';t.style.color='var(--ink-3)'}
}
function regRender(){
  regField();
  const gEl=document.getElementById('reg-grades');
  if(!gEl)return;
  gEl.innerHTML=Object.keys(regGrades).map(g=>{
    const n=[...regSel].filter(k=>k[0]===g[0]).length;
    return '<button onclick="regCur=\''+g+'\';regRender()" style="display:block;width:100%;text-align:left;padding:11px 12px;font-size:12.5px;'+(g===regCur?'background:#fff;color:var(--navy);font-weight:600;border-left:3px solid var(--navy);':'color:var(--ink-2);border-left:3px solid transparent;')+'">'+g+(n?' <span style="font-size:10.5px;color:var(--navy)">·'+n+'</span>':'')+'</button>';
  }).join('');
  const n=regGrades[regCur];let h='';
  for(let i=1;i<=n;i++){const k=regKey(regCur,i);h+='<button class="fchip'+(regSel.has(k)?' on':'')+'" onclick="regToggle(\''+k+'\')">'+k+'</button>'}
  document.getElementById('reg-cls').innerHTML=h;
  document.getElementById('reg-sel').innerHTML=regSel.size
    ?[...regSel].map(k=>'<span class="chip navy plain" style="font-size:11.5px;padding:4px 10px;cursor:pointer" onclick="regToggle(\''+k+'\')">'+k+' ✕</span>').join('')
    :'<span class="muted">尚未选择 · 先点左侧年级，再选班级</span>';
}
function regToggle(k){regSel.has(k)?regSel.delete(k):regSel.add(k);regRender()}
function regSubmit(miss){
  const nm=document.getElementById('reg-name').value.trim();
  const g=document.querySelector('#reg-gender .fchip.on');
  const cls=[...regSel];
  if(!nm){toast('请输入教师姓名');return}
  if(!g){toast('请选择性别');return}
  if(!regDuty){toast('请选择职务');return}
  if(!cls.length){toast('请至少选择一个任教班级');return}
  const ph=miss?'139****5521':'138****2233';
  toast('微信授权弹窗：允许「阳光智园」获取手机号 '+ph+'（弹窗内可使用其他号码，演示）');
  setTimeout(()=>{
    if(miss){
      document.getElementById('pd-phone').textContent=ph;
      document.getElementById('pd-name').textContent=nm;
      document.getElementById('pd-cls').textContent=cls.join('、');
      go('sc-pending');
    }else{
      toast('白名单命中（'+ph+'）· 免审核自动生效');
      setTimeout(()=>{go('sc-home');toast('注册成功，欢迎 '+nm+' 老师！任教：'+cls.join('、'))},900);
    }
  },800);
}
/* 演示快捷路径：自动补全表单后按命中 / 未命中两种结果提交 */
function regDemo(miss){
  if(!document.getElementById('reg-name').value.trim())
    document.getElementById('reg-name').value=miss?'陈静怡':'王建国';
  if(!document.querySelector('#reg-gender .fchip.on'))
    document.querySelectorAll('#reg-gender .fchip')[miss?1:0].classList.add('on');
  if(!regDuty){regDutyPick(miss?'班主任':'班主任')}
  if(!regSel.size){(miss?['三(1)','三(3)']:['三(2)']).forEach(k=>regSel.add(k));regRender()}
  regSubmit(miss);
}
/* -------- 校园签到统计页：数据范围随账号角色（校长=全校 / 教师=任教班级），演示说明内切换角色 -------- */
/* 每班：n 班级名 · t 总人数 · d 今天[请假,缺勤,迟到,早退] · y 昨天[请假,缺勤,迟到,早退] · m 本月人次[请假,缺勤,迟到,早退]（7月1–3日上学日累计）；年级与全校数字一律求和，保证自洽 */
const attSchool=[
 {g:'一年级',cls:[
  {n:'一年级(1)班',t:46,d:[1,1,0,0],y:[1,0,1,0],m:[3,0,1,0]},
  {n:'一年级(2)班',t:45,d:[0,2,1,0],y:[0,0,0,0],m:[2,1,2,0]},
  {n:'一年级(3)班',t:47,d:[2,0,0,0],y:[2,0,0,0],m:[6,0,0,1]},
  {n:'一年级(4)班',t:44,d:[0,1,0,0],y:[1,0,0,0],m:[2,0,1,0]}]},
 {g:'二年级',cls:[
  {n:'二年级(1)班',t:48,d:[1,0,1,0],y:[0,1,0,0],m:[2,1,1,0]},
  {n:'二年级(2)班',t:46,d:[0,1,0,0],y:[1,0,1,0],m:[3,0,2,0]},
  {n:'二年级(3)班',t:45,d:[1,2,0,0],y:[1,0,0,0],m:[4,0,0,0]},
  {n:'二年级(4)班',t:47,d:[0,0,0,0],y:[0,0,0,0],m:[1,0,1,0]}]},
 {g:'三年级',cls:[
  {n:'三年级(1)班',t:44,d:[1,1,1,0],y:[1,0,0,0],m:[3,0,1,0]},
  {n:'三年级(2)班',t:45,d:[2,8,0,0],y:[2,0,1,0],m:[5,1,2,0]},
  {n:'三年级(3)班',t:46,d:[0,1,0,0],y:[1,1,0,0],m:[2,1,0,0]},
  {n:'三年级(4)班',t:45,d:[1,0,0,0],y:[0,0,1,0],m:[3,0,1,1]}]},
 {g:'四年级',cls:[
  {n:'四年级(1)班',t:47,d:[0,1,0,0],y:[1,0,0,0],m:[2,0,0,0]},
  {n:'四年级(2)班',t:48,d:[1,0,1,0],y:[0,0,1,0],m:[3,1,2,0]},
  {n:'四年级(3)班',t:46,d:[0,2,0,0],y:[1,0,0,0],m:[2,0,1,0]},
  {n:'四年级(4)班',t:45,d:[1,1,0,0],y:[0,1,0,0],m:[4,1,0,0]}]},
 {g:'五年级',cls:[
  {n:'五年级(1)班',t:52,d:[0,1,0,0],y:[1,0,1,0],m:[3,0,1,0]},
  {n:'五年级(2)班',t:51,d:[2,0,1,0],y:[1,0,0,0],m:[5,0,1,0]},
  {n:'五年级(3)班',t:50,d:[0,0,0,0],y:[0,0,0,0],m:[1,0,0,0]}]},
 {g:'六年级',cls:[
  {n:'六年级(1)班',t:49,d:[1,1,0,0],y:[1,0,0,0],m:[3,0,1,0]},
  {n:'六年级(2)班',t:50,d:[0,2,0,1],y:[0,1,1,0],m:[2,1,1,1]},
  {n:'六年级(3)班',t:51,d:[1,0,0,0],y:[1,0,0,0],m:[4,0,0,0]}]}
];
const attMine=[
  ['一年级(1)班','科任 · 数学'],
  ['一年级(3)班','科任 · 数学'],
  ['二年级(2)班','科任 · 数学'],
  ['二年级(4)班','科任 · 数学'],
  ['三年级(2)班','班主任 · 数学'],
  ['三年级(1)班','科任 · 数学'],
  ['四年级(1)班','科任 · 数学'],
  ['四年级(3)班','科任 · 数学'],
  ['五年级(1)班','科任 · 数学'],
  ['五年级(3)班','科任 · 数学'],
  ['六年级(2)班','科任 · 数学'],
  ['六年级(3)班','科任 · 数学']
];
const attSt={role:'teacher',period:'day',day:0,scope:'grade'};
/* 周视图数据：本周 5 个上学日累计人次，由月度（3 天）数据按 5/3 比例推算（演示） */
function attWeekData(c){return c.m.map(function(v){return Math.round(v*5/3)})}
function attSum(cls){
  var days=attSt.period==='month'?3:(attSt.period==='week'?5:1);
  var s={base:0,leave:0,abs:0,late:0,early:0};
  cls.forEach(function(c){
    var data;
    if(attSt.period==='month')data=c.m;
    else if(attSt.period==='week')data=attWeekData(c);
    else data=c[attSt.day===0?'d':'y'];
    s.base+=c.t*days;s.leave+=data[0];s.abs+=data[1];s.late+=data[2];s.early+=data[3]
  });
  s.in=s.base-s.leave-s.abs;s.rate=(s.in/s.base*100).toFixed(1)+'%';
  return s;
}
function attAlg(name,col,v,unit){
  return '<div class="alg"><span class="dot" style="background:'+(col||'transparent')+'"></span>'+name+'<b>'+v+' '+unit+'</b></div>';
}
function attCard(t,totalStudents,s,click){
  return '<div class="card" style="padding:12px 14px;cursor:pointer" onclick="'+click+'">'+
    '<div class="att-sec" style="margin-bottom:6px">'+t+(totalStudents?'<span style="font-weight:400;font-size:11px;color:var(--ink-3)">'+totalStudents+'人</span>':'')+
    '<span class="rt">出勤率 '+s.rate+'</span><span class="arr">›</span></div>'+
    '<div class="statrow sm">'+
    '<div class="it"><b style="color:var(--teal)">'+s.in+'</b><span>出勤</span></div><div class="div"></div>'+
    '<div class="it"><b style="color:var(--cinnabar)">'+s.abs+'</b><span>缺勤</span></div><div class="div"></div>'+
    '<div class="it"><b style="color:var(--navy)">'+s.leave+'</b><span>请假</span></div><div class="div"></div>'+
    '<div class="it"><b>'+s.late+'</b><span>迟到</span></div><div class="div"></div>'+
    '<div class="it"><b>'+s.early+'</b><span>早退</span></div>'+
    '</div></div>';
}
var attcClsName='三年级(2)班';
function attDrill(n){return "attcGo('"+n+"')"}
function attcGo(n){attcClsName=n;go('sc-attclass');renderAttc()}
function renderAtt(){
  const absCol='var(--cinnabar)';
  const unit=(attSt.period==='month'||attSt.period==='week')?'人次':'人';
  const allCls=attSchool.flatMap(x=>x.cls);
  const mineCls=attMine.map(x=>allCls.find(c=>c.n===x[0]));
  const top=attSum(mineCls);
  /* 日期导航标签：日=今天/历史日，周=本周/上周日期范围，月=年月 */
  document.getElementById('att-nav-label').textContent=
    attSt.period==='month'?'2026年7月':
    attSt.period==='week'?(attSt.day===0?'本周 7月6日–10日':'上周 6月29日–7月3日'):
    (attSt.day===0?'今天 7月6日':'7月3日 周五');
  const p1=top.in/top.base*100,p2=p1+top.leave/top.base*100;
  let h='<div class="card"><div class="att-sec">班级合计</div>'+
    '<div style="display:flex;align-items:center;gap:16px">'+
    '<div style="flex:1">'+
    '<div class="alg" style="padding-bottom:5px">'+(attSt.period==='day'?'总人数':'应出勤')+'<b style="font-size:17px;color:var(--teal)">'+top.base+' '+unit+'</b></div>'+
    attAlg('出勤','var(--teal)',top.in,unit)+attAlg('缺勤',absCol,top.abs,unit)+attAlg('请假','var(--navy)',top.leave,unit)+
    attAlg('迟到',null,top.late,unit)+attAlg('早退',null,top.early,unit)+
    '</div>'+
    '<div class="donut" style="background:conic-gradient(var(--teal) 0 '+p1+'%,var(--navy) '+p1+'% '+p2+'%,'+absCol+' '+p2+'% 100%)"><b>'+top.rate+'</b><span>出勤率</span></div>'+
    '</div></div>';
  /* 第一阶段隐藏：查询时段出入校入口（后续阶段实现；恢复方式：取消本段注释）
  h+='<button class="card" style="width:100%;display:flex;align-items:center;justify-content:center;gap:7px;color:var(--navy);font-size:14px;font-weight:600" onclick="toast(\'演示：唤起时段选择器，可查询任意时段的出入校通行记录\')">'+
    '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="6.5"/><path d="M20 20l-4.2-4.2"/></svg>查询时段出入校</button>';
  */
  h+='<div class="section-t">年级班级</div>';
  /* 按年级分组渲染任教班级，年级为一级目录，班级名去掉年级前缀 */
  var mineByGrade={};
  attMine.forEach(function(x){
    var c=allCls.find(function(v){return v.n===x[0]});
    if(!c)return;
    var grade=c.n.match(/^(.+?)\(/)[1];
    var shortName=c.n.replace(grade,'');
    if(!mineByGrade[grade])mineByGrade[grade]=[];
    mineByGrade[grade].push({full:c.n,short:shortName,role:x[1],c:c});
  });
  Object.keys(mineByGrade).forEach(function(gName){
    var items=mineByGrade[gName];
    var gSum=attSum(items.map(function(x){return x.c}));
    h+='<div class="sm-grade">'+
      '<div class="sm-grade-hd" onclick="smToggleGrade(this)"><span style="font-size:14px;font-weight:700">'+gName+'</span>'+
      '<span class="cnt">'+items.length+' 个班 · '+gSum.base+'人</span><span class="arr">▼</span></div>'+
      '<div class="sm-grade-bd"><div class="sm-cls"><div class="sm-cls-bd">';
    items.forEach(function(x){
      h+=attCard(x.short,x.c.t,attSum([x.c]),attDrill(x.full));
    });
    h+='</div></div></div></div>';
  });
  h+='<div class="muted" style="text-align:center;padding:2px 0 10px">'+
    (attSt.period==='month'?'月度统计为本月上学日累计（7月1–3日），周末与节假日不计入':
     attSt.period==='week'?(attSt.day===0?'周度统计为本周上学日累计，周末与节假日不计入':'上周数据已定格，补请假通过后自动更新'):
     attSt.day===0?'数据来自校门无感考勤，更新约延迟 1–5 分钟':'历史日数据已定格，补请假通过后自动更新')+'</div>';
  document.getElementById('att-main').innerHTML=h;
}
function attPeriod(p){
  attSt.period=p;attSt.day=0;
  document.querySelectorAll('#att-period .fchip').forEach(x=>x.classList.toggle('on',x.dataset.ap===p));
  if(curScreen!=='sc-att')go('sc-att');
  renderAtt();
renderAttc();
}
function attNav(dir){
  if(attSt.period==='month'){toast('演示：仅提供 2026年7月 的统计数据');return}
  if(dir<0){if(attSt.day===0){attSt.day=1;renderAtt()}else toast('演示：更早历史请唤起日期选择器回看，历史数据已定格')}
  else{if(attSt.day===1){attSt.day=0;renderAtt()}else toast('已是最新数据')}
}
function attScope(s){attSt.scope=s;renderAtt()}
function attGrade(i){
  attSt.scope='class';renderAtt();
  const el=document.getElementById('att-g'+i);if(el)el.scrollIntoView({behavior:'smooth',block:'start'});
}
function attRole(r){
  attSt.role=r;attSt.scope='grade';
  if(curScreen!=='sc-att')go('sc-att');
  renderAtt();
  toast(r==='principal'?'已切换为校长权限视图：可查看全校学生出勤（演示）':'已切换为班主任权限视图：仅可查看任教班级（演示）');
}
renderAtt();
/* -------- 考勤明细：上学/放学维度列表 + 日期/班级/状态筛选 -------- */
const attcStMap={
  signed:{lab:'已签到',chip:'teal'},nosign:{lab:'未签到',chip:'gray'},abs:{lab:'缺勤',chip:'red'},
  leave:{lab:'请假',chip:'navy'},late:{lab:'迟到',chip:'amber'},
  nosignout:{lab:'未签退',chip:'gray'},signedout:{lab:'已签退',chip:'teal'},early:{lab:'早退',chip:'amber'}
};
/* 按班级动态生成学生数据，覆盖全校一至六年级，切换班级展示不同学生 */
const attcNamePool=[
  '林晓乐','王一彤','赵梓涵','陈诗诺','陈子昂','杨梓冉','黄俊泽','郑皓宸','周雨桐','李沐宸',
  '沈亦辰','高子墨','宋佳怡','何雨泽','罗一诺','唐子萱','许景行','刘子轩','孙嘉懿','朱梓萱',
  '马浩然','胡艺涵','郭明轩','林芷若','何子墨','高欣怡','黄思源','周梦琪','徐子健','顾梓涵',
  '马若汐','胡晨阳','郭雨桐','林浩宇','何雨萱','高雅琪','黄一鸣','周子涵','徐若曦','顾明轩',
  '谢雨彤','韩子墨','冯梓萱','邓浩然','曹雨涵','彭子轩','蒋欣怡','袁一诺','于浩宇','董梓涵',
  '萧雨桐','田子墨','董欣怡','袁梦琪','冯一鸣','韩梓萱','谢浩然','曹子涵','彭雨桐','蒋一诺'
];
function attcGenStudents(clsName){
  /* 三年级(2)班保留原始演示学生，保证签到详情页等联动正常 */
  if(clsName==='三年级(2)班'){
    return [
      {n:'林晓乐',av:'乐',gen:'',amSt:'signed',amSub:'考勤时间 07:42',amOutSt:'signedout',amOutSub:'签退时间 11:46',pmInSt:'signed',pmInSub:'考勤时间 13:35',pmSt:'nosignout',pmSub:'放学时段待签退',eveInSt:'signed',eveInSub:'考勤时间 18:32',eveOutSt:'signedout',eveOutSub:'签退时间 20:35'},
      {n:'王一彤',av:'彤',gen:'girl',amSt:'signed',amSub:'考勤时间 07:45',amOutSt:'signedout',amOutSub:'签退时间 11:48',pmInSt:'signed',pmInSub:'考勤时间 13:32',pmSt:'nosignout',pmSub:'放学时段待签退',eveInSt:null,eveInSub:'',eveOutSt:null,eveOutSub:''},
      {n:'赵梓涵',av:'涵',gen:'',amSt:'signed',amSub:'考勤时间 07:51',amOutSt:'signedout',amOutSub:'签退时间 11:45',pmInSt:'signed',pmInSub:'考勤时间 13:38',pmSt:'nosignout',pmSub:'放学时段待签退',eveInSt:'signed',eveInSub:'考勤时间 18:28',eveOutSt:'signedout',eveOutSub:'签退时间 20:40'},
      {n:'陈诗诺',av:'诺',gen:'girl',amSt:'signed',amSub:'考勤时间 07:39',amOutSt:'signedout',amOutSub:'签退时间 11:50',pmInSt:'signed',pmInSub:'考勤时间 13:30',pmSt:'nosignout',pmSub:'放学时段待签退',eveInSt:null,eveInSub:'',eveOutSt:null,eveOutSub:''},
      {n:'陈子昂',av:'昂',gen:'',amSt:'signed',amSub:'考勤时间 07:48',amOutSt:'signedout',amOutSub:'签退时间 11:44',pmInSt:'signed',pmInSub:'考勤时间 13:36',pmSt:'nosignout',pmSub:'放学时段待签退',eveInSt:'signed',eveInSub:'考勤时间 18:35',eveOutSt:'nosignout',eveOutSub:'放学时段待签退'},
      {n:'杨梓冉',av:'冉',gen:'girl',amSt:'late',amSub:'考勤时间 08:12',amOutSt:'signedout',amOutSub:'签退时间 11:52',pmInSt:'signed',pmInSub:'考勤时间 13:40',pmSt:'nosignout',pmSub:'放学时段待签退',eveInSt:null,eveInSub:'',eveOutSt:null,eveOutSub:''},
      {n:'黄俊泽',av:'泽',gen:'',amSt:'signed',amSub:'考勤时间 07:58',amOutSt:'early',amOutSub:'签退时间 11:20（早退）',pmInSt:'signed',pmInSub:'考勤时间 13:34',pmSt:'nosignout',pmSub:'放学时段待签退',eveInSt:'late',eveInSub:'考勤时间 18:45',eveOutSt:'signedout',eveOutSub:'签退时间 20:38'},
      {n:'郑皓宸',av:'宸',gen:'',amSt:'leave',amSub:'病假 · 7月6日全天 · 已通过',amOutSt:null,amOutSub:'',pmInSt:null,pmInSub:'',pmSt:null,pmSub:'',eveInSt:null,eveInSub:'',eveOutSt:null,eveOutSub:''},
      {n:'周雨桐',av:'桐',gen:'girl',amSt:'abs',amSub:'截至 08:00 未考勤打卡',amOutSt:null,amOutSub:'',pmInSt:null,pmInSub:'',pmSt:null,pmSub:'',eveInSt:null,eveInSub:'',eveOutSt:null,eveOutSub:''},
      {n:'李沐宸',av:'宸',gen:'',amSt:'nosign',amSub:'截至 08:00 未考勤打卡',amOutSt:'nosignout',amOutSub:'上午未签到，放学无记录',pmInSt:'nosign',pmInSub:'截至 14:00 未考勤打卡',pmSt:'nosignout',pmSub:'放学时段待签退',eveInSt:null,eveInSub:'',eveOutSt:null,eveOutSub:''}
    ];
  }
  /* 根据班级名生成确定性学生列表（同一班级每次生成相同数据） */
  var seed=0;
  for(var i=0;i<clsName.length;i++)seed+=clsName.charCodeAt(i);
  var count=30+seed%12; /* 每班 30-41 人 */
  var pool=attcNamePool.slice();
  var offset=seed%attcNamePool.length;
  var students=[];
  var timeBase=7*60+35; /* 07:35 起 */
  for(var j=0;j<count;j++){
    var name=pool[(offset+j)%pool.length];
    var av=name[name.length-1];
    var gen=j%3===0?'girl':'';
    var r=(seed*7+j*13)%100;
    var amSt,amSub,amOutSt,amOutSub,pmInSt,pmInSub,pmSt,pmSub,eveInSt,eveInSub,eveOutSt,eveOutSub;
    if(r<70){ /* 70% 已签到 */
      var t=timeBase+j*2;
      var hh=Math.floor(t/60),mm=t%60;
      var tStr=(hh<10?'0':'')+hh+':'+(mm<10?'0':'')+mm;
      amSt='signed';amSub='考勤时间 '+tStr;
      /* 上午放学 */
      var ot=timeBase+240+j;
      var oh=Math.floor(ot/60),om=ot%60;
      amOutSt='signedout';amOutSub='签退时间 '+(oh<10?'0':'')+oh+':'+(om<10?'0':'')+om;
      /* 下午上学 */
      var pt=timeBase+360+j;
      var ph=Math.floor(pt/60),pm2=pt%60;
      pmInSt='signed';pmInSub='考勤时间 '+(ph<10?'0':'')+ph+':'+(pm2<10?'0':'')+pm2;
      pmSt='nosignout';pmSub='放学时段待签退';
      /* 部分学生有晚自习 */
      if(j%4===0){
        var et=timeBase+660+j;
        var eh=Math.floor(et/60),em=et%60;
        eveInSt='signed';eveInSub='考勤时间 '+(eh<10?'0':'')+eh+':'+(em<10?'0':'')+em;
        eveOutSt=j%8===0?'nosignout':'signedout';eveOutSub=eveOutSt==='nosignout'?'放学时段待签退':'签退时间 20:'+(30+j%30);
      }else{eveInSt=null;eveInSub='';eveOutSt=null;eveOutSub=''}
    }else if(r<78){
      amSt='late';amSub='考勤时间 08:1'+(j%10);
      amOutSt='signedout';amOutSub='签退时间 11:5'+(j%10);
      pmInSt='signed';pmInSub='考勤时间 13:3'+(j%10);
      pmSt='nosignout';pmSub='放学时段待签退';
      eveInSt=null;eveInSub='';eveOutSt=null;eveOutSub='';
    }else if(r<85){
      amSt='leave';amSub='请假 · 7月6日 · 已通过';
      amOutSt=null;amOutSub='';pmInSt=null;pmInSub='';pmSt=null;pmSub='';
      eveInSt=null;eveInSub='';eveOutSt=null;eveOutSub='';
    }else if(r<92){
      amSt='abs';amSub='截至 08:00 未考勤打卡';
      amOutSt=null;amOutSub='';pmInSt=null;pmInSub='';pmSt=null;pmSub='';
      eveInSt=null;eveInSub='';eveOutSt=null;eveOutSub='';
    }else{
      amSt='nosign';amSub='截至 08:00 未考勤打卡';
      amOutSt='nosignout';amOutSub='上午未签到，放学无记录';
      pmInSt='nosign';pmInSub='截至 14:00 未考勤打卡';
      pmSt='nosignout';pmSub='放学时段待签退';
      eveInSt=null;eveInSub='';eveOutSt=null;eveOutSub='';
    }
    students.push({n:name,av:av,gen:gen,amSt:amSt,amSub:amSub,amOutSt:amOutSt,amOutSub:amOutSub,pmInSt:pmInSt,pmInSub:pmInSub,pmSt:pmSt,pmSub:pmSub,eveInSt:eveInSt,eveInSub:eveInSub,eveOutSt:eveOutSt,eveOutSub:eveOutSub});
  }
  return students;
}
var attcStudents=attcGenStudents(attcClsName);
const attcArrSvg='<svg class="arr" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M9 6l6 6-6 6"/></svg>';
function attcRow(s,st,sub,dim){
  if(!st)return '';
  var m=attcStMap[st];
  if(!m)return '';
  /* 未签到/未签退不加箭头，其余状态加跳转标识 */
  var noArr=(st==='nosign'||st==='nosignout');
  var chipHtml=noArr?'<span class="chip '+m.chip+'">'+m.lab+'</span>':'<span class="chip '+m.chip+'">'+m.lab+attcArrSvg+'</span>';
  return '<div class="stu'+(noArr?'':' clickable')+'" data-name="'+s.n+'" data-st="'+st+'" data-dim="'+dim+'"><div class="avatar'+(s.gen?' '+s.gen:'')+'">'+s.av+'</div>'+
    '<div><div class="nm">'+s.n+'</div><div class="sub">'+sub+'</div></div>'+
    '<div class="st-grp">'+chipHtml+'</div></div>';
}
/* 时段内的上学/放学分组 */
function attcSubGroup(label,action,signed,total,color,rows,dim,collapsed){
  return '<div class="attc-grp'+(collapsed?' collapsed':'')+'">'+
    '<div class="attc-grp-hd" onclick="attcToggle(this)">'+
    '<span class="bar" style="background:'+color+'"></span>'+
    '<span class="lab">'+label+'</span>'+
    '<span class="cnt">'+action+': '+signed+'/'+total+'</span>'+
    '<span class="arr">▼</span></div>'+
    '<div class="attc-grp-bd"><div style="padding:0 4px">'+rows+'</div></div></div>';
}
/* 时段容器（上午/下午/晚上），内部包含上学+放学两个分组 */
function attcPeriod(periodLabel,subGroups){
  return '<div style="margin-top:12px">'+
    '<div style="display:flex;align-items:center;gap:8px;padding:8px 2px 6px">'+
    '<span style="width:3px;height:14px;border-radius:2px;background:var(--navy)"></span>'+
    '<span style="font-size:14px;font-weight:700;color:var(--ink)">'+periodLabel+'</span></div>'+
    subGroups.join('')+'</div>';
}
function attcToggle(el){el.parentElement.classList.toggle('collapsed')}
function renderAttc(){
  const clsTxt=document.getElementById('attc-cls-txt');
  if(clsTxt)clsTxt.textContent=attcClsName;
  /* 班级变更时重新生成该班学生数据 */
  if(!attcStudents.length||attcStudents._cls!==attcClsName){
    attcStudents=attcGenStudents(attcClsName);
    attcStudents._cls=attcClsName;
  }
  const f=document.getElementById('attc-st').value;
  const amFilters=['all','nosign','signed','abs','leave','late'];
  const pmFilters=['all','nosignout','signedout','early'];
  const showIn=amFilters.indexOf(f)>-1;  /* 上学类筛选 */
  const showOut=pmFilters.indexOf(f)>-1; /* 放学类筛选 */
  let h='';
  /* 6个时间点定义：[字段st, 字段sub, label, action, color, dim, 是否上学类] */
  var timePoints=[
    {stKey:'amSt',subKey:'amSub',label:'上学',action:'签到',color:'var(--teal)',dim:'am',isIn:true},
    {stKey:'amOutSt',subKey:'amOutSub',label:'放学',action:'签退',color:'#E8941A',dim:'amOut',isIn:false},
    {stKey:'pmInSt',subKey:'pmInSub',label:'上学',action:'签到',color:'var(--teal)',dim:'pmIn',isIn:true},
    {stKey:'pmSt',subKey:'pmSub',label:'放学',action:'签退',color:'#E8941A',dim:'pm',isIn:false},
    {stKey:'eveInSt',subKey:'eveInSub',label:'上学',action:'签到',color:'var(--teal)',dim:'eveIn',isIn:true},
    {stKey:'eveOutSt',subKey:'eveOutSub',label:'放学',action:'签退',color:'#E8941A',dim:'eveOut',isIn:false}
  ];
  var periods=[
    {label:'上午',tps:[0,1]},
    {label:'下午',tps:[2,3]},
    {label:'晚上',tps:[4,5]}
  ];
  periods.forEach(function(p){
    var subGroups=[];
    var hasAny=false;
    p.tps.forEach(function(tpIdx){
      var tp=timePoints[tpIdx];
      /* 筛选时不显示不相关的时间点 */
      if(f!=='all'){
        if(tp.isIn&&!showIn)return;
        if(!tp.isIn&&!showOut)return;
      }
      var list=attcStudents.filter(function(s){return s[tp.stKey]&&(f==='all'||s[tp.stKey]===f)});
      if(!list.length)return;
      hasAny=true;
      var signed=0;
      list.forEach(function(s){
        if(tp.isIn&&(s[tp.stKey]==='signed'||s[tp.stKey]==='late'))signed++;
        if(!tp.isIn&&s[tp.stKey]==='signedout')signed++;
      });
      var rows=list.map(function(s){return attcRow(s,s[tp.stKey],s[tp.subKey],tp.dim)}).join('');
      /* 上午上学默认展开，其余默认折叠 */
      var collapsed=!(tpIdx===0);
      subGroups.push(attcSubGroup(tp.label,tp.action,signed,list.length,tp.color,rows,tp.dim,collapsed));
    });
    if(hasAny){
      h+=attcPeriod(p.label,subGroups);
    }
  });
  document.getElementById('attc-main').innerHTML=h;
  document.querySelectorAll('#attc-main .stu').forEach(function(row){
    row.addEventListener('click',function(e){
      if(e.target.closest('button'))return;
      const name=this.dataset.name,st=this.dataset.st,dim=this.dataset.dim;
      if(st==='leave'){slvShow(name);return}
      if(st==='abs'){
        /* 缺勤学生直接跳转代学生补签页，反显时段+默认选中 */
        var periodMap={'am':'上午','amOut':'上午','pmIn':'下午','pm':'下午','eveIn':'晚上','eveOut':'晚上'};
        var pointMap={'am':'上学','amOut':'放学','pmIn':'上学','pm':'放学','eveIn':'上学','eveOut':'放学'};
        asEnterDirect(name,periodMap[dim]||'上午',pointMap[dim]||'上学');
        return;
      }
      else if(st==='nosign'||st==='nosignout'){return}
      else if(name==='林晓乐'){stuTab('sign');stuDate('today');go('sc-attstu')}
      else toast('演示：学生签到详情以林晓乐为例，请点击林晓乐行查看');
    });
  });
}
function attcSignGo(name,dim){
  attcSignName=name;
  var stu=attcStudents.find(function(s){return s.n===name});
  if(stu){
    document.getElementById('sg-name').textContent=name;
    document.getElementById('sg-av').textContent=stu.av;
    document.getElementById('sg-av').className='avatar'+(stu.gen?' '+stu.gen:'');
    document.getElementById('sg-av').style.width='48px';
    document.getElementById('sg-av').style.height='48px';
    document.getElementById('sg-av').style.fontSize='18px';
    document.getElementById('sg-cls').textContent=attcClsName;
    document.getElementById('sg-period').textContent=dim==='pm'?'放学':'上学';
  }
  sgTime='';sgReason='';
  document.getElementById('sg-time').textContent='请选择 ›';
  document.getElementById('sg-reason').textContent='请选择 ›';
  document.getElementById('sg-push').classList.add('on');
  go('sc-attcsign');
}
var attcSignName='周雨桐';
function attcDateChange(){
  const d=document.getElementById('attc-date').value;
  if(d!=='2026-07-06')toast('演示：历史日数据已定格，仅补请假通过后可更新');
  renderAttc();
}
/* 班级选择：参照教师注册页任教班级选择组件（左年级栏+右班级chips），单选 */
var attcCurG='三年级';
function attcClsSheet(){
  sheet('<h3>选择班级</h3>'+
   '<div style="display:flex;border:1px solid var(--line);border-radius:12px;overflow:hidden;height:300px;flex-shrink:0">'+
     '<div id="attc-grades" style="width:88px;background:#EFF3F9;overflow-y:auto;flex-shrink:0"></div>'+
     '<div style="flex:1;padding:10px 10px 6px;overflow-y:auto"><div class="fchips" id="attc-cls-list" style="gap:7px"></div></div>'+
   '</div>');
  attcClsRender();
}
function attcClsRender(){
  var gEl=document.getElementById('attc-grades');
  if(!gEl)return;
  gEl.innerHTML=Object.keys(regGrades).map(function(g){
    return '<button onclick="attcCurG=\''+g+'\';attcClsRender()" style="display:block;width:100%;text-align:left;padding:11px 12px;font-size:12.5px;'+(g===attcCurG?'background:#fff;color:var(--navy);font-weight:600;border-left:3px solid var(--navy);':'color:var(--ink-2);border-left:3px solid transparent;')+'">'+g+'</button>';
  }).join('');
  var n=regGrades[attcCurG],h='';
  for(var i=1;i<=n;i++){
    var k=attcCurG+'('+i+')班';
    var isCur=attcClsName===k;
    h+='<button class="fchip'+(isCur?' on':'')+'" onclick="attcClsPick(\''+k+'\')">'+k+(isCur?' ✓':'')+'</button>';
  }
  document.getElementById('attc-cls-list').innerHTML=h;
}
function attcClsPick(k){
  attcClsName=k;
  closeSheet();
  renderAttc();
}
function attcFilterChange(){renderAttc()}
/* -------- 补签页面 -------- */
var sgTime='',sgReason='';
function sgTimeSheet(){
  var slots=['07:30','07:35','07:40','07:45','07:50','07:55','08:00','08:05','08:10','08:15','08:20'];
  sheet('<h3>选择考勤时间</h3><div style="max-height:300px;overflow-y:auto;margin:2px 0 14px">'+
    slots.map(function(t){return '<label style="display:flex;align-items:center;gap:10px;padding:11px 2px;border-bottom:1px solid #F0F2F6;font-size:14px;cursor:pointer" onclick="sgTimePick(\''+t+'\')">'+t+'<span class="arr" style="margin-left:auto">›</span></label>'}).join('')+'</div>');
}
function sgTimePick(t){sgTime=t;closeSheet();document.getElementById('sg-time').textContent=t+' ›'}
function sgReasonSheet(){
  var reasons=['校徽未读到（实际在校）','迟到入校','家长送校后未走通道','其他'];
  sheet('<h3>选择补签原因</h3><div style="max-height:300px;overflow-y:auto;margin:2px 0 14px">'+
    reasons.map(function(r){return '<label style="display:flex;align-items:center;gap:10px;padding:11px 2px;border-bottom:1px solid #F0F2F6;font-size:14px;cursor:pointer" onclick="sgReasonPick(\''+r+'\')">'+r+'<span class="arr" style="margin-left:auto">›</span></label>'}).join('')+'</div>');
}
function sgReasonPick(r){sgReason=r;closeSheet();document.getElementById('sg-reason').textContent=r+' ›'}
function sgConfirm(){
  if(!sgTime){toast('请选择考勤时间');return}
  if(!sgReason){toast('请选择补签原因');return}
  /* 更新学生状态：缺勤 → 已签到 */
  var stu=attcStudents.find(function(s){return s.n===attcSignName});
  if(stu){
    stu.amSt='signed';
    stu.amSub='考勤时间 '+sgTime;
  }
  var pushOn=document.getElementById('sg-push').classList.contains('on');
  toast('已补签：'+attcSignName+' 计入已签到，操作已留痕'+(pushOn?'，考勤信息已推送家长':''));
  sgTime='';sgReason='';
  setTimeout(function(){go('sc-attclass');renderAttc()},800);
}
/* -------- 首页统计项直达考勤明细页 -------- */
function goAtt(f){
  var map={all:'all',in:'signed',leave:'leave',abs:'abs'};
  var v=map[f]||'all';
  go('sc-attclass');
  document.getElementById('attc-st').value=v;
  renderAttc();
}
/* -------- 代学生补签：未签到学生可由老师补签 -------- */
function attRollSheet(){
  /* 从当前班级学生中筛选未签到学生 */
  const rest=attcStudents.filter(s=>s.amSt==='nosign'||s.amSt==='abs').map(s=>({n:s.n,signed:false}));
  if(!rest.length){toast('今日未签到学生均已处理');return}
  sheet('<h3>代学生补签 · '+attcClsName+' <span style="font-weight:400;font-size:12px;color:var(--ink-3)">未签到 '+rest.length+' 人</span></h3>'+
    '<label style="display:inline-flex;align-items:center;gap:8px;font-size:13px;color:var(--ink-2);margin-top:8px;padding:2px 2px">'+
    '<input type="checkbox" id="roll-all" style="width:16px;height:16px;accent-color:var(--teal)" onchange="attRollAll(this)">全选</label>'+
    '<div style="max-height:280px;overflow-y:auto;margin:2px 0 14px">'+
    rest.map((x,i)=>'<label style="display:flex;align-items:center;gap:11px;padding:9px 2px;border-bottom:1px solid #F0F2F6;font-size:14px">'+
      '<input type="checkbox" data-roll="'+i+'" style="width:17px;height:17px;accent-color:var(--teal)" onchange="attRollCnt()">'+
      x.n+'<span class="muted" style="margin-left:auto">未签到 · 无通行信号</span></label>').join('')+'</div>'+
    '<button class="btn pri blk" id="roll-btn" onclick="attRollConfirm()">确认补签（已选 0）</button>'+
    '<button class="btn ghost blk" style="margin-top:9px" onclick="closeSheet()">取消</button>');
}
function attRollAll(el){
  document.querySelectorAll('[data-roll]').forEach(x=>x.checked=el.checked);
  attRollCnt();
}
function attRollCnt(){
  const k=document.querySelectorAll('[data-roll]:checked').length;
  document.getElementById('roll-btn').textContent='确认补签（已选 '+k+'）';
  document.getElementById('roll-all').checked=k===document.querySelectorAll('[data-roll]').length;
}
function attRollConfirm(){
  const rest=attcStudents.filter(s=>s.amSt==='nosign'||s.amSt==='abs').map(s=>({n:s.n,signed:false}));
  const picked=[...document.querySelectorAll('[data-roll]:checked')].map(x=>rest[+x.dataset.roll]);
  if(!picked.length){toast('请先勾选实际到校的学生');return}
  /* 更新学生状态 */
  picked.forEach(p=>{
    const s=attcStudents.find(x=>x.n===p.n);
    if(s){s.amSt='signed';s.amSub='老师点名确认到校 · 已补签'}
  });
  closeSheet();
  renderAttc();
  const left=attcStudents.filter(s=>s.amSt==='nosign'||s.amSt==='abs').length;
  toast('已补签 '+picked.length+' 人计入已签到，操作已留痕'+(left?'；其余 '+left+' 人保持未签到，可代为请假':'，今日未签到已清零'));
}
/* -------- 代学生补签页 -------- */
var asClsName='三年级(2)班';
var asCurG='三年级';
var asSelected={};
var asStudents=[];
var asPeriod='';
var asPoint='';
var asPreselectName='';
/* 补签时段选择弹框（从考勤明细底部按钮进入） */
function asEnterSheet(){
  sheet('<h3>选择补签时段</h3>'+
    '<div style="margin:8px 0 12px">'+
    '<div style="font-size:12px;color:var(--ink-2);margin-bottom:6px">第一步：选择时段</div>'+
    '<div class="fchips" id="as-period-chips" style="gap:8px;margin-bottom:14px">'+
    ['上午','下午','晚上'].map(function(p){return '<button class="fchip" onclick="asSheetPeriod(\''+p+'\')">'+p+'</button>'}).join('')+
    '</div>'+
    '<div id="as-point-wrap" style="display:none">'+
    '<div style="font-size:12px;color:var(--ink-2);margin-bottom:6px">第二步：选择时间点</div>'+
    '<div class="fchips" id="as-point-chips" style="gap:8px;margin-bottom:14px"></div></div></div>'+
    '<button class="btn pri blk" id="as-confirm-btn" onclick="asSheetConfirm()" disabled style="opacity:0.5">确定</button>'+
    '<button class="btn ghost blk" style="margin-top:9px" onclick="closeSheet()">取消</button>');
}
function asSheetPeriod(p){
  asPeriod=p;
  document.querySelectorAll('#as-period-chips .fchip').forEach(function(c){
    c.classList.toggle('on',c.textContent===p);
  });
  /* 显示时间点选择 */
  document.getElementById('as-point-wrap').style.display='';
  document.getElementById('as-point-chips').innerHTML=['上学','放学'].map(function(pt){
    return '<button class="fchip" onclick="asSheetPoint(\''+pt+'\')">'+pt+'</button>';
  }).join('');
  asPoint='';
  asSheetUpdateBtn();
}
function asSheetPoint(pt){
  asPoint=pt;
  document.querySelectorAll('#as-point-chips .fchip').forEach(function(c){
    c.classList.toggle('on',c.textContent===pt);
  });
  asSheetUpdateBtn();
}
function asSheetUpdateBtn(){
  var btn=document.getElementById('as-confirm-btn');
  var ready=asPeriod&&asPoint;
  btn.disabled=!ready;
  btn.style.opacity=ready?'1':'0.5';
}
function asSheetConfirm(){
  if(!asPeriod||!asPoint){toast('请先选择时段和时间点');return}
  closeSheet();
  asPreselectName='';
  asEnter();
}
/* 缺勤学生直接跳转（反显时段+默认选中） */
function asEnterDirect(name,period,point){
  asPeriod=period;
  asPoint=point;
  asPreselectName=name;
  asEnter();
}
/* 进入代学生补签页 */
function asEnter(){
  go('sc-attsign');
  try{
    if(!asStudents.length||asStudents._cls!==asClsName){asInitStudents()}
    asSelected={};
    /* 如果有预选学生，自动选中 */
    if(asPreselectName){asSelected[asPreselectName]=true}
    asRender();
    asUpdateForm();
  }catch(e){
    setTimeout(function(){
      try{asInitStudents();asRender();asUpdateForm()}catch(e2){}
    },100);
  }
}
/* 班级选择sheet */
function asClsSheet(){
  sheet('<h3>选择班级</h3>'+
   '<div style="display:flex;border:1px solid var(--line);border-radius:12px;overflow:hidden;height:300px;flex-shrink:0">'+
     '<div id="as-grades" style="width:88px;background:#EFF3F9;overflow-y:auto;flex-shrink:0"></div>'+
     '<div style="flex:1;padding:10px 10px 6px;overflow-y:auto"><div class="fchips" id="as-cls-list" style="gap:7px"></div></div>'+
   '</div>');
  asClsRender();
}
function asClsRender(){
  var gEl=document.getElementById('as-grades');
  if(!gEl)return;
  gEl.innerHTML=Object.keys(regGrades).map(function(g){
    return '<button onclick="asCurG=\''+g+'\';asClsRender()" style="display:block;width:100%;text-align:left;padding:11px 12px;font-size:12.5px;'+(g===asCurG?'background:#fff;color:var(--navy);font-weight:600;border-left:3px solid var(--navy);':'color:var(--ink-2);border-left:3px solid transparent;')+'">'+g+'</button>';
  }).join('');
  var n=regGrades[asCurG],h='';
  for(var i=1;i<=n;i++){
    var k=asCurG+'('+i+')班';
    var isCur=asClsName===k;
    h+='<button class="fchip'+(isCur?' on':'')+'" onclick="asClsPick(\''+k+'\')">'+k+(isCur?' ✓':'')+'</button>';
  }
  document.getElementById('as-cls-list').innerHTML=h;
}
function asClsPick(k){
  asClsName=k;
  closeSheet();
  asSelected={};
  asInitStudents();
  asRender();
}
/* 生成学生列表（全班，缺勤学生标注"缺勤"） */
function asInitStudents(){
  asStudents=attcGenStudents(asClsName);
  asStudents._cls=asClsName;
}
/* 渲染学生列表 */
function asRender(){
  var txt=document.getElementById('as-search').value.trim();
  var txtEl=document.getElementById('as-cls-txt');
  if(txtEl)txtEl.textContent=asClsName;
  var list=asStudents.filter(function(s){
    if(!txt)return true;
    return s.n.indexOf(txt)>-1;
  });
  var h='';
  list.forEach(function(s){
    var checked=asSelected[s.n]?'checked':'';
    /* 判断是否缺勤 */
    var isAbs=s.amSt==='abs'||s.amSt==='nosign';
    var absTag=isAbs?'<span style="font-size:11px;color:#fff;background:var(--cinnabar);padding:1px 6px;border-radius:4px;margin-left:6px">缺勤</span>':'';
    h+='<label style="display:flex;align-items:center;gap:10px;padding:9px 14px;border-bottom:1px solid #F0F2F6;cursor:pointer">'+
      '<input type="checkbox" data-name="'+s.n+'" style="width:17px;height:17px;accent-color:var(--navy)" '+checked+' onchange="asToggle(\''+s.n+'\')">'+
      '<div class="avatar'+(s.gen?' '+s.gen:'')+'" style="width:32px;height:32px;font-size:13px">'+s.av+'</div>'+
      '<span style="font-size:14px">'+s.n+absTag+'</span></label>';
  });
  document.getElementById('as-stu-list').innerHTML=h;
  asUpdateCnt();
}
function asToggle(name){
  if(asSelected[name])delete asSelected[name];
  else asSelected[name]=true;
  asUpdateCnt();
}
function asToggleAll(el){
  var txt=document.getElementById('as-search').value.trim();
  var list=asStudents.filter(function(s){
    if(!txt)return true;
    return s.n.indexOf(txt)>-1;
  });
  if(el.checked){
    list.forEach(function(s){asSelected[s.n]=true});
  }else{
    list.forEach(function(s){delete asSelected[s.n]});
  }
  asRender();
}
function asUpdateCnt(){
  var cnt=Object.keys(asSelected).length;
  var total=asStudents.length;
  var cntEl=document.getElementById('as-cnt');
  if(cntEl){
    if(cnt>0){
      cntEl.textContent='已选 '+cnt+' 人';
      cntEl.style.color='var(--navy)';
    }else{
      cntEl.textContent='共 '+total+' 人';
      cntEl.style.color='var(--ink-3)';
    }
  }
  var allEl=document.getElementById('as-all');
  if(allEl){
    var txt=document.getElementById('as-search').value.trim();
    var list=asStudents.filter(function(s){
      if(!txt)return true;
      return s.n.indexOf(txt)>-1;
    });
    allEl.checked=list.length>0&&list.every(function(s){return asSelected[s.n]});
  }
}
/* 更新表单反显 */
function asUpdateForm(){
  var periodEl=document.getElementById('as-period-val');
  if(periodEl){
    if(asPeriod&&asPoint){
      periodEl.textContent=asPeriod+'-'+asPoint;
      periodEl.style.color='var(--ink)';
    }else{
      periodEl.textContent='请先选择';
      periodEl.style.color='var(--ink-3)';
    }
  }
  /* 重置时间和状态 */
  document.getElementById('as-time').value='';
  asSetStatus('abs');
}
/* 时间选择sheet */
function asTimeSheet(){
  sheet('<h3>选择考勤时间</h3>'+
    '<div style="padding:4px 0 14px">'+
    '<div style="display:flex;gap:10px;align-items:center">'+
    '<select id="as-ts-hh" style="flex:1;border:1px solid var(--line);border-radius:8px;padding:8px 10px;font-size:14px">'+
    Array.from({length:24},function(_,i){return '<option value="'+(i<10?'0':'')+i+'">'+(i<10?'0':'')+i+'时</option>'}).join('')+
    '</select>'+
    '<span style="font-size:16px">:</span>'+
    '<select id="as-ts-mm" style="flex:1;border:1px solid var(--line);border-radius:8px;padding:8px 10px;font-size:14px">'+
    ['00','05','10','15','20','25','30','35','40','45','50','55'].map(function(m){return '<option value="'+m+'">'+m+'分</option>'}).join('')+
    '</select></div></div>'+
    '<button class="btn pri blk" onclick="asTimePick()">确认</button>'+
    '<button class="btn ghost blk" style="margin-top:9px" onclick="closeSheet()">取消</button>');
}
function asTimePick(){
  var hh=document.getElementById('as-ts-hh').value;
  var mm=document.getElementById('as-ts-mm').value;
  var timeStr=hh+':'+mm;
  document.getElementById('as-time').value=timeStr;
  closeSheet();
  /* 根据时间自动判定考勤状态 */
  /* 上学：08:00前正常，08:00-08:30迟到，08:30后缺勤；放学：以16:30为界 */
  var hour=parseInt(hh),minu=parseInt(mm);
  var totalMin=hour*60+minu;
  var lateThreshold,absThreshold;
  if(asPoint==='上学'){
    lateThreshold=asPeriod==='上午'?8*60:asPeriod==='下午'?13*60+30:18*60;
    absThreshold=lateThreshold+30;
  }else{
    lateThreshold=asPeriod==='上午'?11*60+30:asPeriod==='下午'?16*60+30:20*60+30;
    absThreshold=lateThreshold+30;
  }
  var status;
  if(totalMin<=lateThreshold){status='normal'}
  else if(totalMin<=absThreshold){status='late'}
  else{status='abs'}
  asSetStatus(status);
  toast('已根据'+asPeriod+asPoint+'时间'+timeStr+'自动判定状态');
}
/* 设置考勤状态单选 */
function asSetStatus(val){
  document.querySelectorAll('input[name="as-status"]').forEach(function(r){
    r.checked=r.value===val;
    var label=r.parentElement;
    if(r.checked){
      label.style.borderColor='var(--navy)';
      label.style.background='#E3EEFD';
    }else{
      label.style.borderColor='var(--line)';
      label.style.background='#fff';
    }
  });
}
/* 手动切换考勤状态时更新样式 */
function asStatusChange(){
  document.querySelectorAll('input[name="as-status"]').forEach(function(r){
    var label=r.parentElement;
    if(r.checked){
      label.style.borderColor='var(--navy)';
      label.style.background='#E3EEFD';
    }else{
      label.style.borderColor='var(--line)';
      label.style.background='#fff';
    }
  });
}
/* 提交 */
function asSubmit(){
  var cnt=Object.keys(asSelected).length;
  if(!cnt){toast('请先选择补签学生');return}
  if(!asPeriod||!asPoint){toast('考勤时段信息缺失');return}
  var statusEl=document.querySelector('input[name="as-status"]:checked');
  var statusMap={'normal':'正常到校','late':'迟到','abs':'缺勤'};
  var status=statusMap[statusEl?statusEl.value:'abs'];
  var timeVal=document.getElementById('as-time').value;
  var timeStr=timeVal?'，考勤时间 '+timeVal:'';
  toast('已为 '+cnt+' 名学生提交补签：'+asPeriod+'-'+asPoint+timeStr+'，状态：'+status);
  go('sc-attclass');
}
/* -------- 学生请假记录页（从考勤明细请假学生点击进入） -------- */
const slvData={
  '林晓乐':{av:'乐',gen:'',cls:'三年级(2)班',parent:'母亲(乐乐妈妈)',records:[
    {type:'病假',start:'07-07 08:00',end:'07-07 12:00',reason:'发热38.2℃，需复诊观察',submitT:'07-04 21:18',approveT:'07-04 21:40',teacher:'王老师'},
    {type:'事假',start:'07-14 08:00',end:'07-14 12:00',reason:'上午随家人办事，午后返校',submitT:'07-06 16:32',approveT:'07-06 17:05',teacher:'王老师'},
    {type:'病假',start:'06-26 12:00',end:'06-26 16:00',reason:'感冒发烧，下午需休息',submitT:'06-25 14:00',approveT:'06-25 14:30',teacher:'王老师'}
  ]},
  '郑皓宸':{av:'宸',gen:'',cls:'三年级(2)班',parent:'母亲(郑皓宸妈妈)',records:[
    {type:'病假',start:'07-06 08:00',end:'07-06 16:00',reason:'肠胃不适，需就医',submitT:'07-03 10:15',approveT:'07-03 10:50',teacher:'王老师'}
  ]},
  'default':{av:'学',gen:'',cls:'三年级(2)班',parent:'家长',records:[
    {type:'事假',start:'07-08 08:00',end:'07-08 16:00',reason:'家中有事需请假一天',submitT:'07-05 08:20',approveT:'07-05 09:00',teacher:'王老师'},
    {type:'病假',start:'06-20 08:00',end:'06-20 12:00',reason:'身体不适需休息',submitT:'06-19 20:00',approveT:'06-19 20:30',teacher:'王老师'}
  ]}
};
function slvGet(name){
  var d=slvData[name]||slvData['default'];
  /* 动态补充学生头像和班级 */
  var stu=attcStudents.find(function(s){return s.n===name});
  if(stu){d.av=stu.av;d.gen=stu.gen;d.cls=attcClsName}
  return d;
}
function slvShow(name){
  var d=slvGet(name);
  d._name=name;
  var genIco='<span class="ico '+(d.gen==='girl'?'female':'male')+'" style="display:inline-flex;align-items:center;justify-content:center;width:16px;height:16px;border-radius:50%;background:'+(d.gen==='girl'?'#F06292':'#4A90D9')+';color:#fff;font-size:10px">'+(d.gen==='girl'?'♀':'♂')+'</span>';
  var h='<div class="card" style="display:flex;align-items:center;gap:12px;padding:14px">'+
    '<div class="avatar'+(d.gen?' '+d.gen:'')+'" style="width:46px;height:46px;font-size:17px;flex-shrink:0">'+d.av+'</div>'+
    '<div style="flex:1;min-width:0"><div style="font-size:15px;font-weight:600;display:flex;align-items:center;gap:5px">'+genIco+name+'</div>'+
    '<div class="muted" style="font-size:12px;margin-top:2px">'+d.cls+'</div></div></div>';
  /* 每条请假独立卡片，卡片间有间距 */
  d.records.forEach(function(r,i){
    h+='<div class="card" style="padding:0;overflow:hidden;margin-top:10px" onclick="sldShow(\''+name+'\','+i+')" style="cursor:pointer">'+
      '<div style="padding:12px 14px 8px"><div style="font-size:15px;font-weight:600">'+r.type+'</div></div>'+
      '<div style="padding:0 14px 10px">'+
      '<div style="display:flex;align-items:center;font-size:12.5px;color:var(--ink-2);margin-top:2px"><span style="color:var(--ink-3);width:56px;flex-shrink:0">开始时间</span><span>'+r.start+'</span></div>'+
      '<div style="display:flex;align-items:center;font-size:12.5px;color:var(--ink-2);margin-top:4px"><span style="color:var(--ink-3);width:56px;flex-shrink:0">结束时间</span><span>'+r.end+'</span></div></div>'+
      '<div class="hr"></div>'+
      '<div style="display:flex;align-items:center;gap:8px;padding:9px 14px">'+
      '<span class="muted" style="font-size:12.5px">'+d.parent+'</span>'+
      '<span class="muted" style="margin-left:auto;font-size:12px">'+r.submitT+'</span></div></div>';
  });
  document.getElementById('slv-content').innerHTML=h;
  go('sc-stuleave');
}
/* -------- 学生请假详情页 -------- */
function sldShow(name,idx){
  var d=slvGet(name);
  var r=d.records[idx]||d.records[0];
  var h='<div class="card">'+
    '<div style="display:flex;align-items:center;justify-content:space-between">'+
    '<span style="font-size:15.5px;font-weight:600">'+r.type+'</span>'+
    '<span class="chip teal">已审批</span></div>'+
    '<div class="hr" style="margin:10px 0"></div>'+
    '<div class="kv"><span class="k">学生</span><span class="v">'+name+' · '+d.cls+'</span></div>'+
    '<div class="kv"><span class="k">开始时间</span><span class="v">'+r.start+'</span></div>'+
    '<div class="kv"><span class="k">结束时间</span><span class="v">'+r.end+'</span></div>'+
    '<div class="kv"><span class="k">事由</span><span class="v">'+r.reason+'</span></div>'+
    '</div>';
  h+='<div class="card" style="margin-top:12px">'+
    '<div style="font-size:15.5px;font-weight:600;margin-bottom:12px">流转记录</div>'+
    '<div style="display:flex;gap:12px;padding-bottom:14px">'+
    '<div style="width:8px;height:8px;border-radius:50%;background:var(--teal);margin-top:5px;flex-shrink:0"></div>'+
    '<div style="flex:1"><div style="font-size:14px;font-weight:600">提交</div>'+
    '<div class="muted" style="font-size:12.5px;margin-top:3px">'+r.submitT+' · '+d.parent+'</div></div></div>'+
    '<div style="display:flex;gap:12px;position:relative;padding-top:14px;border-top:1px solid var(--line)">'+
    '<div style="width:8px;height:8px;border-radius:50%;background:var(--teal);margin-top:5px;flex-shrink:0"></div>'+
    '<div style="flex:1"><div style="font-size:14px;font-weight:600">已审批</div>'+
    '<div class="muted" style="font-size:12.5px;margin-top:3px">'+r.approveT+' · '+r.teacher+'</div></div></div>'+
    '</div>';
  document.getElementById('sld-content').innerHTML=h;
  go('sc-stuleavedt');
}
/* -------- 代学生请假页（从考勤明细跳转） -------- */
var alClsName='三年级(2)班';
var alCurG='三年级';
var alSelected={};
var alType_='sick';
var alSymptoms=['发热','感冒','咳嗽','咽喉痛','头疼','腹痛','呕吐','腹泻','皮疹','腮腺炎','手足口病','其他'];
var alSymSel={};
var alFiles=[];
/* 班级选择sheet（复用考勤明细的regGrades） */
function alClsSheet(){
  sheet('<h3>选择班级</h3>'+
   '<div style="display:flex;border:1px solid var(--line);border-radius:12px;overflow:hidden;height:300px;flex-shrink:0">'+
     '<div id="al-grades" style="width:88px;background:#EFF3F9;overflow-y:auto;flex-shrink:0"></div>'+
     '<div style="flex:1;padding:10px 10px 6px;overflow-y:auto"><div class="fchips" id="al-cls-list" style="gap:7px"></div></div>'+
   '</div>');
  alClsRender();
}
function alClsRender(){
  var gEl=document.getElementById('al-grades');
  if(!gEl)return;
  gEl.innerHTML=Object.keys(regGrades).map(function(g){
    return '<button onclick="alCurG=\''+g+'\';alClsRender()" style="display:block;width:100%;text-align:left;padding:11px 12px;font-size:12.5px;'+(g===alCurG?'background:#fff;color:var(--navy);font-weight:600;border-left:3px solid var(--navy);':'color:var(--ink-2);border-left:3px solid transparent;')+'">'+g+'</button>';
  }).join('');
  var n=regGrades[alCurG],h='';
  for(var i=1;i<=n;i++){
    var k=alCurG+'('+i+')班';
    var isCur=alClsName===k;
    h+='<button class="fchip'+(isCur?' on':'')+'" onclick="alClsPick(\''+k+'\')">'+k+(isCur?' ✓':'')+'</button>';
  }
  document.getElementById('al-cls-list').innerHTML=h;
}
function alClsPick(k){
  alClsName=k;
  closeSheet();
  alSelected={};
  alInitStudents();
  alRender();
}
/* 生成学生列表 */
var alStudents=[];
function alEnter(){
  go('sc-attleave');
  /* 确保学生列表初始化（双重保障，兼容各浏览器） */
  try{
    if(!alStudents.length||alStudents._cls!==alClsName){alInitStudents()}
    alRender();
    alRenderSymptoms();
  }catch(e){
    /* 如果初始化失败，延迟重试 */
    setTimeout(function(){
      try{alInitStudents();alRender();alRenderSymptoms()}catch(e2){}
    },100);
  }
}
function alInitStudents(){
  alStudents=attcGenStudents(alClsName);
  alStudents._cls=alClsName;
}
/* 渲染学生列表 */
function alRender(){
  var txt=document.getElementById('al-search').value.trim();
  var txtEl=document.getElementById('al-cls-txt');
  if(txtEl)txtEl.textContent=alClsName;
  /* 筛选学生 */
  var list=alStudents.filter(function(s){
    if(!txt)return true;
    return s.n.indexOf(txt)>-1;
  });
  var h='';
  list.forEach(function(s){
    var checked=alSelected[s.n]?'checked':'';
    h+='<label style="display:flex;align-items:center;gap:10px;padding:9px 14px;border-bottom:1px solid #F0F2F6;cursor:pointer">'+
      '<input type="checkbox" data-name="'+s.n+'" style="width:17px;height:17px;accent-color:var(--navy)" '+checked+' onchange="alToggle(\''+s.n+'\')">'+
      '<div class="avatar'+(s.gen?' '+s.gen:'')+'" style="width:32px;height:32px;font-size:13px">'+s.av+'</div>'+
      '<span style="font-size:14px">'+s.n+'</span></label>';
  });
  document.getElementById('al-stu-list').innerHTML=h;
  alUpdateCnt();
}
function alToggle(name){
  if(alSelected[name])delete alSelected[name];
  else alSelected[name]=true;
  alUpdateCnt();
}
function alToggleAll(el){
  var txt=document.getElementById('al-search').value.trim();
  var list=alStudents.filter(function(s){
    if(!txt)return true;
    return s.n.indexOf(txt)>-1;
  });
  if(el.checked){
    list.forEach(function(s){alSelected[s.n]=true});
  }else{
    list.forEach(function(s){delete alSelected[s.n]});
  }
  alRender();
}
function alUpdateCnt(){
  var cnt=Object.keys(alSelected).length;
  var total=alStudents.length;
  var cntEl=document.getElementById('al-cnt');
  if(cntEl){
    if(cnt>0){
      cntEl.textContent='已选 '+cnt+' 人';
      cntEl.style.color='var(--navy)';
    }else{
      cntEl.textContent='未签到 '+total+' 人';
      cntEl.style.color='var(--ink-3)';
    }
  }
  /* 同步全选框 */
  var allEl=document.getElementById('al-all');
  if(allEl){
    var txt=document.getElementById('al-search').value.trim();
    var list=alStudents.filter(function(s){
      if(!txt)return true;
      return s.n.indexOf(txt)>-1;
    });
    allEl.checked=list.length>0&&list.every(function(s){return alSelected[s.n]});
  }
}
/* 请假类型切换 */
function alType(t){
  alType_=t;
  document.querySelectorAll('.al-type').forEach(function(b){
    if(b.dataset.type===t){
      b.classList.add('on');
      b.style.cssText='flex:1;padding:8px 0;border-radius:8px;font-size:13px;font-weight:600;border:2px solid var(--navy);background:#E3EEFD;color:var(--navy)';
    }else{
      b.classList.remove('on');
      b.style.cssText='flex:1;padding:8px 0;border-radius:8px;font-size:13px;font-weight:600;border:1px solid var(--line);background:#fff;color:var(--ink-2)';
    }
  });
  document.getElementById('al-sick-form').style.display=t==='sick'?'':'none';
}
/* 病状chips */
function alRenderSymptoms(){
  var h=alSymptoms.map(function(s){
    var on=alSymSel[s]?' on':'';
    return '<button class="fchip'+on+'" onclick="alToggleSym(\''+s+'\')">'+s+'</button>';
  }).join('');
  document.getElementById('al-symptoms').innerHTML=h;
}
function alToggleSym(s){
  if(alSymSel[s])delete alSymSel[s];
  else alSymSel[s]=true;
  alRenderSymptoms();
}
/* 日期选择sheet */
function alDateSheet(type){
  sheet('<h3>选择时间</h3>'+
    '<div style="padding:4px 0 14px">'+
    '<div style="margin-bottom:10px"><div style="font-size:12px;color:var(--ink-2);margin-bottom:5px">日期</div>'+
    '<input type="date" id="al-ds-date" value="2026-07-06" style="width:100%;border:1px solid var(--line);border-radius:8px;padding:8px 10px;font-size:13px"></div>'+
    '<div style="margin-bottom:10px"><div style="font-size:12px;color:var(--ink-2);margin-bottom:5px">时间</div>'+
    '<select id="al-ds-time" style="width:100%;border:1px solid var(--line);border-radius:8px;padding:8px 10px;font-size:13px">'+
    ['08:00','08:30','09:00','09:30','10:00','10:30','11:00','11:30','12:00','12:30','13:00','13:30','14:00','14:30','15:00','15:30','16:00','16:30','17:00','17:30','18:00','全天'].map(function(t){return '<option value="'+t+'">'+t+'</option>'}).join('')+
    '</select></div></div>'+
    '<button class="btn pri blk" onclick="alDatePick(\''+type+'\')">确认</button>'+
    '<button class="btn ghost blk" style="margin-top:9px" onclick="closeSheet()">取消</button>');
}
function alDatePick(type){
  var d=document.getElementById('al-ds-date').value;
  var t=document.getElementById('al-ds-time').value;
  var val=d.replace(/-/g,'月')+'日'+(t==='全天'?'全天':' '+t);
  /* 简化显示 */
  var m=parseInt(d.split('-')[1]),day=parseInt(d.split('-')[2]);
  val=m+'月'+day+'日 '+(t==='全天'?'全天':t);
  document.getElementById('al-'+type).value=val;
  closeSheet();
}
/* 附件 */
function alAddFile(){
  if(alFiles.length>=5){toast('最多上传5个文件');return}
  alFiles.push({name:'附件'+(alFiles.length+1)+'.jpg'});
  var h=alFiles.map(function(f,i){
    return '<div style="position:relative;width:56px;height:56px;border-radius:8px;background:#F0F2F6;display:flex;align-items:center;justify-content:center;font-size:10px;color:var(--ink-2);overflow:hidden">'+f.name.substring(0,6)+'..'+
      '<button onclick="alDelFile('+i+')" style="position:absolute;top:-4px;right:-4px;width:16px;height:16px;border-radius:50%;background:var(--cinnabar);color:#fff;border:none;font-size:10px;line-height:1">×</button></div>';
  }).join('');
  document.getElementById('al-files').innerHTML=h;
}
function alDelFile(i){
  alFiles.splice(i,1);
  alAddFile();
  if(alFiles.length===0)document.getElementById('al-files').innerHTML='';
}
/* 提交 */
function alSubmit(){
  var cnt=Object.keys(alSelected).length;
  if(!cnt){toast('请先选择请假学生');return}
  if(!document.getElementById('al-start').value){toast('请选择开始时间');return}
  if(!document.getElementById('al-end').value){toast('请选择结束时间');return}
  if(!document.getElementById('al-reason').value.trim()){toast('请填写请假事由');return}
  if(alType_==='sick'){
    var cont=document.querySelector('input[name="al-contagious"]:checked');
    if(!cont){toast('请选择是否传染病');return}
  }
  toast('已为 '+cnt+' 名学生提交'+(alType_==='sick'?'病假':'事假')+'申请，审批通过后考勤自动更新');
  go('sc-attclass');
}
/* -------- 学生签到详情：签到 / 统计双 Tab、抓拍大图预览、明细列表行点击进入（演示以林晓乐为例） -------- */
function stuTab(k){
  document.querySelectorAll('#stu-tabs button').forEach(x=>x.classList.toggle('on',x.dataset.st===k));
  document.getElementById('stu-sign').style.display=k==='sign'?'':'none';
  document.getElementById('stu-stat').style.display=k==='stat'?'':'none';
}
function attShot(cap,src){
  if(curScreen!=='sc-attstu')go('sc-attstu');
  document.getElementById('shot-cap').textContent=cap||'林晓乐 · 7月6日 07:42 到校 · 东门通道 2 抓拍';
  document.querySelector('#shot-view img').src=src||'assets/gate-snap1.jpg';
  document.getElementById('shot-view').classList.add('show');
}
/* 入校区块抓拍收起/展开：区块内抓拍超过一组时才在到校标题旁输出「收起」按钮，仅一组不输出（如昨天视图） */
function inShotsTog(el){
  const open=el.textContent.indexOf('收起')>-1;
  el.closest('.stl').querySelectorAll('.shots.in-sh').forEach(s=>s.style.display=open?'none':'flex');
  el.textContent=open?'展开 ∨':'收起 ∧';
}
/* 签到 Tab 日期切换：今天实时 / 上一上学日（7月3日 周五）定格 */
function stuDate(d){
  document.querySelectorAll('#stu-dates .fchip[data-sd]').forEach(x=>x.classList.toggle('on',x.dataset.sd===d));
  document.getElementById('stu-day-today').style.display=d==='today'?'':'none';
  document.getElementById('stu-day-yest').style.display=d==='yest'?'':'none';
}
/* 统计 Tab 月份切换：7月（本月至今）/ 6月（定格），更早 toast */
const stuM={i:0};
function stuMonth(dir){
  if(dir<0){if(stuM.i===0)stuM.i=1;else{toast('演示：仅提供 7月 与 6月 的统计数据');return}}
  else{if(stuM.i===1)stuM.i=0;else{toast('已是本月');return}}
  document.getElementById('stu-m-label').textContent=stuM.i?'2026年6月':'2026年7月';
  document.getElementById('stu-m-jul').style.display=stuM.i?'none':'';
  document.getElementById('stu-m-jun').style.display=stuM.i?'':'none';
}
/* -------- 请假审批：待审批 / 已办结切换 -------- */
/* -------- 请假审批列表页 -------- */
var lvCurTab='pend';
/* 请假数据：按年级-班级组织 */
var lvData={
  pend:[
    {grade:'三年级',cls:'三年级(2)班',name:'林晓乐',av:'乐',gen:'',type:'病假',start:'07-07 08:00',end:'07-07 12:00',parent:'母亲(乐乐妈妈)',submitT:'07-04 21:18',reason:'发热38.2℃，需复诊观察'},
    {grade:'三年级',cls:'三年级(2)班',name:'林晓乐',av:'乐',gen:'',type:'事假',start:'07-14 08:00',end:'07-14 12:00',parent:'母亲(乐乐妈妈)',submitT:'07-06 16:32',reason:'上午随家人办事，午后返校'},
    {grade:'一年级',cls:'一年级(1)班',name:'吴一诺',av:'诺',gen:'girl',type:'事假',start:'07-08 08:00',end:'07-08 16:00',parent:'父亲(吴一诺爸爸)',submitT:'07-05 08:20',reason:'家中有事需请假一天'}
  ],
  rejected:[
    {grade:'三年级',cls:'三年级(2)班',name:'王梓豪',av:'豪',gen:'',type:'事假',start:'06-30 08:00',end:'06-30 12:00',parent:'母亲(王梓豪妈妈)',submitT:'06-28 10:00',reason:'家中有事'}
  ],
  approved:[
    {grade:'三年级',cls:'三年级(2)班',name:'郑皓宸',av:'宸',gen:'',type:'病假',start:'07-06 08:00',end:'07-06 16:00',parent:'母亲(郑皓宸妈妈)',submitT:'07-03 10:15',reason:'肠胃不适，需就医'},
    {grade:'三年级',cls:'三年级(2)班',name:'周雨桐',av:'桐',gen:'girl',type:'事假',start:'07-03 08:00',end:'07-03 16:00',parent:'父亲(周雨桐爸爸)',submitT:'07-02 18:00',reason:'家中有事'},
    {grade:'三年级',cls:'三年级(2)班',name:'林晓乐',av:'乐',gen:'',type:'病假',start:'06-26 12:00',end:'06-26 16:00',parent:'母亲(乐乐妈妈)',submitT:'06-25 14:00',reason:'感冒发烧，下午需休息'}
  ],
  revoked:[
    {grade:'一年级',cls:'一年级(1)班',name:'陈艺涵',av:'涵',gen:'girl',type:'事假',start:'07-10 08:00',end:'07-10 16:00',parent:'母亲(陈艺涵妈妈)',submitT:'07-08 09:00',reason:'临时变更，取消请假'}
  ]
};
var lvStatusMap={pend:'待审批',rejected:'已拒绝',approved:'已同意',revoked:'已撤销'};
var lvChipMap={pend:'amber',rejected:'red',approved:'teal',revoked:'gray'};
function lvTab(el,k){
  document.querySelectorAll('#lv-tabs .fchip').forEach(function(x){x.classList.remove('on')});
  el.classList.add('on');
  lvCurTab=k;
  lvRender();
}
function lvRender(){
  var keyword=document.getElementById('lv-search').value.trim();
  var list=lvData[lvCurTab]||[];
  /* 按年级分组 */
  var gradeMap={};
  list.forEach(function(r){
    if(keyword&&r.name.indexOf(keyword)<0&&r.cls.indexOf(keyword)<0)return;
    if(!gradeMap[r.grade])gradeMap[r.grade]={};
    if(!gradeMap[r.grade][r.cls])gradeMap[r.grade][r.cls]=[];
    gradeMap[r.grade][r.cls].push(r);
  });
  var h='';
  Object.keys(gradeMap).forEach(function(g){
    h+='<div class="sm-grade"><div class="sm-grade-hd" onclick="smToggleGrade(this)"><span style="font-size:14px;font-weight:700">'+g+'</span>';
    var gCnt=0,gCls=0;
    Object.keys(gradeMap[g]).forEach(function(c){gCls++;gCnt+=gradeMap[g][c].length});
    h+='<span class="cnt">'+gCls+' 个班 · '+gCnt+' 条</span><span class="arr">▼</span></div><div class="sm-grade-bd">';
    Object.keys(gradeMap[g]).forEach(function(c){
      var items=gradeMap[g][c];
      h+='<div class="sm-cls"><div class="sm-cls-hd" onclick="smToggleCls(this)"><span style="font-size:13px;font-weight:600">'+c+'</span><span class="cnt">'+items.length+' 条</span><span class="arr">▼</span></div><div class="sm-cls-bd">';
      items.forEach(function(r,idx){
        var statusLab=lvStatusMap[lvCurTab];
        var chipCls=lvChipMap[lvCurTab];
        var clickAction=lvCurTab==='pend'?'onclick="lvPendDetail(\''+r.name+'\',\''+r.start+'\')"':'onclick="toast(\'演示：'+statusLab+'请假详情\'')"';
        h+='<div class="stu clickable" '+clickAction+'><div class="avatar'+(r.gen?' '+r.gen:'')+'">'+r.av+'</div>'+
          '<div><div class="nm">'+r.name+' · '+r.type+'</div>'+
          '<div class="sub" style="line-height:1.5"><div>开始 '+r.start+'</div><div>结束 '+r.end+'</div>'+
          '<div class="muted" style="margin-top:2px">'+r.parent+' · '+r.submitT+'</div></div></div>'+
          '<div class="st"><span class="chip '+chipCls+'">'+statusLab+'</span></div></div>';
      });
      h+='</div></div>';
    });
    h+='</div></div>';
  });
  if(!h)h='<div class="sm-empty" style="padding:40px 0;text-align:center"><div class="muted">暂无'+lvStatusMap[lvCurTab]+'的请假记录</div></div>';
  document.getElementById('lv-list').innerHTML=h;
}
/* -------- 待审批请假详情页 -------- */
var lvPendData=null;
function lvPendDetail(name,start){
  /* 从pend数据中查找匹配项 */
  var found=lvData.pend.find(function(r){return r.name===name&&r.start===start});
  if(!found)found=lvData.pend[0];
  lvPendData=found;
  var h='<div class="card">'+
    '<div style="display:flex;align-items:center;justify-content:space-between">'+
    '<span style="font-size:15.5px;font-weight:600">'+found.type+'</span>'+
    '<span class="chip amber">待审批</span></div>'+
    '<div class="hr" style="margin:10px 0"></div>'+
    '<div class="kv"><span class="k">学生</span><span class="v">'+found.name+' · '+found.cls+'</span></div>'+
    '<div class="kv"><span class="k">开始时间</span><span class="v">'+found.start+'</span></div>'+
    '<div class="kv"><span class="k">结束时间</span><span class="v">'+found.end+'</span></div>'+
    '<div class="kv"><span class="k">事由</span><span class="v">'+found.reason+'</span></div>'+
    '</div>';
  /* 流转记录：只有提交节点，无已审批节点 */
  h+='<div class="card" style="margin-top:12px">'+
    '<div style="font-size:15.5px;font-weight:600;margin-bottom:12px">流转记录</div>'+
    '<div style="display:flex;gap:12px;padding-bottom:14px">'+
    '<div style="width:8px;height:8px;border-radius:50%;background:var(--amber);margin-top:5px;flex-shrink:0"></div>'+
    '<div style="flex:1"><div style="font-size:14px;font-weight:600">提交</div>'+
    '<div class="muted" style="font-size:12.5px;margin-top:3px">'+found.submitT+' · '+found.parent+'</div></div></div>'+
    '</div>';
  document.getElementById('lvp-content').innerHTML=h;
  go('sc-lvpend');
}
/* 拒绝理由弹框 */
function lvRejectSheet(){
  sheet('<h3>拒绝理由</h3>'+
    '<div style="padding:4px 0 14px">'+
    '<textarea id="lv-reason" rows="3" placeholder="请输入拒绝理由（非必填）" style="width:100%;border:1px solid var(--line);border-radius:8px;padding:8px 10px;font-size:13px;resize:none"></textarea>'+
    '<div class="muted" style="font-size:11px;margin-top:6px">拒绝理由非必填，可直接提交</div></div>'+
    '<button class="btn red blk" onclick="lvRejectConfirm()">确定</button>'+
    '<button class="btn ghost blk" style="margin-top:9px" onclick="closeSheet()">取消</button>');
}
function lvRejectConfirm(){
  closeSheet();
  toast('已拒绝该请假申请，结果已通知家长');
  go('sc-leave');
}
function lvApproveConfirm(){
  toast('已同意该请假申请，考勤已同步更新');
  go('sc-leave');
}
/* -------- 代录请假（免审即时生效 · 提交后落点在已办结页签） -------- */
function plSeg(el){[...el.parentNode.children].forEach(x=>x.classList.remove('on'));el.classList.add('on')}
/* 任教班级演示名册：班级 / 任教身份 / 学生（姓名 · 是否女生 · 今日考勤状态 · 状态chip色） */
const plClasses=[
 {c:'三年级(2)班',r:'班主任',s:[
  ['李沐宸',0,'无签无脸 · 疑似缺勤','red'],
  ['王一彤',1,'到校 · 未见脸','amber'],
  ['杨梓冉',1,'到校 · 未见脸','amber'],
  ['周雨桐',1,'请假到期未返校','red'],
  ['林晓乐',0,'已到校','teal'],
  ['王梓豪',0,'已到校','teal'],
  ['吴一诺',1,'已到校','teal'],
  ['高子墨',0,'已到校','teal']]},
 {c:'三年级(1)班',r:'科任（数学）',s:[
  ['陈奕辰',0,'已到校','teal'],
  ['赵一涵',1,'到校 · 未见脸','amber'],
  ['孙浩宇',0,'已到校','teal'],
  ['何雨泽',0,'请假中','navy'],
  ['许晴川',1,'已到校','teal'],
  ['宋知远',0,'已到校','teal']]}];
let plClsIdx=0;
function plStuRows(){return plClasses[plClsIdx].s.map(s=>'<div class="stu" data-n="'+s[0]+'" onclick="plPickStu(\''+s[0]+'\')"><div class="avatar'+(s[1]?' girl':'')+'">'+s[0].slice(-1)+'</div><div><div class="nm">'+s[0]+'</div></div><div class="st"><span class="chip '+s[3]+'">'+s[2]+'</span></div></div>').join('')}
function plStuSheet(){
  sheet('<h3>选择学生</h3>'+
   '<div class="desc">仅限任教班级在册学生（演示每班展示部分学生），姓名/班级从学籍名册带出，不可手填</div>'+
   '<div class="fchips" style="gap:7px;margin-bottom:8px">'+plClasses.map((c,i)=>'<button class="fchip'+(i===plClsIdx?' on':'')+'" onclick="plStuCls(this,'+i+')">'+c.c+' · '+c.r+'</button>').join('')+'</div>'+
   '<input type="text" id="pl-stu-q" placeholder="搜索姓名" oninput="plStuFilter(this.value)">'+
   '<div id="pl-stu-list" style="max-height:320px;overflow-y:auto;margin-top:8px">'+plStuRows()+'</div>');
}
function plStuCls(el,i){plClsIdx=i;plSeg(el);document.getElementById('pl-stu-q').value='';document.getElementById('pl-stu-list').innerHTML=plStuRows()}
function plStuFilter(v){document.querySelectorAll('#pl-stu-list .stu').forEach(s=>s.style.display=s.dataset.n.includes(v.trim())?'':'none')}
function plPickStu(n){document.getElementById('pl-stu-txt').textContent=n+' · '+plClasses[plClsIdx].c;closeSheet()}
let plDateTarget='start';
/* 演示日期锚点：今天=2026年7月6日（周一），星期一律按真实历法（Date.getDay）推算。
   开始时间轴 = 当天 ±30 天（补请假回溯上限）；结束时间轴 = 开始日期起 90 天（更长缺勤走休学/病休备案），边界均为校级配置 */
const PL_ANCHOR=new Date(2026,6,6);
const PL_WK=['周日','周一','周二','周三','周四','周五','周六'];
const plFmt=o=>{const d=new Date(2026,6,6+o);return (d.getMonth()+1)+'月'+d.getDate()+'日'};
let plWheelDays=[],plWheelDates=[];
/* 日期列（真实星期，今天显示「当天」）；plWheelDates 存纯日期用于回填与解析 */
function plMkDays(f,t){
  plWheelDays=[];plWheelDates=[];
  for(let o=f;o<=t;o++){
    const ds=plFmt(o);
    plWheelDates.push(ds);
    plWheelDays.push((o===0?'当天':ds)+' '+PL_WK[new Date(2026,6,6+o).getDay()]);
  }
}
function plOff(v){const m=v.match(/(\d+)月(\d+)日/);return Math.round((new Date(2026,m[1]-1,+m[2])-PL_ANCHOR)/864e5)}
/* 时/分双列：分钟 30 分钟步进（最少可请 0.5 小时，粒度为校级配置）；时长仅计入与在校时段重叠部分 */
const plHours=[],plMins=['00','30'];for(let h=0;h<24;h++)plHours.push((''+h).padStart(2,'0'));
function plDateSheet(w){
  plDateTarget=w;
  const cur=(document.getElementById('pl-'+w).value||plFmt(0)+' 08:00').split(' ');
  if(w==='start'){plMkDays(-30,30)}
  else{const sv=document.getElementById('pl-start').value;const os=sv?plOff(sv):0;plMkDays(os,os+90)}
  let di=plWheelDates.indexOf(cur[0]);if(di<0)di=0;
  const t=cur[1].split(':'),hi=Math.max(plHours.indexOf(t[0]),0),mi=t[1]==='30'?1:0;
  sheet('<div class="row" style="justify-content:space-between;align-items:center;margin-bottom:6px">'+
    '<span style="color:var(--ink-2);cursor:pointer;font-size:13.5px;padding:4px 2px" onclick="plClear()">清除</span>'+
    '<b id="pl-w-cur" style="font-size:15px"></b>'+
    '<span style="color:var(--ink-3);cursor:pointer;font-size:16px;padding:2px 6px" onclick="closeSheet()">✕</span>'+
   '</div>'+
   '<div class="wheelbox">'+
    '<div class="wheel" id="pl-w-day" style="flex:1.9">'+wheelItems(plWheelDays)+'</div>'+
    '<div class="wheel" id="pl-w-hour">'+wheelItems(plHours)+'</div>'+
    '<div class="wheel" id="pl-w-min">'+wheelItems(plMins)+'</div>'+
   '</div>'+
   '<div class="row" style="gap:10px;margin-top:12px"><button class="btn ghost" style="flex:1" onclick="closeSheet()">取消</button><button class="btn pri" style="flex:1" onclick="plDateOk()">确定</button></div>');
  wheelInit('pl-w-day',di);wheelInit('pl-w-hour',hi);wheelInit('pl-w-min',mi);
}
function wheelItems(a){return '<div class="wi pad"></div><div class="wi pad"></div>'+a.map((x,i)=>'<div class="wi" data-i="'+i+'" onclick="wheelTo(this)">'+x+'</div>').join('')+'<div class="wi pad"></div><div class="wi pad"></div>'}
function wheelInit(id,idx){
  const w=document.getElementById(id);
  w.addEventListener('scroll',()=>{wheelPaint(w);plWheelCur()});
  w.scrollTop=idx*36;wheelPaint(w);plWheelCur();
}
function wheelArr(id){return id==='pl-w-day'?plWheelDays:id==='pl-w-hour'?plHours:plMins}
function wheelSel(id){return Math.min(Math.max(Math.round(document.getElementById(id).scrollTop/36),0),wheelArr(id).length-1)}
function wheelPaint(w){const i=Math.round(w.scrollTop/36);w.querySelectorAll('.wi[data-i]').forEach(x=>x.classList.toggle('on',+x.dataset.i===i))}
/* 顶部回显始终带全年份消除跨年歧义；演示日期轴（最远至 2026年11月）不跨年，年份固定 */
function plWheelCur(){document.getElementById('pl-w-cur').textContent='2026年'+plWheelDates[wheelSel('pl-w-day')]+' '+plHours[wheelSel('pl-w-hour')]+':'+plMins[wheelSel('pl-w-min')]}
function wheelTo(el){el.parentNode.scrollTo({top:(+el.dataset.i)*36,behavior:'smooth'})}
function plDateOk(){
  document.getElementById('pl-'+plDateTarget).value=plWheelDates[wheelSel('pl-w-day')]+' '+plHours[wheelSel('pl-w-hour')]+':'+plMins[wheelSel('pl-w-min')];
  closeSheet();plCalcDur();
}
function plClear(){document.getElementById('pl-'+plDateTarget).value='';closeSheet();plCalcDur()}
/* 时长按上学日计算：每上学日按在校时段 08:00–16:00 计 8 小时，逐日累加起止区间与在校时段的重叠时长，周末（真实历法）跳过（演示未含法定节假日与寒暑假）；满 8 小时折算为天 */
function plCalcDur(){
  const sv=document.getElementById('pl-start').value,ev=document.getElementById('pl-end').value,el=document.getElementById('pl-dur');
  if(!sv||!ev){el.textContent='—';return}
  const p=v=>{const s=v.split(' '),t=s[1].split(':');return{d:plOff(s[0]),m:+t[0]*60+ +t[1]}};
  const a=p(sv),b=p(ev);
  if(b.d<a.d||(b.d===a.d&&b.m<=a.m)){el.textContent='—';return}
  let mins=0;
  for(let d=a.d;d<=b.d;d++){
    const wd=new Date(2026,6,6+d).getDay();if(wd===0||wd===6)continue;
    const f=Math.max(d===a.d?a.m:480,480),t=Math.min(d===b.d?b.m:960,960);
    if(t>f)mins+=t-f;
  }
  const h=mins/60,dd=Math.floor(h/8),hh=+(h-dd*8).toFixed(1);
  el.textContent=h===0?'0 小时':(dd?dd+' 天':'')+(hh?(dd?' ':'')+hh+' 小时':'');
}
plCalcDur();
/* 证明材料：图片网格上传（演示模拟，与家长端同构）——点「＋」添加演示图片，满 5 个隐藏添加块，✕ 删除后恢复 */
const PL_UP_MAX=5,PL_UP_IMGS=['assets/photo-sample.jpg','assets/photo-cap.jpg','assets/photo-glasses.jpg','assets/photo-side.jpg','assets/photo-duo.jpg'];
let plUpN=0;
function plUpload(){
  const g=document.getElementById('pl-upload');
  if(g.querySelectorAll('.ph').length>=PL_UP_MAX)return;
  const d=document.createElement('div');d.className='ph';
  d.innerHTML='<img src="'+PL_UP_IMGS[plUpN++%PL_UP_IMGS.length]+'" alt="证明材料照片"><span class="rm" onclick="this.parentNode.remove();plUpFit()">✕</span>';
  g.insertBefore(d,g.querySelector('.add'));
  plUpFit();
}
function plUpFit(){
  const g=document.getElementById('pl-upload');
  g.querySelector('.add').style.display=g.querySelectorAll('.ph').length>=PL_UP_MAX?'none':'';
}
function submitProxyLeave(){
  if(!document.getElementById('pl-ck').classList.contains('on')){toast('代录前请先获得并勾选家长口头确认');return}
  const n=document.getElementById('pl-stu-txt').textContent.split(' · ')[0];
  const t=document.querySelector('#pl-type .fchip.on').textContent;
  const s=document.getElementById('pl-start').value,e=document.getElementById('pl-end').value;
  if(!s||!e){toast('请选择开始与结束时间');return}
  const pm=v=>{const x=v.split(' '),t=x[1].split(':');return plOff(x[0])*1440+ +t[0]*60+ +t[1]};
  if(pm(e)<=pm(s)){toast('结束时间需晚于开始时间（最少请 0.5 小时）');return}
  const [sd,st]=s.split(' '),[ed,et]=e.split(' ');
  const span=sd===ed?(st==='08:00'&&et==='16:00'?sd+' 全天':sd+' '+st+'–'+et):s+' ~ '+e;
  const girl=(plClasses.flatMap(c=>c.s).find(x=>x[0]===n)||[])[1];
  let d=document.getElementById('pl-done-item');
  if(!d){d=document.createElement('div');d.className='stu';d.id='pl-done-item';document.querySelector('#lv-done .card').prepend(d)}
  d.innerHTML='<div class="avatar'+(girl?' girl':'')+'">'+n.slice(-1)+'</div><div><div class="nm">'+n+' · '+t+'</div><div class="sub">'+span+' · 王老师代录 · 教师代录·家长口头确认（永久标记）</div></div><div class="st"><span class="chip teal">已通过</span><div class="muted" style="text-align:right">免审即时生效</div></div>';
  go('sc-leave');
  lvTab(document.querySelector('#lv-tabs .fchip:nth-child(2)'),'done');
  toast('代录单免审即时生效并同步双家长；请假时段内不产生缺勤告警，已产生的待核项自动核销、考勤流水回溯改判');
}
/* -------- 批量勾选 -------- */
document.querySelectorAll('#batch-list .ck').forEach(c=>c.addEventListener('click',()=>{
  c.classList.toggle('on');upCk();
}));
function upCk(){
  const n=document.querySelectorAll('#batch-list .ck.on').length;
  document.getElementById('ck-count').textContent='已选 '+n+' 人';
}
function ckAll(){
  document.querySelectorAll('#batch-list .ck').forEach(c=>c.classList.add('on'));upCk();
}
document.querySelectorAll('#batch-list .ck').forEach(c=>{c.innerHTML='✓'});
/* -------- 班级注册码批量审核（冷启动）：命中项默认勾选，标红项需逐条决策 -------- */
document.querySelectorAll('#bind-list .ck').forEach(c=>{
  c.innerHTML='✓';
  c.addEventListener('click',()=>{c.classList.toggle('on');upBindCk()});
});
function upBindCk(){
  document.getElementById('bind-ck-count').textContent='已选 '+document.querySelectorAll('#bind-list .ck.on').length+' 条';
}
function bindCkAll(){
  document.querySelectorAll('#bind-list .ck:not(.flagck)').forEach(c=>c.classList.add('on'));upBindCk();
}
function bindApprove(){
  const n=document.querySelectorAll('#bind-list .ck.on').length;
  if(!n){toast('请先勾选要通过的申请');return}
  toast('已通过 '+n+' 条：绑定即时生效、可见性开通，结果以消息通知家长；标红申请请逐条处理');
}
document.getElementById('mask').addEventListener('click',e=>{if(e.target.id==='mask')e.target.classList.remove('show')});
/* -------- 家长绑定与师长双身份 -------- */
function sheet(h){document.getElementById('sheet').innerHTML=h;document.getElementById('mask').classList.add('show')}
function closeSheet(){document.getElementById('mask').classList.remove('show')}
/* -------- 退出登录二次确认（noauth=true 为「未匹配教师身份」页的未绑定账号场景） -------- */
function logoutSheet(noauth){sheet(`<h3>退出登录</h3>
 <div class="desc">${noauth?'当前账号（135****6677）尚未匹配教师身份，退出不影响任何数据。退出后可使用其他手机号重新登录。确定退出吗？':'退出后将不再接收待处理提醒与安全告警推送，重新登录后恢复。确定退出当前账号（王老师 · 138****2233）吗？'}</div>
 <button class="btn red blk" onclick="closeSheet();go('sc-login');toast('已退出登录（演示）')">确认退出</button>
 <button class="btn ghost blk" style="margin-top:9px" onclick="closeSheet()">取消</button>`)}
function inviteSheet(){sheet(`<h3>生成绑定邀请</h3>
 <div class="desc">面向本班未绑定家长的学生：生成一次性邀请（微信卡片/小程序码，24–72 小时有效、绑定即失效），转发到与家长的微信会话，家长点开直达该生绑定确认——自带教师背书无需再审，家长侧无输码操作。</div>
 <div class="row" style="gap:8px;margin-bottom:12px"><span class="chip navy plain">李沐宸 ✓</span><span class="chip gray plain" onclick="toast('已切换为徐若曦')">徐若曦</span></div>
 <div style="height:118px;border:1.5px dashed #C6CCD6;border-radius:12px;display:flex;flex-direction:column;align-items:center;justify-content:center;color:var(--ink-3);font-size:12px;gap:4px;margin-bottom:12px"><span style="font-size:26px">▦</span>一次性邀请卡片/小程序码（演示）<br>李沐宸 · 有效期 48 小时 · 绑定即失效</div>
 <button class="btn pri blk" onclick="closeSheet();toast('邀请已生成：请转发给李沐宸家长，点开直达绑定确认，失效前仅可绑定一次')">分享给家长</button>`)}
function reviewSheet(){sheet(`<h3>绑定申请人工审核</h3>
 <div class="desc">申请人 139****2211 申请绑定 <b>李沐宸</b>（关系：母亲）· 留言："我是孩子妈妈，换了新手机号。"</div>
 <div class="note warn">仅在确认认识该家庭时通过：通过即授予该账号李沐宸的考勤、请假等全部家长可见性。拿不准请改用定向邀请或电话核实。</div>
 <div class="row" style="gap:10px;margin-top:12px">
  <button class="btn ghost" style="flex:1" onclick="closeSheet();toast('已拒绝：对申请方仅返回统一模糊提示（防枚举探测）')">拒绝</button>
  <button class="btn teal" style="flex:1" onclick="closeSheet();toast('已通过：绑定生效，可见性即时开通，操作已留痕')">通过</button>
 </div>`)}
/* -------- 名册核正：家长反馈「不是我的孩子」→ 对应班主任待办，管理端名册同步标记 -------- */
function rosterFixSheet(){sheet(`<h3>名册核正 · 王一明</h3>
 <div class="desc">一年级(3)班 · 名册预留监护人号码 <b>139****0077</b> 被家长反馈「不是我的孩子」（录错号 / 二次放号可能）。反馈者账号信息不下发，请与王一明家庭核实正确号码。</div>
 <div class="note warn">名册由学校管理端维护：核实后提交更正（新号码生效后向其下发认领通知）；判定误报则保留原号码，将重新向该号码下发待认领通知。同一记录的重复反馈会自动合并，无需重复处理。</div>
 <div class="row" style="gap:10px;margin-top:12px">
  <button class="btn ghost" style="flex:1" onclick="closeSheet();toast('已标记误报：保留原号码，重新向该号码下发待认领通知')">误报 · 保留原号码</button>
  <button class="btn teal" style="flex:1" onclick="closeSheet();toast('已提交更正：新号码进入管理端名册，生效后向其下发认领通知，本条待办闭环')">已核实 · 提交更正</button>
 </div>`)}/* -------- 学生管理：层级列表 + 搜索 + 筛选 -------- */
const smData=[
  {g:'三年级',cls:[
    {n:'三年级(2)班',cn:'(2)班',stu:[
      {n:'林晓乐',av:'乐',gen:'',face:'on',birth:'2016-03-15',age:10,addr:'阳光小区5栋302室',parents:[{rel:'爸爸',nm:'林大伟',ph:'138****2233'},{rel:'妈妈',nm:'陈晓敏',ph:'139****5521'}]},
      {n:'王一彤',av:'彤',gen:'girl',face:'on',birth:'2016-05-22',age:10,addr:'文昌路18号院6栋501室',parents:[{rel:'妈妈',nm:'王秀兰',ph:'137****8866'}]},
      {n:'赵梓涵',av:'涵',gen:'',face:'on',birth:'2016-01-08',age:10,addr:'学府华庭3栋1单元802室',parents:[{rel:'爸爸',nm:'赵建国',ph:'135****4400'},{rel:'妈妈',nm:'刘芳',ph:'136****7788'}]},
      {n:'陈诗诺',av:'诺',gen:'girl',face:'on',birth:'2016-07-14',age:10,addr:'阳光小区2栋603室',parents:[{rel:'妈妈',nm:'张丽',ph:'138****9911'}]},
      {n:'陈子昂',av:'昂',gen:'',face:'on',birth:'2016-09-03',age:9,addr:'文昌路26号院2栋303室',parents:[{rel:'爸爸',nm:'陈志强',ph:'139****2244'}]},
      {n:'杨梓冉',av:'冉',gen:'girl',face:'noface',birth:'2016-04-18',age:10,addr:'学府华庭7栋2单元505室',parents:[{rel:'妈妈',nm:'杨梅',ph:'137****3300'}]},
      {n:'黄俊泽',av:'泽',gen:'',face:'on',birth:'2016-06-25',age:10,addr:'阳光小区8栋1102室',parents:[{rel:'爸爸',nm:'黄涛',ph:'135****6677'},{rel:'妈妈',nm:'周琳',ph:'138****1122'}]},
      {n:'郑皓宸',av:'宸',gen:'',face:'on',birth:'2016-02-11',age:10,addr:'文昌路12号院4栋703室',parents:[{rel:'爸爸',nm:'郑伟',ph:'136****5588'}]},
      {n:'周雨桐',av:'桐',gen:'girl',face:'noface',birth:'2016-08-30',age:9,addr:'学府华庭1栋3单元402室',parents:[{rel:'妈妈',nm:'孙莉',ph:'139****9900'}]},
      {n:'李沐宸',av:'宸',gen:'',face:'inactive',birth:'2016-11-05',age:9,addr:'阳光小区6栋405室',parents:[{rel:'爸爸',nm:'李强',ph:'135****1234'}]}
    ]},
    {n:'三年级(1)班',cn:'(1)班',stu:[
      {n:'吴一诺',av:'诺',gen:'girl',face:'on',birth:'2016-03-20',age:10,addr:'文昌路8号院1栋202室',parents:[{rel:'妈妈',nm:'吴芳',ph:'138****4455'}]},
      {n:'张明轩',av:'轩',gen:'',face:'on',birth:'2016-05-12',age:10,addr:'学府华庭5栋4单元601室',parents:[{rel:'爸爸',nm:'张勇',ph:'136****7788'}]},
      {n:'刘芷萱',av:'萱',gen:'girl',face:'on',birth:'2016-01-25',age:10,addr:'阳光小区3栋806室',parents:[{rel:'妈妈',nm:'刘艳',ph:'139****6611'}]},
      {n:'孙浩然',av:'然',gen:'',face:'noface',birth:'2016-09-18',age:9,addr:'文昌路20号院3栋505室',parents:[{rel:'爸爸',nm:'孙鹏',ph:'135****2233'}]},
      {n:'陈雨欣',av:'欣',gen:'girl',face:'inactive',birth:'2016-07-08',age:10,addr:'学府华庭2栋1单元302室',parents:[{rel:'妈妈',nm:'陈静',ph:'137****8844'}]}
    ]}
  ]}
];
var smFilter='all';
function smStuRow(s,clsN){
  var maskHtml='';
  if(s.face==='inactive'){maskHtml='<div class="mask inactive">未激活</div>'}
  else if(s.face==='noface'){maskHtml='<div class="mask noface">未录脸</div>'}
  return '<div class="stu" style="padding:10px 14px 10px 52px;cursor:pointer" onclick="sdShow(\''+s.n+'\')">'+
    '<div class="sm-stu-av"><div class="avatar'+(s.gen?' '+s.gen:'')+'">'+s.av+'</div>'+maskHtml+'</div>'+
    '<div><div class="nm">'+s.n+'</div>'+(s.face==='inactive'?'<div class="muted" style="font-size:11px">未激活</div>':s.face==='noface'?'<div class="muted" style="font-size:11px">未录脸</div>':'')+'</div>'+
    '<span class="muted" style="margin-left:auto">›</span></div>';
}
function smRender(keyword){
  var filter=smFilter;
  let h='';
  smData.forEach(function(g){
    var clsHtml='';
    var gradeShow=false;
    g.cls.forEach(function(c){
      var stuList=c.stu.filter(function(s){
        if(keyword&&s.n.indexOf(keyword)<0)return false;
        if(filter==='on'&&s.face!=='on')return false;
        if(filter==='noface'&&s.face!=='noface')return false;
        if(filter==='inactive'&&s.face!=='inactive')return false;
        return true;
      });
      if(stuList.length===0)return;
      gradeShow=true;
      clsHtml+='<div class="sm-cls'+(keyword||filter!=='all'?'':' collapsed')+'">'+
        '<div class="sm-cls-hd" onclick="smToggleCls(this)"><span style="font-size:13px;font-weight:600">'+c.cn+'</span>'+
        '<span class="cnt">'+stuList.length+' 人</span><span class="arr">▼</span></div>'+
        '<div class="sm-cls-bd">'+stuList.map(function(s){return smStuRow(s,c.cn)}).join('')+'</div></div>';
    });
    if(!gradeShow)return;
    h+='<div class="sm-grade">'+
      '<div class="sm-grade-hd" onclick="smToggleGrade(this)"><span style="font-size:14px;font-weight:700">'+g.g+'</span>'+
      '<span class="cnt">2 个班 · 89 人</span><span class="arr">▼</span></div>'+
      '<div class="sm-grade-bd">'+clsHtml+'</div></div>';
  });
  if(!h)h='<div class="sm-empty"><div class="ico" style="display:flex;align-items:center;justify-content:center"><svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#C6CCD6" stroke-width="1.5"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/></svg></div><div class="muted">未找到匹配的学生</div></div>';
  document.getElementById('sm-list').innerHTML=h;
}
function smToggleGrade(el){el.parentElement.classList.toggle('collapsed')}
function smToggleCls(el){el.parentElement.classList.toggle('collapsed')}
function smSearch(v){smRender(v.trim())}
function smFilterSheet(){
  var opts=[['all','全部'],['on','已录脸'],['noface','未录脸'],['inactive','未激活']];
  sheet('<h3>筛选</h3><div style="max-height:300px;overflow-y:auto;margin:2px 0 14px">'+
    opts.map(function(o){return '<label style="display:flex;align-items:center;gap:10px;padding:12px 2px;border-bottom:1px solid #F0F2F6;font-size:14px;cursor:pointer" onclick="smFilterPick(\''+o[0]+'\',\''+o[1]+'\')">'+o[1]+(smFilter===o[0]?'<span style="margin-left:auto;color:var(--navy);font-size:16px">✓</span>':'<span class="arr" style="margin-left:auto">›</span>')+'</label>'}).join('')+'</div>');
}
function smFilterPick(v,label){smFilter=v;closeSheet();document.getElementById('sm-filter-btn').textContent=label;smRender(document.getElementById('sm-search').value.trim())}
/* -------- 学生详情页 -------- */
function findStu(name){
  for(var i=0;i<smData.length;i++){
    for(var j=0;j<smData[i].cls.length;j++){
      var s=smData[i].cls[j].stu.find(function(x){return x.n===name});
      if(s)return {s:s,grade:smData[i].g,cls:smData[i].cls[j].n};
    }
  }
  return null;
}
function sdShow(name){
  window.sdCurName=name;
  var r=findStu(name);
  if(!r)return;
  var s=r.s;
  /* 头像区 */
  var maskHtml='';
  if(s.face==='inactive'){maskHtml='<div class="mask inactive" style="position:absolute;inset:0;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:10px;color:#fff;font-weight:600;background:rgba(120,128,140,.88)">未激活</div>'}
  else if(s.face==='noface'){maskHtml='<div class="mask noface" style="position:absolute;inset:0;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:10px;color:#fff;font-weight:600;background:rgba(201,122,18,.85)">未录脸</div>'}
  document.getElementById('sd-av-wrap').innerHTML=
    '<div class="sm-stu-av" style="position:relative"><div class="avatar'+(s.gen?' '+s.gen:'')+'" style="width:70px;height:70px;font-size:26px">'+s.av+'</div>'+maskHtml+'</div>'+
    '<div style="display:flex;align-items:center;justify-content:center;gap:6px;font-size:17px;font-weight:600;margin-top:6px"><span class="sd-gender"><span class="ico '+(s.gen==='girl'?'female':'male')+'">'+(s.gen==='girl'?'♀':'♂')+'</span></span>'+s.n+'</div>';
  /* 基本信息 */
  document.getElementById('sd-basic').innerHTML=
    frmRow('学生姓名',s.n)+
    frmRow('性别',s.gen==='girl'?'女':'男')+
    frmRow('出生日期',s.birth)+
    frmRow('学生年龄',s.age+' 岁')+
    frmRow('学生班级',r.grade+r.cls.replace('三年级',''))+
    frmRow('现住址',s.addr);
  /* 家长信息 */
  var pHtls=s.parents.map(function(p,i){
    return '<div style="padding:12px 0'+(i>0?';border-top:1px solid #F0F2F6':'')+'">'+
      '<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:6px">'+
      '<span style="font-size:13.5px;font-weight:600">'+p.rel+' · '+p.nm+'</span>'+
      '<a href="tel:'+p.ph+'" style="display:flex;align-items:center;justify-content:center;width:28px;height:28px;border-radius:50%;background:#E8F8F3;color:var(--teal);text-decoration:none"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg></a>'+
      '</div>'+
      '<div class="muted" style="font-size:12.5px">'+p.ph+'</div>'+
      '</div>';
  }).join('');
  document.getElementById('sd-parents').innerHTML=pHtls||'<div class="muted" style="padding:12px 0;text-align:center">暂无家长信息</div>';
  go('sc-studetail');
}
function frmRow(label,val){
  return '<div class="frm-row"><span class="lb">'+label+'</span><span class="val">'+val+'</span></div>';
}
function sdMoreActions(){
  sheet('<h3>更多操作</h3>'+
    '<div style="margin:2px 0">'+
    '<div style="text-align:center;padding:13px 2px;border-bottom:1px solid #F0F2F6;font-size:14px;cursor:pointer;color:var(--ink)" onclick="closeSheet();toast(\'演示：离校操作\')">离校</div>'+
    '<div style="text-align:center;padding:13px 2px;border-bottom:1px solid #F0F2F6;font-size:14px;cursor:pointer;color:var(--cinnabar)" onclick="closeSheet();toast(\'演示：删除操作\')">删除</div>'+
    '<div style="text-align:center;padding:13px 2px;font-size:14px;cursor:pointer;color:var(--ink-3)" onclick="closeSheet()">取消</div>'+
    '</div>');
}
/* -------- 新增学生表单 -------- */
var smContactIdx=1;
function smGender(el){
  el.parentElement.querySelectorAll('.frm-radio').forEach(function(r){r.classList.remove('on')});
  el.classList.add('on');
}
function smClsSheet(){
  window.smClsTarget='addstu-cls-txt';
  smClsOpenSheet();
}
function smClsSheetEdit(){
  window.smClsTarget='editstu-cls-txt';
  smClsOpenSheet();
}
var smClsCur='三年级';
const smClsGrades={'一年级':8,'二年级':8,'三年级':10,'四年级':10,'五年级':8,'六年级':6};
function smClsOpenSheet(){
  sheet('<h3>选择学生班级</h3>'+
   '<div style="display:flex;border:1px solid var(--line);border-radius:12px;overflow:hidden;height:300px;flex-shrink:0">'+
     '<div id="sm-cls-grades" style="width:88px;background:#EFF3F9;overflow-y:auto;flex-shrink:0"></div>'+
     '<div style="flex:1;padding:10px 10px 6px;overflow-y:auto"><div class="fchips" id="sm-cls-list" style="gap:7px"></div></div>'+
   '</div>'+
   '<button class="btn ghost blk" style="margin-top:12px;padding:11px" onclick="closeSheet()">取消</button>');
  smClsRender();
}
function smClsRender(){
  const gEl=document.getElementById('sm-cls-grades');
  if(!gEl)return;
  gEl.innerHTML=Object.keys(smClsGrades).map(g=>{
    return '<button onclick="smClsCur=\''+g+'\';smClsRender()" style="display:block;width:100%;text-align:left;padding:11px 12px;font-size:12.5px;'+(g===smClsCur?'background:#fff;color:var(--navy);font-weight:600;border-left:3px solid var(--navy);':'color:var(--ink-2);border-left:3px solid transparent;')+'">'+g+'</button>';
  }).join('');
  const n=smClsGrades[smClsCur];let h='';
  for(let i=1;i<=n;i++){h+='<button class="fchip" onclick="smClsPick(\''+smClsCur+'('+i+')班\')">'+smClsCur[0]+'('+i+')</button>'}
  document.getElementById('sm-cls-list').innerHTML=h;
}
function smClsPick(c){
  closeSheet();
  const t=document.getElementById(window.smClsTarget);
  if(t){t.textContent=c;t.style.color='var(--ink)'}
  toast('已选择：'+c);
}
function smAddContact(){
  smContactIdx++;
  var html='<div class="frm-sec">家长信息'+smContactIdx+'</div>'+
    '<div class="card" id="sm-contact-'+smContactIdx+'">'+
    '<div class="frm-row"><span class="lb">称谓<span class="req">*</span></span><span class="val" onclick="toast(\'演示：爸爸/妈妈/爷爷/奶奶/其他\')">请选择 ›</span></div>'+
    '<div class="frm-row"><span class="lb">家长姓名<span class="req">*</span></span><input type="text" placeholder="请输入"></div>'+
    '<div class="frm-row"><span class="lb">家长手机号<span class="req">*</span></span><input type="text" placeholder="请输入" maxlength="11"></div>'+
    '</div>';
  var addBtn=document.querySelector('#sc-addstu .frm-add');
  addBtn.insertAdjacentHTML('beforebegin',html);
}
/* -------- 修改学生信息：反显 + 头像修改 + 动态家长信息 -------- */
var editContactIdx=1;
function goEditStu(name){
  var r=findStu(name);
  if(!r){toast('未找到学生信息');return}
  var s=r.s;
  /* 头像 */
  var av=document.getElementById('editstu-av');
  av.textContent=s.av;
  av.className='avatar'+(s.gen?' '+s.gen:'');
  /* 学生姓名 */
  document.getElementById('editstu-name').value=s.n;
  /* 性别 */
  var genders=document.getElementById('editstu-gender').querySelectorAll('.frm-radio');
  genders.forEach(function(l){l.classList.remove('on')});
  if(s.gen==='girl'){genders[1].classList.add('on')}else{genders[0].classList.add('on')}
  /* 出生日期 */
  var birthEl=document.getElementById('editstu-birth');
  birthEl.textContent=s.birth;
  birthEl.style.color='var(--ink)';
  /* 学生班级 */
  var clsEl=document.getElementById('editstu-cls-txt');
  clsEl.textContent=r.cls;
  clsEl.style.color='var(--ink)';
  /* 现住址 */
  document.getElementById('editstu-addr').value=s.addr;
  /* 家长信息 */
  editContactIdx=1;
  var cHtml='<div class="frm-sec">家长信息</div><div class="card">';
  cHtml+=s.parents.map(function(p,i){
    return (i>0?'<div style="border-top:1px solid #F0F2F6">':'<div>')+
      '<div class="frm-row"><span class="lb">称谓<span class="req">*</span></span><span class="val" onclick="toast(\'演示：选择称谓\')">'+p.rel+' ›</span></div>'+
      '<div class="frm-row"><span class="lb">家长姓名<span class="req">*</span></span><input type="text" value="'+p.nm+'"></div>'+
      '<div class="frm-row"><span class="lb">家长手机号<span class="req">*</span></span><input type="text" value="'+p.ph+'" maxlength="11"></div>'+
      '</div>';
  }).join('');
  cHtml+='</div>';
  document.getElementById('editstu-contacts').innerHTML=cHtml;
  go('sc-editstu');
}
function editAddContact(){
  editContactIdx++;
  var html='<div class="frm-sec">家长信息'+editContactIdx+'</div>'+
    '<div class="card">'+
    '<div class="frm-row"><span class="lb">称谓<span class="req">*</span></span><span class="val" onclick="toast(\'演示：爸爸/妈妈/爷爷/奶奶/其他\')">请选择 ›</span></div>'+
    '<div class="frm-row"><span class="lb">家长姓名<span class="req">*</span></span><input type="text" placeholder="请输入"></div>'+
    '<div class="frm-row"><span class="lb">家长手机号<span class="req">*</span></span><input type="text" placeholder="请输入" maxlength="11"></div>'+
    '</div>';
  document.getElementById('editstu-contacts').insertAdjacentHTML('beforeend',html);
}
function editSaveStu(){
  toast('已保存：学生信息已更新');
  setTimeout(function(){go('sc-studetail')},800);
}
function editstuAvatarSheet(){
  sheet('<h3>修改头像</h3>'+
    '<div style="margin:2px 0">'+
    '<div style="text-align:center;padding:13px 2px;border-bottom:1px solid #F0F2F6;font-size:14px;cursor:pointer;color:var(--ink)" onclick="editstuAvatarPick(\'camera\')">拍照</div>'+
    '<div style="text-align:center;padding:13px 2px;border-bottom:1px solid #F0F2F6;font-size:14px;cursor:pointer;color:var(--ink)" onclick="editstuAvatarPick(\'album\')">从相册选择</div>'+
    '<div style="text-align:center;padding:13px 2px;font-size:14px;cursor:pointer;color:var(--ink-3)" onclick="closeSheet()">取消</div>'+
    '</div>');
}
function editstuAvatarPick(src){
  closeSheet();
  toast('演示：'+(src==='camera'?'调用手机相机拍照':'从手机相册选择')+'，选择后自动裁剪为头像');
}
function smSaveStu(){
  toast('已保存：学生信息已录入名册，等待人脸授权后生效');
  setTimeout(function(){go('sc-stumgr')},800);
}
/* -------- 待审核：待审核/已拒绝/已通过 + 层级列表 + 多选 + 批量操作 -------- */
const spData={
  pend:[
    {n:'张小明',av:'明',gen:'',grade:'三年级',cls:'(1)班',time:'今天 09:15',ck:false},
    {n:'李红',av:'红',gen:'girl',grade:'三年级',cls:'(2)班',time:'今天 08:48',ck:false},
    {n:'王强',av:'强',gen:'',grade:'三年级',cls:'(1)班',time:'昨天 16:30',ck:false},
    {n:'赵小雪',av:'雪',gen:'girl',grade:'三年级',cls:'(2)班',time:'昨天 14:20',ck:false},
    {n:'孙伟',av:'伟',gen:'',grade:'四年级',cls:'(1)班',time:'今天 10:05',ck:false}
  ],
  reject:[
    {n:'刘洋',av:'洋',gen:'',grade:'三年级',cls:'(2)班',time:'昨天 11:00',reason:'信息核实不通过',ck:false},
    {n:'陈芳',av:'芳',gen:'girl',grade:'三年级',cls:'(1)班',time:'7月12日 15:30',reason:'家长称谓与关系不符',ck:false}
  ],
  pass:[
    {n:'周明',av:'周',gen:'',grade:'三年级',cls:'(2)班',time:'今天 09:15',ck:false},
    {n:'吴婷',av:'婷',gen:'girl',grade:'四年级',cls:'(1)班',time:'今天 08:48',ck:false},
    {n:'郑凯',av:'凯',gen:'',grade:'三年级',cls:'(1)班',time:'昨天 16:30',ck:false}
  ]
};
var spCur='pend';
var spKeyword='';
function spTab(el,k){
  spCur=k;
  spKeyword='';
  var searchInput=document.getElementById('sp-search');
  if(searchInput)searchInput.value='';
  document.querySelectorAll('#sp-tabs .fchip').forEach(function(x){x.classList.remove('on')});
  el.classList.add('on');
  spRender();
}
function spStatusLabel(k){
  return k==='pend'?'待审核':k==='reject'?'已拒绝':'已通过';
}
function spStatusClass(k){
  return k==='pend'?'amber':k==='reject'?'gray':'teal';
}
/* 获取过滤后的列表 */
function spFilteredList(){
  return spData[spCur].filter(function(s){
    return !spKeyword||s.n.indexOf(spKeyword)>-1;
  });
}
/* 按 年级>班级 分组 */
function spGrouped(list){
  var grades={};
  list.forEach(function(s){
    if(!grades[s.grade])grades[s.grade]={};
    if(!grades[s.grade][s.cls])grades[s.grade][s.cls]=[];
    grades[s.grade][s.cls].push(s);
  });
  return grades;
}
/* 判断年级/班级是否全选 */
function spGradeAllOn(gName,grades){
  var allOn=true;
  Object.keys(grades[gName]).forEach(function(c){
    grades[gName][c].forEach(function(s){if(!s.ck)allOn=false});
  });
  return allOn;
}
function spClsAllOn(gName,cName,grades){
  return grades[gName][cName].every(function(s){return s.ck});
}
function spRender(){
  var list=spFilteredList();
  var h='';
  if(!list.length){
    h='<div class="sm-empty"><div class="ico" style="display:flex;align-items:center;justify-content:center"><svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#D5DAE4" stroke-width="1.2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5M2 12l10 5 10-5"/></svg></div><div class="muted">暂无相关记录</div></div>';
  }else{
    h='<input type="text" id="sp-search" placeholder="输入姓名搜索" style="border-radius:20px;margin-bottom:10px" value="'+spKeyword+'" oninput="spSearch(this.value)">';
    h+='<div class="muted" style="padding:2px 2px 10px">申请入校: '+list.length+'人</div>';
    var grades=spGrouped(list);
    Object.keys(grades).forEach(function(gName){
      var clsObj=grades[gName];
      var clsCount=Object.keys(clsObj).length;
      var stuCount=0;
      Object.keys(clsObj).forEach(function(c){stuCount+=clsObj[c].length});
      var gAllOn=spGradeAllOn(gName,grades);
      h+='<div class="sm-grade">'+
        '<div class="sm-grade-hd" style="gap:10px"><div class="ck'+(gAllOn?' on':'')+'" onclick="event.stopPropagation();spCkGrade(\''+gName+'\')"></div><span style="font-size:14px;font-weight:700;flex:1" onclick="smToggleGrade(this.parentElement)">'+gName+'</span>'+
        '<span class="cnt">'+clsCount+' 个班 · '+stuCount+' 人</span><span class="arr" onclick="smToggleGrade(this.parentElement)">▼</span></div>'+
        '<div class="sm-grade-bd">';
      Object.keys(clsObj).forEach(function(cName){
        var stus=clsObj[cName];
        var cAllOn=spClsAllOn(gName,cName,grades);
        h+='<div class="sm-cls'+
          (spKeyword||spCur!=='pend'?'':' collapsed')+'">'+
          '<div class="sm-cls-hd" style="gap:10px;padding-left:22px"><div class="ck'+(cAllOn?' on':'')+'" onclick="event.stopPropagation();spCkCls(\''+gName+'\',\''+cName+'\')"></div><span style="font-size:13px;font-weight:600;flex:1" onclick="smToggleCls(this.parentElement)">'+cName+'</span>'+
          '<span class="cnt">'+stus.length+' 人</span><span class="arr" onclick="smToggleCls(this.parentElement)">▼</span></div>'+
          '<div class="sm-cls-bd">'+
          stus.map(function(s){
            return spStuRow(s,gName,cName);
          }).join('')+'</div></div>';
      });
      h+='</div></div>';
    });
  }
  document.getElementById('sp-main').innerHTML=h;
  spUpdateCnt();
  document.getElementById('sp-foot').style.display=spCur==='pend'?'flex':'none';
}
function spStuRow(s,gName,cName){
  var statLbl=spStatusLabel(spCur);
  var statCls=spStatusClass(spCur);
  return '<div class="stu" style="padding:10px 14px 10px 22px;cursor:pointer" onclick="spCkStu(\''+s.n+'\')">'+
    '<div class="ck'+(s.ck?' on':'')+'" onclick="event.stopPropagation();spCkStu(\''+s.n+'\')" style="flex-shrink:0"></div>'+
    '<div class="avatar'+(s.gen?' '+s.gen:'')+'">'+s.av+'</div>'+
    '<div style="flex:1;min-width:0"><div class="nm">'+s.n+' <span class="chip '+statCls+' plain" style="font-size:10px;padding:1px 6px;vertical-align:middle">'+statLbl+'</span></div><div class="sub">'+s.time+'</div></div>'+
    '<span class="muted" style="margin-left:auto;font-size:12px;white-space:nowrap;flex-shrink:0;padding:4px 0 4px 8px" onclick="event.stopPropagation();spDetail(\''+s.n+'\')">详情 ›</span></div>';
}
function spSearch(v){spKeyword=v.trim();spRender()}
/* 勾选：学生/班级/年级联动 */
function spCkStu(name){
  var s=spData[spCur].find(function(x){return x.n===name});
  if(s)s.ck=!s.ck;
  spRender();
}
function spCkCls(gName,cName){
  var list=spFilteredList();
  var grades=spGrouped(list);
  var stus=grades[gName][cName];
  var allOn=stus.every(function(s){return s.ck});
  stus.forEach(function(s){s.ck=!allOn});
  spRender();
}
function spCkGrade(gName){
  var list=spFilteredList();
  var grades=spGrouped(list);
  var allOn=spGradeAllOn(gName,grades);
  Object.keys(grades[gName]).forEach(function(c){
    grades[gName][c].forEach(function(s){s.ck=!allOn});
  });
  spRender();
}
function spAll(el){
  var list=spFilteredList();
  var allOn=list.every(function(s){return s.ck});
  list.forEach(function(s){s.ck=!allOn});
  spRender();
}
function spUpdateCnt(){
  var k=spData[spCur].filter(function(s){return s.ck}).length;
  var total=spFilteredList().length;
  document.getElementById('sp-cnt').textContent='全选 · 已选 '+k+' 人';
  document.getElementById('sp-all').classList.toggle('on',k>0&&k===total);
  document.getElementById('sp-approve').disabled=k===0;
  document.getElementById('sp-reject').disabled=k===0;
  document.getElementById('sp-approve').style.opacity=k===0?0.5:1;
  document.getElementById('sp-reject').style.opacity=k===0?0.5:1;
}
function spApprove(){
  var picked=spData.pend.filter(function(s){return s.ck});
  if(!picked.length)return;
  spData.pend=spData.pend.filter(function(s){return !s.ck});
  picked.forEach(function(s){s.ck=false;s.time='刚刚';spData.pass.push(s)});
  toast('已通过 '+picked.length+' 人审核，学生信息已生效');
  spRender();
}
/* 拒绝理由弹框（非必填） */
var spRejectCallback=null;
function spRejectSheet(cb){
  spRejectCallback=cb;
  sheet('<h3>拒绝理由</h3>'+
    '<div class="desc" style="margin-bottom:8px">填写拒绝理由（非必填，可直接确定）</div>'+
    '<textarea id="sp-reason" placeholder="请输入拒绝理由（选填）" style="width:100%;min-height:80px;border:1px solid var(--line);border-radius:10px;padding:10px 12px;font-size:14px;font-family:inherit;resize:none;outline:none;margin-bottom:12px"></textarea>'+
    '<div style="display:flex;gap:10px">'+
    '<button class="btn ghost blk" style="padding:10px" onclick="closeSheet()">取消</button>'+
    '<button class="btn pri blk" style="padding:10px" onclick="spRejectConfirm()">确定</button>'+
    '</div>');
}
function spRejectConfirm(){
  var reason=document.getElementById('sp-reason').value.trim();
  closeSheet();
  if(spRejectCallback){spRejectCallback(reason);spRejectCallback=null}
}
/* 批量拒绝 */
function spRejectBatch(){
  var picked=spData.pend.filter(function(s){return s.ck});
  if(!picked.length)return;
  spRejectSheet(function(reason){
    spData.pend=spData.pend.filter(function(s){return !s.ck});
    picked.forEach(function(s){
      s.ck=false;
      s.reason=reason||'未填写';
      s.time='刚刚';
      spData.reject.push(s);
    });
    toast('已拒绝 '+picked.length+' 人，已移入「已拒绝」列表');
    spRender();
  });
}
/* -------- 学生审核页（待审核可编辑+通过/拒绝；已拒绝/已通过只读无按钮） -------- */
var spAuditName='';
var spReadOnly=false;
function spDetail(name){
  spAuditName=name;
  spReadOnly=spCur!=='pend'; /* 已拒绝/已通过为只读 */
  var s=spData[spCur].find(function(x){return x.n===name});
  if(!s)return;
  /* 标题 */
  document.querySelector('#sc-stuaudit .sub-hd b').textContent=spReadOnly?'学生详情':'学生审核';
  /* 头像 */
  var av=document.getElementById('audit-av');
  av.textContent=s.av;
  av.className='avatar'+(s.gen?' '+s.gen:'');
  /* 修改头像按钮 */
  var avBtn=document.getElementById('audit-av-btn');
  avBtn.style.display=spReadOnly?'none':'block';
  /* 学生姓名 */
  var nameEl=document.getElementById('audit-name');
  nameEl.value=s.n;
  nameEl.readOnly=spReadOnly;
  nameEl.style.background=spReadOnly?'#F0F2F6':'';
  /* 性别 */
  var genders=document.getElementById('audit-gender').querySelectorAll('.frm-radio');
  genders.forEach(function(l){
    l.classList.remove('on');
    l.style.pointerEvents=spReadOnly?'none':'';
    l.style.opacity=spReadOnly?'0.6':'';
  });
  if(s.gen==='girl'){genders[1].classList.add('on')}else{genders[0].classList.add('on')}
  /* 出生日期 */
  var birthEl=document.getElementById('audit-birth');
  birthEl.textContent='2016-03-15';
  birthEl.style.color='var(--ink)';
  birthEl.style.pointerEvents=spReadOnly?'none':'';
  /* 学生班级 */
  var clsEl=document.getElementById('audit-cls-txt');
  clsEl.textContent=s.grade+s.cls;
  clsEl.style.color='var(--ink)';
  clsEl.style.pointerEvents=spReadOnly?'none':'';
  /* 现住址 */
  var addrEl=document.getElementById('audit-addr');
  addrEl.value=spReadOnly?'（未填写）':'';
  addrEl.readOnly=spReadOnly;
  addrEl.style.background=spReadOnly?'#F0F2F6':'';
  /* 家长信息 */
  var relTxt=spReadOnly?'妈妈':'妈妈 ›';
  var parentName=spReadOnly?'（待填写）':'（待填写）';
  var parentPh='138****6688';
  var cHtml='<div class="frm-sec">家长信息</div><div class="card">'+
    '<div class="frm-row"><span class="lb">称谓<span class="req">*</span></span><span class="val"'+(!spReadOnly?' onclick="toast(\'演示：选择称谓\')"':'')+' style="color:'+(spReadOnly?'var(--ink)':'var(--ink-3)')+'">'+relTxt+'</span></div>'+
    '<div class="frm-row"><span class="lb">家长姓名<span class="req">*</span></span>'+(spReadOnly?'<span class="val">'+parentName+'</span>':'<input type="text" value="'+parentName+'">')+'</div>'+
    '<div class="frm-row"><span class="lb">家长手机号<span class="req">*</span></span>'+(spReadOnly?'<span class="val">'+parentPh+'</span>':'<input type="text" value="'+parentPh+'" maxlength="11">')+'</div>'+
    '</div>';
  document.getElementById('audit-contacts').innerHTML=cHtml;
  /* 添加家长按钮 */
  document.getElementById('audit-add-btn').style.display=spReadOnly?'none':'block';
  /* 底部按钮 */
  document.getElementById('audit-foot').style.display=spReadOnly?'none':'flex';
  go('sc-stuaudit');
}
function auditAddContact(){
  var html='<div class="frm-sec">家长信息（新增）</div>'+
    '<div class="card">'+
    '<div class="frm-row"><span class="lb">称谓<span class="req">*</span></span><span class="val" onclick="toast(\'演示：爸爸/妈妈/爷爷/奶奶/其他\')">请选择 ›</span></div>'+
    '<div class="frm-row"><span class="lb">家长姓名<span class="req">*</span></span><input type="text" placeholder="请输入"></div>'+
    '<div class="frm-row"><span class="lb">家长手机号<span class="req">*</span></span><input type="text" placeholder="请输入" maxlength="11"></div>'+
    '</div>';
  document.getElementById('audit-contacts').insertAdjacentHTML('beforeend',html);
}
function auditApprove(){
  var s=spData[spCur].find(function(x){return x.n===spAuditName});
  if(s){
    var idx=spData[spCur].indexOf(s);
    spData[spCur].splice(idx,1);
    s.ck=false;s.time='刚刚';
    if(!spData.pass)spData.pass=[];
    spData.pass.push(s);
  }
  toast('已通过：'+spAuditName+' 审核通过，学生信息已生效');
  setTimeout(function(){go('sc-stuPend');spRender()},800);
}
function auditReject(){
  spRejectSheet(function(reason){
    var s=spData[spCur].find(function(x){return x.n===spAuditName});
    if(s){
      var idx=spData[spCur].indexOf(s);
      spData[spCur].splice(idx,1);
      s.ck=false;
      s.reason=reason||'未填写';
      s.time='刚刚';
      spData.reject.push(s);
    }
    toast('已拒绝：'+spAuditName+'，已移入「已拒绝」列表');
    setTimeout(function(){go('sc-stuPend');spRender()},800);
  });
}
renderAttc();
smRender('');
spRender();
tmRender();
tpRender();
taBadge();
/* -------- 首页身份切换下拉：教师身份 + 家长侧孩子（选择孩子确认后跳转家长端） -------- */
function idPanel(){
  if(document.getElementById('id-panel').classList.contains('show')){idClose();return}
  /* 上移 22px 塞到头部圆角下方，配合 .id-open 提亮头部，面板视觉上从头部滑出 */
  document.getElementById('id-panel').style.top=(document.querySelector('#sc-home .home-hd').offsetHeight-22)+'px';
  document.querySelector('.phone').classList.add('id-open');
  document.getElementById('id-mask').classList.add('show');
  document.getElementById('id-panel').classList.add('show');
}
function idClose(){
  document.querySelector('.phone').classList.remove('id-open');
  document.getElementById('id-mask').classList.remove('show');
  document.getElementById('id-panel').classList.remove('show');
}
function idToParent(n){
  idClose();
  toast('正在切换为家长身份（'+n+'）…');
  setTimeout(()=>location.href='parent.html',700);
}
/* -------- 添加孩子（教师账号以家长身份绑定孩子 · 师长双身份）：与家长端「添加孩子 · 人工申请」同构 -------- */
const tcPickerData={
  grade:{title:'选择年级',opts:['一年级','二年级','三年级','四年级','五年级','六年级']},
  cls:{title:'选择班级',opts:['(1)班','(2)班','(3)班','(4)班']}
};
const tcPickerVal={school:'市实验一小',grade:'三年级',cls:'(2)班'};
function tcAddChild(){
  document.getElementById('tk-name').value='';
  document.getElementById('tk-rel').value='';
  go('sc-addchild');
}
function tcOpenPicker(k){
  if(k==='school'){tcSchoolPicker();return}
  const d=tcPickerData[k];
  sheet('<div class="pk-hd"><button onclick="closeSheet()">取消</button><b>'+d.title+'</b><span style="width:44px"></span></div>'+
   '<div class="pk-list">'+d.opts.map(o=>
     '<button class="pk-opt'+(o===tcPickerVal[k]?' on':'')+'" onclick="tcPickVal(\''+k+'\',\''+o+'\')">'+o+(o===tcPickerVal[k]?'<span>✓</span>':'')+'</button>'
   ).join('')+'</div>');
}
/* 学校选择：仅列任教学校快捷项，其余走关键字搜索——防止合作学校名录被穷举 */
function tcSchoolPicker(){
  sheet('<div class="pk-hd"><button onclick="closeSheet()">取消</button><b>选择学校</b><span style="width:44px"></span></div>'+
   '<div class="muted" style="margin:0 0 6px">仅展示您任教的学校；其他学校请按名称搜索，不提供名录浏览。</div>'+
   '<button class="pk-opt'+(tcPickerVal.school==='市实验一小'?' on':'')+'" onclick="tcPickVal(\'school\',\'市实验一小\')">市实验一小 <span style="font-size:11px;font-weight:400;color:var(--ink-3)">任教：三年级(2)班</span></button>'+
   '<div class="row" style="gap:8px;margin-top:12px"><input type="text" id="tk-sch-q" placeholder="输入学校名称关键字（≥2 字）" style="flex:1"><button class="btn pri sm" style="padding:9px 14px" onclick="tcSearchSchool()">搜索</button></div>');
}
function tcSearchSchool(){
  const q=document.getElementById('tk-sch-q').value.trim();
  if(q.length<2){toast('请输入至少 2 个字的学校名称关键字');return}
  toast('演示：按关键字「'+q+'」检索合作学校，未命中时返回统一提示并限频');
}
function tcPickVal(k,v){
  tcPickerVal[k]=v;
  document.querySelector('#tk-'+(k==='school'?'school':k)+' span').textContent=v;
  closeSheet();
}
function tcSubmitApply(){
  if(!document.getElementById('tk-name').value.trim()){toast('请输入学生姓名（需手填全名）');return}
  if(!document.getElementById('tk-rel').value){toast('请选择您与孩子的关系');return}
  go('sc-me');
  toast('已提交：将路由至 '+tcPickerVal.school+'·'+tcPickerVal.grade+tcPickerVal.cls+' 班主任审核，结果以消息通知');
}
/* -------- 素质评价：发起点评（提交后记录置顶并联动顶部统计，同步家长端） -------- */
function evalSheet(){sheet(`<h3>发起点评</h3>
 <div class="desc">点评即时生效并同步家长；星星积分按学校规则记入学生账户。</div>
 <div style="font-size:12px;color:var(--ink-2);margin-bottom:6px">学生（三年级(2)班）</div>
 <div class="fchips" id="ev-stu" style="margin-bottom:2px"><button class="fchip on" onclick="plSeg(this)">林晓乐</button><button class="fchip" onclick="plSeg(this)">王梓豪</button><button class="fchip" onclick="plSeg(this)">吴一诺</button><button class="fchip" onclick="plSeg(this)">高子墨</button></div>
 <div style="font-size:12px;color:var(--ink-2);margin:10px 0 6px">点评类型</div>
 <div class="fchips" id="ev-type" style="margin-bottom:2px"><button class="fchip on" onclick="plSeg(this)">表扬 +1</button><button class="fchip" onclick="plSeg(this)">待改进 −2</button></div>
 <div style="font-size:12px;color:var(--ink-2);margin:10px 0 6px">点评项目（德育）</div>
 <input type="text" id="ev-item" value="课堂积极发言">
 <button class="btn pri blk" style="margin-top:14px" onclick="evalSubmit()">提交点评</button>`)}
function evalSubmit(){
  const n=document.querySelector('#ev-stu .fchip.on').textContent;
  const good=document.querySelector('#ev-type .fchip.on').textContent.includes('表扬');
  const item=document.getElementById('ev-item').value.trim()||'课堂表现';
  const girl=(plClasses.flatMap(c=>c.s).find(x=>x[0]===n)||[])[1];
  const d=document.createElement('div');
  d.className='card ev-rec';d.dataset.n=n+' 王老师 '+item;d.style.padding='13px 14px';
  d.innerHTML='<div class="row"><div class="avatar'+(girl?' girl':'')+'">'+n.slice(-1)+'</div>'+
   '<div style="flex:1;min-width:0"><div style="font-size:14.5px;font-weight:700">'+n+'</div><div class="muted">三年级(2)班</div></div>'+
   (good?'<span class="chip teal plain">表扬</span><b style="font-size:15px;color:var(--navy)">+1 <span style="color:#FFC53D">★</span></b>'
        :'<span class="chip amber plain">待改进</span><b style="font-size:15px;color:#F79A2E">−2 <span style="color:#FFC53D">★</span></b>')+'</div>'+
   '<div style="background:#F7F9FB;border-radius:10px;padding:8px 12px;margin-top:10px"><div class="kv"><span class="k">点评维度</span><span class="v">德育</span></div><div class="kv"><span class="k">点评项目</span><span class="v">'+item+'</span></div><div class="kv"><span class="k">点评老师</span><span class="v">王老师</span></div></div>'+
   '<div class="muted" style="margin-top:8px">刚刚</div>';
  document.getElementById('ev-list').prepend(d);
  const upd=(id,dv)=>{const e=document.getElementById(id);e.textContent=+e.textContent+dv};
  upd('ev-star',good?1:-2);upd('ev-cnt',1);good?upd('ev-good',1):upd('ev-bad',-2);
  closeSheet();
  toast('已点评 '+n+'（'+(good?'表扬 +1':'待改进 −2')+' · '+item+'）：记录已同步家长');
}
function evFilter(v){document.querySelectorAll('#ev-list .ev-rec').forEach(r=>r.style.display=r.dataset.n.includes(v.trim())?'':'none')}
/* -------- 首页「智能校徽」入口 / 活动横幅：班级办理进度半屏（校徽由家长在家长端申请与补办） -------- */
function badgeSheet(){sheet(`<h3>智能校徽 · 三(2)班办理进度</h3>
 <div class="desc">全班 45 人：已办理 <b>43</b> · 未办理 <b style="color:var(--cinnabar)">2</b>（李沐宸、徐若曦）。校徽由家长在家长端申请与补办，办理进度实时同步。</div>
 <div class="row" style="gap:10px">
  <button class="btn ghost" style="flex:1" onclick="closeSheet();toast('已提醒 2 位未办理家长：消息已发送')">提醒未办理家长</button>
  <button class="btn pri" style="flex:1" onclick="closeSheet();toast('首发校徽按班装箱到校，请按名单分发并请家长扫码核对（抽检性质，不阻塞考勤）')">首发分发核对</button>
 </div>`)}
/* -------- 智能校徽办理承接页（活动横幅进入）：信息收集 / 校徽办理双 Tab -------- */
/* -------- 校徽详情页展开内容 -------- */
function applyDetailMore(b){
  const m=document.getElementById('apdetail-more'),show=m.style.display==='none';
  m.style.display=show?'':'none';b.textContent=show?'收起内容 ⌃':'展开内容 ⌄';
}
/* -------- 分享校徽办理到微信 -------- */
function shareBadgeSheet(){
  var old=document.querySelector('.wx-share');
  if(old)old.remove();
  var el=document.createElement('div');
  el.className='wx-share';
  var avatars=['林晓乐家长','王一彤家长','赵梓涵家长','陈诗诺家长','郑皓宸家长'];
  var avHtml=avatars.map(function(n){return '<div class="wx-av" style="width:38px;height:38px;border-radius:6px;background:#3A3A3A;display:flex;align-items:center;justify-content:center;font-size:14px;color:#888;flex-shrink:0">'+n.charAt(0)+'</div>'}).join('');
  var chats=[
    {nm:'林晓乐家长',av:'林'},
    {nm:'三年级(2)班家长群',av:'群'},
    {nm:'王一彤家长',av:'王'},
    {nm:'赵梓涵家长',av:'赵'},
    {nm:'陈诗诺家长',av:'陈'},
    {nm:'郑皓宸家长',av:'郑'}
  ];
  var chatHtml=chats.map(function(c,i){
    return '<div class="wx-chat'+(i===0?' selected':'')+'" onclick="wxSelectChat(this)">'+
      '<div class="wx-radio"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12l5 5L20 7"/></svg></div>'+
      '<div class="wx-av" style="width:36px;height:36px;border-radius:6px;background:'+(c.nm.indexOf('群')>-1?'#576B95':'#3A3A3A')+';display:flex;align-items:center;justify-content:center;font-size:14px;color:'+(c.nm.indexOf('群')>-1?'#fff':'#888')+';flex-shrink:0">'+c.av+'</div>'+
      '<div class="wx-nm">'+c.nm+'</div></div>';
  }).join('');
  el.innerHTML=
    '<div class="wx-top">'+
      '<div class="wx-close" onclick="wxCloseShare()">✕</div>'+
      '<div class="wx-title">发送给</div>'+
      '<div style="width:28px"></div>'+
    '</div>'+
    '<div class="wx-mid">'+
      '<div class="wx-contacts">'+
        '<div class="wx-search">'+
          '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.5-4.5"/></svg>'+
          '<input type="text" placeholder="搜索">'+
        '</div>'+
        '<div class="wx-recent">'+
          '<div class="wx-recent-t">最近转发</div>'+
          '<div class="wx-recent-row">'+avHtml+'<span class="wx-rm">移除</span></div>'+
        '</div>'+
        '<div class="wx-chatlist">'+
          '<div class="wx-newchat" onclick="wxSelectChat(this)">'+
            '<div class="wx-av"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M5 12h14"/></svg></div>'+
            '<div class="wx-nm">创建聊天</div>'+
          '</div>'+
          chatHtml+
        '</div>'+
      '</div>'+
      '<div class="wx-preview">'+
        '<div class="wx-pt">发送给</div>'+
        '<div class="wx-card">'+
          '<div class="wx-card-t">智能校徽登记办理</div>'+
          '<div class="wx-card-s">市实验一小 · 三年级(2)班</div>'+
          '<div class="wx-card-tag">小程序</div>'+
        '</div>'+
        '<div class="wx-msg">'+
          '<input type="text" placeholder="给朋友留言">'+
          '<div class="wx-ico"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M9 10h.01M15 10h.01"/><path d="M9 15c1 1 2 1.5 3 1.5s2-.5 3-1.5"/></svg></div>'+
          '<div class="wx-ico"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="3" width="6" height="12" rx="3"/><path d="M5 11a7 7 0 0014 0M12 18v3"/></svg></div>'+
        '</div>'+
        '<div class="wx-btns">'+
          '<button class="wx-send" onclick="wxCloseShare();toast(\'已发送给：林晓乐家长\')">发送</button>'+
          '<button class="wx-cancel" onclick="wxCloseShare()">取消</button>'+
        '</div>'+
      '</div>'+
    '</div>';
  document.body.appendChild(el);
  void el.offsetHeight;
  requestAnimationFrame(function(){el.classList.add('show')});
}
function wxCloseShare(){
  var el=document.querySelector('.wx-share');
  if(!el)return;
  el.classList.remove('show');
  setTimeout(function(){el.remove()},220);
}
function wxSelectChat(chatEl){
  var list=chatEl.closest('.wx-chatlist');
  if(list){
    list.querySelectorAll('.wx-chat').forEach(function(c){c.classList.remove('selected')});
  }
  if(chatEl.classList.contains('wx-chat')){
    chatEl.classList.add('selected');
    var nm=chatEl.querySelector('.wx-nm').textContent;
    var sendBtn=document.querySelector('.wx-send');
    if(sendBtn)sendBtn.setAttribute('onclick',"wxCloseShare();toast('已发送给："+nm+"')");
  }
}
function colFilter(el,f){
  el.parentElement.querySelectorAll('.fchip').forEach(c=>c.classList.remove('on'));el.classList.add('on');
  document.querySelectorAll('#col-list .stu').forEach(r=>r.style.display=(f==='all'||r.dataset.cf===f)?'':'none');
}
/* -------- 信息确认页：搜索+下拉联动 / 班级折叠 / 年级班级筛选 -------- */
var colState={q:'',f:'all'};
function colApply(){
  document.querySelectorAll('#col-list .stu').forEach(r=>{
    var okF=colState.f==='all'||r.dataset.cf===colState.f;
    var okQ=!colState.q||r.querySelector('.nm').textContent.includes(colState.q);
    r.style.display=(okF&&okQ)?'':'none';
  });
}
function colFilterSel(v){colState.f=v;colApply()}
function colSearch(v){colState.q=v.trim();colApply()}
function toggleGrp(id){
  var c=document.getElementById(id);
  if(!c)return;
  var body=c.querySelector('.grp-body');
  if(c.classList.contains('collapsed')){
    c.classList.remove('collapsed');
    body.style.maxHeight=body.scrollHeight+'px';
    setTimeout(function(){if(!c.classList.contains('collapsed'))body.style.maxHeight='1400px'},360);
  }else{
    body.style.maxHeight=body.scrollHeight+'px';
    void body.offsetHeight;
    requestAnimationFrame(function(){c.classList.add('collapsed')});
  }
}
function gcPicker(type){
  var title=type==='grade'?'选择年级':'选择班级';
  var opts=type==='grade'
    ?['一年级','二年级','三年级','四年级','五年级','六年级']
    :['(1)班','(2)班','(3)班','(4)班','(5)班'];
  var cur=document.getElementById(type==='grade'?'gc-grade':'gc-cls').textContent;
  var items=opts.map(function(o){
    var on=o===cur?'<span style="color:var(--teal);font-weight:700">✓</span>':'<span style="width:14px;display:inline-block"></span>';
    return '<button onclick="gcPick(\''+type+'\',\''+o+'\')" style="display:flex;align-items:center;gap:10px;width:100%;padding:13px 4px;border:none;background:none;font-size:15px;font-family:inherit;border-bottom:1px solid #F0F2F6;cursor:pointer;color:'+(o===cur?'var(--navy)':'var(--ink)')+';font-weight:'+(o===cur?'600':'400')+'">'+on+'<span>'+o+'</span></button>';
  }).join('');
  sheet('<h3>'+title+'</h3><div style="margin:4px 0 8px">'+items+'</div><button class="btn ghost blk" style="margin-top:6px" onclick="closeSheet()">取消</button>');
}
function gcPick(type,val){
  document.getElementById(type==='grade'?'gc-grade':'gc-cls').textContent=val;
  closeSheet();
  toast('已切换至 '+document.getElementById('gc-grade').textContent+document.getElementById('gc-cls').textContent);
}
/* -------- 信息确认详情：动态填充学生信息 / 确认 / 取消确认弹框 -------- */
var _go_orig=go;
go=function(id,name,cls){
  _go_orig(id);
  if(!name)return;
  if(id==='sc-cf-edit'){
    var ch=(name||'').charAt(0);
    document.getElementById('cf-edit-avatar').textContent=ch;
    document.getElementById('cf-edit-avatar').className='avatar';
    document.getElementById('cf-edit-name').textContent=name;
    document.getElementById('cf-edit-cls').textContent=(cls||'')+' · 待确认';
    var nmInput=document.querySelector('#sc-cf-edit input[type=text]');
    if(nmInput)nmInput.value=name;
  }
  if(id==='sc-cf-view'){
    var ch2=(name||'').charAt(0);
    document.getElementById('cf-view-avatar').textContent=ch2;
    document.getElementById('cf-view-avatar').className='avatar';
    document.getElementById('cf-view-name').textContent=name;
    document.getElementById('cf-view-cls').textContent=(cls||'')+' · 已确认';
    var nmInput2=document.querySelector('#sc-cf-view input[type=text]');
    if(nmInput2)nmInput2.value=name;
  }
};
function cfConfirm(){
  go('sc-apply');
  toast('已确认，信息无误');
}
function cfClsRadio(el){
  var labels=el.closest('div').querySelectorAll('label');
  labels.forEach(function(l){
    var r=l.querySelector('input[type=radio]');
    if(r.checked){
      l.style.borderColor='var(--navy)';
      l.style.background='rgba(46,124,240,.07)';
      l.style.color='var(--navy)';
      l.style.fontWeight='600';
    }else{
      l.style.borderColor='var(--line)';
      l.style.background='';
      l.style.color='var(--ink-2)';
      l.style.fontWeight='400';
    }
  });
}
function cfCancelConfirm(){
  var mask=document.createElement('div');
  mask.className='modal-mask';
  mask.innerHTML='<div class="modal-box"><div class="m-title">提示</div><div class="m-body">确定取消确认？</div><div class="m-btns"><button class="m-cancel">取消</button><button class="m-ok">确定</button></div></div>';
  document.body.appendChild(mask);
  void mask.offsetHeight;
  requestAnimationFrame(function(){mask.classList.add('show')});
  mask.querySelector('.m-cancel').onclick=function(){
    mask.classList.remove('show');
    setTimeout(function(){mask.remove()},220);
  };
  mask.querySelector('.m-ok').onclick=function(){
    mask.classList.remove('show');
    setTimeout(function(){mask.remove();go('sc-apply')},220);
  };
}
/* 校徽参考样式卡二维码（示意图形，非真实编码，与家长端同款） */
(function(){
  const qr='<svg viewBox="0 0 33 33"><rect width="33" height="33" fill="#fff"/><g fill="#1B2431"><rect x="2" y="2" width="7" height="7"/><rect x="24" y="2" width="7" height="7"/><rect x="2" y="24" width="7" height="7"/><path d="M11 2h2v2h-2zM15 2h2v2h-2zM19 3h2v2h-2zM12 5h2v2h-2zM16 5h3v2h-3zM20 6h2v2h-2zM2 11h2v2h-2zM5 12h2v2h-2zM8 10h2v3h-2zM11 11h3v2h-3zM16 10h2v2h-2zM19 11h2v3h-2zM23 10h2v2h-2zM27 11h2v2h-2zM3 15h2v2h-2zM7 16h2v2h-2zM11 15h2v3h-2zM15 15h3v2h-3zM20 16h2v2h-2zM24 15h2v2h-2zM28 16h2v2h-2zM2 19h2v2h-2zM6 20h3v2h-3zM12 19h2v2h-2zM16 20h2v2h-2zM21 19h2v2h-2zM26 20h2v2h-2zM29 19h2v2h-2zM11 23h2v2h-2zM14 24h2v2h-2zM18 23h3v2h-3zM24 24h2v2h-2zM28 23h2v2h-2zM12 27h2v2h-2zM16 28h2v2h-2zM20 27h2v2h-2zM24 28h3v2h-3zM29 27h2v2h-2z"/></g><g fill="#fff"><rect x="3.5" y="3.5" width="4" height="4"/><rect x="25.5" y="3.5" width="4" height="4"/><rect x="3.5" y="25.5" width="4" height="4"/></g><g fill="#1B2431"><rect x="4.5" y="4.5" width="2" height="2"/><rect x="26.5" y="4.5" width="2" height="2"/><rect x="4.5" y="26.5" width="2" height="2"/></g></svg>';
  document.querySelectorAll('.id-badge .qr').forEach(e=>e.innerHTML=qr);
})();
function roleSheet(){sheet(`<h3>切换为家长身份</h3>
 <div class="desc">您的手机号同时存在家长账号。确定切换为家长身份吗？</div>
 <button class="btn pri blk" onclick="location.href='parent.html'">确认切换</button>
 <button class="btn ghost blk" style="margin-top:9px" onclick="closeSheet()">取消</button>`)}
/* -------- 消息落点：有业务对象的深链业务详情；纯通知类用半屏 sheet 展示全文 + 行动按钮 -------- */
function goLeaveDone(){go('sc-leave');lvTab(document.querySelector('#lv-tabs .fchip:nth-child(3)'),'approved')}
function msgLeaveSheet(){sheet(`<h3>请假单 · 审批结果</h3>
 <div class="desc">LV-20260704-021 · 林晓乐 · 病假<br>时段：7月7日 08:00–12:00 · 附医院证明<br>审批：王老师 今天 09:12 通过 · 结果已同步双家长<br>若当日实际到校，将自动核销为「实际到校」并通知家长。</div>
 <button class="btn pri blk" onclick="closeSheet();goLeaveDone()">查看已办结记录</button>
 <button class="btn ghost blk" style="margin-top:9px" onclick="closeSheet()">关闭</button>`)}
function msgDegradeSheet(){sheet(`<h3>降级模式已生效（暴雨）</h3>
 <div class="desc">今天 07:30 起生效 · 天气 API 触发（暴雨橙色预警）。<br>融合窗放宽至 ±5 秒；低质量帧不进比对（宁判无脸，不低质误配）；「未见脸」软标记当日不计入行为模式统计。</div>
 <div class="note warn">降级日疑似缺勤增多属预期：建议按班批量核对，与到班点名比对后一键补录。</div>
 <button class="btn pri blk" onclick="closeSheet();go('sc-batch')">去批量核对（10 条）</button>
 <button class="btn ghost blk" style="margin-top:9px" onclick="closeSheet()">关闭</button>`)}
/* -------- 消息未读：首页铃铛角标 /「我的」入口 / 消息中心红点三处联动（data-m 同键同消息） -------- */
function updateMsgCnt(){
  const n=new Set([...document.querySelectorAll('.unread-dot')].map(d=>d.dataset.m)).size;
  document.querySelectorAll('[data-msgcnt]').forEach(e=>{e.textContent=n;e.style.display=n?'':'none'});
  document.querySelectorAll('[data-msgtxt]').forEach(e=>{e.textContent=n+' 条未读';e.style.display=n?'':'none'});
}
function markRead(m){
  document.querySelectorAll('.unread-dot[data-m="'+m+'"]').forEach(d=>d.remove());
  updateMsgCnt();
}
function markAllRead(){
  document.querySelectorAll('.unread-dot').forEach(d=>d.remove());
  updateMsgCnt();
  toast('已全部标为已读');
}
updateMsgCnt();
