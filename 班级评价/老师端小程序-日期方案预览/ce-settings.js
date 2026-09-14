/* 设置页：仅覆盖教师端本地演示的值周老师管理入口。正式数据来源为学校端教师/值周配置。 */
const ceSettingsState={view:'home',search:'',teacherQuery:'',teacherOpen:{'教学组':false,'后勤组':false,'交警/护学岗':true},draft:null,menuId:null};
const ceSettingsGrades=['一年级','二年级','三年级','四年级','五年级','六年级'];
const ceSettingsTeacherGroups=[
  {name:'教学组',teachers:['张老师','李老师','陈老师','周老师']},
  {name:'后勤组',teachers:['后勤老师','保安队长','食堂老师']},
  {name:'交警/护学岗',teachers:['技术服务','葛绪强','王丽','孟庆和','孙政','1']}
];
// 本地演示用教师档案模拟当前职务；正式版读取学校端教师档案的当前职务。
const ceSettingsTeacherDuty={
  '马亮':'校长','测试-娜娜老师':'班主任','于洛':'任课老师','校长':'校长',
  '技术服务':'任课老师','葛绪强':'任课老师','王丽':'班主任','孟庆和':'年级主任','孙政':'任课老师',
  '张老师':'任课老师','李老师':'任课老师','陈老师':'任课老师','周老师':'任课老师','后勤老师':'后勤人员','保安队长':'后勤人员','食堂老师':'后勤人员','孟欢':'班主任','1':'任课老师'
};
// 本地演示用当前教师档案顺序模拟创建时间；正式版读取学校教师档案的createdAt排序。
const ceSettingsTeacherCreatedAt={};
ceSettingsTeacherGroups.forEach((group,groupIndex)=>group.teachers.forEach((name,index)=>{ceSettingsTeacherCreatedAt[name]=groupIndex*10000+index}));
let ceSettingsGroups=[
  {id:'management',name:'管理组',grades:['全部年级'],executionStart:'2026-09-01',executionEnd:'2027-01-31',expanded:true,teachers:['马亮','测试-娜娜老师','于洛']},
  {id:'principal',name:'校长组',grades:['全部年级'],executionStart:'2026-09-01',executionEnd:'2027-01-31',expanded:false,teachers:['校长']},
  {id:'group-123',name:'123',grades:['全部年级'],executionStart:'2026-09-01',executionEnd:'2027-01-31',expanded:false,teachers:['王丽','孟庆和']}
];
function ceSettingsAvatar(name){
  const map={'马亮':'assets/avatar-man.png','测试-娜娜老师':'assets/avatar-woman.png','于洛':'assets/avatar-man.png','校长':'assets/avatar-man.png','技术服务':'assets/avatar-woman.png','葛绪强':'assets/avatar-man.png','王丽':'assets/avatar-woman.png','孟庆和':'assets/avatar-man.png','孙政':'assets/avatar-man.png'};
  return map[name]||'assets/avatar-woman.png';
}
function ceSettingsSheet(html,floating){
  sheet(html);
  const el=document.getElementById('sheet');
  if(el)el.className='sheet'+(floating?' ce-floating-sheet':'');
}
function ceSettingsGradeText(g){const text=g.grades.indexOf('全部年级')>=0?'全部':g.grades.join('、');return text.length>15?text.slice(0,15)+'...':text}
function ceSettingsFullGradeText(g){return g.grades.indexOf('全部年级')>=0?'全部年级':g.grades.join('、')}
function ceSettingsTeacherDutyText(name){return ceSettingsTeacherDuty[name]||'任课老师'}
function ceSettingsTeacherValue(name){return ceEscape(name)+'（'+ceEscape(ceSettingsTeacherDutyText(name))+'）'}
function ceSettingsTeacherLines(names){return names.length?names.map(n=>'<span>'+ceSettingsTeacherValue(n)+'</span>').join('<br>'):'--'}
function ceSettingsBusinessDate(){return typeof ceV1!=='undefined'&&ceV1.businessDate?ceV1.businessDate:ceDemoToday}
function ceSettingsStatus(g){const today=ceSettingsBusinessDate();if(!g.executionStart||!g.executionEnd)return '待开始';if(today<g.executionStart)return '待开始';if(today>g.executionEnd)return '已结束';return '值周中'}
function ceSettingsFilteredGroups(){
  const q=ceSettingsState.search.trim().toLowerCase();
  if(!q)return ceSettingsGroups;
  return ceSettingsGroups.map(g=>({...g,teachers:g.teachers.filter(n=>g.name.toLowerCase().includes(q)||n.toLowerCase().includes(q))})).filter(g=>g.name.toLowerCase().includes(q)||g.teachers.length);
}
function ceSettingsTeachersPage(){
  const groups=ceSettingsFilteredGroups();
  const cards=groups.map(g=>'<section class="ce-duty-group"><div class="ce-duty-group-head" role="button" tabindex="0" onclick="ceSettingsToggleGroup(\''+g.id+'\')"><div class="ce-duty-group-main"><span class="ce-duty-title"><i class="ce-fold '+(g.expanded?'':'closed')+'"></i><b>'+ceEscape(g.name)+'</b><em>（'+g.teachers.length+'）</em></span><em class="ce-duty-status ce-duty-status-'+ceSettingsStatus(g)+'">'+ceSettingsStatus(g)+'</em><small class="ce-duty-grade">负责年级：'+ceEscape(ceSettingsGradeText(g))+'</small></div><button class="ce-duty-more" aria-label="分组操作" onclick="event.stopPropagation();ceSettingsGroupMenu(\''+g.id+'\')">···</button></div>'+(g.expanded?'<div class="ce-duty-members">'+g.teachers.map(n=>'<div class="ce-duty-member"><img src="'+ceSettingsAvatar(n)+'" alt=""><div class="ce-duty-member-info"><b>'+ceEscape(n)+'</b><small>'+ceEscape(ceSettingsTeacherDutyText(n))+'</small></div></div>').join('')+'</div>':'')+'</section>').join('');
  return '<div class="ce-settings-page ce-duty-page"><div class="ce-duty-scroll">'+(cards||'<div class="ce-settings-empty">暂无匹配老师或分组</div>')+'</div><button class="ce-duty-footer" onclick="ceSettingsNewGroup()">新建分组</button></div>';
}
function ceSettingsPage(){
  if(ceSettingsState.view==='teachers')return ceSettingsTeachersPage();
  return '<div class="ce-settings-page ce-settings-home"><div class="ce-settings-card"><button class="ce-setting ce-settings-entry" onclick="ceSettingsOpenTeachers()"><span>值周老师管理</span><span>›</span></button></div></div>';
}
function ceSettingsOpenTeachers(){ceSettingsState.view='teachers';ceSettingsState.search='';ceRender()}
function ceSettingsBack(){if(ceSettingsState.view==='teachers'){ceSettingsState.view='home';ceSettingsState.search='';ceRender()}else ceReturnTeacherHome()}
function ceSettingsToggleGroup(id){const g=ceSettingsGroups.find(x=>x.id===id);if(g){g.expanded=!g.expanded;ceSettingsRender()}}
function ceSettingsRender(){const body=document.getElementById('ce-settings-body');if(body)body.innerHTML=ceSettingsPage();ceSettingsSyncHeader()}
function ceSettingsSyncHeader(){
  const root=document.querySelector('#ce-settings .sub-hd');if(!root)return;
  const title=root.querySelector('b'),back=root.querySelector('.back');
  if(title)title.textContent=ceSettingsState.view==='teachers'?'值周老师管理':'班级评价';
  if(back)back.onclick=ceSettingsBack;
}
function ceSettingsGroupMenu(id){
  const g=ceSettingsGroups.find(x=>x.id===id);if(!g)return;
  ceSettingsState.menuId=id;
  ceSettingsSheet('<div class="ce-settings-menu"><button onclick="ceSettingsViewGroup(\''+id+'\')">查看分组</button><button onclick="ceSettingsEditGroup(\''+id+'\')">编辑分组</button><button class="danger" onclick="ceSettingsDeleteConfirm(\''+id+'\')">删除分组</button><button onclick="closeSheet()">取消</button></div>');
}
function ceSettingsViewGroup(id){const g=ceSettingsGroups.find(x=>x.id===id);if(!g)return;ceSettingsSheet('<div class="ce-settings-view"><h3>查看分组</h3><div class="ce-settings-view-row"><span>小组名称</span><b>'+ceEscape(g.name)+'</b></div><div class="ce-settings-view-row"><span>状态</span><b>'+ceEscape(ceSettingsStatus(g))+'</b></div><div class="ce-settings-view-row"><span>值周老师</span><b class="ce-settings-view-multiline">'+ceSettingsTeacherLines(g.teachers)+'</b></div><div class="ce-settings-view-row"><span>负责年级</span><b class="ce-settings-view-multiline">'+ceEscape(ceSettingsFullGradeText(g))+'</b></div><div class="ce-settings-view-row"><span>执行时间</span><b>'+ceEscape((g.executionStart&&g.executionEnd)?g.executionStart+' 至 '+g.executionEnd:'--')+'</b></div><button class="ce-popup-confirm ce-settings-view-close" onclick="closeSheet()">关闭</button></div>');}
function ceSettingsDeleteConfirm(id){
  const g=ceSettingsGroups.find(x=>x.id===id);if(!g)return;
  ceSettingsSheet('<div class="ce-settings-confirm"><h3>删除</h3><p>删除后，将解散该组员，且不能恢复！</p><footer><button onclick="closeSheet()">取消</button><button class="danger" onclick="ceSettingsDeleteGroup(\''+id+'\')">确定</button></footer></div>',true);
}
function ceSettingsDeleteGroup(id){ceSettingsGroups=ceSettingsGroups.filter(g=>g.id!==id);closeSheet();ceSettingsRender();toast('分组已删除')}
function ceSettingsNewGroup(){
  ceSettingsState.teacherQuery='';
  ceSettingsState.draft={id:null,name:'',teachers:[],grades:['全部年级'],allGrades:true,executionStart:ceDemoToday,executionEnd:'2027-01-31'};
  ceSettingsGroupForm();
}
function ceSettingsEditGroup(id){
  const g=ceSettingsGroups.find(x=>x.id===id);if(!g)return;
  ceSettingsState.teacherQuery='';
  ceSettingsState.draft={id:g.id,name:g.name,teachers:g.teachers.slice(),grades:g.grades.slice(),allGrades:g.grades.indexOf('全部年级')>=0,executionStart:g.executionStart||ceDemoToday,executionEnd:g.executionEnd||'2027-01-31'};
  ceSettingsGroupForm();
}
function ceSettingsGroupForm(){
  const d=ceSettingsState.draft;
  const teachers=d.teachers.map(n=>'<div class="ce-duty-selected"><img src="'+ceSettingsAvatar(n)+'" alt=""><button aria-label="移除老师" onclick="ceSettingsRemoveTeacher(\''+ceEscape(n)+'\')">−</button><b>'+ceEscape(n)+'</b><small>'+ceEscape(ceSettingsTeacherDutyText(n))+'</small></div>').join('');
  const grades=d.allGrades?'':'<div class="ce-duty-grade-grid">'+ceSettingsGrades.map(g=>'<button class="'+(d.grades.includes(g)?'on':'')+'" onclick="ceSettingsToggleGrade(\''+g+'\')">'+g+'</button>').join('')+'</div>';
  ceSettingsSheet('<div class="ce-settings-form"><h3> '+(d.id?'编辑分组':'新建分组')+'</h3><div class="ce-duty-input-row"><span>小组名称</span><input id="ce-duty-group-name" maxlength="10" value="'+ceEscape(d.name)+'" placeholder="请输入" oninput="ceSettingsState.draft.name=this.value.slice(0,10);document.getElementById(\'ce-duty-group-count\').textContent=this.value.length+\'/10\'"><em id="ce-duty-group-count">'+d.name.length+'/10</em></div><div class="ce-duty-teacher-box"><div>值周老师 <b>'+d.teachers.length+'</b>人</div><div class="ce-duty-selected-row"><button class="ce-duty-add" onclick="ceSettingsTeacherPicker()"><i>＋</i><span>添加</span></button>'+teachers+'</div></div><div class="ce-duty-grade-box"><div class="ce-duty-grade-title"><span>负责年级</span><button class="ce-radio '+(d.allGrades?'on':'')+'" onclick="ceSettingsSetAllGrades(true)"><i></i>全部年级</button><button class="ce-radio '+(!d.allGrades?'on':'')+'" onclick="ceSettingsSetAllGrades(false)"><i></i>指定年级</button></div>'+grades+'</div><div class="ce-duty-execution-box"><span>执行时间</span><div><input type="date" value="'+ceEscape(d.executionStart)+'" onchange="ceSettingsState.draft.executionStart=this.value"><b>至</b><input type="date" value="'+ceEscape(d.executionEnd)+'" onchange="ceSettingsState.draft.executionEnd=this.value"></div></div><div class="ce-popup-footer"><button class="ce-popup-cancel" onclick="closeSheet()">取消</button><button class="ce-popup-confirm" onclick="ceSettingsSaveGroup()">确定</button></div></div>');
}
function ceSettingsRemoveTeacher(name){const d=ceSettingsState.draft;d.teachers=d.teachers.filter(n=>n!==name);ceSettingsGroupForm()}
function ceSettingsSetAllGrades(value){const d=ceSettingsState.draft;d.allGrades=value;d.grades=value?['全部年级']:[];ceSettingsGroupForm()}
function ceSettingsToggleGrade(grade){const d=ceSettingsState.draft;d.grades=d.grades.includes(grade)?d.grades.filter(g=>g!==grade):d.grades.concat(grade);if(!d.grades.length)d.grades=['一年级'];ceSettingsGroupForm()}
function ceSettingsSaveGroup(){
  const d=ceSettingsState.draft;d.name=d.name.trim();
  if(!d.name){toast('请输入小组名称');return}
  if(!d.teachers.length){toast('请添加值周老师');return}
  const grades=d.allGrades?['全部年级']:d.grades.slice();
  if(!grades.length){toast('请选择负责年级');return}
  if(d.executionStart&&d.executionEnd&&d.executionStart>d.executionEnd){toast('执行时间范围不正确');return}
  if(d.id){const g=ceSettingsGroups.find(x=>x.id===d.id);Object.assign(g,{name:d.name,teachers:d.teachers.slice(),grades,executionStart:d.executionStart,executionEnd:d.executionEnd,expanded:true})}
  else ceSettingsGroups.push({id:'group-'+Date.now(),name:d.name,teachers:d.teachers.slice(),grades,executionStart:d.executionStart,executionEnd:d.executionEnd,expanded:true});
  closeSheet();ceSettingsState.draft=null;ceSettingsRender();toast('分组已保存');
}
function ceSettingsTeacherPicker(){
  const q=ceSettingsState.teacherQuery.trim().toLowerCase();
  const teachers=[...new Set(ceSettingsTeacherGroups.flatMap(g=>g.teachers))].filter(n=>!q||n.toLowerCase().includes(q)).sort((a,b)=>(ceSettingsTeacherCreatedAt[a]??Number.MAX_SAFE_INTEGER)-(ceSettingsTeacherCreatedAt[b]??Number.MAX_SAFE_INTEGER)||a.localeCompare(b));
  const body=teachers.length?'<div class="ce-teacher-grid ce-teacher-grid-flat">'+teachers.map(n=>'<button class="'+(ceSettingsState.draft.teachers.includes(n)?'on':'')+'" onclick="ceSettingsTeacherToggle(\''+ceEscape(n)+'\')"><b>'+ceEscape(n)+'</b><small>'+ceEscape(ceSettingsTeacherDutyText(n))+'</small></button>').join('')+'</div>':'<div class="ce-settings-empty">暂无匹配老师</div>';
  ceSettingsSheet('<div class="ce-teacher-picker"><h3>选择值周老师</h3><div class="ce-settings-search"><span>⌕</span><input value="'+ceEscape(ceSettingsState.teacherQuery)+'" placeholder="输入姓名搜索" oninput="ceSettingsState.teacherQuery=this.value;ceSettingsTeacherPicker()"></div><div class="ce-teacher-pick-scroll">'+(body||'<div class="ce-settings-empty">暂无匹配老师</div>')+'</div><div class="ce-popup-footer"><button class="ce-popup-cancel" onclick="ceSettingsGroupForm()">取消</button><button class="ce-popup-confirm" onclick="ceSettingsGroupForm()">下一步</button></div></div>');
}
function ceSettingsTeacherOpen(name){ceSettingsState.teacherOpen[name]=!ceSettingsState.teacherOpen[name];ceSettingsTeacherPicker()}
function ceSettingsTeacherToggle(name){const d=ceSettingsState.draft;if(d.teachers.includes(name))d.teachers=d.teachers.filter(n=>n!==name);else d.teachers.push(name);ceSettingsTeacherPicker()}
const ceSettingsBaseRender=ceRender;
ceRender=function(){ceSettingsBaseRender();ceSettingsSyncHeader()};
