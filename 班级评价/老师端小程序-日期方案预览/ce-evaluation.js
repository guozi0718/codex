/* 2026-09-05 确认口径。学校配置及数据均为本地演示；未连接学校端。 */
const ceDemoToday = ceDateKey(new Date());
const ceDemoYear = new Date().getFullYear() - (new Date().getMonth()<7?1:0);
const ceSchoolConfig = {
  source:'学校端指标库', schoolYearStart:ceDemoYear+'-08-01', schoolYearEnd:(ceDemoYear+1)+'-07-31',
  // 演示校历；正式学年/学期边界须由学校端提供，不能作为固定业务规则。
  semesterStart:new Date().getMonth()>=1&&new Date().getMonth()<7?(ceDemoYear+1)+'-02-01':ceDemoYear+'-08-01',
  dimensions:ceCategories.map(name=>({name,baseScore:20}))
};
const ceSchoolClasses = ceEvalGroups.flatMap((g,gi)=>g.classes.map((name,ci)=>({
  id:'class-'+gi+'-'+ci,name,grade:g.grade,createdAt:'2020-08-'+String(gi*3+ci+1).padStart(2,'0')+'T08:00:00',
  students:ceClassRoster[name]||['王强','周欢','黎明']
})));
// 当前老师的有效评价范围（本地演示）。正式由配置接口解析返回，非永久按年级硬编码。
// 两处配置如何合并及优先级尚未约定，此处不自行定义合并规则。
const ceTeacherPermissions={
  teacherId:'teacher-demo',
  sources:['学校端设定的点评教师配置','老师端值周老师选定老师和对应范围'],
  classIds:ceSchoolClasses.filter(c=>c.grade!=='四年级').map(c=>c.id)
};
function ceRequireEvaluationPermission(classes){
  if(!classes.length||classes.some(c=>!c||!ceTeacherPermissions.classIds.includes(c.id))){toast('暂无点评权限');return false}
  return true;
}
function ceSessionClasses(){return ceState.allowedClassIds?ceState.allowedClassIds.map(ceClassById):[ceClassByName(ceState.selectedClass)]}
function ceEscape(s){return String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
function ceClassByName(name){const raw=String(name||'').replace('-', '');return ceSchoolClasses.find(c=>c.name===raw)}
function ceClassDisplayName(value){const c=typeof value==='string'?ceClassByName(value):value;if(!c)return String(value||'');return c.grade+'-'+String(c.name).replace(c.grade,'')}
function ceClassById(id){return ceSchoolClasses.find(c=>c.id===id)}
function ceRound(n){return Math.round((n+Number.EPSILON)*100)/100}
function ceNewId(){return 'record-'+Date.now()+'-'+Math.random().toString(36).slice(2,9)}
function ceSeedRecords(){
  const records=[];
  ceSchoolClasses.forEach((c,i)=>{
    [0,1,3,10,35].forEach((offset,di)=>{
      const day=new Date();day.setDate(day.getDate()-offset);const date=ceDateKey(day);
      if(date<ceSchoolConfig.schoolYearStart)return;
      // 两个班完全同分，以验证并列排名；其他维度亦有独立记录。
      const seed=i===2?1:i, dim=ceCategories[(seed+di)%ceCategories.length];
      const sub=Object.keys(ceSubcategories[dim])[0];
      ['加分','扣分'].forEach(type=>{
        let value=type==='加分'?((seed+di)%4)*.2:-((seed+di)%5)*.2;
        if(i===0&&offset===0&&type==='扣分')value=-101;
        if(i===3&&offset===0&&type==='加分')value=120;
        if(!value)return;
        records.push({id:ceNewId(),classId:c.id,clazz:c.name,date,time:date+' '+(type==='加分'?'10:35':'11:07'),type,value:String(ceRound(value)),category:dim+'·'+sub,items:ceSubcategories[dim][sub][type][0],people:'郭子校长（值周老师）',students:'',studentIds:[],text:'',media:[],updatedAt:new Date().toISOString()});
      });
    });
  });return records;
}
const ceStorageKey='ce-evaluation-records-date-preview-v1';
let ceLedger;
try{ceLedger=JSON.parse(localStorage.getItem(ceStorageKey))}catch(e){}
if(!ceLedger||ceLedger.seedDate!==ceDemoToday||!Array.isArray(ceLedger.records)){
  // 跨日保留已存记录，演示数据仅在首次启动时生成。
  if(!ceLedger||!Array.isArray(ceLedger.records))ceLedger={seedDate:ceDemoToday,records:ceSeedRecords(),snapshots:{}};
}
ceLedger.snapshots=ceLedger.snapshots||{};
ceState.records=ceLedger.records;
function cePersist(){try{localStorage.setItem(ceStorageKey,JSON.stringify(ceLedger))}catch(e){toast('浏览器未允许保存，本次修改仅在当前页面有效')}}
function ceRefreshTotals(){ceState.plus=ceRound(ceLedger.records.reduce((s,r)=>s+Math.max(0,Number(r.value)),0));ceState.minus=ceRound(ceLedger.records.reduce((s,r)=>s+Math.max(0,-Number(r.value)),0))}
function ceRecordsFor(classId,start,end,dimension='全部维度'){
  return ceLedger.records.filter(r=>(!classId||r.classId===classId)&&r.date>=start&&r.date<=end&&(dimension==='全部维度'||r.category.split('·')[0]===dimension));
}
function ceTotals(records){return {plus:ceRound(records.reduce((s,r)=>s+Math.max(0,Number(r.value)),0)),minus:ceRound(records.reduce((s,r)=>s+Math.max(0,-Number(r.value)),0)),count:records.length}}
function ceSnapshot(classId,date){const records=ceRecordsFor(classId,date,date);ceLedger.snapshots[classId+'::'+date]={classId,date,updatedAt:new Date().toISOString(),...ceTotals(records)};return ceLedger.snapshots[classId+'::'+date]}
function ceSaveChange(r){ceSnapshot(r.classId,r.date);ceRefreshTotals();cePersist();ceRender()}
ceRefreshTotals();cePersist();

function cePeriodStart(period){let start=ceSchoolConfig.schoolYearStart;
  if(period==='今日')start=ceDemoToday;
  if(period==='本周')start=ceDateKey(ceWeekStart(new Date()));
  if(period==='本月')start=ceDemoToday.slice(0,7)+'-01';
  if(period==='本学期')start=ceSchoolConfig.semesterStart;
  if(period==='本学年')start=ceSchoolConfig.schoolYearStart;
  return start<ceSchoolConfig.schoolYearStart?ceSchoolConfig.schoolYearStart:start;
}
ceRankPeriodSheet=function(){sheet('<h3 style="text-align:center">选择统计周期</h3><div class="ce-rank-filter-grid">'+['本周','本月','本学期','本学年'].map(p=>'<button class="ce-rank-filter-card '+(ceState.rankPeriod===p?'on':'')+'" onclick="ceState.rankPeriod=\''+p+'\';closeSheet();ceRender()">'+p+'</button>').join('')+'</div>')};
ceRankScore=function(c){const all=ceState.rankDimension==='全部维度';const dims=all?ceSchoolConfig.dimensions:ceSchoolConfig.dimensions.filter(d=>d.name===ceState.rankDimension);const net=dims.reduce((sum,d)=>{const t=ceTotals(ceRecordsFor(c.id,cePeriodStart(ceState.rankPeriod),ceDemoToday,d.name));return sum+t.plus-t.minus},0);return ceRound((all?100:0)+net)};
ceRankRows=function(){const rows=ceSchoolClasses.filter(c=>ceState.rankGrades.includes('全部年级')||ceState.rankGrades.includes(c.grade)).map(row=>({row,score:ceRankScore(row)})).sort((a,b)=>b.score-a.score||a.row.createdAt.localeCompare(b.row.createdAt));rows.forEach((r,i)=>r.rank=i&&r.score===rows[i-1].score?rows[i-1].rank:i+1);return rows};
ceRankPage=function(){return '<div class="ce-hero"><span class="eyebrow">班级评价</span><h1>排行榜</h1><span class="ce-cup">🏆</span></div><div class="ce-filter"><button onclick="ceRankGradeSheet()">'+ceRankGradeLabel()+ceFilterArrow()+'</button><button onclick="ceRankPeriodSheet()">'+ceState.rankPeriod+ceFilterArrow()+'</button></div><div class="ce-chips">'+ceDimensions.map(d=>'<button class="ce-chip '+(d===ceState.rankDimension?'on':'')+'" onclick="ceState.rankDimension=\''+d+'\';ceRender()">'+d+'</button>').join('')+'</div><div class="ce-rank-list"><div class="ce-table"><div class="ce-table-head"><span>排名</span><span>班级</span><span style="text-align:right">总分</span></div>'+ceRankRows().map(r=>'<div class="ce-rank-row"><span class="ce-medal">'+(r.rank<=3?['🥇','🥈','🥉'][r.rank-1]:'<span class="ce-rank-number">'+r.rank+'</span>')+'</span><span>'+ceClassDisplayName(r.row)+'</span><span class="score">'+r.score+'</span></div>').join('')+'</div></div>'};
ceInfo=function(){sheet('<h3>总分统计说明</h3><div class="ce-modal-body">1.评分方式：按时间维度进行总分排名。<br>2.总分计算：某一时间维度下，总分=初始总分-总扣分+总加分。<br>3.默认初始总分：学校端系统统一配置。</div><button class="btn pri blk" onclick="closeSheet()">关闭</button>')};

function ceFold(collapsed){return '<i class="ce-fold '+(collapsed?'closed':'')+'" aria-hidden="true"></i>'}
ceEvalClassStats=function(name){const c=ceClassByName(name);return ceTotals(ceRecordsFor(c.id,ceState.evalDate,ceState.evalDate,ceState.evalDimension))};
function ceEnterToday(names,scanStudent){
  const classes=names.map(n=>ceClassByName(n));if(!ceRequireEvaluationPermission(classes))return false;
  ceState.allowedClassIds=classes.map(c=>c.id);ceState.selectedClass=classes[0].name;ceState.multiClasses=classes.map(c=>c.name);
  ceState.scanOnly=!!scanStudent;ceState.scanStudent=scanStudent||'';ceState.entries=[];ceRecalcSession();ceDraft=null;ceState.todayTab='扣分';closeSheet();go('ce-today');return true;
}
ceScanClassSheet=function(clazz='一年级1班'){
  const c=ceClassByName(clazz);if(!ceRequireEvaluationPermission([c]))return;
  const student=c.students[0];
  sheet('<h3 style="text-align:center">扫校徽码评价</h3><div class="ce-modal-body" style="text-align:center;padding:18px">已识别校徽学生：'+ceEscape(student)+'<br>当前实时归属班级：'+ceEscape(ceClassDisplayName(c))+'</div><button class="btn pri blk" onclick="ceEnterToday([\''+c.name+'\'],\''+c.name+'::'+student+'\')">进入评价</button><button class="btn ghost blk" style="margin-top:10px" onclick="ceScanClassSheet(\'四年级1班\')">演示：扫描四年级校徽</button><button class="btn ghost blk" style="margin-top:10px" onclick="ceScanInvalidBadge()">演示：扫描无效校徽</button><button class="btn ghost blk" style="margin-top:10px" onclick="closeSheet()">取消</button>');
};
function ceScanInvalidBadge(){toast('当前校徽无效，请重新扫码')}
ceMultiPage=function(){ceEnsureEvalDate();return ceCalendarPanel()+'<div class="ce-multi-filter"><button onclick="ceEvalGradeSheet()">'+ceEvalGradeLabel()+ceFilterArrow()+'</button><button onclick="ceEvalDimensionSheet()">'+ceState.evalDimension+ceFilterArrow()+'</button></div><div class="ce-eval-scroll">'+ceEvalGroups.filter(g=>ceState.evalGrades.includes('全部年级')||ceState.evalGrades.includes(g.grade)).map(g=>{const i=ceEvalGroups.indexOf(g),closed=ceState.evalCollapsed[i];return '<div class="ce-overview-group ce-eval-group '+(closed?'collapsed':'')+'"><button class="ce-overview-group-title ce-eval-group-title" onclick="ceToggleEvalGrade('+i+')">'+ceFold(closed)+g.grade+'（'+g.classes.length+'）</button><div class="ce-overview-grid">'+g.classes.map(name=>{const s=ceEvalClassStats(name);return '<div class="ce-overview-card"><button class="ce-class-name" onclick="ceEnterToday([\''+name+'\'])">'+name.replace(g.grade,'')+'</button><div class="ce-overview-scores"><button onclick="ceOpenScoreRecords(\''+name+'\',\'加分\')"><b class="plus">'+ceEvalScoreText(s.plus,'plus')+'</b>加分</button><button onclick="ceOpenScoreRecords(\''+name+'\',\'扣分\')"><b class="minus">'+ceEvalScoreText(s.minus,'minus')+'</b>扣分</button></div></div>'}).join('')+'</div></div>'}).join('')+'</div>'};
let ceMultiDraft=null;
ceMultiSelectSheet=function(){ceMultiDraft=ceState.multiClasses.slice();ceState.multiCollapsed={};ceDrawMultiPicker()};
function ceDrawMultiPicker(){const old=document.querySelector('.ce-multi-pick-scroll'),scroll=old?old.scrollTop:0;sheet('<h3 style="text-align:center">多班评价</h3><div class="ce-multi-pick-scroll">'+ceEvalGroups.map((g,i)=>{const n=g.classes.filter(c=>ceMultiDraft.includes(c)).length,closed=ceState.multiCollapsed[i];return '<div class="ce-multi-pick-group"><button class="ce-multi-pick-title" onclick="ceState.multiCollapsed['+i+']=!ceState.multiCollapsed['+i+'];ceDrawMultiPicker()">'+ceFold(closed)+g.grade+'<span class="count">（<b>'+n+'</b>/'+g.classes.length+'）</span></button>'+(closed?'':'<div class="ce-multi-pick-grid">'+g.classes.map(c=>'<button class="ce-multi-pick-card '+(ceMultiDraft.includes(c)?'on':'')+'" onclick="ceMultiPickClass(\''+c+'\')">'+c.replace(g.grade,'')+'</button>').join('')+'</div>')+'</div>'}).join('')+'</div><div class="ce-rank-sheet-foot"><button class="cancel" onclick="closeSheet()">取消</button><button class="go" onclick="ceMultiConfirm()">确定（'+ceMultiDraft.length+'）</button></div>');document.querySelector('.ce-multi-pick-scroll').scrollTop=scroll}
ceMultiPickClass=function(c){if(ceMultiDraft.includes(c)){ceMultiDraft=ceMultiDraft.filter(n=>n!==c)}else{if(!ceRequireEvaluationPermission([ceClassByName(c)]))return;ceMultiDraft=ceMultiDraft.concat(c)}ceDrawMultiPicker()};
ceMultiConfirm=function(){if(!ceMultiDraft.length){toast('请先选择班级');return}ceEnterToday(ceMultiDraft)};

function ceDateAllowed(key){return key>=ceSchoolConfig.schoolYearStart&&key<=ceSchoolConfig.schoolYearEnd}
ceEnsureEvalDate=function(){if(!ceState.evalDate||!ceDateAllowed(ceState.evalDate)){ceState.evalDate=ceDemoToday;ceState.evalWeekStart=ceDateKey(ceWeekStart(new Date()))}if(!ceState.evalCalendarMonth)ceState.evalCalendarMonth=ceDemoToday.slice(0,7)+'-01'};
function ceSelectWeek(key){const start=ceWeekStart(ceDateFromKey(key)),end=new Date(start);end.setDate(end.getDate()+6);if(start>ceWeekStart(new Date())){toast('当前周期尚未开始，无法选中');return false}if(ceDateKey(end)<ceSchoolConfig.schoolYearStart||ceDateKey(start)>ceSchoolConfig.schoolYearEnd){toast('仅可查看本学年数据');return false}ceState.evalWeekStart=ceDateKey(start);ceState.evalDate=ceState.evalWeekStart===ceDateKey(ceWeekStart(new Date()))?ceDemoToday:(ceState.evalWeekStart<ceSchoolConfig.schoolYearStart?ceSchoolConfig.schoolYearStart:ceState.evalWeekStart);return true}
ceShiftEvalWeek=function(delta){ceEnsureEvalDate();const d=ceDateFromKey(ceState.evalWeekStart);d.setDate(d.getDate()+delta*7);if(ceSelectWeek(ceDateKey(d)))ceRender()};
cePickEvalDate=function(key){if(!ceDateAllowed(key)){toast('仅可查看本学年数据');return}if(ceSelectWeek(key)){closeSheet();ceRender()}};
function ceSelectDay(key){if(!ceDateAllowed(key)){toast('仅可查看本学年数据');return}ceState.evalDate=key;ceRender()}
ceCalendarPanel=function(){ceEnsureEvalDate();return '<div class="ce-date-panel"><div class="ce-date-nav"><button onclick="ceShiftEvalWeek(-1)">◀ 上一周</button><button onclick="ceDateSheet()">'+ceWeekTitle(ceState.evalWeekStart)+ceFilterArrow()+'</button><button onclick="ceShiftEvalWeek(1)">下一周 ▶</button></div><div class="ce-date-strip">'+ceWeekDays(ceState.evalWeekStart).map(d=>'<button class="'+(ceState.evalDate===d.key?'selected ':'')+(!ceDateAllowed(d.key)?'outside':'')+'" onclick="ceSelectDay(\''+d.key+'\')">'+d.name+'<span class="date-number">'+(d.key===ceDemoToday?'今':String(d.date.getDate()).padStart(2,'0'))+'</span></button>').join('')+'</div></div>'};

let ceRecordReturn='records',ceEditingId=null,ceDetailFolds={};
function ceOpenScoreRecords(name,type){ceState.detailClass=name;ceState.detailDate=ceState.evalDate;ceState.detailDimension=ceState.evalDimension;ceState.detailTab='records';ceState.detailFilter=type;ceRecordReturn='detail';ceDetailSheetRender()}
ceOpenClass=function(name){ceOpenScoreRecords(name,'全部')};
function ceRecordCard(r){return '<article class="ce-detail-record-card"><div class="top"><span class="ce-record-fixed-icon" aria-hidden="true"></span><div><button class="ce-record-card-title" onclick="ceEnterToday([\''+r.clazz+'\'])">'+ceEscape(ceClassDisplayName(r.clazz))+'</button><div class="meta">'+ceEscape(r.time)+'</div></div><span class="badge '+(r.type==='加分'?'plus':'')+'">'+r.type+'</span><span class="amount '+(r.type==='加分'?'plus':'')+'">'+(Number(r.value)>0?'+':'')+r.value+'</span><button class="ce-record-more" aria-label="记录操作" onclick="ceRecordActions(\''+r.id+'\')">⋯</button></div><div class="body">指标维度：'+ceEscape(r.category)+'<br>检查项目：'+ceEscape(r.items)+'<br>评价人员：'+ceEscape(r.people)+(r.students?'<br>关联学生：'+ceEscape(r.students):'')+(r.text?'<br>评价内容：'+ceEscape(r.text):'')+'</div></article>'}
function ceDetailRecords(){const c=ceClassByName(ceState.detailClass),date=ceState.detailDate||ceState.evalDate;return ceRecordsFor(c.id,date,date,ceState.detailDimension||'全部维度')}
function ceSummaryRow(name,records,bold){const t=ceTotals(records);return '<div class="ce-score-detail-row"><span style="font-weight:'+(bold?700:400)+'">'+name+'</span><b class="blue">'+t.count+'</b><b class="green">'+t.plus+'</b><b class="red">'+(t.minus?-t.minus:0)+'</b></div>'}
function ceDimensionSummary(d,all){const rs=all.filter(r=>r.category.split('·')[0]===d),fold=ceDetailFolds[d],t=ceTotals(rs);return '<div class="ce-score-detail-group"><button class="ce-score-detail-row ce-dimension-toggle" onclick="ceDetailFolds[\''+d+'\']=!ceDetailFolds[\''+d+'\'];ceDetailSheetRender()"><span>'+ceFold(fold)+d+'</span><b class="blue">'+t.count+'</b><b class="green">'+t.plus+'</b><b class="red">'+(t.minus?-t.minus:0)+'</b></button>'+(fold?'':Object.keys(ceSubcategories[d]).map(s=>ceSummaryRow(s,rs.filter(r=>r.category.split('·')[1]===s),false)).join(''))+'</div>'}
ceDetailSheetRender=function(){ceRecordReturn='detail';const all=ceDetailRecords(),filtered=all.filter(r=>ceState.detailFilter==='全部'||r.type===ceState.detailFilter).sort((a,b)=>b.time.localeCompare(a.time));let body;
  if(ceState.detailTab==='records')body='<div class="ce-record-filter-row">'+['全部','扣分','加分'].map(f=>'<button class="'+(f===ceState.detailFilter?'on':'')+'" onclick="ceState.detailFilter=\''+f+'\';ceDetailSheetRender()">'+f+'</button>').join('')+'<span class="ce-record-count">评价次数：<b>'+filtered.length+'</b></span></div>'+filtered.map(ceRecordCard).join('')+(filtered.length?'':'<div class="ce-review-empty">暂无评价记录</div>');
  else body='<div class="ce-score-detail-head"><span>指标维度</span><span>评价次数</span><span>加分</span><span>扣分</span></div>'+ceSummaryRow('全部维度',all,true)+ceCategories.map(d=>ceDimensionSummary(d,all)).join('');
  sheet('<div class="ce-overview-sheet-tabs"><button class="'+(ceState.detailTab==='records'?'on':'')+'" onclick="ceState.detailTab=\'records\';ceDetailSheetRender()">评价记录</button><button class="'+(ceState.detailTab==='scores'?'on':'')+'" onclick="ceState.detailTab=\'scores\';ceDetailSheetRender()">评分明细</button></div><div class="ce-record-sheet-scroll">'+body+'</div><div class="ce-rank-sheet-foot"><button class="cancel" onclick="closeSheet()">取消</button><button class="go" onclick="ceEnterToday([\''+ceState.detailClass+'\'])">评价班级</button></div>');
};
const ceOldRecordsPage=ceRecordsPage;
ceRecordsPage=function(){const original=ceOldRecordsPage();const start=original.indexOf('<button class="ce-record"');if(start<0)return original;return original.slice(0,start)+ceLedger.records.slice().sort((a,b)=>b.time.localeCompare(a.time)).map(ceRecordCard).join('')+'</div>'};
function ceReturnRecords(){ceEditingId=null;ceDraft=null;if(ceRecordReturn==='detail')ceDetailSheetRender();else{closeSheet();ceRender()}}
function ceRecordActions(id){if(curScreen==='ce-records')ceRecordReturn='records';sheet('<div class="ce-record-menu"><button onclick="ceEditRecord(\''+id+'\')">修改</button><button class="danger" onclick="ceAskDeleteRecord(\''+id+'\')">删除</button><button onclick="ceReturnRecords()">取消</button></div>')}
/* 记录入口已在 ce-records.js 按“本人提交”限制；这里仅保留不限时间的编辑能力。正式服务端仍需鉴权。 */
function ceEditableRecord(r){return !!r}
function ceAskDeleteRecord(id){const r=ceLedger.records.find(r=>r.id===id);if(!ceEditableRecord(r)){toast('仅可删除本人提交的评价记录');return}const overlay=document.createElement('div');overlay.className='ce-confirm-overlay';overlay.innerHTML='<div class="ce-confirm-dialog" role="alertdialog" aria-modal="true" aria-label="删除"><h3>删除</h3><p>确定删除这条评价记录？删除后将同步更新班级加扣分和排行榜。</p><footer><button onclick="this.closest(\'.ce-confirm-overlay\').remove()">取消</button><button class="danger" onclick="ceDeleteRecord(\''+id+'\');this.closest(\'.ce-confirm-overlay\').remove()">确定</button></footer></div>';document.querySelector('.phone').appendChild(overlay)}
function ceDeleteRecord(id){const index=ceLedger.records.findIndex(r=>r.id===id);if(index<0)return;const r=ceLedger.records[index];if(!ceEditableRecord(r))return;ceLedger.records.splice(index,1);ceSaveChange(r);ceReturnRecords()}
function ceEditRecord(id){const r=ceLedger.records.find(r=>r.id===id);if(!ceEditableRecord(r)){toast('仅可修改本学期的评价记录');return}ceEditingId=id;ceDraft={type:r.type,index:-1,item:r.items,score:Number(r.value),text:r.text||'',students:(r.studentIds||[]).slice(),media:(r.media||[]).slice(),category:r.category};cePopupTab='score';ceStudentQuery='';ceSheetRender()}
const ceOldStudentGroups=ceStudentGroups;
ceStudentGroups=function(){if(ceEditingId){const r=ceLedger.records.find(r=>r.id===ceEditingId),c=ceClassById(r.classId);return [{name:c.name,students:c.students}]}const classes=ceState.allowedClassIds?ceState.allowedClassIds.map(ceClassById):ceOldStudentGroups().map(g=>ceClassByName(g.name));return classes.filter(Boolean).map(c=>({name:c.name,students:c.students}))};
const ceOldOpenItem=ceOpenItem;
ceOpenItem=function(index,type,stored){if(!ceRequireEvaluationPermission(ceSessionClasses()))return;ceEditingId=null;ceOldOpenItem(index,type,stored);if(!stored&&!ceEntry(type,index)&&ceState.scanOnly&&ceState.scanStudent){ceDraft.students=[ceState.scanStudent];ceSheetRender()}};
const ceOldSheetRender=ceSheetRender;
ceSheetRender=function(){ceOldSheetRender();if(ceEditingId){const cancel=document.querySelector('.ce-popup-cancel');if(cancel)cancel.onclick=ceReturnRecords}};
const ceOldConfirmDraft=ceConfirmDraft;
ceConfirmDraft=function(){if(!ceEditingId){ceOldConfirmDraft();return}const r=ceLedger.records.find(r=>r.id===ceEditingId);if(!ceEditableRecord(r))return;Object.assign(r,{value:String(ceRound(ceDraft.score)),text:ceDraft.text,studentIds:ceDraft.students.slice(),students:ceStudentText(ceDraft.students),media:ceDraft.media.slice(),updatedAt:new Date().toISOString()});ceSaveChange(r);ceReturnRecords()};
// 关联学生时仅向其归属班级写入；未关联学生则向所有锁定班级写入相同分值。
function ceEntryTargets(entry){return (ceState.allowedClassIds||ceStudentGroups().map(g=>ceClassByName(g.name).id)).filter(Boolean)}
ceFinish=function(){if(!ceRequireEvaluationPermission(ceSessionClasses()))return;if(!ceState.entries.length){toast('请先选择检查项');return}const now=new Date(),time=ceDateKey(now)+' '+String(now.getHours()).padStart(2,'0')+':'+String(now.getMinutes()).padStart(2,'0');let count=0;
  ceState.entries.forEach(e=>ceEntryTargets(e).forEach(classId=>{const c=ceClassById(classId),ids=e.students.filter(id=>id.split('::')[0]===c.name);const r={id:ceNewId(),classId,clazz:c.name,date:ceDateKey(now),time,type:e.type,value:String(e.score),items:e.item,category:e.category.replace('·全部维度','·'+e.item.split(' · ')[0]),people:'王老师',studentIds:ids,students:ceStudentText(ids),text:e.text,media:e.media||[],updatedAt:now.toISOString()};ceLedger.records.unshift(r);ceSnapshot(classId,r.date);count++}));
  if(!count){toast('关联学生不属于本次评价班级');return}ceState.entries=[];ceRecalcSession();ceRefreshTotals();cePersist();toast('评价已记录');go('ce-records');
};

// 底栏完整回显锁定的班级范围，不能通过其他页面的筛选状态扩大范围。
const ceBaseDetailPage=ceDetailPage;
ceDetailPage=function(){return ceBaseDetailPage().replace('onclick="go(\'ce-today\')"','onclick="ceEnterToday([\''+ceState.selectedClass+'\'])"')};
const ceBaseRender=ceRender;
ceRender=function(){
  // 切换维度会重建页面，保留两条独立滚动轴的位置，避免跳回起点。
  const tracks=['#ce-rank .ce-chips','#ce-rank .ce-rank-list'];
  const positions=tracks.map(selector=>{const el=document.querySelector(selector);return el?{left:el.scrollLeft,top:el.scrollTop}:null});
  ceBaseRender();
  tracks.forEach((selector,i)=>{const el=document.querySelector(selector),position=positions[i];if(el&&position){el.scrollLeft=position.left;el.scrollTop=position.top}});
  if(curScreen==='ce-today'){const label=document.querySelector('#ce-actionbar .ce-classpick');if(label)label.innerHTML='<b>评价班级</b>'+ceStudentGroups().map(g=>ceEscape(ceClassDisplayName(g.name))).join('、')+'<span>已锁定前一页所选班级</span>'}
};

/* 四个常驻tab每次进入都回到默认页，不沿用上次停留的筛选/子页面。 */
const ceTabNavigationBase=go;
function ceResetTabDefault(id){
  if(id==='ce-rank'){
    ceState.rankGrades=['全部年级'];ceState.rankPeriod='今日';ceState.rankDimension='全部维度';
  }
  if(id==='ce-multi'){
    ceState.evalGrades=['全部年级'];ceState.evalDimension='全部维度';ceState.evalWeekStart='';ceState.evalDate='';ceState.evalCalendarMonth='';ceState.evalCollapsed={};ceState.selectedClass='一年级1班';ceState.multiClasses=[];ceState.allowedClassIds=null;ceState.scanOnly=false;ceState.scanStudent='';ceState.entries=[];ceState.sessionPlus=0;ceState.sessionMinus=0;ceState.todayTab='扣分';ceState.category='文明礼仪';ceState.subcategory='全部维度';
  }
  if(id==='ce-records'&&typeof ceResetRecordsTab==='function')ceResetRecordsTab();
  if(id==='ce-settings'&&typeof ceSettingsState!=='undefined'){ceSettingsState.view='home';ceSettingsState.search='';ceSettingsState.draft=null;ceSettingsState.menuId=null}
}
go=function(id){if(['ce-rank','ce-multi','ce-records','ce-settings'].includes(id))ceResetTabDefault(id);ceTabNavigationBase(id)};
