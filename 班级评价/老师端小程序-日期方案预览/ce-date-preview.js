/* 日期方案预览：仅覆盖日期筛选、排行说明、记录筛选和设置页日期展示。 */
const cePreviewPeriods=['本周','本月','本学期','本学年'];
const cePreviewDates={start:'',end:'',draftStart:'',draftEnd:''};
const cePreviewRankDates={start:'',end:'',draftStart:'',draftEnd:''};
ceState.rankPeriod='本周';

function cePreviewDateKeyShift(key,days){
  const date=ceDateFromKey(key);date.setDate(date.getDate()+days);return ceDateKey(date);
}
function cePreviewMonthStart(key,offset){
  const date=ceDateFromKey(key);date.setDate(1);date.setMonth(date.getMonth()+offset);return ceDateKey(date);
}
function cePreviewMonthEnd(key,offset){
  const date=ceDateFromKey(key);date.setDate(1);date.setMonth(date.getMonth()+offset+1);date.setDate(0);return ceDateKey(date);
}
function cePreviewPeriodRange(period,kind){
  const today=ceDemoToday;
  let start=today,end=today;
  const weekStart=ceDateKey(ceWeekStart(ceDateFromKey(today)));
  if(period==='本周')start=weekStart;
  if(period==='本月')start=today.slice(0,7)+'-01';
  if(period==='本学期')start=ceSchoolConfig.semesterStart;
  if(period==='本学年')start=ceSchoolConfig.schoolYearStart;
  if(end>today)end=today;
  if(start<ceSchoolConfig.schoolYearStart)start=ceSchoolConfig.schoolYearStart;
  return {start,end};
}
function cePreviewDatesFor(kind){return kind==='rank'?cePreviewRankDates:cePreviewDates}
function cePreviewRecordDateRange(){return cePreviewPeriodRange(ceState.period,'record')}
function cePreviewDateLabel(range){return range.start===range.end?range.start:range.start+' 至 '+range.end}
function cePreviewValidDate(key){
  if(!/^\d{4}-\d{2}-\d{2}$/.test(key))return false;
  const date=ceDateFromKey(key);return !Number.isNaN(date.getTime())&&ceDateKey(date)===key;
}
function cePreviewDateSheet(kind){
  const dates=cePreviewDatesFor(kind),period=kind==='rank'?ceState.rankPeriod:ceState.period;
  const range=cePreviewPeriodRange(period,kind);
  dates.draftStart=dates.start||range.start;dates.draftEnd=dates.end||range.end;
  const picks=cePreviewPeriods.map(p=>'<button class="ce-rank-filter-card '+(period===p?'on':'')+'" onclick="'+(kind==='rank'?'cePreviewPickRankPeriod(\''+p+'\')':'cePreviewPickRecordPeriod(\''+p+'\')')+'">'+p+'</button>').join('');
  sheet('<h3 style="text-align:center">选择统计周期</h3><div class="ce-rank-filter-grid">'+picks+'</div>');
}
ceRankPeriodSheet=function(){cePreviewDateSheet('rank')};
function cePreviewPickRankPeriod(period){
  ceState.rankPeriod=period;cePreviewRankDates.start='';cePreviewRankDates.end='';closeSheet();ceRender();
}
function cePreviewPickRecordPeriod(period){
  ceState.period=period;cePreviewDates.start='';cePreviewDates.end='';ceRecordPageSize=6;closeSheet();ceRender();
}
cePeriodSheet=function(){cePreviewDateSheet('record')};
/* 排行总分说明与说明入口。 */
ceRankScore=function(c){
  const range=cePreviewPeriodRange(ceState.rankPeriod,'rank');
  const all=ceState.rankDimension==='全部维度';
  const dims=all?ceSchoolConfig.dimensions:ceSchoolConfig.dimensions.filter(d=>d.name===ceState.rankDimension);
  const net=dims.reduce((sum,d)=>{const t=ceTotals(ceRecordsFor(c.id,range.start,range.end,d.name));return sum+t.plus-t.minus},0);
  return ceRound((all?100:0)+net);
};
const cePreviewRankPageBase=ceRankPage;
ceRankPage=function(){
  const isAll=ceState.rankDimension==='全部维度',label=isAll?'总分':'净得分';
  return cePreviewRankPageBase().replace('<span style="text-align:right">总分</span>','<span class="ce-rank-score-head" style="text-align:right">'+label+' <button class="ce-rank-info" aria-label="'+label+'统计说明" onclick="ceInfo()">?</button></span>').replace(/<span class="score">([^<]+)<\/span>/g,'<span class="score">$1</span>');
};
ceInfo=function(){
  if(ceState.rankDimension!=='全部维度')sheet('<div class="ce-rank-info-sheet"><h3>净得分统计说明</h3><div class="ce-modal-body">1.评分方式：按时间维度进行净得分排名；<br>2.净得分计算：同一时间维度下，净得分=总加分-总扣分，总扣分取绝对值。</div><button class="btn pri blk" onclick="closeSheet()">关闭</button></div>');
  else sheet('<div class="ce-rank-info-sheet"><h3>总分统计说明</h3><div class="ce-modal-body">1.评分方式：按时间维度进行总分排名；<br>2.总分计算：同一时间维度下，总分=初始分+各一级指标的净得分；<br>3.默认初始分：100分。</div><button class="btn pri blk" onclick="closeSheet()">关闭</button></div>');
};

