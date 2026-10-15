const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const {load} = require('./原型测试工具-V2.0-20261008.cjs');

const root = __dirname;
const pages = {
  teacher: '第三版-老师端关爱管理-V1.0-20261015.html',
  school: '第三版-学校端关爱管理-V1.0-20261015.html',
  ministry: '第三版-部级监管端关爱管理-V1.0-20261015.html',
  province: '第三版-省级监管端关爱管理-V1.0-20261015.html',
  city: '第三版-地市监管端关爱管理-V1.0-20261015.html',
  county: '第三版-区县监管端关爱管理-V1.0-20261015.html',
};
let checks = 0;
function ok(value, message) { assert.ok(value, message); checks++; }

async function run() {
  const moduleJs = fs.readFileSync(path.join(root, '第三版-关爱记录嵌入-V1.0-20261015.js'), 'utf8');
  for (const [role, file] of Object.entries(pages)) {
    const html = fs.readFileSync(path.join(root, file), 'utf8');
    ok(html.includes(`window.CARE_V3_EMBED_ROLE="${role}"`), role + '注入身份');
    ok(html.includes('第三版-关爱记录嵌入-V1.0-20261015.js?v=20261015-3'), role + '加载统一交互');
    if (role !== 'teacher') {
      ok(!html.includes('独立关爱管理 V1.0（学校端副本新增）') && !html.includes('独立关爱监管 V1.0（教育局端副本新增）'), role + '删除第一版关爱菜单代码');
    }
  }
  ok(moduleJs.includes("tab.textContent='关爱记录'") && moduleJs.includes("tabs.appendChild(tab)"), '老师端增加第三个顶部Tab');
  ok(moduleJs.includes('teacherState.loaded+=20'), '老师端每次懒加载20条');
  ok(moduleJs.includes('b.createdAt.localeCompare(a.createdAt)'), '按创建时间倒序');
  ok(moduleJs.includes("kv('创建时间',r.createdAt.slice(0,16))"), '详情显示创建时间');
  ok(moduleJs.includes("before:clone(current),after:clone(saved)"), '编辑保存前后快照');
  ok(moduleJs.includes('该学生当前不是在读状态，不能新增关爱记录，请重新选择学生。'), '在读状态变化提示');
  ok(moduleJs.includes('该学生的年级或班级已发生变化，已更新为'), '年级班级变化提示');
  ok(moduleJs.includes('该学生已不在您的数据范围内，请重新选择学生。'), '数据范围变化提示');
  ok(moduleJs.includes('确认删除该关爱记录吗？删除后不可恢复！'), '删除确认文案');
  ok(moduleJs.includes('选择关爱时间') && moduleJs.includes('data-month="-1"') && moduleJs.includes('data-month="1"'), '整月日历可切换月份');

  const teacher = await load(pages.teacher, '#care-v3');
  assert.deepEqual(teacher.errors, []);
  const td = teacher.document;
  ok([...td.querySelectorAll('.fc-tabs .fc-tab')].map(e => e.textContent).join('|') === '预警记录|劝返记录|关爱记录', '老师端实际渲染三个Tab');
  ok(td.querySelectorAll('#fc-panel-care .c3-list-scroll article').length === 20, '老师端首批实际渲染20条');
  ok(!td.querySelector('#sc-home button[onclick="go(\'sc-care-menu\')"]'), '老师端首页无独立关爱入口');
  teacher.window.close();

  const school = await load(pages.school, '#care-v3');
  assert.deepEqual(school.errors, []);
  const sd = school.document;
  ok(sd.querySelector('#care3-web-root h1')?.textContent.includes('关爱管理'), '学校端进入关爱管理');
  ok([...sd.querySelectorAll('#care3-web-root th')].map(e => e.textContent).join('|').includes('创建时间'), '学校端列表显示创建时间');
  ok(!sd.querySelector('#care3-web-root th:nth-child(11)'), '学校端保持十列且无关联信息/关爱次数');
  school.window.close();

  const ministry = await load(pages.ministry, '#care-v3');
  assert.deepEqual(ministry.errors, []);
  const md = ministry.document;
  ok([...md.querySelectorAll('#care3-web-root th')].map(e => e.textContent).join('|').includes('关爱学生数|关爱次数'), '监管汇总展示学生数和次数');
  ok(!md.querySelector('#care3-web-root [name="types"]'), '监管汇总无关爱类型筛选');
  ministry.window.close();

  const index = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
  ok(!index.includes('第三版-独立关爱记录-V1.0-20261014.html'), '总入口不再链接错误独立版');
  for (const file of Object.values(pages)) ok(index.includes(file), '总入口包含 ' + file);
  console.log(`PASS 第三版嵌入六端关爱管理，共 ${checks} 项断言`);
}

run().catch(error => { console.error(error); process.exitCode = 1; });
