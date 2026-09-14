/* V1.0 PRD adapter. Local prototype simulation; no production APIs. */
const ceV1={role:'校长',businessDate:ceDateKey(new Date()),sessionDate:null,busy:false,submitMode:'success',submissions:{},groupAudit:[]};
const ceTeacherHomeUrl='https://olivebird.netlify.app/ssb/teacher.html#sc-home';
function ceReturnTeacherHome(){window.location.href=ceTeacherHomeUrl}
ceLedger.submissions=ceLedger.submissions||{};
ceLedger.records.forEach(r=>{if(!r.createdBy)r.createdBy=r.people==='王老师'?ceRecordCurrentTeacherId:'other-teacher'});
function ceV1Unit(v){return Math.min(99999,Math.max(0,Math.round(Number(v)||0)))}
ceTodayChecks.forEach(d=>d.unitTenths=ceV1Unit(d.unitTenths));
ceTodayValidate=function(e){
  const d=ceTodayDefinitionForId(e.checkId);
  if(!d||d.enabled===false){toast('学生状态错误，请重新进入');return false}
  if(e.checkSignature!==ceTodayCheckSignature(d)){toast('检查项已变更，请重新进入当前页面');return false}
  if(!ceRequireEvaluationPermission(ceSessionClasses()))return false;
  if(e.students.length){const groups=ceStudentGroups();for(const id of e.students){const [name,student]=id.split('::'),c=ceClassByName(name);if(!c||!c.students.includes(student)||!groups.some(g=>g.name===name)){toast('学生状态错误，请重新进入');return false}}}
  const text=String(e.manualInput??e.manualTenths/10);
  if(!/^\d+(\.\d)?$/.test(text)){toast('请输入分值，最多一位小数');return false}
  const n=Math.round(Number(text)*10);
  if(n<ceTodayMinTenths){toast(ceTodayMinMessage);return false}
  if(n>99999){toast(ceTodayMaxMessage);return false}
  e.manualTenths=n;ceTodaySyncScore(e);return true;
};
const ceV1Open=ceTodayOpenDefinition;
ceTodayOpenDefinition=function(d,old){if(!d){toast('学生状态错误，请重新进入');return}d.unitTenths=ceV1Unit(d.unitTenths);ceV1Open(d,old)};
ceTodayToggleStudent=function(id){
  if(!ceDraft||ceEditingId||!ceStudentGroups().some(g=>g.students.some(s=>g.name+'::'+s===id)))return;
  const has=ceDraft.students.includes(id);
  ceDraft.students=has?ceDraft.students.filter(x=>x!==id):ceDraft.students.concat(id);
  ceTodaySyncScore(ceDraft);ceSheetRender();
};
const ceV1Sync=ceTodaySyncScore;
ceTodaySyncScore=function(d){if(ceEditingId){const r=ceLedger.records.find(x=>x.id===ceEditingId);if(r){d.score=Number(r.value);return}}ceV1Sync(d)};
const ceV1Enter=ceEnterToday;
ceEnterToday=function(names,student){
  const source=curScreen;
  ceV1.todayReturn=source==='ce-records'?'ce-records':source==='ce-rank'?'ce-rank':'ce-multi';
  ceState.category=ceCategories[0];ceState.subcategory='全部维度';
  const ok=ceV1Enter(names,student);
  if(ok){ceV1.sessionDate=ceV1.businessDate;ceV1.batchId=ceNewId();ceRecordReturn=ceV1.todayReturn==='ce-records'?'records':'detail'}
  return ok;
};
const ceV1Go=go;
go=function(id){
  if(ceV1.busy){toast('提交结果确认中，请稍候');return}
  if(id==='ce-settings'&&ceV1.role!=='校长'){toast('暂无设置权限');return}
  if(curScreen==='ce-today'&&id!=='ce-today'){ceState.entries=[];ceDraft=null;ceEditingId=null;ceRecalcSession()}
  closeSheet();ceV1Go(id);ceV1Nav();
};
function ceV1Nav(){
 document.querySelectorAll('.ce-tabbar button').forEach(b=>{if(b.getAttribute('onclick')?.includes('ce-settings'))b.hidden=ceV1.role!=='校长'});
 const back=document.querySelector('#ce-today .sub-hd .back');if(back)back.onclick=ceAskLeaveToday;
 ['ce-rank','ce-multi','ce-records'].forEach(id=>{const mainBack=document.querySelector('#'+id+' .sub-hd .back');if(mainBack)mainBack.onclick=ceReturnTeacherHome});
}
function ceAskLeaveToday(){
  sheet('<div class="ce-settings-confirm ce-leave-today-confirm"><h3>返回</h3><p>确定返回将清空所选检查项的填写记录？</p><footer><button class="ce-popup-cancel" onclick="closeSheet()">取消</button><button class="ce-popup-confirm" onclick="go(ceV1.todayReturn||\'ce-multi\')">确定</button></footer></div>');
}
function ceV1ClassDetailSheet(){
  const classes=ceSessionClasses().filter(Boolean);
  const rows=classes.map(c=>'<div class="ce-class-lock-card"><span>'+ceEscape(ceClassDisplayName(c))+'</span></div>').join('');
  sheet('<div class="ce-class-detail-sheet"><h3>锁定班级</h3><div class="ce-class-detail-scroll ce-class-lock-grid">'+(rows||'<div class="ce-class-detail-empty">暂无评价班级</div>')+'</div></div>');
}
function ceV1ActionBar(){
 const bar=document.getElementById('ce-actionbar');
 if(!bar||curScreen!=='ce-today')return;
 const classes=ceSessionClasses().filter(Boolean);
  bar.innerHTML='<div class="ce-classpick ce-locked"><b>评价班级 · '+classes.length+'个</b><button class="ce-classpick-detail" onclick="ceV1ClassDetailSheet()">锁定班级 ›</button></div><button class="ce-done" onclick="ceFinish()">完成评价</button>';
}
ceRecordIsMine=r=>!!r&&r.createdBy===ceRecordCurrentTeacherId;
ceRecordCanManage=r=>ceRecordIsMine(r)&&r.date>=ceSchoolConfig.schoolYearStart&&r.date<=ceV1.businessDate&&!(curScreen==='ce-records'&&ceRecordMode==='class');
ceEditableRecord=ceRecordCanManage;
function ceV1Sort(a,b){return String(b.time).localeCompare(String(a.time))||String(ceClassById(a.classId)?.createdAt).localeCompare(String(ceClassById(b.classId)?.createdAt))||String(a.id).localeCompare(String(b.id))}
const ceV1Filter=ceRecordFiltered;
ceRecordFiltered=function(){
 const q=ceRecordFilter.keyword;ceRecordFilter.keyword='';
 try{return ceV1Filter().filter(r=>!q.trim()||String(r.students||'').toLowerCase().includes(q.trim().toLowerCase())).sort(ceV1Sort)}
 finally{ceRecordFilter.keyword=q}
};
const ceV1Mode=ceRecordSetMode;
ceRecordSetMode=function(mode){const clazz=ceRecordFilter.className;ceV1Mode(mode);if(ceRecordClasses().some(c=>c.name===clazz))ceRecordFilter.className=clazz;ceRender()};
ceRecordCard=function(r){
 const mine=ceRecordCanManage(r),readonly=curScreen==='ce-records'&&ceRecordMode==='class',clickable=curScreen==='ce-records'?'':(readonly?'':'onclick="ceEnterToday([\''+ceEscape(r.clazz)+'\'])"');
  const students=String(r.students||'').trim()||'--',content=String(r.text||'').trim()||'--';
  return '<article class="ce-detail-record-card"><div class="top"><span class="ce-record-fixed-icon" aria-hidden="true"></span><div><button class="ce-record-card-title" '+clickable+'>'+ceEscape(ceClassDisplayName(r.clazz))+'</button><div class="meta">'+ceEscape(r.time)+'</div></div><span class="badge '+(r.type==='加分'?'plus':'')+'">'+r.type+'</span><span class="amount '+(r.type==='加分'?'plus':'')+'">'+(r.type==='加分'?'+':'')+Number(r.value).toFixed(1)+'</span>'+(mine?'<button class="ce-record-more" onclick="ceRecordActions(\''+r.id+'\')">⋯</button>':'')+'</div><div class="body">指标维度：'+ceEscape(r.category)+'<br>检查项目：'+ceEscape(r.items)+'<br>评价人员：'+ceEscape(ceRecordDisplayPeople(r))+'<br>关联学生：'+ceEscape(students)+'<br><span class="ce-record-evaluation-row"><span class="ce-record-evaluation-label">评价内容：</span><span class="ce-record-evaluation-content">'+ceEscape(content).replace(/\n/g,'<br>')+'</span></span></div></article>';
};
function ceV1Dates(d){
  if(!d.executionStart||!d.executionEnd){toast('请选择完整日期范围');return false}
 if(d.executionStart>d.executionEnd){toast('开始日期不能晚于结束日期');return false}
 const max=ceDateFromKey(d.executionStart);max.setFullYear(max.getFullYear()+1);
 if(d.executionEnd>ceDateKey(max)){toast('执行时间不能超过一年');return false}return true;
}
cePreviewConfirmSettingsDate=function(){
 const v=cePreviewSettingsDateDraft;
 if(!ceV1Dates({executionStart:v.start,executionEnd:v.end}))return;
 Object.assign(ceSettingsState.draft,{executionStart:v.start,executionEnd:v.end});ceSettingsGroupForm();
};
const ceV1Save=ceSettingsSaveGroup;
ceSettingsSaveGroup=function(){
 if(ceV1.role!=='校长'){toast('暂无设置权限');return}
 const d=ceSettingsState.draft;
 if(!ceV1Dates(d))return;
 if(ceSettingsGroups.some(g=>g.id!==d.id&&g.name===d.name.trim())){toast('小组名称已存在，请重新输入');return}
 ceV1Save();
};
const ceV1DeleteGroup=ceSettingsDeleteGroup;
ceSettingsDeleteGroup=function(id){
 if(ceV1.role!=='校长'){toast('暂无设置权限');return}
 const g=ceSettingsGroups.find(x=>x.id===id);if(g)ceV1.groupAudit.push({...structuredClone(g),deletedBy:ceRecordCurrentTeacherId,deletedAt:new Date().toISOString()});
 ceV1DeleteGroup(id);
};
// Selection cancel restores the form draft; selection scroll stays in place.
const ceV1TeacherPicker=ceSettingsTeacherPicker;
ceSettingsTeacherPicker=function(){
 if(!ceSettingsState.teacherDraftBackup)ceSettingsState.teacherDraftBackup=ceSettingsState.draft.teachers.slice();
 const old=document.querySelector('.ce-teacher-pick-scroll'),top=old?.scrollTop||0;
 ceV1TeacherPicker();
 const list=document.querySelector('.ce-teacher-pick-scroll');if(list)list.scrollTop=top;
 const foot=document.querySelector('.ce-teacher-picker .ce-popup-footer');
 if(foot){foot.children[0].onclick=()=>{ceSettingsState.draft.teachers=ceSettingsState.teacherDraftBackup;ceSettingsState.teacherDraftBackup=null;ceSettingsGroupForm()};
 foot.children[1].onclick=()=>{ceSettingsState.teacherDraftBackup=null;ceSettingsGroupForm()}}
};
ceFinish=async function(){
 if(ceV1.busy)return;
 if(ceV1.sessionDate!==ceV1.businessDate){toast('当前评价日期已变更，无法提交今日评价');return}
 if(!ceRequireEvaluationPermission(ceSessionClasses()))return;
 if(!ceState.entries.length){toast('请先选择检查项');return}
 for(const e of ceState.entries)if(!ceTodayValidate(e))return;
 ceV1.busy=true;
 const batch=ceV1.batchId||(ceV1.batchId=ceNewId());
 try{
   if(ceV1.submitMode==='failed'){toast('本次评价提交失败，请重新进入页面编写');return}
   if(ceV1.submitMode==='unknown'){toast('提交结果确认中，请稍候');await new Promise(r=>setTimeout(r,900))}
   if(!ceLedger.submissions[batch]){
    if(ceV1.sessionDate!==ceV1.businessDate){toast('当前评价日期已变更，无法提交今日评价');return}
    if(!ceRequireEvaluationPermission(ceSessionClasses()))return;
    for(const e of ceState.entries)if(!ceTodayValidate(e))return;
    const now=new Date(),date=ceV1.sessionDate,time=date+' '+now.toTimeString().slice(0,8);
    const records=ceState.entries.flatMap(e=>ceEntryTargets(e).map(classId=>{
      const c=ceClassById(classId),ids=e.students.filter(id=>id.split('::')[0]===c.name);
      return {id:ceNewId(),batchId:batch,classId,clazz:c.name,date,time,type:e.type,value:String(ceTodayClassScore(e,classId)),items:e.item,category:e.category,people:ceRecordCurrentTeacherName,createdBy:ceRecordCurrentTeacherId,students:ceStudentText(ids),studentIds:ids,text:e.text,media:structuredClone((e.media||[]).filter(m=>m.progress===100&&!m.failed)),checkId:e.checkId,checkSignature:e.checkSignature,unitTenths:e.unitTenths,manualTenths:e.manualTenths,updatedAt:now.toISOString()};
    }));
    ceLedger.records.unshift(...records);ceLedger.submissions[batch]=records.map(r=>r.id);
    records.forEach(r=>ceSnapshot(r.classId,r.date));cePersist();
   }
   ceState.entries=[];ceRecalcSession();ceRefreshTotals();ceV1.busy=false;go('ce-records');toast('评价已提交');
 }finally{ceV1.busy=false;ceV1.submitMode='success'}
};
const ceV1Render=ceRender;
ceRender=function(){
 const active=document.activeElement,selector=active?.closest('.ce-record-search')?'.ce-record-search input':null;
 const pos=active?.selectionStart;
 ceV1Render();ceV1Nav();ceV1ActionBar();
 if(selector){const el=document.querySelector(selector);if(el){el.focus();if(pos!=null)el.setSelectionRange(pos,pos)}}
};
// Top-level explanation keeps all exceptional cases and role demonstrations together.
function ceV1Role(role){ceV1.role=role;go('ce-rank');toast('演示身份：'+role)}
function ceV1Scenario(kind){
 if(kind==='crossday'){ceV1.sessionDate=cePreviewDateKeyShift(ceV1.businessDate,-1);toast('跨日演示已开启，请点击完成评价');return}
 if(kind==='unknown'||kind==='failed'){ceV1.submitMode=kind;toast('提交演示已就绪，请点击完成评价');return}
 const messages={student:'学生状态错误，请重新进入',changed:'检查项已变更，请重新进入当前页面',invalid:'当前校徽无效，请重新扫码',unbound:'学生校徽尚未绑定',permission:'暂无点评权限',camera:'无摄像头权限，请打开摄像头',network:'网络错误，请重新上传'};
 toast(messages[kind]||'');
}
for(const id of ['ce-rank','ce-multi','ce-today','ce-records','ce-settings']){
 if(demoInfo[id]){
  demoInfo[id].d+=' 本文件为V1.0本地交互演示。学校端接口、扫码和上传进度使用模拟数据；正式权限与业务日期由服务端判断。除校长展示排行、评价、记录、设置4个tab外，班主任、任课老师等其他角色前端不展示设置tab。';
  demoInfo[id].a.push(['身份：校长',"ceV1Role('校长')"],['身份：班主任',"ceV1Role('班主任')"],['身份：任课老师',"ceV1Role('任课老师')"]);
 }
}
demoInfo['ce-today'].a.push(...[['跨日提交','crossday'],['提交结果确认中','unknown'],['提交失败','failed'],['学生状态错误','student'],['检查项变更','changed'],['校徽无效','invalid'],['校徽未绑定','unbound'],['无权限','permission'],['无摄像头权限','camera'],['上传失败','network']].map(([n,k])=>[n,"ceV1Scenario('"+k+"')"]));
document.addEventListener('visibilitychange',()=>{if(!document.hidden)ceV1.businessDate=ceDateKey(new Date())});
setInterval(()=>{ceV1.businessDate=ceDateKey(new Date())},1000);
ceV1Nav();