/* 评价页使用年级、指标维度、日期三个均匀筛选项；当前老师无操作权限的班级不展示。 */
let ceEvalDateDraft='';
function ceEvalDateLimit(){return typeof ceV1!=='undefined'&&ceV1.businessDate?ceV1.businessDate:ceDemoToday}
function ceEvalDateMonthKey(key){return String(key||'').slice(0,7)+'-01'}
function ceEvalDateMonthShift(delta){
  const current=ceDateFromKey(ceState.evalCalendarMonth||ceEvalDateMonthKey(ceEvalDateDraft||ceDemoToday));
  const next=new Date(current.getFullYear(),current.getMonth()+delta,1,12),nextKey=ceDateKey(next),limit=ceEvalDateLimit();
  const last=new Date(next.getFullYear(),next.getMonth()+1,0,12),lastKey=ceDateKey(last);
  if(nextKey>ceEvalDateMonthKey(limit)||lastKey<ceSchoolConfig.schoolYearStart){toast('仅可选择本学年内的历史日期');return}
  ceState.evalCalendarMonth=nextKey;ceEvalDateSheet(false);
}
function ceEvalDatePick(key){
  if(!ceDateAllowed(key)||key>ceEvalDateLimit()){toast('仅可选择本学年内的历史日期');return}
  ceEvalDateDraft=key;ceEvalDateSheet(false);
}
function ceEvalDateSheet(resetDraft=true){
  if(resetDraft!==false){ceEvalDateDraft=ceState.evalDate||ceDemoToday;ceState.evalCalendarMonth=ceEvalDateMonthKey(ceEvalDateDraft)}
  const max=ceEvalDateLimit(),monthKey=ceState.evalCalendarMonth||ceEvalDateMonthKey(ceEvalDateDraft),month=ceDateFromKey(monthKey),year=month.getFullYear(),monthIndex=month.getMonth(),first=new Date(year,monthIndex,1,12),days=new Date(year,monthIndex+1,0,12).getDate();let leading=(first.getDay()+6)%7;
  ceState.evalCalendarMonth=monthKey;
  let cells='';
  for(let i=0;i<leading;i++)cells+='<span class="ce-eval-calendar-day blank" aria-hidden="true"></span>';
  for(let day=1;day<=days;day++){
    const d=new Date(year,monthIndex,day,12),key=ceDateKey(d),allowed=ceDateAllowed(key)&&key<=max,cls='ce-eval-calendar-day'+(key===ceEvalDateDraft?' selected':'')+(allowed?'':' disabled');
    cells+='<button type="button" class="'+cls+'" '+(allowed?'onclick="ceEvalDatePick(\''+key+'\')"':'onclick="toast(\'仅可选择本学年内的历史日期\')"')+' '+(allowed?'':'aria-disabled="true"')+'>'+day+'</button>';
  }
  while((leading+days)%7){cells+='<span class="ce-eval-calendar-day blank" aria-hidden="true"></span>';leading++}
  const currentMonth=ceEvalDateMonthKey(max),previousMonth=ceEvalDateMonthKey(cePreviewMonthStart(monthKey,-1)),nextMonth=cePreviewMonthStart(monthKey,1),canPrev=cePreviewMonthEnd(monthKey,-1)>=ceSchoolConfig.schoolYearStart,canNext=nextMonth<=currentMonth;
  const navButton=(label,delta,enabled)=>'<button type="button" class="ce-eval-calendar-nav-btn'+(enabled?'':' disabled')+'" onclick="'+(enabled?'ceEvalDateMonthShift('+delta+')':"toast('仅可选择本学年内的历史日期')")+'">'+label+'</button>';
  sheet('<div class="ce-eval-date-sheet"><div class="ce-eval-date-head"><h3>选择日期</h3></div><div class="ce-eval-calendar-nav">'+navButton('‹ 上个月',-1,canPrev)+'<b>'+year+'年'+String(monthIndex+1).padStart(2,'0')+'月</b>'+navButton('下个月 ›',1,canNext)+'</div><div class="ce-eval-calendar-grid">'+['一','二','三','四','五','六','日'].map(x=>'<span class="ce-eval-calendar-weekday">'+x+'</span>').join('')+cells+'</div><div class="ce-popup-footer"><button class="ce-popup-cancel" onclick="closeSheet()">取消</button><button class="ce-popup-confirm" onclick="ceEvalDateConfirm()">确定</button></div></div>');
}
function ceEvalDateConfirm(){
  if(!ceEvalDateDraft||!ceDateAllowed(ceEvalDateDraft)||ceEvalDateDraft>ceDemoToday){toast('仅可选择本学年内的历史日期');return}
  ceState.evalDate=ceEvalDateDraft;ceState.evalWeekStart=ceDateKey(ceWeekStart(ceDateFromKey(ceEvalDateDraft)));closeSheet();ceRender();
}
ceMultiPage=function(){
  ceEnsureEvalDate();
  const groups=ceEvalGroups.map((g,index)=>({...g,_sourceIndex:index,classes:g.classes.filter(name=>{const c=ceClassByName(name);return c&&ceTeacherPermissions.classIds.includes(c.id)})})).filter(g=>(ceState.evalGrades.includes('全部年级')||ceState.evalGrades.includes(g.grade))&&g.classes.length);
  const dateLabel=ceState.evalDate===ceDemoToday?'今日':ceState.evalDate;
  const body=groups.map(g=>{const i=g._sourceIndex,closed=ceState.evalCollapsed[i];return '<div class="ce-overview-group ce-eval-group '+(closed?'collapsed':'')+'"><button class="ce-overview-group-title ce-eval-group-title" onclick="ceToggleEvalGrade('+i+')">'+ceFold(closed)+ceEscape(g.grade)+'（'+g.classes.length+'）</button><div class="ce-overview-grid">'+g.classes.map(name=>{const s=ceEvalClassStats(name),display=String(name).replace(g.grade,'');return '<div class="ce-overview-card ce-eval-class-card" onclick="ceEnterToday([\''+ceEscape(name)+'\'])"><button class="ce-class-name">'+ceEscape(display)+'</button><div class="ce-overview-scores"><span><b class="plus">'+ceEvalScoreText(s.plus,'plus')+'</b>加分</span><span><b class="minus">'+ceEvalScoreText(s.minus,'minus')+'</b>扣分</span></div></div>'}).join('')+'</div></div>'}).join('');
  return '<div class="ce-multi-filter"><button onclick="ceEvalGradeSheet()">'+ceEvalGradeLabel()+ceFilterArrow()+'</button><button onclick="ceEvalDimensionSheet()">'+ceState.evalDimension+ceFilterArrow()+'</button><button onclick="ceEvalDateSheet()">'+dateLabel+ceFilterArrow()+'</button></div><div class="ce-eval-scroll">'+(body||'<div class="ce-record-empty">暂无可评价班级</div>')+'</div>';
};

