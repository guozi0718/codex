const assert = require('node:assert/strict');
const {load} = require('./原型测试工具-V2.0-20261008.cjs');
const file='第三版-独立关爱记录-V1.0-20261014.html';
let checks=0;
function ok(value,message){assert.ok(value,message);checks++;}
async function run(){
  for(const role of ['teacher','school','county','city','province','ministry']){
    const x=await load(file,'?role='+role), {document:d,window:w}=x;
    assert.deepEqual(x.errors,[]);ok(w.CARE_RECORD_V3.role===role,role+'启动');
    if(role!=='teacher'){
      while(d.querySelector('[data-drill]')){
        const heads=[...d.querySelectorAll('th')].map(e=>e.textContent);
        ok(heads.join('|').endsWith('关爱学生数|关爱次数'),'汇总人数和次数');
        ok(!d.querySelector('[name=types]')&&!d.body.textContent.includes('关爱类型'),'汇总去类型');
        d.querySelector('[data-drill]').click();
      }
      const heads=[...d.querySelectorAll('th')].map(e=>e.textContent);
      assert.deepEqual(heads,['学生姓名','年级','班级','创建日期','关爱来源','关爱类型','关爱原因','关爱时间','关爱结果','操作']);checks++;
      ok(d.querySelectorAll('colgroup col')[3].style.width==='145px','创建日期列完整容纳分钟格式');
      ok(d.querySelectorAll('th.operation').length===1,'固定操作列');
      d.querySelector('[data-detail]').click();ok(d.querySelectorAll('[data-single-content]').length===1,'单条详情');
      ok(!d.querySelector('.more'),'学校和监管只读');
      ok(d.querySelector('.dialog-body').textContent.includes('填写时间'),'系统时间保存展示');
      ok(!d.querySelector('.dialog-body').textContent.includes('创建日期'),'详情不展示创建日期');
      d.querySelector('.dialog-foot button').click();
      ok(d.querySelector('[name=start]').value===new Date().toLocaleDateString('sv-SE',{timeZone:'Asia/Shanghai'})&&d.querySelector('[name=end]').value===d.querySelector('[name=start]').value,'创建日期默认今日');
      ok(d.querySelector('[name=start]').type==='text'&&d.querySelector('[name=start]').placeholder==='YYYY-MM-DD','创建日期固定格式');
      ok(d.querySelector('#web-name-options option'),'姓名模糊回显数据源');
      ok(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/.test(d.querySelector('tbody td:nth-child(4)').textContent),'列表创建时间到分钟');
      d.querySelector('[name=name]').value='不存在';d.querySelector('#filters').dispatchEvent(new w.Event('submit',{cancelable:true}));
      ok(d.querySelector('.empty').textContent.includes('暂无'),'空查询');d.querySelector('[data-reset]').click();
      ok(d.querySelector('[data-detail]'),'重置恢复');
    }
    w.close();
  }
  const x=await load(file,'?role=teacher'),{document:d,window:w}=x, api=w.CARE_RECORD_V3;
  const click=s=>{ok(d.querySelector(s),'存在 '+s);d.querySelector(s).click();};
  const type=(s,v)=>{d.querySelector(s).value=v;d.querySelector(s).dispatchEvent(new w.Event('input',{bubbles:true}));};
  function pick(key,indices=[0]){click('[data-pick="'+key+'"]');const choices=[...d.querySelectorAll('.sheet input')];choices.forEach((e,i)=>e.checked=indices.includes(i));click('.sheet [data-confirm]');}
  function fill(){pick('grade');pick('className');pick('studentId');pick('sources',[0,1]);pick('types',[0,1]);type('#reason','实际情况');pick('method',[0]);type('#result','实际措施与结果');}
  ok([...d.querySelectorAll('.warning-tabs a')].map(x=>x.textContent).join('|')==='预警记录|劝返记录|关爱记录','控辍保学三个顶部Tab');
  ok(d.querySelector('.warning-tabs .active').textContent==='关爱记录','关爱记录第三Tab激活');
  ok(d.querySelectorAll('[data-record]').length===20,'老师端首批懒加载20条');
  ok(d.querySelector('#mobile-name-options option'),'老师端姓名模糊回显');
  const listScroll=d.querySelector('.scroll');Object.defineProperties(listScroll,{scrollTop:{value:100,writable:true},clientHeight:{value:500},scrollHeight:{value:550}});listScroll.dispatchEvent(new w.Event('scroll'));
  ok(d.querySelectorAll('[data-record]').length===40,'向下滚动再加载20条');
  click('[data-new]');
  assert.deepEqual([...d.querySelectorAll('[data-field]')].map(e=>e.dataset.field),['grade','className','studentId','sources','types','reason','date','people','method','result','proofs']);checks++;
  ok(!/填写人|填写时间|继续跟进|关联信息/.test(d.querySelector('#record-form').textContent),'表单仅业务字段');
  ok(d.querySelector('#reason').placeholder==='请填写学生的真实情况','关爱原因提示文字');
  type('#reason','真实情况');ok(d.querySelector('[data-count=reason]').textContent==='4/100','关爱原因实时计数');
  ok(d.querySelector('#reason').maxLength===100,'关爱原因超限不可编辑');
  click('#save');ok(d.querySelector('[data-error=grade]').textContent==='请选择年级','必填就地校验');
  fill();click('[data-pick=date]');ok(d.querySelectorAll('.calendar-day').length>=28,'整月日历');
  const beforeMonth=d.querySelector('.calendar-nav b').textContent;click('[data-month="1"]');ok(d.querySelector('.calendar-nav b').textContent!==beforeMonth,'切换下个月且范围不限制');
  const chosen=d.querySelector('.calendar-day').dataset.date;d.querySelector('.calendar-day').click();click('.sheet [data-confirm]');ok(d.querySelector('[data-pick=date]').textContent.includes(chosen),'选日确定带回');
  type('#result','字'.repeat(101));click('#save');ok(d.querySelector('[data-error=result]').textContent==='关爱结果最多100字','提交复核100字');
  type('#result','字'.repeat(100));const n=api.records.length;click('#save');ok(api.records.length===n+1,'创建一条');
  const saved=api.records.at(-1),created=saved.createdAt,id=saved.id;
  ok(saved.createdName==='王老师'&&saved.people.length===1,'填写人独立于执行人');
  ok(!('contents' in saved)&&!('caseId' in saved),'无个案多条嵌套');
  click('.more');click('[data-edit]');pick('types',[2]);click('[data-pick=date]');click('[data-month="1"]');const editedDate=d.querySelector('.calendar-day').dataset.date;d.querySelector('.calendar-day').click();click('.sheet [data-confirm]');click('#save');
  const edited=api.records.find(r=>r.id===id);ok(edited.createdAt===created&&edited.version===2,'编辑保留创建时间');
  ok(api.audit.at(-1).before.date===chosen&&api.audit.at(-1).after.date===editedDate,'前后审计');
  ok(api.sorted([{id:'1',createdAt:'2026-01-01 01:01:01'},{id:'2',createdAt:'2026-01-01 01:01:02'}])[0].id==='2','按创建时间逆序');
  const sorted=api.sorted([{id:'1',date:'2026-01-01',createdAt:'2026-01-01 01:01:01'},{id:'2',date:'2026-01-01',createdAt:'2026-01-01 01:01:02'},{id:'3',date:'2026-01-01',createdAt:'2026-01-01 01:01:02'}]);
  ok(sorted.map(r=>r.id).join(',')==='3,2,1','同日到秒与ID稳定排序');
  click('[data-back]');click('[data-new]');ok(d.querySelector('[data-pick=studentId]').textContent.includes('请选择'),'每次重新选学生');fill();click('#save');
  ok(api.records.length===n+2,'同生再次保存为独立记录');const second=api.records.at(-1);
  click('.more');click('[data-delete]');ok(d.querySelector('.confirm p').textContent==='确认删除该关爱记录吗？删除后不可恢复！','精确确认');click('[data-cancel]');ok(api.records.includes(second),'取消无删除');
  click('.more');click('[data-delete]');click('[data-confirm]');ok(!api.records.find(r=>r.id===second.id)&&api.records.find(r=>r.id===id),'删除不影响其他记录');
  ok(api.audit.at(-1).action==='删除'&&api.audit.at(-1).after===null,'删除审计');
  const other=api.records.find(r=>r.createdBy==='teacher-li'&&r.student.org[3]==='凤翔区第一实验小学');
  click('[data-detail="'+other.id+'"]');ok(!d.querySelector('.more'),'他人记录无操作');
  w.history.replaceState(null,'','#edit/'+other.id);w.dispatchEvent(new w.Event('hashchange'));ok(!d.querySelector('#record-form'),'直接编辑被拦截');
  const identity=d.querySelector('.demo select');identity.value='none';identity.dispatchEvent(new w.Event('change'));
  ok(d.querySelector('[data-new]').disabled,'无权限新增禁用');w.history.replaceState(null,'','#new');w.dispatchEvent(new w.Event('hashchange'));ok(!d.querySelector('#record-form'),'无权限直接入口拦截');
  assert.deepEqual(x.errors,[]);w.close();
  console.log('PASS 第三版六端与独立记录流程，共 '+checks+' 项断言');
}
run().then(()=>process.exit(0)).catch(e=>{console.error(e);process.exit(1)});