ceDeleteStored=function(i){
 const overlay=document.createElement('div');overlay.className='ce-confirm-overlay';
 overlay.innerHTML='<div class="ce-confirm-dialog" role="alertdialog"><h3>删除</h3><p>确定删除该检查项内容？</p><footer><button class="ce-popup-cancel">取消</button><button class="ce-popup-confirm">确定</button></footer></div>';
 overlay.querySelectorAll('button')[0].onclick=()=>overlay.remove();
 overlay.querySelectorAll('button')[1].onclick=()=>{ceState.entries.splice(i,1);ceRecalcSession();ceRender();overlay.remove()};
 document.querySelector('.phone').appendChild(overlay);
};
const ceV1DateAllowed=ceDateAllowed;
ceDateAllowed=key=>ceV1DateAllowed(key)&&key<=ceV1.businessDate;
const ceV1Calendar=ceCalendarPanel;
ceCalendarPanel=function(){return ceV1Calendar().replace(/class="outside"/g,'disabled class="outside"')};

// 年级筛选即时生效，保留多选；点击遮罩关闭，无需确认。
function ceV1GradeSheet(kind){
 const selected=ceState[kind+'Grades']||['全部年级'];
 const cards=['全部年级',...ceRankGrades].map(g=>'<button class="ce-rank-filter-card '+(selected.includes(g)?'on':'')+'" onclick="'+(kind==='rank'?'ceRankGradeToggle':'ceEvalGradeToggle')+'(\''+g+'\')">'+ceEscape(g)+'</button>').join('');
 sheet('<h3 style="text-align:center;margin-bottom:12px">选择年级</h3><div class="ce-rank-filter-grid">'+cards+'</div>');
}
ceRankGradeSheet=()=>ceV1GradeSheet('rank');
ceEvalGradeSheet=()=>ceV1GradeSheet('eval');
const ceV1RankGradeToggle=ceRankGradeToggle,ceV1EvalGradeToggle=ceEvalGradeToggle;
ceRankGradeToggle=function(g){ceV1RankGradeToggle(g);ceRender()};
ceEvalGradeToggle=function(g){ceV1EvalGradeToggle(g);ceRender()};
