// Pure state/render-output tests. No browser or user's persisted data is accessed.
const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const path = require('node:path');
const html = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
for (const match of html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)) new vm.Script(match[1]);
const begin = html.indexOf('const ceState=');
const end = html.indexOf('</script>', begin);
const nodes = new Map();
const node = key => {if(!nodes.has(key))nodes.set(key,{innerHTML:'',scrollTop:0,onclick:null,appendChild(){}});return nodes.get(key)};
let output='', notice='', passed=0;
const context=vm.createContext({
  Date, Math, Number, String, Object, Array, Set, JSON,
  localStorage:{getItem(){return null},setItem(){}},
  document:{querySelector:node,getElementById:node,createElement:()=>node('created')},
  curScreen:'ce-rank', sheet(value){output=value},closeSheet(){output=''},toast(value){notice=value},
  go(value){context.curScreen=value},setTimeout(){},
});
vm.runInContext(html.slice(begin,end),context);
vm.runInContext(fs.readFileSync(path.join(__dirname,'ce-evaluation.js'),'utf8'),context);
const frozenRenderers=vm.runInContext('[ceRankPage,ceMultiPage,ceRecordsPage,ceSettingsPage,ceDetailSheetRender].map(fn=>fn.toString()).join("\\n")',context);
const frozenCoreRenderers=vm.runInContext('[ceRankPage,ceMultiPage,ceRecordsPage,ceSettingsPage].map(fn=>fn.toString()).join("\\n")',context);
vm.runInContext(fs.readFileSync(path.join(__dirname,'ce-today.js'),'utf8'),context);
function read(code){return vm.runInContext(code,context)}
function test(name,fn){fn();passed++;console.log('PASS '+name)}
test('all six pages render without exceptions',()=>{read('ceRender()');assert.ok(node('ce-rank-body').innerHTML.includes('排行榜'));assert.ok(node('ce-multi-body').innerHTML.includes('六年级'))});
test('18 classes, negative and >100 scores, ties skip and creation order',()=>{
 const rows=read('ceRankRows()');assert.equal(rows.length,18);assert.ok(rows.some(r=>r.score<0));assert.ok(rows.some(r=>r.score>100));
 rows.forEach((r,i)=>{assert.equal(r.rank,i&&r.score===rows[i-1].score?rows[i-1].rank:i+1);if(i&&r.score===rows[i-1].score)assert.ok(r.row.createdAt>=rows[i-1].row.createdAt)});
 assert.ok(rows.some((r,i)=>i&&r.rank===rows[i-1].rank));
});
test('monthly filter exists, grade filters exclude other grades',()=>{read('ceRankPeriodSheet()');assert.ok(output.includes('本月'));read("ceState.rankGrades=['二年级'];");assert.equal(read('ceRankRows().length'),3);read("ceState.rankGrades=['全部年级']")});
test('single dimension uses base plus signed period sum',()=>{
 read("ceState.rankDimension='文明礼仪';ceState.rankPeriod='本月'");
 const actual=read('ceRankScore(ceSchoolClasses[0])');const expected=read("ceRound(20+ceRecordsFor(ceSchoolClasses[0].id,cePeriodStart('本月'),ceDemoToday,'文明礼仪').reduce((n,r)=>n+Number(r.value),0))");assert.equal(actual,expected);
 read("ceState.rankDimension='全部维度';ceState.rankPeriod='本周'");
});
test('grade body separates class, add and deduct actions',()=>{const markup=read('ceMultiPage()');assert.ok(markup.includes('ceEnterToday'));assert.ok(markup.includes("ceOpenScoreRecords('一年级1班','加分')"));assert.ok(markup.includes("ceOpenScoreRecords('一年级1班','扣分')"))});
test('new class entry resets draft and locks roster',()=>{read("ceEnterToday(['二年级1班','二年级2班']);ceState.selectedClass='三年级1班'");assert.equal(read('ceStudentGroups().length'),2);assert.equal(read('ceStudentGroups()[0].students.length'),3);assert.equal(read("ceStudentGroups().some(g=>g.name==='三年级1班')"),false)});
test('multi-class routing excludes unrelated classes and deduplicates students',()=>{
 assert.equal(read('ceEntryTargets({students:[]}).length'),2);
 assert.equal(read("ceEntryTargets({students:['二年级1班::王强','二年级1班::周欢','三年级1班::王强']}).length"),1);
});
test('multi-class submit creates equal records today and updates snapshots',()=>{
 const count=read('ceLedger.records.length');read("ceState.entries=[{type:'扣分',score:-2,item:'测试项',category:'文明礼仪·仪容规范',students:[],text:'',media:[]}];ceFinish()");
 assert.equal(read('ceLedger.records.length'),count+2);assert.equal(read('ceLedger.records[0].date'),read('ceDemoToday'));assert.equal(read('ceLedger.records[0].value'),'-2');assert.equal(read('ceLedger.records[1].value'),'-2');assert.ok(read('ceLedger.snapshots[ceLedger.records[0].classId+"::"+ceDemoToday]'));
});
test('student-associated submit affects only student class',()=>{
 const count=read('ceLedger.records.length');read("ceState.entries=[{type:'扣分',score:-3,item:'测试项',category:'文明礼仪·仪容规范',students:['二年级1班::王强'],text:'',media:[]}];ceFinish()");assert.equal(read('ceLedger.records.length'),count+1);assert.equal(read('ceLedger.records[0].clazz'),'二年级1班');
});
test('scan preselects student but permits clearing, direct entry is empty',()=>{
 read("ceEnterToday(['一年级1班'],'一年级1班::王强');ceOpenItem(0,'扣分')");assert.equal(read('ceDraft.students.length'),1);read('ceDraft.students=[];ceConfirmDraft()');assert.equal(read('ceState.entries[0].students.length'),0);
 read("ceEnterToday(['一年级1班']);ceOpenItem(0,'扣分')");assert.equal(read('ceDraft.students.length'),0);
});
test('detail filter, tabs and record menu actions render',()=>{
 read("ceOpenScoreRecords('一年级1班','扣分')");assert.ok(output.includes('评分明细'));assert.ok(output.includes('记录操作'));assert.ok(!output.includes('badge plus'));
 read('ceRecordActions(ceLedger.records[0].id)');assert.ok(output.includes('修改'));assert.ok(output.includes('删除'));assert.ok(output.includes('取消'));
});
test('editing original record only updates graphic content and preserves score/date/count',()=>{
 read("ceState.rankPeriod='本学期'"); // 历史记录跨周时也应落在本测试的统计范围内。
 read("ceTestRecord=ceLedger.records.find(r=>r.date<ceDemoToday&&r.date>=ceSchoolConfig.semesterStart);ceTestId=ceTestRecord.id;ceTestDate=ceTestRecord.date;ceTestClass=ceClassById(ceTestRecord.classId)");
 const count=read('ceLedger.records.length');const old=read('Number(ceTestRecord.value)');const before=read('ceRankScore(ceTestClass)');
 read('ceEditRecord(ceTestId)');assert.equal(read('ceDraft.score'),old);read("ceDraft.score=ceDraft.type==='加分'?8:-8;ceDraft.text='修改测试';ceConfirmDraft()");
 assert.equal(read('ceLedger.records.length'),count);assert.equal(read('ceTestRecord.date'),read('ceTestDate'));assert.equal(read('ceTestRecord.id'),read('ceTestId'));assert.equal(read('ceTestRecord.text'),'修改测试');assert.equal(read('Number(ceTestRecord.value)'),old);assert.equal(read('ceRound(ceRankScore(ceTestClass)-('+before+'))'),0);assert.ok(read('ceLedger.snapshots[ceTestRecord.classId+"::"+ceTestDate]'));
});
test('cancel edit does not mutate saved values',()=>{const old=read('ceTestRecord.text');read("ceEditRecord(ceTestId);ceDraft.text='取消草稿';ceReturnRecords()");assert.equal(read('ceTestRecord.text'),old)});
test('delete first requires dialog and only confirmation removes record',()=>{
 const count=read('ceLedger.records.length');read('ceAskDeleteRecord(ceTestId)');assert.equal(read('ceLedger.records.length'),count);assert.ok(node('created').innerHTML.includes('确定删除'));assert.ok(node('created').innerHTML.includes('取消'));
 read('ceDeleteRecord(ceTestId)');assert.equal(read('ceLedger.records.length'),count-1);assert.equal(read('ceLedger.records.some(r=>r.id===ceTestId)'),false);
});
test('history edit has no time boundary and future week protection',()=>{
 assert.equal(read("ceEditableRecord({date:'2001-01-01'})"),true);read("ceEnsureEvalDate();ceShiftEvalWeek(1)");assert.equal(notice,'当前周期尚未开始，无法选中');assert.equal(read("ceDateAllowed('2001-01-01')"),false);
});
test('all record cards have unified more menu; multi-select has no checkmark',()=>{
 assert.ok(read('ceRecordsPage()').includes('ceRecordActions'));read('ceMultiSelectSheet()');assert.ok(output.includes('ce-fold'));assert.equal(output.includes('✓'),false);
});
test('grade-four class entry denies without changing navigation or draft',()=>{
 read("ceEnterToday(['一年级1班']);ceOpenItem(0,'扣分');curScreen='ce-multi'");
 const state=read('JSON.stringify(ceState)'),draft=read('JSON.stringify(ceDraft)');
 for(const name of ['四年级1班','四年级2班','四年级3班']){
   assert.equal(read(`ceEnterToday(['${name}'])`),false);assert.equal(notice,'暂无点评权限');assert.equal(context.curScreen,'ce-multi');
   assert.equal(read('JSON.stringify(ceState)'),state);assert.equal(read('JSON.stringify(ceDraft)'),draft);
 }
});
test('scan grade-four badge denies; normal scan still exposes entry',()=>{
 read('ceScanClassSheet()');assert.ok(output.includes('进入评价'));assert.ok(output.includes('演示：扫描四年级校徽'));
 read("ceScanClassSheet('四年级1班')");assert.equal(notice,'暂无点评权限');assert.equal(context.curScreen,'ce-multi');
 assert.equal(read("ceEnterToday(['四年级1班'],'四年级1班::王强')"),false);
});
test('multi-class forbidden selection rejected; mixed confirmation cannot partially enter',()=>{
 read("ceMultiDraft=[];ceDrawMultiPicker();ceMultiPickClass('四年级1班')");assert.equal(notice,'暂无点评权限');assert.equal(read('ceMultiDraft.length'),0);
 read("ceMultiPickClass('二年级1班')");assert.equal(read('ceMultiDraft.length'),1);
 read("ceMultiDraft.push('四年级2班');ceMultiConfirm()");assert.equal(notice,'暂无点评权限');assert.equal(context.curScreen,'ce-multi');
 read("ceMultiPickClass('四年级2班');ceMultiConfirm()");assert.equal(context.curScreen,'ce-today');assert.equal(read('ceState.allowedClassIds.length'),1);
});
test('grade-four score details remain readable; detail evaluation uses common guard',()=>{
 read("ceOpenScoreRecords('四年级1班','扣分')");assert.ok(output.includes('评价记录'));assert.ok(output.includes("ceEnterToday(['四年级1班'])"));
 read("ceState.selectedClass='四年级1班'");assert.ok(read('ceDetailPage()').includes("ceEnterToday(['四年级1班'])"));
});
test('submission rechecks permission changes and preserves unsaved draft atomically',()=>{
 read("ceEnterToday(['一年级1班','二年级1班']);ceState.entries=[{type:'扣分',score:-2,item:'权限测试',category:'文明礼仪·仪容规范',students:[],text:'',media:[]}];cePermissionBackup=ceTeacherPermissions.classIds.slice();ceTeacherPermissions.classIds=ceTeacherPermissions.classIds.filter(id=>id!==ceClassByName('二年级1班').id)");
 const count=read('ceLedger.records.length');read('ceFinish()');assert.equal(notice,'暂无点评权限');assert.equal(read('ceLedger.records.length'),count);assert.equal(read('ceState.entries.length'),1);
 read('ceDraft=null;ceOpenItem(0,"扣分")');assert.equal(read('ceDraft'),null);
 read('ceTeacherPermissions.classIds=cePermissionBackup;ceFinish()');assert.equal(read('ceLedger.records.length'),count+2);
});
test('permission is configuration-driven rather than permanently blocking grade four',()=>{
 read("cePermissionBackup=ceTeacherPermissions.classIds.slice();ceTeacherPermissions.classIds.push(ceClassByName('四年级1班').id)");
 assert.equal(read("ceEnterToday(['四年级1班'])"),true);
 read('ceTeacherPermissions.classIds=cePermissionBackup');assert.equal(read("ceEnterToday(['四年级1班'])"),false);
});
test('all six persistent ranking tabs use the new label',()=>{
 assert.equal((html.match(/<i class="ce-ti">☆<\/i>排行<\/button>/g)||[]).length,6);
 assert.equal(html.includes('</i>评比</button>'),false);
});
test('rank layout declares bounded vertical and horizontal scroll tracks with hidden native bars',()=>{
 const css=fs.readFileSync(path.join(__dirname,'ce-evaluation.css'),'utf8');
 assert.match(css,/#ce-rank \.ce-body\{[^}]*display:flex;[^}]*min-height:0/);
 assert.match(css,/#ce-rank \.ce-rank-list\{[^}]*min-height:0;[^}]*overflow-y:auto;overflow-x:hidden/);
 assert.match(css,/#ce-rank \.ce-chips\{[^}]*overflow-x:auto;overflow-y:hidden/);
 assert.match(css,/\.phone,\.phone \*\{scrollbar-width:none/);
 assert.match(css,/\.phone \*::-webkit-scrollbar\{display:none;width:0;height:0\}/);
});
test('rank period enum is current-day based and filter buttons have no counts',()=>{
 read('ceRankPeriodSheet()');for(const p of ['今日','本周','本月','本学期','本学年'])assert.ok(output.includes(p));assert.ok(!output.includes('确定（'));
 assert.equal(read("cePeriodStart('今日')"),read('ceDemoToday'));assert.equal(read("cePeriodStart('本学年')"),read('ceSchoolConfig.schoolYearStart'));
});
test('today search covers primary, secondary and item, and all-dimension markup is ordered by secondary dimension',()=>{
 read("ceState.todayTab='扣分';ceState.category='文明礼仪';ceState.subcategory='全部维度';ceTodaySearchQuery='仪容规范';ceRender()");
 assert.ok(node('ce-today-body').innerHTML.includes('id="ce-today-sub-%E4 仪容规范'.replace('E4 ','E4'))||node('ce-today-body').innerHTML.includes('仪容规范'));
 const markup=read('ceTodayPage()');assert.ok(markup.includes('ce-today-sub-'));assert.ok(markup.includes('仪容规范'));
 read("ceTodaySearchQuery='男生留长发';ceState.subcategory='全部维度';");const filtered=read('ceTodayPage()');assert.ok(filtered.includes('男生留长发'));assert.ok(!filtered.includes('课间追逐打闹'));
});
test('opening item stores library signature and changed library blocks confirmation',()=>{
 read("ceTodaySearchQuery='';ceState.category='文明礼仪';ceState.subcategory='仪容规范';ceEnterToday(['一年级1班']);ceOpenItem(0,'扣分')");
 const originalTenths=read('ceTodayDefinition(0,"扣分").unitTenths');read('ceTodayChecks.find(d=>d.id===ceDraft.checkId).unitTenths=7');read('ceConfirmDraft()');assert.equal(notice,'检查项已变更，请重新进入当前页面');assert.equal(read('ceState.entries.length'),0);
 read('ceTodayChecks.find(d=>d.id===ceDraft.checkId).unitTenths='+originalTenths);read("ceDraft.checkSignature=ceTodayCheckSignature(ceTodayDefinitionForId(ceDraft.checkId));ceConfirmDraft()");assert.equal(read('ceState.entries.length'),1);
});
test('today completion text and in-review card groups students by class with module colors',()=>{
 read("ceEnterToday(['一年级1班']);ceOpenItem(0,'扣分');ceTodayToggleStudent('一年级1班::王强');ceConfirmDraft();ceState.todayTab='在评';ceRender()");assert.ok(node('ce-actionbar').textContent==='完成评价'||read('ceTodayPage()').includes('在评'));
 const review=read('ceReviewPage()');assert.ok(review.includes('一年级1班（'));assert.ok(review.includes('ce-review-minus')||review.includes('ce-review-plus'));
});
test('rank rerender restores horizontal and vertical scroll after replacing markup',()=>{
 const rank=node('ce-rank-body'),chips=node('#ce-rank .ce-chips'),list=node('#ce-rank .ce-rank-list');
 chips.scrollLeft=145;chips.scrollTop=0;list.scrollTop=310;list.scrollLeft=0;
 const descriptor=Object.getOwnPropertyDescriptor(rank,'innerHTML');let rendered=rank.innerHTML;
 Object.defineProperty(rank,'innerHTML',{configurable:true,get(){return rendered},set(value){rendered=value;chips.scrollLeft=0;list.scrollTop=0}});
 read('ceRender()');assert.equal(chips.scrollLeft,145);assert.equal(list.scrollTop,310);
 Object.defineProperty(rank,'innerHTML',{...descriptor,value:rendered});
});
test('finalized page renderers remain unchanged by today module',()=>{
 // 评价明细弹窗本轮按需求调整；其余已定版页面仍保持原渲染函数不变。
 assert.equal(read('[ceRankPage,ceMultiPage,ceRecordsPage,ceSettingsPage].map(fn=>fn.toString()).join("\\n")'),frozenCoreRenderers);
});
test('default score comes from each check item, not a fixed -1.2',()=>{
 read("ceEnterToday(['一年级1班']);ceState.category='文明礼仪';ceState.subcategory='仪容规范';ceOpenItem(2,'扣分')");
 assert.equal(read('ceDraft.score'),-.5);assert.equal(read('ceDraft.manualTenths'),5);
 read("ceState.category='校园安全';ceState.subcategory='物品安全';ceOpenItem(0,'扣分')");assert.equal(read('ceDraft.score'),-1);
});
test('manual one-decimal input, default minimum, and exact 100 maximum message for both types',()=>{
 for(const type of ['扣分','加分']){
  read(`ceEnterToday(['一年级1班']);ceState.category='文明礼仪';ceState.subcategory='仪容规范';ceOpenItem(0,'${type}')`);
  read("ceTodayManualInput('0.1');ceConfirmDraft()");assert.equal(read('ceState.entries.length'),0);assert.ok(notice.includes('不能低于默认值'));
  read("ceTodayManualInput('0.25');ceConfirmDraft()");assert.equal(read('ceState.entries.length'),0);assert.equal(notice,'请输入分值，最多一位小数');
  read("ceTodayManualInput('99.9');ceScoreAdjust(.1)");assert.equal(read('ceDraft.manualTenths'),1000);
  read('ceScoreAdjust(.1)');assert.equal(notice,'单个检查项不允许超过100.0分');assert.equal(read('ceDraft.manualTenths'),1000);
  read("ceTodayManualInput('100.1')");assert.equal(notice,'单个检查项不允许超过100.0分');assert.equal(read('ceDraft.manualInput'),'100.0');
  read('ceConfirmDraft()');assert.equal(read('Math.abs(ceState.entries[0].score)'),100);
 }
});
test('student multiplication locks manual changes and removing all restores input',()=>{
 for(const type of ['扣分','加分']){
  read(`ceEnterToday(['一年级1班']);ceState.category='文明礼仪';ceState.subcategory='仪容规范';ceOpenItem(0,'${type}');ceTodayManualInput('5.6');ceTodayToggleStudent('一年级1班::王强');ceTodayToggleStudent('一年级1班::周欢')`);
  assert.equal(read('Math.abs(ceDraft.score)'),.4);assert.equal(read('ceDraft.manualTenths'),56);
  assert.match(output,/id="ce-today-score-input"[^>]*disabled/);assert.equal((output.match(/onclick="ceScoreAdjust[^>]*disabled/g)||[]).length,2);
  read("ceScoreAdjust(.1);ceTodayManualInput('9.9')");assert.equal(read('Math.abs(ceDraft.score)'),.4);assert.equal(read('ceDraft.manualTenths'),56);
  read("ceTodayToggleStudent('一年级1班::王强');ceTodayToggleStudent('一年级1班::周欢')");assert.equal(read('Math.abs(ceDraft.score)'),5.6);assert.equal(read('ceDraft.manualInput'),'5.6');
 }
});
test('automatic selection at 100 rejects extra student without truncating score',()=>{
 for(const type of ['扣分','加分']){
  read(`ceEnterToday(['一年级1班']);ceOpenItem(0,'${type}');ceDraft.unitTenths=500;ceTodayToggleStudent('一年级1班::王强');ceTodayToggleStudent('一年级1班::周欢')`);
  assert.equal(read('Math.abs(ceDraft.score)'),100);
  read("ceTodayToggleStudent('一年级1班::黎明')");assert.equal(notice,'单个检查项不允许超过100.0分');assert.equal(read('ceDraft.students.length'),2);assert.equal(read('Math.abs(ceDraft.score)'),100);
  read("ceTodayToggleStudent('一年级1班::周欢')");assert.equal(read('Math.abs(ceDraft.score)'),50);
 }
});
test('all three popup tabs share confirmation and media never changes scoring',()=>{
 for(const tab of ['score','media','students']){
  read(`ceEnterToday(['一年级1班']);ceOpenItem(0,'扣分');cePopupTab='${tab}';ceSheetRender()`);
  assert.ok(output.includes('onclick="ceConfirmDraft()"'));
  read("ceDraft.text='图文不会改变分值';ceMediaAdd('图片');ceMediaAdd('视频');ceConfirmDraft()");assert.equal(read('ceState.entries[0].score'),-.2);assert.equal(read('ceState.entries[0].media.length'),2);
 }
});
test('pending edit restores students, media and saved manual score without duplicating item',()=>{
 read("ceEnterToday(['一年级1班']);ceOpenItem(0,'扣分');ceTodayManualInput('6.5');ceTodayToggleStudent('一年级1班::王强');ceDraft.text='评价文字';ceMediaAdd('图片');ceConfirmDraft();ceOpenStored(0)");
 assert.equal(read('ceDraft.score'),-.2);assert.equal(read('ceDraft.manualTenths'),65);assert.equal(read('ceDraft.text'),'评价文字');assert.equal(read('ceDraft.media.length'),1);
 read("ceTodayToggleStudent('一年级1班::王强');ceConfirmDraft()");assert.equal(read('ceState.entries.length'),1);assert.equal(read('ceState.entries[0].score'),-6.5);
 read("ceState.subcategory='全部维度';ceOpenItem(0,'扣分');ceConfirmDraft()");assert.equal(read('ceState.entries.length'),1);assert.equal(read('ceState.entries[0].score'),-6.5);
});
test('cancelled pending edit leaves prior scoring and content untouched',()=>{
 const saved=read('JSON.stringify(ceState.entries)');read("ceOpenStored(0);ceTodayManualInput('9.9');ceDraft.text='取消';ceDraft=null;closeSheet()");assert.equal(read('JSON.stringify(ceState.entries)'),saved);
});
test('multi-class auto scores per-class student counts and manual scores all classes',()=>{
 read("ceEnterToday(['一年级1班','一年级2班']);ceState.category='文明礼仪';ceState.subcategory='仪容规范';ceOpenItem(0,'扣分');ceTodayToggleStudent('一年级1班::王强');ceTodayToggleStudent('一年级1班::周欢');ceTodayToggleStudent('一年级2班::王强');ceConfirmDraft()");
 assert.equal(read('ceState.sessionMinus'),.6);
 let count=read('ceLedger.records.length');read('ceFinish()');assert.equal(read('ceLedger.records.length'),count+2);
 assert.equal(read("Number(ceLedger.records.slice(0,2).find(r=>r.clazz==='一年级1班').value)"),-.4);assert.equal(read("Number(ceLedger.records.slice(0,2).find(r=>r.clazz==='一年级2班').value)"),-.2);
 read("ceEnterToday(['一年级1班','一年级2班']);ceOpenItem(0,'加分');ceTodayManualInput('100.0');ceConfirmDraft()");assert.equal(read('ceState.sessionPlus'),200);
 read('ceFinish()');assert.equal(read('Number(ceLedger.records[0].value)'),100);assert.equal(read('Number(ceLedger.records[1].value)'),100);
});
test('student mode leaves non-associated selected classes unchanged',()=>{
 read("ceEnterToday(['一年级1班','一年级2班']);ceOpenItem(0,'加分');ceTodayToggleStudent('一年级1班::王强');ceConfirmDraft()");
 const count=read('ceLedger.records.length');read('ceFinish()');assert.equal(read('ceLedger.records.length'),count+1);assert.equal(read('ceLedger.records[0].clazz'),'一年级1班');assert.equal(read('Number(ceLedger.records[0].value)'),.2);
});
test('mixed plus/minus items submit together and aggregate without rounding drift',()=>{
 read("ceEnterToday(['一年级1班']);ceOpenItem(0,'扣分');ceTodayManualInput('0.3');ceConfirmDraft();ceOpenItem(0,'加分');ceTodayManualInput('0.6');ceConfirmDraft()");
 assert.equal(read('ceState.entries.length'),2);assert.equal(read('ceState.sessionPlus'),.6);assert.equal(read('ceState.sessionMinus'),.3);
 const count=read('ceLedger.records.length');read('ceFinish()');assert.equal(read('ceLedger.records.length'),count+2);
});
test('student search preserves class selected total and escapes text',()=>{
 read("ceEnterToday(['一年级1班']);ceOpenItem(0,'扣分');ceTodayToggleStudent('一年级1班::王强');cePopupTab='students';ceTodaySearchStudents('周欢')");
 const content=node('ce-today-student-groups').innerHTML;assert.ok(content.includes('<b>1</b>/3'));assert.ok(content.includes('周欢'));assert.ok(!content.includes('>王强</button>'));
 read("ceDraft.text='</textarea><script>bad()</script>';cePopupTab='media';ceSheetRender()");assert.ok(!output.includes('<script>bad()'));assert.ok(output.includes('&lt;script&gt;'));
});
test('automatic over-limit stale entry prevents entire batch from being saved',()=>{
 read("ceEnterToday(['一年级1班']);ceOpenItem(0,'扣分');ceConfirmDraft();ceOpenItem(0,'加分');ceConfirmDraft();ceState.entries[1].unitTenths=600;ceState.entries[1].students=['一年级1班::王强','一年级1班::周欢']");
 const count=read('ceLedger.records.length');read('ceFinish()');assert.equal(read('ceLedger.records.length'),count);assert.equal(notice,'单个检查项不允许超过100.0分');assert.equal(read('ceState.entries.length'),2);
});
test('multiple valid items can exceed 100 in one class cumulative total',()=>{
 read("ceEnterToday(['一年级1班']);ceState.category='文明礼仪';ceState.subcategory='仪容规范';ceOpenItem(0,'加分');ceTodayManualInput('100.0');ceConfirmDraft();ceOpenItem(1,'加分');ceTodayManualInput('100.0');ceConfirmDraft()");
 assert.equal(read('ceState.sessionPlus'),200);const count=read('ceLedger.records.length');read('ceFinish()');assert.equal(read('ceLedger.records.length'),count+2);
 assert.equal(read('Number(ceLedger.records[0].value)+Number(ceLedger.records[1].value)'),200);assert.equal(read('ceLedger.records[0].classId'),read('ceLedger.records[1].classId'));
});
console.log(`${passed} tests passed; scripts parsed. No user data changed.`);
