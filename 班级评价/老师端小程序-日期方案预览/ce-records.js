/* 记录tab：记录按检查项保存；当前为本地演示，正式数据以服务端评价记录及删除留痕为准。 */
const ceRecordFilter={grades:['全部年级'],dimension:'全部维度',item:'全部检查项',student:'',evaluator:'',source:'全部',type:'全部',className:'全部班级',keyword:''};
const ceRecordDraftFilter={grades:['全部年级'],dimension:'全部维度',item:'全部检查项',student:'',evaluator:'',source:'全部',type:'全部',className:'全部班级'};
let ceRecordPageSize=6;
let ceRecordMode='mine';
const ceRecordCurrentTeacherId='teacher-demo';
const ceRecordCurrentTeacherName='王老师';
/* 班主任范围仅为本地演示配置；正式值由学校端班主任权限接口提供。 */
const ceRecordHomeroomClassIds=Array.isArray(ceTeacherPermissions.homeroomClassIds)?ceTeacherPermissions.homeroomClassIds.slice():[ceClassByName('三年级2班')?.id].filter(Boolean);
ceLedger.deletedRecords=Array.isArray(ceLedger.deletedRecords)?ceLedger.deletedRecords:[];
const ceRecordsForBase=ceRecordsFor;
ceRecordsFor=function(classId,start,end,dimension='全部维度'){
  return ceRecordsForBase(classId,start,end,dimension).filter(r=>!r.deletedAt);
};
const ceRefreshTotalsBase=ceRefreshTotals;
ceRefreshTotals=function(){
  const active=ceLedger.records.filter(r=>!r.deletedAt);ceState.records=active;
  ceState.plus=ceRound(active.reduce((s,r)=>s+Math.max(0,Number(r.value)),0));
  ceState.minus=ceRound(active.reduce((s,r)=>s+Math.max(0,-Number(r.value)),0));
};
function ceRecordClasses(){return ceRecordMode==='class'?ceSchoolClasses.filter(c=>ceRecordHomeroomClassIds.includes(c.id)):ceSchoolClasses.slice()}
function ceRecordGrades(){return ['全部年级'].concat([...new Set(ceRecordClasses().map(c=>c.grade))])}
function ceRecordItems(){return ['全部检查项'].concat([...new Set((typeof ceTodayChecks==='undefined'?[]:ceTodayChecks.map(d=>d.item)))])}
function ceRecordEvaluators(){return ['全部评价人'].concat([...new Set(ceLedger.records.filter(r=>!r.deletedAt).map(r=>r.people).filter(Boolean))])}
function ceRecordClassSheet(){
  const selected=ceRecordDraftFilter.className||ceRecordFilter.className;
  sheet('<h3 style="text-align:center">选择班级</h3><div class="ce-record-filter-grid">'+['全部班级'].concat(ceRecordClasses().map(c=>c.name)).map(name=>'<button class="ce-record-filter-card '+(selected===name?'on':'')+'" onclick="ceRecordFilter.className=\''+name+'\';ceRecordDraftFilter.className=\''+name+'\';closeSheet();ceRender()">'+ceEscape(name==='全部班级'?name:ceClassDisplayName(name))+'</button>').join('')+'</div>');
}
function ceRecordToggleGrade(grade){
  const gs=ceRecordDraftFilter.grades.slice();
  if(grade==='全部年级')ceRecordDraftFilter.grades=['全部年级'];
  else{const next=gs.filter(g=>g!=='全部年级');ceRecordDraftFilter.grades=next.includes(grade)?next.filter(g=>g!==grade):next.concat(grade);if(!ceRecordDraftFilter.grades.length)ceRecordDraftFilter.grades=['全部年级']}
  ceRecordFilterSheet();
}
function ceRecordSetDimension(value){ceRecordDraftFilter.dimension=value;ceRecordFilterSheet()}
function ceRecordSetItem(value){ceRecordDraftFilter.item=value;ceRecordFilterSheet()}
function ceRecordSetClass(value){ceRecordDraftFilter.className=value;ceRecordFilterSheet()}
function ceRecordFilterSheet(){
  const d=ceRecordDraftFilter,grades=ceRecordGrades(),items=ceRecordItems(),evaluators=ceRecordEvaluators();
  const g=grades.map(x=>'<button class="ce-record-filter-card '+(d.grades.includes(x)?'on':'')+'" onclick="ceRecordToggleGrade(\''+x+'\')">'+ceEscape(x)+'</button>').join('');
  const dim=ceDimensions.map(x=>'<button class="ce-record-filter-card '+(d.dimension===x?'on':'')+'" onclick="ceRecordSetDimension(\''+x+'\')">'+ceEscape(x)+'</button>').join('');
  const item=items.map(x=>'<button class="ce-record-filter-card '+(d.item===x?'on':'')+'" onclick="ceRecordSetItem(\''+ceEscape(x)+'\')">'+ceEscape(x)+'</button>').join('');
  const people=evaluators.map(x=>'<button class="ce-record-filter-card '+(d.evaluator===x?'on':'')+'" onclick="ceRecordDraftFilter.evaluator=\''+ceEscape(x)+'\';ceRecordFilterSheet()">'+ceEscape(x)+'</button>').join('');
  const evaluatorBlock=ceRecordMode==='class'?'<div class="ce-record-filter-section"><b>评价老师</b><div class="ce-record-filter-scroll">'+people+'</div></div>':'';
  const evaluatorInput=ceRecordMode==='class'?'<input value="'+ceEscape(d.evaluator==='全部评价人'?'':d.evaluator)+'" placeholder="评价老师姓名" oninput="ceRecordDraftFilter.evaluator=this.value">':'';
  sheet('<div class="ce-record-filter-sheet"><h3>筛选评价记录</h3><div class="ce-record-filter-section"><b>年级</b><div class="ce-record-filter-grid">'+g+'</div></div><div class="ce-record-filter-section"><b>指标维度</b><div class="ce-record-filter-grid">'+dim+'</div></div><div class="ce-record-filter-section"><b>检查项</b><div class="ce-record-filter-scroll">'+item+'</div></div>'+evaluatorBlock+'<div class="ce-record-filter-inputs"><input value="'+ceEscape(d.student)+'" placeholder="学生姓名" oninput="ceRecordDraftFilter.student=this.value">'+evaluatorInput+'</div><div class="ce-popup-footer"><button class="ce-popup-cancel" onclick="closeSheet()">取消</button><button class="ce-popup-confirm" onclick="ceRecordApplyFilter()">确定</button></div></div>');
}
function ceRecordApplyFilter(){Object.assign(ceRecordFilter,{grades:ceRecordDraftFilter.grades.slice(),dimension:ceRecordDraftFilter.dimension,item:ceRecordDraftFilter.item,student:ceRecordDraftFilter.student,evaluator:ceRecordMode==='class'?ceRecordDraftFilter.evaluator:'',className:ceRecordDraftFilter.className});ceRecordPageSize=6;closeSheet();ceRender()}
function ceRecordFilterResetDraft(){Object.assign(ceRecordDraftFilter,{grades:ceRecordFilter.grades.slice(),dimension:ceRecordFilter.dimension,item:ceRecordFilter.item,student:ceRecordFilter.student,evaluator:ceRecordFilter.evaluator,source:ceRecordFilter.source||'全部',type:ceRecordFilter.type||'全部',className:ceRecordFilter.className})}
function ceRecordSetMode(mode){ceRecordMode='mine';Object.assign(ceRecordFilter,{grades:['全部年级'],dimension:'全部维度',item:'全部检查项',student:'',evaluator:'',source:'全部',type:'全部',className:'全部班级',keyword:''});ceRecordPageSize=6;ceRender()}
function ceResetRecordsTab(){ceRecordMode='mine';ceState.period='本周';Object.assign(ceRecordFilter,{grades:['全部年级'],dimension:'全部维度',item:'全部检查项',student:'',evaluator:'',source:'全部',type:'全部',className:'全部班级',keyword:''});ceRecordPageSize=6}
function ceRecordIsMine(r){return r&&(r.createdBy===ceRecordCurrentTeacherId||String(r.people||'').includes(ceRecordCurrentTeacherName))}
function ceRecordCanManage(r){return ceRecordMode==='mine'&&ceRecordIsMine(r)}
function ceRecordFiltered(){
  const range=cePreviewRecordDateRange(),start=range.start,end=range.end,q=ceRecordFilter.keyword.trim().toLowerCase();
  return ceLedger.records.filter(r=>{
    if(r.deletedAt||r.date<start||r.date>end)return false;
    if(ceRecordMode==='mine'&&!ceRecordIsMine(r))return false;
    if(ceRecordMode==='class'&&!ceRecordHomeroomClassIds.includes(r.classId))return false;
    if(ceRecordFilter.className!=='全部班级'&&r.clazz!==ceRecordFilter.className)return false;
    const c=ceClassByName(r.clazz);if(!ceRecordFilter.grades.includes('全部年级')&&(!c||!ceRecordFilter.grades.includes(c.grade)))return false;
    if(ceRecordFilter.dimension!=='全部维度'&&String(r.category).split('·')[0]!==ceRecordFilter.dimension)return false;
    if(ceRecordFilter.item!=='全部检查项'&&r.items!==ceRecordFilter.item)return false;
    if(ceRecordFilter.student&&!(String(r.students||'').includes(ceRecordFilter.student)||String(r.studentIds||'').includes(ceRecordFilter.student)))return false;
    if(ceRecordFilter.evaluator&&ceRecordFilter.evaluator!=='全部评价人'&&!String(r.people||'').includes(ceRecordFilter.evaluator))return false;
    if(q&&!([r.clazz,r.category,r.items,r.students,r.people].join(' ').toLowerCase().includes(q)))return false;
    return true;
  }).sort((a,b)=>String(b.time).localeCompare(String(a.time)));
}
function ceRecordTotals(records){return {plus:ceRound(records.reduce((n,r)=>n+Math.max(0,Number(r.value)),0)),minus:ceRound(records.reduce((n,r)=>n+Math.max(0,-Number(r.value)),0))}}
function ceRecordRenderLazyList(){
  const el=document.getElementById('ce-records-lazy-list');if(!el)return;
  const rows=ceRecordFiltered(),shown=rows.slice(0,ceRecordPageSize);el.innerHTML=shown.map(ceRecordCard).join('')+(shown.length<rows.length?'<div class="ce-record-lazy-hint">继续上滑加载更多</div>':'');
}
function ceRecordLazyScroll(el){
  const rows=ceRecordFiltered();if(el.scrollTop+el.clientHeight<el.scrollHeight-36||ceRecordPageSize>=rows.length)return;
  const top=el.scrollTop;ceRecordPageSize+=6;ceRecordRenderLazyList();el.scrollTop=top;
}
function ceRecordFilterSummary(){
  const n=(!ceRecordFilter.grades.includes('全部年级')?1:0)+(ceRecordFilter.dimension!=='全部维度'?1:0)+(ceRecordFilter.item!=='全部检查项'?1:0)+(ceRecordFilter.student?1:0)+(ceRecordFilter.evaluator?1:0)+(ceRecordFilter.className!=='全部班级'?1:0);
  return n?'已选'+n+'项筛选':'筛选';
}
function ceRecordEmpty(){return '<div class="ce-record-empty">'+(ceRecordMode==='mine'?'所选日期内暂无我提交的评价':'所选日期内班主任范围暂无评价记录')+'</div>'}
const ceRecordCardBase=ceRecordCard;
ceRecordCard=function(r){
  const canManage=ceRecordCanManage(r),clickable=ceRecordMode==='mine'?' onclick="ceEnterToday([\''+r.clazz+'\'])"':'';
  return '<article class="ce-detail-record-card '+(ceRecordMode==='class'?'ce-record-readonly':'')+'"><div class="top"><span class="ce-record-fixed-icon" aria-hidden="true"></span><div><button class="ce-record-card-title"'+clickable+'>'+ceEscape(ceClassDisplayName(r.clazz))+'</button><div class="meta">'+ceEscape(r.time)+'</div></div><span class="badge '+(r.type==='加分'?'plus':'')+'">'+r.type+'</span><span class="amount '+(r.type==='加分'?'plus':'')+'">'+(Number(r.value)>0?'+':'')+r.value+'</span>'+(canManage?'<button class="ce-record-more" aria-label="记录操作" onclick="ceRecordActions(\''+r.id+'\')">⋯</button>':'')+'</div><div class="body">指标维度：'+ceEscape(r.category)+'<br>检查项目：'+ceEscape(r.items)+'<br>评价人员：'+ceEscape(r.people)+(r.students?'<br>关联学生：'+ceEscape(r.students):'')+(r.text?'<br>评价内容：'+ceEscape(r.text):'')+'</div></article>';
};
ceRecordsPage=function(){
  ceRecordFilterResetDraft();const rows=ceRecordFiltered(),totals=ceRecordTotals(rows);
  return '<div class="ce-record-page"><div class="ce-record-mode-switch"><button class="'+(ceRecordMode==='mine'?'on':'')+'" onclick="ceRecordSetMode(\'mine\')">我的评价</button><button class="'+(ceRecordMode==='class'?'on':'')+'" onclick="ceRecordSetMode(\'class\')">我的班级</button></div><div class="ce-record-head"><div class="ce-record-filter"><button onclick="ceRecordClassSheet()">'+ceEscape(ceRecordFilter.className)+ceFilterArrow()+'</button><span>|</span><button onclick="cePeriodSheet()">'+ceEscape(ceState.period)+ceFilterArrow()+'</button></div><div class="ce-statbox"><div><b class="red">'+totals.minus.toFixed(1)+'</b><span>扣分</span></div><div><b>'+totals.plus.toFixed(1)+'</b><span>加分</span></div><div><b>'+rows.length+'</b><span>评价次数</span></div></div></div><div class="ce-record-list"><div class="ce-record-title"><button onclick="ceInfo()">'+(ceRecordMode==='mine'?'我的评价':'我的班级')+' ⓘ</button><button onclick="ceRecordFilterSheet()">'+ceRecordFilterSummary()+ceFilterArrow()+'</button></div><div class="ce-record-search"><span>⌕</span><input value="'+ceEscape(ceRecordFilter.keyword)+'" placeholder="搜索检查项、学生姓名、评价老师" oninput="ceRecordFilter.keyword=this.value;ceRecordPageSize=6;ceRender()"></div><div id="ce-records-lazy-list" class="ce-record-lazy-list" onscroll="ceRecordLazyScroll(this)">'+(rows.length?rows.slice(0,ceRecordPageSize).map(ceRecordCard).join('')+(rows.length>ceRecordPageSize?'<div class="ce-record-lazy-hint">继续上滑加载更多</div>':''):ceRecordEmpty())+'</div></div></div>';
};
const ceRecordActionsBase=ceRecordActions;
ceRecordActions=function(id){const r=ceLedger.records.find(x=>x.id===id);if(!ceRecordCanManage(r)){toast('我的班级记录仅支持查看，或仅可操作本人提交的记录');return}ceRecordActionsBase(id)};
const ceEditRecordBase=ceEditRecord;
ceEditRecord=function(id){const r=ceLedger.records.find(x=>x.id===id);if(!ceRecordCanManage(r)){toast('仅可修改本人提交的记录');return}ceEditRecordBase(id)};
const ceAskDeleteRecordBase=ceAskDeleteRecord;
ceAskDeleteRecord=function(id){const r=ceLedger.records.find(x=>x.id===id);if(!ceRecordCanManage(r)){toast('仅可删除本人提交的记录');return}ceAskDeleteRecordBase(id)};
const ceDeleteRecordBeforeArchive=ceDeleteRecord;
ceDeleteRecord=function(id){
  const index=ceLedger.records.findIndex(r=>r.id===id);if(index<0)return;const r=ceLedger.records[index];if(!ceRecordCanManage(r))return;
  const before=ceSnapshot(r.classId,r.date),deletedAt=new Date().toISOString();ceLedger.records.splice(index,1);const after=ceSnapshot(r.classId,r.date);
  ceLedger.deletedRecords.unshift({...r,deletedAt,deletedBy:'王老师',deletedDate:ceDemoToday,deletedSnapshot:before,snapshotAfterDelete:after});
  ceRefreshTotals();cePersist();ceReturnRecords();
};
