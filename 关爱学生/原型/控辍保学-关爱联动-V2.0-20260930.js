/* 第二版：控辍保学预警与第一版关爱个案共用记录。 */
(function(){
  'use strict';
  function esc(s){return String(s==null?'':s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}
  function kv(k,v){return '<div class="kv"><span class="k">'+esc(k)+'</span><span class="v">'+esc(v||'--')+'</span></div>'}
  function today(){var d=new Date();return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0')}
  function boot(){
    if(!window.CARE_CASE_V3_API||!window.wlData||!window.wlRender)return;
    var api=window.CARE_CASE_V3_API,dates=[['2026-09-16','2026-09-17'],['2026-09-15','2026-09-16'],['2026-09-14','2026-09-15'],['2026-09-10',null],['2026-09-08','2026-09-09']];
    wlData.forEach(function(w,i){
      if(w.year!=='current')return;
      w.time=dates[i][0];w.last=dates[i][1]||'—';
      (w.visits||[]).forEach(function(v,j){v.date=dates[i][1]||dates[i][0];v.id=v.id||'visit-'+i+'-'+j});
      if(w.visits&&w.visits.length)w.status='done';
    });
    if(Array.isArray(window.vrData))vrData.forEach(function(v){if(v.year!=='current')return;var w=wlData.find(function(x){return x.name===v.student&&x.year==='current'});if(w)v.date=(w.last==='—'?w.time:w.last)+' '+String(v.date).slice(11)});
    var demoProofs=Array.from(document.querySelectorAll('#detail-visit-section img')).map(function(img){return img.src}).filter(Boolean).slice(0,3);
    if(wlData[0]&&wlData[0].visits[0])wlData[0].visits[0].proofs=demoProofs;
    var style=document.createElement('style');style.textContent='#sc-detail .care-warning-section{margin-top:12px}#sc-detail .care-warning-record{margin-bottom:9px}#sc-detail .care-warning-record h4{margin:0 0 8px;font-size:13px;color:var(--navy)}#sc-detail .care-warning-actions{display:flex;justify-content:flex-end;gap:8px;margin-top:10px}#sc-detail .care-warning-empty{font-size:12px;color:var(--ink-3)}#sc-detail .care-warning-proof{display:grid;grid-template-columns:repeat(3,1fr);gap:6px;margin-top:7px}#sc-detail .care-warning-proof img{width:100%;aspect-ratio:1;object-fit:cover;border-radius:7px}#wl-cards .care-warning-buttons{display:flex;justify-content:flex-end;gap:8px;flex-wrap:wrap;margin-top:10px}';document.head.appendChild(style);
    var active=null,container=document.getElementById('wl-cards');
    function matching(w){return api.findForWarning(w)}
    function action(w){var c=matching(w);if(!c)return '关爱';return api.status(c)==='已完结'?'查看关爱':c.records.length?'继续跟进':'关爱'}
    function renderPage(){
      var start=wlPage*wlPageSize,slice=wlFiltered.slice(start,start+wlPageSize);
      if(!wlFiltered.length){container.innerHTML='<div class="br-empty">暂无预警记录</div>';return}
      var html=slice.map(function(w){var i=wlData.indexOf(w),s=wlStatusMap[w.status];return '<div class="card" data-warning-index="'+i+'" style="cursor:pointer"><div class="stu-hd"><div class="avatar">'+esc(w.name.slice(0,1))+'</div><div style="flex:1"><div class="stu-nm">'+esc(w.name)+' <span class="chip '+s.cls+'" style="margin-left:6px;vertical-align:2px">'+s.txt+'</span></div><div class="stu-sub muted">'+esc(w.grade+' · '+w.cls)+'</div></div></div><div class="hr"></div>'+kv('预警类型',w.type)+kv('预警原因',w.reason)+kv('预警时间',w.time)+kv('最后处理',w.last)+'<div class="care-warning-buttons"><button type="button" class="btn ghost sm" data-warning-action="detail">详情</button><button type="button" class="btn ghost sm" data-warning-action="care">'+action(w)+'</button><button type="button" class="btn pri sm" data-warning-action="process">'+(w.status==='pending'?'处理':'重新处理')+'</button></div></div>'}).join('');
      container.insertAdjacentHTML('beforeend',html);
      var tip=document.getElementById('wl-lazy-tip');if(tip)tip.textContent=start+slice.length>=wlFiltered.length?'— 已加载全部 '+wlFiltered.length+' 条记录 —':'上拉加载更多...';
    }
    window.wlRenderPage=renderPage;
    function renderDetail(){
      if(!active)return;
      var w=active,c=matching(w),pad=document.querySelector('#sc-detail .body .pad');if(!pad)return;
      var visits=w.visits||[],records=c&&c.records||[],state=c?api.status(c):'待关爱';
      pad.innerHTML='<div class="card"><div class="stu-hd"><div class="avatar">'+esc(w.name.slice(0,1))+'</div><div><div class="stu-nm">'+esc(w.name)+' <span class="chip '+(w.status==='pending'?'amber':'teal')+'">'+(w.status==='pending'?'待处理':'已处理')+'</span></div><div class="stu-sub muted">'+esc(w.grade+' · '+w.cls)+'</div></div></div></div>'+
        '<div class="section-t">预警信息</div><div class="card">'+kv('学生姓名',w.name)+kv('学校','市实验一小')+kv('年级',w.grade)+kv('班级',w.cls)+kv('预警类型',w.type)+kv('预警原因',w.reason)+kv('预警时间',w.time)+'</div>'+
        '<div class="section-t care-warning-section">劝返信息（共'+visits.length+'次）</div>'+(visits.length?visits.slice().reverse().map(function(v,i){return '<div class="card care-warning-record"><h4>第'+(visits.length-i)+'次劝返</h4>'+kv('劝返日期',v.date)+kv('劝返方式',v.method)+kv('劝返老师',v.staff)+kv('劝返结果',v.result)+kv('佐证材料',(v.proofs||[]).length?(v.proofs||[]).length+'张':'--')+((v.proofs||[]).length?'<div class="care-warning-proof">'+v.proofs.map(function(src){return '<img src="'+esc(src)+'" alt="劝返佐证材料" onclick="openPhotoViewer(this)">'}).join('')+'</div>':'')+'</div>'}).join(''):'<div class="card care-warning-empty">暂无劝返记录</div>')+
        '<div class="section-t care-warning-section">关爱情况（共'+records.length+'次）</div>'+(records.length?records.slice().reverse().map(function(r,i){return '<div class="card care-warning-record"><h4>第'+(records.length-i)+'次关爱</h4>'+kv('关爱时间',r.date)+kv('执行人员',r.people)+kv('关爱方式',r.method)+kv('关爱结果',r.result)+kv('证明材料',(r.proofs||[]).length?(r.proofs||[]).length+'张':'--')+kv('继续跟进',r.follow)+(r.follow==='需要'?kv('下次跟进日期',r.next):'')+'</div>'}).join(''):'<div class="card care-warning-empty">暂无关爱记录</div>')+
        '<div class="card">'+kv('个案状态',state)+'<div class="care-warning-actions"><button type="button" class="btn ghost sm" data-warning-detail-care>'+action(w)+'</button><button type="button" class="btn pri sm" data-warning-detail-process>'+(w.status==='pending'?'处理':'重新处理')+'</button></div></div>';
      pad.querySelector('[data-warning-detail-care]').onclick=function(){api.openFromWarning(w)};
      pad.querySelector('[data-warning-detail-process]').onclick=function(){curWlStatus=w.status;go('sc-verify');vfmPreFill(w.status)};
    }
    container.addEventListener('click',function(e){
      var card=e.target.closest('[data-warning-index]');if(!card)return;var w=wlData[Number(card.dataset.warningIndex)],button=e.target.closest('[data-warning-action]'),act=button&&button.dataset.warningAction||'detail';active=w;curWlStatus=w.status;
      if(act==='care'){api.openFromWarning(w);return}
      if(act==='process'){go('sc-verify');vfmPreFill(w.status);return}
      go('sc-detail');
    });
    var oldGo=window.go;window.go=function(id){var result=oldGo.apply(this,arguments);if(id==='sc-detail')renderDetail();if(id==='sc-list')wlRender();return result};
    var oldPrefill=window.vfmPreFill;window.vfmPreFill=function(status){oldPrefill.apply(this,arguments);var date=document.getElementById('vfm-date-val');if(date)date.textContent=today();if(status!=='done'||!active||!active.visits.length)return;setTimeout(function(){var v=active.visits[active.visits.length-1],method=document.getElementById('vfm-method-val'),staff=document.getElementById('vfm-staff-val'),result=document.getElementById('vfm-result');if(method)method.textContent=v.method;if(staff)staff.value=v.staff;if(result)result.value=v.result},60)};
    window.vfmDateSheet=function(){
      var old=document.getElementById('cv3-picker-overlay');if(old)old.remove();var shown=document.getElementById('vfm-date-val'),parts=(shown&&shown.textContent||today()).split('-').map(Number),year=parts[0],month=parts[1],overlay=document.createElement('div');overlay.id='cv3-picker-overlay';overlay.className='cv3-picker-overlay';overlay.innerHTML='<div class="cv3-picker-sheet"><div class="cv3-picker-title"><b>选择劝返日期</b><button type="button" data-cancel>取消</button></div><div class="cv3-calendar-nav"><button type="button" data-prev>‹</button><b data-month></b><button type="button" data-next>›</button></div><div class="cv3-calendar-grid" data-grid></div></div>';
      function draw(){overlay.querySelector('[data-month]').textContent=year+'年'+month+'月';var start=new Date(year,month-1,1).getDay(),days=new Date(year,month,0).getDate(),html=['日','一','二','三','四','五','六'].map(function(x){return '<span>'+x+'</span>'}).join('');for(var i=0;i<start;i++)html+='<span></span>';for(var d=1;d<=days;d++){var value=year+'-'+String(month).padStart(2,'0')+'-'+String(d).padStart(2,'0');html+='<button type="button" data-day="'+value+'" '+(value>today()?'disabled':'')+' class="'+(shown&&value===shown.textContent?'on':'')+'">'+d+'</button>'}overlay.querySelector('[data-grid]').innerHTML=html;overlay.querySelectorAll('[data-day]').forEach(function(b){b.onclick=function(){shown.textContent=b.dataset.day;overlay.remove()}})}
      overlay.querySelector('[data-prev]').onclick=function(){month--;if(month<1){month=12;year--}draw()};overlay.querySelector('[data-next]').onclick=function(){month++;if(month>12){month=1;year++}draw()};overlay.querySelector('[data-cancel]').onclick=function(){overlay.remove()};overlay.onclick=function(e){if(e.target===overlay)overlay.remove()};draw();document.querySelector('.phone').appendChild(overlay);
    };
    var oldSubmit=window.vfmSubmit;window.vfmSubmit=function(){
      var method=document.getElementById('vfm-method-val').textContent,staff=document.getElementById('vfm-staff-val').value.trim(),result=document.getElementById('vfm-result').value.trim();
      if(active&&method!=='请选择'&&staff&&result){var now=new Date(),clock=String(now.getHours()).padStart(2,'0')+':'+String(now.getMinutes()).padStart(2,'0'),chosen=(document.getElementById('vfm-date-val')||{}).textContent||today();active.visits=active.visits||[];active.visits.push({id:'visit-'+Date.now(),method:method,date:chosen,staff:staff,result:result});active.status='done';active.last=chosen;curWlStatus='done';if(Array.isArray(window.vrData))vrData.unshift({teacher:staff,student:active.name,grade:active.grade,cls:active.cls,parent:'--',relation:'--',method:method,methodCls:'teal',date:chosen+' '+clock,reason:active.reason,result:result,year:active.year})}
      return oldSubmit.apply(this,arguments);
    };
    wlRender();if(location.hash==='#sc-detail'){active=wlData[0];renderDetail()}
  }
  if(document.readyState==='complete')boot();else window.addEventListener('load',boot);
})();
