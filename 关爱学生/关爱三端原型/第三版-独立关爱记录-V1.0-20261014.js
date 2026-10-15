/* 第一期第三方案：一条记录即一次关爱。只共享已确认字典，不加载个案/预警联动旧脚本。 */
(function () {
  'use strict';
  const D = window.CARE_DICTIONARY_V1;
  const SOURCES = ['辍学预警','心理测评','班主任发现','任课教师反映','学生主动反映','家长反映','困难学生','欺凌事件','其他'];
  const TEACHERS = ['王老师','李老师','陈老师'];
  const TREE = {
    北京市:{省属:{市直:['北京市直属学校']},北京市:{市直:['北京市市直学校'],海淀区:['海淀区实验小学','海淀区第二中学'],朝阳区:['朝阳区实验小学','朝阳区第二中学']}},
    河北省:{省属:{市直:['河北省直属学校']},保定市:{市直:['保定市直属学校'],莲池区:['莲池区实验小学','莲池区第二中学'],竞秀区:['竞秀区实验小学','竞秀区第二中学']},邯郸市:{市直:['邯郸市直属学校'],丛台区:['丛台区实验小学','丛台区第二中学'],邯山区:['邯山区实验小学','邯山区第二中学']}},
    陕西省:{省属:{市直:['陕西省直属学校']},宝鸡市:{市直:['宝鸡市直属学校'],凤翔区:['凤翔区第一实验小学','凤翔区第二中学','凤翔区实验中学'],渭滨区:['渭滨区实验小学','渭滨区第一初级中学'],金台区:['金台区实验小学']},西安市:{市直:['西安市直属学校'],雁塔区:['雁塔区实验小学','雁塔区第二中学'],碑林区:['碑林区实验小学','碑林区第二中学']}}
  };
  const roots = {teacher:['陕西省','宝鸡市','凤翔区','凤翔区第一实验小学'],school:['陕西省','宝鸡市','凤翔区','凤翔区第一实验小学'],ministry:[],province:['陕西省'],city:['陕西省','宝鸡市'],county:['陕西省','宝鸡市','凤翔区']};
  const labels = {teacher:'老师端',school:'学校端',ministry:'部级监管端',province:'省级监管端',city:'地市监管端',county:'区县监管端'};
  const requested = new URLSearchParams(location.search).get('role');
  const role = Object.hasOwn(roots, requested) ? requested : 'teacher';
  const mobile = role === 'teacher';
  const regulator = !['teacher','school'].includes(role);
  const root = roots[role];
  let org = root.slice(), trail = [], page = 1, search = '', draft = null, editing = null, uploading = false, sequence = 0, mobileLoaded = 20;
  let account = {id:'teacher-wang',name:'王老师',write:true,operate:true,view:'all'};
  const students = [], records = [], audit = [];
  const clone = value => JSON.parse(JSON.stringify(value));
  const esc = value => String(value == null ? '' : value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const short = value => Array.from(value || '--').length > 10 ? Array.from(value).slice(0,10).join('') + '...' : value || '--';
  function now() { return new Intl.DateTimeFormat('sv-SE',{timeZone:'Asia/Shanghai',year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',second:'2-digit',hour12:false}).format(new Date()).replace('T',' '); }
  const today = () => now().slice(0,10);
  function validDate(value) { const d = new Date(value+'T00:00:00Z'); return /^\d{4}-\d{2}-\d{2}$/.test(value) && !isNaN(d) && d.toISOString().slice(0,10)===value; }
  function yearOf(value) { const y=Number(value.slice(0,4))-(Number(value.slice(5,7))<9?1:0); return y+'-'+(y+1)+'学年'; }
  function inside(path, scope) { return scope.every((name,i)=>path[i]===name); }
  const mainSchool = roots.school[3];
  Object.entries(TREE).forEach(([p,cities]) => Object.entries(cities).forEach(([c,counties]) => Object.entries(counties).forEach(([d,schools]) => schools.forEach((school) => {
    const schoolNo = students.length/4;
    ['张小明','李小红','王小华','陈小强'].forEach((name,i) => students.push({id:'s-'+schoolNo+'-'+i,name,grade:i<2?'七年级（2025级）':'八年级（2024级）',className:i%2?'1班':'2班',teacher:i%2?'李老师':'王老师',org:[p,c,d,school]}));
    if(school==='金台区实验小学') return;
    const local = students.slice(-4);
    const n = school===mainSchool ? 48 : 24;
    for(let i=0;i<n;i++) {
      const st=local[i%4], day=String(23-i%5).padStart(2,'0');
      const createdDay=i<4?today():'2026-09-25', createdHour=i<4?'11:25':'15:31';
      records.push({id:'r-'+String(++sequence).padStart(5,'0'),studentId:st.id,student:clone(st),sources:[SOURCES[i%3]],types:[D.typeLabels[i%D.typeLabels.length]],reason:'结合学生近期学习与家庭情况，开展有针对性的关爱。',date:'2026-09-'+day,people:[st.teacher],method:D.methodLabels[i%D.methodLabels.length],result:'已与学生交流并落实本次帮扶措施，记录实际情况供后续了解。',proofs:[],createdBy:i%2?'teacher-li':'teacher-wang',createdName:i%2?'李老师':'王老师',createdAt:createdDay+' '+createdHour+':'+String(i).padStart(2,'0'),version:1});
    }
  }))));
  const initialFilter = () => ({year:'',grade:'',className:'',name:'',source:'',start:today(),end:today()});
  let filter = initialFilter();
  const currentSchoolYear = () => yearOf(today());
  const canViewStudent = s => !!s && inside(s.org,root) && (account.view==='all'||s.teacher===account.name);
  const permittedStudent = id => students.find(s=>s.id===id && (!mobile?inside(s.org,root):canViewStudent(s)));
  const canWrite = id => mobile && account.write && !!permittedStudent(id);
  const canEdit = r => !!r && canWrite(r.studentId) && account.operate && r.createdBy===account.id;
  const visible = r => inside(r.student.org,org) && (!mobile||canViewStudent(r.student));
  function sorted(list) { return list.slice().sort((a,b)=>b.createdAt.localeCompare(a.createdAt)||b.id.localeCompare(a.id)); }
  function query() { return sorted(records.filter(r=>visible(r) && (!mobile||yearOf(r.date)===currentSchoolYear()) && (mobile||((!filter.year||yearOf(r.date)===filter.year) && (!filter.grade||r.student.grade===filter.grade) && (!filter.className||r.student.className===filter.className) && (!filter.source||r.sources.includes(filter.source)) && (!filter.start||r.createdAt.slice(0,10)>=filter.start) && (!filter.end||r.createdAt.slice(0,10)<=filter.end))) && r.student.name.includes((mobile?search:filter.name).trim()))); }
  const kv = (name,value) => '<div class="kv"><span>'+esc(name)+'</span><span>'+esc(value||'--')+'</span></div>';
  const studentHead = s => '<div class="student"><span class="avatar">'+esc(s.name.slice(0,1))+'</span><div><b>'+esc(s.name)+'</b><div class="muted">'+esc(s.grade+' · '+s.className)+'</div></div></div>';
  const app = document.getElementById('app');
  document.title = '第三版 · '+labels[role]+' · 关爱记录';
  document.body.className = mobile?'teacher-page':'';
  app.className = mobile?'phone':'web';
  if(mobile) {
    const demo=document.createElement('div'); demo.className='demo';
    demo.innerHTML='<span>第三版 · 演示身份</span><select aria-label="演示身份"><option value="wang">王老师（全校查看/可操作本人）</option><option value="li">李老师（班级查看/可操作本人）</option><option value="none">陈老师（可查看/无操作权限）</option></select><a href="./index.html">方案入口</a>';
    document.body.prepend(demo);
    demo.querySelector('select').onchange=e=>{account=e.target.value==='wang'?{id:'teacher-wang',name:'王老师',write:true,operate:true,view:'all'}:e.target.value==='li'?{id:'teacher-li',name:'李老师',write:true,operate:true,view:'homeroom'}:{id:'teacher-chen',name:'陈老师',write:false,operate:false,view:'all'};draft=null;editing=null;mobileLoaded=20;go('list');};
  }
  function shell(title,body,footer='') {
    app.innerHTML = mobile ? '<div class="statusbar"><span>9:41</span><span>▮▮▮ ▰</span></div><header class="sub-head">'+(title==='控辍保学'?'':'<button data-back aria-label="返回">‹</button>')+'<b>'+title+'</b><span class="capsule">••• ⊙</span></header><div class="scroll">'+body+'</div>'+(footer?'<footer class="bottom">'+footer+'</footer>':'') : '<header class="web-head">'+(org.length>root.length?'<button data-up>‹ 返回</button>':'')+'<h1>关爱记录'+(regulator?'汇总':'')+(org.length?' — '+esc(org.at(-1)):'')+'</h1><a href="./index.html">'+labels[role]+' · 第三版</a></header>'+body;
    app.querySelector('[data-back]')?.addEventListener('click',leave);
    app.querySelector('[data-up]')?.addEventListener('click',()=>{const previous=trail.pop();if(previous){org=previous.org;filter=previous.filter;page=previous.page;renderList();const sc=app.querySelector('.table-scroll');if(sc)sc.scrollLeft=previous.left;}});
  }
  function toast(message) { app.querySelector('.toast')?.remove(); const el=document.createElement('div');el.className='toast';el.setAttribute('role','status');el.textContent=message;app.append(el);setTimeout(()=>el.remove(),2800); }
  function go(route) { history.replaceState(null,'','#'+route); renderRoute(); }
  function leave() { if(draft) return confirmBox('放弃填写','当前内容尚未保存，确认离开？',()=>{draft=null;editing=null;go('list');});go('list'); }
  function mask(html,sheet=false) { const el=document.createElement('div');el.className='modal-mask'+(sheet?' sheet-mask':'');el.innerHTML=html;app.append(el);el.addEventListener('keydown',e=>{if(e.key==='Escape')el.remove();});el.querySelector('button,input')?.focus();return el; }
  function confirmBox(title,message,onConfirm) { const el=mask('<div class="confirm" role="dialog" aria-modal="true" aria-label="'+esc(title)+'"><h2>'+esc(title)+'</h2><p>'+esc(message)+'</p><div class="sheet-foot"><button data-cancel>取消</button><button class="primary" data-confirm>确定</button></div></div>');el.querySelector('[data-cancel]').onclick=()=>el.remove();el.querySelector('[data-confirm]').onclick=()=>{el.remove();onConfirm();}; }
  function proofHTML(proofs,edit=false) { return '<div class="proofs">'+proofs.map((p,i)=>'<div class="thumb"><img src="'+esc(p.url)+'" alt="'+esc(p.name||'证明材料')+'" data-preview="'+i+'">'+(edit?'<button type="button" data-remove="'+i+'" aria-label="删除第'+(i+1)+'张图片">×</button>':'')+'</div>').join('')+(edit&&proofs.length<9?'<button type="button" class="add-proof" aria-label="添加证明材料">＋</button>':'')+'</div>'; }
  function bindPreview(host,proofs) { host.querySelectorAll('[data-preview]').forEach(img=>{img.onclick=()=>{const p=proofs[Number(img.dataset.preview)];if(!p)return;const el=mask('<img class="preview" src="'+esc(p.url)+'" alt="'+esc(p.name)+'"><button>关闭</button>');el.classList.add('image-mask');el.querySelector('button').onclick=()=>el.remove();};img.onerror=()=>{img.alt='图片加载失败';img.title='图片加载失败，请重新打开';};}); }
  function renderList() {
    draft=null;editing=null;
    if(mobile){
      const list=query(), names=[...new Set(list.map(r=>r.student.name))];
      const tabs='<nav class="warning-tabs" aria-label="控辍保学记录分类"><a href="./老师端关爱管理-V2.9-20260929.html#sc-list">预警记录</a><a href="./老师端关爱管理-V2.9-20260929.html#sc-list">劝返记录</a><a class="active" aria-current="page">关爱记录</a></nav>';
      const cards=list.slice(0,mobileLoaded).map(recordCard).join('');
      shell('控辍保学',tabs+'<div class="mobile-list-pad"><input class="mobile-search" list="mobile-name-options" type="search" aria-label="搜索学生姓名" placeholder="搜索学生姓名" value="'+esc(search)+'"><datalist id="mobile-name-options">'+names.map(v=>'<option value="'+esc(v)+'"></option>').join('')+'</datalist><div class="count">本学年共 '+list.length+' 条关爱记录</div><div id="record-list">'+(list.length?cards:'<div class="empty">暂无符合条件的关爱记录</div>')+'</div>'+(list.length>mobileLoaded?'<div class="load-hint" aria-live="polite">向下滑动加载更多，每次20条</div>':'')+'</div>','<button class="primary" data-new '+(!account.write?'disabled':'')+'>新增关爱记录</button>');
      app.querySelector('[data-new]').onclick=()=>go('new');
      app.querySelector('.mobile-search').oninput=e=>{search=e.target.value;mobileLoaded=20;renderList();const input=app.querySelector('.mobile-search');input.focus();};
      const sc=app.querySelector('.scroll');sc.addEventListener('scroll',()=>{if(sc.scrollTop+sc.clientHeight>=sc.scrollHeight-80&&mobileLoaded<list.length){const before=mobileLoaded;mobileLoaded+=20;const host=app.querySelector('#record-list');host.insertAdjacentHTML('beforeend',list.slice(before,mobileLoaded).map(recordCard).join(''));bindListDetails(host);const hint=app.querySelector('.load-hint');if(hint)hint.textContent=mobileLoaded<list.length?'向下滑动加载更多，每次20条':'已加载全部';}});
      bindListDetails(app);
    }
    else renderWeb();
  }
  function recordCard(r) { return '<article class="card" data-record="'+r.id+'">'+studentHead(r.student)+kv('关爱来源',r.sources.join('、'))+kv('关爱类型',r.types.join('、'))+kv('关爱原因',r.reason)+kv('关爱时间',r.date)+'<div class="summary-text">'+kv('关爱结果',r.result)+'</div><div class="card-actions"><button data-detail="'+r.id+'">详情</button></div></article>'; }
  function bindListDetails(host) { host.querySelectorAll('[data-detail]').forEach(b=>{if(!b.dataset.bound){b.dataset.bound='1';b.onclick=()=>openDetail(b.dataset.detail);}}); }
  function option(values,selected,all) { return '<option value="">'+all+'</option>'+values.map(v=>'<option value="'+esc(v)+'"'+(selected===v?' selected':'')+'>'+esc(v)+'</option>').join(''); }
  function filtersHTML(summary) {
    const list=records.filter(visible), unique=k=>[...new Set(list.map(k))].sort().reverse();
    const names=[...new Set(list.map(r=>r.student.name))].sort();
    return '<form id="filters" class="filters">'+(!summary?'<label>学年<select name="year">'+option(unique(r=>yearOf(r.date)),filter.year,'全部学年')+'</select></label><label>年级<select name="grade">'+option(unique(r=>r.student.grade),filter.grade,'全部年级')+'</select></label><label>班级<select name="className">'+option(unique(r=>r.student.className),filter.className,'全部班级')+'</select></label><label>学生姓名<input name="name" list="web-name-options" type="search" placeholder="请输入学生姓名" value="'+esc(filter.name)+'"><datalist id="web-name-options">'+names.map(v=>'<option value="'+esc(v)+'"></option>').join('')+'</datalist></label><label>关爱来源<select name="source">'+option(SOURCES,filter.source,'全部')+'</select></label>':'')+'<label>创建日期<input name="start" type="text" inputmode="numeric" placeholder="YYYY-MM-DD" aria-label="创建开始日期" value="'+filter.start+'">—<input name="end" type="text" inputmode="numeric" placeholder="YYYY-MM-DD" aria-label="创建结束日期" value="'+filter.end+'"></label><div class="filter-actions"><button class="primary" type="submit">查询</button><button type="button" data-reset>重置</button></div><div class="error" id="query-error" role="alert"></div></form>';
  }
  function renderWeb() {
    const summary=regulator&&org.length<4, list=query();
    shell('', '<section class="panel">'+filtersHTML(summary)+'</section><section class="panel">'+(summary?summaryHTML(list):tableHTML(list))+'</section>');
    const form=app.querySelector('#filters');
    form.onsubmit=e=>{e.preventDefault();const next={...filter,...Object.fromEntries(new FormData(form))};if((next.start&&!validDate(next.start))||(next.end&&!validDate(next.end))||(next.start&&next.end&&next.start>next.end)){app.querySelector('#query-error').textContent='开始日期不能晚于结束日期，请检查日期范围';return;}filter=next;page=1;renderList();};
    form.querySelector('[data-reset]').onclick=()=>{filter=initialFilter();page=1;renderList();};
    app.querySelectorAll('[data-drill]').forEach(b=>b.onclick=()=>{const name=b.dataset.drill;trail.push({org:org.slice(),filter:clone(filter),page,left:app.querySelector('.table-scroll').scrollLeft});org.push(name);page=1;renderList();});
    app.querySelector('[data-prev]')?.addEventListener('click',()=>{page--;renderList();});app.querySelector('[data-next]')?.addEventListener('click',()=>{page++;renderList();});
    const sc=app.querySelector('.table-scroll');sc.addEventListener('keydown',e=>{if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();sc.scrollLeft+=(e.key==='ArrowRight'?120:-120);}});
    bindListDetails(app);
  }
  function summaryHTML(list) {
    let node=TREE;org.forEach(key=>{node=node[key];});const names=Array.isArray(node)?node:Object.keys(node);
    const stats=items=>'<td>'+new Set(items.map(r=>r.studentId)).size+'</td><td>'+items.length+'</td>';
    return '<div class="table-scroll" tabindex="0" aria-label="组织关爱汇总"><table class="summary"><thead><tr><th>'+['省份名称','地市名称','区县名称','学校名称'][org.length]+'</th><th>关爱学生数</th><th>关爱次数</th></tr></thead><tbody>'+names.map(name=>'<tr><td><button class="link" data-drill="'+esc(name)+'">'+esc(name)+'</button></td>'+stats(list.filter(r=>r.student.org[org.length]===name))+'</tr>').join('')+'<tr class="total"><td>合计</td>'+stats(list)+'</tr></tbody></table></div>';
  }
  function tableHTML(list) {
    const total=Math.max(1,Math.ceil(list.length/10));page=Math.max(1,Math.min(page,total));
    const heads=['学生姓名','年级','班级','创建日期','关爱来源','关爱类型','关爱原因','关爱时间','关爱结果','操作'];
    const widths=[90,155,80,145,150,150,190,110,190,95];
    return '<div class="count">共 '+list.length+' 条关爱记录</div><div class="table-scroll" tabindex="0" aria-label="关爱记录列表，可左右滑动查看字段"><table style="width:'+widths.reduce((sum,w)=>sum+w,0)+'px"><colgroup>'+widths.map(w=>'<col style="width:'+w+'px">').join('')+'</colgroup><thead><tr>'+heads.map((h,i)=>'<th'+(i===9?' class="operation"':'')+'>'+h+'</th>').join('')+'</tr></thead><tbody>'+(list.length?list.slice((page-1)*10,page*10).map(r=>'<tr>'+[r.student.name,r.student.grade,r.student.className,r.createdAt.slice(0,16),r.sources.join('、'),r.types.join('、'),r.reason,r.date,r.result].map((v,i)=>'<td title="'+esc(v)+'">'+esc(i===4||i===5?short(v):v)+'</td>').join('')+'<td class="operation"><button class="link" data-detail="'+r.id+'">详情</button></td></tr>').join(''):'<tr><td colspan="10" class="empty">暂无符合条件的关爱记录</td></tr>')+'</tbody></table></div><div class="pager"><span>共 '+list.length+' 条，每页10条</span><button data-prev '+(page===1?'disabled':'')+'>上一页</button><span>'+page+' / '+total+'</span><button data-next '+(page===total?'disabled':'')+'>下一页</button></div>';
  }
  function detailBody(r) { return '<div class="card">'+studentHead(r.student)+'</div><article class="card" data-single-content><div class="card-top"><h3>关爱内容</h3>'+(canEdit(r)?'<button class="more" aria-label="更多操作">...</button>':'')+'</div>'+kv('关爱来源',r.sources.join('、'))+kv('关爱类型',r.types.join('、'))+kv('关爱原因',r.reason)+kv('关爱时间',r.date)+kv('执行人员',r.people.join('、'))+kv('关爱方式',r.method)+kv('关爱结果',r.result)+kv('证明材料',r.proofs.length?r.proofs.length+'张':'--')+proofHTML(r.proofs)+kv('填写人',r.createdName)+kv('填写时间',r.createdAt.slice(0,16))+'</article>'; }
  function openDetail(id) {
    const r=records.find(r=>r.id===id&&visible(r));if(!r){if(mobile)go('list');toast('记录已变化，请刷新后重试');return;}
    if(mobile){history.replaceState(null,'','#detail/'+id);shell('关爱记录详情',detailBody(r));app.querySelector('.more')?.addEventListener('click',()=>recordActions(id));bindPreview(app,r.proofs);}
    else {const el=mask('<section class="dialog" role="dialog" aria-modal="true" aria-label="关爱记录详情"><header class="dialog-head"><b>关爱记录详情</b><button aria-label="关闭详情">×</button></header><div class="dialog-body">'+detailBody(r)+'</div><footer class="dialog-foot"><button>关闭</button></footer></section>');el.querySelectorAll('.dialog-head button,.dialog-foot button').forEach(b=>b.onclick=()=>el.remove());bindPreview(el,r.proofs);}
  }
  function recordActions(id) {
    const r=records.find(r=>r.id===id);if(!canEdit(r)){toast('暂无权限');return;}
    const version=r.version;
    const el=mask('<section class="sheet" role="dialog" aria-label="关爱记录操作"><div class="actions"><button data-edit>编辑</button><button class="danger" data-delete>删除</button><button data-cancel>取消</button></div></section>',true);
    el.querySelector('[data-edit]').onclick=()=>{el.remove();go('edit/'+id);};el.querySelector('[data-cancel]').onclick=()=>el.remove();
    el.querySelector('[data-delete]').onclick=()=>{el.remove();confirmBox('删除关爱记录','确认删除该关爱记录吗？删除后不可恢复！',()=>{const at=records.findIndex(r=>r.id===id),current=records[at];if(!canEdit(current)){toast('暂无权限');return;}if(current.version!==version){toast('记录已更新，请重新打开');return;}audit.push({action:'删除',operatorId:account.id,operator:account.name,time:now(),before:clone(current),after:null});records.splice(at,1);go('list');toast('删除成功');});};
  }
  function fresh() { return {studentId:'',grade:'',className:'',sources:[],types:[],reason:'',date:today(),people:[],method:'',result:'',proofs:[]}; }
  function openForm(id) {
    if(!mobile||!account.write){go('list');toast('暂无权限');return;}
    const r=id?records.find(r=>r.id===id):null;
    if(id&&!canEdit(r)){go('list');toast('暂无权限');return;}
    editing=r?{id:r.id,version:r.version}:null;draft=r?{...clone(r),grade:r.student.grade,className:r.student.className}:fresh();renderForm();app.querySelector('.scroll').scrollTop=0;
  }
  const fieldLabel={grade:'年级',className:'班级',studentId:'学生姓名',sources:'关爱来源',types:'关爱类型',date:'关爱时间',people:'执行人员',method:'关爱方式',reason:'关爱原因',result:'关爱结果',proofs:'证明材料'};
  function field(key) {
    const s=students.find(s=>s.id===draft.studentId);const value=key==='studentId'?(s?.name||''):Array.isArray(draft[key])?draft[key].join('、'):draft[key];
    const disabled=(key==='className'&&!draft.grade)||(key==='studentId'&&!draft.className)||(key==='people'&&!draft.studentId);
    return '<div class="field" data-field="'+key+'"><label>'+fieldLabel[key]+'<span class="req">*</span></label><button type="button" class="trigger" data-pick="'+key+'" '+(disabled?'disabled':'')+'><span>'+esc(value||'请选择'+fieldLabel[key])+'</span></button><div class="error" data-error="'+key+'" role="alert"></div></div>';
  }
  function textarea(key,placeholder) {return '<div class="field stack" data-field="'+key+'"><div class="field-title"><label for="'+key+'">'+fieldLabel[key]+'<span class="req">*</span></label>'+(key==='reason'?'<span class="char-count" data-count="reason">'+draft.reason.length+'/100</span>':'')+'</div><textarea id="'+key+'" name="'+key+'" maxlength="100" placeholder="'+placeholder+'">'+esc(draft[key])+'</textarea><div class="error" data-error="'+key+'" role="alert"></div></div>';}
  function renderForm() {
    const oldScroll=app.querySelector('.scroll')?.scrollTop||0;
    shell(editing?'编辑关爱记录':'新增关爱记录','<form id="record-form"><div class="section-title">学生信息</div><section class="card">'+field('grade')+field('className')+field('studentId')+'</section><div class="section-title">关爱内容</div><section class="card">'+field('sources')+field('types')+textarea('reason','请填写学生的真实情况')+field('date')+field('people')+field('method')+textarea('result','请填写关爱过程和结果')+'<div class="field stack" data-field="proofs"><label>证明材料</label>'+proofHTML(draft.proofs,true)+'<input id="proof-input" type="file" accept="image/jpeg,image/png,.jpg,.jpeg,.png" multiple hidden><small>支持JPEG、JPG、PNG格式图片，最多九张，每张不超过10M</small><div class="error" data-error="proofs" role="alert"></div></div></section><div class="error" id="save-error" role="alert"></div></form>','<button class="primary" id="save" '+(uploading?'disabled':'')+'>'+(uploading?'图片读取中…':'确定')+'</button>');
    app.querySelector('.scroll').scrollTop=oldScroll;
    app.querySelector('#record-form').onsubmit=e=>{e.preventDefault();save();};app.querySelector('#save').onclick=save;
    app.querySelectorAll('textarea').forEach(t=>t.oninput=()=>{draft[t.name]=t.value;app.querySelector('[data-error="'+t.name+'"]').textContent='';const counter=app.querySelector('[data-count="'+t.name+'"]');if(counter)counter.textContent=t.value.length+'/100';});
    app.querySelectorAll('[data-pick]').forEach(b=>b.onclick=()=>picker(b.dataset.pick));
    app.querySelector('.add-proof')?.addEventListener('click',()=>app.querySelector('#proof-input').click());
    app.querySelector('#proof-input').onchange=e=>readProofs(Array.from(e.target.files));
    app.querySelectorAll('[data-remove]').forEach(b=>b.onclick=()=>{draft.proofs.splice(Number(b.dataset.remove),1);renderForm();});bindPreview(app,draft.proofs);
  }
  function picker(key) {
    if(!draft)return;if(key==='date'){calendarPicker();return;}let choices=[], multi=['sources','types','people'].includes(key);const scope=students.filter(s=>!mobile?inside(s.org,root):canViewStudent(s));
    if(key==='grade') choices=[...new Set(scope.map(s=>s.grade))].map(v=>({id:v,label:v}));
    if(key==='className') choices=[...new Set(scope.filter(s=>s.grade===draft.grade).map(s=>s.className))].map(v=>({id:v,label:v}));
    if(key==='studentId') choices=scope.filter(s=>s.grade===draft.grade&&s.className===draft.className).map(s=>({id:s.id,label:s.name+' · '+s.className}));
    if(key==='sources') choices=SOURCES.map(v=>({id:v,label:v}));
    if(key==='types') choices=D.typeLabels.map(v=>({id:v,label:v}));
    if(key==='people') choices=TEACHERS.map(v=>({id:v,label:v}));
    if(key==='method') choices=D.methodLabels.map(v=>({id:v,label:v}));
    const selected=multi?draft[key]:[draft[key]];
    const el=mask('<section class="sheet" role="dialog" aria-modal="true" aria-label="选择'+fieldLabel[key]+'"><h3>选择'+fieldLabel[key]+'</h3><div class="sheet-body">'+(choices.length?choices.map(c=>'<label class="choice"><input type="'+(multi?'checkbox':'radio')+'" name="choice" value="'+esc(c.id)+'" '+(selected.includes(c.id)?'checked':'')+'>'+esc(c.label)+'</label>').join(''):'<div class="empty">暂无可选'+fieldLabel[key]+'</div>')+'</div><div class="error" role="alert"></div><div class="sheet-foot"><button data-cancel>取消</button><button class="primary" data-confirm '+(!choices.length?'disabled':'')+'>确定</button></div></section>',true);
    el.querySelector('[data-cancel]').onclick=()=>el.remove();el.querySelector('[data-confirm]').onclick=()=>{
      let v=Array.from(el.querySelectorAll('input:checked')).map(i=>i.value);
      if(!v.length){el.querySelector('.error').textContent='请选择'+fieldLabel[key];return;}
      if(!multi)v=v[0];
      const changed=JSON.stringify(draft[key])!==JSON.stringify(v);draft[key]=v;
      if(changed&&key==='grade'){draft.className='';draft.studentId='';draft.people=[];}
      if(changed&&key==='className'){draft.studentId='';draft.people=[];}
      if(changed&&key==='studentId')draft.people=permittedStudent(v)?.teacher?[permittedStudent(v).teacher]:[];
      el.remove();renderForm();
    };
  }
  function calendarPicker() {
    let selected=validDate(draft.date)?draft.date:today();
    let viewYear=Number(selected.slice(0,4)), viewMonth=Number(selected.slice(5,7));
    const el=mask('<section class="sheet calendar-sheet" role="dialog" aria-modal="true" aria-label="选择关爱时间"><h3>选择关爱时间</h3><div class="calendar-host"></div><div class="error" role="alert"></div><div class="sheet-foot"><button data-cancel>取消</button><button class="primary" data-confirm>确定</button></div></section>',true);
    const render=()=>{
      const first=new Date(Date.UTC(viewYear,viewMonth-1,1)).getUTCDay(), days=new Date(Date.UTC(viewYear,viewMonth,0)).getUTCDate();
      const cells=Array.from({length:first},()=>'<span></span>').concat(Array.from({length:days},(_,i)=>{const date=viewYear+'-'+String(viewMonth).padStart(2,'0')+'-'+String(i+1).padStart(2,'0');return '<button type="button" class="calendar-day'+(date===selected?' selected':'')+'" data-date="'+date+'">'+(i+1)+'</button>';}));
      el.querySelector('.calendar-host').innerHTML='<div class="calendar-nav"><button type="button" data-month="-1" aria-label="上个月">‹</button><b>'+viewYear+'年'+String(viewMonth).padStart(2,'0')+'月</b><button type="button" data-month="1" aria-label="下个月">›</button></div><div class="calendar-week"><span>日</span><span>一</span><span>二</span><span>三</span><span>四</span><span>五</span><span>六</span></div><div class="calendar-grid">'+cells.join('')+'</div>';
      el.querySelectorAll('[data-month]').forEach(b=>b.onclick=()=>{viewMonth+=Number(b.dataset.month);if(viewMonth===0){viewMonth=12;viewYear--;}if(viewMonth===13){viewMonth=1;viewYear++;}render();});
      el.querySelectorAll('[data-date]').forEach(b=>b.onclick=()=>{selected=b.dataset.date;render();});
    };
    render();el.querySelector('[data-cancel]').onclick=()=>el.remove();el.querySelector('[data-confirm]').onclick=()=>{if(!validDate(selected)){el.querySelector('.error').textContent='请选择有效关爱时间';return;}draft.date=selected;el.remove();renderForm();};
  }
  async function readProofs(files) {
    if(!draft||uploading)return;const target=draft;const error=message=>{app.querySelector('[data-error="proofs"]').textContent=message;};
    if(target.proofs.length+files.length>9){error('最多上传9张图片');return;}
    if(files.some(f=>!['image/jpeg','image/png'].includes(f.type))){error('仅支持JPEG、JPG、PNG格式图片');return;}
    if(files.some(f=>f.size>10*1024*1024)){error('每张图片不能超过10M');return;}
    uploading=true;renderForm();
    try{const images=await Promise.all(files.map(f=>new Promise((resolve,reject)=>{const reader=new FileReader();reader.onerror=()=>reject(Error('read'));reader.onload=()=>{const img=new Image();img.onload=()=>resolve({name:f.name,url:reader.result,size:f.size,type:f.type});img.onerror=()=>reject(Error('image'));img.src=reader.result;};reader.readAsDataURL(f);})));if(draft===target)target.proofs.push(...images);}
    catch{if(draft===target)error('图片读取失败，请重新选择');}
    finally{uploading=false;if(draft===target){const msg=app.querySelector('[data-error="proofs"]')?.textContent;renderForm();if(msg)error(msg);}}
  }
  function validate(value) {
    const st=permittedStudent(value.studentId);
    if(!value.grade)return ['grade','请选择年级'];if(!value.className)return ['className','请选择班级'];
    if(!st||st.grade!==value.grade||st.className!==value.className)return ['studentId','请依次选择年级、班级、学生姓名'];
    for(const [key,allowed] of [['sources',SOURCES],['types',D.typeLabels]])if(!Array.isArray(value[key])||!value[key].length||value[key].some(x=>!allowed.includes(x)))return [key,'请选择'+fieldLabel[key]];
    if(!value.reason.trim())return ['reason','请填写关爱原因'];if(value.reason.trim().length>100)return ['reason','关爱原因最多100字'];
    if(!validDate(value.date))return ['date','请选择有效关爱时间'];
    if(!value.people.length||value.people.some(p=>!TEACHERS.includes(p)))return ['people','请选择执行人员'];if(!D.methodLabels.includes(value.method))return ['method','请选择关爱方式'];
    if(!value.result.trim())return ['result','请填写关爱结果'];if(value.result.trim().length>100)return ['result','关爱结果最多100字'];
    if(value.proofs.length>9)return ['proofs','最多上传9张图片'];return null;
  }
  function save() {
    if(!draft||uploading)return;
    const current=editing?records.find(r=>r.id===editing.id):null;
    if(!mobile||!account.write||(editing&&!canEdit(current))){app.querySelector('#save-error').textContent='暂无权限';return;}
    const issue=validate(draft);app.querySelectorAll('.error').forEach(e=>e.textContent='');
    if(issue){const el=app.querySelector('[data-error="'+issue[0]+'"]');el.textContent=issue[1];el.closest('.field').scrollIntoView?.({block:'center'});return;}
    if(!canWrite(draft.studentId)){app.querySelector('#save-error').textContent='暂无权限';return;}
    if(editing&&current.version!==editing.version){app.querySelector('#save-error').textContent='记录已更新，请重新打开编辑';return;}
    app.querySelector('#save').disabled=true;
    const value={studentId:draft.studentId,student:clone(permittedStudent(draft.studentId)),sources:[...new Set(draft.sources)],types:[...new Set(draft.types)],reason:draft.reason.trim(),date:draft.date,people:[...new Set(draft.people)],method:draft.method,result:draft.result.trim(),proofs:clone(draft.proofs)};
    let saved;
    if(editing){saved={...current,...value,version:current.version+1,updatedAt:now()};audit.push({action:'编辑',operatorId:account.id,operator:account.name,time:now(),before:clone(current),after:clone(saved)});records.splice(records.indexOf(current),1,saved);}
    else {saved={...value,id:'r-'+String(++sequence).padStart(5,'0'),createdBy:account.id,createdName:account.name,createdAt:now(),version:1};records.push(saved);}
    draft=null;editing=null;openDetail(saved.id);toast('保存成功');
  }
  function renderRoute() { const [route,id]=location.hash.slice(1).split('/');if(!mobile){renderList();return;}if(route==='new')openForm();else if(route==='edit')openForm(id);else if(route==='detail'){draft=null;openDetail(id);}else renderList(); }
  window.addEventListener('hashchange',renderRoute);
  window.addEventListener('beforeunload',e=>{if(draft){e.preventDefault();e.returnValue='';}});
  // 演示会话数据与审计快照供验收；不代表服务端鉴权或持久化。
  window.CARE_RECORD_V3={records,students,audit,sorted,query,role,getAccount:()=>clone(account)};
  renderRoute();
})();