/* 记录页：仅保留我的评价页面；筛选为指标维度、评价来源和评价类型。 */
function ceRecordDisplayPeople(r){
  const anonymous=!!(r&&(r.anonymous||r.isAnonymous||r.teacherAnonymous||r.identity==='匿名'||r.people==='匿名教师'));
  if(anonymous)return '匿名教师';
  return String((r&&r.teacherName)||((r&&r.people)||'--')).replace(/[（(][^）)]*[）)]/g,'').trim()||'--';
}
function ceRecordSetSource(value){ceRecordDraftFilter.source=value;ceRecordFilterSheet()}
function ceRecordSetType(value){ceRecordDraftFilter.type=value;ceRecordFilterSheet()}
function cePreviewRecordFilterSheet(){
  const d=ceRecordDraftFilter;
  const dim=ceDimensions.map(x=>'<button class="ce-record-filter-card '+(d.dimension===x?'on':'')+'" onclick="ceRecordSetDimension(\''+ceEscape(x)+'\')">'+ceEscape(x)+'</button>').join('');
  const sources=['全部','我的评价'].map(x=>'<button class="ce-record-filter-card '+((d.source||'全部')===x?'on':'')+'" onclick="ceRecordSetSource(\''+x+'\')">'+x+'</button>').join('');
  const types=['全部','加分','扣分'].map(x=>'<button class="ce-record-filter-card '+((d.type||'全部')===x?'on':'')+'" onclick="ceRecordSetType(\''+x+'\')">'+x+'</button>').join('');
  sheet('<div class="ce-record-filter-sheet"><h3>筛选评价记录</h3><div class="ce-record-filter-section"><b>指标维度</b><div class="ce-record-filter-grid">'+dim+'</div></div><div class="ce-record-filter-section"><b>评价来源</b><div class="ce-record-filter-grid">'+sources+'</div></div><div class="ce-record-filter-section"><b>评价类型</b><div class="ce-record-filter-grid">'+types+'</div></div><div class="ce-popup-footer"><button class="ce-popup-cancel" onclick="closeSheet()">取消</button><button class="ce-popup-confirm" onclick="ceRecordApplyFilter()">确定</button></div></div>');
}
ceRecordFilterSheet=cePreviewRecordFilterSheet;
ceRecordApplyFilter=function(){const d=ceRecordDraftFilter;Object.assign(ceRecordFilter,{dimension:d.dimension,source:d.source||'全部',type:d.type||'全部',item:'全部检查项',student:'',evaluator:''});ceRecordPageSize=6;closeSheet();ceRender()};
ceRecordFilterSummary=function(){
  const dimension=ceRecordFilter.dimension||'全部维度';
  const source=ceRecordFilter.source||'全部',type=ceRecordFilter.type||'全部';
  if(dimension==='全部维度'&&source==='全部'&&type==='全部')return '筛选';
  return [dimension!=='全部维度'?dimension:'',source!=='全部'?source:'',type!=='全部'?type:''].filter(Boolean).join('、');
};
ceRecordFiltered=function(){
  const range=cePreviewRecordDateRange(),q=String(ceRecordFilter.keyword||'').trim().toLowerCase(),source=ceRecordFilter.source||'全部',type=ceRecordFilter.type||'全部',dimension=ceRecordFilter.dimension||'全部维度';
  return ceLedger.records.filter(r=>{
    if(r.deletedAt||r.date<range.start||r.date>range.end)return false;
    if(ceRecordFilter.className!=='全部班级'&&r.clazz!==ceRecordFilter.className)return false;
    if(dimension!=='全部维度'&&String(r.category||'').split('·')[0]!==dimension)return false;
    if(source==='我的评价'&&!ceRecordIsMine(r))return false;
    if(type!=='全部'&&r.type!==type)return false;
    if(q&&!String(r.students||'').toLowerCase().includes(q))return false;
    return true;
  });
};
const cePreviewRecordSetModeBase=ceRecordSetMode;
ceRecordSetMode=function(){ceRecordMode='mine';ceRecordFilterResetDraft();ceRecordPageSize=6;ceRender()};
const cePreviewRecordsPageBase=ceRecordsPage;
ceRecordsPage=function(){
  ceRecordFilterResetDraft();
  return cePreviewRecordsPageBase().replace(/<div class="ce-record-mode-switch">[\s\S]*?<\/div>/,'').replace('<button onclick="ceInfo()">我的评价 ⓘ</button>','<button>评级记录</button>').replace(' ⓘ','').replace('onclick="ceInfo()"','').replace('搜索检查项、学生姓名、评价老师','请输入学生姓名搜索');
};

