/* 今日评价专用。学校Web检查项设置为正式来源；此适配器只读取已有本地演示目录。 */
const ceTodayChecks=ceCategories.flatMap((category,ci)=>Object.entries(ceSubcategories[category]).flatMap(([subcategory,types],si)=>['扣分','加分'].flatMap(type=>(types[type]||[]).map((item,i)=>{
  const match=item.match(/[（(][+-]?(\d+(?:\.\d+)?)分\/人[）)]/);
  const fallback=item.match(/[+-]?(\d+(?:\.\d+)?)分/);
  return {id:`demo-check-${ci}-${si}-${type==='扣分'?'minus':'plus'}-${i}`,category:category+'·'+subcategory,primary:category,secondary:subcategory,type,item,unitTenths:match?Math.round(Number(match[1])*10):(fallback?Math.round(Number(fallback[1])*10):0),enabled:true,source:'学校端Web的检查项设置'};
}))));
// 加分、扣分共用单检查项分值范围；累计总分不限制。
const ceTodayLimits={manualDeductMaxTenths:1000,manualPlusMaxTenths:1000};
const ceTodayMaxMessage='单个检查项不允许超过100.0分';
const ceTodayLegacy={sheetRender:ceSheetRender,confirmDraft:ceConfirmDraft,scoreAdjust:ceScoreAdjust,finish:ceFinish};
let ceTodaySearchQuery='';
function ceTodayCheckSignature(def){return [def.id,def.category,def.type,def.item,def.unitTenths,def.enabled!==false].join('|')}
function ceTodayDefinitionForId(id){return ceTodayChecks.find(d=>d.id===id)}
function ceTodayNormalizeMedia(media){return (media||[]).map((m,i)=>typeof m==='string'?{kind:m,name:'演示'+m+(i+1),sizeMB:m==='图片'?2.4:28.6,progress:100}:m)}
function ceTodayMediaTotal(){return (ceDraft&&ceDraft.media?ceDraft.media:[]).length}
function ceTodayMediaAdd(kind,sizeMB){
  if(!ceDraft)return;
  if(ceTodayMediaTotal()>=9){toast('图片和视频最多上传9个');return}
  const max=kind==='图片'?10:100;
  if(sizeMB>max){toast((kind==='图片'?'图片':'视频')+'大小不能超过'+max+'M');return}
  ceDraft.media=ceTodayNormalizeMedia(ceDraft.media);ceDraft.media.push({kind,name:'演示'+kind+(ceDraft.media.length+1),sizeMB,progress:0});ceSheetRender();
  const index=ceDraft.media.length-1;
  setTimeout(()=>{if(ceDraft&&ceDraft.media[index]){ceDraft.media[index].progress=100;ceSheetRender()}},320);
}
ceMediaAdd=function(kind){ceTodayMediaAdd(kind,kind==='图片'?2.4:28.6)};
ceMediaRemove=function(i){if(!ceDraft)return;ceDraft.media=ceTodayNormalizeMedia(ceDraft.media);ceDraft.media.splice(i,1);ceSheetRender()};
function ceTodayDemoInfo(){toggleDemo()}
function ceTodayDefinition(index,type){return ceTodayChecks.filter(d=>d.type===type&&d.primary===ceState.category&&(ceState.subcategory==='全部维度'||d.secondary===ceState.subcategory))[index]}
function ceTodayDefinitionFor(entry){return ceTodayChecks.find(d=>d.id===entry.checkId)||ceTodayChecks.find(d=>d.type===entry.type&&d.primary===entry.category.split('·')[0]&&entry.item.replace(/^.*? · /,'')===d.item&&(entry.category.split('·')[1]==='全部维度'||d.secondary===entry.category.split('·')[1]))}
function ceTodaySign(type){return type==='加分'?1:-1}
function ceTodayManualMax(type){return type==='扣分'?ceTodayLimits.manualDeductMaxTenths:ceTodayLimits.manualPlusMaxTenths}
function ceTodaySyncScore(draft){
  draft.students=[...new Set(draft.students)];
  draft.scoreMode='default-multiplier';
  draft.score=ceTodaySign(draft.type)*draft.manualTenths/10;
}
function ceTodayValidate(entry){
  const current=ceTodayDefinitionForId(entry.checkId);
  if(!current||current.enabled===false||entry.checkSignature!==ceTodayCheckSignature(current)){toast('检查项已变更，请重新进入当前页面');return false}
  if(!Number.isInteger(entry.unitTenths)||entry.unitTenths<=0){toast('该检查项尚未配置默认分值');return false}
  if(!entry.students.length){
    const text=String(entry.manualInput??(entry.manualTenths/10));
    if(!/^\d+(?:\.\d)?$/.test(text)){toast('请输入分值，最多一位小数');return false}
    const amount=Math.round(Number(text)*10),max=ceTodayManualMax(entry.type);
    if(amount<entry.unitTenths){toast('单次'+entry.type+'不能低于默认值'+(entry.unitTenths/10).toFixed(1)+'分');return false}
    if(max!==null&&amount>max){toast(ceTodayMaxMessage);return false}
    entry.manualTenths=amount;
  }else{
    const groups=ceStudentGroups();
    if(entry.students.some(id=>{const p=id.split('::'),c=ceClassByName(p[0]);return !c||!c.students.includes(p[1])||!groups.some(g=>g.name===p[0])})){toast('关联学生不属于本次评价班级');return false}
  }
  ceTodaySyncScore(entry);return true;
}
ceEntry=function(type,index){const def=ceTodayDefinition(index,type);return def&&ceState.entries.find(e=>e.checkId===def.id)};
function ceTodayOpenDefinition(def,stored){
  if(!ceRequireEvaluationPermission(ceSessionClasses()))return;
  if(!def){toast('学生状态错误，请重新进入');return}
  const old=stored||ceState.entries.find(e=>e.checkId===def.id);
  ceEditingId=null;
  const students=old?(old.students||[]).slice():(ceState.scanOnly&&ceState.scanStudent?[ceState.scanStudent]:[]);
  const manualTenths=old&&Number.isInteger(old.manualTenths)?old.manualTenths:old&&!students.length?Math.round(Math.abs(old.score)*10):def.unitTenths;
  ceDraft={checkId:def.id,type:def.type,index:def.index,item:def.item,category:def.category,unitTenths:def.unitTenths,checkSignature:ceTodayCheckSignature(def),manualTenths,manualInput:(manualTenths/10).toFixed(1),score:0,text:old?old.text||'':'',students,media:ceTodayNormalizeMedia(old&&old.media?old.media.slice():[]),studentFolds:{}};
  ceTodaySyncScore(ceDraft);cePopupTab='score';ceStudentQuery='';ceSheetRender();
}
ceOpenItem=function(index,type,stored){
  const def=stored?ceTodayDefinitionFor(stored):ceTodayDefinition(index,type);
  ceTodayOpenDefinition(def,stored);
};
function ceTodayOpenDefinitionById(id){
  const def=ceTodayDefinitionForId(id);
  if(!def){toast('检查项已变更，请重新进入当前页面');return}
  ceTodayOpenDefinition(def,ceState.entries.find(e=>e.checkId===id));
};
function ceTodayManualInput(value){
  if(!ceDraft||ceEditingId)return;
  const max=ceTodayManualMax(ceDraft.type),amount=Math.round(Number(value)*10);
  if(Number.isFinite(Number(value))&&max!==null&&Number(value)>max/10){toast(ceTodayMaxMessage);const input=document.getElementById('ce-today-score-input');if(input)input.value=ceDraft.manualInput;return}
  ceDraft.manualInput=value;
  if(/^\d+(?:\.\d)?$/.test(value)&&amount>=ceDraft.unitTenths&&(max===null||amount<=max)){ceDraft.manualTenths=amount;ceTodaySyncScore(ceDraft)}
}
function ceTodayManualBlur(){if(ceDraft&&ceTodayValidate(ceDraft)){ceDraft.manualInput=(ceDraft.manualTenths/10).toFixed(1);const input=document.getElementById('ce-today-score-input');if(input)input.value=ceDraft.manualInput}}
ceScoreAdjust=function(delta){
  if(ceEditingId){ceTodayLegacy.scoreAdjust(delta);return}
  if(!ceDraft)return;
  const amount=ceDraft.manualTenths+Math.round(delta*ceDraft.unitTenths),max=ceTodayManualMax(ceDraft.type);
  if(max!==null&&amount>max){toast(ceTodayMaxMessage);return}
  ceDraft.manualTenths=Math.max(ceDraft.unitTenths,max===null?amount:Math.min(max,amount));
  ceDraft.manualInput=(ceDraft.manualTenths/10).toFixed(1);ceTodaySyncScore(ceDraft);ceSheetRender();
};
function ceTodayToggleStudent(id){
  if(!ceDraft||!ceStudentGroups().some(g=>g.students.some(s=>g.name+'::'+s===id)))return;
  ceDraft.students=ceDraft.students.includes(id)?ceDraft.students.filter(s=>s!==id):ceDraft.students.concat(id);
  ceTodaySyncScore(ceDraft);ceSheetRender();
}
function ceTodayStudentRows(){return ceStudentGroups().map((g,i)=>{
  const selected=g.students.filter(s=>ceDraft.students.includes(g.name+'::'+s)).length;
  const folded=ceDraft.studentFolds[i],q=ceStudentQuery.trim().toLowerCase(),classHit=g.name.toLowerCase().includes(q),filtered=g.students.filter(s=>!q||classHit||s.toLowerCase().includes(q));
  return '<div class="ce-student-group"><button class="ce-today-student-title" onclick="ceDraft.studentFolds['+i+']=!ceDraft.studentFolds['+i+'];ceSheetRender()">'+ceFold(folded)+ceEscape(ceClassDisplayName(g.name))+'（<b>'+selected+'</b>/'+g.students.length+'）</button>'+(folded?'':'<div class="ce-student-list">'+filtered.map(s=>{const id=g.name+'::'+s;return '<button class="ce-student-chip '+(ceDraft.students.includes(id)?'on':'')+'" aria-pressed="'+ceDraft.students.includes(id)+'" onclick="ceTodayToggleStudent(\''+ceEscape(id)+'\')">'+(q?ceEscape(ceClassDisplayName(g.name))+' · ':'')+ceEscape(s)+'</button>'}).join('')+'</div>'+(filtered.length?'':'<div class="ce-today-help">暂无匹配学生</div>'))+'</div>';
}).join('')}
function ceTodaySearchStudents(value){ceStudentQuery=value;const list=document.getElementById('ce-today-student-groups');if(list)list.innerHTML=ceTodayStudentRows()}
function ceTodayMatches(def){
  const q=ceTodaySearchQuery.trim().toLowerCase();
  return !q||[def.primary,def.secondary,def.item].some(v=>String(v).toLowerCase().includes(q));
}
function ceTodayVisibleDefinitions(type){
  return ceTodayChecks.filter(d=>d.type===type&&(ceTodaySearchQuery.trim()||d.primary===ceState.category&&(ceState.subcategory==='全部维度'||d.secondary===ceState.subcategory))&&ceTodayMatches(d));
}
function ceTodaySubcategoryClick(sub){
  if(ceState.subcategory==='全部维度'){
    const el=document.getElementById('ce-today-sub-'+encodeURIComponent(sub));
    const track=document.querySelector('.ce-today-option-scroll');
    if(el&&track)track.scrollTo({top:Math.max(0,el.offsetTop-4),behavior:'smooth'});
    return;
  }
  ceState.subcategory=sub;ceRender();
}
function ceTodayCard(def){
  const e=ceState.entries.find(x=>x.checkId===def.id);
  const amount=e?(def.type==='加分'?'加分：+'+Number(e.score).toFixed(1):'扣分：'+Number(e.score).toFixed(1)):(def.type==='加分'?'加分：0':'扣分：0');
  return '<button class="ce-option '+(e?'on':'')+'" onclick="ceTodayOpenDefinitionById(\''+def.id+'\')">'+ceEscape(def.item)+'<small>'+amount+'</small></button>';
}
function ceTodaySubgroup(defs,sub,type){
  const cards=defs.filter(d=>d.secondary===sub).map(ceTodayCard).join('');
  return '<section class="ce-today-subgroup" id="ce-today-sub-'+encodeURIComponent(sub)+'"><h4>'+ceEscape(sub)+'</h4>'+ (cards||'<div class="ce-today-help">暂无匹配检查项</div>')+'</section>';
}
const ceTodayPageBase=ceTodayPage;
ceTodayPage=function(){
  const type=ceState.todayTab==='加分'?'加分':'扣分',set=ceSubcategories[ceState.category]||{},subKeys=Object.keys(set);
  if(ceState.subcategory!=='全部维度'&&!subKeys.includes(ceState.subcategory))ceState.subcategory='全部维度';
  const cats=ceCategories.map(c=>'<button class="'+(ceState.category===c?'on':'')+'" onclick="ceState.category=\''+c+'\';ceState.subcategory=\'全部维度\';ceRender()">'+c+'</button>').join('');
  const seg=['扣分','加分','在评'].map(t=>'<button class="'+(ceState.todayTab===t?'on':'')+'" onclick="ceState.todayTab=\''+t+'\';ceRender()">'+(t==='在评'?'在评<span class="ce-tab-count">（<b>'+ceState.entries.length+'</b>）</span>':t)+'</button>').join('');
  const search='<div class="ce-search ce-today-search"><span>⌕</span><input value="'+ceEscape(ceTodaySearchQuery)+'" placeholder="请输入关键字搜索" oninput="ceTodaySearchQuery=this.value;ceRender()"></div>';
  if(ceState.todayTab==='在评')return '<div class="ce-today-top">'+search+'<div class="ce-segment">'+seg+'</div></div>'+ceReviewPage();
  const defs=ceTodayVisibleDefinitions(type),groups=ceTodaySearchQuery.trim()?ceCategories.map(primary=>Object.keys(ceSubcategories[primary]).map(sub=>{const found=defs.filter(d=>d.primary===primary&&d.secondary===sub);return found.length?'<section class="ce-today-subgroup"><h4>'+ceEscape(primary+' · '+sub)+'</h4>'+found.map(ceTodayCard).join('')+'</section>':''}).join('')).join('')||'<div class="ce-today-help">暂无匹配检查项</div>':ceState.subcategory==='全部维度'?subKeys.map(s=>ceTodaySubgroup(defs,s,type)).join(''):ceTodaySubgroup(defs,ceState.subcategory,type);
  const subs='<button class="ce-subchip '+(ceState.subcategory==='全部维度'?'on':'')+'" onclick="ceState.subcategory=\'全部维度\';ceRender()">全部维度</button>'+subKeys.map(s=>'<button class="ce-subchip" onclick="ceTodaySubcategoryClick(\''+ceEscape(s)+'\')">'+ceEscape(s)+'</button>').join('');
  return '<div class="ce-today-top">'+search+'<div class="ce-segment">'+seg+'</div></div><div class="ce-eval-layout"><aside class="ce-cats ce-today-cats-scroll">'+cats+'</aside><section class="ce-options"><div class="ce-subchips">'+subs+'</div><div class="ce-today-dimension-title">'+ceEscape(ceState.category)+' · '+ceEscape(ceState.subcategory)+'</div><div class="ce-option-track ce-today-option-scroll">'+groups+'</div></section></div>';
};
function ceTodayScoreCard(){
  const d=ceDraft;
  return '<div class="ce-today-score-card"><div class="ce-today-card-label">检查项目</div><h3>'+ceEscape(d.item)+'</h3></div><div class="ce-today-score-card"><div class="ce-today-rule-row"><span>本次'+d.type+'</span></div><div class="ce-today-score-control"><button aria-label="减少'+d.type+'" onclick="ceScoreAdjust(-1)" '+(d.manualTenths<=d.unitTenths?'disabled':'')+'>−</button><label><span>'+(d.type==='扣分'?'−':'+')+'</span><input id="ce-today-score-input" type="text" inputmode="decimal" aria-label="'+d.type+'分值" value="'+ceEscape(d.manualInput)+'" oninput="ceTodayManualInput(this.value)" onblur="ceTodayManualBlur()"></label><button aria-label="增加'+d.type+'" onclick="ceScoreAdjust(1)">＋</button></div></div>';
}
ceSheetRender=function(){
  if(!ceDraft)return;ceTodaySyncScore(ceDraft);
  const oldList=document.getElementById('ce-today-student-groups'),scroll=oldList?oldList.scrollTop:0;
  const tab=cePopupTab,tabs='<div class="ce-popup-tabs">'+[['score','评分'],['media','图文评价'],['students','关联学生']].map(([id,name])=>'<button class="'+(tab===id?'on':'')+'" onclick="cePopupTab=\''+id+'\';ceSheetRender()">'+name+(id==='students'&&ceDraft.students.length?'<span class="ce-badge">'+ceDraft.students.length+'</span>':'')+'</button>').join('')+'</div>';
  let content=ceEditingId?'<div class="ce-history-readonly"><b>评分</b><span>'+ceEscape(ceDraft.type)+'：'+(ceDraft.type==='加分'?'+':'')+Number(ceDraft.score).toFixed(1)+'</span><small>已提交记录的评分不可修改</small></div>':ceTodayScoreCard();
  if(tab==='media'){ceDraft.media=ceTodayNormalizeMedia(ceDraft.media);content='<div class="ce-popup-item">'+ceEscape(ceDraft.item)+'</div><textarea class="ce-popup-text" maxlength="100" placeholder="请输入图文评价内容（100字以内）" oninput="ceDraft.text=this.value.slice(0,100)">'+ceEscape(ceDraft.text.slice(0,100))+'</textarea><div class="ce-media-actions"><button onclick="ceMediaAdd(\'图片\')">＋ 添加图片</button></div>'+(ceDraft.media.length?'<div class="ce-media-thumbs">'+ceDraft.media.map((m,i)=>'<div class="ce-media-thumb"><span>'+(m.kind==='图片'?'▧':'▶')+'</span><small>'+m.progress+'%</small><button class="remove" aria-label="删除媒体" onclick="ceMediaRemove('+i+')">×</button></div>').join('')+'</div>':'')}
  if(tab==='students')content=ceEditingId?'<div class="ce-history-readonly"><b>关联学生</b><span>'+ceEscape(ceTodayStudentLabel(ceDraft.students))+'</span><small>已提交记录的关联学生不可修改</small></div>':'<div class="ce-student-filter">⌕<input value="'+ceEscape(ceStudentQuery)+'" placeholder="请输入学生姓名" oninput="ceTodaySearchStudents(this.value)"></div><div class="ce-student-groups" id="ce-today-student-groups">'+ceTodayStudentRows()+'</div>';
  sheet('<div class="ce-today-editor">'+tabs+'<div class="ce-popup-content">'+content+'</div><div class="ce-popup-footer"><button class="ce-popup-cancel" onclick="'+(ceEditingId?'ceReturnRecords()':'ceDraft=null;closeSheet()')+'">取消</button><button class="ce-popup-confirm" onclick="ceConfirmDraft()">确定</button></div></div>');
  const list=document.getElementById('ce-today-student-groups');if(list)list.scrollTop=scroll;
};
ceConfirmDraft=function(){
  if(ceEditingId){ceTodayConfirmRecordEdit();return}
  if(!ceDraft||!ceTodayValidate(ceDraft))return;
  const {studentFolds,...draft}=ceDraft,entry={...draft,students:draft.students.slice(),media:draft.media.slice()};
  const old=ceState.entries.find(e=>e.checkId===entry.checkId);
  if(old)Object.assign(old,entry);else ceState.entries.push(entry);
  ceRecalcSession();ceDraft=null;closeSheet();ceRender();
};
function ceTodayRecordDefinition(r){
  const current=r&&r.checkId?ceTodayDefinitionForId(r.checkId):null;
  if(current)return current;
  const parts=String(r&&r.category||'文明礼仪·仪容规范').split('·'),item=r&&r.items||'';
  return ceTodayChecks.find(d=>d.type===r.type&&d.primary===parts[0]&&d.secondary===parts[1]&&d.item===item)||{id:'legacy-'+(r&&r.id||'record'),category:parts.join('·'),primary:parts[0],secondary:parts[1],type:r.type,item,unitTenths:Math.max(1,Math.round(Math.abs(Number(r.value||0))*10)),enabled:true};
}
function ceTodayPrepareRecordEdit(r){
  const def=ceTodayRecordDefinition(r),students=(r.studentIds||[]).slice(),manualTenths=Number.isInteger(r.manualTenths)?r.manualTenths:(!students.length?Math.round(Math.abs(Number(r.value||0))*10):def.unitTenths);
  ceDraft={checkId:def.id,type:r.type,index:-1,item:r.items||def.item,category:r.category||def.category,unitTenths:def.unitTenths,checkSignature:ceTodayCheckSignature(def),manualTenths,manualInput:(manualTenths/10).toFixed(1),score:Number(r.value||0),text:r.text||'',students,media:ceTodayNormalizeMedia(r.media||[]),studentFolds:{}};
  ceTodaySyncScore(ceDraft);cePopupTab='score';ceStudentQuery='';ceSheetRender();
}
const ceTodayLegacyEditRecord=ceEditRecord;
ceEditRecord=function(id){
  const r=ceLedger.records.find(x=>x.id===id);if(!ceEditableRecord(r)){toast('仅可修改本人提交的记录');return}
  ceEditingId=id;ceTodayPrepareRecordEdit(r);
};
function ceTodayValidateRecordEdit(r){
  if(!r||!ceDraft)return false;
  // 兼容早期演示种子记录：没有检查项版本信息时保留原有直接改分能力。
  if(!r.checkId){return Number.isFinite(Number(ceDraft.score))}
  const current=ceTodayDefinitionForId(r.checkId);
  if(!current||current.enabled===false||r.checkSignature&&r.checkSignature!==ceTodayCheckSignature(current)){toast('检查项已变更，请重新进入当前页面');return false}
  if(ceDraft.students.length){
    const groups=ceStudentGroups();
    if(ceDraft.students.some(id=>{const p=id.split('::'),c=ceClassByName(p[0]);return !c||!c.students.includes(p[1])||!groups.some(g=>g.name===p[0])})){toast('关联学生不属于本次评价班级');return false}
    if(ceDraft.unitTenths*ceDraft.students.length>ceTodayLimits.autoMaxTenths){toast(ceTodayMaxMessage);return false}
  }else{
    const text=String(ceDraft.manualInput??(Math.abs(ceDraft.score)||ceDraft.unitTenths/10));
    if(!/^\d+(?:\.\d)?$/.test(text)){toast('请输入分值，最多一位小数');return false}
    const amount=Math.round(Number(text)*10);if(amount<ceDraft.unitTenths){toast('单次'+ceDraft.type+'不能低于默认值'+(ceDraft.unitTenths/10).toFixed(1)+'分');return false}
    if(amount>ceTodayManualMax(ceDraft.type)){toast(ceTodayMaxMessage);return false}
    ceDraft.manualTenths=amount;
  }
  ceTodaySyncScore(ceDraft);return true;
}
function ceTodayConfirmRecordEdit(){
  const r=ceLedger.records.find(x=>x.id===ceEditingId);if(!ceEditableRecord(r)||!ceDraft)return;
  Object.assign(r,{text:ceDraft.text,media:ceDraft.media.slice(),updatedAt:new Date().toISOString()});
  ceSaveChange(r);ceReturnRecords();
}
function ceTodayDetailFoldDefaults(){return ceCategories.reduce((map,name)=>{map[name]=true;return map},{});}
function ceTodayRenderDetailSheet(){
  const all=ceDetailRecords(),filtered=all.filter(r=>ceState.detailFilter==='全部'||r.type===ceState.detailFilter).sort((a,b)=>String(b.time).localeCompare(String(a.time)));
  let body;
  if(ceState.detailTab==='records'){
    const filter=['全部','扣分','加分'].map(f=>'<button class="'+(f===ceState.detailFilter?'on':'')+'" onclick="ceState.detailFilter=\''+f+'\';ceDetailSheetRender()">'+f+'</button>').join('');
    body='<div class="ce-record-filter-row">'+filter+'<span class="ce-record-count">评价次数：<b>'+filtered.length+'</b></span></div>'+(filtered.map(ceRecordCard).join('')||'<div class="ce-review-empty">暂无评价记录</div>');
  }else{
    body='<div class="ce-score-detail-head"><span>指标维度</span><span>评价次数</span><span>加分</span><span>扣分</span></div>'+ceSummaryRow('全部维度',all,true)+ceCategories.map(d=>ceDimensionSummary(d,all)).join('');
  }
  const key=ceState.detailClass;
  sheet('<div class="ce-overview-sheet-tabs"><button class="'+(ceState.detailTab==='records'?'on':'')+'" onclick="ceState.detailTab=\'records\';ceDetailSheetRender()">评价记录</button><button class="'+(ceState.detailTab==='scores'?'on':'')+'" onclick="ceState.detailTab=\'scores\';ceDetailSheetRender()">评分明细</button></div><div class="ce-record-sheet-scroll">'+body+'</div>');
}
const ceTodayLegacyOpenScoreRecords=ceOpenScoreRecords;
ceOpenScoreRecords=function(name,type){
  ceState.detailClass=name;ceState.detailDate=ceState.evalDate;ceState.detailDimension=ceState.evalDimension;ceState.detailTab='records';ceState.detailFilter=type;ceDetailFolds=ceTodayDetailFoldDefaults();ceRecordReturn='detail';ceTodayRenderDetailSheet();
};
ceDetailSheetRender=ceTodayRenderDetailSheet;
const ceTodayLegacyAskDeleteRecord=ceAskDeleteRecord;
ceAskDeleteRecord=function(id){
  const r=ceLedger.records.find(x=>x.id===id);if(!ceEditableRecord(r)){toast('仅可删除本人提交的记录');return}
  const overlay=document.createElement('div');overlay.className='ce-confirm-overlay';overlay.innerHTML='<div class="ce-confirm-dialog" role="alertdialog" aria-modal="true" aria-label="删除"><h3>删除</h3><p>确定删除这条评价记录？删除后将同步更新班级加扣分和排行榜。</p><footer><button class="ce-popup-cancel" onclick="this.closest(\'.ce-confirm-overlay\').remove()">取消</button><button class="ce-popup-confirm" aria-label="确定删除" onclick="ceDeleteRecord(\''+id+'\');this.closest(\'.ce-confirm-overlay\').remove()">确定</button></footer></div>';
  document.querySelector('.phone').appendChild(overlay);
};
function ceTodayClassScore(entry,classId){
  if(!entry.checkId)return Number(entry.score); // 对现有测试/旧内存草稿兼容，不改存量记录。
  return ceTodaySign(entry.type)*entry.manualTenths/10;
}
ceRecalcSession=function(){let plus=0,minus=0;ceState.entries.forEach(e=>ceEntryTargets(e).forEach(id=>{const score=ceTodayClassScore(e,id);if(score>0)plus+=Math.round(score*10);else minus+=Math.round(-score*10)}));ceState.sessionPlus=plus/10;ceState.sessionMinus=minus/10};
function ceTodayStudentLabel(ids){
  if(!ids||!ids.length)return '--';
  const grouped={};ids.forEach(id=>{const parts=id.split('::'),clazz=parts[0],student=parts[1]||id;(grouped[clazz]||(grouped[clazz]=[])).push(student)});
  return Object.entries(grouped).map(([clazz,students])=>ceClassDisplayName(clazz)+'（'+students.join('、')+'）').join('、');
}
ceReviewPage=function(){return '<div class="ce-review-wrap">'+(ceState.entries.map((e,i)=>'<article class="ce-review-card '+(e.type==='加分'?'ce-review-plus':'ce-review-minus')+'"><div><span class="ce-review-label">指标维度：</span>'+ceEscape(e.category)+'</div><div><span class="ce-review-label">检查项目：</span>'+ceEscape(e.item)+'</div><div><span class="ce-review-label">关联学生：</span>'+ceEscape(ceTodayStudentLabel(e.students))+'</div><div class="ce-review-content"><span class="ce-review-label">评价内容：</span><span class="ce-review-content-text">'+ceEscape(e.text||'—').replace(/\n/g,'<br>')+'</span></div><div><b>'+e.type+'：'+(e.type==='加分'?'+':'')+Number(e.score).toFixed(1)+'</b></div><div class="ce-review-actions"><button aria-label="修改" onclick="ceOpenStored('+i+')">✎</button><button aria-label="删除" onclick="ceDeleteStored('+i+')">🗑</button></div></article>').join('')||'<div class="ce-review-empty">暂无在评记录<br><span style="font-size:11px">在扣分或加分页点击检查项开始评价</span></div>')+'</div>'};
ceFinish=function(){
  if(!ceRequireEvaluationPermission(ceSessionClasses()))return;
  if(!ceState.entries.length){toast('请先选择检查项');return}
  // 先验证整批，保证失败时没有部分班级已落账。
  for(const e of ceState.entries)if(e.checkId&&!ceTodayValidate(e))return;
  const now=new Date(),date=ceDateKey(now),time=date+' '+String(now.getHours()).padStart(2,'0')+':'+String(now.getMinutes()).padStart(2,'0');
  const records=ceState.entries.flatMap(e=>ceEntryTargets(e).map(classId=>{
    const c=ceClassById(classId),ids=e.students.filter(id=>id.split('::')[0]===c.name);
    return {id:ceNewId(),classId,clazz:c.name,date,time,type:e.type,value:String(ceTodayClassScore(e,classId)),items:e.item,category:e.category.replace('·全部维度','·'+e.item.split(' · ')[0]),people:'王老师',studentIds:ids,students:ceStudentText(ids),text:e.text,media:(e.media||[]).slice(),updatedAt:now.toISOString(),checkId:e.checkId,checkSignature:e.checkSignature,unitTenths:e.unitTenths,manualTenths:e.manualTenths,scoreMode:e.students.length?'students':'manual'};
  }));
  if(!records.length){toast('关联学生不属于本次评价班级');return}
  ceLedger.records.unshift(...records);records.forEach(r=>ceSnapshot(r.classId,r.date));
  ceState.entries=[];ceRecalcSession();ceRefreshTotals();cePersist();toast('评价已记录');go('ce-records');
};

const ceTodayBaseRender=ceRender;
ceRender=function(){
  ceTodayBaseRender();
  const done=document.querySelector('#ce-actionbar .ce-done');if(done)done.textContent='完成评价';
};