/* 设置页执行时间：用统一日期范围卡片打开底部日期选择。 */
function ceSettingsExecutionText(d){
  return (d.executionStart||'请选择')+' 至 '+(d.executionEnd||'请选择');
}
const cePreviewSettingsDateDraft={start:'',end:''};
function cePreviewSettingsDateSheet(){
  const d=ceSettingsState.draft;cePreviewSettingsDateDraft.start=d.executionStart||'';cePreviewSettingsDateDraft.end=d.executionEnd||'';
  sheet('<div class="ce-settings-date-sheet"><h3>执行时间</h3><div class="ce-settings-date-card"><div><span>开始日期</span><input type="date" value="'+ceEscape(cePreviewSettingsDateDraft.start)+'" onchange="cePreviewSettingsDateDraft.start=this.value"></div><i>至</i><div><span>结束日期</span><input type="date" value="'+ceEscape(cePreviewSettingsDateDraft.end)+'" onchange="cePreviewSettingsDateDraft.end=this.value"></div></div><div class="ce-popup-footer"><button class="ce-popup-cancel" onclick="ceSettingsGroupForm()">取消</button><button class="ce-popup-confirm" onclick="cePreviewConfirmSettingsDate()">确定</button></div></div>');
}
function cePreviewConfirmSettingsDate(){
  const d=cePreviewSettingsDateDraft;
  if(d.start&&d.end&&d.start>d.end){toast('开始日期不能晚于结束日期');return}
  ceSettingsState.draft.executionStart=d.start;ceSettingsState.draft.executionEnd=d.end;ceSettingsGroupForm();
}
const cePreviewSettingsFormBase=ceSettingsGroupForm;
ceSettingsGroupForm=function(){
  cePreviewSettingsFormBase();
  const form=document.querySelector('.ce-settings-form');if(!form)return;
  const name=form.querySelector('.ce-duty-input-row>span');if(name)name.innerHTML='小组名称<i class="ce-required-mark">*</i>';
  const teacher=form.querySelector('.ce-duty-teacher-box>div:first-child');if(teacher){const count=ceSettingsState.draft.teachers.length;teacher.innerHTML='<span>值周老师<i class="ce-required-mark">*</i></span><em><b>'+count+'</b>人</em>';teacher.className='ce-duty-teacher-label'}
  const grade=form.querySelector('.ce-duty-grade-title>span');if(grade)grade.innerHTML='负责年级<i class="ce-required-mark">*</i>';
  const execution=form.querySelector('.ce-duty-execution-box');if(execution){execution.innerHTML='<span>执行时间</span><button class="ce-duty-date-trigger" onclick="cePreviewSettingsDateSheet()"><span>'+ceSettingsExecutionText(ceSettingsState.draft)+'</span><i>›</i></button>'}
};

const cePreviewResetTabBase=ceResetTabDefault;
ceResetTabDefault=function(id){
  cePreviewResetTabBase(id);
  if(id==='ce-rank'){ceState.rankPeriod='本周';Object.assign(cePreviewRankDates,{start:'',end:'',draftStart:'',draftEnd:''})}
  if(id==='ce-records'){ceState.period='本周';Object.assign(cePreviewDates,{start:'',end:'',draftStart:'',draftEnd:''})}
};
